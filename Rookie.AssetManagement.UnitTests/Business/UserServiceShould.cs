﻿using AutoMapper;
using FluentAssertions;
using Moq;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.UnitTests.TestDataAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit.Sdk;
using Xunit;
using Rookie.AssetManagement.Business;
using MockQueryable.Moq;
using Rookie.AssetManagement.Contracts;
using System.Threading;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using NPOI.SS.Formula.Functions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Rewrite;
using Rookie.AssetManagement.DataAccessor.Migrations;
using FluentAssertions.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.AspNetCore.Mvc;

namespace Rookie.AssetManagement.UnitTests.Business
{
    public class UserServiceShould
    {
        private readonly UserService _userService;

        private readonly Mock<IBaseRepository<User>> _userRepository;

        private readonly Mock<UserManager<User>> _userManager;

        private readonly IMapper _mapper;

        private readonly CancellationToken _cancellationToken;

        public UserServiceShould()
        {
            _userRepository = new Mock<IBaseRepository<User>>();
            _userManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _userService = new UserService(_userRepository.Object, _userManager.Object, _mapper);
            _cancellationToken = new CancellationToken();
        }
        [Fact]
        public async Task GetByPageAsyncShouldSuccess()
        {
            //Arrange
            var usersMock = UserTestData.GetUsers().AsEnumerable().BuildMock();
            _userRepository.Setup(x => x.Entities).Returns(usersMock);
            //Act
            var result = await _userService.GetByPageAsync(UserTestData.userQueryCriteriaDto, _cancellationToken, "HCM");
            //Assert
            Assert.Equal(1, result.TotalItems);
        }
        [Fact]

        public async Task AddAsyncShouldThrowExceptionAsync()
        {
            Func<Task> act = async () => await _userService.AddAsync(null, null);
            await act.Should().ThrowAsync<ArgumentNullException>();
        }

        [Fact]
        public async Task AddAsyncShouldBeSuccessfullyAsync()
        {
            //Arrange
            var ListUser = UserTestData.ListUser().ToList().BuildMock();
            var newUser = _mapper.Map<User>(UserTestData.GetCreateUserDto());
            _userRepository.Setup(x => x.Entities).Returns(ListUser);
            _userRepository.Setup(x => x.GetById(It.IsAny<int>())).ReturnsAsync(newUser);
            _userManager.Setup(x => x.Users).Returns(ListUser);
            _userManager.Setup(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Verifiable();
            //Act
            var result = await _userService.AddAsync(UserTestData.GetCreateUserDto(), "HCM");
            //Assert
            Assert.Equal("Trieu", result.FirstName);
        }



        [Fact]
        public async Task UpdateAsyncShouldThrowNotFoundException()
        {
            //Arrange
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();
            _userRepository.Setup(x => x.Entities).Returns(usersMock);
            //Act
            Func<Task> act = async () => await _userService.UpdateAsnyc(
                UserTestData.GetUpdateUserDtoFail(),
                "HCM"
                );
            //Assert
            await act.Should().ThrowAsync<NotFoundException>();
        }

        [Fact]
        public async Task UpdateAsyncShouldSuccess()
        {
            //Arrange
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();
            _userRepository.Setup(x => x.Entities).Returns(usersMock);
            _userRepository.Setup(x => x.Update(It.IsAny<User>()))
                                        .Returns(Task.FromResult(UserTestData.GetUpdateUser()));
            //Act
            var result = await _userService.UpdateAsnyc(
                UserTestData.GetUpdateUserDtoSuccess(),
                "HCM"
                );
            //Assert
            Assert.Equal("STAFF", result.Type);
        }

        [Fact]
        public async Task GetByIdAsyncShouldThrowException()
        {
            //Arrange
            var UnExistedUserId = 3;
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();

            _userRepository
                  .Setup(x => x.Entities)
                  .Returns(usersMock);

            //Act 
            var result = await _userService.GetByIdAsync(UnExistedUserId);

            //Assert
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetByIdAsyncShouldReturnObjectAsync()
        {
            //Arrange
            var ExistedUserId = 1;
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();

            _userRepository
                  .Setup(x => x.Entities)
                  .Returns(usersMock);

            //Act
            var result = await _userService.GetByIdAsync(ExistedUserId);

            //Assert
            result.Should().NotBeNull();
            _userRepository.Verify(mock => mock.Entities, Times.Once());
        }

        [Fact]
        public async Task DisableAsyncShouldThrowException()
        {
            //Arrange
            var UnExistedUserId = 3;
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();

            _userRepository
                  .Setup(x => x.Entities)
                  .Returns(usersMock);

            //Act 
            Func<Task> act = async() => await _userService.DisableAsync(UnExistedUserId, "HCM");

            //Assert
            await act.Should().ThrowAsync<NotFoundException>();
        }


        [Fact]
        public async Task DisableAsyncShouldTrue()
        {
            //Arrange
            var DisableUserId = 1;
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();

            _userRepository
                  .Setup(x => x.Entities)
                  .Returns(usersMock);

            //Act
            var result = await _userService.DisableAsync(DisableUserId, "HCM");

            //Assert
            var actionResult = Assert.IsType<Boolean>(result);
            Assert.True(actionResult.Equals(true));
        }

        [Fact]
        public async Task GetSuggestionShouldSuccess()
        {
           //Arrange
           var sugesstionString = "SD";
           var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();

           _userRepository
                 .Setup(x => x.Entities)
                 .Returns(usersMock);

           //Act
           var result = await _userService.GetSuggestion(sugesstionString, "HCM");

           //Assert
            Assert.Equal(result.Count,2);
        }
    }
}
