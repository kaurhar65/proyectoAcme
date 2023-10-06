#pragma warning disable CS8602, CS8604

using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RoomsApiCrudIdentity.Data;
using RoomsApiCrudIdentity.Entities;

// using RoomsApiCrudIdentity.Models; commented out because we'll need it when we bring Admin roles back in

namespace RoomsApiCrudIdentity.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CityController : ControllerBase
{
    private readonly RoomsApiCrudDbContext _context;

    public CityController(RoomsApiCrudDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetAllCities")]
    public async Task<IActionResult> GetAllCities() =>
        Ok(await _context.Cities.ToListAsync());

    [HttpGet]
    [Route("GetCityById")]
    public async Task<IActionResult> GetCityById(int id) =>
        Ok(await _context.Cities.FindAsync(id));

    [HttpGet]
    [Route("GetCitiesByCountryId")]
    public async Task<IActionResult> GetCitiesByCountryId(int countryId)
    {
        var result = await _context.Cities.Where(city => city.CountryId == countryId).ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("CreateCity")]
    public async Task<IActionResult> CreateCity(City city)
    {
        _context.Cities.Add(city);
        await _context.SaveChangesAsync();
        return Created($"/GetCityById?id={city.Id}", city);
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    [Route("UpdateCity")]
    public async Task<IActionResult> UpdateCity(City cityToUpdate)
    {
        _context.Cities.Update(cityToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // [Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    [Route("DeleteCity")]
    public async Task<IActionResult> DeleteCity(int id)
    {
        var cityToDelete = await _context.Cities.FindAsync(id);
        if (cityToDelete == null)
        {
            return NotFound();
        }
        _context.Cities.Remove(cityToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
