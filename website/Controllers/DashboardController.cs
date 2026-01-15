using Microsoft.AspNetCore.Mvc;

namespace MyWebsite.Controllers;

public class DashboardController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
