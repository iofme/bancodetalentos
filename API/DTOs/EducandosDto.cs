using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class EducandosDto
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public int Age { get; set; }
        public required string Role { get; set; }
        public string? About { get; set; }
        public string? PhotoUrl { get; set; }
        public string? VideoUrl { get; set; }
        public string? LogicaDeProgramacao { get; set; }
    }
}