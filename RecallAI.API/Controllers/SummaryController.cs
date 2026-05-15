using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecallAI.API.Data;
using RecallAI.API.Services;

namespace RecallAI.API.Controllers;

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

    [HttpPost("{type}")]
    public async Task<IActionResult> Generate(string type)
    {
        try
        {
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
                .Where(n => n.CreatedAt >= from && n.CreatedAt <= to)
                .Select(n => n.Content)
                .ToListAsync();

            if (!notes.Any())
            {
                return Ok("No notes available for this period.");
            }

            var summary = await _ai.GenerateSummary(type, notes);

            return Ok(summary);
        }
        catch (TaskCanceledException)
        {
            return StatusCode(408, "AI request timed out. Try again.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Something went wrong generating summary.");
        }
    }
}