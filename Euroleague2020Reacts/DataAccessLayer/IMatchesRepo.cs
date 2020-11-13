using Euroleague2020Reacts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroleague2020Reacts.DataAccessLayer
{
    public interface IMatchesRepo
    {
        IEnumerable<Matches> GetAppMatches();
        Matches GetMatchesByRoundId(int RoundId);
        List<Standings> teamsInStandings();
        Standings populateStanding(Standings teamsInStand, Matches matchItem, bool isHomeTeam);
    }
}
