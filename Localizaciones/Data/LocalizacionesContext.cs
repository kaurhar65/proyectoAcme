using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Localizaciones.Entities;

namespace Localizaciones.Data
{
    public class LocalizacionesContext : DbContext
    {
        public LocalizacionesContext (DbContextOptions<LocalizacionesContext> options)
            : base(options)
        {
        }

        public DbSet<Localizaciones.Entities.Country> Countries { get; set; } = default!;

        public DbSet<Localizaciones.Entities.City> Cities { get; set; } = default!;

        public DbSet<Localizaciones.Entities.Office> Offices { get; set; } = default!;

        public DbSet<Localizaciones.Entities.Room> Rooms { get; set; } = default!;
    }
}
