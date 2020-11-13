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
    public class MatchesAPIController : ControllerBase
    {
        private readonly Euroleague2020_21ReactDBContext _context;

        public MatchesAPIController(Euroleague2020_21ReactDBContext context)
        {
            _context = context;
        }

        // GET: api/MatchesAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Matches>>> GetMatches()
        {       
                return await _context.Match.ToListAsync();
        }

        // GET: api/MatchesAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Matches>> GetMatchById(int id)
        {
            var matches = await _context.Match.FindAsync(id);

            if (matches == null)
            {
                return NotFound();
            }

            return matches;
        }

        // PUT: api/MatchesAPI/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatches(int id, [FromForm]  Matches matches)
        {
            if (id != matches.MatchID)
            {
                return BadRequest();
            }

            _context.Entry(matches).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
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

        // POST: api/MatchesAPI
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Matches>> PostMatches([FromForm] Matches matches)
        {
            _context.Match.Add(matches);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatches", new { id = matches.MatchID }, matches);
        }

        // DELETE: api/MatchesAPI/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Matches>> DeleteMatches(int id)
        {
            var matches = await _context.Match.FindAsync(id);
            if (matches == null)
            {
                return NotFound();
            }

            _context.Match.Remove(matches);
            await _context.SaveChangesAsync();

            return matches;
        }

        private bool MatchExists(int id)
        {
            return _context.Match.Any(e => e.MatchID == id);
        }
    }
}
