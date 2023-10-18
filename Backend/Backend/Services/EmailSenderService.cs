using System.Net;
using System.Net.Mail;
using Backend.Models.Entities;
using Backend.Services.HelpObjects;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class EmailSenderService:IEmailSenderService
{
    private EmailTemplateHelper _emailTemplateHelper=new EmailTemplateHelper();
    public EmailSenderService()
    {
        
    }
    public async Task SendEmailAsync(Email email)
    {
        try
        {
            var mail = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Email")["UserName"];
            var password = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Email")["Password"];
            var host = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Email")["Host"];
            var port = int.Parse(new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Email")["Port"]);

            var client = new SmtpClient(host, port)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, password)
            };

            await client.SendMailAsync(
                new MailMessage(from: mail,
                    to: email.Receiver,
                    email.Subject,
                    email.Message));
        }
        catch (Exception ex)
        {
            // Handle the exception here (e.g., log it or return an error response)
            // You may want to create a custom exception class for more specific error handling.
            // Example: throw new CustomEmailException("Failed to send email", ex);
            throw;
        }
    }
    
    public async Task SendApplicationConfirmationEmail(User user, JobOffer job)
    {
        // Create and send a job application confirmation email with HTML content
        var email = new Email
        {
            Receiver = user.Email,
            Subject = "Job Application Confirmation",
            Message = EmailTemplateHelper.GetJobApplicationConfirmationHtml(job.Title),
            IsHtml = true // Use HTML
        };

        await SendEmailAsync(email);
    }

    public async Task SendCourseEnrollmentConfirmationEmail(User user, Course course)
    {
        // Create and send a course enrollment confirmation email with HTML content
        var email = new Email
        {
            Receiver = user.Email,
            Subject = "Course Enrollment Confirmation",
            Message = EmailTemplateHelper.GetCourseEnrollmentConfirmationHtml(course.Title),
            IsHtml = true // Use HTML
        };

        await SendEmailAsync(email);
    }

    public async Task SendHiringNotificationEmail(User user, AssignedJob job)
    {
        // Create and send a hiring notification email with HTML content
        var email = new Email
        {
            Receiver = user.Email,
            Subject = "You've been hired!",
            Message = EmailTemplateHelper.GetHiringNotificationHtml(job.Title),
            IsHtml = true // Use HTML
        };

        await SendEmailAsync(email);
    }

    public async Task SendDeclineNotificationEmail(User user)
    {
        // Create and send a decline notification email with HTML content
        var email = new Email
        {
            Receiver = user.Email,
            Subject = "Application Declined",
            Message = EmailTemplateHelper.GetDeclineNotificationHtml(),
            IsHtml = true // Use HTML
        };

        await SendEmailAsync(email);
    }
}