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
    private IJobOfferRepository _jobOfferRepository;
    private IMapper _mapper;

    public JobOfferController(IJobOfferRepository jobOfferRepository, IMapper mapper)
    {
        _jobOfferRepository = jobOfferRepository;
        _mapper = mapper;
    }
    
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        if (!_jobOfferRepository.JobOfferExists(id))
        {
            return NotFound();
        }
        var jobOffer = _mapper.Map<JobOfferDto>(_jobOfferRepository.Get(id));
        return Ok(jobOffer);
    }
    
    [HttpGet]
    public IActionResult GetAll()
    {
        var jobOffers=_mapper.Map<List<JobOfferDto>>(_jobOfferRepository.GetJobOffers());//This convert the users form the database into userDto objects
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(jobOffers);
    }
    
    
    [HttpPost]
    public IActionResult Add(JobOffer jobOffer)
    {
        if (!_jobOfferRepository.JobOfferExists(jobOffer.Id))
        {
            return BadRequest();
        }
        var newJobOffer = _mapper.Map<List<UserDto>>(_jobOfferRepository.Add(jobOffer));
        return Ok(newJobOffer);
    }
}