using Rookie.AssetManagement.Contracts.Dtos.AssetDtos;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.DataAccessor.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.AssetManagement.IntegrationTests.TestData
{
    public static class AssetData
    {
        public static List<Asset> GetSeedAssetsData()
        {
            return new List<Asset>()
            {
                new Asset()
                {
                    AssetCode = "LA000001",
                    AssetName = "Laptop Asus",
                    Category = new Category()
                    {
                        CategoryName = "Laptop",
                    },
                    Specification = "",
                    InstalledDate = new DateTime(),
                    State =  new State()
                    {
                        StateName = "Assigned",
                    },
                    IsDeleted = false
                },
                new Asset()
                {
                    AssetCode = "MO000001",
                    AssetName = "Laptop Asus",
                    Category = new Category()
                    {
                        CategoryName = "Monitor",
                    },
                    Specification = "",
                    InstalledDate = new DateTime(),
                    State = new State()
                    {
                        StateName = "Available",
                    },
                    IsDeleted = false
                },
                new Asset()
                {
                    AssetCode = "IP000002",
                    AssetName = "Ipad 1",
                    Category = new Category()
                    {
                     CategoryName = "Ipad",
                    },
                    Specification = "",
                    InstalledDate = new DateTime(),
                    State = new State()
                    {
                     StateName = "Available",
                    },
                    IsDeleted = false
                },
            };
        }
        public static List<State> GetSeedStatesData()
        {
            return new List<State>()
            {
                new State()
                {
                StateName = "Assigned",
                },
                new State()
                {
                 StateName = "Available",
                },
                new State()
                {
                 StateName = "Not Available",
                },
                 new State()
                {
                 StateName = "Waiting For Recycling",
                },
                  new State()
                {
                 StateName = "Recycled",
                },
            };
        }
        public static List<Category> GetSeedCategoriesData()
        {
            return new List<Category>()
            {
                new Category()
                {
                    CategoryName = "Laptop",
                },
                new Category()
                {
                    CategoryName = "Monitor",
                },
                new Category()
                {
                    CategoryName = "Ipad",
                },
            };
        }
        public static AssetCreateDto GetCreateAssetDto()
        {
            return new AssetCreateDto()
            {
                AssetName = "Laptop Asus",
                Category = 1,
                Specification = "",
                InstalledDate = new DateTime(),
                State = 2
            };
        }

        public static void InitAssetsData(ApplicationDbContext dbContext)
        {
            var assets = GetSeedAssetsData();
            dbContext.Assets.AddRange(assets);
            dbContext.SaveChanges();

        }
        public static void InitCategoriesData(ApplicationDbContext dbContext)
        {
            var categories = GetSeedCategoriesData();
            dbContext.Categories.AddRange(categories);
            dbContext.SaveChanges();

        }
        public static void InitStatesData(ApplicationDbContext dbContext)
        {
            var states = GetSeedStatesData();
            dbContext.States.AddRange(states);
            dbContext.SaveChanges();

        }
    }
}
