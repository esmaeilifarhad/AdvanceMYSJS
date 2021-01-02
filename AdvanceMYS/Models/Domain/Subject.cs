using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.Domain
{
    public class Subject
    {
        public int SubjectId { get; set; }
        public string Title { get; set; }
        public int JobId  { get; set; }
        public virtual Job Job  { get; set; }
        public virtual ICollection<Note>   Note { get; set; }
    }
}
