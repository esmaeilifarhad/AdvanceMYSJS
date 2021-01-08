using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    public class TaghvimController : Controller
    {
        private readonly _Context _db;
        public TaghvimController(_Context db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return Json(_db.Taghvim.OrderByDescending(q=>q.Date).ToList());
        }
        public IActionResult CreateUpdateTaghvimPost(DomainClass.DomainClass.Taghvim Taghvim) {
            //create
            if (Taghvim.TaghvimId == 0)
            {
                _db.Taghvim.Add(Taghvim);
                _db.SaveChanges();
                return Json("با موفقیت ثبت شد");
            }
            //update
            else
            {
                var old = _db.Taghvim.SingleOrDefault(q => q.TaghvimId == Taghvim.TaghvimId);
                old.Date = Taghvim.Date;
                old.IsHolyDay = Taghvim.IsHolyDay;
                old.Dsc = Taghvim.Dsc;
                var count = _db.SaveChanges();
                return Json("تعداد "+count+" رکورد ویرایش شد");
            }
        }

        public IActionResult Find(int Id) {
            return Json(_db.Taghvim.SingleOrDefault(q => q.TaghvimId == Id));
        }
        public IActionResult Delete(int Id)
        {
         var old=   _db.Taghvim.SingleOrDefault(q => q.TaghvimId==Id);
            _db.Taghvim.Remove(old);
           return Json(_db.SaveChanges()+" با موفقیت حذف شد ");
        }
        public IActionResult GetDateEvent(string date) {
            return Json(_db.Taghvim.Where(q => q.Date == date).ToList());
        }
    }
}
