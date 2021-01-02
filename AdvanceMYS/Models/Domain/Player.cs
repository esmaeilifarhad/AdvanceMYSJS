using System;
using System.Collections.Generic;

#nullable disable

namespace AdvanceMYS.Models.Domain
{
    public partial class Player
    {
        public Player()
        {
            PlayerScores = new HashSet<PlayerScore>();
        }

        public int PlayersId { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public bool IsHozoor { get; set; }

        public virtual ICollection<PlayerScore> PlayerScores { get; set; }
    }
}
