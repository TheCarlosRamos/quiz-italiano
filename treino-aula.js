(function(){
  const level = (window.LEVEL_TARGET && window.LEVEL_TARGET.trim()) || new URLSearchParams(window.location.search).get('level') || 'L1';
  const data = window.LEVELS_DATA && window.LEVELS_DATA[level]
    ? window.LEVELS_DATA[level]
    : window.LEVELS_DATA.L1;

  const labels = {
    L1: 'Nível 1 — Básico',
    L2: 'Nível 2 — Verbos e Ações',
    L3: 'Nível 3 — Tempo e Adjetivos',
    L4: 'Nível 4 — Estudo e Cultura',
    L5: 'Nível 5 — Conectores e Advérbios',
    L6: 'Nível 6 — Avançado'
  };

  QuizCore.createGame(data, {
    title: `${labels[level]} — Italiano → Português`,
    rounds: 10
  });
})();
