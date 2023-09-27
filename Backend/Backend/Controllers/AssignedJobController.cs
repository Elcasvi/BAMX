using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Route("[Controller]")]
public class AssignedJobController : ControllerBase
{
    private readonly IAssignedJobRepository _assignedJobRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public AssignedJobController(IAssignedJobRepository assignedJobRepository,IUserRepository userRepository, IMapper mapper)
    {
        _assignedJobRepository = assignedJobRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }
    [HttpGet("{id}")]
    public IActionResult GetAssignedJob(int id)
    {
        if (!_assignedJobRepository.Exists(id))
        {
            return NotFound();
        }
        var assignedJob = _mapper.Map<AssignedJobDto>(_assignedJobRepository.Get(id));
        return Ok(assignedJob);
    }

    [HttpGet]
    public IActionResult GetAssignedJobs()
    {
        var courses = _mapper.Map<List<AssignedJobDto>>(_assignedJobRepository.GetAll());
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(courses);
    }

    [HttpGet("users/{assignedJobId}")]
    public IActionResult GetUsersForAssignedJob(int assignedJobId)
    {
        if (!_assignedJobRepository.Exists(assignedJobId))
        {
            return NotFound();
        }

        var users = _mapper.Map<UserDto>(_assignedJobRepository.GetUserFromAssignedJob(assignedJobId));
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(users);
    }

    [HttpPost("{userId}")]
    public IActionResult AssignJobToUser(int userId,[FromBody]JobOfferDto jobOfferDto)
    {
        if (jobOfferDto==null)
        {
            return BadRequest();
        }
        
        if (!_userRepository.Exists(userId))
        {
            ModelState.AddModelError("","User does not exists");
            return StatusCode(422, ModelState);
        }
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var assignedJobMap = _mapper.Map<AssignedJob>(jobOfferDto);
        assignedJobMap.User = _userRepository.Get(userId);
        assignedJobMap.Status = "In progress";
        //Console.WriteLine("Assigned before entering the db: "+assignedJobMap);
        AssignedJob newAssignedJob = _assignedJobRepository.Add(assignedJobMap).Entity;
        if (newAssignedJob == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(newAssignedJob);
    }

    [HttpDelete("delete/{assignedJobId}")]
    public IActionResult DeleteAssignedJob(int assignedJobId)
    {
        if (!_assignedJobRepository.Exists(assignedJobId))
        {
            return NotFound();
        }
        AssignedJob assignedJobToDelete = _assignedJobRepository.Get(assignedJobId);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        AssignedJob deletedAssignedJob=_assignedJobRepository.Delete(assignedJobToDelete);
        return Ok(deletedAssignedJob);
    }
}