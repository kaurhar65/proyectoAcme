using Microsoft.AspNetCore.Mvc;

namespace Proyecto1.Models
{
    public class Reservation : IModel
    {
        public int Id { get; set; } = default!;
        public DateTime? Date { get; set; } = null;
        public DateTime? StartTime { get; set; } = null;
        public DateTime? EndTime { get; set; } = null;
        public int RoomId { get; set; } = -1;
        public string? UserId { get; set; } = null;
    }
}