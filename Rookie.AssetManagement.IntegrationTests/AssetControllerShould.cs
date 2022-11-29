﻿using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.Business.Interfaces;
using Rookie.AssetManagement.Business.Services;
using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.UserDtos;
using Rookie.AssetManagement.Tests;
using Rookie.AssetManagement.Controllers;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.IntegrationTests.Common;
using Rookie.AssetManagement.IntegrationTests.TestData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Rookie.AssetManagement.IntegrationTests
{
    public class AssetControllerShould : IClassFixture<SqliteInMemoryFixture>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly BaseRepository<Asset> _assetRepository;
        private readonly BaseRepository<Category> _categoryRepository;
        private readonly BaseRepository<State> _stategoryRepository;

        private readonly AssetService _assetService;
        private readonly CategoryService _categoryService;
        private readonly StateService _stateService;

        private readonly AssetController _assetController;

        private readonly IMapper _mapper;

        private ClaimsIdentity _identity;
        private ClaimsPrincipal _user;
        public AssetControllerShould(SqliteInMemoryFixture fixture)
        {
            fixture.CreateDatabase();
            _dbContext = fixture.Context;
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>());
            _mapper = config.CreateMapper();

            _assetRepository = new BaseRepository<Asset>(_dbContext);
            _categoryRepository = new BaseRepository<Category>(_dbContext);
            _stategoryRepository = new BaseRepository<State>(_dbContext);

            _assetService = new AssetService(_assetRepository, _categoryRepository, _stategoryRepository, _mapper);
            _categoryService = new CategoryService(_categoryRepository, _mapper);
            _stateService = new StateService(_stategoryRepository, _mapper);

            _assetController = new AssetController(_assetService, _stateService, _categoryService);


            AssetData.InitAssetsData(_dbContext);
            AssetData.InitCategoriesData(_dbContext);
            AssetData.InitStatesData(_dbContext);

            _identity = new ClaimsIdentity();
            _identity.AddClaims(new[]
            {
                new Claim("UserName", "admin"),
                new Claim("Type", "ADMIN"),
                new Claim("Location","HCM")
            });

            _user = new ClaimsPrincipal(_identity);
            _assetController.ControllerContext.HttpContext = new DefaultHttpContext() { User = _user };

        }

        [Fact]
        public async Task AddAssetAsync_Success()
        {
            //Arrange
            var assetRequest = AssetData.GetCreateAssetDto();

            // Act
            var result = await _assetController.AddAssetAsync(assetRequest);

            // Assert
            result.Should().NotBeNull();

            var actionResult = Assert.IsType<CreatedResult>(result.Result);
            var returnValue = Assert.IsType<AssetDto>(actionResult.Value);

            Assert.Equal(returnValue.AssetName, assetRequest.AssetName);
            Assert.Equal(4, returnValue.Id);
        }
        [Fact]
        public async Task AddAsyncShouldThrowExceptionAsync()
        {
            await Assert.ThrowsAsync<ArgumentNullException>(() => _assetController.AddAssetAsync(null));
        }


    }
}