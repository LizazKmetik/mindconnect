using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace MindConnect.DTO
{
    public class PsychologistApplicationDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }

        public string Phone { get; set; }
        public string Specialty { get; set; }
        public DateTime StartDate { get; set; }
        public string Bio { get; set; }
        public List<IFormFile> Certificates { get; set; }
    }
}
