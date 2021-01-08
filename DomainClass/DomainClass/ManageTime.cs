using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class ManageTime
    {
        public ManageTime()
        {
            Timings = new HashSet<Timing>();
        }

        public int ManageTimeId { get; set; }
        public string Label { get; set; }
        public int Value { get; set; }

        public virtual ICollection<Timing> Timings { get; set; }
    }
}
