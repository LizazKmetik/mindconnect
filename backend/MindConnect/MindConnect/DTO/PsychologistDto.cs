namespace MindConnect.DTO
{
    public class PsychologistDto
    {
        public string Name { get; set; } = "";
        public string Bio { get; set; } = "";
        public string Languages { get; set; } = "";
        public int SessionCount { get; set; }
        public int ReviewCount { get; set; }
        public decimal Price { get; set; }
        public string Tags { get; set; } = "";
        public string PhotoUrl { get; set; } = "";
    }
}
