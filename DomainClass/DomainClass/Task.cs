using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Task
    {
        public Task()
        {
            TaskImages = new HashSet<TaskImage>();
            Timings = new HashSet<Timing>();
        }

        public int TaskId { get; set; }
        public string Name { get; set; }
        public string DateStart { get; set; }
        public string DateEnd { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsCheck { get; set; }
        public int? DarsadPishraft { get; set; }
        public int UserId { get; set; }
        public int? Olaviat { get; set; }
        public int? CatId { get; set; }
        public int? Rate { get; set; }

        public virtual Cat Cat { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<TaskImage> TaskImages { get; set; }
        public virtual ICollection<Timing> Timings { get; set; }
    }
}
