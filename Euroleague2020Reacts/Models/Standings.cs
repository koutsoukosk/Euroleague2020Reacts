using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroleague2020Reacts.Models
{
    public class Standings
    {
        public int PositionNo { get; set; }
        public int MatchesNo { get; set; }
        public string TeamName { get; set; }
        public int Wins { get; set; }
        public int Loses { get; set; }
        public int PointsPlus { get; set; }
        public int PointsMinus { get; set; }
        public int PointsDif { get; set; }
        public int ExtraTimeMatches { get; set; }
    }
}
