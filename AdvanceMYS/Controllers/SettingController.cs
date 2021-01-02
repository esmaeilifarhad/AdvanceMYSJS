using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    public class SettingController : Controller
    {
        public readonly _5069_ManageYourSelfContext _db;
        public SettingController(_5069_ManageYourSelfContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return Json(_db.Settings.ToList());
        }
    }
}
