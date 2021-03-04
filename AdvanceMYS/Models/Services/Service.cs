using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using AdvanceMYS.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AdvanceMYS.Models.Services
{
    public class Service
    {
        private readonly _Context _db;
        //_5069_ManageYourSelfContext s = new _5069_ManageYourSelfContext();
        MessageSender _messageSender = new MessageSender();
        public Service(_Context db)
        {
            _db = db;
        }
        public void SendDictonaryEmail() {
            
            var today =Utility.Utility.ConvertDateToSqlFormat(Utility.Utility.shamsi_date());

            var resDic = _db.DicTbls.
            Where(q => q.LastStatus == false).
            OrderBy(q => q.DateRefresh).
            ThenBy(q => q.Time).
            Take(1000).
            ToList().
            AsEnumerable().Where(
                q => (q.DateRefresh != today) ||
            (q.DateRefresh == today && (int.Parse(DateTime.Now.ToString("HH:mm:ss").Split(":")[0]) - int.Parse(q.Time.Split(":")[0])) > 2)
            ||
             (q.LastIsTrueFalse == false)
            ).ToList();

            var body = "<table>";
            int i = 0;
            int stylecondition = 0;
            foreach (var item in resDic)
            {
                stylecondition = i % 2;
                body += "<tr style='background-color:" + (stylecondition == 0 ? "gray" : "white") + "'>";
                body += "<td style='border:1px solid'>" + item.Eng + "</td><td style='border:1px solid'>" + item.Per + "</td>";
                body += "</tr>";
                //var examples = _db.ExampleTbls.Where(q => q.IdDicTbl == item.Id).ToList();
                //foreach (var example in examples)
                //{
                //    body += "<tr style='background-color:" + (stylecondition == 0 ? "gray" : "white") + "'>";
                //    body += "<td colspan=2 style='border:1px solid'>" + example.Example + "</td>";
                //    body += "</tr>";
                //}
                i += 1;
            }
            body += "</table>";
            _messageSender.SendEmailAsync("esmaili.farhad67@gmail.com", "Dictionary_"+ today, body,true);
        }
        public void SendTaskEmail() {
            var today = Utility.Utility.ConvertDateToSqlFormat(Utility.Utility.shamsi_date());
            var tasks = _db.Tasks.Where(q => q.IsCheck == false && q.DateEnd == today).
                       Include(q => q.Cat).Include(q => q.Timings).
                       ThenInclude(q => q.ManageTime).OrderBy(q => q.DateEnd).
                       ThenBy(q => q.Olaviat).ThenBy(q => q.Timings.SingleOrDefault().ManageTimeId).ToList(); 
            var body = "<table>";
            foreach (var item in tasks)
            {
                body += "<tr  style='border:1px solid'>";
                body += "<td  style='border:1px solid'>" + item.Olaviat + "</td><td  style='border:1px solid'>" + item.Name + "</td><td  style='border:1px solid'>" + item.DateEnd + "</td>";
                body += "<tr>";
            }
            body += "</table>";
            _messageSender.SendEmailAsync("esmaili.farhad67@gmail.com", "Task_" + today, body, true);
        }
    }
}
