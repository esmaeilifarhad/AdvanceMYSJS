using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Timing
    {
        public int TimingId { get; set; }
        public int TaskId { get; set; }
        public int ManageTimeId { get; set; }

        public virtual ManageTime ManageTime { get; set; }
        public virtual Task Task { get; set; }
    }
}
