namespace MindConnect.Models
{
    public class Review
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid PsychologistId { get; set; }
        public Guid BookingId { get; set; }
        public int Rating { get; set; }
        public string ReviewText { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
