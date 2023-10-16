using System.ComponentModel.DataAnnotations;
using Backend.Models.Entities.JoinTables;

namespace Backend.Models.Entities
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public ICollection<UserCourse>? UserCourses { get; set; }
    }
}
