namespace Localizaciones.Entities
{
    //Definicion de entidad con sus atributos
    public class Room
    {
        public int Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public int Capacity { get; set; } = default!;
        public int OfficeId { get; set; } = -1;
    }
}
