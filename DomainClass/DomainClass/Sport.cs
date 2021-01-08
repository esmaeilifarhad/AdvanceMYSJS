using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class Sport
    {
        public int SportId { get; set; }
        public int CatId { get; set; }
        public string Date { get; set; }
        public int Tedad { get; set; }
        public int? Set { get; set; }

        public virtual Cat Cat { get; set; }
    }
}
