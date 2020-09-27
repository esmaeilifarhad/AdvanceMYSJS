using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AdvanceMYS.Controllers
{
    public class TaskController : Controller
    {
        Models.Domain._5069_ManageYourSelfContext db = new Models.Domain._5069_ManageYourSelfContext();




        public IActionResult Index()
        {
            var res = db.Tasks.ToList();
            return Json(res);
        }
        public ActionResult ListTaskGeneral()
        {
            List<Models.Domain.Task> TaskList = new List<Models.Domain.Task>();

            try
            {
                Models.ViewModels.VM_Public V = new Models.ViewModels.VM_Public();
                List<Models.Domain.Cat> lstC = new List<Models.Domain.Cat>();

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

                    TaskList = DB.Query<Models.Domain.Task>(query).ToList();
                }
                //Models.DataLayer.Task t = new Models.DataLayer.Task();


                //              DataTable DT = U.Select(@"
                //select Tbl.CatId,isnull(Title,N'تعریف نشده') Title from [5069_ManageYourSelf].[5069_Esmaeili].Cat right join
                //(
                //select isnull(CatId,0) CatId 
                //from [5069_ManageYourSelf].[dbo].[Task] 
                //where IsActive=1 and IsCheck=0 and DateEnd=" + Utility.Utility.ConvertDateToSqlFormat(Utility.Utility.shamsi_date()) + @" and UserId=" + UserId + @"
                //group by CatId
                //) tbl
                //on Cat.CatId=tbl.CatId
                //order by [Order] asc
                //                          ");

                /*
                foreach (DataRow item in DT.Rows)
                {
                    Models.DomainModels.Cat C = new Models.DomainModels.Cat();
                    // V.Radif = int.Parse(item["Radif"].ToString());
                    C.CatId = int.Parse(item["CatId"].ToString());
                    C.Title = item["Title"].ToString();
                    lstC.Add(C);
                }
                */
                /*
                V.ListCat = lstC;
                string CurrentDate = Utility.Utility.ConvertDateToSqlFormat(Utility.Utility.shamsi_date());
                var lstTask = DB.Tasks
                     .Where(q => q.IsActive == true && q.IsCheck == false && q.UserId == UserId && q.DateEnd == CurrentDate)
                     .OrderBy(q => q.DateEnd)
                     .ThenBy(q => q.Olaviat).ToList();
                List<ViewModels.TaskVM> lstTaskVM = new List<ViewModels.TaskVM>();
                foreach (var item in lstTask)
                {
                    ViewModels.TaskVM T = new ViewModels.TaskVM();
                    T.Olaviat = item.Olaviat;
                    T.TaskId = item.TaskId;
                    T.Name = item.Name;
                    T.CatId = item.CatId;

                    if (DB.Timings.SingleOrDefault(q => q.TaskId == T.TaskId) != null)
                        T.Label = DB.Timings.SingleOrDefault(q => q.TaskId == T.TaskId).ManageTime.Label;
                    else
                        T.Label = "";
                    lstTaskVM.Add(T);
                }
                V.ListTask = lstTaskVM;

                var ListData = from T in DB.Timings
                               join MT in DB.ManageTimes on T.ManageTimeId equals MT.ManageTimeId
                               select new { T.TaskId, MT.Label };

                return PartialView(V);
                */
            }
            catch (Exception ex)
            {
                //Error.message = ex.InnerException.Message;
                //Error.result = false;
                ////throw new ArgumentException(ex.InnerException.Message);
                //return Json(Error, JsonRequestBehavior.AllowGet);

            }

            return View();
        }
        public ActionResult ListTask()
        {
            var res = db.Tasks.Where(q => q.IsCheck == false).Include(q => q.Cat).Include(q => q.Timings).ThenInclude(q => q.ManageTime).ToList();
            return Json(res);
        }

    }
}
