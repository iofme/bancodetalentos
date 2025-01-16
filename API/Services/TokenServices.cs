using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenServices(IConfiguration config, UserManager<Users> userManager) : ITokenService
    {
        public async Task<string> CreateToken(Users users)
        {
            var tokenKey = config["TokenKey"] ?? throw new Exception("Não foi possivel achar a chave token");
            if (tokenKey.Length < 64) throw new Exception("Token precisa ser mais longo");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));


            if (users.UserName == null) throw new Exception("No username for user");

            var claim = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, users.Id.ToString()),
                new(ClaimTypes.Name, users.UserName),
            };

            var roles = await userManager.GetRolesAsync(users);

            claim.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHadler = new JwtSecurityTokenHandler();
            var token = tokenHadler.CreateToken(tokenDescriptor);

            return tokenHadler.WriteToken(token);
        }
    }
}