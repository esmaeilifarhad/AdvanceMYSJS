using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class DataCard
    {
        public int DataCardId { get; set; }
        public int Personelid { get; set; }
        public string DateCard { get; set; }
        public int I { get; set; }
        public int O { get; set; }
    }
}
