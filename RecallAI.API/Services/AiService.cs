using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using RecallAI.API.Models;

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
            model = "openai/gpt-oss-120b",
            messages = new[]
            {
                new { role = "system", content = "You are RecallAI, an intelligent memory assistant." },
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
    // SUMMARY + SEARCH ENGINE
    // =========================
    public async Task<string> GenerateSummary(string type, List<NoteDto> notes, string? query = null)
    {
        var combined = string.Join("\n\n", notes.Select(n =>
            $@"TITLE: {n.Title}
CONTENT: {n.Content}"
        ));

        string mode = string.IsNullOrWhiteSpace(query)
            ? "GENERAL SUMMARY"
            : $"INTENT MODE: {query}";

        var prompt = $@"
You are RecallAI, a personal memory intelligence system.

TASK:
Analyze user notes and return a meaningful response.

MODE:
{mode}

RULES:
- If GENERAL SUMMARY → summarize everything
- If INTENT MODE → extract ONLY relevant information
- Merge similar ideas
- Understand real user intent behind notes
- Ignore unrelated notes when in intent mode

OUTPUT RULES:
- Plain text only
- No markdown
- No bullets unless absolutely needed
- No formatting symbols
- Natural human explanation only

EXAMPLE OUTPUT:
User is planning office setup tasks including buying a mouse and Logitech keyboard, and checking additional items during a Keells visit. They also have app improvements related to usability and crash fixes.

NOTES:
{combined}
";

        return await CallGroq(prompt);
    }

    // =========================
    // SEARCH-ONLY MODE (NEW FEATURE)
    // =========================
    public async Task<string> SearchNotes(List<NoteDto> notes, string query)
    {
        var combined = string.Join("\n\n", notes.Select(n =>
            $@"TITLE: {n.Title}
CONTENT: {n.Content}"
        ));

        var prompt = $@"
You are RecallAI Search Engine.

TASK:
User is searching inside their notes.

QUERY:
{query}

RULES:
- Return ONLY relevant notes
- Group similar ideas
- Convert into clean useful summary
- Ignore unrelated notes completely

OUTPUT:
- Plain text only
- No markdown
- No bullets unless needed
- Very short and precise

NOTES:
{combined}
";

        return await CallGroq(prompt);
    }
}