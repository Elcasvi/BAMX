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
        }
    }
}
