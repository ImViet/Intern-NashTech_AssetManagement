using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Rookie.AssetManagement.Business.Interfaces;
using EnsureThat;
using Rookie.AssetManagement.Constants;
using System.Linq;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetAllUser()
        {
            return Ok(await _userService.GetAllAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            return Ok(await _userService.GetByIdAsync(id));
        }
        [HttpPost]
        public async Task<ActionResult<UserDto>> AddUser([FromBody] UserCreateDto userRequest)
        {
            var location = User.Claims.FirstOrDefault(x => x.Type.Equals("Location", StringComparison.OrdinalIgnoreCase))?.Value;
            var user = await _userService.AddAsync(userRequest, location);
            return Created(Endpoints.User, user);
        }
        [HttpPut]
        public async Task<ActionResult<UserDto>> UpdateUser([FromBody] UserUpdateDto userRequest)
        {
            var user = await _userService.UpdateAsnyc(userRequest);
            return Created(Endpoints.User, user);
        }

    }
}
