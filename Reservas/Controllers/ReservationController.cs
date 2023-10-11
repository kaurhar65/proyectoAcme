using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Reservas.Data;
using Reservas.Entities;

namespace Reservas.Controllers;

public class ReservationsController : Controller
{
    private readonly ReservasContext _context;

    public ReservationsController(ReservasContext context)
    {
        _context = context;
    }

    // GET: Reservations
    public async Task<IActionResult> Index()
    {
          return _context.Reservations != null ? 
                      View(await _context.Reservations.ToListAsync()) :
                      Problem("Entity set 'ReservasContext.Reservation'  is null.");
    }

    // GET: Reservations/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null || _context.Reservations == null)
        {
            return NotFound();
        }

        var reservation = await _context.Reservations
            .FirstOrDefaultAsync(m => m.Id == id);
        if (reservation == null)
        {
            return NotFound();
        }

        return View(reservation);
    }

    // GET: Reservations/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Reservations/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Date,StartTime,EndTime,RoomId,UserId")] Reservation reservation)
    {
        if (ModelState.IsValid)
        {
            _context.Add(reservation);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(reservation);
    }

    // GET: Reservations/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null || _context.Reservations == null)
        {
            return NotFound();
        }

        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation == null)
        {
            return NotFound();
        }
        return View(reservation);
    }

    // POST: Reservations/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Date,StartTime,EndTime,RoomId,UserId")] Reservation reservation)
    {
        if (id != reservation.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                _context.Update(reservation);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(reservation.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        return View(reservation);
    }

    // GET: Reservations/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null || _context.Reservations == null)
        {
            return NotFound();
        }

        var reservation = await _context.Reservations
            .FirstOrDefaultAsync(m => m.Id == id);
        if (reservation == null)
        {
            return NotFound();
        }

        return View(reservation);
    }

    // POST: Reservations/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        if (_context.Reservations == null)
        {
            return Problem("Entity set 'ReservasContext.Reservation'  is null.");
        }
        var reservation = await _context.Reservations.FindAsync(id);
        if (reservation != null)
        {
            _context.Reservations.Remove(reservation);
        }
        
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool ReservationExists(int id)
    {
      return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
