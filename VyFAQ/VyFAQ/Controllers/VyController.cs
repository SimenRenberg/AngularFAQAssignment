using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VyFAQ.Database;
using VyFAQ.Models;
using VyFAQ.Repository;

namespace VyFAQ.Controllers
{
    //brukt [action] i kallet fordi flere post-metoder inneholder samme parameter
    [Route("api/[controller]/[action]")]
    public class VyController : Controller
    {
        private readonly FAQContext _context;
        public VyController(FAQContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var db = new Aksess(_context);
            List<SubmittedQuestions> innsendteSpm = db.getSubmits();
            return Json(innsendteSpm);
        }

        [HttpGet]
        public JsonResult GetPositiveRatings()
        {
            var db = new Aksess(_context);
            List<RatedThumbsUp> innsendteRatings = db.getQuestionsRatedThumbsUp();
            return Json(innsendteRatings);
        }

        [HttpGet("{Category}")]
        public JsonResult Get(string Category)
        {
            var db = new Aksess(_context);
            List<FAQ> Questions = db.GetFAQ(Category);
            return Json(Questions);
        }

        [HttpPost]
        public JsonResult PostRating([FromBody]RatedThumbsUp innsendtSpørsmål)
        {
            var db = new Aksess(_context);
            if (db.settInnTilbakemelding(innsendtSpørsmål))
            {
                return Json("Ok!");
            }
            else
            {
                return Json("Noe gikk galt");
            }
        }

        [HttpPost]
        public JsonResult PostQuestion([FromBody] SubmittedQuestions innsendtSpørsmål)
        {
            var db = new Aksess(_context);
            if (db.settInnSpørsmål(innsendtSpørsmål))
            {
                return Json("Ok.");
            }
            else
            {
                return Json("Noe gikk galt");
            }
        }

    }
} 