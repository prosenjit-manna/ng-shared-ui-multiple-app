var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews()
    .AddRazorRuntimeCompilation(); // Enable Razor hot reload

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles(); // wwwroot

// Serve static files from Views directory
var viewsPath = Path.Combine(app.Environment.ContentRootPath, "Views");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(viewsPath),
    RequestPath = "/Views",
    ServeUnknownFileTypes = false,
    OnPrepareResponse = ctx =>
    {
        var path = ctx.File.PhysicalPath?.ToLowerInvariant() ?? "";
        if (path.EndsWith(".js"))
        {
            ctx.Context.Response.ContentType = "application/javascript";
        }
        else if (path.EndsWith(".css"))
        {
            ctx.Context.Response.ContentType = "text/css";
        }
    }
});

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
