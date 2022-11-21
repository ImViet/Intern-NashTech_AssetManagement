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
using System;
using System.Threading.Tasks;
using Xunit;
using System.Threading;
using System.Collections.Generic;

namespace Rookie.AssetManagement.IntegrationTests
{
    public class AssetControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly BaseRepository<User> _userRepository;
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly UsersController _userController;

        public AssetControllerShould(SqliteInMemoryFixture fixture)
        {
            fixture.CreateDatabase();
            _dbContext = fixture.Context;
            _userRepository = new BaseRepository<User>(_dbContext);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _userService = new UserService(_userRepository, _mapper);
            _userController = new UsersController(_userService);
        }

        [Fact]
        public async Task AddUsersAsync_Success()
        {
            //Arrange
            var userRequest = UserArrangeData.GetCreateUserDto();

            // Act
            var result = await _userController.AddUser(userRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<UserDto>(actionResult.Value);

            Assert.Equal(returnValue.FirstName, userRequest.FirstName);
        }
        [Fact]
        public async Task AddAsyncShouldThrowExceptionAsync()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _userController.AddUser(null));
        }

    }
}