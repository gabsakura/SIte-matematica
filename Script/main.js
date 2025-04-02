// Lista de tópicos disponíveis
const topicos = [
    {
        nome: 'Equações Polinomiais',
        links: [
            { texto: 'Gerador de Equações', url: 'Pages/equacoes.html' },
            { texto: 'Exercícios', url: 'Pages/exercicios.html' }
        ]
    }
    // Outros tópicos podem ser adicionados aqui
];

// Função para filtrar tópicos baseado na pesquisa
function filtrarTopicos(termo) {
    return topicos.filter(topico => 
        topico.nome.toLowerCase().includes(termo.toLowerCase()) ||
        topico.links.some(link => link.texto.toLowerCase().includes(termo.toLowerCase()))
    );
}

// Função para atualizar a interface com os tópicos filtrados
function atualizarInterface(topicosFiltrados) {
    const container = document.querySelector('.subjects-container');
    container.innerHTML = '';

    if (topicosFiltrados.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum resultado encontrado.</p>';
        return;
    }

    topicosFiltrados.forEach(topico => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject';
        
        const h2 = document.createElement('h2');
        h2.textContent = topico.nome;
        
        const linksDiv = document.createElement('div');
        linksDiv.className = 'subject-links';
        
        topico.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'subject-link';
            a.textContent = link.texto;
            linksDiv.appendChild(a);
        });
        
        subjectDiv.appendChild(h2);
        subjectDiv.appendChild(linksDiv);
        container.appendChild(subjectDiv);
    });
}

// Event listener para o campo de pesquisa
document.getElementById('search-input').addEventListener('input', (e) => {
    const termo = e.target.value.trim();
    const topicosFiltrados = filtrarTopicos(termo);
    atualizarInterface(topicosFiltrados);
}); 