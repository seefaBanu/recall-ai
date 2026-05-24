using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecallAI.API.Data;
using RecallAI.API.Models;
using System.Security.Claims;

namespace RecallAI.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }

    // =========================
    // GET USER ID FROM JWT
    // =========================
    private string GetUserId()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userId))
        {
            throw new UnauthorizedAccessException("Unauthorized");
        }

        return userId;
    }

    // =========================
    // GET ALL NOTES
    // =========================
    [HttpGet]
    public IActionResult GetNotes()
    {
        var userId = GetUserId();

        var notes = _context.Notes
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt)
            .ToList();

        return Ok(notes);
    }

    // =========================
    // GET SINGLE NOTE
    // =========================
    [HttpGet("{id}")]
    public IActionResult GetNote(int id)
    {
        var userId = GetUserId();

        var note = _context.Notes
            .FirstOrDefault(n =>
                n.Id == id &&
                n.UserId == userId
            );

        if (note == null)
        {
            return NotFound();
        }

        return Ok(note);
    }

    // =========================
    // CREATE NOTE
    // =========================
    [HttpPost]
    public async Task<IActionResult> Create(Note note)
    {
        var userId = GetUserId();

        note.UserId = userId;
        note.CreatedAt = DateTime.UtcNow;

        _context.Notes.Add(note);

        await _context.SaveChangesAsync();

        return Ok(note);
    }

    // =========================
    // UPDATE NOTE
    // =========================
    [HttpPut("{id}")]
    public IActionResult Update(int id, Note updated)
    {
        var userId = GetUserId();

        var note = _context.Notes
            .FirstOrDefault(n =>
                n.Id == id &&
                n.UserId == userId
            );

        if (note == null)
        {
            return NotFound();
        }

        note.Title = updated.Title;
        note.Content = updated.Content;

        _context.SaveChanges();

        return Ok(note);
    }

    // =========================
    // DELETE NOTE
    // =========================
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = GetUserId();

        var note = _context.Notes
            .FirstOrDefault(n =>
                n.Id == id &&
                n.UserId == userId
            );

        if (note == null)
        {
            return NotFound();
        }

        _context.Notes.Remove(note);

        _context.SaveChanges();

        return NoContent();
    }
}