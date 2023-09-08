#pragma warning disable CS8602, CS8604

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using System.Data;

using RoomsApiCrudIdentity.Data;
using RoomsApiCrudIdentity.Entities;
using RoomsApiCrudIdentity.Models;

namespace RoomsApiCrudIdentity.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public readonly string _connectionString;
        private readonly RoomsApiCrudDbContext _context;
        private readonly IAuthorizationService _authorizationService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ReservationController(IHttpContextAccessor httpContextAccessor, IConfiguration configuration, RoomsApiCrudDbContext context, IAuthorizationService authorizationService)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("RoomsApiCrudConn")!;
            _context = context;
            _authorizationService = authorizationService;
            _httpContextAccessor = httpContextAccessor;
        }

        // [Authorize(Roles = "Admin")]
        [Authorize]
        [HttpGet]
        [Route("GetAllReservations")]
        public async Task<IActionResult> GetAllReservations()
        {
            return Ok(await _context.Reservations.ToListAsync());
        }

        // [Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpGet]
        [Route("GetReservationById")]
        public async Task<IActionResult> GetReservationById(int id)
        {
            return Ok(await _context.Reservations.FindAsync(id));
        }

        // [Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpGet]
        [Route("GetReservationsByRoomId")]
        public async Task<IActionResult> GetReservationsByRoomId(int roomId)
        {
            var result = await _context.Reservations
                .Where(
                    reservation => reservation.RoomId == roomId)
                .ToListAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        // [Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpGet]
        [Route("GetReservationsByOfficeId")]
        public async Task<IActionResult> GetReservationsByOfficeId(int officeId)
        {
            var result = await _context.Reservations.Join(
                    _context.Rooms,
                    reservation => reservation.RoomId,
                    room => room.Id,
                    (reservation, room) => new { Reservation = reservation, Room = room })
                .Join(
                    _context.Offices,
                    roomReservation => roomReservation.Room.OfficeId,
                    office => office.Id,
                    (roomReservation, office) => new { roomReservation.Reservation, Room = roomReservation.Room, Office = office })
                .Where(
                    officeRoomReservation => officeRoomReservation.Office.Id == officeId)
                .Select(
                    officeRoomReservation => officeRoomReservation.Reservation)
                .ToListAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        // [Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpGet]
        [Route("GetReservationsByCityId")]
        public async Task<IActionResult> GetReservationsByCityId(int cityId)
        {
            var result = await _context.Reservations.Join(
                    _context.Rooms,
                    reservation => reservation.RoomId,
                    room => room.Id,
                    (reservation, room) => new { Reservation = reservation, Room = room })
                .Join(
                    _context.Offices,
                    roomReservation => roomReservation.Room.OfficeId,
                    office => office.Id,
                    (roomReservation, office) => new { Reservation = roomReservation.Reservation, Room = roomReservation.Room, Office = office })
                .Join(
                    _context.Cities,
                    officeRoomReservation => officeRoomReservation.Office.CityId,
                    city => city.Id,
                    (officeRoomReservation, city) => new { Reservation = officeRoomReservation.Reservation, Room = officeRoomReservation.Room, Office = officeRoomReservation.Office, City = city }
                )
                .Where(
                    cityOfficeRoomReservation => cityOfficeRoomReservation.City.Id == cityId)
                .Select(
                    cityOfficeRoomReservation => cityOfficeRoomReservation.Reservation)
                .ToListAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        //[Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpGet]
        [Route("GetReservationsByCountryId")]
        public async Task<IActionResult> GetReservationsByCountryId(int countryId)
        {
            var result = await _context.Reservations.Join(
                    _context.Rooms,
                    reservation => reservation.RoomId,
                    room => room.Id,
                    (reservation, room) => new { Reservation = reservation, Room = room })
                .Join(
                    _context.Offices,
                    roomReservation => roomReservation.Room.OfficeId,
                    office => office.Id,
                    (roomReservation, office) => new { Reservation = roomReservation.Reservation, Room = roomReservation.Room, Office = office })
                .Join(
                    _context.Cities,
                    officeRoomReservation => officeRoomReservation.Office.CityId,
                    city => city.Id,
                    (officeRoomReservation, city) => new { Reservation = officeRoomReservation.Reservation, Room = officeRoomReservation.Room, Office = officeRoomReservation.Office, City = city }
                )
                .Join(
                    _context.Countries,
                    cityOfficeRoomReservation => cityOfficeRoomReservation.City.CountryId,
                    country => country.Id,
                    (cityOfficeRoomReservation, country) => new { Reservation = cityOfficeRoomReservation.Reservation, Room = cityOfficeRoomReservation.Room, Office = cityOfficeRoomReservation.Office, City = cityOfficeRoomReservation.City, Country = country })
                .Where(
                    countryCityOfficeRoomReservation => countryCityOfficeRoomReservation.Country.Id == countryId)
                .Select(
                    countryCityOfficeRoomReservation => countryCityOfficeRoomReservation.Reservation)
                .ToListAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        // [Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpGet]
        [Route("GetReservationsByUserId")]
        public async Task<IActionResult> GetReservationsByUserId(string userId)
        {
            var result = await _context.Reservations.Join(
                    _context.Rooms,
                    reservation => reservation.RoomId,
                    room => room.Id,
                    (reservation, room) => new { Reservation = reservation, Room = room })
                .Join(
                    _context.Offices,
                    roomReservation => roomReservation.Room.OfficeId,
                    office => office.Id,
                    (roomReservation, office) => new { Reservation = roomReservation.Reservation, Room = roomReservation.Room, Office = office })
                .Join(
                    _context.Cities,
                    officeRoomReservation => officeRoomReservation.Office.CityId,
                    city => city.Id,
                    (officeRoomReservation, city) => new { Reservation = officeRoomReservation.Reservation, Room = officeRoomReservation.Room, Office = officeRoomReservation.Office, City = city }
                )
                .Join(
                    _context.Countries,
                    cityOfficeRoomReservation => cityOfficeRoomReservation.City.CountryId,
                    country => country.Id,
                    (cityOfficeRoomReservation, country) => new { Reservation = cityOfficeRoomReservation.Reservation, Room = cityOfficeRoomReservation.Room, Office = cityOfficeRoomReservation.Office, City = cityOfficeRoomReservation.City, Country = country })
                .Where(
                    countryCityOfficeRoomReservation => countryCityOfficeRoomReservation.Reservation.UserId == userId)   
                .Select(
                    countryCityOfficeRoomReservation => new ReservationExtendedDTOModel {
                        Id = countryCityOfficeRoomReservation.Reservation.Id,
                        Date = countryCityOfficeRoomReservation.Reservation.Date,
                        StartTime = countryCityOfficeRoomReservation.Reservation.StartTime,
                        EndTime = countryCityOfficeRoomReservation.Reservation.EndTime,
                        RoomName = countryCityOfficeRoomReservation.Room.Name,
                        RoomId = countryCityOfficeRoomReservation.Room.Id,
                        OfficeName = countryCityOfficeRoomReservation.Office.Name,
                        CityName = countryCityOfficeRoomReservation.City.Name,
                        CountryName = countryCityOfficeRoomReservation.Country.Name,
                        UserId = countryCityOfficeRoomReservation.Reservation.UserId
                    }
                )
                .ToListAsync();
            if (!result.Any())
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        [Route("CreateReservation")]
        public async Task<IActionResult> CreateReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return Created($"/GetReservationById?id={reservation.Id}", reservation);
        }

        //[Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpPut]
        [Route("UpdateReservation")]
        public async Task<IActionResult> UpdateReservation(Reservation reservationToUpdate)
        {
            // var originalReservation = await _context.Reservations.FindAsync(reservationToUpdate.Id);
            // var currentUser = _httpContextAccessor.HttpContext.User;
            // string jwt = _httpContextAccessor.HttpContext.Request.Headers
            // .Any(x => x.Key == "Authorization") ? 
            //     _httpContextAccessor.HttpContext.Request.Headers
            //         .Where(x => x.Key == "Authorization")
            //         .FirstOrDefault()
            //         .Value
            //         .SingleOrDefault()
            //         .Replace("Bearer ", "") : "";
            // System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler handler = new();
            // System.IdentityModel.Tokens.Jwt.JwtSecurityToken token = handler.ReadJwtToken(jwt);
            // //.HttpContext?.User.
            // if (token.Claims.FirstOrDefault(claim => claim.Type.Equals("UserId"))?.Value.Equals(originalReservation.UserId) ?? false)

            //var result = await _authorizationService.AuthorizeAsync(currentUser, originalReservation, "ReservationPolicy");
            //var result = await _authorizationHandler.HandleRequirementAsync(new AuthorizationHandlerContext(), new ReservationAccessRequirement(), originalReservation);
            // if (result.Succeeded)
            // {
                _context.Reservations.Update(reservationToUpdate);
                var result = await _context.SaveChangesAsync();
                return NoContent();
                    //});
            // }
            // return Forbid();
            //return StatusCode(StatusCodes.Status500InternalServerError, result.Failure.FailureReasons
                        //    .Select(error => error.Message)
                        //    .Aggregate("", (acc, error) => acc + $"*SEPARATOR*{error}"));
        }

        //[Authorize(Policy = "ReservationPolicy")]
        [Authorize]
        [HttpDelete]
        [Route("DeleteReservation")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            // var reservationToDelete = await _context.Reservations.FindAsync(id);
            
            var reservationToDelete = await _context.Reservations.FindAsync(id);
                //.Where(reservation => reservation.Id == id)
                //.FirstOrDefaultAsync();

            if (reservationToDelete is null)
            {
                return NotFound();
            }
            
            //if ((await _authorizationService.AuthorizeAsync(User, reservationToDelete, "ReservationPolicy")).Succeeded)
            //{
                _context.Reservations.Remove(reservationToDelete);
                await _context.SaveChangesAsync();
                return NoContent();
            //}
        
            //return Forbid();
        }
    }
}