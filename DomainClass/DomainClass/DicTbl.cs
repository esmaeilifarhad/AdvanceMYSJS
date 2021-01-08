using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class DicTbl
    {
        public DicTbl()
        {
            DaysExercises = new HashSet<DaysExercise>();
            ExampleTbls = new HashSet<ExampleTbl>();
        }

        public int Id { get; set; }
        public string Eng { get; set; }
        public string Per { get; set; }
        public string Phonetic { get; set; }
        public int Level { get; set; }
        public string DateS { get; set; }
        public string DateRefresh { get; set; }
        public string Time { get; set; }
        public int? Timeword { get; set; }
        public int? IdMonth { get; set; }
        public int? SuccessCount { get; set; }
        public int? UnSuccessCount { get; set; }
        public int UserId { get; set; }
        public DateTime? CreateDateM { get; set; }
        public DateTime? DateRefreshM { get; set; }
        public bool? IsArchieve { get; set; }
        public bool? LastStatus { get; set; }
        public bool? LastIsTrueFalse { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<DaysExercise> DaysExercises { get; set; }
        public virtual ICollection<ExampleTbl> ExampleTbls { get; set; }
    }
}
