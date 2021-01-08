using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{ 
    public partial class Iodayly
    {
        public int Ioid { get; set; }
        public int? Stime { get; set; }
        public int? Etime { get; set; }
        public int? Iotype { get; set; }
        public string DayDate { get; set; }
    }
}
