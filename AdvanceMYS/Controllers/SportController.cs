using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using AdvanceMYS.Models.ViewModels.Sport;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    public class SportController : Controller
    {

        #region Initial
        private readonly _5069_ManageYourSelfContext DB;
            Models.ADO.UIDSConnection U = new Models.ADO.UIDSConnection();
        int UserId = 1;
            public SportController(_5069_ManageYourSelfContext db)
            {
            DB = db;
            }
            #endregion

            #region Sport
            // [Security.CustomAthorize(Roles = "Karbari")]

            public ActionResult MainSport()
            {
                return View();
            }
         
            [HttpPost]
            public ActionResult ListSportFilter(int _CatId)
            {
                List<VMSport> lstV = new List<VMSport>();

                var res = (from S in DB.Sports
                           join C in DB.Cats on S.CatId equals C.CatId
                           where C.Code == 1 && C.CatId == _CatId
                           select new { S.Date, S.SportId, S.Tedad, C.CatId, C.Title, S.Set }

                          ).OrderByDescending(q => q.Date);
                foreach (var item in res)
                {
                    VMSport V = new VMSport();
                    V.Tedad = item.Tedad;
                    V.Title = item.Title;
                    V.SportId = item.SportId;
                    V.Date = item.Date;
                    V.CatId = item.CatId;
                    V.Set = item.Set;
                    //  V.lstCat = DB.Cats.Where(q => q.Code == 1 && q.UserId == UserId).ToList();
                    lstV.Add(V);
                }
                return Json(lstV);
            }

            public ActionResult List()
            {
                List<VMSport> lstV = new List<VMSport>();

                var res = (from S in DB.Sports
                           join C in DB.Cats on S.CatId equals C.CatId
                           where C.Code == 1
                           select new { S.Date, S.SportId, S.Tedad, C.CatId, C.Title, S.Set }

                          ).OrderByDescending(q => q.Date);
                foreach (var item in res)
                {
                    VMSport V = new VMSport();
                    V.Tedad = item.Tedad;
                    V.Title = item.Title;
                    V.SportId = item.SportId;
                    V.Date = item.Date;
                    V.CatId = item.CatId;
                    V.Set = item.Set;
                    //  V.lstCat = DB.Cats.Where(q => q.Code == 1 && q.UserId == UserId).ToList();
                    lstV.Add(V);
                }
                return PartialView(lstV);
            }
            [HttpPost]
            public JsonResult Create(Models.Domain.Sport New, string StrTedad)
            {
                New.Date = New.Date.ConvertDateToSqlFormat();
                string result = "";
                int i = 1;
                try
                {
                    if (New.Tedad == 0)
                    {
                        string StrData = StrTedad.TrimEnd('-');
                        string[] Tedad = StrData.Split('-');
                        foreach (var item in Tedad)
                        {
                            New.Set = i;
                            New.Tedad = int.Parse(item);
                            DB.Sports.Add(New);
                            DB.SaveChanges();
                            i = i + 1;
                        }
                    }
                    else
                    {
                        DB.Sports.Add(New);
                        DB.SaveChanges();
                    }
                }
                catch (Exception ex)
                {

                    result = ex.ToString();
                }
                return Json(result);
            }
            [HttpPost]
            public JsonResult CreateNewSport(Models.Domain.Sport New)
            {

                New.Date = New.Date.ConvertDateToSqlFormat();
                List<Models.Domain.Sport> lstSport = DB.Sports.Where(q => q.CatId == New.CatId && q.Date == New.Date).ToList();
                int Set = 0;
                foreach (var item in lstSport)
                {
                    Set += 1;
                }
                New.Set = Set;
                string result = "";
                try
                {
                    DB.Sports.Add(New);
                    DB.SaveChanges();

                }
                catch (Exception ex)
                {

                    result = ex.ToString();
                }
                return Json(result);
            }
           
            [HttpGet]
            public ActionResult Edit(int Id)
            {
                var Old = DB.Sports.SingleOrDefault(q => q.SportId == Id);
                return PartialView(Old);
            }
            [HttpPost]
            public ActionResult Update(Models.Domain.Sport New)
            {
                var Old = DB.Sports.SingleOrDefault(q => q.SportId == New.SportId);
                Old.Date = New.Date;
                Old.Tedad = New.Tedad;
                Old.CatId = New.CatId;
                if (DB.SaveChanges() > 0)
                    return Json("با موفقیت ویرایش شد");
                else
                    return Json("خطا در ویرایش");
            }
            public ActionResult Delete(int Id)
            {
                bool result = false;
                var Old = DB.Sports.SingleOrDefault(q => q.SportId == Id);
                DB.Sports.Remove(Old);
                if (DB.SaveChanges() > 0)
                    result = true;
                return Json(result);
            }
            #endregion
  
        
    }
}
