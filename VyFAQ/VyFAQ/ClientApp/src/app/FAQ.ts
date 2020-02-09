//Dette replacer index
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';
import { animate, style, group, query, transition, trigger, animateChild, state, keyframes, stagger} from '@angular/animations';
import { QuestionsAndAnswers, IQuestionsAndAnswers } from "./QuestionsAndAnswers";
import { userSubmissions, IuserSubmissions } from './userSubmits';
import { PositiveRating, IPositiveRating } from './ThumbsUpRating';


@Component({
    selector: 'app-root',
    templateUrl: './FAQ.html',
    styleUrls: ['./FAQ.css'],

    //fulgt tutorials fra https://dev.to/mustapha/all-you-need-to-know-about-angular-animations-1c09
    //for å lære animasjoner, samt en rekke youtube-videoer. De fleste animasjonene på siden kunne bli
    //gjort gjennom CSS og vanlig javascript, men jeg ville heller bruke 100% angular.
    animations: [
        trigger('showQuestions', [
            transition(':enter', [
                style({ height: '0px', overflow: 'hidden' }),
                // height: '!' gir elementet sin original-høyde, altså det som står i CSS. (veldig digg!)
                group([animate('250ms ease-out', style({ height: '!' }))]),

            ]),
            transition(':leave', [
                style({ height: '!', overflow: 'hidden' }),
                group([animate('250ms ease-out', style({ height: '0px' }))]),
            ]),
        ]),

        //stagger venter 500ms før den animerer child div-en, altså "Fant du det du lette etter"-diven
        trigger('showAnswers', [
            transition(':enter', [
                group([
                    query('@showSurvey', stagger(500, [
                        animateChild(),
                    ]), { optional: true }),
                    style({ height: '0px', overflow: 'hidden', }),
                    animate('250ms ease-out', style({ height: '!' })),
                ]),
            ]),
            transition(':leave', [
                group([
                    style({ height: '!', overflow: 'hidden' }),
                    animate('100ms ease-out', style({ height: '0px' }))
                ]),
            ]),
        ]),

        trigger('tommelOppAnimation', [
            transition('*<=>*', [
                animate('500ms ease-out',
                    keyframes([
                        style({ color: '#32a852' }),
                        style({ transform: 'translateX(-10%)' }),
                        style({ transform: 'translateX(20%)' }),
                        style({ transform: 'translateX(-10%)' }),
                        style({ transform: 'translateX(10%)' }),
                        style({ transform: 'translateX(-5%)' }),
                        style({ transform: 'translateX(5%)' }),

                    ]),
                ),
            ]),
        ]),

        trigger('showSurvey', [
            transition(':enter', [
                style({ height: '0px', overflow: 'hidden', border: 'none', padding: '0px' }),
                group([animate('250ms 1s ease-out', style({ height: '!', padding: '!' }))]),

            ]),
            transition(':leave', [
                style({ height: '!', padding: '!', overflow: 'hidden' }),
                group([animate('250ms ease-out', style({ height: '0px', padding: '0px' }))]),
            ]),
        ]),

        trigger('userQuestion', [
            transition(':enter', [
                style({ height: '0px', overflow: 'hidden', border: 'none' }),
                group([animate('500ms ease-in', style({ height: '!' }))]),
            ]),
            transition(':leave', [
                style({ height: '!', overflow: 'hidden', 'margin-top': '!', 'margin-bottom':'!'}),
                group([animate('500ms ease-out', style({ height: '0px', 'margin-top': '0px', 'margin-bottom': '0px', 'padding-top': '0px', 'padding-bottom': '0px' }))])
            ]),
        ]),



    ]


})

export class FAQ {
    //--------------------------attributter--------------------------//
    EveryQuestion: Array<QuestionsAndAnswers>;
    EverySubmittedQuestion: Array<userSubmissions>;
    EveryPositiveRating: Array<PositiveRating>;
    laster: boolean;

    hvilketSvar: number;

    //---Animasjoner---//
    isOpenQuestion1:boolean;  //  | 
    isOpenQuestion2: boolean; //  |- sjekker hvilket spørsmålskategori (buss eller tog feks) som er trykket på.
    isOpenQuestion3: boolean; //  |

    isOpenAnswer1: boolean;   //  |
    isOpenAnswer2: boolean;   //  |- sjekker hvilket spørsmål som er trykket på.
    isOpenAnswer3: boolean;   //  |

    showSurvey: boolean;      // lar bruker gi tilbakemelding
    tommelOpp: boolean;       // bruker har gitt tommel opp
    tommelNed: boolean;       // bruker har gitt tommel ned
    nyRating: boolean;

    //---Lagring til DB---//
    hvilketSvarErBrukerenPå: string; //fint å vite hva brukeren har gitt tilbakemelding på

    //---toggles---//
    visSvar1: boolean;        // |
    visSvar2: boolean;        // |- brukes til ngIf for å vise riktig svar til spørsmålet som er trykket
    visSvar3: boolean;        // |

    visBussSpm: boolean;        // |
    visTogSpm: boolean;         // |- Brukes til ngIf for å vise riktig spørsmål til kategorien som er trykket
    visBetalingSpm: boolean;    // | 

    showUserQuestion: boolean;  // ngIf om brukeren skal skrive inn et eget spørsmål
    showConfirmation: boolean;  // ngIf om brukeren har submittet form-et.
    closeConfirmation: boolean; // ngIf om brukeren har trykket X etter form-et er vist.

    showSubmits: boolean;
    //---Submit---//
    form: FormGroup;

    //-----------------------attributter slutt-----------------------//



    constructor(private _http: HttpClient, private fb: FormBuilder) {
        this.form = fb.group({
            id: [""],
            submittedQuestion: [null, Validators.compose([Validators.required, Validators.pattern("[0-9a-zæøåA-ZÆØÅ\\-.? ]{2,50}")])],
            category: new FormControl(null, Validators.compose([Validators.required, Validators.pattern("Buss|Tog|Betaling|Annet")])),
        })
    }

    //en del bools. Kommenter gjerne om det finnes en mer effektiv måte å vise
    //riktige div-er når du har så mange.
    ngOnInit() {
        this.nyRating = false;
        this.showConfirmation = false;
        this.showSurvey = false;
        this.isOpenQuestion1 = false;
        this.isOpenQuestion2 = false;
        this.isOpenQuestion2 = false;
        this.visBussSpm = false;
        this.visTogSpm = false;
        this.visBetalingSpm = false;
        this.visSvar1 = false;
        this.visSvar2 = false;
        this.visSvar3 = false;
        this.tommelOpp = false;
        this.closeConfirmation = false;
        this.showSubmits = false;
    }

    //---Toggle-metoder---//

    //sender med en INT så metoden vet hvilket spørsmål som skal animeres (og vises).
    toggleQ(number: number) {
        switch (number) {
            case 1:
                this.visBussSpm = !this.visBussSpm;
                this.isOpenQuestion1 = !this.isOpenQuestion1;
                this.isOpenQuestion2 = false;
                this.isOpenQuestion3 = false;
                break;
            case 2:
                this.visTogSpm = !this.visTogSpm;
                this.isOpenQuestion2 = !this.isOpenQuestion2;
                this.isOpenQuestion1 = false;
                this.isOpenQuestion3 = false;
                break;
            case 3:
                this.visBetalingSpm = !this.visBetalingSpm;
                this.isOpenQuestion3 = !this.isOpenQuestion3;
                this.isOpenQuestion1 = false;
                this.isOpenQuestion2 = false;
                break;
        }
    }

    //samme bruk av parameter som toggleA
    // setTimeout(()x) er brukt for å gi et lite millisekund tid før "fant du det du lette etter"-spørsmålet
    // "finnes" i HTML-en. Dette er fordi uten dette millisekundet ville ikke animasjonen ha spilt slik det skulle.
    toggleA(number: number) {
        this.showUserQuestion = false;
        this.tommelOpp = false;
        this.showSurvey = false;
        this.hvilketSvar = number;
        switch (number) {
            case 1:
                this.visSvar1 = !this.visSvar1;
                this.visSvar2 = false;
                this.visSvar3 = false;
                this.isOpenAnswer1 = !this.isOpenAnswer1;
                this.isOpenAnswer2 = false;
                this.isOpenAnswer3 = false;
                
                setTimeout(() => {
                    this.showSurvey = !this.showSurvey;

                }, 1);
                break;
            case 2:
                this.visSvar2 = !this.visSvar2;
                this.visSvar1 = false;
                this.visSvar3 = false;
                this.isOpenAnswer2 = !this.isOpenAnswer2;
                this.isOpenAnswer1 = false;
                this.isOpenAnswer3 = false;

                setTimeout(() => {
                    this.showSurvey = !this.showSurvey;
                }, 1);
                break;
            case 3:
                
                this.visSvar3 = !this.visSvar3;
                this.visSvar2 = false;
                this.visSvar1 = false;
                this.isOpenAnswer3 = !this.isOpenAnswer3;
                this.isOpenAnswer1 = false;
                this.isOpenAnswer2 = false;

                setTimeout(() => {
                    this.showSurvey = !this.showSurvey;
                }, 1);  
                break;
        }
        
    }

    //enkle toggles
    toggleUserQuestion() {
        this.showUserQuestion = true;
        this.showSurvey = false;

    }

    closeUserQuestion() {
        this.showUserQuestion = false;
    }

    closeTheConfirmation() {
        this.closeConfirmation = true;
        this.showConfirmation = false;
    }
    //når brukeren får beskjed om at form-et er sent inn så resettes formet.
    showUserQuestionConfirmation() {
        this.form.setValue({
            id: '',
            submittedQuestion: '',
            category: '',
        });
        this.form.markAsPristine(); 
        this.showUserQuestion = false;
        this.showConfirmation = true;
    }

    toggleSubmits() {
        this.showSubmits = !this.showSubmits;
        this.getSubmittedQuestions();
    }
    //---Toggle-metoder SLUTT---//

    //---RESTful---//

    //i controlleren er routen satt som [api/controller/action/]. Dette er fordi
    //jeg har valgt å bruke to forskjellige post-actions som tar inn samme parameter.
    //den ene er for å legge til tilbakemelding dersom brukeren trykker tommel opp, og andre
    //er dersom brukeren trykker tommel ned.
    //derav spesifiseringen i URL-en (vy/get, i stedet for vy/).
    hentBussSpm() {
        this.laster = true
        this._http.get<IQuestionsAndAnswers[]>("api/Vy/Get/" + "Buss")
            .subscribe(
                Questions => {
                    this.EveryQuestion = Questions;
                    this.laster = false;

                },
                error => alert(error)
        );
        this.hvilketSvar = 0;
        this.visTogSpm = false;
        this.visBetalingSpm = false;

    }

    hentTogSpm() {
        this.laster = true

        this._http.get<IQuestionsAndAnswers[]>("api/Vy/Get/" + "Tog")
            .subscribe(
                Questions => {
                    this.EveryQuestion = Questions;
                    this.laster = false;

                },
                error => alert(error)
        );

        this.hvilketSvar = 0;
        this.visBussSpm = false;
        this.visBetalingSpm = false;
    }

    hentBetalingSpm() {
        this.laster = true

        this._http.get<IQuestionsAndAnswers[]>("api/Vy/Get/"+ "Betaling")
            .subscribe(
                Questions => {
                    this.EveryQuestion = Questions;
                    this.laster = false;
                    
                },
                error => console.log(error)
            );

        this.hvilketSvar = 0;
        this.visTogSpm = false;
        this.visBussSpm = false;
    }

    //henter et array av alle spørsmålene bruker har sendt inn til databasen,
    //deretter henter den et array av alle spørsmål som har fått en tommel opp.
    //dette kan anses til å ikke være en del av sidens funksjon, og er der KUN fordi
    //det skal gjøre det lettere for sensur av oppgaven.
    getSubmittedQuestions() {
        this._http.get<IuserSubmissions[]>("api/Vy/Get/")
            .subscribe(
                Questions => {
                    this.EverySubmittedQuestion = Questions;
                    this._http.get<IPositiveRating[]>("api/Vy/GetPositiveRatings")
                        .subscribe(
                            Ratings => {
                                this.EveryPositiveRating = Ratings;
                            }
                        )
                },
                error => console.log(error)
        );
    }
    
    //bruker trykket tommel opp."
    sendRating() {
        var rating = new PositiveRating();

        rating.lastClickedQuestion = this.hvilketSvarErBrukerenPå
        // if som sjekker hvilken kategori brukeren er på
        if (this.isOpenQuestion1) { 
            rating.category = "Buss";
        } else if (this.isOpenQuestion2) {
            rating.category = "Tog"
        } else {
            rating.category = "Betaling";
        }
        const body: string = JSON.stringify(rating);
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
       
        this._http.post("api/Vy/PostRating/", body, { headers: headers })
            .subscribe(
                () => {
                    this.tommelOpp = true;
                    setTimeout(() => {
                        this.tommelOpp = false; //resetter tommel-opp. uten timeout ville ikke tommelopp-animasjonen rukket å animeres
                        this.showSurvey = false;
                    }, 800);
                },
                error => console.log("Fikk ikke lagt til kunden: " + error)
            )
    }

    //etter at bruker har gitt en rating så skal antallet ved siden av ratingen for hvert spørsmål
    //reflektere dette. Denne oppdaterer this.EveryQuestion slik at man får med den nye verdien til
    //f.eks.EveryQuestion[1].tommelOpp og EveryQuestion[1].tommelNed.

    //timeouten satt til 250ms er for å forsikre at applikasjonen rekker og sette inn den nye ratingen
    //før den blir hentet.
    hentRating(category: string) {
        this.nyRating = true;
        setTimeout(() => {
            this._http.get<IQuestionsAndAnswers[]>("api/Vy/Get/" + category)
                .subscribe(
                    Questions => {
                        this.EveryQuestion = Questions;
                    }
                )
        }, 250);
    }

    //dersom bruker har trykket tommel ned og fyller ut form-et.
    sendQuestion() {
          var Question = new userSubmissions()

          Question.lastClickedQuestion = this.hvilketSvarErBrukerenPå;
          Question.submittedQuestion = this.form.value.submittedQuestion;
          Question.category = this.form.value.category;
          Question.rating = "Tommel ned!";

          const body: string = JSON.stringify(Question);
          const headers = new HttpHeaders({ "Content-Type": "application/json" });

          this._http.post("api/Vy/PostQuestion/", body, { headers: headers })
              .subscribe(
                  () => {
                      this.showUserQuestionConfirmation();
                  },
                  error => console.log("Fikk ikke lagt til kunden: " + error)
              )
    }

    //---RESTful SLUTT---//

    //metode som "tracker" hvor brukeren er på siden. Hvert spørsmål har et (click)-kall til denne metoden
    //som sender med riktig spørsmål som en streng.
    userClickedAQuestion(hvilket: string) {
        this.form.setValue({
            id: '',
            submittedQuestion: '',
            category: '',
        });
        this.form.markAsPristine(); 
        this.hvilketSvarErBrukerenPå = hvilket;
    }

    
    

}
