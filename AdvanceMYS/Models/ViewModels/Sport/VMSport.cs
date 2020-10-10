using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.ViewModels.Sport
{
    public class VMSport:Models.Domain.Sport
    {
        public List<Models.Domain.Cat> lstCat { get; set; }
        public string Title { get; set; }
    }
}
