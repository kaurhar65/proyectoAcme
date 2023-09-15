using System.ComponentModel.DataAnnotations;

namespace RoomsApiCrudIdentity.Models;

public class UserModel
{
    [Required]
    public string? UserName { get; set; }

    [EmailAddress]
    [Required]
    public string? Email { get; set; }

    [Phone]
    public string? Phone { get; set; }
}
