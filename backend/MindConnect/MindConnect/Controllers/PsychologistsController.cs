using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MindConnect.Data;
using MindConnect.DTO;
using MindConnect.DTO;
using MindConnect.Models;
using System.Text.Json;

namespace MindConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PsychologistsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public PsychologistsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PsychologistDto>>> GetPsychologists()
        {
            var psychologists = await _context.Psychologist
                .Include(p => p.User)
                .Include(p => p.Profile)
                .ToListAsync();

            var result = psychologists.Select(p => new PsychologistDto
            {
                Name = p.User.Name,
                Bio = p.Profile.Bio,
                Languages = p.Profile.Languages,
                Price = p.Profile.PricePerSession,
                SessionCount = _context.Session.Count(s => s.PsychologistId == p.Id),
                ReviewCount = _context.Review.Count(r => r.PsychologistId == p.Id),
                Tags = p.Profile.Specializations,
                PhotoUrl = p.Profile.ProfilePhoto
            });

            return Ok(result);
        }

        /*[Authorize]*/
        [HttpPost("apply")]
        public async Task<IActionResult> Apply([FromForm] PsychologistApplicationDto dto)
        {
            var userEmail = dto.Email;
            if (string.IsNullOrEmpty(userEmail))
                return Unauthorized("Не вдалося отримати email авторизованого користувача");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null)
                return BadRequest("Користувач не знайдений");

            user.PendingRole = "Psychologist";
            _context.Users.Update(user);


            var uploadPath = Path.Combine(_env.WebRootPath, "uploads", "certificates");
            Directory.CreateDirectory(uploadPath);


            var certPaths = new List<string>();
            foreach (var file in dto.Certificates)
            {
                string fileName = $"{Guid.NewGuid()}_{file.FileName}";
                string filePath = Path.Combine(uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                certPaths.Add($"/uploads/certificates/{fileName}");
            }

            int experienceYears = DateTime.Now.Year - dto.StartDate.Year;

            var profile = new PsychologistProfile
            {
                Id = Guid.NewGuid(),
                Bio = dto.Bio,
                Languages = null,
                PricePerSession = 0,
                Specializations = dto.Specialty,
                ExperienceYears = experienceYears,
                Education = null,
                Certificates = JsonSerializer.Serialize(certPaths),
                ProfilePhoto = null
            };
            await _context.PsychologistProfile.AddAsync(profile);

            var existingPsychologist = await _context.Psychologist.FindAsync(user.Id);
            if (existingPsychologist != null)
            {
                return BadRequest("Користувач вже подав заявку або є психологом.");
            }


            var psychologist = new Psychologist
            {
                Id = user.Id,
                ProfileId = profile.Id,
                Verified = false
            };
            await _context.Psychologist.AddAsync(psychologist);

            await _context.SaveChangesAsync();
            return Ok("Заявку надіслано успішно");
        }

        [HttpGet("applications")]
        public async Task<ActionResult<IEnumerable<PsychologistApplicationViewDto>>> GetPendingApplications()
        {
            var pending = await _context.Psychologist
                .Include(p => p.Profile)
                .Include(p => p.User)
                .Where(p =>
                    p.User.PendingRole == "Psychologist" &&
                    p.User.Role != "Psychologist")
                .ToListAsync();

            var result = pending.Select(p => new PsychologistApplicationViewDto
            {
                UserId = p.User.Id,
                Name = p.User.Name ?? "",
                Email = p.User.Email ?? "",
                Phone = p.Profile?.Phone ?? "",
                Bio = p.Profile?.Bio ?? "",
                Specializations = p.Profile?.Specializations ?? "",
                ExperienceYears = p.Profile?.ExperienceYears ?? 0,
                CertificateLinks = !string.IsNullOrWhiteSpace(p.Profile?.Certificates)
                    ? JsonSerializer.Deserialize<List<string>>(p.Profile.Certificates)!
                    : new List<string>(),
                IsModeratorApproved = p.IsModeratorApproved,
                Verified = p.Verified
            });

            return Ok(result);
        }






        [HttpPost("approve/{userId}")]
        public async Task<IActionResult> ApprovePsychologist(Guid userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return NotFound("Користувач не знайдений");

            var psychologist = await _context.Psychologist.FirstOrDefaultAsync(p => p.Id == userId);
            if (psychologist == null)
                return NotFound("Заявка психолога не знайдена");

            user.Role = "Psychologist";
            user.PendingRole = null;
            psychologist.Verified = true;

            await _context.SaveChangesAsync();
            return Ok("Заявку схвалено. Роль оновлено.");
        }

        [HttpPost("moderator/approve/{userId}")]
        public async Task<IActionResult> ApproveByModerator(Guid userId)
        {
            var psychologist = await _context.Psychologist
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == userId);

            if (psychologist == null)
                return NotFound("Заявка не знайдена");

            psychologist.IsModeratorApproved = true;
            await _context.SaveChangesAsync();

            return Ok("Модератор схвалив заявку");
        }



    }
}
