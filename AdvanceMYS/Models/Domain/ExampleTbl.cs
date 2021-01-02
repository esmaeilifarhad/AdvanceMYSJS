using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class ExampleTbl
    {
        public int Id { get; set; }
        public int IdDicTbl { get; set; }
        public string Example { get; set; }

        public virtual DicTbl IdDicTblNavigation { get; set; }
    }
}
