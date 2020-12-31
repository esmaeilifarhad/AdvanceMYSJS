using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdvanceMYS.Models.Domain;
using AdvanceMYS.Models.Utility;
using Microsoft.AspNetCore.Mvc;

namespace AdvanceMYS.Controllers
{
    
    public class NoteController : Controller
    {
        private readonly _5069_ManageYourSelfContext _db;
        public NoteController(_5069_ManageYourSelfContext db)
        {
            _db = db;
        }
        #region note
        public IActionResult ListNotes(int subjectId) {
            var res = _db.Note.Where(q => q.SubjectId == subjectId).
                OrderBy(q=>q.DateRefresh).
                ThenBy(q=>q.Time).
                ToList();
                return Json(res);
        }
        public IActionResult CreateUpdateNote(Models.Domain.Note note)
        {
            if (note.NoteId > 0)
            {
                var oldNote = _db.Note.SingleOrDefault(q => q.NoteId == note.NoteId);
                oldNote.Description = (note.Description == null ? oldNote.Description : note.Description);
                oldNote.Title = (note.Title == null ? oldNote.Title : note.Title);
                oldNote.SubjectId = (note.SubjectId == 0 ? oldNote.SubjectId : note.SubjectId);
              

                if (note.level != 0)
                {
                    oldNote.level += note.level ;
                    oldNote.Time =  DateTime.Now.ToString("HH:mm:ss");
                    oldNote.DateRefresh =  Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                }


                if (_db.SaveChanges() > 0)
                    return Json("با موفقیت ویرایش شد");
                return Json("ویرایش  انجام نشد");
            }
            else
            {
                note.Time = DateTime.Now.ToString("HH:mm:ss");
                note.DateRefresh = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                note.DateCreated = Utility.ConvertDateToSqlFormat(Utility.shamsi_date());
                note.level = 0;
               
                _db.Note.Add(note);
                if (_db.SaveChanges() > 0)
                    return Json("با موفقیت ذخیره شد");
                return Json("خطا در ثبت");
            }
        }

        public IActionResult DeleteNote(int id)
        {
            _db.Note.Remove(_db.Note.SingleOrDefault(q => q.NoteId == id));
            if (_db.SaveChanges() > 0)
                return Json("با موفقیت حذف شد");
            return Json("خطا در حذف");
        }

        #endregion
        #region Subject
        public IActionResult ListSubjectByJobId(int jobId) {
            return Json(_db.Subject.Where(q=>q.JobId==jobId).ToList());
        }
        public IActionResult CreateUpdateSubject(Models.Domain.Subject subject) {
            if (subject.SubjectId > 0)
            {
               var oldSubject= _db.Subject.SingleOrDefault(q=>q.SubjectId==subject.SubjectId);
                oldSubject.Title = (subject.Title==null?oldSubject.Title:subject.Title);
                oldSubject.JobId = (subject.JobId == 0 ? oldSubject.JobId : subject.JobId);
                if (_db.SaveChanges()>0)
                    return Json("با موفقیت ویرایش شد");
                return Json("ویرایش  انجام نشد");
            }
            else
            {
                _db.Subject.Add(subject);
                if (_db.SaveChanges() > 0)
                    return Json("با موفقیت ذخیره شد");
                return Json("خطا در ثبت");
            }
        }
        public IActionResult DeleteSubject(int id) {
            _db.Subject.Remove(_db.Subject.SingleOrDefault(q=>q.SubjectId==id));
            if (_db.SaveChanges() > 0)
                return Json("با موفقیت حذف شد");
            return Json("خطا در حذف");
        }
        public IActionResult FindSubject(int id) {
            return Json(_db.Subject.SingleOrDefault(q => q.SubjectId == id));
        }
        #endregion

    }
}
