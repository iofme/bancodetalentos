using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controller
{
    public class AccountController(UserManager<Users> userManager, DataContext context ,ITokenService tokenService, IMapper mapper) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = mapper.Map<Users>(registerDto);

            user.UserName = registerDto.UserName.ToLower();

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await tokenService.CreateToken(user),
                Role = user.Role
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.Users.FirstOrDefaultAsync(x =>
         x.NormalizedUserName == loginDto.Username.ToUpper());

            if (user == null || user.UserName == null) return Unauthorized("Ivalid username");

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await tokenService.CreateToken(user),
                Role = user.Role
            };

        }

        [Authorize]
        [HttpDelete("delete/{username}")]
        public async Task<ActionResult> DeleteUser(string username)
        {
            var userEspecifico = await userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (userEspecifico == null) return NotFound("Não foi possivel encontrar o usuario");

            try
            {
                context.Users.Remove(userEspecifico);
                await context.SaveChangesAsync();
                return Ok("Usuário deletado com sucesso");
            }
            catch (Exception ex)
            {

                return BadRequest($"Falha ao deletar o usuario{ex}");
            }
        }

        private async Task<bool> UserExists(string username)
        {
            return await userManager.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

    }
}