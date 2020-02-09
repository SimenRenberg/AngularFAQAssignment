using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VyFAQ.Models
{
    public class FAQ
    {
        [Key]
        public int QuestionID { get; set; } 
        public string Question { get; set; } 
        public string Answer { get; set; }
        public string Category { get; set; }
        public int TommelOpp { get; set; }
        public int TommelNed { get; set; }
    }
}
