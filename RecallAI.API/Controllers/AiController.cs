using Microsoft.AspNetCore.Mvc;
using RecallAI.API.Services;

namespace RecallAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly AiService _aiService;

    public AiController(AiService aiService)
    {
        _aiService = aiService;
    }

    // =========================
    // GET USER ID FROM HEADER
    // =========================
    private string GetUserId()
    {
        return Request.Headers["x-user-id"].ToString();
    }

    // =========================
    // DTO
    // =========================
    public class AiRequest
    {
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
    }

    // =========================
    // SINGLE NOTE SUMMARY (FIXED)
    // =========================
    [HttpPost("summary")]
    public async Task<IActionResult> GetSummary([FromBody] AiRequest request)
    {
        var userId = GetUserId();

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("Missing user id");

        var notes = new List<NoteDto>
        {
            new NoteDto
            {
                Title = request.Title,
                Content = request.Content
            }
        };

        var result = await _aiService.GenerateSummary("daily", notes);

        return Ok(result);
    }
}