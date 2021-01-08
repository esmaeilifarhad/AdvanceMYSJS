using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{

    public class CategoryController : Controller
    {
        private readonly _Context _db;
        int UserId = 1;
        public CategoryController(_Context db)
        {
            _db = db;
        }
        #region Category
        public IActionResult Index()
        {
            return Json(_db.Categories.ToList());
        }
    
        public IActionResult CreateUpdatePost(DomainClass.DomainClass.Category Category)
        {
            //create
            if (Category.CategoryId == 0)
            {
                _db.Categories.Add(Category);
                _db.SaveChanges();
                return Json("با موفقیت ثبت شد");
            }
            //update
            else
            {
                var old = _db.Categories.SingleOrDefault(q => q.CategoryId == Category.CategoryId);
                old.CategoryName = Category.CategoryName;
                old.UserId =UserId;

                var count = _db.SaveChanges();
                return Json("تعداد " + count + " رکورد ویرایش شد");
            }
        }

        public IActionResult Find(int Id)
        {
            return Json(_db.Categories.SingleOrDefault(q => q.CategoryId == Id));
        }
        public IActionResult Delete(int Id)
        {
            var old = _db.Categories.SingleOrDefault(q => q.CategoryId == Id);
            _db.Categories.Remove(old);
            return Json(_db.SaveChanges() + " با موفقیت حذف شد ");
        }
        #endregion
        #region Job
        public IActionResult IndexJob(int categoryId)
        {
            return Json(_db.Jobs.Where(q => q.CategoryId == categoryId).Include(q => q.Category).ToList());
        }
        public IActionResult IndexJobAll()
        {
            string month = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
            month = month.Substring(0, 6);
            return Json(_db.Jobs.Include(q => q.Category).
                Include(q=>q.PercentJobs).
               Include(q=>q.KarKards).
               OrderByDescending(q=>q.KarKards.Where(q=>q.DayDate==Utility.ConvertDateToSqlFormat(Utility.shamsi_date())).Sum(q=>q.SpendTimeMinute)).
                ThenByDescending(q=>
                q.PercentJobs.SingleOrDefault(q=>q.Date== month).PercentValue).
                ToList());
        }
        public IActionResult FindJob(int Id)
        {
            return Json(_db.Jobs.SingleOrDefault(q => q.JobId == Id));
        }
        public IActionResult CreateUpdateJobPost(DomainClass.DomainClass.Job job)
        {
            //create
            if (job.JobId == 0)
            {
                _db.Jobs.Add(job);
                _db.SaveChanges();
                return Json("با موفقیت ثبت شد");
            }
            //update
            else
            {
                var old = _db.Jobs.SingleOrDefault(q => q.JobId == job.JobId);
                old.Name = job.Name;
                old.CategoryId = job.CategoryId;
                //old.UserId = UserId;

                var count = _db.SaveChanges();
                return Json("تعداد " + count + " رکورد ویرایش شد");
            }
        }
        public IActionResult DeleteJob(int Id)
        {
            var old = _db.Jobs.SingleOrDefault(q => q.JobId == Id);
            _db.Jobs.Remove(old);
            return Json(_db.SaveChanges() + " با موفقیت حذف شد ");
        }
        #endregion
        #region PercentJob
        public IActionResult PercentJob(int jobId)
        {
         string today=  Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
            today = today.Substring(0,6);
            return Json(
                _db.PercentJobs.SingleOrDefault(q=>q.JobId==jobId && q.Date==today)
                );
        }
        public IActionResult PercentJobPost(DomainClass.DomainClass.PercentJob newPercentJob)
        {
            
            string today = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
            today = today.Substring(0,6);

            var oldPercentJob = _db.PercentJobs.SingleOrDefault(q => q.JobId == newPercentJob.JobId && q.Date == today);

            //update
            if (oldPercentJob!=null)
            {
                oldPercentJob.PercentValue = newPercentJob.PercentValue;
            }
            //insert
            else
            {
                newPercentJob.Date = today;
                _db.PercentJobs.Add(newPercentJob);
            }
          
            _db.SaveChanges();
            
            return Json(true
              
                );
        }
        public ActionResult ListPercentJob(string Date)
        {
            var res = _db.PercentJobs.Where(q => q.Date == Date).Select(q => new { q.Date, q.JobId, q.PercentId, q.PercentValue, q.Job.Name }).ToList();
            return Json(res);
        }
        #endregion
    }
}
