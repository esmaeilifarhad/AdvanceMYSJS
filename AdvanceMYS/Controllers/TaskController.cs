using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.CRUDRepo;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using ClosedXML.Excel;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OfficeOpenXml;
using OfficeOpenXml.Core.ExcelPackage;

namespace AdvanceMYS.Controllers
{

    public class TaskController : Controller
    {
        //DomainClass.DomainClass._5069_ManageYourSelfContext db = new DomainClass.DomainClass._5069_ManageYourSelfContext();

        private readonly _Context _db;
        int UserId = 1;
        // private readonly UserManager<> _userManager;
        //   System.Security.Claims.ClaimsPrincipal currentUser = User;
        // private readonly int UserId;
        public TaskController(_Context db)
        {
            //System.Security.Claims.ClaimsPrincipal currentUser = this.User;
            _db = db;
            var s = User;
        }


        public IActionResult Index()
        {
            var res = _db.Tasks.ToList();
            return Json(res);
        }
        public ActionResult ListTaskGeneral()
        {
            List<DomainClass.DomainClass.Task> TaskList = new List<DomainClass.DomainClass.Task>();

            try
            {
                Models.ViewModels.VM_Public V = new Models.ViewModels.VM_Public();
                List<DomainClass.DomainClass.Cat> lstC = new List<DomainClass.DomainClass.Cat>();

                string query = @"
  select Tbl.CatId,isnull(Title,N'تعریف نشده') Title from [5069_ManageYourSelf].[5069_Esmaeili].Cat right join
  (
  select isnull(CatId,0) CatId 
  from [5069_ManageYourSelf].[dbo].[Task] 
  where IsActive=1 and IsCheck=0 
  group by CatId
  ) tbl
  on Cat.CatId=tbl.CatId
  order by [Order] asc
";
                using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
                {

                    TaskList = DB.Query<DomainClass.DomainClass.Task>(query).ToList();
                }

            }
            catch (Exception ex)
            {
                //Error.message = ex.InnerException.Message;
                //Error.result = false;
              throw new ArgumentException(ex.InnerException.Message);
                //return Json(Error, JsonRequestBehavior.AllowGet);

            }

            return View();
        }
        //[Authorize(Roles = "Task")]
        public ActionResult ListTask(string stringSerach,string[] arrCatId,string date)
        {
            if (date!=null) {
                var res = _db.Tasks.Where(q => q.IsCheck == false && q.DateEnd==date).
                       Include(q => q.Cat).Include(q => q.Timings).
                       ThenInclude(q => q.ManageTime).OrderBy(q => q.DateEnd).
                       ThenBy(q => q.Olaviat).ThenBy(q => q.Timings.SingleOrDefault().ManageTimeId).ToList();
                return Json(res);
            }
            //checkbox
            if (arrCatId.Length > 0)
            {
                var res = _db.Tasks.Where(q => q.IsCheck == false && arrCatId.Contains(q.CatId.ToString())).
                       Include(q => q.Cat).Include(q => q.Timings).
                       ThenInclude(q => q.ManageTime).OrderBy(q => q.DateEnd).
                       ThenBy(q => q.Olaviat).ThenBy(q => q.Timings.SingleOrDefault().ManageTimeId).ToList();
                return Json(res);
            }
            //search
            if (stringSerach != null)
            {
                var res = _db.Tasks.Where(q => q.Name.Contains(stringSerach)).
                   Include(q => q.Cat).Include(q => q.Timings).
                   ThenInclude(q => q.ManageTime).OrderBy(q => q.DateEnd).
                   ThenBy(q => q.Olaviat).ThenBy(q => q.Timings.SingleOrDefault().ManageTimeId).ToList();
                return Json(res);
            }
            else
            {
                var res = _db.Tasks.Where(q => q.IsCheck == false).
                    Include(q => q.Cat).Include(q => q.Timings).
                    ThenInclude(q => q.ManageTime).OrderBy(q => q.DateEnd).
                    ThenBy(q => q.Olaviat).ThenBy(q => q.Timings.SingleOrDefault().ManageTimeId).ToList();
                return Json(res);
            }
        }
        [HttpPost]
        public IActionResult ListTaskMonth(string xxx)
        {
            var res = _db.Tasks.Where(q => q.IsCheck == false && q.DateEnd.Substring(0, 6) == xxx).
               Include(q => q.Cat).Include(q => q.Timings).
               ThenInclude(q => q.ManageTime).OrderBy(q => q.DateEnd).
               ThenBy(q => q.Olaviat).ThenBy(q => q.Timings.SingleOrDefault().ManageTimeId).ToList();
            return Json(res);
        }
        //انتقال تسک ها ی گذشته به تاریخ امروز
        public IActionResult UpdateToToday()
        {
            string today = Utility.shamsi_date().ConvertDateToSqlFormat();
            string query = @"
    update  [5069_ManageYourSelf].[5069_Esmaeili].Task
  set DateEnd=@today
  where DateEnd<@today and IsCheck=0
";
            var count = 0;
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                count = DB.Execute(query, new { today = today });
            }
            return Json(count);

        }

        #region Task Inset Update
        public IActionResult EditTask(int TaskId)
        {
            Models.ViewModels.Task.vmTask T = new Models.ViewModels.Task.vmTask();
            T.lstCat = _db.Cats.Where(q => q.Code == 2).OrderBy(q => q.Order).ToList();
            T.Task = _db.Tasks.Include(q => q.Cat).Include(q => q.Timings).ThenInclude(q => q.ManageTime).SingleOrDefault(q => q.TaskId == TaskId);

            DateTime date = DateTime.Now;
            T.Hour = date.Hour;
            T.Minute = date.Minute;
            string CurrentDate = Utility.shamsi_date().ConvertDateToSqlFormat();

            T.Task = _db.Tasks.Include(q => q.Timings).ThenInclude(q => q.ManageTime).SingleOrDefault(q => q.TaskId == TaskId);
            T.lstManageTime = _db.ManageTimes.ToList();
            T.Timing = _db.Timings.SingleOrDefault(q => q.TaskId == TaskId);

            return Json(T);
        }
        public IActionResult UpdateTask(Models.ViewModels.Task.vmTask NewTask)
        {
            if (NewTask.TaskId == 0)
            {
                return Json("تسک مشخصی پیدا نشد");
            }
            string[] parts = new string[0];
            if (NewTask.Name != null)
            {
                parts = NewTask.Name.Split(new string[] { "@@" }, StringSplitOptions.None);

            }
            if (parts.Length > 1)
            {
                int TaskId = NewTask.TaskId;
                var OldTask = _db.Tasks.SingleOrDefault(q => q.TaskId == TaskId);

                for (int i = 0; i < parts.Length; i++)
                {


                    DomainClass.DomainClass.Task newTask = new DomainClass.DomainClass.Task();
                    newTask.IsActive = (NewTask.IsActive == null ? OldTask.IsActive : NewTask.IsActive);
                    newTask.IsCheck = (NewTask.IsCheck == null ? OldTask.IsCheck : NewTask.IsCheck);
                    newTask.DateStart = (NewTask.DateStart == null ? OldTask.DateStart : Utility.ConvertDateToSqlFormat(NewTask.DateStart));
                    newTask.DateEnd = (NewTask.DateEnd == null ? OldTask.DateEnd : Utility.ConvertDateToSqlFormat(NewTask.DateEnd));
                    newTask.DarsadPishraft = (NewTask.DarsadPishraft == null ? OldTask.DarsadPishraft : NewTask.DarsadPishraft);
                    newTask.Name = parts[i];
                    newTask.Olaviat = (NewTask.Olaviat == null ? OldTask.Olaviat : NewTask.Olaviat);
                    newTask.Rate = (NewTask.Rate == null ? OldTask.Rate : NewTask.Rate);
                    newTask.CatId = (NewTask.CatId == null ? OldTask.CatId : NewTask.CatId);
                    newTask.UserId = 1;
                    _db.Tasks.Add(newTask);

                    if (NewTask.IsTime == true)
                    {
                        var oldTimings = _db.Timings.SingleOrDefault(q => q.TaskId == TaskId);
                        if (oldTimings == null)
                        {
                            DomainClass.DomainClass.Timing m = new DomainClass.DomainClass.Timing();
                            m.TaskId = TaskId;
                            m.ManageTimeId = NewTask.ManageTimeId;
                            _db.Timings.Add(m);
                        }
                        else
                        {

                            oldTimings.ManageTimeId = NewTask.ManageTimeId;
                        }
                    }

                    _db.SaveChanges();
                }
                _db.Tasks.Remove(OldTask);
                _db.SaveChanges();

            }
            else
            {
                int TaskId = NewTask.TaskId;
                var OldTask = _db.Tasks.SingleOrDefault(q => q.TaskId == TaskId);
                OldTask.IsActive = (NewTask.IsActive == null ? OldTask.IsActive : NewTask.IsActive);
                OldTask.IsCheck = (NewTask.IsCheck == null ? OldTask.IsCheck : NewTask.IsCheck);
                OldTask.DateStart = (NewTask.DateStart == null ? OldTask.DateStart : Utility.ConvertDateToSqlFormat(NewTask.DateStart));
                OldTask.DateEnd = (NewTask.DateEnd == null ? OldTask.DateEnd : Utility.ConvertDateToSqlFormat(NewTask.DateEnd));
                OldTask.DarsadPishraft = (NewTask.DarsadPishraft == null ? OldTask.DarsadPishraft : NewTask.DarsadPishraft);
                OldTask.Name = (NewTask.Name == null ? OldTask.Name : NewTask.Name);
                OldTask.Olaviat = (NewTask.Olaviat == null ? OldTask.Olaviat : NewTask.Olaviat);
                OldTask.Rate = (NewTask.Rate == null ? OldTask.Rate : NewTask.Rate);
                OldTask.CatId = (NewTask.CatId == null ? OldTask.CatId : NewTask.CatId);

                if (NewTask.IsTime == true)
                {
                    var oldTimings = _db.Timings.SingleOrDefault(q => q.TaskId == TaskId);
                    if (oldTimings == null)
                    {
                        DomainClass.DomainClass.Timing m = new DomainClass.DomainClass.Timing();
                        m.TaskId = TaskId;
                        m.ManageTimeId = NewTask.ManageTimeId;
                        _db.Timings.Add(m);
                    }
                    else
                    {

                        oldTimings.ManageTimeId = NewTask.ManageTimeId;
                    }
                }
                _db.SaveChanges();

            }



            return Json(true);

        }

        public IActionResult CreateTask()
        {
            Models.ViewModels.Task.vmTask T = new Models.ViewModels.Task.vmTask();

            T.lstCat = _db.Cats.Where(q => q.Code == 2).OrderBy(q => q.Order).ToList();


            DateTime date = DateTime.Now;
            T.Hour = date.Hour;
            T.Minute = date.Minute;
            string CurrentDate = Utility.shamsi_date().ConvertDateToSqlFormat();


            T.lstManageTime = _db.ManageTimes.ToList();

            return Json(T);
        }

        public IActionResult CreateTaskPost(Models.ViewModels.Task.vmTask T)
        {
            string[] parts = T.Name.Split(new string[] { "@@" }, StringSplitOptions.None);
            if (parts.Length > 1)
            {
                for (int i = 0; i < parts.Length; i++)
                {
                    DomainClass.DomainClass.Task NewTask = new DomainClass.DomainClass.Task();
                    NewTask.Name = parts[i];
                    NewTask.Olaviat = T.Olaviat;
                    NewTask.Rate = T.Rate;
                    NewTask.DarsadPishraft = 0;
                    NewTask.DateStart = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                    NewTask.DateEnd = Utility.ConvertDateToSqlFormat(T.DateEnd);
                    NewTask.IsActive = true;
                    NewTask.IsCheck = false;
                    NewTask.UserId = UserId;
                    NewTask.CatId = T.CatId;
                    _db.Tasks.Add(NewTask);

                    _db.SaveChanges();

                    if (T.IsTime == true)
                    {
                        var oldTimings = _db.Timings.SingleOrDefault(q => q.TaskId == NewTask.TaskId);
                        if (oldTimings == null)
                        {
                            DomainClass.DomainClass.Timing m = new DomainClass.DomainClass.Timing();
                            m.TaskId = NewTask.TaskId;
                            m.ManageTimeId = T.ManageTimeId;
                            _db.Timings.Add(m);
                        }
                        else
                        {

                            oldTimings.ManageTimeId = T.ManageTimeId;
                        }
                    }

                    _db.SaveChanges();

                }

            }
            else
            {

                T.DarsadPishraft = 0;
                T.DateStart = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                T.DateEnd = Utility.ConvertDateToSqlFormat(T.DateEnd);
                T.IsActive = true;
                T.IsCheck = false;
                T.UserId = UserId;
                T.Olaviat = T.Olaviat;
                T.Rate = T.Rate;
                T.CatId = T.CatId;
                _db.Tasks.Add(T);

                _db.SaveChanges();

                if (T.IsTime == true)
                {
                    var oldTimings = _db.Timings.SingleOrDefault(q => q.TaskId == T.TaskId);
                    if (oldTimings == null)
                    {
                        DomainClass.DomainClass.Timing m = new DomainClass.DomainClass.Timing();
                        m.TaskId = T.TaskId;
                        m.ManageTimeId = T.ManageTimeId;
                        _db.Timings.Add(m);
                    }
                    else
                    {

                        oldTimings.ManageTimeId = T.ManageTimeId;
                    }
                }

                _db.SaveChanges();

            }





            return Json(true);
        }

        public ActionResult RemoveAllTask(int[] TasKIds)
        {

            _db.Tasks.RemoveRange(_db.Tasks.Where(x => TasKIds.Contains(x.TaskId)));
            var res = _db.SaveChanges();
            return Json(res);
        }

        #endregion
        public ActionResult TimingTask(int TaskId)
        {
            Models.ViewModels.Task.vmTask T = new Models.ViewModels.Task.vmTask();
            DateTime date = DateTime.Now;
            T.Hour = date.Hour;
            T.Minute = date.Minute;
            string CurrentDate = Utility.shamsi_date().ConvertDateToSqlFormat();

            T.Task = _db.Tasks.Include(q => q.Timings).ThenInclude(q => q.ManageTime).SingleOrDefault(q => q.TaskId == TaskId);
            T.lstManageTime = _db.ManageTimes.ToList();
            T.Timing = _db.Timings.SingleOrDefault(q => q.TaskId == TaskId);

            return Json(T);
        }


        [HttpPost]
        public ActionResult ListTimingForListTask()
        {
            List<Models.ViewModels.Task.vmTask> T = new List<Models.ViewModels.Task.vmTask>();

            try
            {

                string query = @"
select * 
from [5069_ManageYourSelf].[5069_Esmaeili].Timing  inner join [5069_ManageYourSelf].[5069_Esmaeili].Task 
on [5069_ManageYourSelf].[5069_Esmaeili].Timing.TaskId=Task.TaskId
inner join [5069_ManageYourSelf].[5069_Esmaeili].ManageTime
on Timing.ManageTimeId=ManageTime.ManageTimeId
where IsCheck=0 and UserId=@UserId
order by DateEnd,Value,Olaviat
";

                using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
                {

                    // count = DB.Execute(query, new { UserId = 1 });
                    T = DB.Query<Models.ViewModels.Task.vmTask>(query, new { UserId = 1 }).ToList();
                }





                return Json(T);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.InnerException.Message);


            }


            //return Json(Error, JsonRequestBehavior.AllowGet);
            // return PartialView(V);
        }

        public IActionResult UpdateTiming(int TaskId, int ManageTimeId)
        {
            var Timings = _db.Timings.SingleOrDefault(q => q.TaskId == TaskId);
            if (Timings == null)
            {
                DomainClass.DomainClass.Timing t = new DomainClass.DomainClass.Timing();
                t.TaskId = TaskId;
                t.ManageTimeId = ManageTimeId;
                _db.Timings.Add(t);
            }
            else
            {
                Timings.ManageTimeId = ManageTimeId;
            }

            _db.SaveChanges();
            return Json(true);
        }
        public IActionResult removeTimeTask(int TaskId)
        {
            var Timings = _db.Timings.SingleOrDefault(q => q.TaskId == TaskId);
            _db.Timings.Remove(Timings);
            _db.SaveChanges();
            return Json(true);
        }

        public ActionResult ListTaskAnjamShode(string date)
        {
            List<Models.ViewModels.Task.vmTask> lstTask = new List<Models.ViewModels.Task.vmTask>();
            Models.ViewModels.Task.vmTaskList vmTaskList = new Models.ViewModels.Task.vmTaskList();
            try
            {
                int UserId = 1;
                string query = @"
--declare   @date nvarchar(10)
--declare @UserId nvarchar(10)
--set @date=cast(13990705 as nvarchar)
--set @UserId=1
select * from 
(
select 
Task.TaskId
,Task.Name
,Task.Rate
,Task.DateStart
,Task.DateEnd
,isnull(Task.Olaviat,0) Olaviat
,isnull(Cat.CatId,0) CatId
,isnull(Cat.Title,N'بدون عنوان') Title
from [5069_ManageYourSelf].[5069_Esmaeili].Task left join [5069_ManageYourSelf].[5069_Esmaeili].Cat 
on task.CatId=Cat.CatId
where Task.IsCheck=1 
and Task.IsActive=1
and Task.UserId=@UserId
and Task.DateEnd=@date

union All


select   RoutineJob.RoutineJobId as taskId,Job,[Rate],[Date],[Date],[Order],0 as CatId,N'تکراری' as Title
from [5069_ManageYourSelf].[5069_Esmaeili].RoutineJob inner join [5069_ManageYourSelf].[5069_Esmaeili].RoutineJobHa
on RoutineJob.RoutineJobId=RoutineJobHa.RoutineJobId 
where 
 UserId=@UserId
and [Date]=@date
) as tbl
order by Title,Rate desc
";

                using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
                {

                    lstTask = DB.Query<Models.ViewModels.Task.vmTask>(query, new { date = date, UserId = UserId }).ToList();
                    vmTaskList.lstvmTask = lstTask;

                }




                query = @"
select top 30
DateEnd,sum(Rate)  as Rate
from
(
select  
DateEnd,Rate
from [5069_ManageYourSelf].[5069_Esmaeili].Task
where IsCheck=1
and IsActive=1
and UserId=@UserId
union All
select  [Date],[Rate]
from [5069_ManageYourSelf].[5069_Esmaeili].RoutineJob inner join [5069_ManageYourSelf].[5069_Esmaeili].RoutineJobHa
on RoutineJob.RoutineJobId=RoutineJobHa.RoutineJobId 
where 
UserId=@UserId
) as tbl
group by DateEnd
order by DateEnd desc
";

                using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
                {

                    var res = DB.Query<Models.ViewModels.Task.vmTask>(query, new { UserId = UserId }).ToList();
                    vmTaskList.lstvmTask2 = res;
                }





                return Json(vmTaskList);


            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.ToString());
            }
        }
        public IActionResult GetDateEvent(string date)
        {

            return Json(_db.Tasks.Include(q => q.Cat).Include(q => q.Timings).
                ThenInclude(q => q.ManageTime).Where(q => q.DateEnd == date).ToList());
        }

       
        public IActionResult ExcelCreate(string DateStart,string DateEnd,int[] rdbSport) {
            DateEnd = DateEnd.ConvertDateToSqlFormat();
            DateStart = DateStart.ConvertDateToSqlFormat();
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("فرهاد اسماعیلی");
                worksheet.RightToLeft = true;

                worksheet.Cell(1, 1).Value = "نام";
                worksheet.Cell(1, 2).Value = "فرهاد";
                worksheet.Cell(1, 3).Value = "نام خانوادگی";
                worksheet.Cell(1, 4).Value = "اسماعیلی";


                var currentRow = 3;

                worksheet.Column(3).Width = 200;
                worksheet.Column(2).Width = 10;
                worksheet.Column(1).Width = 20;
                worksheet.Range(1,1,1,4).Style.Fill.BackgroundColor = XLColor.Yellow;
                worksheet.Cell(currentRow, 1).Value = "DateEnd";
                worksheet.Cell(currentRow, 2).Value = "Category";
                worksheet.Cell(currentRow, 3).Value = "عنوان";
                worksheet.Cell(currentRow, 4).Value = "زمان";

                var lstTask = _db.Tasks.Include(q=>q.Cat).Where(q => (q.DateEnd.CompareTo(DateStart) >= 0 && q.DateEnd.CompareTo(DateEnd) <= 0)  && rdbSport.Contains((int)q.CatId)).ToList();

                foreach (var user in lstTask)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = user.DateEnd.ConvertDateToDateFormat();
                    worksheet.Cell(currentRow, 2).Value = user.Cat.Title;
                    worksheet.Cell(currentRow, 3).Value = user.Name;
                    worksheet.Cell(currentRow, 4).Value = 1;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "users.xlsx");





                }
            }
        }
        public IActionResult ListTaskTomarow(string date)
        {
            var res = _db.Tasks.Include(q=>q.Cat).Where(q => q.DateEnd == date && q.IsCheck==false).OrderBy(q=>q.Olaviat).ToList();
            return Json(res);
        }
    }

}
