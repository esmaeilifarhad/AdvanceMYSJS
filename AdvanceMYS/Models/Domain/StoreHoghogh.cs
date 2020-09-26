using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class StoreHoghogh
    {
        public int StoreHoghoghId { get; set; }
        public int PersonelId { get; set; }
        public int Shdate { get; set; }
        public int MazayaId { get; set; }
        public string MazRyialMah { get; set; }
    }
}
