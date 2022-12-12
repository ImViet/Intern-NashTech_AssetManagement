using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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
                },
                
            };
        }
        public static Assignment GetAssignment(int id, bool isDeleted = false)
        {
            return new Assignment
            {
                Id = id,
                Asset = new Asset()
                {
                    AssetCode = "MO000001",
                    AssetName = "Personal Computer xyz",
                },
                AssignedTo = new User()
                {
                    UserName = "Dong",
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
        public static int UnExistedAssignmentId = 3;
        public static int ExistedAssignmentId = 1;
        public static Assignment GetUpdateAssignment()
        {
            var updateAssignment = GetAssignment(ExistedAssignmentId);
            return updateAssignment;
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
        public static AssignmentUpdateDto GetUpdateAssignmentDtoFail()
        {
            return new AssignmentUpdateDto()
            {
                Id = UnExistedAssignmentId,
                User = 1,
                Asset = 2,
                AssignedDate = DateTime.Parse("2021-11-21"),
                Note = "Assignment 1"
            };
        }
        public static AssignmentUpdateDto GetUpdateAssignmentDtoSuccess()
        {
            return new AssignmentUpdateDto()
            {
                Id = ExistedAssignmentId,
                User = 2,
                Asset = 1,
                AssignedDate = DateTime.Parse("2021-11-21"),
                Note = "Assignment 2"
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
                    UserName="trieud",
                    Type = "STAFF",
                    StaffCode = "SD0001",
                    IsDeleted = false,
                    Location="HCM"
                },
                new User() {
                    Id = 2,
                    FirstName = "Dong",
                    LastName = "Hoang Huu",
                    UserName = "hoanghd",
                    Type = "STAFF",
                    StaffCode = "SD0002",
                    IsDeleted = false,
                    Location="HCM"
                }
            };
        }
        public static List<Asset> GetAssets()
        {
            return new List<Asset>() {
                new Asset() {
                    Id = 1,
                    AssetCode = "MO000001",
                    AssetName = "Personal Computer xyz",
                    Specification = "abc",
                    IsDeleted = false,
                    Location="HCM",
                    State=new State() {
                        Id = 2,
                        StateName="Available",
                    },
                },
                new Asset() {
                    Id = 2,
                    AssetCode = "MO000002",                    
                    AssetName = "Monitor xyz",
                    Specification = "abc",
                    IsDeleted = false,
                    Location="HCM",
                    State=new State() {
                        Id = 1,
                        StateName="Assigned",
                    },

                }
            };
        }
    }
}