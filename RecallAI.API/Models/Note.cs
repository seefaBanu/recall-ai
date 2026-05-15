namespace RecallAI.API.Models;
using System.ComponentModel.DataAnnotations;

public class Note
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; } = "";

    [Required(ErrorMessage = "Content is required")]
    public string Content { get; set; } = "";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}