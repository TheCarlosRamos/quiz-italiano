// Interações para tabelas de material de estudo
document.addEventListener('DOMContentLoaded', function() {
  // Destacar linha ao clicar
  const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(row => {
    row.addEventListener('click', function() {
      // Remove destaque anterior
      tableRows.forEach(r => r.classList.remove('highlighted'));
      // Adiciona destaque à linha clicada
      this.classList.add('highlighted');
    });
  });

  // Botão de prática - redireciona para quiz relacionado
  const practiceBtn = document.getElementById('btn-practice');
  if (practiceBtn) {
    practiceBtn.addEventListener('click', function() {
      // Obter o nome da página atual para determinar qual quiz abrir
      const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
      
      // Mapear páginas para quizzes correspondentes
      const quizMap = {
        'sons': 'animali.html', // Quiz de vocabulário como alternativa
        'tempos_verbais': 'passato-prossimo-quiz.html',
        'futuro_condicional_irreg': 'future-simple.html',
        'passado_com_essere': 'passato-prossimo-quiz.html'
      };
      
      const targetQuiz = quizMap[currentPage] || 'index.html';
      window.location.href = targetQuiz;
    });
  }

  // Funcionalidade de busca rápida na tabela
  function createSearchBox() {
    const tableWrapper = document.querySelector('.table-wrapper');
    if (!tableWrapper) return;

    const searchBox = document.createElement('div');
    searchBox.className = 'table-search';
    searchBox.innerHTML = `
      <input type="text" id="table-search-input" placeholder="🔍 Buscar na tabela..." />
    `;
    
    tableWrapper.insertBefore(searchBox, tableWrapper.firstChild);

    const searchInput = document.getElementById('table-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
            row.classList.remove('search-hidden');
          } else {
            row.style.display = 'none';
            row.classList.add('search-hidden');
          }
        });
      });
    }
  }

  // Criar caixa de busca
  createSearchBox();

  // Adicionar contador de linhas visíveis
  function updateRowCount() {
    const visibleRows = document.querySelectorAll('tbody tr:not(.search-hidden)').length;
    const totalRows = document.querySelectorAll('tbody tr').length;
    
    let counter = document.querySelector('.row-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'row-counter';
      const tableWrapper = document.querySelector('.table-wrapper');
      if (tableWrapper) {
        tableWrapper.appendChild(counter);
      }
    }
    
    if (visibleRows < totalRows) {
      counter.textContent = `Mostrando ${visibleRows} de ${totalRows} resultados`;
      counter.style.display = 'block';
    } else {
      counter.style.display = 'none';
    }
  }

  // Atualizar contador quando buscar
  const searchInput = document.getElementById('table-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', updateRowCount);
  }

  // Funcionalidade de copiar linha
  tableRows.forEach(row => {
    row.addEventListener('dblclick', function() {
      const text = this.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        // Mostrar feedback visual
        this.classList.add('copied');
        setTimeout(() => {
          this.classList.remove('copied');
        }, 1000);
      });
    });
  });

  // Adicionar tooltips para dicas rápidas
  function addTooltips() {
    const tooltipTexts = {
      'C + A/O/U': 'Som forte de K como em "casa"',
      'C + E/I': 'Som de TCH como em "ciao"',
      'GLI': 'Som de LH como em "filho"',
      'GN': 'Som de NH como em "nhoque"',
      'essere': 'Verbo ser/estar - usa essere no passato prossimo',
      'avere': 'Verbo ter - usa avere no passato prossimo'
    };

    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
      const text = cell.textContent.trim();
      if (tooltipTexts[text]) {
        cell.title = tooltipTexts[text];
        cell.classList.add('has-tooltip');
      }
    });
  }

  addTooltips();

  // Animação de entrada para as linhas da tabela
  tableRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    setTimeout(() => {
      row.style.transition = 'all 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, index * 50);
  });
});
