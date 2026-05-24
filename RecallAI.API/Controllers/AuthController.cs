using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using RecallAI.API.Data;
using RecallAI.API.Models;
using RecallAI.API.Services;

namespace RecallAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(
        AppDbContext context,
        TokenService tokenService
    )
    {
        _context = context;
        _tokenService = tokenService;
    }

    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var exists = _context.Users.Any(x => x.Email == dto.Email);

        if (exists)
            return BadRequest("Email already exists");

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(RegisterDto dto)
    {
        var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);

        if (user == null)
            return Unauthorized();

        try
        {
            var valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            if (!valid)
                return Unauthorized();
        }
        catch
        {
            return Unauthorized("Corrupt password hash. Re-register user.");
        }

        var token = _tokenService.CreateToken(user);

        return Ok(new
        {
            token,
            email = user.Email,
            id = user.Id
        });
    }
}