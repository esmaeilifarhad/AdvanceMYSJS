using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Controllers
{
    public class PlanningController : Controller

    {
        private readonly _Context db;

        public PlanningController(Models.Domain._Context db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Create() {
            return Json(true);
        }
        [HttpPost]
        public IActionResult Create(DomainClass.DomainClass.Planing newRecord)
        {
            DomainClass.DomainClass.Planing planing = new DomainClass.DomainClass.Planing() {
            
            };
            db.Planing.Add(planing);
           // db.SaveChanges();
            return Json(true);
        }
    }
}
