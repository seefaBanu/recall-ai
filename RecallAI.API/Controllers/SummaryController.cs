using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecallAI.API.Data;
using RecallAI.API.Services;
using System.Security.Claims;

namespace RecallAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SummaryController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AiService _ai;

    public SummaryController(AppDbContext context, AiService ai)
    {
        _context = context;
        _ai = ai;
    }

    private string? GetUserId()
    {
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }

    [HttpPost("{type}")]
    public async Task<IActionResult> Generate(string type)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Invalid or missing token");

        DateTime to = DateTime.UtcNow;

        DateTime from = type.ToLower() switch
        {
            "daily" => to.AddDays(-1),
            "weekly" => to.AddDays(-7),
            "monthly" => to.AddMonths(-1),
            "yearly" => to.AddYears(-1),
            _ => to.AddDays(-1)
        };

        var notes = await _context.Notes
            .Where(n =>
                n.UserId == userId &&
                n.CreatedAt >= from &&
                n.CreatedAt <= to
            )
            .Select(n => n.Content)
            .ToListAsync();

        if (notes.Count == 0)
            return Ok("No notes available for this period.");

        var summary = await _ai.GenerateSummary(type, notes);

        return Ok(summary);
    }
}