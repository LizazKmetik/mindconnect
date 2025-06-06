using System.ComponentModel.DataAnnotations.Schema;

namespace MindConnect.Models
{
    [Table("Users")]
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = "Client"!;
        public string? PendingRole { get; set; }
        public UserRole RoleNavigation { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? LastLogin { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
