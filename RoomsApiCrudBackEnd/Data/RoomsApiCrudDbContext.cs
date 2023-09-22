using Microsoft.EntityFrameworkCore;
using RoomsApiCrudIdentity.Entities;

namespace RoomsApiCrudIdentity.Data;

public class RoomsApiCrudDbContext : DbContext
{
    public RoomsApiCrudDbContext(DbContextOptions<RoomsApiCrudDbContext> options)
        : base(options) { }

    public DbSet<City>? Cities { get; set; }
    public DbSet<Office>? Offices { get; set; }
    public DbSet<Country>? Countries { get; set; }
    public DbSet<Reservation>? Reservations { get; set; }
    public DbSet<Room>? Rooms { get; set; }
    public DbSet<LockedDate>? LockedDates { get; set; }
}
