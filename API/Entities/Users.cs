using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class Users : IdentityUser<int>
    {
        public string? About { get; set; }
        public string? Role { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string? PhotoUrl { get; set; }
        public string? VideoUrl { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = [];
        public string? LogicaDeProgramacao { get; set; }

        public int Age => DateOnly.FromDateTime(DateTime.UtcNow).Year - DateOfBirth.Year
                   - (DateOnly.FromDateTime(DateTime.UtcNow) < DateOfBirth.AddYears(DateOnly.FromDateTime(DateTime.UtcNow).Year - DateOfBirth.Year) ? 1 : 0);

    }
}