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
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Rookie.AssetManagement.Tests;
using System;
using System.Threading.Tasks;
using Xunit;
using System.Threading;
using System.Collections.Generic;
using System.Security.Claims;
using System.Web.Http.Results;

namespace Rookie.AssetManagement.IntegrationTests
{
    public class AuthControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly BaseRepository<User> _authRepository;
        private readonly IMapper _mapper;
        private readonly AuthService _authService;
        private readonly AuthController _authController;

        private readonly IConfiguration _configuration;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthControllerShould(SqliteInMemoryFixture fixture)
        {
            fixture.CreateDatabase();
            _dbContext = fixture.Context;
            _userManager = fixture.UserManager;
            _signInManager = fixture.SignInManager;
            _authRepository = new BaseRepository<User>(_dbContext);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _signInManager.Context = new DefaultHttpContext { RequestServices = fixture.ServiceProvider };
            _authService = new AuthService(_authRepository,_signInManager, _userManager,_mapper);
            _authController = new AuthController(_authService,_userManager);

            //fix
            _userManager.CreateAsync(ArrangeData.Create(), "123456");
        }

        [Fact]
        public async Task Login_Success()
        {
            //Arrange
            var loginRequest = ArrangeData.GetLogin();

            // Act
            var result = await _authController.LoginUser(loginRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<AccountDto>(actionResult.Value);
            var token = returnValue.Token;
            Assert.Equal(returnValue.UserName, loginRequest.UserName);
            

        }

        [Fact]
        public async Task LoginShouldThrowBadRequest()
        {
            //Arrange
            var loginRequest = new LoginDto
            {
                UserName = "asd",
                Password = "123456"
            };

            // Act
            var result = await _authController.LoginUser(loginRequest);

            // Assert

            Assert.IsType<BadRequestObjectResult>(result.Result);

        }

        [Fact]
        public async Task ChangePasswordAsync_Success()
        {
            //Arrange
            loginTestUser("adminhcm", "ADMIN", "HCM");

            var changePasswordRequest = ArrangeData.GetChangePasswordDto();

            // Act
            var result = await _authController.ChangePassWord(changePasswordRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<AccountDto>(actionResult.Value);

            Assert.Equal("adminhcm", returnValue.UserName);
        }

        [Fact]
        public async Task ChangePasswordShouldThrowBadRequest()
        {
            //Arrange
            loginTestUser("adminhcm", "ADMIN", "HCM");

            var changePasswordRequest = ArrangeData.GetChangePasswordFailseDto();

            // Act
            var result = await _authController.ChangePassWord(changePasswordRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

            Assert.Equal("Your new password cannot be same as old password.", actionResult.Value);
        }


        private void loginTestUser(string username, string type, string location)
        {
            var _identity = new ClaimsIdentity();
            _identity.AddClaims(new[]
            {
                new Claim("UserName", username),
                new Claim("Type", type),
                new Claim("Location",location)
            });

            var _user = new ClaimsPrincipal(_identity);
            _authController.ControllerContext.HttpContext = new DefaultHttpContext() { User = _user };
        }
    }
}