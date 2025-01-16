using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<Users> userManager, RoleManager<Role> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;


            var roles = new List<Role>
            {
                new() {Name = "Member"},
                new() {Name = "Admin"},
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            var admin = new Users
            {
                UserName = "Admin",
            };
            await userManager.CreateAsync(admin, "Admin1");
            await userManager.AddToRolesAsync(admin, ["Admin"]);
        }
    }
}