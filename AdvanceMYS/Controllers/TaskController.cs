using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    public class TaskController : Controller
    {
        Models.Domain._5069_ManageYourSelfContext db = new Models.Domain._5069_ManageYourSelfContext();
       
        public IActionResult Index()
        {
           var res= db.Tasks.ToList();
            return Json(res);
        }
        
    }
}
