using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extension;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository(DataContext context, IMapper mapper ) : IUserRepository
    {
        public async Task<Users?> GetUserById(int id)
        {
            return await context.Users.FindAsync(id);
        }
        

        public async Task<PagedList<EducandosDto>> GetUsersAsync(UserParams userParams)
        {
            var query = context.Users.Where(x => x.NormalizedUserName != "ADMIN").AsQueryable();

            if(userParams.Role != null){
                query = query.Where(x => x.Role == userParams.Role);
            }

            return await PagedList<EducandosDto>.CreateAsync(query.ProjectTo<EducandosDto>(mapper.ConfigurationProvider), userParams.PageNumber, userParams.PageSize);
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