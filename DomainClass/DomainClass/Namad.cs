using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Namad
    {
        public Namad()
        {
            NamadDetails = new HashSet<NamadDetail>();
        }

        public int Id { get; set; }
        public string Namad1 { get; set; }
        public string CodeSherkat { get; set; }
        public string TseAdrs { get; set; }
        public int? RahavardId { get; set; }
        public string NamadSahih { get; set; }
        public string TseId { get; set; }

        public virtual ICollection<NamadDetail> NamadDetails { get; set; }
    }
}
