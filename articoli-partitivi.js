(function () {
  const ARTICLES = ['del', 'dello', 'della', 'dell’', 'dei', 'degli', 'delle'];
  const SENTENCES = [
    { text: 'Vorrei ___ pane, per favore.', answer: 'del' },
    { text: 'Metto ___ zucchero nel caffè.', answer: 'dello' },
    { text: 'Bevo ___ acqua fresca.', answer: 'dell’' },
    { text: 'Mangiamo ___ pasta a pranzo.', answer: 'della' },
    { text: 'Compro ___ mele al mercato.', answer: 'delle' },
    { text: 'Ho ___ amici che vivono a Roma.', answer: 'degli' },
    { text: 'Ci sono ___ libri sul tavolo.', answer: 'dei' },
    { text: 'Aggiungo ___ olio al condimento.', answer: 'dell’' },
    { text: 'Vuoi ___ formaggio?', answer: 'del' },
    { text: 'Per la zuppa servono ___ verdure.', answer: 'delle' },
    { text: 'Lui mangia ___ yogurt dopo cena.', answer: 'dello' },
    { text: 'Stasera abbiamo ___ ospiti.', answer: 'degli' },
    { text: 'C’è ___ vino in frigorifero.', answer: 'del' },
    { text: 'La ricetta richiede ___ zafferano.', answer: 'dello' },
    { text: 'Prendo ___ fragole per il dessert.', answer: 'delle' },
    { text: 'Lei prepara ___ insalata per pranzo.', answer: 'dell’' },
    { text: 'Loro comprano ___ pomodori maturi.', answer: 'dei' },
    { text: 'Marco mangia ___ gelato alla vaniglia.', answer: 'del' },
    { text: 'Devo mettere ___ sale nella pasta.', answer: 'del' },
    { text: 'Hai ___ idee per il fine settimana?', answer: 'delle' },
    { text: 'In classe ci sono ___ studenti nuovi.', answer: 'degli' },
    { text: 'Per la ricetta taglio ___ cipolle.', answer: 'delle' },
    { text: 'Per la torta serve ___ burro.', answer: 'del' },
    { text: 'Beviamo ___ limonata fresca.', answer: 'della' },
    { text: 'Per la colazione compro ___ biscotti.', answer: 'dei' }
  ];

  const TOTAL_ROUNDS = SENTENCES.length;
  let rounds = [];
  let current = 0;
  let score = 0;

  const screenStart = document.getElementById('screen-start');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenEnd = document.getElementById('screen-end');
  const btnNext = document.getElementById('btn-next');
  const choicesEl = document.getElementById('choices');
  const sentenceEl = document.getElementById('sentence');
  const roundEl = document.getElementById('round');
  const scoreEl = document.getElementById('score');
  const progressEl = document.querySelector('#progress .bar');
  const finalTextEl = document.getElementById('final-text');
  const usedListEl = document.getElementById('used-list');

  function shuffle(items) {
    const shuffled = items.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function showScreen(screen) {
    screenStart.classList.remove('active');
    screenQuiz.classList.remove('active');
    screenEnd.classList.remove('active');
    screen.classList.add('active');
  }

  function startGame() {
    rounds = shuffle(SENTENCES);
    current = 0;
    score = 0;
    showScreen(screenQuiz);
    renderRound();
  }

  function renderRound() {
    btnNext.disabled = true;
    const round = rounds[current];
    roundEl.textContent = `Rodada ${current + 1}/${TOTAL_ROUNDS}`;
    scoreEl.textContent = `Score: ${score}`;
    progressEl.style.width = `${Math.round(current / TOTAL_ROUNDS * 100)}%`;
    sentenceEl.textContent = round.text;
    choicesEl.innerHTML = '';

    shuffle(ARTICLES).forEach(article => {
      const choice = document.createElement('li');
      choice.className = 'choice';
      choice.setAttribute('role', 'option');
      choice.setAttribute('tabindex', '0');
      choice.textContent = article;
      choice.addEventListener('click', () => selectAnswer(choice, round.answer));
      choice.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectAnswer(choice, round.answer);
        }
      });
      choicesEl.appendChild(choice);
    });
  }

  function selectAnswer(selected, answer) {
    if (selected.getAttribute('aria-disabled') === 'true') return;

    if (selected.textContent === answer) {
      selected.classList.add('correct');
      score++;
      scoreEl.textContent = `Score: ${score}`;
    } else {
      selected.classList.add('wrong');
    }

    Array.from(choicesEl.children).forEach(choice => {
      choice.setAttribute('aria-disabled', 'true');
      if (choice.textContent === answer) choice.classList.add('correct');
    });
    btnNext.disabled = false;
  }

  function nextRound() {
    if (current + 1 < TOTAL_ROUNDS) {
      current++;
      renderRound();
      return;
    }

    progressEl.style.width = '100%';
    finalTextEl.textContent = `Você acertou ${score} de ${TOTAL_ROUNDS}.`;
    usedListEl.innerHTML = '';
    rounds.forEach(round => {
      const item = document.createElement('li');
      const answerWithSpacing = round.answer === 'dell’' ? round.answer : `${round.answer} `;
      item.textContent = round.text.replace('___ ', answerWithSpacing);
      usedListEl.appendChild(item);
    });
    showScreen(screenEnd);
  }

  document.getElementById('btn-start').addEventListener('click', startGame);
  btnNext.addEventListener('click', nextRound);
  document.getElementById('btn-retry').addEventListener('click', () => showScreen(screenStart));
})();
