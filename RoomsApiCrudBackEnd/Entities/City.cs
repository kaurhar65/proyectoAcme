using Microsoft.AspNetCore.Mvc;

namespace RoomsApiCrudIdentity.Entities
{
    public class City
    {
        public int Id { get; set; } = default!;
        public string? Name { get; set; } = null;
        public int CountryId { get; set; } = -1;
    }
}