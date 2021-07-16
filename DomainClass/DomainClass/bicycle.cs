using System;
using System.Collections.Generic;
using System.Text;

namespace DomainClass.DomainClass
{
   public class bicycle
    {
        public int bicycleId { get; set; }
        public string Title { get; set; }
        public string BuyDate { get; set; }
        public string SellDate { get; set; }
        public Int64? PriceBuy { get; set; }
        public Int64? PriceSell { get; set; }
        public Int64? PriceExtera { get; set; }
        public string Description { get; set; }

    }
}
