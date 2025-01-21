using API.Extension;
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
    }
}