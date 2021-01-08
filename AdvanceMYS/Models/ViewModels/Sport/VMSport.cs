using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.ViewModels.Sport
{
    public class VMSport:DomainClass.DomainClass.Sport
    {
        public List<DomainClass.DomainClass.Cat> lstCat { get; set; }
        public string Title { get; set; }
    }
}
