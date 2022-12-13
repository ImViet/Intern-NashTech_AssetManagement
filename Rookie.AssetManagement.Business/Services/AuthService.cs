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
            _signInManager = signInManager;
            _userManager = userManager;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<AccountDto> LoginAsync(LoginDto login)
        {
            var result = await _signInManager.PasswordSignInAsync(login.UserName, login.Password, true, true);

            if (!result.Succeeded)
            {
                return null;
            }
            var user = await _userManager.FindByNameAsync(login.UserName);
            string token = CreateToKen(user);

            var account = _mapper.Map<AccountDto>(user);
            account.Token = token;

            return account;
        }

        public async Task<AccountDto> ChangePasswordAsync(string useName, ChangePasswordDto passwordRequest)
        {
            var user = await _userManager.FindByNameAsync(useName);

            if (user == null)
            {
                throw new NotFoundException("Not Found!");
            }

            var result = await _userManager.ChangePasswordAsync(user, passwordRequest.PasswordOld, passwordRequest.PasswordNew);

            if (!result.Succeeded)
            {
                return null;
            }

            var account = _mapper.Map<AccountDto>(user);

            return account;
        }

        public async Task<AccountDto> GetAccountByUserName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return null;
            }

            var account = _mapper.Map<AccountDto>(user);

            return account;
        }

        public async Task<AccountDto> ChangePasswordFirstLoginAsync(string useName, ChangePasswordFirstLoginDto passwordRequest)
        {
            var user = await _userManager.FindByNameAsync(useName);

            if (user == null)
            {
                throw new NotFoundException("Not Found!");
            }
            if (user.IsNewUser == false)
            {
                throw new NotFoundException("Not new user");
            }
            //Generate Token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            //Set new Password
            var result = await _userManager.ResetPasswordAsync(user, token, passwordRequest.PasswordNew);

            if (!result.Succeeded)
            {
                return null;
            }

            if (user.IsNewUser)
            {
                user.IsNewUser = false;
                await _userRepository.Update(user);
            }

            var account = _mapper.Map<AccountDto>(user);

            return account;
        }

        public async Task<bool> IsUserDeleted(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return user.IsDeleted;
        }

        public async Task<bool> IsMatchPassword(string userName, string password)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                throw new NotFoundException("Not Found!");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            if (result.Succeeded)
            {
                return true;
            }
            else
            {
                return false;
            }
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
