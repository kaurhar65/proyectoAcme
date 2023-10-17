using System.Security.Claims;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using Usuarios.Data;
//using RoomsApiCrudIdentity.Policies.Handlers;
//using RoomsApiCrudIdentity.Policies.Requirements;
//using RoomsApiCrudIdentity.Services;

var builder = WebApplication.CreateBuilder(args);


ConfigurationManager configuration = builder.Configuration;

// Add services to the container.
var connectionString =
    builder.Configuration.GetConnectionString("UsuariosContext")
    ?? throw new InvalidOperationException("Connection string 'UsuariosContext' not found.");

builder.Services.AddDbContext<usersDbContext>(
    options => options.UseSqlServer(connectionString)
);

builder.Services
    .AddIdentity<IdentityUser, IdentityRole>(options => {
        options.User.AllowedUserNameCharacters = null;
    })
    .AddEntityFrameworkStores<usersDbContext>()
    .AddDefaultTokenProviders()
    .AddRoles<IdentityRole>();



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
