using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class HolyDay
    {
        public int HolyDayId { get; set; }
        public string HolyDayRooz { get; set; }
        public int? UserId { get; set; }
    }
}
