using RoomsApiCrudIdentity.Models;

namespace RoomsApiCrudIdentity.Services;
public interface IMailService
{
    Task<bool> SendMail(HTMLMailData mailData);
}