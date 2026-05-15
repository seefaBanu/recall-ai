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

    public class AiRequest
    {
        public string Text { get; set; } = "";
    }

    [HttpPost("summary")]
    public async Task<IActionResult> GetSummary([FromBody] AiRequest request)
    {
        var result = await _aiService.GenerateSummary("daily", new List<string> { request.Text });
        return Ok(result);
    }
}