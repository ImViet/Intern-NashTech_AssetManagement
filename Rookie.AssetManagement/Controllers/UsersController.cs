        using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Rookie.AssetManagement.Business.Interfaces;
using EnsureThat;
using Rookie.AssetManagement.Constants;

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

        [HttpPost]
        public async Task<ActionResult<UserDto>> AddUser([FromBody] UserCreateDto userRequest)
        {
            var user = await _userService.AddAsync(userRequest);
            return Created(Endpoints.User, user);
        }
        [HttpPut]
        public async Task<ActionResult<UserDto>> UpdateUser(int id, [FromBody] UserUpdateDto userRequest)
        {
            var user = await _userService.UpdateAsnyc(id, userRequest);
            return Created(Endpoints.User, user);
        }

    }
}
