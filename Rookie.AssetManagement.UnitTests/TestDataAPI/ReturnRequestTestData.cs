using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.UnitTests.TestDataAPI
{
    public class ReturnRequestTestData
    {
        public static List<ReturnRequest> GetReturnRequests()
        {
            return new List<ReturnRequest>() {
                new ReturnRequest(){
                    Id = 1,
                    Assignment = new Assignment (){
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
                    AcceptedBy = new User(){
                        UserName = "dong",
                    },
                    ReturnedDate = DateTime.Parse("2021-02-21"),
                    State = new State(){
                        Id = 10,
                        StateName = "Completed"
                    }
                },
                new ReturnRequest(){
                    Id = 2,
                    Assignment = new Assignment (){
                        Id= 2,
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
                        AssignedDate = DateTime.Parse("2021-02-21"),
                        State = new State(){
                            Id = 2,
                            StateName = "Waiting for Acceptance",
                        },
                        IsDeleted=false,
                        Note=""
                    },
                    AcceptedBy = new User(){
                        UserName = "trieu",
                    },
                    ReturnedDate = DateTime.Parse("2021-02-21"),
                    State = new State(){
                        Id = 11,
                        StateName = "Waiting for returning"
                    }
                }
            };
        }
        public static List<Assignment> GetAssignments()
        {
            return new List<Assignment>()
            {
                new Assignment (){
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
                    }, new Assignment (){
                        Id= 2,
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
                        AssignedDate = DateTime.Parse("2021-02-21"),
                        State = new State(){
                            Id = 2,
                            StateName = "Waiting for Acceptance",
                        },
                        IsDeleted=false,
                        Note=""
                    }
            };
        }
        public static List<State> GetStates()
        {
            return new List<State>() {
                new State() {
                    Id = 10,
                    StateName="Completed",
                },
                new State() {
                    Id = 11,
                    StateName="Waiting for returning",
                },
            };
        }
        public static State GetState = new State()
        {
            Id = 11,
            StateName = "Waiting for returning",
        };
        public static ReturnRequest ReturnRequest = new ReturnRequest()
        {
            Id = 3,
            Assignment = new Assignment()
            {
                Id = 2,
                Asset = new Asset()
                {
                    AssetCode = "MO000003",
                    AssetName = "Personal Computer xyz3",
                },
                AssignedTo = new User()
                {
                    UserName = "binhnv",
                },
                AssignedBy = new User()
                {
                    UserName = "admin",
                },
                AssignedDate = DateTime.Parse("2021-02-21"),
                State = new State()
                {
                    Id = 2,
                    StateName = "Waiting for Acceptance",
                },
                IsDeleted = false,
                Note = ""
            },
            AcceptedBy = new User()
            {
                UserName = "vietdq",
            },
            ReturnedDate = DateTime.Parse("2021-02-21"),
            State = new State()
            {
                Id = 11,
                StateName = "Waiting for returning"
            }
        };

        public static ReturnRequestCreateDto GetReturnRequestDto = new ReturnRequestCreateDto()
        {
            AssignmentId = 1,
        };


        public static ReturnRequestQueryCriteriaDto ReturnRequestQueryCriteriaDto = new ReturnRequestQueryCriteriaDto()
        {
            Search = "Personal Computer",
            Page = 1,
            Limit = 5,
        };
    }
}
