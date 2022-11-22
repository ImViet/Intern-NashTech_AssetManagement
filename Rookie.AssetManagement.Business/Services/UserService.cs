using AutoMapper;
using EnsureThat;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NPOI.OpenXmlFormats.Spreadsheet;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly UserManager<User> userManager;
        private readonly IMapper _mapper;

        public UserService(IBaseRepository<User> userRepository, UserManager<User> userManager, IMapper mapper)
        {
            _userRepository = userRepository;
            this.userManager = userManager;
            _mapper = mapper;
        }

        public async Task<UserDto> AddAsync(UserCreateDto userRequest)
        {
            Ensure.Any.IsNotNull(userRequest);
            var newUser = _mapper.Map<User>(userRequest);
            //default username
            string[] detailoflastname = newUser.LastName.Split(' ');
            string firstcharofeachdetaillastname = "";
            foreach (var item in detailoflastname)
            {
                firstcharofeachdetaillastname += item.Substring(0, 1).ToLower();
            }
            string username = newUser.FirstName.ToLower() + firstcharofeachdetaillastname;
            var countUsername = await _userRepository.Entities.Where(u => EF.Functions.Like(u.UserName, username + "[0-9]%") || EF.Functions.Like(u.UserName, username)).CountAsync();
            if (countUsername == 0)
            {
                newUser.UserName = username;
            }
            else
            {
                newUser.UserName = username + (countUsername).ToString();
            }
            //default password
            string day = newUser.DateOfBirth.Day.ToString();
            string month = newUser.DateOfBirth.Month.ToString();
            string year = newUser.DateOfBirth.Year.ToString();
            //default location
            newUser.Location = "HCM";

            var createResult = await userManager.CreateAsync(newUser, newUser.FirstName.ToLower() + '@' + day + month + year);
            if (!createResult.Succeeded)
            {
                return null;
            }

            var user = await _userRepository.GetById(newUser.Id);

            return _mapper.Map<UserDto>(user);
        }
    }
}
