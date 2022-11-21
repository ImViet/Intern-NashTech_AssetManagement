using EnsureThat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Constants;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<User> userManager;

        public AuthController(IAuthService authService, UserManager<User> userManager)
        {
            _authService = authService;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult<AccountDto>> LoginUser([FromBody] LoginDto userRequest)
        {
            var account = await _authService.LoginAsync(userRequest);
            if (account == null)
            {
                return BadRequest("Username or password is incorrect!");
            }
            return Ok(account);
        }

        [HttpPut("change-password")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<ChangePasswordDto>> ChangePassWord(
           [FromBody] ChangePasswordDto brandRequest)
        {
            var userId = Convert.ToInt32(userManager.GetUserId(User));

            Ensure.Any.IsNotNull(brandRequest, nameof(brandRequest));

            var updatedBrand = await _authService.ChangePasswordAsync(userId, brandRequest);

            return Ok(updatedBrand);
        }
    }
}
