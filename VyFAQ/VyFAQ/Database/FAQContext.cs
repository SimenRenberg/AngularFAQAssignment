using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VyFAQ.Models;

namespace VyFAQ.Database
{
    public class FAQContext: DbContext
    {
        public FAQContext(DbContextOptions<FAQContext> options)
            : base(options) { }

        public DbSet<FAQ> Questions { get; set; }
        public DbSet<SubmittedQuestions> SubmittedQuestions { get; set; }
        public DbSet<RatedThumbsUp> PositiveRatings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FAQ>().HasData(
                    new FAQ
                    {   
                        QuestionID = 1,
                        Category = "Buss",
                        Question = "Kan jeg reservere seter på buss?",
                        Answer = "Ja. Dette koster litt ekstra, og lar seg gjøre mens du kjøper billett."
                    },

                    new FAQ
                    {
                        QuestionID = 2,
                        Category = "Buss",
                        Question = "Stopper bussen på rasteplasser?",
                        Answer = "Dette kommer an på ruten. I ruter som tar mer enn 3 timer stopper vi på steder hvor det er mulig å strekke seg på beina og kjøpe mat og drikke."
                    },

                    new FAQ
                    {
                        QuestionID = 3,
                        Category = "Buss",
                        Question = "Jeg har mistet billetten min. Ligger den et sted på siden?",
                        Answer = "Om du har en bruker kan du finne alle billettene dine. Det kan også hende du har en kopi på epost-kontoen du har brukt for å kjøpe billetten."
                    },

                    new FAQ
                    {
                        QuestionID = 4,
                        Category = "Tog",
                        Question = "Kan jeg reservere seter på Tog?",
                        Answer = "Ja. Dette koster litt ekstra, og lar seg gjøre mens du kjøper billett."
                    },

                    new FAQ
                    {
                        QuestionID = 5,
                        Category = "Tog",
                        Question = "Hvorfor er det alltid så fullt på toget?",
                        Answer = "I rushtidene er alt vi har av tilgjengelig materiell i bruk. Vi forsøker å matche etterspørselen med «riktig» kapasitet så langt det lar seg gjøre, likevel er det ikke mulig å tilby sitteplasser til alle. Vi får stadig flere togsett levert fra fabrikk så på sikt øker det muligheten til å kjøre flere avganger med doble togsett."
                    },

                    new FAQ
                    {
                        QuestionID = 6,
                        Category = "Tog",
                        Question = "Hvordan finner jeg rutetidene?",
                        Answer = "Du kan raskt og enkelt gjøre et rutesøk i reiseplanleggeren eller i appen. Du kan også finne rutetider i rutetabellene."
                    },

                    new FAQ
                    {
                        QuestionID = 7,
                        Category = "Betaling",
                        Question = "Kan jeg få erstatning for merkostnader ved forsinkelse?",
                        Answer = "I situasjoner der du må ta i bruk alternativ transport eller får andre utgifter i forbindelse med forsinkelse eller kansellering av tog, kan du få refundert hele eller deler av utleggene. Dette må gjøres skriftlig med vedlagt dokumentasjon innen tre måneder etter hendelsen."
                    },

                    new FAQ
                    {
                        QuestionID = 8,
                        Category = "Betaling",
                        Question = "Jeg rakk ikke avgangen. Kan jeg få refundert billetten?",
                        Answer = "Alle billetter må refunderes før avgang, du vil ikke ha krav på refusjon etter togavgangen dersom du ikke rekker toget ditt."
                    },
                    
                    new FAQ
                    {
                        QuestionID = 9,
                        Category = "Betaling",
                        Question = "Hvordan endrer jeg betalingskortet tilknyttet Vy-profilen min?",
                        Answer = "Du kan slette og legge til betalingskort ved å logge inn på vy.no og gå til «Min profil». I appen går du til «Profil», så velger du «Betaling»."
                    }

                   
                );
          

        }
    }
}
