using System.Net.Mail;
using Backend.Services.Interfaces;
using Backend.Services.HelpObjects;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class EmailController:ControllerBase
{
    private readonly IEmailSenderService _emailSenderService;

    public EmailController(IEmailSenderService emailSenderService)
    {
        _emailSenderService = emailSenderService;
    }
    [HttpPost]
    public async Task<IActionResult> SendEmail([FromBody] Email email)
    {
        try
        {
            if (email.IsHtml) // Check if the email content is in HTML format
            {
                // Set IsHtml property to true for HTML emails
                email.IsHtml = true;
            }

            await _emailSenderService.SendEmailAsync(email);
            return Ok("Email sent successfully");
        }
        catch (SmtpException smtpEx)
        {
            // Handle SMTP exceptions (e.g., invalid credentials, server unavailable)
            return BadRequest("Failed to send email: " + smtpEx.Message);
        }
        catch (Exception ex)
        {
            // Handle other exceptions
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }
}