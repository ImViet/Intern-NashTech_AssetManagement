using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.UnitTests.TestDataAPI
{
    public class UserTestData
    {
        public static int UnExistedUserId = 3;
        public static int ExistedUserId = 1;
        public static UserQueryCriteriaDto userQueryCriteriaDto = new UserQueryCriteriaDto()
        {
            Search = "Trieu",
        };
        public static UserUpdateDto GetUpdateUserDtoFail()
        {
            return new UserUpdateDto()
            {
                Id = UnExistedUserId,
                DateOfBirth = DateTime.Parse("2000-11-21"),
                Gender = UserGenderEnumDto.Male,
                JoinedDate = DateTime.Parse("2021-11-21"),
                Type = "STAFF"
            };
        }
        public static UserUpdateDto GetUpdateUserDtoSuccess()
        {
            return new UserUpdateDto()
            {
                Id = ExistedUserId,
                DateOfBirth = DateTime.Parse("2000-11-21"),
                Gender = UserGenderEnumDto.Male,
                JoinedDate = DateTime.Parse("2021-11-21"),
                Type = "STAFF"
            };
        }
        public static User GetUpdateUser()
        {
            var updateUser = GetUser(ExistedUserId);
            return updateUser;
        }
        public static User GetUser(int id, bool isDeleted = false)
        {
            return new User()
            {
                Id = id,
                FirstName = "Trieu",
                LastName = "Duong",
                Type = "STAFF",
                IsDeleted = isDeleted
            };
        }
        public static List<User> GetUsers()
        {
            return new List<User>() {
                new User() {
                    Id = 1,
                    FirstName = "Trieu",
                    LastName = "Duong",
                    Type = "STAFF",
                    StaffCode = "SD0001",
                    IsDeleted = false,
                    Location="HCM"
                },
                new User() {
                    Id = 2,
                    FirstName = "Dong",
                    LastName = "Hoang Huu",
                    Type = "STAFF",
                    StaffCode = "SD0002",
                    IsDeleted = false,
                    Location="HCM"
                }
            };
        }
        public static UserCreateDto GetCreateUserDto()
        {
            return new UserCreateDto()
            {
                FirstName = "Trieu",
                LastName = "Duong",
                DateOfBirth = DateTime.Parse("2000-11-21"),
                Gender = UserGenderEnumDto.Male,
                JoinedDate = DateTime.Parse("2021-11-21"),
                Type = "STAFF",
            };
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 28c7973 (UnitTest Cretae)
        public static User GetCreateUser()
        {
            return new User()
            {
                StaffCode = "SD0001",
                FirstName = "Trieu",
                LastName = "Duong",
                UserName = "trieud1",
                Type = "STAFF",
            };
        }

        public static List<User> ListUser()
        {
            return new List<User>{
           new User()  {
               Id = 0,
                StaffCode = "SD0001",
                FirstName = "Binh",
                LastName = "Nguyen Van",
                UserName = "binhnv",
                Type = "STAFF",
                IsDeleted = false,
                IsNewUser = true,
                Location = "HCM"
            },
            new User() {
                Id = 1,
                StaffCode = "SD0002",
                FirstName = "Trieu",
                LastName = "Duong",
                UserName = "trieud",
                Type = "ADMIN",
                IsDeleted = false,
                IsNewUser = true,
                Location = "HCM"
            }
            };
        }
    }
}
