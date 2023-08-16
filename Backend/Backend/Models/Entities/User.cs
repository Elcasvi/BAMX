using Backend.Models.Entities.JoinTables;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
        public string ProfilePic { get; set; }
        public float Rating { get; set; }
        public ICollection<AssignedJob>?AssignedJobs { get; set; }
        public ICollection<UserCourse>?UserCourses { get; set; }
        public ICollection<UserJobOffer>?UserJobOffers { get; set; }
    }
}
