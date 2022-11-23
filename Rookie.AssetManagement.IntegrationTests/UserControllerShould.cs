using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.Controllers;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Enum;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.IntegrationTests.Common;
using Rookie.AssetManagement.IntegrationTests.TestData;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.Tests;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using Xunit;
using System.Threading;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Rookie.AssetManagement.Contracts.Constants;
using System.IdentityModel.Tokens.Jwt;

namespace Rookie.AssetManagement.IntegrationTests
{
    public class UserControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly BaseRepository<User> _userRepository;
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly UsersController _userController;
        private readonly UserManager<User> _userManager;
        private ControllerContext _controllerContext;

        private ClaimsIdentity _identity;
        private ClaimsPrincipal _user;

        public UserControllerShould(SqliteInMemoryFixture fixture)
        {
            fixture.CreateDatabase();
            _dbContext = fixture.Context;
            _userManager = fixture.UserManager;
            _userRepository = new BaseRepository<User>(_dbContext);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();


            _userService = new UserService(_userRepository, _userManager, _mapper);
            _userController = new UsersController(_userService);

            ArrangeData.InitUsersData(_dbContext);

            _identity = new ClaimsIdentity();
            _identity.AddClaims(new[]
            {
                new Claim("UserName", "admin"),
                new Claim("Type", "ADMIN"),
                new Claim("Location","HCM")
            });

            _user = new ClaimsPrincipal(_identity);
            _userController.ControllerContext.HttpContext = new DefaultHttpContext() { User = _user };

        }

        [Fact]
        public async Task GetAll_Success()
        {
            //Arrange

            // Act
            var result = await _userController.GetAllUser();

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<UserDto>>(actionResult.Value);
            Assert.Equal(returnValue.Count, 3);


        }

        [Fact]
        public async Task AddUsersAsync_Success()
        {
            //Arrange
            var userRequest = ArrangeData.GetCreateUserDto();

            // Act
            var result = await _userController.AddUser(userRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<UserDto>(actionResult.Value);

            Assert.Equal(returnValue.FirstName, userRequest.FirstName);
            Assert.Equal(returnValue.Id, 4);
        }
        [Fact]
        public async Task AddAsyncShouldThrowExceptionAsync()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _userController.AddUser(null));
        }

    }
}