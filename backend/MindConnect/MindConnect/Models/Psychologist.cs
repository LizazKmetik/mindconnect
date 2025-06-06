using System.ComponentModel.DataAnnotations.Schema;

namespace MindConnect.Models
{
    [Table("Psychologist")]
    public class Psychologist
    {
        public Guid Id { get; set; }
        public Guid ProfileId { get; set; }
        public bool Verified { get; set; } = false;

        public User User { get; set; } = null!;
        public PsychologistProfile Profile { get; set; } = null!;
        public bool IsModeratorApproved { get; set; } = false;

    }
}
