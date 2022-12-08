using Rookie.AssetManagement.DataAccessor.Entities;
using Moq;
using System.Threading;
using AutoMapper;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business;
using Xunit;
using Rookie.AssetManagement.UnitTests.TestDataAPI;
using System.Linq;
using MockQueryable.Moq;
using System.Threading.Tasks;
using FluentAssertions;
using System;
using Rookie.AssetManagement.Contracts;
using Rookie.AssetManagement.IntegrationTests.TestData;

namespace Rookie.AssetManagement.UnitTests.Business{
    public class AssignmentServiceShould{
        private readonly AssignmentService _assignmentService;
        private readonly Mock<IBaseRepository<Assignment>> _assignmentRepository;
        private readonly Mock<IBaseRepository<Asset>> _assetRepository;
        private readonly Mock<IBaseRepository<State>> _stateRepository;
        private readonly Mock<IBaseRepository<User>> _userRepository;
        private readonly IMapper _mapper;
        private readonly CancellationToken _cancellationToken;

        public AssignmentServiceShould(){
            _assetRepository = new Mock<IBaseRepository<Asset>>();
            _stateRepository = new Mock<IBaseRepository<State>>();
            _assignmentRepository = new Mock<IBaseRepository<Assignment>>();
            _userRepository = new Mock<IBaseRepository<User>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _cancellationToken = new CancellationToken();
            _assignmentService = new AssignmentService( _assetRepository.Object,_stateRepository.Object,_assignmentRepository.Object, _userRepository.Object, _mapper);
        }

        [Fact]
        public async Task GetByPageAsyncShouldSuccess()
        {
            //Arrange
            var assignmentsMock = AssignmentTestData.GetAssignments().AsEnumerable().BuildMock();
            _assignmentRepository.Setup(x => x.Entities).Returns(assignmentsMock);
            //Act
            var result = await _assignmentService.GetByPageAsync(AssignmentTestData.AssignmentQueryCriteriaDto, _cancellationToken);
            //Assert   
            Assert.Equal(2,result.TotalItems);
        }

        [Fact]
        public async Task GetByIdShouldSuccess()
        {
            var existedAssigmentId = 1;
            var assignmentsMock = AssignmentTestData.GetAssignments().AsEnumerable().BuildMock();

            _assignmentRepository.Setup(x => x.Entities).Returns(assignmentsMock);

            //Act
            var result = await _assignmentService.GetByIdAsync(existedAssigmentId);

            //Assert
            result.Should().NotBeNull();
            _assignmentRepository.Verify(mock => mock.Entities, Times.Once());

        }
        [Fact]
        public async Task AddAssignmentAsyncShouldSuccessfullyAsync()
        {
            //Arrange
            var newAssignment = _mapper.Map<Assignment>(AssignmentTestData.GetAssignmentCreateDto());

            var user = AssignmentTestData.GetUsers().AsQueryable().BuildMock();
            _userRepository.Setup(x => x.Entities).Returns(user);

            var listAsset = AssetTestData.GetAssets().ToList().BuildMock();
            _assetRepository.Setup(x => x.Entities).Returns(listAsset);

            //Act
            var result = await _assignmentService.AddAssignmentAsync(AssignmentTestData.GetAssignmentCreateDto(), "vietdq");
            //Assert
            Assert.Equal("Monitor xyz", result.AssetName);
            Assert.Equal("RAM 8Gb", result.Note);
        }
        [Fact]
        public async Task AddAssignmentAsyncShouldThrowExceptionAsync()
        {
            Func<Task> act = async () => await _assignmentService.AddAssignmentAsync(null, null);
            await act.Should().ThrowAsync<ArgumentNullException>();
        }
        [Fact]
        public async Task UpdateAssignmentAsyncShouldThrowNotFoundException()
        {
            //Arrange
            var assignmentsMock = AssignmentTestData.GetAssignments().AsQueryable().BuildMock();
            _assignmentRepository.Setup(x => x.Entities).Returns(assignmentsMock);
            //Act
            Func<Task> act = async () => await _assignmentService.UpdateAssignmentAsync(
                AssignmentTestData.GetUpdateAssignmentDtoFail()
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

    }
}