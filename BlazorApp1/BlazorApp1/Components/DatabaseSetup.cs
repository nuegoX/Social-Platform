namespace BlazorApp1.Components
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public static class DatabaseSetup
    {
        public static void ConfigureDbContext(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseMySql(configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.Parse("8.0.32")); // server version
            });
        }
    }
}