using Microsoft.EntityFrameworkCore;
using MindConnect.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace MindConnect.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Psychologist> Psychologist { get; set; }
        public DbSet<PsychologistProfile> PsychologistProfile { get; set; }
        public DbSet<Session> Session { get; set; }
        public DbSet<Review> Review { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Psychologist>()
                .HasOne(p => p.User)
                .WithOne()
                .HasForeignKey<Psychologist>(p => p.Id);

            modelBuilder.Entity<Psychologist>()
                .HasOne(p => p.Profile)
                .WithOne()
                .HasForeignKey<Psychologist>(p => p.ProfileId);
        }
    }
}
