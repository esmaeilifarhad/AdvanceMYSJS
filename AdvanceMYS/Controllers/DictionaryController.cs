﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{
    public class DictionaryController : Controller
    {

        private readonly _Context _db;

        int _userId = 1;
        Models.ADO.UIDSConnection U = new Models.ADO.UIDSConnection();
        public DictionaryController(_Context db)
        {
            _db = db;


        }

        public IActionResult ListLevel()
        {
            List<Models.ViewModels.Dictionary.VMDictionary> lstVMDictionary = new List<Models.ViewModels.Dictionary.VMDictionary>();
            try
            {

                string query = @"
select level NameLevel ,count(*) as  CountLevel
from [5069_ManageYourSelf].[5069_Esmaeili].[dic_tbl]
where IsArchieve=0
group by level
";

                using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
                {

                    // count = DB.Execute(query, new { UserId = 1 });
                    lstVMDictionary = DB.Query<Models.ViewModels.Dictionary.VMDictionary>(query).ToList();
                }


                return Json(lstVMDictionary);


                // return Json(T);
            }
            catch (Exception ex)
            {

                throw new ArgumentException(ex.InnerException.Message);


            }


        }
        public IActionResult ListWordLevel(int level)
        {
            if (level == 80)
            {
                var today = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                var resDic = _db.DicTbls.Include(q => q.ExampleTbls).
                Where(q => q.LastStatus == false).
                OrderBy(q => q.DateRefresh).
                ThenBy(q => q.Time).
                Take(1000).
                ToList().
                AsEnumerable().Where(
                    q => (q.DateRefresh != today) ||
                (q.DateRefresh == today && (int.Parse(DateTime.Now.ToString("HH:mm:ss").Split(":")[0]) - int.Parse(q.Time.Split(":")[0])) > 2) ||
                 (q.LastIsTrueFalse == false)
                ).ToList();
                return Json(resDic);
            }
            else
            {
                try
                {
                    var resDic = _db.DicTbls.Include(q => q.ExampleTbls).
                    Where(q => q.Level == level && q.IsArchieve == false).
                    OrderBy(q => q.DateRefresh).
                    ThenBy(q => q.Time).
                    Take(3).
                    ToList();
                    return Json(resDic);
                }
                catch (Exception ex)
                {

                    throw;
                }

            }
        }
        public IActionResult FindExample(int exampleId)
        {
            return Json(_db.ExampleTbls.SingleOrDefault(q => q.Id == exampleId));
        }
        public IActionResult TranslateWordByWord(int exampleId)
        {
            var example = _db.ExampleTbls.SingleOrDefault(q => q.Id == exampleId);
            var str = example.Example.Replace(".", " ");
            str = str.Replace("*", " ");
            //str = str.Replace(",", " ");
            str = str.Replace("\n", " ");


            var splitecample = str.Split(" ");
             
            var splitecamples = splitecample.Distinct();
            List<DomainClass.DomainClass.DicTbl> lstWord = new List<DomainClass.DomainClass.DicTbl>();
            foreach (var worlSplit in splitecamples)
            {
               
                if (worlSplit.Length < 2) continue;
                if (worlSplit == "") continue;
                if (!Regex.IsMatch(worlSplit, "^[a-zA-Z]*$")) continue;

                    var findWord = _db.DicTbls.Where(q => q.Eng == worlSplit.Trim() ||
                q.Eng == worlSplit.Trim() + "s" ||
                 q.Eng == worlSplit.Trim() + "ly" ||
                  q.Eng == worlSplit.Trim() + "al" ||
                   q.Eng + "ly" == worlSplit.Trim() ||
                  q.Eng + "al" == worlSplit.Trim() ||
                   q.Eng + "s" == worlSplit.Trim() ||
                    q.Eng + "es" == worlSplit.Trim() ||
                      q.Eng + "ing" == worlSplit.Trim() ||
                        q.Eng + "ion" == worlSplit.Trim() ||
                 q.Eng == worlSplit.Trim() + "*" ||
                  q.Eng == worlSplit.Trim() + "," ||
                   q.Eng == worlSplit.Trim() + "." ||
                q.Eng == worlSplit.Trim() + "es" ||
                q.Eng == worlSplit.Trim().Remove(worlSplit.Trim().Length - 1, 1) + "es" ||
                 q.Eng == worlSplit.Trim().Remove(worlSplit.Trim().Length - 1, 1) + "ing" ||
                 q.Eng == worlSplit.Trim() + "ing" ||
                  q.Eng == worlSplit.Trim().Remove(worlSplit.Trim().Length - 1, 1) + "ion" ||
                q.Eng == worlSplit.Trim() + "'s" 
               
                );
                if (findWord != null)
                {
                    foreach (var item in findWord)
                    {
                        var res = lstWord.Find(q => q.Eng == item.Eng);
                        if (res == null)
                            lstWord.Add(item);
                    }
                   
                }
            }
            return Json(lstWord);
        }
        public IActionResult FindWord(int wordId)
        {
            return Json(_db.DicTbls.SingleOrDefault(q => q.Id == wordId));
        }
        public IActionResult UpdateDicWord(Models.ViewModels.Dictionary.VMDictionary word)
        {
            //update
            if (word.Id > 0)
            {
                var oldword = _db.DicTbls.SingleOrDefault(q => q.Id == word.Id);
                //کاهش سطح
                if (word.UpOrDown == "true")
                {
                    //باید آرشیو شود
                    if (oldword.Level == 1)
                    {
                        oldword.IsArchieve = true;

                    }
                    else if (oldword.Level > 1)
                    {
                        oldword.Level -= 1;
                    }
                    oldword.SuccessCount += 1;

                    oldword.DateRefresh = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                    oldword.Time = DateTime.Now.ToString("HH:mm:ss");
                    oldword.DateRefreshM = DateTime.Now;
                    oldword.CreateDateM = (oldword.CreateDateM == null ? DateTime.Now : oldword.CreateDateM);
                    if (oldword.Level < 5)
                    {
                        oldword.LastStatus = true;
                    }
                    oldword.LastIsTrueFalse = true;
                }
                //افزایش سطح
                else if (word.UpOrDown == "false")
                {
                    //باید از آرشیو برداشته شود
                    if (oldword.Level == 1 && oldword.IsArchieve == true)
                    {
                        oldword.IsArchieve = false;

                    }
                    else if (oldword.Level < 10)
                    {
                        oldword.Level += 1;
                    }
                    oldword.UnSuccessCount += 1;

                    oldword.DateRefresh = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                    oldword.Time = DateTime.Now.ToString("HH:mm:ss");
                    oldword.DateRefreshM = DateTime.Now;
                    oldword.LastStatus = false;
                    oldword.LastIsTrueFalse = false;

                }
                //Update Word
                else
                {
                    oldword.Per = (word.Per == null ? oldword.Per : word.Per);
                    oldword.Eng = (word.Eng == null ? oldword.Eng : word.Eng);
                }
                oldword.CreateDateM = (oldword.CreateDateM == null ? DateTime.Now : oldword.CreateDateM);


                // AddExamples(oldword);

                var res = _db.SaveChanges();
                return Json(oldword);
            }
            //insert
            else
            {
                DomainClass.DomainClass.DicTbl D = new DomainClass.DomainClass.DicTbl();
                D.Level = 10;
                D.Per = word.Per;
                D.Eng = word.Eng;
                D.DateRefresh = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                D.DateS = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                D.Time = DateTime.Now.ToString("HH:mm:ss");
                D.DateRefreshM = DateTime.Now;
                D.CreateDateM = DateTime.Now;
                D.SuccessCount = 0;
                D.UnSuccessCount = 0;
                D.IsArchieve = false;
                D.UserId = _userId;
                _db.DicTbls.Add(D);


                if (_db.SaveChanges() > 0)
                {
                    // AddExamples(D);
                    return Json("با موفقیت ثبت شد");
                }
                return Json("خطایی در ثبت رخ داده است");
            }
        }
        public IActionResult SearchOldWord(string str)
        {
            List<DomainClass.DomainClass.DicTbl> lstWord = new List<DomainClass.DomainClass.DicTbl>();
            string query = @"
select * from [5069_ManageYourSelf].[5069_Esmaeili].[dic_tbl]
where eng like '%" + str + "%'";
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lstWord = DB.Query<DomainClass.DomainClass.DicTbl>(query).ToList();
            }
            return Json(lstWord);
        }
        public IActionResult AddExamples(string eng)
        {

            var oldWord = _db.DicTbls.FirstOrDefault(q => q.Eng == eng);
            //var oldExamples = _db.ExampleTbls.Where(q => q.IdDicTbl == word.Id);

            List<DomainClass.DomainClass.ExampleTbl> lstExample = new List<DomainClass.DomainClass.ExampleTbl>();

            string query = @"
select [id]
      ,[id_dic_tbl] as IdDicTbl
      ,[example]
      ,[GetFromExample] from [5069_ManageYourSelf].[5069_Esmaeili].[example_tbl]
where example like '% " + eng + "%'";
            using (IDbConnection DB = new SqlConnection(Models.Connection.Connection._ConnectionString))
            {

                lstExample = DB.Query<DomainClass.DomainClass.ExampleTbl>(query).ToList();
            }

            List<DomainClass.DomainClass.ExampleTbl> lst = new List<DomainClass.DomainClass.ExampleTbl>();
            foreach (var item in lstExample)
            {
                if (item.IdDicTbl == oldWord.Id)
                {
                    //Duplicate Examples

                }
                else
                {
                    lst.Add(item);
                }
            }

            /*
            foreach (var item in lstExample)
            {
                bool isDuplicate = false;
                //if (oldExamples != null)
                //{
                //    var res = oldExamples.FirstOrDefault(q => q.Example == item.Example || q.GetFromExample == item.Id || q.IdDicTbl==item.IdDicTbl);
                //    if (res != null)
                //    {
                //        isDuplicate = true;
                //    }
                //}
           if (item.GetFromExample != 0)
           {

               isDuplicate = true;

           }
           else
           {
               // isDuplicate = false;
           }

                if (isDuplicate == false)
                {
                    var old = _db.ExampleTbls.SingleOrDefault(q => q.Id == item.Id);
                    DomainClass.DomainClass.ExampleTbl newExample = new DomainClass.DomainClass.ExampleTbl()
                    {
                        Example = _db.DicTbls.SingleOrDefault(q => q.Id == old.IdDicTbl).Eng + " _Added : " + item.Example,
                        //IdDicTbl = word.Id,
                        GetFromExample = item.Id
                    };
                    _db.ExampleTbls.Add(newExample);

                }
            }
            */
            // _db.SaveChanges();

            return Json(lst);
        }

        public IActionResult CreateUpdateExample(DomainClass.DomainClass.ExampleTbl exampleNew)
        {
            string[] parts = new string[0];
            parts = exampleNew.Example.Split(new string[] { "@@" }, StringSplitOptions.None);

            //Update
            if (exampleNew.Id > 0)
            {
                var oldExample = _db.ExampleTbls.SingleOrDefault(q => q.Id == exampleNew.Id);

                if (parts.Length > 1)
                {
                    for (int i = 0; i < parts.Length; i++)
                    {
                        DomainClass.DomainClass.ExampleTbl e = new DomainClass.DomainClass.ExampleTbl();
                        e.IdDicTbl = exampleNew.IdDicTbl;
                        e.Example = parts[i];
                        _db.ExampleTbls.Add(e);
                        _db.SaveChanges();
                    }
                    _db.ExampleTbls.Remove(oldExample);
                    _db.SaveChanges();
                    return Json("با موفقیت ویرایش شد");
                }
                else
                {
                    oldExample.Example = exampleNew.Example;
                    _db.SaveChanges();
                    return Json("با موفقیت ویرایش شد");
                }


            }
            //insert
            else
            {

                if (parts.Length > 1)
                {
                    for (int i = 0; i < parts.Length; i++)
                    {
                        DomainClass.DomainClass.ExampleTbl e = new DomainClass.DomainClass.ExampleTbl();
                        e.IdDicTbl = exampleNew.IdDicTbl;
                        e.Example = parts[i];
                        _db.ExampleTbls.Add(e);
                        _db.SaveChanges();
                    }
                }
                else
                {
                    DomainClass.DomainClass.ExampleTbl e = new DomainClass.DomainClass.ExampleTbl();
                    e.IdDicTbl = exampleNew.IdDicTbl;
                    e.Example = exampleNew.Example;
                    _db.ExampleTbls.Add(e);
                    _db.SaveChanges();
                }
                return Json("با موفقیت ثبت شد");
            }

        }
        public IActionResult DeleteExample(int Id)
        {
            var res = _db.ExampleTbls.SingleOrDefault(q => q.Id == Id);
            _db.ExampleTbls.Remove(res);
            if (_db.SaveChanges() > 0)
                return Json("با موفقیت حذف شد");
            return Json("خطا در حذف");
        }
        public IActionResult DeleteWord(int Id)
        {
            var res = _db.DicTbls.SingleOrDefault(q => q.Id == Id);
            _db.DicTbls.Remove(res);
            if (_db.SaveChanges() > 0)
                return Json("با موفقیت حذف شد");
            return Json("خطا در حذف");
        }

        public IActionResult SearchExample(string str)
        {

            List<Models.ViewModels.Dictionary.VMDictionary> lstV = new List<Models.ViewModels.Dictionary.VMDictionary>();
            DataTable DT = U.Select(@"
select 
d.id
,d.eng
,d.per
,d.level
,d.IsArchieve
,d.date_refresh
,d.date_s
,d.SuccessCount
,d.UnSuccessCount
from [5069_Esmaeili].[example_tbl] e inner join [5069_Esmaeili].[dic_tbl] d
on e.id_dic_tbl=d.id
where example like '%" + str + @"%' 
group by eng,d.id,d.per,d.level,d.IsArchieve,d.date_refresh,d.date_s,d.SuccessCount,d.UnSuccessCount,d.IsArchieve
");
            foreach (DataRow item in DT.Rows)
            {
                Models.ViewModels.Dictionary.VMDictionary V = new Models.ViewModels.Dictionary.VMDictionary();
                V.Id = int.Parse(item["id"].ToString());
                V.Eng = item["eng"].ToString();
                V.Per = item["per"].ToString();
                V.IsArchieve = (bool)item["IsArchieve"];
                V.Level = int.Parse(item["level"].ToString());
                V.DateRefresh = item["date_refresh"].ToString();
                V.DateS = item["date_s"].ToString();
                V.SuccessCount = int.Parse(item["SuccessCount"].ToString());
                V.UnSuccessCount = int.Parse(item["UnSuccessCount"].ToString());

                V.exampleTbls = _db.ExampleTbls.Where(q => q.IdDicTbl == V.Id && q.Example.Contains(str)).ToList();
                lstV.Add(V);
            }
            return Json(lstV);

        }
        public IActionResult SearchWord(string str)
        {


            return Json(_db.DicTbls.Include(q => q.ExampleTbls).Where(q => q.Eng.Contains(str)).ToList());
        }

    }

}

