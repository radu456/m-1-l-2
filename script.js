// Datele aplicatiei
const quizData = [
    {
        question: "O poveste are de obicei personaje, loc si o intamplare?",
        correct: true,
        explanation: "Corect! O poveste are intotdeauna personaje, un loc si o intamplare."
    },
    {
        question: "Cuvantul 'pisica' se desparte in silabe astfel: pi-si-ca?",
        correct: true,
        explanation: "Corect! Pisica se desparte: pi-si-ca."
    },
    {
        question: "Broasca Verzica scria povesti pe pereti?",
        correct: false,
        explanation: "Gresit! Verzica scria povesti pe frunze de nufar."
    },
    {
        question: "Cuvantul 'fluture' se desparte: flu-tur-e?",
        correct: false,
        explanation: "Gresit! Fluture se desparte: flu-tu-re."
    },
    {
        question: "In poveste, melcul era un detectiv?",
        correct: true,
        explanation: "Corect! Melculache era un melc detectiv."
    },
    {
        question: "Cuvantul 'copac' se desparte in silabe: co-pac?",
        correct: true,
        explanation: "Corect! Copac se desparte: co-pac."
    },
    {
        question: "Morcovul din poveste voia sa invete balet?",
        correct: false,
        explanation: "Gresit! Morcovul furase o carte despre karate."
    },
    {
        question: "Cuvantul 'grozava' se desparte: gro-za-va?",
        correct: true,
        explanation: "Corect! Grozava se desparte: gro-za-va."
    },
    {
        question: "Pasarea din poveste dansa tango in biblioteca?",
        correct: false,
        explanation: "Gresit! Ciupercile dansau samba in padure."
    },
    {
        question: "Cuvantul 'poveste' se desparte: po-ve-ste?",
        correct: true,
        explanation: "Corect! Poveste se desparte: po-ve-ste."
    }
];

const game1Data = [
    {
        question: "Ce alegi sa fie personajul principal?",
        options: [
            "Un pom care vorbeste despre vreme",
            "Un copil curios care descopera o lume secreta",
            "O farfurie zburatoare care colecteaza sosete"
        ]
    },
    {
        question: "Unde are loc actiunea povestii?",
        options: [
            "Intr-un oras colorat plin de muzica si jocuri",
            "O casa veche cu multe camere misterioase",
            "Intr-o padure fermecata plina de creaturi magice"
        ]
    },
    {
        question: "Ce fel de problema are personajul?",
        options: [
            "Nu poate gasi soseta preferata",
            "Trebuie sa gaseasca o comoara ascunsa pentru a salva padurea",
            "Vrea sa invete sa danseze breakdance"
        ]
    },
    {
        question: "Ce eveniment neasteptat schimba totul?",
        options: [
            "O pisica incepe sa vorbeasca si ii ofera o harta secreta",
            "Un pod invizibil apare peste rau",
            "Vantul aduce o pizza mare si calda"
        ]
    },
    {
        question: "Cum se rezolva povestea?",
        options: [
            "Personajul gaseste o carte magica care-l ajuta sa isi atinga scopul",
            "Prietenii il ajuta sa treaca peste toate obstacolele",
            "Toata lumea doarme si viseaza ca totul e bine"
        ]
    }
];

const dragonStoryTemplate = `Intr-un dulap <span class="story-blank" data-input="loc">______</span>, traieste un dragon pe nume <span class="story-blank" data-input="nume">______</span>.

Dragonul este foarte <span class="story-blank" data-input="adjectiv1">______</span> si ii place sa manance <span class="story-blank" data-input="mancare">______</span>.

In fiecare zi, cand deschide dulapul, iese un val de <span class="story-blank" data-input="ceva_amuzant">______</span> care face sa rada toata casa.

Dragonul are <span class="story-blank" data-input="numar">______</span> aripi. Culoarea dragonului este <span class="story-blank" data-input="culoare">______</span>.

Cand vrea sa iasa, dragonul face <span class="story-blank" data-input="sunet">______</span>.

Intr-o zi, dragonul a decis sa <span class="story-blank" data-input="actiune">______</span> si sa devina cel mai <span class="story-blank" data-input="adjectiv2">______</span> dragon din dulap.

Dar tot dulapul a inceput sa <span class="story-blank" data-input="ceva_neobisnuit">______</span> si toti au ras <span class="story-blank" data-input="unde_cum">______</span>.`;

const dragonInputs = [
    { key: 'loc', label: 'Loc (ex: colorat, mare, mic)' },
    { key: 'nume', label: 'Nume pentru dragon' },
    { key: 'adjectiv1', label: 'Adjectiv (ex: vesel, cuminte)' },
    { key: 'mancare', label: 'Mancare preferata' },
    { key: 'ceva_amuzant', label: 'Ceva amuzant' },
    { key: 'numar', label: 'Numarul de aripi' },
    { key: 'culoare', label: 'Culoare ciudata' },
    { key: 'sunet', label: 'Sunet amuzant' },
    { key: 'actiune', label: 'O actiune' },
    { key: 'adjectiv2', label: 'Alt adjectiv' },
    { key: 'ceva_neobisnuit', label: 'Ceva neobisnuit' },
    { key: 'unde_cum', label: 'Unde sau cum' }
];

// Starea aplicatiei
let currentScreen = 'start';
let currentQuizQuestion = 0;
let quizAnswers = [];
let currentGame1Question = 0;
let game1Answers = [];
let dragonAnswers = {};

// Functii utilitare
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
}

function updateQuizProgress() {
    const progress = ((currentQuizQuestion + 1) / quizData.length) * 33 + 33;
    document.getElementById('quiz-progress').style.width = progress + '%';
}

// Initializare aplicatie
function initApp() {
    // Event listeners pentru navigare
    document.getElementById('start-btn').addEventListener('click', () => {
        showScreen('story-screen');
    });

    document.getElementById('story-continue').addEventListener('click', () => {
        showScreen('quiz-screen');
        initQuiz();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        resetApp();
        showScreen('start-screen');
    });

    // Initializare quiz
    initQuizEventListeners();
    
    // Initializare jocuri
    initGame1();
    initGame2();
}

// Quiz functions
function initQuizEventListeners() {
    document.getElementById('yes-btn').addEventListener('click', () => answerQuestion(true));
    document.getElementById('no-btn').addEventListener('click', () => answerQuestion(false));
    document.getElementById('quiz-next').addEventListener('click', nextQuestion);
    document.getElementById('quiz-back').addEventListener('click', () => showScreen('story-screen'));
}

function initQuiz() {
    currentQuizQuestion = 0;
    quizAnswers = [];
    displayQuestion();
}

function displayQuestion() {
    const question = quizData[currentQuizQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-question').textContent = currentQuizQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.length;
    
    // Reset buttons and feedback
    document.getElementById('yes-btn').classList.remove('selected');
    document.getElementById('no-btn').classList.remove('selected');
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('quiz-next').disabled = true;
    
    updateQuizProgress();
}

function answerQuestion(answer) {
    const question = quizData[currentQuizQuestion];
    const isCorrect = answer === question.correct;
    
    // Update button states
    document.getElementById('yes-btn').classList.remove('selected');
    document.getElementById('no-btn').classList.remove('selected');
    
    if (answer) {
        document.getElementById('yes-btn').classList.add('selected');
    } else {
        document.getElementById('no-btn').classList.add('selected');
    }
    
    // Show feedback
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = question.explanation;
    feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
    
    // Save answer
    quizAnswers[currentQuizQuestion] = { answer, isCorrect };
    
    // Enable next button
    document.getElementById('quiz-next').disabled = false;
}

function nextQuestion() {
    currentQuizQuestion++;
    
    if (currentQuizQuestion >= quizData.length) {
        showScreen('games-screen');
        initGame1();
    } else {
        displayQuestion();
    }
}

// Game 1 functions
function initGame1() {
    currentGame1Question = 0;
    game1Answers = [];
    displayGame1Question();
    
    document.getElementById('game1-next').addEventListener('click', nextGame1Question);
    document.getElementById('game1-back').addEventListener('click', () => showScreen('quiz-screen'));
}

function displayGame1Question() {
    const question = game1Data[currentGame1Question];
    document.getElementById('game1-question').textContent = question.question;
    
    const optionsContainer = document.getElementById('game1-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
        button.addEventListener('click', () => selectGame1Option(index, button));
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('game1-next').disabled = true;
}

function selectGame1Option(index, button) {
    // Remove selection from all buttons
    document.querySelectorAll('#game1-options .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select current button
    button.classList.add('selected');
    
    // Save answer
    game1Answers[currentGame1Question] = index;
    
    // Enable next button
    document.getElementById('game1-next').disabled = false;
}

function nextGame1Question() {
    currentGame1Question++;
    
    if (currentGame1Question >= game1Data.length) {
        showGame2();
    } else {
        displayGame1Question();
    }
}

function showGame2() {
    document.getElementById('game1').classList.remove('active');
    document.getElementById('game2').classList.add('active');
}

// Game 2 functions
function initGame2() {
    // Display story template
    document.getElementById('dragon-story').innerHTML = dragonStoryTemplate;
    
    // Create input fields
    const inputsContainer = document.getElementById('dragon-inputs');
    inputsContainer.innerHTML = '';
    
    dragonInputs.forEach(input => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        const label = document.createElement('label');
        label.textContent = input.label;
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = `input-${input.key}`;
        inputField.addEventListener('input', (e) => {
            dragonAnswers[input.key] = e.target.value;
            updateDragonStory();
        });
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(inputField);
        inputsContainer.appendChild(inputGroup);
    });
    
    document.getElementById('game2-back').addEventListener('click', showGame1);
    document.getElementById('game2-finish').addEventListener('click', () => showScreen('final-screen'));
}

function showGame1() {
    document.getElementById('game2').classList.remove('active');
    document.getElementById('game1').classList.add('active');
}

function updateDragonStory() {
    const storyBlanks = document.querySelectorAll('.story-blank');
    storyBlanks.forEach(blank => {
        const inputKey = blank.getAttribute('data-input');
        const value = dragonAnswers[inputKey] || '______';
        blank.textContent = value;
        
        if (value !== '______') {
            blank.style.background = '#4CAF50';
            blank.style.color = 'white';
        } else {
            blank.style.background = '#FFE082';
            blank.style.color = '#F57F17';
        }
    });
}

function resetApp() {
    currentScreen = 'start';
    currentQuizQuestion = 0;
    quizAnswers = [];
    currentGame1Question = 0;
    game1Answers = [];
    dragonAnswers = {};
}

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initializare aplicatie cand DOM-ul este gata
document.addEventListener('DOMContentLoaded', initApp);

