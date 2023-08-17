using AutoMapper;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Route("{Controller}")]
public class AssignedJobController : ControllerBase
{
    private readonly IAssignedJobRepository _assignedJobRepository;
    private readonly IMapper _mapper;

    public AssignedJobController(IAssignedJobRepository assignedJobRepository, IMapper mapper)
    {
        _assignedJobRepository = assignedJobRepository;
        _mapper = mapper;
    }
    
}