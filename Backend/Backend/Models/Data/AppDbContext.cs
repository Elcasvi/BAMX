using Backend.Models.Entities;
using Backend.Models.Entities.JoinTables;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<JobOffer> JobOffers { get; set; }
        public DbSet<AssignedJob> AssignedJobs { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<UserJobOffer> UserJobOffers { get; set; }
    }
}
