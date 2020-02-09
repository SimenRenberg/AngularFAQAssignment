using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using VyFAQ.Database;
using VyFAQ.Models;
namespace VyFAQ.Repository
{
    public class Aksess
    {
        private readonly FAQContext _context;
        public Aksess(FAQContext context)
        {
            _context = context;
        }

        public List<SubmittedQuestions> getSubmits()
        {
            return _context.SubmittedQuestions.ToList();
        }
        public List<RatedThumbsUp> getQuestionsRatedThumbsUp()
        {
            return _context.PositiveRatings.ToList();
        }
        public List<FAQ> GetFAQ(string kategori)
        {
            List<FAQ> spørsmålOgSvar = _context.Questions.Where(s => s.Category == kategori).ToList();

            return spørsmålOgSvar;
        }

        public bool settInnTilbakemelding(RatedThumbsUp tilbakeMelding)
        {
            try
            {
                _context.PositiveRatings.Add(tilbakeMelding);
                _context.Questions.FirstOrDefault(s => s.Question == tilbakeMelding.LastClickedQuestion).TommelOpp++;
                _context.SaveChanges();
                return true;
            } catch (Exception feil)
            {
                Debug.WriteLine(feil);
                return false;
            }
        }

        public bool settInnSpørsmål(SubmittedQuestions innsendtSpørsmål)
        {
            try
            {
                _context.SubmittedQuestions.Add(innsendtSpørsmål);
                _context.Questions.FirstOrDefault(s => s.Question == innsendtSpørsmål.LastClickedQuestion).TommelNed++;
                _context.SaveChanges();
                return true;
            } catch (Exception feil)
            {
                Debug.WriteLine(feil);
                return false;
            }
        }

    }
}
