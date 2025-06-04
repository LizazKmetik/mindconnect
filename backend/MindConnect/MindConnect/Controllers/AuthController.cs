using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MindConnect.Data;
using MindConnect.DTO;
using MindConnect.Models;
using System.Security.Cryptography;
using System.Text;

namespace MindConnect.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (_context.Users.Any(u => u.Email == dto.Email))
            return BadRequest("Користувач із таким email вже існує");

        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Email = dto.Email,
            Password = HashPassword(dto.Password),
            Role = "Client",
            CreatedAt = DateTime.Now,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { user.Id, user.Name, user.Role });
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);

        if (user == null || !VerifyPassword(dto.Password, user.Password))
            return Unauthorized("Неправильний email або пароль");

        user.LastLogin = DateTime.Now;
        _context.SaveChanges();

        return Ok(new { user.Id, user.Name, user.Role });
    }

    // Хешування пароля
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    // Перевірка хешу
    private bool VerifyPassword(string password, string hashed)
    {
        return HashPassword(password) == hashed;
    }

    [HttpPost("google-login")]
    public async Task<IActionResult> GoogleLogin(GoogleUserDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null)
        {
            // Створення нового користувача
            user = new User
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Email = dto.Email,
                Role = "Client", // За замовчуванням
                CreatedAt = DateTime.Now,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        user.LastLogin = DateTime.Now;
        await _context.SaveChangesAsync();

        return Ok(new { user.Id, user.Name, user.Email, user.Role });
    }

}
