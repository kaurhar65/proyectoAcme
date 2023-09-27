using System.ComponentModel.DataAnnotations;

namespace RoomsApiCrudIdentity.Models;

public class UpdatePasswordModel
{
    [Required]
    public string CurrentPassword { get; set; } = default!;

    [Required]
    public string NewPassword { get; set; } = default!;

    [Required]
    public string NewPasswordConfirmation { get; set; } = default!;
}
