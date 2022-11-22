using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Constants;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Constants;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
//using System.Web.Http.ModelBinding;
//using System.Web.Http.Results;

namespace Rookie.AssetManagement.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IMapper _mapper;


        public AuthService(IBaseRepository<User> userRepository, SignInManager<User> signInManager, UserManager<User> userManager, IMapper mapper)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<AccountDto> LoginAsync(LoginDto request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, true, true);

            if (!result.Succeeded)
            {
                return null;
            }
            var user = await _userManager.FindByNameAsync(request.UserName);
            string token = CreateToKen(user);

            var account = _mapper.Map<AccountDto>(user);
            account.Token = token;

            return account;
        }

        public async Task<AccountDto> ChangePasswordAsync(string username, ChangePasswordDto passwordRequest)
        {
            var User = await _userManager.FindByNameAsync(username);

            if (User == null)
            {
                throw new NotFoundException("Not Found!");
            }

            var result = await _userManager.ChangePasswordAsync(User, passwordRequest.PasswordOld, passwordRequest.PasswordNew);

            if (!result.Succeeded)
            {
                return null;
            }

            var account = _mapper.Map<AccountDto>(User);

            return account;
        }

        public async Task<AccountDto> GetAccountByUserName(string UserName)
        {
            var User = await _userManager.FindByNameAsync(UserName);

            if (User == null)
            {
                return null;
            }

            var account = _mapper.Map<AccountDto>(User);

            return account;
        }

        public async Task<AccountDto> ChangePasswordFirstLoginAsync(string username, ChangePasswordFirstLoginDto passwordRequest)
        {
            var User = await _userManager.FindByNameAsync(username);

            if (User == null)
            {
                throw new NotFoundException("Not Found!");
            }
            //Generate Token
            var token = await _userManager.GeneratePasswordResetTokenAsync(User);

            //Set new Password
            var result = await _userManager.ResetPasswordAsync(User, token, passwordRequest.PasswordNew);

            if (!result.Succeeded)
            {
                return null;
            }

            if (User.IsNewUser)
            {
                User.IsNewUser = false;
                await _userRepository.Update(User);
            }

            var account = _mapper.Map<AccountDto>(User);

            return account;
        }

        public async Task<bool> IsUserDeleted(string UserName)
        {
            var User = await _userManager.FindByNameAsync(UserName);
            return User.IsDeleted;
        }

        private string CreateToKen(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("UserName", user.UserName),
                new Claim("Type", user.Type),
                new Claim("Location",user.Location)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSettings.Key));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                JWTSettings.Issuer,
                JWTSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


    }
}
