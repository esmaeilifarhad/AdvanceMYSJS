using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Daramad
    {
        public int DaramadId { get; set; }
        public int Rial { get; set; }
        public int MojoodyBankId { get; set; }
        public string Description { get; set; }
        public int TypeHazinehId { get; set; }
        public string Date { get; set; }
        public int? Before { get; set; }
        public int? After { get; set; }
        public bool? DaramadOrhazineh { get; set; }

        public virtual MojoodyBank MojoodyBank { get; set; }
        public virtual TypeHazineh TypeHazineh { get; set; }
    }
}
