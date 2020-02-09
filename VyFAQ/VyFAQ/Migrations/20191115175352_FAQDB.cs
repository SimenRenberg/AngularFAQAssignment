using Microsoft.EntityFrameworkCore.Migrations;

namespace VyFAQ.Migrations
{
    public partial class FAQDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PositiveRatings",
                columns: table => new
                {
                    RatingID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastClickedQuestion = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PositiveRatings", x => x.RatingID);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(nullable: true),
                    Answer = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    TommelOpp = table.Column<int>(nullable: false),
                    TommelNed = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionID);
                });

            migrationBuilder.CreateTable(
                name: "SubmittedQuestions",
                columns: table => new
                {
                    QuestionID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastClickedQuestion = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    SubmittedQuestion = table.Column<string>(nullable: true),
                    Rating = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubmittedQuestions", x => x.QuestionID);
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "QuestionID", "Answer", "Category", "Question", "TommelNed", "TommelOpp" },
                values: new object[,]
                {
                    { 1, "Ja. Dette koster litt ekstra, og lar seg gjøre mens du kjøper billett.", "Buss", "Kan jeg reservere seter på buss?", 0, 0 },
                    { 2, "Dette kommer an på ruten. I ruter som tar mer enn 3 timer stopper vi på steder hvor det er mulig å strekke seg på beina og kjøpe mat og drikke.", "Buss", "Stopper bussen på rasteplasser?", 0, 0 },
                    { 3, "Om du har en bruker kan du finne alle billettene dine. Det kan også hende du har en kopi på epost-kontoen du har brukt for å kjøpe billetten.", "Buss", "Jeg har mistet billetten min. Ligger den et sted på siden?", 0, 0 },
                    { 4, "Ja. Dette koster litt ekstra, og lar seg gjøre mens du kjøper billett.", "Tog", "Kan jeg reservere seter på Tog?", 0, 0 },
                    { 5, "I rushtidene er alt vi har av tilgjengelig materiell i bruk. Vi forsøker å matche etterspørselen med «riktig» kapasitet så langt det lar seg gjøre, likevel er det ikke mulig å tilby sitteplasser til alle. Vi får stadig flere togsett levert fra fabrikk så på sikt øker det muligheten til å kjøre flere avganger med doble togsett.", "Tog", "Hvorfor er det alltid så fullt på toget?", 0, 0 },
                    { 6, "Du kan raskt og enkelt gjøre et rutesøk i reiseplanleggeren eller i appen. Du kan også finne rutetider i rutetabellene.", "Tog", "Hvordan finner jeg rutetidene?", 0, 0 },
                    { 7, "I situasjoner der du må ta i bruk alternativ transport eller får andre utgifter i forbindelse med forsinkelse eller kansellering av tog, kan du få refundert hele eller deler av utleggene. Dette må gjøres skriftlig med vedlagt dokumentasjon innen tre måneder etter hendelsen.", "Betaling", "Kan jeg få erstatning for merkostnader ved forsinkelse?", 0, 0 },
                    { 8, "Alle billetter må refunderes før avgang, du vil ikke ha krav på refusjon etter togavgangen dersom du ikke rekker toget ditt.", "Betaling", "Jeg rakk ikke avgangen. Kan jeg få refundert billetten?", 0, 0 },
                    { 9, "Du kan slette og legge til betalingskort ved å logge inn på vy.no og gå til «Min profil». I appen går du til «Profil», så velger du «Betaling».", "Betaling", "Hvordan endrer jeg betalingskortet tilknyttet Vy-profilen min?", 0, 0 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PositiveRatings");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "SubmittedQuestions");
        }
    }
}
