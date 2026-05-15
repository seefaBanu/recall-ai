namespace RecallAI.API.Models;

public class Summary
{
    public int Id { get; set; }

    public string Type { get; set; } = ""; 
    // Daily | Weekly | Monthly | Yearly

    public string Content { get; set; } = "";

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}