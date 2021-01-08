using System;
using System.Collections.Generic;

#nullable disable

namespace DomainClass.DomainClass
{
    public partial class PlayerScore
    {
        public int PlayerScoreId { get; set; }
        public int UserId { get; set; }
        public int PlayerId { get; set; }
        public int? Score { get; set; }

        public virtual Player Player { get; set; }
        public virtual User User { get; set; }
    }
}
