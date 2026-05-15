using Microsoft.EntityFrameworkCore;
using RecallAI.API.Data;
using RecallAI.API.Services;

var builder = WebApplication.CreateBuilder(args);

//
// CORS (Production + Local)
//
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

//
// Controllers + Swagger
//
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//
// AI Service
//
builder.Services.AddHttpClient<AiService>();

//
// Database
//
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

//
// Swagger (optional for production)
//
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//
// Railway PORT BINDING FIX
//
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://0.0.0.0:{port}");

//
// Middleware pipeline
//
app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();