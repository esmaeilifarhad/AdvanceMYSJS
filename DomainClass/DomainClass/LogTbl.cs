using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class LogTbl
    {
        public int LogId { get; set; }
        public string Name { get; set; }
        public string Dsc { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}
