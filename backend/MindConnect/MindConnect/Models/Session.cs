namespace MindConnect.Models
{
    public class Session
    {
        public Guid Id { get; set; }
        public Guid BookingId { get; set; }
        public Guid PsychologistId { get; set; }
        public Guid ClientId { get; set; }
        public string Messages { get; set; } = "";
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
