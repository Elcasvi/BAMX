using System.Text.Json.Serialization;
using Backend.Models.Data;
using Backend.Models.Interfaces;
using Backend.Models.Repositories;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//Dependency injection for my database services
builder.Services.AddScoped<BlobStorageService>();
builder.Services.AddSingleton<Hash>();
builder.Services.AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);//For many to many relationships
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IJobOfferRepository,JobOfferRepository>();
builder.Services.AddScoped<ICourseRepository,CourseRepository>();
builder.Services.AddScoped<IAssignedJobRepository,AssignedJobRepository>();
builder.Services.AddScoped<IUserJobOfferRepository,UserJobOfferRepository>();
builder.Services.AddScoped<IUserCourseRepository,UserCourseRepository>();
//Database connection
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection"));
});

//Azure blob storage connection
var storageConnection = builder.Configuration.GetConnectionString("StorageConnection");

//This helps me to configure all tthe azure sdks in one spot
builder.Services.AddAzureClients(azureBuilder =>
{
    azureBuilder.AddBlobServiceClient(storageConnection);
});
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