using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class RoutineJobHa
    {
        public int RoutineJobHa1 { get; set; }
        public string Date { get; set; }
        public int RoutineJobId { get; set; }
        public bool IsCheck { get; set; }

        public virtual RoutineJob RoutineJob { get; set; }
    }
}
