using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class NamadDetail
    {
        public int Id { get; set; }
        public int? NamadId { get; set; }
        public string ShamsyDate { get; set; }
        public long? Hajm { get; set; }
        public long? TedadMoamelat { get; set; }
        public double? DarsadGheymatPayany { get; set; }
        public long? GheymatPayany { get; set; }

        public virtual Namad Namad { get; set; }
    }
}
