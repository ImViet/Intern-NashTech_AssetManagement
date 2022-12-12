using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Controllers;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.IntegrationTests.Common;
using Rookie.AssetManagement.IntegrationTests.TestData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Contracts.Dtos.ReturnRequestDtos;

namespace Rookie.AssetManagement.IntegrationTests
{
    public class ReturnRequestControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly BaseRepository<Assignment> _assignmentRepository;
        private readonly BaseRepository<State> _stategoryRepository;
        private readonly BaseRepository<Asset> _assetRepository;
        private readonly BaseRepository<User> _userRepository;
        private readonly BaseRepository<ReturnRequest> _returnRequestRepository;
        private readonly ReturnRequestService _returnRequestService;
        private readonly StateService _stateService;
        private readonly ReturnRequestController _returnRequestController;
        private readonly IMapper _mapper;
        private ClaimsIdentity _identity;
        private ClaimsPrincipal _user;
        public ReturnRequestControllerShould(SqliteInMemoryFixture fixture)
        {
            fixture.CreateDatabase();
            _dbContext = fixture.Context;
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _assetRepository = new BaseRepository<Asset>(_dbContext);
            _assignmentRepository = new BaseRepository<Assignment>(_dbContext);
            _stategoryRepository = new BaseRepository<State>(_dbContext);
            _userRepository = new BaseRepository<User>(_dbContext);
            _returnRequestRepository = new BaseRepository<ReturnRequest>(_dbContext);

            _returnRequestService = new ReturnRequestService(_stategoryRepository, _assignmentRepository, _userRepository, _returnRequestRepository, _mapper);
            _stateService = new StateService(_stategoryRepository, _mapper);

            _returnRequestController = new ReturnRequestController(_stateService, _returnRequestService);


            ReturnRequestData.InitStatesData(_dbContext);
            ReturnRequestData.InitAssignmentsData(_dbContext);
            ReturnRequestData.InitReturnRequestsData(_dbContext);
            ReturnRequestData.InitAssetsData(_dbContext);


            _identity = new ClaimsIdentity();
            _identity.AddClaims(new[]
            {
                new Claim("UserName", "admin"),
                new Claim("Type", "ADMIN"),
                new Claim("Location","HCM")
            });

            _user = new ClaimsPrincipal(_identity);
            _returnRequestController.ControllerContext.HttpContext = new DefaultHttpContext() { User = _user };

        }

        [Fact]
        public async Task GetAllReturnRequestsShouldReturnAll()
        {
            //Arrange
            var returnRequestList = ReturnRequestData.GetAllReturnRequesets();
            //Act
            var result = await _returnRequestController.GetAllReturnRequest();
            //Assert
            result.Should().NotBeNull();
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<ReturnRequestDto>>(actionResult.Value);
            Assert.Equal(returnRequestList.Count, returnValue.Count);
        }

        //[Fact]
        //public async Task GetReturnRequestShouldReturnSuccess()
        //{
        //    //Arrange
        //    var idAssignment = 1;
        //    var returnRequest = ReturnRequestData.GetReturnRequest();
        //    //Act
        //    var result = await _returnRequestController.Get(idAssignment);
        //    //Assert
        //    result.Should().NotBeNull();
        //    var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        //    var returnValue = Assert.IsType<AssignmentDto>(actionResult.Value);

        //    Assert.Equal(assignment.Id, returnValue.Id);
        //}
    }
}
