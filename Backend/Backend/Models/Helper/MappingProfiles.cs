using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models.Entities;

namespace Backend.Models.Helper
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto,User>();
            
            CreateMap<JobOffer, JobOfferDto>();
            CreateMap<JobOfferDto, JobOffer>();
            
            CreateMap<Course,CourseDto>();
            CreateMap<CourseDto,Course>();
            
            CreateMap<AssignedJob,AssignedJobDto>();
            CreateMap<AssignedJobDto,AssignedJob>();


           
            CreateMap<JobOfferDto,AssignedJob>();

        }

    }
}
