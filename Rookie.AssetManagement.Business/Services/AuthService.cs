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
        private readonly IConfiguration _configuration;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IBaseRepository<User> _userRepository;
        private readonly IMapper _mapper;


        public AuthService(IBaseRepository<User> userRepository, IConfiguration configuration, SignInManager<User> signInManager, UserManager<User> userManager, IMapper mapper)
        {
            _configuration = configuration;
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

        public async Task<bool> ChangePasswordAsync(int id, ChangePasswordDto passwordRequest)
        {
            var User = await _userRepository.Entities.FirstOrDefaultAsync(x => x.Id == id);

            if (User == null)
            {
                throw new NotFoundException("Not Found!");
            }

            var result = await _userManager.ChangePasswordAsync(User, passwordRequest.PasswordOld, passwordRequest.PasswordNew);

            if (!result.Succeeded)
            {
                return false;
            }

            return true;
        }

        private string CreateToKen(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("UserName", user.UserName),
                new Claim("Type", user.Type),
                new Claim("Location",user.Location )
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
