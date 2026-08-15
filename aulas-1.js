(function(){
  const level = (window.LEVEL_TARGET && window.LEVEL_TARGET.trim()) || new URLSearchParams(window.location.search).get('level') || 'L1';
  const data = window.AULAS_1_DATA && window.AULAS_1_DATA[level]
    ? window.AULAS_1_DATA[level]
    : window.AULAS_1_DATA.L1;

  const labels = {
    L1: 'Aula 1 — Nível 1',
    L2: 'Aula 1 — Nível 2',
    L3: 'Aula 1 — Nível 3',
    L4: 'Aula 1 — Nível 4',
    L5: 'Aula 1 — Nível 5',
    L6: 'Aula 1 — Nível 6',
    L7: 'Aula 1 — Nível 7',
    L8: 'Aula 1 — Nível 8',
    L9: 'Aula 1 — Nível 9',
    L10: 'Aula 1 — Nível 10',
    L11: 'Aula 1 — Nível 11',
    L12: 'Aula 1 — Nível 12'
  };

  QuizCore.createGame(data, {
    title: `${labels[level]} — Italiano → Português`,
    rounds: 10
  });
})();
