using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{
    public class KarkardController : Controller
    {
        private readonly _5069_ManageYourSelfContext _db;
        public KarkardController(_5069_ManageYourSelfContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult Create(Models.Domain.KarKard New)
        {

        
            if (New.DayDate == null)
            {
                New.DayDate =Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                New.MiladyDate = DateTime.Now;
            }
            else
            {
                New.DayDate = Utility.ConvertDateToSqlFormat(New.DayDate);

            }

            List<Models.Domain.KarKard> lstKarkard = 
                _db.KarKards.
                Include(q=>q.Job).
                Where(q => q.DayDate == New.DayDate &&  q.StartTime == New.StartTime && q.EndTime == New.EndTime).
                ToList();

            if (lstKarkard.Count > 0)
            {
                var description = "رکورد تکراری میباشد";
                description += "\n";
                foreach (var item in lstKarkard)
                {
                    description += item.Job.Name + " " + item.StartTime + " " + item.EndTime;
                }

                return Json(description);
            }

            Models.Domain.KarKard oldKarkard = _db.KarKards.Include(q=>q.Job).SingleOrDefault(q => q.DayDate == New.DayDate && q.StartTime == New.StartTime);
            if (oldKarkard != null)
            {
                if (oldKarkard.JobId != New.JobId)
                {
                
                   var description = "این رکورد برای مورد دیگری ثبت شده است";
                    description += "\n";
                    description += oldKarkard.Job.Name + " " + oldKarkard.StartTime + " " + oldKarkard.EndTime;
                    return Json(description);
                }
                oldKarkard.SpendTimeMinute = New.SpendTimeMinute * 60;
                oldKarkard.EndTime = New.EndTime;
                if (_db.SaveChanges() > 0)
                {

                    var description = " با موفقیت ویرایش شد ";
                    description += "\n";
                   description += oldKarkard.Job.Name + " " + New.StartTime + " " + New.EndTime;
                    return Json(description);
                }
                else
                { 
                }
               
            }
            New.SpendTimeMinute = New.SpendTimeMinute * 60;
            _db.KarKards.Add(New);
            if (_db.SaveChanges() > 0)
            {
                return Json("با موفقیت ثبت شد");
            }
            else
            {
                return Json("خطا در  KarKard/Create");
            }
           
        }
        public IActionResult FindEndTimeIsNull() {
           var res= _db.KarKards.Include(q => q.Job).Where(q => q.JobId > 0 && q.EndTime == null).ToList();
            var today= Models.Utility.Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
            foreach (var item in res)
            {
                if (item.DayDate != today)
                {
                    _db.KarKards.Remove(item);
                }
            }
            _db.SaveChanges();
            return Json(res);
        }
        public IActionResult AllKarkardAtMounth() {
            string today = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
            today = today.Substring(0, 6);

            return Json(
                _db.KarKards.Include(q=>q.Job).ThenInclude(q=>q.Category).
                Where(q => q.DayDate.Substring(0, 6) == today).OrderByDescending(q => q.DayDate).ThenByDescending(q=>q.EndTime).ThenBy(q => q.JobId).ToList()
                ); 
        }
        public ActionResult ListKarkard(int dateParam)
        {
            var res = (from k in _db.KarKards
                       join j in _db.Jobs
                       on k.JobId equals j.JobId
                       select new { DayDate = k.DayDate, Name = j.Name, k.SpendTimeMinute, j.JobId }).AsEnumerable().
                       Where(y => int.Parse(y.DayDate) >= dateParam).
                       Select(x => new { x.Name, x.DayDate, x.SpendTimeMinute, x.JobId }).OrderByDescending(q => q.DayDate).ThenBy(q => q.JobId);

            return Json(res);
        }
        public IActionResult DeleteKarkard(int id)
        {
            _db.KarKards.Remove(_db.KarKards.SingleOrDefault(q => q.KarkardId == id));
            if (_db.SaveChanges() > 0)
                return Json("با موفقیت حذف انجام شد");
            return Json("خطا در حذف");
        }
    }
}
