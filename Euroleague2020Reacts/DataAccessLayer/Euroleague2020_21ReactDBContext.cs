using Euroleague2020Reacts.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Euroleague2020Reacts.DataAccessLayer
{
    public class Euroleague2020_21ReactDBContext:DbContext
    {
        public DbSet<Teams> Team { get; set; }
        public DbSet<Matches> Match { get; set; }
        public Euroleague2020_21ReactDBContext() : base()
        {

        }
        public Euroleague2020_21ReactDBContext(DbContextOptions options) : base(options)
        {

        }

    }
}
