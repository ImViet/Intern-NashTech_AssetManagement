using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using MockQueryable.Moq;
using Moq;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.UnitTests.TestDataAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Rookie.AssetManagement.UnitTests.Business
{


    public class AssetServiceShould
    {
        private readonly AssetService _assetService;

        private readonly Mock<IBaseRepository<Asset>> _assetRepository;
        private readonly Mock<IBaseRepository<Category>> _categoryRepository;
        private readonly Mock<IBaseRepository<State>> _stateRepository;
        private readonly Mock<IBaseRepository<User>> _userRepository;
        private readonly Mock<IBaseRepository<Assignment>> _assignmentRepository;
        private readonly IMapper _mapper;
        private readonly CancellationToken _cancellationToken;

        public AssetServiceShould()
        {
            _assetRepository = new Mock<IBaseRepository<Asset>>();
            _categoryRepository = new Mock<IBaseRepository<Category>>();
            _stateRepository = new Mock<IBaseRepository<State>>();
            _userRepository = new Mock<IBaseRepository<User>>();
            _assignmentRepository = new Mock<IBaseRepository<Assignment>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _cancellationToken = new CancellationToken();

            _assetService = new AssetService(_assetRepository.Object,_assignmentRepository.Object, _categoryRepository.Object, _stateRepository.Object, _mapper);
        }

        //[Fact]
        //public async Task GetByPageAsyncShouldSuccess()
        //{
        //    //Arrange
        //    var usersMock = AssetTestData.GetAssets().AsEnumerable().BuildMock();
        //    _assetRepository.Setup(x => x.Entities).Returns(usersMock);
        //    //Act
        //    var result = await _assetService.GetByPageAsync(AssetTestData.AssetQueryCriteriaDto, _cancellationToken, "HCM");
        //    //Assert
        //    Assert.Equal(2, result.TotalItems);
        //}

        [Fact]
        public async Task AddAssetAsyncShouldThrowExceptionAsync()
        {
            Func<Task> act = async () => await _assetService.AddAssetAsync(null, null);
            await act.Should().ThrowAsync<ArgumentNullException>();
        }
        [Fact]
        public async Task AddAssetAsyncShouldBeSuccessfullyAsync()
        {
            //Arrange
            var newAsset = _mapper.Map<Asset>(AssetTestData.GetCreateAssetDto());

            var listAsset = AssetTestData.GetAssets().ToList().BuildMock();
            _assetRepository.Setup(x => x.Entities).Returns(listAsset);

            var listState = AssetTestData.GetStates().ToList().BuildMock();
            _stateRepository.Setup(x => x.Entities).Returns(listState);

            var listCategory = AssetTestData.GetCategories().ToList().BuildMock();
            _categoryRepository.Setup(x => x.Entities).Returns(listCategory);

            //Act
            var result = await _assetService.AddAssetAsync(AssetTestData.GetCreateAssetDto(), "HCM");
            //Assert
            Assert.Equal("Monitor xyz3", result.AssetName);
        }

        [Fact]
        public async Task UpdateAssetAsyncShouldThrowNotFoundException()
        {
            //Arrange
            var assetsMock = AssetTestData.GetAssets().AsQueryable().BuildMock();
            _assetRepository.Setup(x => x.Entities).Returns(assetsMock);
            //Act
            Func<Task> act = async () => await _assetService.UpdateAssetAsync(
                AssetTestData.GetUpdateAssetDtoFail(),
                "HCM"
                );
            //Assert
            await act.Should().ThrowAsync<NotFoundException>();
        }

        //[Fact]
        //public async Task UpdateAssetAsyncShouldSuccess()
        //{
        //    //Arrange
        //    var assetsMock = AssetTestData.GetAssets().AsQueryable().BuildMock();
        //    var listState = AssetTestData.GetStates().ToList().BuildMock();
        //    _stateRepository.Setup(x => x.Entities).Returns(listState);
        //    _assetRepository.Setup(x => x.Entities).Returns(assetsMock);
        //    _assetRepository.Setup(x => x.Update(It.IsAny<Asset>()))
        //                                .Returns(Task.FromResult(AssetTestData.GetUpdateAsset()));
        //    //Act
        //    var result = await _assetService.UpdateAssetAsync(
        //        AssetTestData.GetUpdateAssetDtoSuccess(),
        //        "HCM"
        //        );
        //    //Assert
        //    Assert.Equal("Laptop Asus", result.AssetName);
        //}

        [Fact]
        public async Task DisableAsyncShouldThrowException()
        {
            //Arrange
            var UnExistedAssetId = 3;
            var assetsMock = AssetTestData.GetAssets().AsQueryable().BuildMock();

            _assetRepository
                  .Setup(x => x.Entities)
                  .Returns(assetsMock);

            //Act 
            Func<Task> act = async () => await _assetService.DisableAssetAsync(UnExistedAssetId, "HCM");

            //Assert
            await act.Should().ThrowAsync<NotFoundException>();
        }

        [Fact]
        public async Task DisableAsyncReturnTrue()
        {
            //Arrange
            var DisableAssetId = 1;
            var assetsMock = AssetTestData.GetAssets().AsQueryable().BuildMock();

            _assetRepository
                  .Setup(x => x.Entities)
                  .Returns(assetsMock);

            //Act
            var result = await _assetService.DisableAssetAsync(DisableAssetId, "HCM");

            //Assert
            result.Should().Equals(true);
        }
    }
}
