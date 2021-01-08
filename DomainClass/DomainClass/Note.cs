using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DomainClass.DomainClass
{
    public class Note
    {
        public int NoteId { get; set; }
        public string Title { get; set; }
        // public int JobId { get; set; }
        public string Description { get; set; }
        public int SubjectId { get; set; }
        public int level { get; set; }
        public string DateRefresh { get; set; }
        public string DateCreated { get; set; }
        public string Time { get; set; }
      //  public virtual Job Job { get; set; }
        public virtual Subject Subject { get; set; }
    }
}
