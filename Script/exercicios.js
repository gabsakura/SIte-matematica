// Banco de questões pré-programadas
const questoes = [
    {
        pergunta: "Seja Q(x) a divisão do polinômio 2x³ - 4x² + 2x pelo polinômio 2x, o valor de Q(1) é:",
        opcoes: [
            "-1",
            "0",
            "1",
            "2",
            "3"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Seja P(x) = 4x⁴ - 4x³ + x - 1, ao realizar a sua divisão pelo polinômio D(x) = 4x³ + 1 encontramos como resto:",
        opcoes: [
            "x - 1",
            "x + 1",
            "x + 2",
            "0",
            "1"
        ],
        respostaCorreta: 3
    },
    {
        pergunta: "Ao ser dividido pelo polinômio x - 2, o polinômio x⁴ - 2x³ + 2x + 1 deixa resto igual a:",
        opcoes: [
            "1",
            "2",
            "3",
            "4",
            "5"
        ],
        respostaCorreta: 4
    },
    {
        pergunta: "O polinômio P(x) foi reescrito como o produto entre os polinômios Q(x) e D(x). Sabendo que P(x) = 15x² + 11x + 2 e que D(x) = 3x + 1, o polinômio Q(x) será igual a:",
        opcoes: [
            "5x",
            "5x + 2",
            "5x - 2",
            "2x + 5",
            "2x - 5"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Dados os polinômios P(x) = 6x⁴ - x³ + 3x² - x + 1 e D(x) = 2x² + x - 3, se Q(x) for o quociente da divisão entre eles, o valor de Q(2) é:",
        opcoes: [
            "9",
            "10",
            "12",
            "15",
            "18"
        ],
        respostaCorreta: 3
    },
    {
        pergunta: "Considerando os polinômios P(x) = 2x³ - x² - 8x + 1 e Q(x) = 8x² + 2x - 3, o valor de P(2) / Q(0) é:",
        opcoes: [
            "1",
            "0",
            "-1",
            "2",
            "-2"
        ],
        respostaCorreta: 0
    },
    {
        pergunta: "Dado o polinômio P(x) = x³ - kx² + 9x, o valor de k que faz com que esse polinômio seja divisível pelo polinômio x - 3 é:",
        opcoes: [
            "-3",
            "-4",
            "-5",
            "-6",
            "-7"
        ],
        respostaCorreta: 3
    },
    {
        pergunta: "Simplifique a expressão 3a²b³ - 9a³b² + 6ab pela expressão '3ab', encontramos o polinômio:",
        opcoes: [
            "ab - 3a² + 2",
            "ab² + a²b + 3",
            "ab² - 3a²b + 2",
            "a²b³ - 3a³b² + 2ab",
            "3a²b³ - 9a³b² + 2"
        ],
        respostaCorreta: 2
    },
    {
        pergunta: "Sobre a divisão de polinômios podemos afirmar que:\n\nI. O grau do polinômio que representa o resto é sempre igual ou maior que o grau do polinômio que representa o divisor\n\nII. Quando o resto da divisão de P(x) por D(x) é 0, dizemos que o polinômio P(x) é divisível por D(x)\n\nMarque a alternativa correta:",
        opcoes: [
            "Somente a afirmativa I é verdadeira",
            "Somente a afirmativa II é verdadeira",
            "As duas afirmativas são verdadeiras",
            "As duas afirmações são falsas"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Considere o polinômio P(x) = x³ - x² + 3x - 3 e o polinômio Q(x) = x - 1. Podemos afirmar que:",
        opcoes: [
            "P(x) é divisível por Q(x)",
            "P(x) deixa resto 1 na divisão por Q(x)",
            "P(x) deixa resto 2 na divisão por Q(x)",
            "P(x) deixa resto 3 na divisão por Q(x)",
            "P(x) deixa resto 5 na divisão por Q(x)"
        ],
        respostaCorreta: 0
    }
];

// Variáveis globais
let questaoAtual = 0;
let acertos = 0;
let opcaoSelecionada = null;

// Elementos do DOM
const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnVerificar = document.getElementById('btn-verificar');
const btnProxima = document.getElementById('btn-proxima');
const containerQuestao = document.getElementById('questao-container');
const containerResultado = document.getElementById('resultado-final');
const progresso = document.getElementById('progresso');
const feedback = document.getElementById('feedback');

// Função para iniciar os exercícios
function iniciarExercicios() {
    questaoAtual = 0;
    acertos = 0;
    btnIniciar.style.display = 'none';
    containerQuestao.style.display = 'block';
    containerResultado.style.display = 'none';
    mostrarQuestao();
}

// Função para mostrar a questão atual
function mostrarQuestao() {
    if (questaoAtual >= questoes.length) {
        mostrarResultadoFinal();
        return;
    }

    const questao = questoes[questaoAtual];

    // Atualizar interface
    progresso.textContent = `Questão ${questaoAtual + 1} de ${questoes.length}`;
    document.getElementById('pergunta').textContent = questao.pergunta;

    // Exibir opções
    exibirOpcoes(questao.opcoes);

    // Resetar estado
    opcaoSelecionada = null;
    feedback.style.display = 'none';
    btnVerificar.style.display = 'block';
    btnProxima.style.display = 'none';
}

// Função para exibir as opções
function exibirOpcoes(opcoes) {
    const opcoesGrid = document.querySelector('.opcoes-grid');
    opcoesGrid.innerHTML = '';

    opcoes.forEach((opcao, index) => {
        const div = document.createElement('div');
        div.className = 'opcao';
        div.textContent = opcao;
        div.onclick = () => selecionarOpcao(div, index);
        opcoesGrid.appendChild(div);
    });
}

// Função para selecionar uma opção
function selecionarOpcao(elemento, index) {
    const opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
    elemento.classList.add('selecionada');
    opcaoSelecionada = index;
}

// Função para verificar a resposta
function verificarResposta() {
    if (opcaoSelecionada === null) {
        alert('Por favor, selecione uma opção!');
        return;
    }

    const questao = questoes[questaoAtual];
    const acertou = opcaoSelecionada === questao.respostaCorreta;

    if (acertou) {
        acertos++;
    }

    // Marcar respostas
    const opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach((opcao, index) => {
        if (index === opcaoSelecionada) {
            opcao.classList.add(acertou ? 'correta' : 'incorreto');
        } else if (index === questao.respostaCorreta) {
            opcao.classList.add('correta');
        }
    });

    // Mostrar feedback
    feedback.style.display = 'block';
    feedback.className = 'feedback ' + (acertou ? 'correto' : 'incorreto');
    feedback.textContent = acertou ? 'Parabéns! Você acertou!' : 'Ops! Tente novamente!';

    // Mostrar botão de próxima questão
    btnVerificar.style.display = 'none';
    btnProxima.style.display = 'block';
}

// Função para ir para a próxima questão
function proximaQuestao() {
    questaoAtual++;
    mostrarQuestao();
}

// Função para mostrar o resultado final
function mostrarResultadoFinal() {
    containerQuestao.style.display = 'none';
    containerResultado.style.display = 'block';
    document.getElementById('acertos').textContent = acertos;
    document.getElementById('total-questoes').textContent = questoes.length;
}

// Função para reiniciar os exercícios
function reiniciarExercicios() {
    containerResultado.style.display = 'none';
    btnIniciar.style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    btnIniciar.addEventListener('click', iniciarExercicios);
    btnReiniciar.addEventListener('click', reiniciarExercicios);
    btnVerificar.addEventListener('click', verificarResposta);
    btnProxima.addEventListener('click', proximaQuestao);
}); 