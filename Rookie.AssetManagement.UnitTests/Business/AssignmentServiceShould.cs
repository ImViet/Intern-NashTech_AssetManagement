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

namespace Rookie.AssetManagement.UnitTests.Business{
    public class AssignmentServiceShould{
        private readonly AssignmentService _assignmentService;
        private readonly Mock<IBaseRepository<Assignment>> _assignmentRepository;
        private readonly Mock<IBaseRepository<Asset>> _assetRepository;
        private readonly Mock<IBaseRepository<State>> _stateRepository;
        private readonly IMapper _mapper;
        private readonly CancellationToken _cancellationToken;

        public AssignmentServiceShould(){
            _assetRepository = new Mock<IBaseRepository<Asset>>();
            _stateRepository = new Mock<IBaseRepository<State>>();
            _assignmentRepository = new Mock<IBaseRepository<Assignment>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _cancellationToken = new CancellationToken();
            _assignmentService = new AssignmentService( _assetRepository.Object,_stateRepository.Object,_assignmentRepository.Object, _mapper);
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
    }
}