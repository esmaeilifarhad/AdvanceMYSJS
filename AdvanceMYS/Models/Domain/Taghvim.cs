using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Taghvim
    {
        public string DayDate { get; set; }
        public int? IsHolyDay { get; set; }
        public int RoozHafte { get; set; }
        public string ChandShanbeh { get; set; }
        public int? HafteChandom { get; set; }
    }
}
