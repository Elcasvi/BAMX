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
        //Entities
        public DbSet<User> Users { get; set; }
        public DbSet<JobOffer> JobOffers { get; set; }
        public DbSet<AssignedJob> AssignedJobs { get; set; }
        public DbSet<Course> Courses { get; set; }
        
        
        //Join tables
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<UserJobOffer> UserJobOffers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserCourse>().HasKey(usercourse => new { usercourse.UserId, usercourse.CourseId });
            
            modelBuilder.Entity<UserCourse>()
                .HasOne(user => user.User)
                .WithMany(usercourse => usercourse.UserCourses)
                .HasForeignKey(course => course.CourseId);
            
            modelBuilder.Entity<UserCourse>()
                .HasOne(course => course.Course)
                .WithMany(usercourse => usercourse.UserCourses)
                .HasForeignKey(user => user.UserId);
            
            
            
            modelBuilder.Entity<UserJobOffer>().HasKey(userjoboffer => new { userjoboffer.UserId, userjoboffer.JobOfferId });
            
            modelBuilder.Entity<UserJobOffer>()
                .HasOne(user => user.User)
                .WithMany(userjoboffer => userjoboffer.UserJobOffers)
                .HasForeignKey(joboffer => joboffer.JobOfferId);
            
            modelBuilder.Entity<UserJobOffer>()
                .HasOne(joboffer => joboffer.JobOffer)
                .WithMany(userjoboffer => userjoboffer.UserJobOffers)
                .HasForeignKey(user => user.UserId);

        }
    }
}
