namespace RoomsApiCrudIdentity.Entities;

public class Office
{
    public int Id { get; set; } = default!;
    public string? Name { get; set; } = null;
    public int CityId { get; set; } = -1;
}