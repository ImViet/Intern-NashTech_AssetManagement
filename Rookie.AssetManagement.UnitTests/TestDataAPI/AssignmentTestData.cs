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
    public class AssignmentTestData{
        public static List<Assignment> GetAssignments()
        {
            return new List<Assignment>() {
                new Assignment(){
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
    }
}