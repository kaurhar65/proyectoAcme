#pragma warning disable CS8602, CS8604

using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RoomsApiCrudIdentity.Data;
using RoomsApiCrudIdentity.Entities;

// using RoomsApiCrudIdentity.Models; commented out because we'll need it when we add Admin roles back in

namespace RoomsApiCrudIdentity.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OfficeController : ControllerBase
{
    private readonly RoomsApiCrudDbContext _context;

    public OfficeController(RoomsApiCrudDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetAllOffices")]
    public async Task<IActionResult> GetAllOffices() =>
        Ok(await _context.Offices.ToListAsync());

    [HttpGet]
    [Route("GetOfficeById")]
    public async Task<IActionResult> GetOfficeById(int id) =>
        Ok(await _context.Offices.FindAsync(id));

    [HttpGet]
    [Route("GetOfficesByCityId")]
    public async Task<IActionResult> GetOfficesByCityId(int cityId)
    {
        var result = await _context.Offices.Where(office => office.CityId == cityId).ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpGet]
    [Route("GetOfficesByCountryId")]
    public async Task<IActionResult> GetOfficesByCountryId(int countryId)
    {
        var result = await _context.Offices
            .Join(
                _context.Cities,
                office => office.CityId,
                city => city.Id,
                (office, city) => new { Office = office, City = city }
            )
            .Join(
                _context.Countries,
                cityOffice => cityOffice.City.CountryId,
                country => country.Id,
                //(cityOffice, country) => new { CityOffice = cityOffice, Country = country })
                (cityOffice, country) =>
                    new
                    {
                        Office = cityOffice.Office,
                        City = cityOffice.City,
                        Country = country
                    }
            )
            .Where(countryCityOffice => countryCityOffice.Country.Id == countryId)
            .Select(countryCityOffice => countryCityOffice.Office)
            .ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    /*[Authorize(Roles = UserRoles.Admin)]*/
    [HttpPost]
    [Route("CreateOffice")]
    public async Task<IActionResult> CreateOffice(Office office)
    {
        _context.Offices.Add(office);
        await _context.SaveChangesAsync();
        return Created($"/GetOfficeById?id={office.Id}", office);
    }

    /*[Authorize(Roles = UserRoles.Admin)]*/
    [HttpPut]
    [Route("UpdateOffice")]
    public async Task<IActionResult> UpdateOffice(Office officeToUpdate)
    {
        _context.Offices.Update(officeToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    /*[Authorize(Roles = UserRoles.Admin)]*/
    [HttpDelete]
    [Route("DeleteOffice")]
    public async Task<IActionResult> DeleteOffice(int id)
    {
        var officeToDelete = await _context.Offices.FindAsync(id);
        if (officeToDelete == null)
        {
            return NotFound();
        }
        _context.Offices.Remove(officeToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
