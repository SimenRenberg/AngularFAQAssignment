using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VyFAQ.Models
{
    public class SubmittedQuestions
    {
        [Key]
        public int QuestionID { get; set; }
        public string LastClickedQuestion { get; set; }
        public string Category { get; set; }
        public string SubmittedQuestion { get; set; }
        public string Rating { get; set; }
    }
}
