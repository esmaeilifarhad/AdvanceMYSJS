using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{
   
    public class ReportController : Controller
    {
        private readonly _Context _db;
        public ReportController(_Context db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }
        #region Chart Dictionary
        public IActionResult ChartDicLevel()
        {
            List<DictionaryVM> lst = new List<DictionaryVM>();
            string query = @"

  SELECT level as label,count(*) y
  FROM [5069_ManageYourSelf].[5069_Esmaeili].[dic_tbl]
  where  IsArchieve=0
  group by level
";
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lst = DB.Query<DictionaryVM>(query).ToList();
            }

            return Json(lst);
        }
        public IActionResult ChartDicLevelPie()
        {
            List<DictionaryVM> lst = new List<DictionaryVM>();
            string query = @"
SELECT case IsArchieve when 0 then N'فعال' else N'آرشیو' end  label,count(*) y
  FROM [5069_ManageYourSelf].[5069_Esmaeili].[dic_tbl]
  group by IsArchieve";
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lst = DB.Query<DictionaryVM>(query).ToList();
            }

            return Json(lst);
        }
        #endregion
        #region Karjard
        public IActionResult ChartKarKard(string Date="139910")
        {
            List<DictionaryVM> lst = new List<DictionaryVM>();
            string query = @"

select (select top 1 Name from [5069_ManageYourSelf].[5069_Esmaeili].Job where JobId=karkard.JobId) label,sum(SpendTimeMinute)/(60*1) y 
from [5069_ManageYourSelf].[5069_Esmaeili].karkard
where Left(DayDate,6)=" + Date + @"
group by JobId
";
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lst = DB.Query<DictionaryVM>(query).ToList();
            }

            return Json(lst);
        }


        public IActionResult LineChartKarKard(string date)
        {
            List<DictionaryVM> lst = new List<DictionaryVM>();
            string query = @"
select DayDate label,sum(SpendTimeMinute)/60 y 
from karkard
where DayDate>"+ date + @"
group by DayDate
order by DayDate
";
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lst = DB.Query<DictionaryVM>(query).ToList();
            }

            return Json(lst);
        }
        #endregion
    }
    public class DictionaryVM
    {
        public int y { get; set; }
        public string label { get; set; }
    }
    /*
     select Left(DayDate,6) Mounth,sum(SpendTimeMinute)/(60*60) sumSpendTimeMinute
from karkard
group by Left(DayDate,6)

select * from Job inner join
(
select Left(DayDate,6) DayDate,JobId,sum(SpendTimeMinute)/(60*60) sumSpendTimeMinute
from KarKard
group by Left(DayDate,6),JobId
--order by Left(DayDate,6)
) tbl
on Job.JobId=tbl.JobId
     */
}
