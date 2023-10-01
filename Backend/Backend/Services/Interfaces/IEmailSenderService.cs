using Backend.Services.HelpObjects;

namespace Backend.Services.Interfaces;

public interface IEmailSenderService
{
    Task SendEmailAsync(Email email);
}