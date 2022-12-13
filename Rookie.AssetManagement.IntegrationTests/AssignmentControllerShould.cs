using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.Tests;
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
using System.Threading;
using Xunit;
using Rookie.AssetManagement.Contracts.Dtos.CategoryDtos;
using Rookie.AssetManagement.Contracts.Dtos.StateDtos;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.AssignmentDtos;

namespace Rookie.AssetManagement.IntegrationTests
{
    public class AssignmentControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly BaseRepository<Assignment> _assignmentRepository;
        private readonly BaseRepository<State> _stategoryRepository;
        private readonly BaseRepository<Asset> _assetRepository;
        private readonly BaseRepository<User> _userRepository;
        private readonly AssignmentService _assignmentService;
        private readonly StateService _stateService;
        private readonly AssignmentController _assignmentController;
        private readonly IMapper _mapper;
        private ClaimsIdentity _identity;
        private ClaimsPrincipal _user;
        public AssignmentControllerShould(SqliteInMemoryFixture fixture)
        {
            fixture.CreateDatabase();
            _dbContext = fixture.Context;
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _assetRepository = new BaseRepository<Asset>(_dbContext);
            _assignmentRepository = new BaseRepository<Assignment>(_dbContext);
            _stategoryRepository = new BaseRepository<State>(_dbContext);
            _userRepository = new BaseRepository<User>(_dbContext);
            
            _assignmentService = new AssignmentService(_assetRepository, _stategoryRepository, _assignmentRepository, _userRepository, _mapper);
            _stateService = new StateService(_stategoryRepository, _mapper);

            _assignmentController = new AssignmentController(_assignmentService, _stateService);


            AssignmentData.InitStatesData(_dbContext);
            AssignmentData.InitAssignmentsData(_dbContext);
            AssignmentData.InitAssetsData(_dbContext);


            _identity = new ClaimsIdentity();
            _identity.AddClaims(new[]
            {
                new Claim("UserName", "damthuy"),
                new Claim("Type", "ADMIN"),
                new Claim("Location","HCM")
            });

            _user = new ClaimsPrincipal(_identity);
            _assignmentController.ControllerContext.HttpContext = new DefaultHttpContext() { User = _user };

        }
        
        [Fact]
        public async Task GetAllAssignmentShouldReturnAll()
        {
            //Arrange
            var assignmentList = AssignmentData.GetAllAssignments();
            //Act
            var result = await _assignmentController.GetAllAssignment();
            //Assert
            result.Should().NotBeNull();
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<AssignmentDto>>(actionResult.Value);
            Assert.Equal(assignmentList.Count, returnValue.Count);
        }

        [Fact]
        public async Task GetAssignmentShouldReturnSuccess()
        {
            //Arrange
            var idAssignment = 1;
            var assignment = AssignmentData.GetAssignment();

            //Act
            var result = await _assignmentController.GetAssginmentById(idAssignment);
            //Assert

            result.Should().NotBeNull();
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<AssignmentDto>(actionResult.Value);

            Assert.Equal(assignment.Id, returnValue.Id);
        }

        [Fact]
        public async Task AddAssignmentAsync_Success()
        {
            //Arrange
            var assignmentRequest = AssignmentData.GetCreateAssignmentDto();

            // Act
            var result = await _assignmentController.AddAssignmentAsync(assignmentRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<AssignmentDto>(actionResult.Value);

            Assert.Equal(3, returnValue.Id);
            Assert.Equal(assignmentRequest.Note, returnValue.Note);
        }

        [Fact]
        public async Task AddAssignmentShouldThrowExceptionAsync()
        {
            //Arrange
            var assignmentRequest = AssignmentData.GetCreateAssignmentDto();
            string unExistedUser = "5";
            assignmentRequest.User = unExistedUser;

            // Act
            await Assert.ThrowsAsync<NotFoundException>(() => _assignmentController.AddAssignmentAsync(assignmentRequest));

            // Assert
        }
        [Fact]
        public async Task UpdateAssignmentAsync_Success()
        {
            //Arrange
            var assignmentRequest = AssignmentData.GetAssignmentUpdateDto();

            // Act
            var result = await _assignmentController.UpdateAssignmentAsync(assignmentRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<AssignmentDto>(actionResult.Value);

            Assert.Equal(1, returnValue.Id);
            Assert.Equal("MO000002", returnValue.AssetCode);
        }

        [Fact]
        public async Task UpdateAsyncShouldThrowNotFoundExceptionAsync()
        {
            var unExistedId = 5;
            var assignmentRequest = AssignmentData.GetAssignmentUpdateDto();
            assignmentRequest.Id = unExistedId;

            await Assert.ThrowsAsync<NotFoundException>(() => _assignmentController.UpdateAssignmentAsync(assignmentRequest));
        }

        [Fact]
        public async Task GetAssignmentByUserNameAsync_Success()
        {
            //Arrange
            var AssignmentQueryCriteriaDto = AssignmentData.GetAssignmentQueryCriteriaDto();

            // Act
            var result = await _assignmentController.GetAssignmentByUserName(AssignmentQueryCriteriaDto, new CancellationToken());

            // Assert
            result.Result.Should().HaveStatusCode(StatusCodes.Status200OK);
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<PagedResponseModel<MyAssignmentDto>>(actionResult.Value);
            Assert.Equal(returnValue.TotalItems, 1);
        }

    }
 }
