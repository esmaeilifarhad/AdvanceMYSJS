using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Menuha
    {
        public int MenuhaId { get; set; }
        public string Name { get; set; }
        public int MenuId { get; set; }
        public int Order { get; set; }
    }
}
