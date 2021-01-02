using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{
    public class RoutineJobController : Controller
    {
        private readonly _5069_ManageYourSelfContext _db;
        int UserId = 1;
        public RoutineJobController(_5069_ManageYourSelfContext db)
        {
            _db = db;
        }

        public IActionResult CreateUpdatePost(Models.Domain.RoutineJob RoutineJob)
        {
            //create
            if (RoutineJob.RoutineJobId == 0)
            {
                _db.RoutineJobs.Add(RoutineJob);
                _db.SaveChanges();
                return Json("با موفقیت ثبت شد");
            }
            //update
            else
            {
                var old = _db.RoutineJobs.SingleOrDefault(q => q.RoutineJobId == RoutineJob.RoutineJobId);
                old.Rate = (RoutineJob.Rate==null?old.Rate: RoutineJob.Rate);
                old.Order = (RoutineJob.Order == null ? old.Order : RoutineJob.Order);
                old.RoozDaily = (RoutineJob.RoozDaily == null ? old.RoozDaily : RoutineJob.RoozDaily);
                old.Job = (RoutineJob.Job == null ? old.Job : RoutineJob.Job);
               

                var count = _db.SaveChanges();
                return Json("تعداد " + count + " رکورد ویرایش شد");
            }
        }

        public IActionResult Find(int Id)
        {
            return Json(_db.RoutineJobs.SingleOrDefault(q => q.RoutineJobId == Id));
        }
        public IActionResult Delete(int Id)
        {
            var old = _db.RoutineJobs.SingleOrDefault(q => q.RoutineJobId == Id);
            _db.RoutineJobs.Remove(old);
            return Json(_db.SaveChanges() + " با موفقیت حذف شد ");
        }

        public IActionResult Index()
        {
            return Json(_db.RoutineJobs.ToList().OrderBy(q=>q.Order));
        }
        public IActionResult checkInRoutineJobha(Models.Domain.RoutineJobHa RoutineJobHa) {
           var old= _db.RoutineJobHas.SingleOrDefault(q=>q.RoutineJobId==RoutineJobHa.RoutineJobId && q.Date==RoutineJobHa.Date);
            var msg = "";
            if (RoutineJobHa.IsCheck == true)
            {
                _db.RoutineJobHas.Add(RoutineJobHa);
            }
            else if (old != null)
            {
                _db.RoutineJobHas.Remove(old);
            }
            else
            { 
            
            }
            _db.SaveChanges();
            return Json(msg);
        }
        public IActionResult listRoutineJobha() {
            return Json(_db.RoutineJobHas.Include(q=>q.RoutineJob).OrderBy(q=>q.Date).ToList());
        }
        public IActionResult listRoutineJobhaByDate(string date)
        {
            return Json(_db.RoutineJobHas.Where(q=>q.Date==date).Include(q => q.RoutineJob).OrderBy(q => q.Date).ToList());
        }

    }
}
