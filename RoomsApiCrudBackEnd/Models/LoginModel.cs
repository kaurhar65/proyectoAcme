using System.ComponentModel.DataAnnotations;

namespace RoomsApiCrudIdentity.Models;

public class LoginModel
{
    [Required(ErrorMessage = "Email is required.")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public string? Password { get; set; }
}
