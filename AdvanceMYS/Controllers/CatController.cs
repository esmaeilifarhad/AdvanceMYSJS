using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    public class CatController : Controller
    {
        private readonly _5069_ManageYourSelfContext _db;
        public CatController(_5069_ManageYourSelfContext db)
        {
            _db = db;
        }
        public IActionResult ListCat(int Code)
        {
          var res=  _db.Cats.Where(q => q.Code == Code).OrderBy(q=>q.Order).ToList();
            return Json(res);
        }
        public IActionResult EditCat(int CatId)
        {
            var res = _db.Cats.SingleOrDefault(q => q.CatId == CatId);
            return Json(res);
        }
    }
}
