using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class AssignedJob
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Enterprise { get; set; }
        public string Status { get; set; }
        public string? JobOfferPicture { get; set; }
        public User User { get; set; }
    }
}
