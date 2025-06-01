using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MindConnect.Data;
using MindConnect.DTO;

namespace MindConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PsychologistsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PsychologistsController(ApplicationDbContext context)
        {
            _context = context;
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
    }
}
