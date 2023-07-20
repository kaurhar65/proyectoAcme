using Microsoft.AspNetCore.Mvc;

namespace RoomsApiCrudIdentity.Entities
{
    public class Room
    {
        public int Id { get; set; } = default!;
        public string? Name { get; set; } = null;
        public int OfficeId { get; set; } = -1;
    }
}