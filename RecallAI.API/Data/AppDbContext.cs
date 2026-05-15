using Microsoft.EntityFrameworkCore;
using RecallAI.API.Models;

namespace RecallAI.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Note> Notes => Set<Note>();
    public DbSet<Summary> Summaries => Set<Summary>();
}