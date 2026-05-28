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
            model = "openai/gpt-oss-120b",
            messages = new[]
            {
                new { role = "system", content = "You are a helpful productivity assistant." },
                new { role = "user", content = prompt }
            },
            temperature = 0.7
        };

        //test

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
    public async Task<string> GenerateSummary(string type, List<NoteDto> notes)
    {
        var combined = string.Join("\n\n", notes.Select(n =>
            $@"Title: {n.Title}
            Content: {n.Content}"
                    ));

        var prompt = $@"
You are an intelligent personal memory assistant.

TASK:
The user writes messy, fragmented, incomplete notes across different days.

Your job is to:
- understand the REAL intention behind the notes
- combine related notes together
- remove duplicates
- infer missing context when obvious
- produce ONE clean actionable summary

IMPORTANT:
- Notes may contain short titles
- Notes may contain incomplete thoughts
- Notes may repeat the same idea differently
- Use BOTH title and content together
- Group related information naturally

DO NOT:
- rewrite every note individually
- repeat the notes back
- create changelog-style summaries
- mention unrelated technical tasks unless they connect

INSTEAD:
Create a smart human-like understanding of what the user actually wants.

OUTPUT STYLE:
- natural language
- concise
- actionable
- easy to understand quickly

GOOD OUTPUT EXAMPLE:
'You need to buy/setup office accessories including a mouse and Logitech keyboard, and check additional office items during your next Keells visit.'

TYPE:
{type}

NOTES:
{combined}
";

        return await CallGroq(prompt);
    }

    // =========================
    // DAILY SUMMARY
    // =========================
    public async Task<string> GenerateDailySummary(List<NoteDto> notes)
    {
        var trimmedNotes = notes.TakeLast(15);

        var combined = string.Join("\n\n", trimmedNotes.Select(n =>
            $@"Title: {n.Title}
    Content: {n.Content}"
        ));

        var prompt = $@"
    You are an AI productivity assistant.

    TASK:
    Summarize today's notes in a SHORT and CLEAN format.

    IMPORTANT:
    - Titles are important context
    - Use title + content together

    RULES:
    - Max 5 lines total
    - Keep it extremely simple
    - No repetition
    - No long explanations

    FORMAT:
    Daily Summary:
    - 3 to 5 short bullet points MAX

    NOTES:
    {combined}
    ";

        return await CallGroq(prompt);
    }
}