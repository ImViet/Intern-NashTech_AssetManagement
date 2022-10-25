using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Entities;
using System;

namespace Rookie.AssetManagement.IntegrationTests.Common
{
    public class SqliteInMemoryFixture : IDisposable
    {
        private IServiceScope _serviceScope;
        private SqliteConnection _connection;

        public virtual IServiceProvider ServiceProvider
        {
            get
            {
                if (_serviceScope == null)
                {
                    _serviceScope = ConfigureServices(new ServiceCollection()).BuildServiceProvider().CreateScope();
                }

                return _serviceScope.ServiceProvider;
            }
        }

        public virtual ApplicationDbContext Context => ServiceProvider.GetRequiredService<ApplicationDbContext>();
        public virtual UserManager<User> UserManager => ServiceProvider.GetRequiredService<UserManager<User>>();

        public virtual void CreateDatabase()
        {
            Dispose();
            _connection = new SqliteConnection("Data Source=:memory:");
            _connection.Open();
            Context.Database.EnsureCreated();
        }

        public virtual void Dispose()
        {
            _connection?.Close();
            _connection?.Dispose();
            _serviceScope?.Dispose();
            _serviceScope = null;
        }

        public virtual IServiceCollection ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(b => b.UseSqlite(_connection));

            services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddLogging();

            return services;
        }
    }
}
