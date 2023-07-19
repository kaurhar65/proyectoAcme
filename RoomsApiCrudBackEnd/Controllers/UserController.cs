#pragma warning disable CS8602, CS8604

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using RoomsApiCrudIdentity.Models;

namespace RoomsApiCrudIdentity.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        //private readonly RoleManager<IdentityRole> _roleManager;
        //private readonly IConfiguration _configuration;

        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            //_roleManager = roleManager;
            //_configuration = configuration;
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userManager.Users.ToListAsync());
        }

        [HttpGet]
        [Route("GetUserById")]
        public async Task<IActionResult> GetUserById(string id)
        {
            return Ok(await _userManager.FindByIdAsync(id));
        }

        [HttpGet]
        [Route("GetUserByEmail")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            return Ok(await _userManager.FindByEmailAsync(email));
        }

        [HttpPost]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserModel model)
        {
            var userToUpdate = await _userManager.FindByEmailAsync(model.Email);

            if (userToUpdate == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response { Status = "Error", Message = "User does not exist." });
            }

            userToUpdate.PhoneNumber = model.Phone;
            userToUpdate.Email = model.Email;
            userToUpdate.UserName = model.UserName;

            var result = await _userManager.UpdateAsync(userToUpdate);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response
                    {
                        Status = "Error",
                        Message = result.Errors
                            .Select(error => error.Description)
                            .Aggregate("", (acc, error) => acc + $"*SEPARATOR*{error}")
                    });
        }

        [Route("UpdatePassword")]
        [HttpPost]
        public async Task<IActionResult> UpdatePassword(string id, UpdatePasswordModel model)
        {
            if (model.NewPassword == model.NewPasswordConfirmation)
            {
                var result = await _userManager.ChangePasswordAsync(await _userManager.FindByIdAsync(id), model.CurrentPassword, model.NewPassword);
                if (result.Succeeded)
                {
                    return Ok("Password updated successfully.");
                }
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Response
                    {
                        Status = "Error.",
                        Message = result.Errors
                            .Select(error => error.Description)
                            .Aggregate("", (acc, error) => acc + $"*SEPARATOR*{error}")
                    });
            }
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response
                {
                    Status = "Error.",
                    Message = "New password doesn't match password confirmation field."
                });
        }
    }

}
