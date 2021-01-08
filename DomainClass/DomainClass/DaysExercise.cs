using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class DaysExercise
    {
        public int Id { get; set; }
        public string DateExercise { get; set; }
        public int? WordId { get; set; }
        public bool? SuccOrUnSucc { get; set; }

        public virtual DicTbl Word { get; set; }
    }
}
