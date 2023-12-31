﻿using EnsureThat;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<User> _userManager;

        public AuthController(IAuthService authService, UserManager<User> userManager)
        {
            _authService = authService;
            _userManager = userManager;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("me")]
        public async Task<ActionResult<AccountDto>> GetMe()
        {
            var username = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
            var account = await _authService.GetAccountByUserName(username);
            if (account == null)
            {
                return BadRequest("No user");
            }
            return Ok(account);
        }

        [HttpPost]
        public async Task<ActionResult<AccountDto>> LoginUser([FromBody] LoginDto userRequest)
        {
            var account = await _authService.GetAccountByUserName(userRequest.UserName);
            if (account == null)
            {
                return BadRequest("Username or password is incorrect. Please try again");
            }

            var isDeleted = await _authService.IsUserDeleted(userRequest.UserName);
            if (isDeleted)
            {
                return BadRequest("Your account is disabled. Please contact with IT Team");
            }

            account = await _authService.LoginAsync(userRequest);
            if (account == null)
            {
                return BadRequest("Username or password is incorrect. Please try again");
            }
            return Ok(account);
        }

        [HttpPut("change-password")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<AccountDto>> ChangePassWord(
        [FromBody] ChangePasswordDto changePasswordDto)
        {
            var username = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;

            var result = await _authService.IsMatchPassword(username, changePasswordDto.PasswordOld);
            if (result == false)
            {
                return BadRequest(new ChangePasswordErrorDto() { PasswordOld = "Password is incorrect!" });
            }

            result = await _authService.IsMatchPassword(username, changePasswordDto.PasswordNew);
            if (result == true)
            {
                return BadRequest(new ChangePasswordErrorDto() { PasswordNew = "Your new password cannot be same as old password." });
            }

            var account = await _authService.ChangePasswordAsync(username, changePasswordDto);
            if (account == null)
            {
                return BadRequest(new ChangePasswordErrorDto() { PasswordOld = "Password is incorrect!" });
            }

            return Ok(account);
        }

        [HttpPut("change-password-first-login")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<AccountDto>> ChangePassWordFirstLogin(
            [FromBody] ChangePasswordFirstLoginDto changePasswordDto)
        {
            var username = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;

            var result = await _authService.IsMatchPassword(username, changePasswordDto.PasswordNew);
            if (result == true)
            {
                return BadRequest("Your new password cannot be same as old password.");
            }

            var account = await _authService.ChangePasswordFirstLoginAsync(username, changePasswordDto);

            return Ok(account);
        }
    }
}
