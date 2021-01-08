using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class KarKard
    {
        public int KarkardId { get; set; }
        public int? JobId { get; set; }
        public string DayDate { get; set; }
        public int SpendTimeMinute { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public DateTime? MiladyDate { get; set; }

        public virtual Job Job { get; set; }
    }
}
