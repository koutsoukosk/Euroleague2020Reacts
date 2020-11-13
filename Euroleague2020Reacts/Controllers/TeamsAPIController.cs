using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Euroleague2020Reacts.DataAccessLayer;
using Euroleague2020Reacts.Models;

namespace Euroleague2020Reacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsAPIController : ControllerBase
    {
        private readonly Euroleague2020_21ReactDBContext _context;

        public TeamsAPIController(Euroleague2020_21ReactDBContext context)
        {
            _context = context;
        }

        // GET: api/TeamsAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teams>>> GetTeam()
        {
            return await _context.Team.ToListAsync();
        }

        // GET: api/TeamsAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teams>> GetTeams(int id)
        {
            var teams = await _context.Team.FindAsync(id);

            if (teams == null)
            {
                return NotFound();
            }

            return teams;
        }

        // PUT: api/TeamsAPI/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeams(int id,[FromForm] Teams teams)
        {
            if (id != teams.TeamID)
            {
                return BadRequest();
            }

            _context.Entry(teams).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TeamsAPI
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Teams>> PostTeams([FromForm] Teams teams)
        {
            _context.Team.Add(teams);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeams", new { id = teams.TeamID }, teams);
        }

        // DELETE: api/TeamsAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Teams>> DeleteTeams(int id)
        {
            var teams = await _context.Team.FindAsync(id);
            if (teams == null)
            {
                return NotFound();
            }

            _context.Team.Remove(teams);
            await _context.SaveChangesAsync();

            return teams;
        }

        private bool TeamsExists(int id)
        {
            return _context.Team.Any(e => e.TeamID == id);
        }
    }
}
