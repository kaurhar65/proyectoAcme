using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reservas.Entities;

namespace Reservas.Data
{
    public class ReservasContext : DbContext
    {
        public ReservasContext (DbContextOptions<ReservasContext> options)
            : base(options)
        {
        }

        public DbSet<Reservas.Entities.Reservation> Reservations { get; set; } = default!;
    }
}
