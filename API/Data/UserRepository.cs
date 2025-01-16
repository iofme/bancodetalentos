using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Extension;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository(DataContext context ) : IUserRepository
    {
        public async Task<Users?> GetUserById(int id)
        {
            return await context.Users.FindAsync(id);
        }
        

        public async Task<IEnumerable<Users>> GetUsersAsync()
        {
            return await context.Users.Where(x => x.NormalizedUserName != "ADMIN").ToListAsync();
        }

        public Task<Users?> GetUsersByID(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Users?> GetUsersByUsername(string Username)
        {
            return await context.Users.SingleOrDefaultAsync(x => x.UserName == Username);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Users users)
        {
            context.Entry(users).State = EntityState.Modified;
        }

        
    }
}