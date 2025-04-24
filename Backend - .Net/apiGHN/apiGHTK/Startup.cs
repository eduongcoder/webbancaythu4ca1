using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        // Đăng ký HttpClient cho GHTKService
        services.AddHttpClient<GHNService>();

        // Đăng ký controller
        services.AddControllers();
        services.AddSwaggerGen();
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
            builder.WithOrigins("https://nhom11sangt4ca1user.netlify.app", "https://nhom11sangt4ca1admin.netlify.app", "http://localhost:5173",
            "http://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader());
        });
        // Nếu sử dụng Swagger hoặc các dịch vụ khác, bạn có thể thêm ở đây
        // services.AddSwaggerGen();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseCors("AllowAll");
        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
