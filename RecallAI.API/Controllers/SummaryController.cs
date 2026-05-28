using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecallAI.API.Data;
using RecallAI.API.Models;
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

    // =========================
    // SUMMARY + INTENT MODE
    // =========================
    [HttpPost("{type}")]
    public async Task<IActionResult> Generate(string type, [FromQuery] string? query)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        DateTime to = DateTime.UtcNow;

        DateTime from = type.ToLower() switch
        {
            "daily" => to.AddDays(-1),
            "weekly" => to.AddDays(-7),
            "monthly" => to.AddMonths(-1),
            _ => to.AddDays(-1)
        };

        var notes = await _context.Notes
            .Where(n =>
                n.UserId == userId &&
                n.CreatedAt >= from &&
                n.CreatedAt <= to
            )
            .Select(n => new NoteDto
            {
                Title = n.Title ?? "",
                Content = n.Content ?? ""
            })
            .ToListAsync();

        if (!notes.Any())
            return Ok("No notes available.");

        var result = await _ai.GenerateSummary(type, notes, query);

        return Ok(result);
    }

    // =========================
    // SEARCH ENDPOINT (NEW)
    // =========================
    [HttpPost("search")]
    public async Task<IActionResult> Search([FromBody] string query)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var notes = await _context.Notes
            .Where(n => n.UserId == userId)
            .Select(n => new NoteDto
            {
                Title = n.Title ?? "",
                Content = n.Content ?? ""
            })
            .ToListAsync();

        var result = await _ai.SearchNotes(notes, query);

        return Ok(result);
    }
}