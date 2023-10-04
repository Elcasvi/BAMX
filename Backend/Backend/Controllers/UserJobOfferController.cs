using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Backend.Models.Repositories;
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