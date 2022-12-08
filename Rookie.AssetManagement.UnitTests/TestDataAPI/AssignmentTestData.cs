using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.UnitTests.TestDataAPI
{
    public class AssignmentTestData
    {
        public static List<Assignment> GetAssignments()
        {
            return new List<Assignment>() {
                new Assignment(){
                    Id= 1,
                    Asset = new Asset (){
                        AssetCode = "MO000001",
                        AssetName = "Personal Computer xyz",
                    },
                    AssignedTo= new User(){
                        UserName = "damthuy",
                    },
                    AssignedBy = new User(){
                        UserName = "admin",
                    },
                    AssignedDate = DateTime.Parse("2021-02-21"),
                    State = new State(){
                        Id = 1,
                        StateName = "Accepted"
                    },
                    IsDeleted=false,
                    Note=""
                },
                new Assignment(){
                    Id=2,
                    Asset = new Asset (){
                        AssetCode = "MO000002",
                        AssetName = "Personal Computer xyz2",
                    },
                    AssignedTo= new User(){
                        UserName = "binhnv",
                    },
                    AssignedBy = new User(){
                        UserName = "admin",
                    },
                    AssignedDate = DateTime.Parse("2021-02-22"),
                    State = new State(){
                        Id = 2,
                        StateName = "Waiting for Acceptance"
                    },
                    IsDeleted=false,
                    Note=""
                }
            };
        }
        public static Assignment GetAssignment()
        {
            return new Assignment
            {
                Id = 1,
                Asset = new Asset()
                {
                    AssetCode = "MO000001",
                    AssetName = "Personal Computer xyz",
                },
                AssignedTo = new User()
                {
                    UserName = "damthuy",
                },
                AssignedBy = new User()
                {
                    UserName = "admin",
                },
                AssignedDate = DateTime.Parse("2021-02-21"),
                State = new State()
                {
                    Id = 1,
                    StateName = "Accepted"
                },
                IsDeleted = false,
                Note = ""

            };
        }

        public static List<State> GetStates()
        {
            return new List<State>() {
                new State() {
                    Id = 1,
                    StateName="Accepted",
                },
                new State() {
                    Id = 2,
                    StateName="Waiting for Acceptance",
                },
            };
        }

        public static AssignmentQueryCriteriaDto AssignmentQueryCriteriaDto = new AssignmentQueryCriteriaDto()
        {
            Search = "Personal Computer",
            Page = 1,
            Limit = 5,
        };
        public static AssignmentCreateDto GetAssignmentCreateDto()
        {
            return new AssignmentCreateDto()
            {
                User = "2",
                Asset = "1",
                AssignedDate = new DateTime(),
                Note = "RAM 8Gb"
            };
        }
        public static int UnExistedAssignmentId = 3;
        public static int ExistedAssignmentId = 1;
        public static AssignmentUpdateDto GetUpdateAssignmentDtoFail()
        {
            return new AssignmentUpdateDto()
            {
                Id = UnExistedAssignmentId,
                User = 1,
                Asset = 1,
                AssignedDate = DateTime.Parse("2021-11-21"),
                Note = "Assignment 1"
            };
        }
        public static AssetUpdateDto GetUpdateAssetDtoSuccess()
        {
            return new AssetUpdateDto()
            {
                Id = ExistedAssignmentId,
                AssetName = "Laptop Asus",
                Specification = "Window 11, Ram 8GB, Core i7",
                InstalledDate = DateTime.Parse("2021-11-21"),
                State = 1
            };
        }
        public static List<User> GetUsers()
        {
            return new List<User>()
            {
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
    }
}