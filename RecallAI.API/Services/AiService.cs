using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace RecallAI.API.Services;

public class AiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AiService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
        _httpClient.Timeout = TimeSpan.FromMinutes(5);
    }

    // =========================
    // CORE GROQ CALL
    // =========================
    private async Task<string> CallGroq(string prompt)
    {
        var apiKey = _config["Groq:ApiKey"];

        var requestBody = new
        {
            model = "llama3-8b-8192",
            messages = new[]
            {
                new { role = "system", content = "You are a helpful productivity assistant." },
                new { role = "user", content = prompt }
            },
            temperature = 0.7
        };

        var request = new HttpRequestMessage(
            HttpMethod.Post,
            "https://api.groq.com/openai/v1/chat/completions"
        );

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);

        request.Content = new StringContent(
            JsonSerializer.Serialize(requestBody),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.SendAsync(request);
        var json = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception(json);

        using var doc = JsonDocument.Parse(json);

        return doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? "";
    }

    // =========================
    // GENERAL SUMMARY
    // =========================
    public async Task<string> GenerateSummary(string type, List<string> notes)
    {
        var combined = string.Join("\n", notes);

        var prompt = $@"
You are an AI productivity assistant.

Write a SINGLE clean paragraph summary.

Rules:
- Do NOT use bullet points
- Do NOT use headings
- Only 1 paragraph
- Keep it natural and readable

Type: {type}

User Notes:
{combined}
";

        return await CallGroq(prompt);
    }

    // =========================
    // DAILY SUMMARY
    // =========================
    public async Task<string> GenerateDailySummary(List<string> notes)
    {
        var trimmedNotes = notes.TakeLast(20);
        var combinedNotes = string.Join("\n", trimmedNotes);

        var prompt = $@"
You are an AI productivity assistant.

Generate a DAILY SUMMARY in STRICT FORMAT.

RULES:
- Keep it short
- Use structured sections
- Use bullet points only where needed

FORMAT:

Daily Summary

Overview
(1-2 lines max)

Key Activities
- bullet points

Outcome
(1-2 lines max)

Next Steps
- bullet points

USER NOTES:
{combinedNotes}
";

        return await CallGroq(prompt);
    }
}