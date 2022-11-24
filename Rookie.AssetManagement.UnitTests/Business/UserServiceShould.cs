using AutoMapper;
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

namespace Rookie.AssetManagement.UnitTests.Business
{
    public class UserServiceShould
    {
        private readonly UserService _userService;

        private readonly Mock<IBaseRepository<User>> _userRepository;

        private readonly IMapper _mapper;

        public UserServiceShould()
        {
            _userRepository = new Mock<IBaseRepository<User>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _userService = new UserService(_userRepository.Object, null,_mapper);
        }
        [Fact]
        public async Task UpdateAsyncShouldThrowNotFoundException()
        {
            //Arrange
            var usersMock = UserTestData.GetUsers().AsQueryable().BuildMock();
            _userRepository.Setup(x => x.Entities).Returns(usersMock);
            //Act
            Func<Task> act = async () => await _userService.UpdateAsnyc(
                UserTestData.GetUpdateUserDtoFail()
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
                UserTestData.GetUpdateUserDtoSuccess()
                );
            //Assert
            Assert.Equal("STAFF", result.Type);
        }


    }
}
