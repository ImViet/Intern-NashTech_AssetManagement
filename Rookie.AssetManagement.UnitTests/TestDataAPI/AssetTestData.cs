using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.Contracts.Dtos.EnumDtos;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.UnitTests.TestDataAPI
{
    public class AssetTestData
    {
        public static AssetQueryCriteriaDto AssetQueryCriteriaDto = new AssetQueryCriteriaDto()
        {
            Search = "Monitor",
            Page = 1,
            Limit = 5,
        };

        public static List<Asset> GetAssets()
        {
            return new List<Asset>() {
                new Asset() {
                    Id = 1,
                    AssetCode = "MO000001",
                    AssetName = "Monitor xyz",
                    Specification = "abc",
                    IsDeleted = false,
                    Location="HCM"
                },
                new Asset() {
                    Id = 2,
                    AssetCode = "MO000002",
                    AssetName = "Monitor xyz2",
                    Specification = "abc",
                    IsDeleted = false,
                    Location="HCM"
                }
            };
        }
        public static List<State> GetStates()
        {
            return new List<State>() {
                new State() {
                    Id = 1,
                    StateName="Available",
                },
                new State() {
                    Id = 2,
                    StateName="Not Available",
                }
            };
        }
        public static List<Category> GetCategories()
        {
            return new List<Category>() {
                new Category() {
                    Id = 1,
                    CategoryName="Monitor",
                },
                new Category() {
                    Id = 2,
                    CategoryName="Laptop",
                }
            };
        }
        public static AssetCreateDto GetCreateAssetDto()
        {
            return new AssetCreateDto()
            {
                AssetName = "Monitor xyz3",
                Specification = "abc",
                Category = 1,
                State = 1
            };
        }
        public static int UnExistedAssetId = 3;
        public static int ExistedAssetId = 1;
        public static Asset GetUpdateAsset()
        {
            var updateAsset = GetAsset(ExistedAssetId);
            return updateAsset;
        }
        public static Asset GetAsset(int id, bool isDeleted = false)
        {
            return new Asset()
            {
                Id = id,
                AssetName = "Laptop Asus",
                Specification = "Window 11, Ram 8GB, Core i7",
                InstalledDate = DateTime.Parse("2021-11-21"),             
                IsDeleted = isDeleted
            };           
        }
        public static AssetUpdateDto GetUpdateAssetDtoFail()
        {
            return new AssetUpdateDto()
            {
                Id = UnExistedAssetId,
                AssetName = "Laptop Acer",
                Specification = "Window 11, Ram 8GB",
                InstalledDate = DateTime.Parse("2021-11-21"),
                State = 1
            };
        }
        public static AssetUpdateDto GetUpdateAssetDtoSuccess()
        {
            return new AssetUpdateDto()
            {
                Id = ExistedAssetId,
                AssetName = "Laptop Asus",
                Specification = "Window 11, Ram 8GB, Core i7",
                InstalledDate = DateTime.Parse("2021-11-21"),
                State = 1
            };
        }
    }
}
