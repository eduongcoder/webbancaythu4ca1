using apiGHTK.Entity;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
   
    public DbSet<OrderData> orderdatas { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        //modelBuilder.Entity<Fee>().HasNoKey();


      
    }



}
