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

namespace Rookie.AssetManagement.UnitTests.Business
{
    public class AssignmentServiceShould
    {
        private readonly AssignmentService _assignmentService;
        private readonly Mock<IBaseRepository<Assignment>> _assignmentRepository;
        private readonly Mock<IBaseRepository<Asset>> _assetRepository;
        private readonly Mock<IBaseRepository<State>> _stateRepository;
        private readonly Mock<IBaseRepository<User>> _userRepository;
        private readonly IMapper _mapper;
        private readonly CancellationToken _cancellationToken;

        public AssignmentServiceShould()
        {
            _assetRepository = new Mock<IBaseRepository<Asset>>();
            _stateRepository = new Mock<IBaseRepository<State>>();
            _assignmentRepository = new Mock<IBaseRepository<Assignment>>();
            _userRepository = new Mock<IBaseRepository<User>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _cancellationToken = new CancellationToken();
            _assignmentService = new AssignmentService(_assetRepository.Object, _stateRepository.Object, _assignmentRepository.Object, _userRepository.Object, _mapper);
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
            Assert.Equal(2, result.TotalItems);
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
                AssignmentTestData.GetUpdateAssignmentDtoFail(), "trieud"
                );
            //Assert
            await act.Should().ThrowAsync<NotFoundException>();
        }

        [Fact]
        public async Task UpdateAssignmentAsyncShouldSuccess()
        {
            //Arrange
            var assignmentsMock = AssignmentTestData.GetAssignments().AsQueryable().BuildMock();
            var listUser = AssignmentTestData.GetUsers().ToList().BuildMock();
            var listAsset = AssignmentTestData.GetAssets().ToList().BuildMock();
            _userRepository.Setup(x => x.Entities).Returns(listUser);
            _assetRepository.Setup(x => x.Entities).Returns(listAsset);
            _assignmentRepository.Setup(x => x.Entities).Returns(assignmentsMock);
            _assignmentRepository.Setup(x => x.Update(It.IsAny<Assignment>()))
                                        .Returns(Task.FromResult(AssignmentTestData.GetUpdateAssignment()));
            //Act        
            var result = await _assignmentService.UpdateAssignmentAsync(
                AssignmentTestData.GetUpdateAssignmentDtoSuccess(), "hoanghd"
                );
            //Assert
            Assert.Equal("Personal Computer xyz", result.AssetName);
            Assert.Equal("Dong", result.AssignedTo);
        }

        [Fact]
        public async Task DeleteAsyncShouldThrowException()
        {
            //Arrange
            var UnExistedAssignmentId = 3;
            var assignmentsMock = AssignmentTestData.GetAssignments().AsQueryable().BuildMock();

            _assignmentRepository
                  .Setup(x => x.Entities)
                  .Returns(assignmentsMock);

            //Act 
            Func<Task> act = async () => await _assignmentService.DisableAssignmentAsync(UnExistedAssignmentId);

            //Assert
            await act.Should().ThrowAsync<NotFoundException>();
        }

        [Fact]
        public async Task DeleteAsyncReturnTrue()
        {
            //Arrange
            var DeleteAssignmentId = 1;
            var assignmentsMock = AssignmentTestData.GetAssignments().AsQueryable().BuildMock();

            _assignmentRepository
                  .Setup(x => x.Entities)
                  .Returns(assignmentsMock);

            //Act
            var result = await _assignmentService.DisableAssignmentAsync(DeleteAssignmentId);

            //Assert
            result.Should().Equals(true);
        }

        [Fact]
        public async Task GetAssignmentByUserNameAsyncShouldSuccess()
        {
            string userName = "damthuy";
            //Arrange
            var assignmentsMock = AssignmentTestData.GetAssignments().AsEnumerable().BuildMock();
            _assignmentRepository.Setup(x => x.Entities).Returns(assignmentsMock);
            //Act
            var result = await _assignmentService.GetAssignmentByUserNameAsync(AssignmentTestData.AssignmentQueryCriteriaDto, _cancellationToken, userName);
            //Assert   
            Assert.Equal(1, result.TotalItems);
        }

    }
}