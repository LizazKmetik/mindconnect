namespace MindConnect.DTO
{
    public class PsychologistApplicationViewDto
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public string Bio { get; set; }
        public string Specializations { get; set; }
        public int ExperienceYears { get; set; }
        public List<string> CertificateLinks { get; set; }
        public bool? IsModeratorApproved { get; set; }

        public bool Verified { get; set; }
    }
}
