using System.ComponentModel.DataAnnotations;

namespace MindConnect.Models
{
    public class UserRole
    {
        [Key]
        public string RoleName { get; set; }

        public ICollection<User> Users { get; set; }
    }

}
