﻿using AutoMapper;
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
using Rookie.AssetManagement.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;

namespace Rookie.AssetManagement.Business.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserService(IBaseRepository<User> userRepository, UserManager<User> userManager, IMapper mapper)
        {
            _userRepository = userRepository;
            _userManager = userManager;
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
            newUser.FirstName = newUser.FirstName.Trim();
            newUser.LastName = newUser.LastName.Trim();
            string[] detailOfLastname = newUser.LastName.Split(' ');
            string firstCharOfEachDetailLastname = "";
            foreach (var item in detailOfLastname)
            {
                firstCharOfEachDetailLastname += item.Substring(0, 1).ToLower();
            }
            string username = newUser.FirstName.ToLower() + firstCharOfEachDetailLastname;
            var countUsername = await _userRepository.Entities.Where(u =>
            u.UserName.Contains(username + '1') ||
            u.UserName.Contains(username + '2') ||
            u.UserName.Contains(username + '3') ||
            u.UserName.Contains(username + '4') ||
            u.UserName.Contains(username + '5') ||
            u.UserName.Contains(username + '6') ||
            u.UserName.Contains(username + '7') ||
            u.UserName.Contains(username + '8') ||
            u.UserName.Contains(username + '9') ||
            u.UserName.Equals(username)).CountAsync();
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
            DateTime dt = new DateTime(int.Parse(year), int.Parse(month), int.Parse(day));
            string dateOfBirthFormmat = dt.ToString("ddMMyyyy");
            string password = newUser.UserName.ToLower() + '@' + dateOfBirthFormmat;
            //string password = newUser.UserName.ToLower() + '@' + day + month + year;
            //default isNewUser
            newUser.IsNewUser = true;
            //default location
            newUser.Location = location;
            //default staffcode            
            newUser.StaffCode = DefaultValueForStaffCodeFirst();
            var createResult = await _userManager.CreateAsync(newUser, password);
            if (!createResult.Succeeded)
            {
                return null;
            }
            var user = await _userRepository.GetById(newUser.Id);

            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> UpdateAsnyc(UserUpdateDto userUpdateDto, string location)
        {
            var user = await _userRepository.Entities.FirstOrDefaultAsync(u => u.Id == userUpdateDto.Id && u.Location == location);
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
            var lastuser = _userRepository.Entities.OrderByDescending(c => c.Id).FirstOrDefault();
            if (_userRepository.Entities.Count() == 0)
            {
                staffcode = "SD0001";
            }
            else
            {
                staffcode = "SD" + (lastuser.Id + 1).ToString("D4");
            }
            return staffcode;
        }

        public async Task<PagedResponseModel<UserDto>> GetByPageAsync(
            UserQueryCriteriaDto UserQueryCriteria,
            CancellationToken cancellationToken,
            string location)
        {
            var userQuery = UserFilter(
               _userRepository.Entities.Where(x => !x.IsDeleted).Where(x => x.Location == location).AsQueryable(),
               UserQueryCriteria);

            var User = await userQuery
                .AsNoTracking()
                .PaginateAsync<User>(
                    UserQueryCriteria.Page,
                    UserQueryCriteria.Limit,
                    cancellationToken);

            var usersDto = _mapper.Map<IEnumerable<UserDto>>(User.Items);

            return new PagedResponseModel<UserDto>
            {
                CurrentPage = User.CurrentPage,
                TotalPages = User.TotalPages,
                TotalItems = User.TotalItems,
                Items = usersDto
            };
        }

        private IQueryable<User> UserFilter(
            IQueryable<User> userQuery,
            UserQueryCriteriaDto userQueryCriteria)
        {


            if (!String.IsNullOrEmpty(userQueryCriteria.Search))
            {
                userQuery = userQuery.Where(b =>
                  (b.LastName.ToLower() + " " + b.FirstName.ToLower()).Contains(userQueryCriteria.Search.ToLower())
                   || b.StaffCode.ToLower().Contains(userQueryCriteria.Search.ToLower())
                   || (b.FirstName.ToLower() + " " + b.LastName.ToLower()).Contains(userQueryCriteria.Search.ToLower()));
            }

            if (userQueryCriteria.Types != null && !userQueryCriteria.Types.Any(e => e == "ALL"))
            {
                userQuery = userQuery.Where(x => userQueryCriteria.Types.Any(e => e == x.Type));
            }

            if (userQueryCriteria.SortColumn != null)
            {
                var sortColumn = userQueryCriteria.SortColumn.ToUpper();
                switch (sortColumn)
                {
                    case "STAFFCODE":
                        if (userQueryCriteria.SortOrder == 0)
                        {
                            userQuery = userQuery.OrderBy(x => x.StaffCode);
                        }
                        else
                        {
                            userQuery = userQuery.OrderByDescending(x => x.StaffCode);
                        }
                        break;
                    case "FULLNAME":
                        if (userQueryCriteria.SortOrder == 0)
                        {
                            userQuery = userQuery.OrderBy(x => x.FirstName);
                        }
                        else
                        {
                            userQuery = userQuery.OrderByDescending(x => x.FirstName);
                        }
                        break;
                    case "JOINEDDATE":
                        if (userQueryCriteria.SortOrder == 0)
                        {
                            userQuery = userQuery.OrderBy(x => x.JoinedDate);
                        }
                        else
                        {
                            userQuery = userQuery.OrderByDescending(x => x.JoinedDate);
                        }
                        break;
                    case "TYPE":
                        if (userQueryCriteria.SortOrder == 0)
                        {
                            userQuery = userQuery.OrderBy(x => x.Type);
                        }
                        else
                        {
                            userQuery = userQuery.OrderByDescending(x => x.Type);
                        }
                        break;
                    default:
                        userQuery = userQuery.OrderBy(x => x.StaffCode);
                        break;
                }

            }
            return userQuery;
        }

        public async Task<bool> DisableAsync(int id, string location)
        {
            var user = await _userRepository.Entities.SingleOrDefaultAsync(u => u.Id.Equals(id) && u.Location.Equals(location));
            if (user == null)
            {
                throw new NotFoundException("User Not Found!");
            }
            user.IsDeleted = true;

            await _userRepository.Update(user);

            return await Task.FromResult(true);
        }
        public async Task<List<string>> GetSuggestion(string searching, string location)
        {
            List<string> list = new List<string>();

            var suggestionStaffCode = await _userRepository.Entities.Where(x => !x.IsDeleted).Where(x => x.Location == location).Where(x => x.StaffCode.ToLower().Contains(searching.ToLower()))
                .Take(5).ToListAsync();
            foreach (var item in suggestionStaffCode)
            {
                list.Add(item.StaffCode);
            }
            if (list.Count < 5)
            {
                var suggestionName = await _userRepository.Entities.Where(x => !x.IsDeleted).Where(x => x.Location == location).Where(x => (x.LastName.ToLower() + " " + x.FirstName.ToLower()).Contains(searching.ToLower()) || (x.FirstName.ToLower() + " " + x.LastName.ToLower()).Contains(searching.ToLower()))
                .Take(5 - list.Count).ToListAsync();

                foreach (var item in suggestionName)
                {
                    list.Add(item.FirstName + " " + item.LastName);
                }
            }
            return list;
        }

        private IQueryable<User> UserSortLookUp(
            IQueryable<User> userQuery,
            UserQueryCriteriaDto userQueryCriteria)
        {
            if (!String.IsNullOrEmpty(userQueryCriteria.Search))
            {
                userQuery = userQuery.Where(b =>
                  (b.StaffCode.ToLower()).Contains(userQueryCriteria.Search.ToLower())
                    || (b.FirstName + " " + b.LastName).ToLower().Contains(userQueryCriteria.Search.ToLower()));
            }

            if (userQueryCriteria.SortColumn != null)
            {
                var sortColumn = userQueryCriteria.SortColumn.ToUpper();
                userQuery = sortColumn switch
                {
                    "STAFFCODE" => userQueryCriteria.SortOrder == 0 ? userQuery.OrderBy(x => x.StaffCode) : userQuery.OrderByDescending(x => x.StaffCode),
                    "FULLNAME" => userQueryCriteria.SortOrder == 0 ? userQuery.OrderBy(x => x.FirstName) : userQuery.OrderByDescending(x => x.FirstName),
                    "TYPE" => userQueryCriteria.SortOrder == 0 ? userQuery.OrderBy(x => x.Type) : userQuery.OrderByDescending(x => x.Type),
                    _ => userQuery.OrderBy(x => x.StaffCode),
                };
            }
            return userQuery;
        }

        public async Task<PagedResponseModel<LookUpUserDto>> GetLookUpUser(UserQueryCriteriaDto assetQueryCriteria, CancellationToken cancellationToken)
        {
            var userQuery = UserSortLookUp(
             _userRepository.Entities
             .Where(x => !x.IsDeleted).AsQueryable(),
             assetQueryCriteria);

            var user = await userQuery
               .AsNoTracking()
               .PaginateAsync<User>(
                   assetQueryCriteria.Page,
                   assetQueryCriteria.Limit,
                   cancellationToken);

            var userDto = _mapper.Map<IEnumerable<LookUpUserDto>>(user.Items);

            return new PagedResponseModel<LookUpUserDto>
            {
                CurrentPage = user.CurrentPage,
                TotalPages = user.TotalPages,
                TotalItems = user.TotalItems,
                Items = userDto
            };
        }
    }
}
