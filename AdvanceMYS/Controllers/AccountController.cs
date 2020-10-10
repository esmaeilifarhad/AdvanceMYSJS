using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{
    public class AccountController : Controller
    {
        private readonly _5069_ManageYourSelfContext _db;
        public AccountController(_5069_ManageYourSelfContext db)
        {
            _db = db; 
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Authenticate()
        {
            return View();
        }
            [HttpPost]
        public IActionResult Authenticate(Models.Domain.User U)
        {
           var oldUser= _db.Users.SingleOrDefault(q => q.UserName == U.UserName && q.Password == U.Password);
            if (oldUser == null)
            {
                return Json("نام کاربری شما پیدا نشد");
            }
           var roles= _db.UserRoles.Where(q => q.UserId == oldUser.UserId).Include(q=>q.Role).ToList();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, oldUser.Name));
            claims.Add(new Claim(ClaimTypes.Sid, oldUser.UserName));
            // claims.Add(new Claim(ClaimTypes.Email, oldUser.Email));
            claims.Add(new Claim("PhoneNumber", oldUser.PhoneNumber));

            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item.Role.RoleName));

            }

           
          
            var granmaIdentity = new ClaimsIdentity(claims, "Grandma Identity");
         
            var userPrincipal = new ClaimsPrincipal(new[] { granmaIdentity });

            HttpContext.SignInAsync(userPrincipal);

            return Json(true);
        }

        public IActionResult AccessDeny() {
            return Json("شما به این صفحه دسترسی ندارید");
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Json(true);
            //return RedirectToAction("Index", "ManageYourSelf");

          
        }
    }
}
