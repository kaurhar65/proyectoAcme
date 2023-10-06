#pragma warning disable CS8602, CS8604

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomsApiCrudIdentity.Data;
using RoomsApiCrudIdentity.Entities;

// using RoomsApiCrudIdentity.Models; commented out because we'll need it when we bring Admin roles back in

namespace RoomsApiCrudIdentity.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase
{
    private readonly RoomsApiCrudDbContext _context;

    public CountryController(RoomsApiCrudDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetAllCountries")]
    public async Task<IActionResult> GetAllCountries() =>
        Ok(await _context.Countries.ToListAsync());

    [HttpGet]
    [Route("GetCountryById")]
    public async Task<IActionResult> GetCountryById(int id) =>
        Ok(await _context.Countries.FindAsync(id));

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("CreateCountry")]
    public async Task<IActionResult> CreateCountry(Country country)
    {
        _context.Countries.Add(country);
        await _context.SaveChangesAsync();
        return Created($"/GetCountryById?id={country.Id}", country);
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    [Route("UpdateCountry")]
    public async Task<IActionResult> UpdateCountry(Country countryToUpdate)
    {
        _context.Countries.Update(countryToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    [Route("DeleteCountry")]
    public async Task<IActionResult> DeleteCountry(int id)
    {
        var countryToDelete = await _context.Countries.FindAsync(id);
        if (countryToDelete == null)
        {
            return NotFound();
        }
        _context.Countries.Remove(countryToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
