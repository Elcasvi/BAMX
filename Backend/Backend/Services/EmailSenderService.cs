using System.Net;
using System.Net.Mail;
using Backend.Services.HelpObjects;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class EmailSenderService:IEmailSenderService
{
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
}