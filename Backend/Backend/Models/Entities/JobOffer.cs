using Backend.Models.Entities.JoinTables;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class JobOffer
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string Enterprise { get; set; }
        public ICollection<UserJobOffer>? UserJobOffers { get; set; }
    }
}
