using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Controllers
{
    public class BookController : Controller
    {
     
  
        Models.ADO.UIDSConnection U = new Models.ADO.UIDSConnection();
        private readonly _Context DB;
        int UserId = 1;
        public BookController(_Context db)
        {
            DB = db;
        }
        // GET: Book
        public IActionResult GetBook()
        {
            //https://www.entityframeworktutorial.net/efcore/working-with-stored-procedure-in-ef-core.aspx
            var Books = DB.Books.FromSqlRaw(@"exec [5069_ManageYourSelf].[5069_Esmaeili].findBookDsc " + UserId + " ").ToList();
            return Json(Books);
            //----Before method
            /*
            DataTable DT = U.Select(@"exec [5069_ManageYourSelf].[5069_Esmaeili].findBookDsc " + UserId + " ");
            if (DT == null)
                return Json("موردی یافت نشد");
            DomainClass.DomainClass.Book B = new DomainClass.DomainClass.Book();
            foreach (DataRow item in DT.Rows)
            {
                DomainClass.DomainClass.Cat C = new DomainClass.DomainClass.Cat();
                B.Dsc = item["dsc"].ToString();
                B.BookId = int.Parse(item["BookId"].ToString());
                if (item["RepeatedNumber"].ToString() == "")
                {
                    B.RepeatedNumber = 0;
                }
                else
                {
                    B.RepeatedNumber = int.Parse(item["RepeatedNumber"].ToString());
                }
                B.Date = item["date"].ToString();
                B.Time = item["time"].ToString();
            }
            return Json(B);
            */
        }
        public ActionResult GetBooks()
        {
            var books = DB.Books.OrderBy(q => q.RepeatedNumber).Select(q => new { q.RepeatCount, q.RepeatedNumber, q.BookId, q.Date, q.Dsc }).ToList();
            return Json(books);
        }
        public ActionResult CreateBook(string dsc, string time, string date)
        {
            DomainClass.DomainClass.Book B = new DomainClass.DomainClass.Book();
            B.Dsc = dsc;
            B.UserId = UserId;
            B.Time = time;
            B.Date = date;
            DB.Books.Add(B);
            DB.SaveChanges();


            return Json(true);
        }
        public ActionResult DeleteBook(int BookId)
        {
            var oldBook = DB.Books.SingleOrDefault(q => q.BookId == BookId);
            DB.Books.Remove(oldBook);
            DB.SaveChanges();


            return Json(true);
        }
        public ActionResult EditBook(int BookId)
        {
            DomainClass.DomainClass.Book B = new DomainClass.DomainClass.Book();
            var oldBook = DB.Books.SingleOrDefault(q => q.BookId == BookId);
            B.Date = oldBook.Date;
            B.Dsc = oldBook.Date;
            B.RepeatCount = oldBook.RepeatCount;
            B.RepeatedNumber = oldBook.RepeatedNumber;
            B.Time = oldBook.Time;
            B.BookId = oldBook.BookId;



            return Json(B);
        }
        public ActionResult UpdateBook(int BookId, string dsc)
        {


            var oldBook = DB.Books.SingleOrDefault(q => q.BookId == BookId);
            string[] parts = new string[0];
            if (dsc != null)
            {
                parts = dsc.Split(new string[] { "@@" }, StringSplitOptions.None);

            }
            if (parts.Length > 1)
            {
                for (int i = 0; i < parts.Length; i++)
                {


                    DomainClass.DomainClass.Book newBook = new DomainClass.DomainClass.Book();
                    newBook.Dsc = parts[i];
                    newBook.UserId = oldBook.UserId;
                    newBook.Date = oldBook.Date;
                    newBook.Time = oldBook.Time;
                    newBook.RepeatedNumber = 0;
                    newBook.Order = oldBook.Order;
                    DB.Books.Add(newBook);
                    DB.SaveChanges();
                }
                DB.Books.Remove(oldBook);
                DB.SaveChanges();

            }
            else
            {
                // var oldBook = DB.Books.SingleOrDefault(q => q.BookId == BookId);
                oldBook.Dsc = dsc;
                DB.SaveChanges();

            }

            return Json(true);
        }
        public ActionResult inreaseRepeatedNumber(int BookId)
        {
            var oldBook = DB.Books.SingleOrDefault(q => q.BookId == BookId);
            oldBook.RepeatedNumber = (oldBook.RepeatedNumber == null ? 0 : oldBook.RepeatedNumber) + 1;
            if (DB.SaveChanges() > 0)
            {
                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }
    }

}
