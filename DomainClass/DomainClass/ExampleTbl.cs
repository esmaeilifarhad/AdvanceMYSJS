using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class ExampleTbl
    {
        public int Id { get; set; }
        public int IdDicTbl { get; set; }
        public string Example { get; set; }
        public int GetFromExample { get; set; }
    

        public virtual DicTbl DicTbl { get; set; }
        //public List<DicExamples> dicExamples { get; set; }
    }
}
