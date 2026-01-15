using Microsoft.AspNetCore.Mvc;

namespace MyWebsite.Controllers;

public class ProfileController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
