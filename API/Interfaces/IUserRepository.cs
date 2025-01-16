using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(Users users);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Users>> GetUsersAsync();
        Task<Users?> GetUserById(int id);
        Task<Users?> GetUsersByUsername(string Username);  
    }
}