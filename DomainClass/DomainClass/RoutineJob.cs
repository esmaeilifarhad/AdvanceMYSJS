using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class RoutineJob
    {
        public RoutineJob()
        {
            RoutineJobHas = new HashSet<RoutineJobHa>();
        }

        public int RoutineJobId { get; set; }
        public string RoozDaily { get; set; }
        public string Job { get; set; }
        public int? UserId { get; set; }
        public int? Rate { get; set; }
        public int? Order { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<RoutineJobHa> RoutineJobHas { get; set; }
    }
}
