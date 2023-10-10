using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;
[ApiController]
[Route("[Controller]")]
public class UserJobOfferController:ControllerBase
{
    private readonly IUserJobOfferRepository _userJobOfferRepository;
    private readonly IJobOfferRepository _jobOfferRepository;
    private readonly IUserRepository _userRepository;

    public UserJobOfferController(IUserJobOfferRepository userJobOfferRepository, IJobOfferRepository jobOfferRepository,IUserRepository userRepository)
    {
        _userJobOfferRepository = userJobOfferRepository;
        _jobOfferRepository = jobOfferRepository;
        _userRepository = userRepository;
    }

    [HttpGet("{jobOfferId}")]
    public IActionResult GetAllUsers(int jobOfferId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (!_jobOfferRepository.Exists(jobOfferId))
        {
            return NotFound(jobOfferId);
        }
        
        return Ok(_userJobOfferRepository.GetAllUsersByJobOfferId(jobOfferId));
    }
    [HttpPost("update/{jobOfferId}/{userId}")]
    public IActionResult UpdateUserJobOffer(int jobOfferId,int userId)
    {
        
        if (!_userRepository.Exists(userId))
        {
            ModelState.AddModelError("","User does not exists");
            return StatusCode(422, ModelState);
        }
        if (!_jobOfferRepository.Exists(jobOfferId))
        {
            ModelState.AddModelError("","Job offer does not exists");
            return StatusCode(422, ModelState);
        }
        var updatedUser=_userJobOfferRepository.AddUserJobOffer(jobOfferId, userId);
        if (updatedUser == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(updatedUser);
    }
    
    [HttpDelete("{jobOfferId}/{userId}")]
    public IActionResult DeleteUserJobOffer(int jobOfferId, int userId)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (!_userRepository.Exists(userId))
        {
            return NotFound(userId);
        }
        User user = _userRepository.Get(userId);
        
        if (!_jobOfferRepository.Exists(jobOfferId))
        {
            return NotFound(jobOfferId);
        }
        JobOffer jobOffer = _jobOfferRepository.Get(jobOfferId);
        UserJobOffer userJobOffer = new UserJobOffer()
        {
            UserId = userId,
            JobOfferId = jobOfferId,
            User = user,
            JobOffer = jobOffer
        };
       var deletedUserJobOffer= _userJobOfferRepository.DeleteUserJobOffer(userJobOffer);
       return Ok(deletedUserJobOffer);
    }
}