using RoomsApiCrudIdentity.Models;

namespace RoomsApiCrudIdentity.Services;
public interface IMailService
{
    // bool SendMail(MailData mail);

    Task<bool> SendMail(HTMLMailData mailData);
}