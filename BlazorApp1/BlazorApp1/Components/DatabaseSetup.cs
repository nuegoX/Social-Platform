namespace BlazorApp1.Components
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public static class DatabaseSetup
    {
        public static void ConfigureDbContext(IServiceCollection services, IConfiguration configuration)
        {
            var serverVersion = "10.4.28-MariaDB";

            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseMySql(
                    configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.Parse(serverVersion)
                )
                .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole())); // Enable logging to console
            });

            var serviceProvider = services.BuildServiceProvider();
            var dbContext = serviceProvider.GetService<DatabaseContext>();

            try
            {
                // Attempt to execute a simple query to force the physical connection
                var result = dbContext.Users.Any(); // You can replace Users with any DbSet in your DbContext
                Console.WriteLine("Connected to the database successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect to the database. Error: {ex.Message}");
            }
        }
    }
}
