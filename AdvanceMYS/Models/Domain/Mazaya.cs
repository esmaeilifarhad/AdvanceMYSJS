using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Mazaya
    {
        public int Id { get; set; }
        public int MazayaId { get; set; }
        public string MazayaName { get; set; }
        public int? IsMazaya { get; set; }
    }
}
