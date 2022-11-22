using Rookie.AssetManagement.Extensions.ServiceCollection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Rookie.AssetManagement.Middlewares;
using System.Text.Json;
using System.Text.Json.Serialization;
using Rookie.AssetManagement.Business;
using Rookie.AssetManagement.DataAccessor;
using FluentValidation.AspNetCore;
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Rookie.AssetManagement.DataAccessor.Entities;
using Rookie.AssetManagement.DataAccessor.Data;
using Rookie.AssetManagement.DataAccessor.Data.Seeds;
using System;
using System.Configuration;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthenticationRegister();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDataAccessorLayer(builder.Configuration);
builder.Services.AddBusinessLayer();

builder.Services.AddControllers()
    .AddFluentValidation(fv =>
        {
            fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
        })
    .AddJsonOptions(ops =>
        {
            ops.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            ops.JsonSerializerOptions.WriteIndented = true;
            ops.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            ops.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
            ops.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "Frontend/build";
});

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    
    try
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
        await DefaultUsers.SeedAsync(userManager);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);   
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Rookie.AssetManagement v1"));
}
else
{
    app.UseMiddleware<ErrorHandler>();
}

app.UseHttpsRedirection();
app.UseSpaStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "Frontend";

    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

app.Run();