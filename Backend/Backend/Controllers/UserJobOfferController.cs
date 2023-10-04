using Backend.Models.Entities;
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

    public UserJobOfferController(IUserJobOfferRepository userJobOfferRepository, IJobOfferRepository jobOfferRepository)
    {
        _userJobOfferRepository = userJobOfferRepository;
        _jobOfferRepository = jobOfferRepository;
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
    
}