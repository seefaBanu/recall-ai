using Microsoft.AspNetCore.Mvc;
using RecallAI.API.Data;
using RecallAI.API.Models;

namespace RecallAI.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetNotes()
    {
        return Ok(_context.Notes.ToList());
    }

    [HttpPost]
    public async Task<IActionResult> Create(Note note)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (string.IsNullOrWhiteSpace(note.Title) ||
            string.IsNullOrWhiteSpace(note.Content))
        {
            return BadRequest("Title and Content are required");
        }

        _context.Notes.Add(note);
        await _context.SaveChangesAsync();

        return Ok(note);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteNote(int id)
    {
        var note = _context.Notes.Find(id);

        if (note == null)
        {
            return NotFound();
        }

        _context.Notes.Remove(note);

        _context.SaveChanges();

        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateNote(int id, Note updatedNote)
    {
        var note = _context.Notes.Find(id);

        if (note == null)
        {
            return NotFound();
        }

        note.Title = updatedNote.Title;
        note.Content = updatedNote.Content;

        _context.SaveChanges();

        return Ok(note);
    }
}