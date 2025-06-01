namespace MindConnect.Models
{
    public class PsychologistProfile
    {
        public Guid Id { get; set; }
        public string Bio { get; set; } = "";
        public string Specializations { get; set; } = "";
        public int ExperienceYears { get; set; }
        public string Education { get; set; } = "";
        public string Certificates { get; set; } = "";
        public string ProfilePhoto { get; set; } = "";
        public string Languages { get; set; } = "";
        public decimal PricePerSession { get; set; }

    }
}
