using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClass.DomainClass
{
    public partial class Book
    {
      

        public int BookId { get; set; }
        public string Title { get; set; }
        public string Order { get; set; }
        public string Dsc { get; set; }
        public int? UserId { get; set; }
        public int? RepeatCount { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int? RepeatedNumber { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<TitleTbl> TitleTbls { get; set; }
    }
}
