using Euroleague2020Reacts.DataAccessLayer;
using Euroleague2020Reacts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroleague2020Reacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StandingsAPIController : ControllerBase
    {
    

        private readonly IMatchesRepo _repository;
        public StandingsAPIController(IMatchesRepo repository)
        {
            _repository = repository;
        }
        //private readonly Euroleague2020_21ReactDBContext _context;
        //public StandingsAPIController(Euroleague2020_21ReactDBContext context)
        //{
        //    _context = context;
        //}
    // GET: api/StandingsAPI
    [HttpGet]
        public ActionResult<IEnumerable<Standings>> GetOverallStandings() {
            List<Standings> standings=new List<Standings>() ;
            List<Standings> standingsDynamically = new List<Standings>();
            standingsDynamically.AddRange(_repository.teamsInStandings());
            var allMatches = _repository.GetAppMatches();
            foreach (var matchItem in allMatches)
            {
                foreach (var teamsInStand in standingsDynamically)
                {                 
                    if (teamsInStand.TeamName.Trim()== matchItem.Home_Team.Trim() ) {
                        var TeamNameExist = standings.Find(x => x.TeamName.Contains(teamsInStand.TeamName.Trim()));                     
                        Standings populateStandingsHome = _repository.populateStanding((TeamNameExist != null)? TeamNameExist: teamsInStand, matchItem,true);
                        if (TeamNameExist != null)
                        {
                            var itemToRemove = standings.Single(r => r.TeamName == teamsInStand.TeamName.Trim());
                            standings.Remove(itemToRemove);
                        }
                        standings.Add(populateStandingsHome);                      
                    }
                    if (teamsInStand.TeamName.Trim() == matchItem.Away_Team.Trim()) {
                        var AwayTeamNameExist = standings.Find(x => x.TeamName.Contains(teamsInStand.TeamName.Trim()));
                        Standings populateStandingsAway = _repository.populateStanding((AwayTeamNameExist != null) ? AwayTeamNameExist : teamsInStand, matchItem, false);
                        
                        if (AwayTeamNameExist != null)
                        {
                            var awayItemToRemove = standings.Single(r => r.TeamName == teamsInStand.TeamName.Trim());
                            standings.Remove(awayItemToRemove);
                        }
                        standings.Add(populateStandingsAway);
                    }
                    continue;
                }
               
            }
            int positionCnt = 0;
            var results = standings.OrderByDescending(p => p.PointsDif).OrderBy(m => m.MatchesNo).OrderByDescending(w=>w.Wins).ToList();
            List<Standings> finalResults=new List<Standings>();
            foreach (var item in results)
            {
                item.PositionNo = positionCnt + 1;
                positionCnt += 1;
            }
            return results;
        }
        // GET: api/StandingsAPI/5
        [HttpGet("{RoundId}")]
        public ActionResult<IEnumerable<Standings>> GetStandingsByRound(int RoundId)
        {
            return null;
        }
    }
}
