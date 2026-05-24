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
    public async Task<string> GenerateSummary(string type, List<string> notes)
    {
        var combined = string.Join("\n", notes);

        var prompt = $@"
            You are an AI note summarizer.

            TASK:
            Create a VERY SHORT summary of the user's notes.

            RULES:
            - Maximum 4–6 lines total
            - Use simple language
            - No long explanations
            - No storytelling
            - No technical deep dive
            - No bullet points unless absolutely necessary
            - Focus only on key idea

            FORMAT:
            - 1 short paragraph OR 3–5 short bullet points max

            TYPE: {type}

            NOTES:
            {combined}
            ";

        return await CallGroq(prompt);
    }

    // =========================
    // DAILY SUMMARY
    // =========================
    public async Task<string> GenerateDailySummary(List<string> notes)
    {
        var trimmedNotes = notes.TakeLast(15);
        var combined = string.Join("\n", trimmedNotes);

        var prompt = $@"
            You are an AI productivity assistant.

            TASK:
            Summarize today's notes in a SHORT and CLEAN format.

            RULES:
            - Max 5 lines total
            - Keep it extremely simple
            - No paragraphs longer than 1–2 lines
            - No technical explanations
            - No repetition
            - Focus only on what matters

            FORMAT:
            Daily Summary:
            - 3 to 5 short bullet points MAX

            NOTES:
            {combined}
            ";

        return await CallGroq(prompt);
    }
}