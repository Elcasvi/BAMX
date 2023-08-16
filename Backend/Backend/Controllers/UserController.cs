using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class UserController:ControllerBase
{
    private IUserRepository _userRepository;
    private IMapper _mapper;

    public UserController(IUserRepository userRepository,IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _mapper.Map<UserDto>(_userRepository.Get(id));
        return Ok(user);
    }
    
    [HttpGet("{email}/{password}")]
    public IActionResult GetByEmailAndPassword(string email, string password)
    {
        if (!_userRepository.UserExists(email,password))
        {
            return NotFound();
        }
        var user = _mapper.Map<UserDto>(_userRepository.Get(email,password));
        return Ok(user);
    }

    [HttpGet]
    public IActionResult GetAllUsers()
    {
        var users=_mapper.Map<List<UserDto>>(_userRepository.GetUsers());//This convert the users form the database into userDto objects
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(users);
    }

    [HttpPost]
    public IActionResult Add(User user)
    {
        if (!_userRepository.UserExists(user.Email,user.Password))
        {
            return BadRequest();
        }
        var newUser = _mapper.Map<List<UserDto>>(_userRepository.Add(user));
        return Ok(newUser);
    }
    
}