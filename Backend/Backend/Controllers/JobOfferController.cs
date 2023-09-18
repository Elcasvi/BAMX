using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[Controller]")]
public class JobOfferController:ControllerBase
{
    private readonly IJobOfferRepository _jobOfferRepository;
    private readonly IMapper _mapper;

    public JobOfferController(IJobOfferRepository jobOfferRepository, IMapper mapper)
    {
        _jobOfferRepository = jobOfferRepository;
        _mapper = mapper;
    }
    
    [HttpGet("{id}")]
    public IActionResult GetJobOffer(int id)
    {
        if (!_jobOfferRepository.Exists(id))
        {
            return NotFound();
        }
        var jobOffer = _mapper.Map<JobOfferDto>(_jobOfferRepository.Get(id));
        return Ok(jobOffer);
    }
    
    [HttpGet]
    public IActionResult GetJobOffers()
    {
        var jobOffers=_mapper.Map<List<JobOfferDto>>(_jobOfferRepository.GetAll());//This convert the users form the database into userDto objects
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(jobOffers);
    }

    [HttpGet("users/{jobOfferId}")]
    public IActionResult GetUsersForJobOffer(int jobOfferId)
    {
       var users=_mapper.Map<List<JobOfferDto>>(_jobOfferRepository.GetAllUsersByJobOfferId(jobOfferId));
       if(!ModelState.IsValid)
       {
           return BadRequest(ModelState);
       }
       return Ok(users);
    }
    
    [HttpPost]
    public IActionResult CreateJobOffer(JobOfferDto jobOfferDto)
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
}