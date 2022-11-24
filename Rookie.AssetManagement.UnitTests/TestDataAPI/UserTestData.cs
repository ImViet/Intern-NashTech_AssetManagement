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
                    IsDeleted = false,
                    Location="HCM"
                },
                new User() {
                    Id = 2,
                    FirstName = "Dong",
                    LastName = "Hoang Huu",
                    Type = "STAFF",
                    IsDeleted = false,
                    Location="HCM"
                }
            };
        }    
    }
}
