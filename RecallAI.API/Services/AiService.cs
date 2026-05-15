using System.Net.Http.Json;

namespace RecallAI.API.Services;

public class AiService
{
    private readonly HttpClient _httpClient;

    public AiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.Timeout = TimeSpan.FromMinutes(5); // IMPORTANT FIX
    }

    public async Task<string> GenerateSummary(string type, List<string> notes)
    {
        var combined = string.Join("\n", notes);

        var prompt = $@"
You are an AI productivity assistant.

Write a SINGLE clean paragraph summary.

Rules:
- Do NOT use bullet points
- Do NOT use headings
- Do NOT format text
- Only 1 paragraph
- Keep it natural and readable

Type: {type}

User Notes:
{combined}
";

        var response = await _httpClient.PostAsJsonAsync(
            "http://localhost:11434/api/generate",
            new
            {
                model = "llama3",
                prompt = prompt,
                stream = false
            });

        var result = await response.Content.ReadFromJsonAsync<OllamaResponse>();

        return result?.response ?? "";
    }

    public async Task<string> GenerateDailySummary(List<string> notes)
    {

        var trimmedNotes = notes
            .TakeLast(20)
            .ToList();
        var combinedNotes = string.Join("\n", trimmedNotes);
        var prompt = $@"
                You are an AI productivity assistant.

                Generate a DAILY SUMMARY in a STRICT FORMAT.

                RULES:
                - Do NOT write long paragraphs
                - Do NOT repeat information
                - Use bullet points only
                - Keep it short and structured
                - Use clear headings

                FORMAT:

                📅 Daily Summary

                🎯 Overview
                (1-2 lines max)

                ✅ Key Activities
                - bullet points

                📊 Outcome
                (1-2 lines max)

                📌 Next Steps
                - bullet points

                USER NOTES:
                {combinedNotes}
                ";

        var response = await _httpClient.PostAsJsonAsync(
            "http://localhost:11434/api/generate",
            new
            {
                model = "llama3",
                prompt = prompt,
                stream = false
            });

        var result = await response.Content.ReadFromJsonAsync<OllamaResponse>();

        return result?.response ?? "No summary generated";
    }
}

public class OllamaResponse
{
    public string response { get; set; }
}