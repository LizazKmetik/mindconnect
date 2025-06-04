using Microsoft.AspNetCore.Mvc;
using MindConnect.Data;
using MindConnect.DTO;
using MindConnect.Models;

namespace MindConnect.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET api/users/by-email/{email}
        [HttpGet("by-email/{email}")]
        public IActionResult GetUserByEmail([FromRoute] string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null) return NotFound();
            return Ok(new { user.Id, user.Name, user.Email, user.Role });
        }


        // POST api/users
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest("Користувач вже існує");

            user.Id = Guid.NewGuid();
            user.CreatedAt = DateTime.Now;
            user.IsActive = true;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Name, user.Email, user.Role });
        }

        [HttpPost("google")]
        public async Task<IActionResult> CreateGoogleUser([FromBody] GoogleUserDto dto)
        {
            if (_context.Users.Any(u => u.Email == dto.Email))
                return BadRequest("Користувач вже існує");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,
                Role = "Client",
                Password = "", // або null, якщо дозволено
                CreatedAt = DateTime.Now,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { user.Id, user.Name, user.Email, user.Role });
        }


    }



}
