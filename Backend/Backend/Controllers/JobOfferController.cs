using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class JobOfferController:ControllerBase
{
    private readonly IJobOfferRepository _jobOfferRepository;
    private readonly IUserJobOfferRepository _userJobOfferRepository;
    private readonly IMapper _mapper;

    public JobOfferController(IJobOfferRepository jobOfferRepository, IUserJobOfferRepository userJobOfferRepository, IMapper mapper)
    {
        _jobOfferRepository = jobOfferRepository;
        _userJobOfferRepository = userJobOfferRepository;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public IActionResult GetJobOffer(int id)
    {
        if (!_jobOfferRepository.Exists(id))
        {
            return NotFound();
        }
        //var jobOffer = _mapper.Map<JobOfferDto>(_jobOfferRepository.Get(id));
        var jobOffer = _jobOfferRepository.Get(id);
        return Ok(jobOffer);
    }
    
    [HttpGet]
    public IActionResult GetJobOffers()
    {
        //var jobOffers=_mapper.Map<List<JobOfferDto>>(_jobOfferRepository.GetAll());//This convert the users form the database into userDto objects
        var jobOffers=_jobOfferRepository.GetAll();
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(jobOffers);
    }

    [HttpGet("users/{jobOfferId}")]
    public IActionResult GetUsersForJobOffer(int jobOfferId)
    {
        ICollection<User> users= _userJobOfferRepository.GetAllUsersByJobOfferId(jobOfferId);
       if(!ModelState.IsValid)
       {
           return BadRequest(ModelState);
       }
       return Ok(users);
    }
    
    [HttpPost]
    public IActionResult CreateJobOffer([FromBody]JobOfferDto jobOfferDto)
    {
        if (jobOfferDto==null)
        {
            return BadRequest();
        }
        /*
        if (_jobOfferRepository.Exists())
        {
            ModelState.AddModelError("","User already exists");
            return StatusCode(422, ModelState);
        }
        */
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var jobOfferMap = _mapper.Map<JobOffer>(jobOfferDto);
        JobOffer newJobOffer = _jobOfferRepository.Add(jobOfferMap).Entity;
        if (newJobOffer == null)
        {
            ModelState.AddModelError("","Something went wrong while saving");
            return StatusCode(500, ModelState);
        }
        return Ok(newJobOffer);
    }
    
    [HttpPut("/update/jobOfferId/{jobOfferId}")]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(200)]
    public IActionResult UpdateUser(int jobOfferId,[FromBody]JobOffer updatedJobOffer)
    {
        if (updatedJobOffer == null)
        {
            return BadRequest(ModelState);
        }

        if (jobOfferId != updatedJobOffer.Id)
        {
            return BadRequest(ModelState);
        }

        if (!_jobOfferRepository.Exists(jobOfferId))
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest();
        }
        JobOffer returnedUpdatedJobOffer = _jobOfferRepository.Update(updatedJobOffer);
        if (returnedUpdatedJobOffer==null)
        {
            ModelState.AddModelError("","Something went wrong updating the job offer");
            return StatusCode(500, ModelState);
        }

        return Ok(returnedUpdatedJobOffer);
    }
    
    
    [HttpDelete("delete/{jobOfferId}")]
    public IActionResult DeleteJobOffer(int jobOfferId)
    {
        if (!_jobOfferRepository.Exists(jobOfferId))
        {
            return NotFound();
        }
        JobOffer jobOfferToDelete = _jobOfferRepository.Get(jobOfferId);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        //Deleting the jobOffer from UserJobOffers table
        if (!_userJobOfferRepository.GetAllUserJobOffersByJobOfferId(jobOfferId).IsNullOrEmpty())
        {
            var userJobOffers=_userJobOfferRepository.GetAllUserJobOffersByJobOfferId(jobOfferId);
            if (userJobOffers.IsNullOrEmpty())
            {
                return NotFound();
            }
            foreach (UserJobOffer userJobOffer in userJobOffers)
            {
                var deletedUserJobOffer = _userJobOfferRepository.DeleteUserJobOffer(userJobOffer);
                if (deletedUserJobOffer == null)
                {
                    ModelState.AddModelError("","Something went wrong deleting the JobOffer in the UserJobOffer table");
                }
            }
        }
        JobOffer deletedJobOffer = _jobOfferRepository.Delete(jobOfferToDelete);
        if (deletedJobOffer == null)
        {
            ModelState.AddModelError("","Something went wrong deleting the JobOffer");
        }
        return Ok(deletedJobOffer);
    }
}