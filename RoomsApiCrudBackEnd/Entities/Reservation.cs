using Microsoft.AspNetCore.Mvc;

namespace RoomsApiCrudIdentity.Entities
{
    public class Reservation
    {
        public int Id { get; set; } = default!;
        public string? Date { get; set; } = null;
        public string? StartTime { get; set; } = null;
        public string? EndTime { get; set; } = null;
        public int RoomId { get; set; } = -1;
        public string? UserId { get; set; } = null;
    }
}