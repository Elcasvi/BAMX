using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class UserController:ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IAssignedJobRepository _assignedJobRepository;
    private readonly IUserJobOfferRepository _userJobOfferRepository;
    private readonly IUserCourseRepository _userCourseRepository;
    private readonly IMapper _mapper;
    private readonly Hash _hash;

    public UserController(IUserRepository userRepository, IAssignedJobRepository assignedJobRepository, IUserJobOfferRepository userJobOfferRepository, IUserCourseRepository userCourseRepository, IMapper mapper, Hash hash)
    {
        _userRepository = userRepository;
        _assignedJobRepository = assignedJobRepository;
        _userJobOfferRepository = userJobOfferRepository;
        _userCourseRepository = userCourseRepository;
        _mapper = mapper;
        _hash = hash;
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        if (!_userRepository.Exists(id))
        {
            return NotFound();
        }
        //var user = _mapper.Map<UserDto>(_userRepository.Get(id));
        var user = _userRepository.Get(id);
        return Ok(user);
    }
    
    [HttpGet("{email}/{password}")]
    public IActionResult GetUserByEmailAndPassword(string email, string password)
    {
        if (!_userRepository.Exists(email,password))
        {
            return NotFound();
        }
        //var user = _mapper.Map<UserDto>(_userRepository.Get(email,password));
        var user = _userRepository.Get(email, password);
        return Ok(user);
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users=_mapper.Map<List<UserDto>>(_userRepository.GetAll());//This convert the users form the database into userDto objects
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(users);
    }

    [HttpGet("jobOffers/{userId}")]
    public IActionResult GetUserJobOffers(int userId)
    {
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        var jobOffers = _userJobOfferRepository.GetAllJobOffersByUserId(userId);
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(jobOffers);
    }
    
    [HttpGet("courses/{userId}")]
    public IActionResult GetUserCourses(int userId)
    {
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        var courses = _userCourseRepository.GetAllCoursesByUserId(userId);
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(courses);
    }
    
    [HttpGet("assignedJobs/{userId}")]
    public IActionResult GetAssignedJobs(int userId)
    {
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        var assignedJobs = _mapper.Map<List<AssignedJobDto>>(_userRepository.GetAllAssignedJobsByUserId(userId));
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(assignedJobs);
    }
    
    [HttpPost]
    public IActionResult CreateUser([FromBody]UserDto userDto)
    {
        if (userDto==null)
        {
            return BadRequest(ModelState);
        }

        if (_userRepository.Exists(userDto.Email,userDto.Password))
        {
            ModelState.AddModelError("","User already exists");
            return StatusCode(422, ModelState);
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userMap = _mapper.Map<User>(userDto);
        User newUser = _userRepository.Add(userMap).Entity;
        if (newUser == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(newUser);
    }
    
   /* 
    [HttpPost("{password}")]
    public IActionResult HashString(string password)
    {
        return Ok(_hash.HashPassword(password));
    }

    [HttpPost("{inputPassword}/{passwordHash}")]
    public IActionResult CompareHashedString(string inputPassword, string passwordHash)
    {
        return Ok(_hash.Verify(inputPassword, passwordHash));
    }*/

    [HttpPut("/update/userId/{userId}")]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public IActionResult UpdateUser(int userId,[FromBody]User updatedUser)
    {
        if (updatedUser == null)
        {
            return BadRequest(ModelState);
        }

        if (userId != updatedUser.Id)
        {
            return BadRequest(ModelState);
        }

        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        User returnedUpdatedUser = _userRepository.Update(updatedUser);
        if (returnedUpdatedUser==null)
        {
            ModelState.AddModelError("","Something went wrong updating the user");
            return StatusCode(500, ModelState);
        }
        return Ok(returnedUpdatedUser);
    }

    [HttpDelete("/delete/{userId}")]
    public IActionResult DeleteUser(int userId)
    {
        if (!_userRepository.Exists(userId))
        {
            return NotFound();
        }
        User userToDelete = _userRepository.Get(userId);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        //Deleting the user from UserJobOffers table
        if (!_userJobOfferRepository.GetAllJobOffersByUserId(userId).IsNullOrEmpty())
        {
            var userJobOffers=_userJobOfferRepository.GetAllUserJobOffersByUserId(userId);
            if (userJobOffers.IsNullOrEmpty())
            {
                return NotFound();
            }
            foreach (UserJobOffer userJobOffer in userJobOffers)
            {
                var deletedUserJobOffer = _userJobOfferRepository.DeleteUserJobOffer(userJobOffer);
                if (deletedUserJobOffer == null)
                {
                    ModelState.AddModelError("","Something went wrong deleting the User in the jobOffer table");
                }
            }
        }
        
        //Deleting the user from UserCourses table
        if (!_userCourseRepository.GetAllCoursesByUserId(userId).IsNullOrEmpty())
        {
            var userCourses=_userCourseRepository.GetAllUserCoursesByUserId(userId);
            if (userCourses.IsNullOrEmpty())
            {
                return NotFound();
            }
            foreach (UserCourse userCourse in userCourses)
            {
                var deletedUserCourse = _userCourseRepository.DeleteUserCourse(userCourse);
                if (deletedUserCourse == null)
                {
                    ModelState.AddModelError("","Something went wrong deleting the User in the course table");
                }
            }
        }
        
        //Deleting User from AssignedJobs table
        if (!_userRepository.GetAllAssignedJobsByUserId(userId).IsNullOrEmpty())
        {
            var assignedJobs = _userRepository.GetAllAssignedJobsByUserId(userId);
            foreach (var assignedJob in assignedJobs)
            {
                var deletedAssignedJob = _assignedJobRepository.Delete(assignedJob);
                if (deletedAssignedJob == null)
                {
                    ModelState.AddModelError("","Something went wrong deleting the User in the assignedJobs table"); 
                }
            }
        }
        
        User deletedUser = _userRepository.Delete(userToDelete);
        if (deletedUser == null)
        {
            ModelState.AddModelError("","Something went wrong deleting the User");
        }
        return Ok(deletedUser);
    }
}