using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Enum;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Microsoft.AspNetCore.Identity;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Rookie.AssetManagement.IntegrationTests.TestData
{
    public static class ArrangeData
    {
        public static List<User> GetSeedUsersData()
        {
            return new List<User>()
            {
                new User()
                {
                    FirstName = "First Name 1",
                    LastName = "Last Name 1",
                    DateOfBirth = new DateTime(2000, 11, 30, 0, 0, 0),
                    Gender = UserGenderEnum.Male,
                    JoinedDate = new DateTime(2022, 11, 10, 0, 0, 0),
                    Type = "Staff",
                    IsDeleted = false,
                    Location= "HCM"
                },
                new User()
                {
                    FirstName = "First Name 2",
                    LastName = "Last Name 2",
                    DateOfBirth = new DateTime(2000, 05, 15, 0, 0, 0),
                    Gender = UserGenderEnum.Male,
                    JoinedDate = new DateTime(2022, 11, 10, 0, 0, 0),
                    Type = "Staff",
                    IsDeleted = false,
                    Location= "HCM"
                },
                new User()
                {
                    FirstName = "First Name 3",
                    LastName = "Last Name 3",
                    DateOfBirth = new DateTime(2000, 02, 17, 0, 0, 0),
                    Gender = UserGenderEnum.Female,
                    JoinedDate = new DateTime(2022, 11, 10, 0, 0, 0),
                    Type = "Staff",
                    IsDeleted = false,
                    Location= "HN"
                },
            };
        }

        public static UserCreateDto GetCreateUserDto()
        {
            return new UserCreateDto() {

                FirstName = "Duong",
                LastName = "Trieu",
                DateOfBirth = new DateTime(2000, 02, 17, 0, 0, 0),
                Gender = UserGenderEnumDto.Female,
                JoinedDate = new DateTime(2022, 11, 10, 0, 0, 0),
                Type = "Staff",

            };
        }

        public static UserUpdateDto GetUserUpdateDto()
        {
            return new UserUpdateDto() {
                Id = 1,
                DateOfBirth = new DateTime(2000, 02, 17, 0, 0, 0),
                Gender = UserGenderEnumDto.Female,
                JoinedDate = new DateTime(2022, 11, 10, 0, 0, 0),
                Type = "Admin",

            };
        }

        public static ChangePasswordDto GetChangePasswordDto()
        {
            return new ChangePasswordDto()
            {
                PasswordOld = "123456",
                PasswordNew = "1234567"
            };
        }

        public static ChangePasswordDto GetChangePasswordFailseDto()
        {
            return new ChangePasswordDto()
            {
                PasswordOld = "123456",
                PasswordNew = "123456"
            };
        }

        public static User Create()
        {
            return new User
            {
                UserName = "adminhcm",
                Location = "HCM",
                Type = "ADMIN",
            };

        }

        public static LoginDto GetLogin()
        {
            return new LoginDto() {

                UserName = "adminhcm",
                Password = "123456"

            };
        }

        public static void InitUsersData(ApplicationDbContext dbContext)
        {
            var users = GetSeedUsersData();
            dbContext.Users.AddRange(users);
            dbContext.SaveChanges();

        }

    }
}