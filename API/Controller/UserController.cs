using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controller
{
    public class UserController(IUserRepository repository, IMapper mapper) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers([FromQuery]UserParams userParams)
        {
            var users = await repository.GetUsersAsync(userParams);

            Response.AddPaginationHeader(users);

            return Ok(users);
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<Users>> GetUser(string username)
        {
            var user = await repository.GetUsersByUsername(username);

            if (user == null) return NotFound();

            return user;
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userID == null) return BadRequest("'Não foi possivel achar o usuario pelo token");

            var user = await repository.GetUserById(Int32.Parse(userID));

            if (user == null) return BadRequest("Não foi possivel achar o usuario");


            mapper.Map(memberUpdateDto, user);

            if (await repository.SaveAllAsync()) return NoContent();

            return BadRequest("Falha ao atualizar o usuario");
        }


        [Authorize]
        [HttpPut("{username}")]
        public async Task<ActionResult> UpdateUserEspecifico(string username, MemberUpdateDto memberUpdateDto)
        {
            var userID = username;
            var user = await repository.GetUsersByUsername(userID);

            if (user == null) return NotFound();

            mapper.Map(memberUpdateDto, user);

            if (await repository.SaveAllAsync()) return NoContent();

            return BadRequest("Falha ao atualizar o usuario");
        }

    }
}