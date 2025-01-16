using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class UserRole : IdentityUserRole<int>
    {
        public Users User { get; set; } = null!;
        public Role Role { get; set; } = null!;

    }
}