#pragma warning disable CS8602, CS8604

using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoomsApiCrudIdentity.Data;
using RoomsApiCrudIdentity.Entities;
using RoomsApiCrudIdentity.Models;

// using RoomsApiCrudIdentity.Models; commented out because we'll need it when we bring Admin roles back in

namespace RoomsApiCrudIdentity.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RoomController : ControllerBase
{
    private readonly RoomsApiCrudDbContext _context;

    public RoomController(RoomsApiCrudDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("GetAllRooms")]
    public async Task<IActionResult> GetAllRooms()
    {
        return Ok(await _context.Rooms.ToListAsync());
    }

    [HttpGet]
    [Route("GetRoomById")]
    public async Task<IActionResult> GetRoomById(int id)
    {
        return Ok(await _context.Rooms.FindAsync(id));
    }

    [HttpGet]
    [Route("GetRoomsByOfficeId")]
    public async Task<IActionResult> GetRoomsByOfficeId(int officeId)
    {
        var result = await _context.Rooms.Where(room => room.OfficeId == officeId).ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpGet]
    [Route("GetRoomsByCityId")]
    public async Task<IActionResult> GetRoomsByCityId(int cityId)
    {
        var result = await _context.Rooms
            .Join(
                _context.Offices,
                room => room.OfficeId,
                office => office.Id,
                (room, office) => new { Room = room, Office = office }
            )
            .Join(
                _context.Cities,
                officeRoom => officeRoom.Office.CityId,
                city => city.Id,
                (officeRoom, city) => new { officeRoom, City = city }
            )
            .Where(cityOfficeRoom => cityOfficeRoom.City.Id == cityId)
            .Select(cityOfficeRoom => cityOfficeRoom.officeRoom.Room)
            .ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpGet]
    [Route("GetRoomsByCountryId")]
    public async Task<IActionResult> GetRoomsByCountryId(int countryId)
    {
        var result = await _context.Rooms
            .Join(
                _context.Offices,
                room => room.OfficeId,
                office => office.Id,
                (room, office) => new { Room = room, Office = office }
            )
            .Join(
                _context.Cities,
                officeRoom => officeRoom.Office.CityId,
                city => city.Id,
                (officeRoom, city) =>
                    new
                    {
                        Room = officeRoom.Room,
                        Office = officeRoom.Office,
                        City = city
                    }
            )
            .Join(
                _context.Countries,
                cityOfficeRoom => cityOfficeRoom.City.CountryId,
                country => country.Id,
                (cityOfficeRoom, country) => new { cityOfficeRoom, Country = country }
            )
            .Where(countryCityOfficeRoom => countryCityOfficeRoom.Country.Id == countryId)
            .Select(countryCityOfficeRoom => countryCityOfficeRoom.cityOfficeRoom.Room)
            .ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }
        return Ok(result);
    }

    [HttpGet]
    [Route("GetAllRoomExtendedDTOs")]
    public async Task<IActionResult> GetAllRoomExtendedDTOs()
    {
        var result = await _context.Rooms
            .Join(
                _context.Offices,
                room => room.OfficeId,
                office => office.Id,
                (room, office) => new { Room = room, Office = office }
            )
            .Join(
                _context.Cities,
                officeRoom => officeRoom.Office.CityId,
                city => city.Id,
                (officeRoom, city) =>
                    new
                    {
                        Room = officeRoom.Room,
                        Office = officeRoom.Office,
                        City = city
                    }
            )
            .Join(
                _context.Countries,
                cityOfficeRoom => cityOfficeRoom.City.CountryId,
                country => country.Id,
                (cityOfficeRoom, country) =>
                    new
                    {
                        Room = cityOfficeRoom.Room,
                        Office = cityOfficeRoom.Office,
                        City = cityOfficeRoom.City,
                        Country = country
                    }
            )
            .Select(
                countryCityOfficeRoom =>
                    new RoomExtendedDTO
                    {
                        Id = countryCityOfficeRoom.Room.Id,
                        Name = countryCityOfficeRoom.Room.Name,
                        Capacity = countryCityOfficeRoom.Room.Capacity,
                        OfficeName = countryCityOfficeRoom.Office.Name,
                        CityName = countryCityOfficeRoom.City.Name,
                        CountryName = countryCityOfficeRoom.Country.Name,
                    }
            )
            .ToListAsync();
        if (!result.Any())
        {
            return NotFound();
        }

        return Ok(result);
    }

    //[Authorize(Roles = UserRoles.Admin)]
    [HttpPost]
    [Route("CreateRoom")]
    public async Task<IActionResult> CreateRoom(Room room)
    {
        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();
        return Created($"/GetOfficeById?id={room.Id}", room);
    }

    //[Authorize(Roles = UserRoles.Admin)]
    [HttpPut]
    [Route("UpdateRoom")]
    public async Task<IActionResult> UpdateRoom(Room roomToUpdate)
    {
        _context.Rooms.Update(roomToUpdate);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    //[Authorize(Roles = UserRoles.Admin)]
    [HttpDelete]
    [Route("DeleteRoom")]
    public async Task<IActionResult> DeleteRoom(int id)
    {
        var roomToDelete = await _context.Rooms.FindAsync(id);
        if (roomToDelete == null)
        {
            return NotFound();
        }
        _context.Rooms.Remove(roomToDelete);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
