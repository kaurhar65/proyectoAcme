using System.ComponentModel.DataAnnotations;

namespace RoomsApiCrudIdentity.Models
{
    public class UpdatePasswordModel
    {
        [Required]
        public string? CurrentPassword { get; set; }
        [Required]
        public string? NewPassword { get; set; }
        [Required]
        public string? NewPasswordConfirmation { get; set; }
    }
}
