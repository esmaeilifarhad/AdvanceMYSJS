using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.ViewModels.Dictionary
{
    public class VMDictionary:Models.Domain.DicTbl
    {
        // CountMoroor = ((int)W.UnSuccessCount + (int)W.SuccessCount)
        public int CountMoroor { get; set; }
        public int Grade { get; set; }
        public int CountOfWord { get; set; }
        public int CountLevel { get; set; }
        public string NameLevel { get; set; }
        public int HasExample { get; set; }
        public int ExampleId { get; set; }
        public int Radif { get; set; }
        /// <summary>
        /// true یعنی درست گفته شده و باید سطح کاهش پیدا کند
        /// </summary>
        public string UpOrDown { get; set; }
        public bool statusCheck { get; set; }
        public List<Models.Domain.ExampleTbl> lstExample { get; set; }
    }
}
