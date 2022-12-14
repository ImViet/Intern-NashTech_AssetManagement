using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
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
    public class ReturnRequestServiceShould
    {
        private readonly ReturnRequestService _returnRequestService;
        private readonly Mock<IBaseRepository<ReturnRequest>> _returnRequestRepository;
        private readonly Mock<IBaseRepository<Assignment>> _assignmentRepository;
        private readonly Mock<IBaseRepository<Asset>> _assetRepository;
        private readonly Mock<IBaseRepository<State>> _stateRepository;
        private readonly Mock<IBaseRepository<User>> _userRepository;
        private readonly IMapper _mapper;
        private readonly CancellationToken _cancellationToken;

        public ReturnRequestServiceShould()
        {
            _assetRepository = new Mock<IBaseRepository<Asset>>();
            _stateRepository = new Mock<IBaseRepository<State>>();
            _assignmentRepository = new Mock<IBaseRepository<Assignment>>();
            _userRepository = new Mock<IBaseRepository<User>>();
            _returnRequestRepository = new Mock<IBaseRepository<ReturnRequest>>();
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();
            _cancellationToken = new CancellationToken();
            _returnRequestService = new ReturnRequestService(
                _stateRepository.Object,
                _assignmentRepository.Object,
                _assetRepository.Object,
                _userRepository.Object,
                _returnRequestRepository.Object,
                _mapper);
        }

        [Fact]
        public async Task GetByPageAsyncShouldSuccess()
        {
            //Arrange
            var returnRequestsMock = ReturnRequestTestData.GetReturnRequests().AsEnumerable().BuildMock();
            _returnRequestRepository.Setup(x => x.Entities).Returns(returnRequestsMock);
            //Act
            var result = await _returnRequestService.GetByPageAsync(ReturnRequestTestData.ReturnRequestQueryCriteriaDto, _cancellationToken);
            //Assert   
            Assert.Equal(2, result.TotalItems);
        }
        [Fact]
        public async Task AddReturningRequestAsyncShouldThrowExceptionAsync()
        {
            Func<Task> act = async () => await _returnRequestService.AddReturnRequestAsync(null, null);
            await act.Should().ThrowAsync<ArgumentNullException>();
        }
    }
}
