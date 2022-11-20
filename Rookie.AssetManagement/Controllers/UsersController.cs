using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            return new List<UserDto>() {
                new UserDto(){StaffCode = "SD0001", FullName = "Binh Nguyen Van", 
                    JoinedDate = new DateTime(), UserName = "binhnv", Type = "Staff"},
                new UserDto(){StaffCode = "SD0002", FullName = "Nam Nguyen Van",
                    JoinedDate = new DateTime(), UserName = "namnv", Type = "Staff"},
            };
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(UserCreateDto request)
        {
            return new UserDto()
            {
                Id = 1,
                StaffCode = "SD0001",
                FullName = "Binh Nguyen Van",
                JoinedDate = new DateTime(),
                UserName = "binhnv",
                Type = "Staff"
            };
        }
    }
}
