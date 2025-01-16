using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        public required string UserName { get; set; } = string.Empty;

        [MaxLength(16)]
        [MinLength(4)]
        public required string Password { get; set; } = string.Empty;
        public required string About { get; set; }
        public required string Role { get; set; }
        public required DateOnly Age { get; set; }
        public string? PhotoUrl { get; set; }
        public string? VideoUrl { get; set; }
        public required string LogicaDeProgramacao { get; set; }
    }
}