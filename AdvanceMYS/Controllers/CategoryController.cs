using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{

    public class CategoryController : Controller
    {
        private readonly _5069_ManageYourSelfContext _db;
        int UserId = 1;
        public CategoryController(_5069_ManageYourSelfContext db)
        {
            _db = db;
        }
        #region Category
        public IActionResult Index()
        {
            return Json(_db.Categories.ToList());
        }
    
        public IActionResult CreateUpdatePost(Models.Domain.Category Category)
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
        public IActionResult FindJob(int Id)
        {
            return Json(_db.Jobs.SingleOrDefault(q => q.JobId == Id));
        }
        public IActionResult CreateUpdateJobPost(Models.Domain.Job job)
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
    }
}
