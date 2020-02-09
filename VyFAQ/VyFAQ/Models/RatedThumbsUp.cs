using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VyFAQ.Models
{
    public class RatedThumbsUp
    {
        [Key]
        public int RatingID { get; set; }
        public string LastClickedQuestion { get; set; }
        public string Category { get; set; }
    }
}
