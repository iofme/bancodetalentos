using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(Users users);
        Task<bool> SaveAllAsync();
        Task<PagedList<EducandosDto>> GetUsersAsync(UserParams userParams);
        Task<Users?> GetUserById(int id);
        Task<Users?> GetUsersByUsername(string Username);  
    }
}