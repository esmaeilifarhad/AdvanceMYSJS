using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class DicTblLog
    {
        public int Id { get; set; }
        public string Eng { get; set; }
        public string Per { get; set; }
        public int? Level { get; set; }
        public string DateS { get; set; }
        public string DateRefresh { get; set; }
        public string Time { get; set; }
        public int? Timeword { get; set; }
        public int? IdMonth { get; set; }
        public int? MinuteWord { get; set; }
        public string HostNameTrgLog { get; set; }
        public string LoginNameTrgLog { get; set; }
        public string LogStatusTrgLog { get; set; }
        public string TimeDateTrgLog { get; set; }
    }
}
