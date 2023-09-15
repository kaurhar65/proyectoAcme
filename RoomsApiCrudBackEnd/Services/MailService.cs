using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MimeKit;
using RoomsApiCrudIdentity.Models;

namespace RoomsApiCrudIdentity.Services;

public class MailService : IMailService
{
    private readonly MailSettings _mailSettings;

    public MailService(IOptions<MailSettings> mailSettingsOptions)
    {
        _mailSettings = mailSettingsOptions.Value;
    }

    public async Task<bool> SendMail(HTMLMailData htmlMailData)
    {
        try
        {
            using MimeMessage emailMessage = new();
            MailboxAddress emailFrom = new(_mailSettings.SenderName, _mailSettings.SenderEmail);
            emailMessage.From.Add(emailFrom);

            MailboxAddress emailTo = new(htmlMailData.EmailToName, htmlMailData.EmailToId);
            emailMessage.To.Add(emailTo);

            emailMessage.Subject = "Hello";

            string filePath = Directory.GetCurrentDirectory() + "\\Templates\\Hello.html";
            string emailTemplateText = File.ReadAllText(filePath);

            emailTemplateText = string.Format(
                emailTemplateText,
                htmlMailData.EmailToName,
                DateTime.Today.Date.ToShortDateString()
            );

            BodyBuilder emailBodyBuilder =
                new()
                {
                    HtmlBody = emailTemplateText,
                    TextBody =
                        "Plain Text goes here to avoid marked as spam for some email servers."
                };

            emailMessage.Body = emailBodyBuilder.ToMessageBody();

            using SmtpClient mailClient = new();
            await mailClient.ConnectAsync(
                _mailSettings.Server,
                _mailSettings.Port,
                MailKit.Security.SecureSocketOptions.StartTls
            );
            await mailClient.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password);
            await mailClient.SendAsync(emailMessage);
            await mailClient.DisconnectAsync(true);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return false;
        }
    }
}
