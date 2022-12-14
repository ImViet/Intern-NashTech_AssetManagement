using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.IntegrationTests.TestData
{
    public class ReturnRequestData
    {
        public static List<ReturnRequest> GetSeedReturnRequestsData()
        {
            return new List<ReturnRequest>()
            {
                 new ReturnRequest(){
                    Assignment =  new Assignment()
                    {
                        Asset = new Asset(){
                            AssetCode = "MO000001",
                            AssetName = "Personal Computer xyz",
                        },
                         AssignedTo= new User(){

                            UserName = "damthuy",
                        },
                        AssignedBy = new User(){

                            UserName = "admin",
                        },
                        AssignedDate = new DateTime(),
                        State = new State(){
                            StateName = "Accepted"
                        },
                        IsDeleted = false,
                        Note = "abc"
                    },
                    AcceptedBy = new User(){
                        UserName = "dong",
                    },
                    ReturnedDate = DateTime.Parse("2021-02-21"),
                    State = new State(){
                        StateName = "Waiting for returning"
                    }
                },
                new ReturnRequest(){
                    Assignment = new Assignment(){
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
                    AssignedDate = new DateTime(),
                    State = new State(){
                        StateName = "Accepted"
                    },
                    IsDeleted = false,
                    Note = "abc"
                },
                    AcceptedBy = new User(){
                        UserName = "trieu",
                    },
                    ReturnedDate = DateTime.Parse("2021-02-21"),
                    State = new State(){
                        StateName = "Waiting for returning"
                    }
                }
            };
        }

        public static List<State> GetSeedStatesData()
        {
            return new List<State>()
            {
                new State()
                {
                StateName = "Accepted",
                },
                new State()
                {
                StateName = "Available",
                },
                new State()
                {
                StateName = "Not Available",
                },
                new State()
                {
                StateName = "Waiting For Recycling",
                },
                new State()
                {
                StateName = "Recycled",
                },
                new State()
                {
                StateName = "Accepted",
                },
                new State()
                {
                StateName = "Waiting for acceptance",
                },
                new State()
                {
                StateName = "Declined",
                },
                new State()
                {
                StateName = "Returned",
                },
                new State()
                {
                StateName = "Completed",
                },
                new State()
                {
                StateName = "Waiting for returning",
                }

        };
        }

        public static List<User> GetSeedUsersData()
        {
            return new List<User>()
            {
                new User()
                {
                UserName = "admin"
                },
                new User()
                {
                UserName = "damthuy"
                },
                new User()
                {
                UserName = "binhnv"
                },
                new User()
                {
                    UserName = "dong"
                },
                new User()
                {
                    UserName = "trieu"
                }
            };
        }

        public static List<Assignment> GetSeedAssignmentsData()
        {
            return new List<Assignment>()
            {
                 new Assignment(){
                    Asset = new Asset(){
                        AssetCode = "MO000001",
                        AssetName = "Personal Computer xyz",
                    },
                        AssignedTo= new User(){
                        UserName = "damthuy",
                    },
                    AssignedBy = new User(){
                        UserName = "admin",
                    },
                    AssignedDate = new DateTime(),
                    State = new State(){
                        StateName = "Accepted"
                    },
                    IsDeleted = false,
                    Note = "abc"
                 },
                 new Assignment(){
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
                    AssignedDate = new DateTime(),
                    State = new State(){
                        StateName = "Accepted"
                    },
                    IsDeleted = false,
                    Note = "abc"
                },
            };
        }

        public static List<Asset> GetSeedAssetsData()
        {
            return new List<Asset>()
            {
                new Asset()
                {
                    AssetCode = "MO000001",
                    AssetName = "Personal Computer xyz",
                },
                new Asset()
                {
                    AssetCode = "MO000002",
                    AssetName = "Personal Computer xyz2",
                },
                new Asset()
                {
                    AssetCode = "MO000003",
                    AssetName = "Personal Computer 3",
                }
            };
        }
        public static List<ReturnRequestDto> GetAllReturnRequesets()
        {
            return new List<ReturnRequestDto>()
            {
                new ReturnRequestDto(){
                    AssetCode = "MO000001",
                    AssetName = "Personal Computer xyz",
                    RequestedBy = "damthuy",
                    AcceptedBy = "admin",
                    AssignedDate = new DateTime(),
                    State = "",
                },
                new ReturnRequestDto(){
                    AssetCode = "MO000002",
                    AssetName = "Personal Computer xyz2",
                    RequestedBy = "binhnv",
                    AcceptedBy = "admin",
                    AssignedDate = new DateTime(),
                    State = "",
                },

            };
        }

        public static ReturnRequest GetReturnRequest()
        {
            return new ReturnRequest()
            {
                Id = 1,
                Assignment = new Assignment()
                {
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
                    AssignedDate = new DateTime(),
                    State = new State()
                    {
                        Id = 2,
                        StateName = "Accepted"
                    },
                    IsDeleted = false,
                    Note = "abc"
                },
                AcceptedBy = new User()
                {
                    UserName = "dong",
                },
                ReturnedDate = DateTime.Parse("2021-02-21"),
                State = new State()
                {
                    Id = 3,
                    StateName = "Waiting for returning"
                }
            };
        }
        public static void InitReturnRequestsData(ApplicationDbContext dbContext)
        {
            var returnRequesets = GetSeedReturnRequestsData();
            var state = dbContext.States.FirstOrDefault(s => s.Id == 1);
            foreach (var returnRequest in returnRequesets)
            {
                returnRequest.State = state;
            }
            dbContext.ReturnRequests.AddRange(returnRequesets);
            dbContext.SaveChanges();

        }
        public static void InitAssetsData(ApplicationDbContext dbContext)
        {
            var assets = GetSeedAssetsData();
            dbContext.Assets.AddRange(assets);
            dbContext.SaveChanges();

        }
        public static void InitUsersData(ApplicationDbContext dbContext)
        {
            var users = GetSeedUsersData();
            dbContext.Users.AddRange(users);
            dbContext.SaveChanges();

        }
        public static void InitStatesData(ApplicationDbContext dbContext)
        {
            var states = GetSeedStatesData();
            dbContext.States.AddRange(states);
            dbContext.SaveChanges();

        }
        public static void InitAssignmentsData(ApplicationDbContext dbContext)
        {
            var assignments = GetSeedAssignmentsData();
            dbContext.Assignments.AddRange(assignments);
            dbContext.SaveChanges();
        }
        public static ReturnRequestCreateDto GetReturnRequestCreateDto()
        {
            return new ReturnRequestCreateDto()
            {
                AssignmentId = 1
            };
        }
    }
}
