using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;
using NPOI.SS.Formula.Functions;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Contracts.Dtos.AuthDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.UnitTests.TestDataAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rookie.AssetManagement.UnitTests.Business
{
    public class AuthServiceShould
    {
        private readonly AuthService _authService;
        private readonly Mock<IAuthService> _authRepository;
        private readonly Mock<IBaseRepository<User>> _userRepository;
        private readonly Mock<UserManager<User>> _userManagerMock;
        private readonly Mock<SignInManager<User>> _signInManagerMock;
        private readonly IMapper _mapper;
        public AuthServiceShould()
        {
            _userRepository = new Mock<IBaseRepository<User>>();
            _userManagerMock = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            _signInManagerMock = new Mock<SignInManager<User>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _authService = new AuthService(_userRepository.Object, null, _userManagerMock.Object, _mapper);
        }
        [Fact]
        public async Task GetAccountByUserNameShouldReturnNotNull()
        {
            //Arrange
            var login = AuthTestData.FakeLogin();
            var account = AuthTestData.FakeAccount();
            var user = AuthTestData.FakeUser();
            var returnAcc = _mapper.Map<AccountDto>(account);
            _userManagerMock.Setup(x => x.FindByNameAsync("binhnv")).ReturnsAsync(user);
            
            //Act
            var result = await _authService.GetAccountByUserName(login.UserName);
             //Assert
            result.Should().NotBeNull();
            Assert.Equal("Binh Nguyen Van", result.FullName);
            Assert.Equal("binhnv", result.UserName);
        }
        [Fact]
        public async Task GetAccountByUserNameShouldReturnNull()
        {
            //Arrange

            //Act
            var result =  await _authService.GetAccountByUserName(null);
            //Assert
            Assert.Null(result);
        }
        [Fact]
        public async Task IsDeleteUserShouldReturnFalse()
        {
            //Arrange
            var login = AuthTestData.FakeLogin();
            var user = AuthTestData.FakeUser();
            _userManagerMock.Setup(x => x.FindByNameAsync(login.UserName)).ReturnsAsync(user);
            //Act
            var result = await _authService.IsUserDeleted(login.UserName);
            //Assert
            Assert.False(result);
        }
        [Fact]
        public async Task IsDeleteUserShouldReturnTrue()
        {
            //Arrange
            var login = AuthTestData.FakeLogin();
            var user = AuthTestData.FakeUser();
            user.IsDeleted = true;
            _userManagerMock.Setup(x => x.FindByNameAsync(login.UserName)).ReturnsAsync(user);
            //Act
            var result = await _authService.IsUserDeleted(login.UserName);
            //Assert
            Assert.True(result);
        }
        [Fact]
        public async Task ChangePasswordFirstLoginShouldReturnNewAccount()
        {
            //Arrange
            var login = AuthTestData.FakeLogin();
            var user = AuthTestData.FakeUser();
            var changePassword = AuthTestData.FakeChangePasswordFirstLogin();
            var account = AuthTestData.FakeAccount();
            var token = "abcdefghyklmn123456789";
            _userManagerMock.Setup(x => x.FindByNameAsync(login.UserName)).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.GeneratePasswordResetTokenAsync(user)).ReturnsAsync(token);
            _userManagerMock.Setup(x => x.ResetPasswordAsync(user, token, changePassword.PasswordNew)).ReturnsAsync(IdentityResult.Success);
            
            //Act
            var result = await _authService.ChangePasswordFirstLoginAsync(login.UserName, changePassword);
            //Assert
            Assert.Equal(account.UserName, result.UserName);
            Assert.NotNull(result);
        }
        [Fact]
        public async Task ChangePasswordShouldReturnNewAccount()
        {
            //Arrange
            var login = AuthTestData.FakeLogin();
            var user = AuthTestData.FakeUser();
            var changePassword = AuthTestData.FakeChangePassword();
            var account = AuthTestData.FakeAccount();
            var token = "abcdefghyklmn123456789";
            _userManagerMock.Setup(x => x.FindByNameAsync(login.UserName)).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.ChangePasswordAsync(user,changePassword.PasswordOld, changePassword.PasswordNew))
                .ReturnsAsync(IdentityResult.Success);

            //Act
            var result = await _authService.ChangePasswordAsync(login.UserName, changePassword);
            //Assert
            Assert.Equal(account.UserName, result.UserName);
            Assert.NotNull(result);
        }
    }
}
