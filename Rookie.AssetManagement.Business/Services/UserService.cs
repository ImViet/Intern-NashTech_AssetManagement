using AutoMapper;
using EnsureThat;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NPOI.OpenXmlFormats.Dml;
using NPOI.OpenXmlFormats.Spreadsheet;
using NPOI.SS.Formula.Functions;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.DataAccessor.Enum;
using Rookie.AssetManagement.DataAccessor.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly UserManager<User> userManager;
        private readonly IMapper _mapper;
        public UserService(IBaseRepository<User> userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public UserService(IBaseRepository<User> userRepository, UserManager<User> userManager, IMapper mapper)
        {
            _userRepository = userRepository;
            this.userManager = userManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var listUser = _mapper.Map<IEnumerable<UserDto>>(await _userRepository.Entities.ToListAsync());
            return (List<UserDto>)listUser;
        }
        public async Task<UserDto> GetByIdAsync(int id)
        {
            return _mapper.Map<UserDto>(await _userRepository.Entities.Where(c => c.Id == id).FirstOrDefaultAsync());
        }
        public async Task<UserDto> AddAsync(UserCreateDto userRequest, string location)
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
            string password = newUser.UserName.ToLower() + '@' + day + month + year;
            //default isNewUser
            newUser.IsNewUser = true;
            //default location
            newUser.Location = location;
            //default staffcode            
            newUser.StaffCode = DefaultValueForStaffCodeFirst();

            var createResult = await userManager.CreateAsync(newUser, password);
            if (!createResult.Succeeded)
            {
                return null;
            }

            var user = await _userRepository.GetById(newUser.Id);

            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> UpdateAsnyc(UserUpdateDto userUpdateDto)
        {
            var user = await _userRepository.Entities.FirstOrDefaultAsync(c => c.Id == userUpdateDto.Id);
            if (user == null)
            {
                throw new NotFoundException("User Not Found!");
            }
            user.DateOfBirth = userUpdateDto.DateOfBirth;
            user.Gender = (UserGenderEnum)userUpdateDto.Gender;
            user.JoinedDate = userUpdateDto.JoinedDate;
            user.Type = userUpdateDto.Type;

            var userUpdated = await _userRepository.Update(user);
            var userUpdatedDto = _mapper.Map<UserDto>(userUpdated);
            return userUpdatedDto;
        }

        public string DefaultValueForStaffCodeFirst()
        {
            string staffcode = "";
            if (_userRepository.Entities.Count() == 0)
            {
                staffcode = "SD0001";
            }
            else
            {
                var lastuser = _userRepository.Entities.OrderByDescending(c => c.Id).FirstOrDefault();
                int newuserid = lastuser.Id + 1;
                if (newuserid < 10)
                {
                    staffcode = "SD000" + newuserid;
                }
                else if (newuserid < 100)
                {
                    staffcode = "SD00" + newuserid;
                }
                else if (newuserid < 1000)
                {
                    staffcode = "SD0" + newuserid;
                }
                else
                {
                    staffcode = "SD" + newuserid;
                }
            }         
            return staffcode;
        }
    }
}
