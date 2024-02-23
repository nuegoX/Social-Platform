namespace BlazorApp1.Components
{
    using Microsoft.EntityFrameworkCore;
    using Mysqlx.Crud;

    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        // Define your DbSet properties for data models here
        public DbSet<User> MyData { get; set; }
    }
}
