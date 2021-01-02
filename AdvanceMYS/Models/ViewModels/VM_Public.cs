using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdvanceMYS.Models.ViewModels
{
    public class VM_Public
    {
        public string Currentdate { get; set; }
        public List<Models.Domain.Job> ListJob { get; set; }
        public List<Models.Domain.Cat> ListCat { get; set; }
        //public List<ViewModels.TaskVM> ListTask { get; set; }
        public Models.Domain.Task Task { get; set; }
        public Models.Domain.Cat Cat { get; set; }
        //public string CurrentDate
        //{
        //    get
        //    {

        //        return Utility.Utility.shamsi_date().ConvertDateToSqlFormat().ConvertDateToSlash();
        //    }
        //}
        //public string CurrentDate6Char
        //{
        //    get
        //    {

        //        return Utility.Utility.shamsi_date().ConvertDateToSqlFormat();
        //    }
        //}
        public string labelManageTime { get; set; }
    }
}
