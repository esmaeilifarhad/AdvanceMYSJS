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
        public IActionResult CreateUpdateCat(Models.Domain.Cat Cat) {
            //create
            if (Cat.CatId == 0)
            {
                _db.Cats.Add(Cat);
                _db.SaveChanges();
                return Json(true);
            }
            //update
            else
            {
            var  oldCat=  _db.Cats.SingleOrDefault(q => q.CatId == Cat.CatId);
                oldCat.Code = Cat.Code;
                oldCat.Dsc = Cat.Dsc;
                oldCat.Order = Cat.Order;
                oldCat.Title = Cat.Title;
               var count= _db.SaveChanges();
                return Json(count);
            }
            
           
        }
        public IActionResult DeleteCat(int id) {
            _db.Cats.Remove(_db.Cats.SingleOrDefault(q=>q.CatId==id));
            if (_db.SaveChanges() > 0)
                return Json("با موفقیت حذف شد");
            return Json("خطا در حذف");
        }
    }
}
