using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Euroleague2020Reacts.Models
{
    [Table("Matches")]
    public class Matches
    {
        [Key]
        [Required]
        public int MatchID { get; set; }
        public int RoundNo { get; set; }
        [MaxLength(50)]
        public string Home_Team { get; set; }
        [MaxLength(50)]
        public string Away_Team { get; set; }
        public int HomePointsScored { get; set; }
        public int AwayPointsScored { get; set; }
        public Boolean hadExtraTime { get; set; }
        public int? EndOfFourthPeriodPoints { get; set; }
    }
}
