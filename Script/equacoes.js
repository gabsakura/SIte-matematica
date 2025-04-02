let respostaCorreta = null;
let opcaoSelecionada = null;
let opcoesAtuais = [];
let contadorQuestoes = 0;

// Variável global para armazenar os coeficientes atuais
let coeficientesAtuais = [];

// Função para gerar uma questão de múltipla escolha
function gerarQuestao() {
    try {
        const grau = parseInt(document.getElementById('grau').value);
        const coeficientes = [];
        
        // Gerar coeficientes aleatórios com números maiores
        for (let i = 0; i <= grau; i++) {
            const coeficiente = Math.floor(Math.random() * 20) - 10; // Números entre -10 e 10
            if (coeficiente === 0 && i === 0) {
                coeficientes.push(Math.random() > 0.5 ? 1 : -1); // Evitar coeficiente líder zero
            } else {
                coeficientes.push(coeficiente);
            }
        }
        
        // Armazenar coeficientes atuais
        coeficientesAtuais = coeficientes;
        
        // Calcular a resposta correta
        respostaCorreta = calcularResposta(coeficientes, grau);
        
        // Gerar opções de resposta
        opcoesAtuais = gerarOpcoes(respostaCorreta);
        
        // Exibir a questão
        exibirQuestao(coeficientes, opcoesAtuais);
        
        // Resetar estado
        opcaoSelecionada = null;
        document.getElementById('feedback').style.display = 'none';
        document.querySelector('.btn-verificar').style.display = 'block';
        document.querySelector('.btn-proxima').style.display = 'none';
        document.querySelector('.solucao-container').style.display = 'none';
        
        // Mostrar container da questão
        document.getElementById('questao-container').style.display = 'block';
        
        // Incrementar contador
        contadorQuestoes++;
        
        // Mostrar solução detalhada
        mostrarSolucaoDetalhada(coeficientes, grau);
        
    } catch (error) {
        console.error('Erro ao gerar questão:', error);
        alert('Ocorreu um erro ao gerar a questão. Por favor, tente novamente.');
        resetarInterface();
    }
}

// Função para mostrar solução detalhada
function mostrarSolucaoDetalhada(coeficientes, grau) {
    const solucaoContainer = document.getElementById('solucao-detalhada');
    solucaoContainer.innerHTML = '';
    
    const passos = [];
    switch(grau) {
        case 1:
            resolverEquacao1Grau(coeficientes, passos);
            break;
        case 2:
            resolverEquacao2Grau(coeficientes, passos);
            break;
        case 3:
            resolverEquacao3Grau(coeficientes, passos);
            break;
    }
    
    passos.forEach(passo => {
        const div = document.createElement('div');
        div.className = 'passo-solucao';
        div.textContent = passo;
        solucaoContainer.appendChild(div);
    });
}

// Função para resetar a interface
function resetarInterface() {
    opcaoSelecionada = null;
    respostaCorreta = null;
    opcoesAtuais = [];
    document.getElementById('feedback').style.display = 'none';
    document.querySelector('.btn-verificar').style.display = 'block';
    document.querySelector('.btn-proxima').style.display = 'none';
    document.getElementById('questao-container').style.display = 'none';
    document.getElementById('solucao-detalhada').innerHTML = '';
}

// Função para calcular a resposta correta
function calcularResposta(coeficientes, grau) {
    try {
        switch(grau) {
            case 1:
                return [-coeficientes[1] / coeficientes[0]];
            case 2:
                const delta = coeficientes[1] * coeficientes[1] - 4 * coeficientes[0] * coeficientes[2];
                if (delta < 0) return null;
                if (delta === 0) return [-coeficientes[1] / (2 * coeficientes[0])];
                return [
                    (-coeficientes[1] + Math.sqrt(delta)) / (2 * coeficientes[0]),
                    (-coeficientes[1] - Math.sqrt(delta)) / (2 * coeficientes[0])
                ];
            case 3:
                return resolverEquacao3GrauCompleta(coeficientes);
            default:
                return null;
        }
    } catch (error) {
        console.error('Erro ao calcular resposta:', error);
        return null;
    }
}

// Função para resolver equação de 3º grau completa
function resolverEquacao3GrauCompleta(coeficientes) {
    const a = coeficientes[0];
    const b = coeficientes[1];
    const c = coeficientes[2];
    const d = coeficientes[3];
    
    // Reduzir à forma x³ + px + q = 0
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    
    // Calcular discriminante
    const D = (q/2) * (q/2) + (p/3) * (p/3) * (p/3);
    
    if (D > 0) {
        // Uma raiz real e duas complexas
        const u = Math.cbrt(-q/2 + Math.sqrt(D));
        const v = Math.cbrt(-q/2 - Math.sqrt(D));
        return [u + v - b/(3*a)];
    } else if (D < 0) {
        // Três raízes reais distintas
        const phi = Math.acos(-q/(2 * Math.sqrt(-p*p*p/27)));
        const r = 2 * Math.sqrt(-p/3);
        return [
            r * Math.cos(phi/3) - b/(3*a),
            r * Math.cos((phi + 2*Math.PI)/3) - b/(3*a),
            r * Math.cos((phi + 4*Math.PI)/3) - b/(3*a)
        ];
    } else {
        // Três raízes reais (pelo menos duas iguais)
        const u = Math.cbrt(-q/2);
        return [
            2 * u - b/(3*a),
            -u - b/(3*a)
        ];
    }
}

// Função para gerar opções de resposta
function gerarOpcoes(respostasCorretas) {
    try {
        if (respostasCorretas === null) {
            return ['Sem solução real', 'x = 0', 'x = 1', 'x = -1'];
        }
        
        const opcoes = [...respostasCorretas];
        const variacao = Math.max(1, Math.abs(respostasCorretas[0]) * 0.5);
        
        while (opcoes.length < 4) {
            // Gerar opção positiva ou negativa baseada na resposta correta
            const opcao = respostasCorretas[0] + (Math.random() * variacao * 2 - variacao);
            // Garantir que a opção seja diferente das existentes
            if (!opcoes.some(o => Math.abs(o - opcao) < 0.01)) {
                opcoes.push(opcao);
            }
        }
        
        return opcoes.sort(() => Math.random() - 0.5);
    } catch (error) {
        console.error('Erro ao gerar opções:', error);
        return ['x = 0', 'x = 1', 'x = -1', 'x = 2'];
    }
}

// Função para exibir a questão
function exibirQuestao(coeficientes, opcoes) {
    // Exibir equação
    exibirEquacao(coeficientes);
    
    // Exibir opções
    const opcoesContainer = document.getElementById('opcoes');
    opcoesContainer.innerHTML = '';
    
    opcoes.forEach((opcao, index) => {
        const div = document.createElement('div');
        div.className = 'opcao';
        div.textContent = opcao === null ? 'Sem solução real' : `x = ${formatarNumero(opcao)}`;
        div.onclick = () => selecionarOpcao(div, index);
        opcoesContainer.appendChild(div);
    });
}

// Função para exibir a equação formatada
function exibirEquacao(coeficientes) {
    let equacao = '';
    const grau = coeficientes.length - 1;
    
    for (let i = 0; i < coeficientes.length; i++) {
        const coef = coeficientes[i];
        const exp = grau - i;
        
        if (coef !== 0) {
            if (i > 0) {
                equacao += coef > 0 ? ' + ' : ' - ';
            }
            
            if (Math.abs(coef) !== 1 || exp === 0) {
                equacao += Math.abs(coef);
            }
            
            if (exp > 0) {
                equacao += 'x';
                if (exp > 1) {
                    equacao += `^${exp}`;
                }
            }
        }
    }
    
    equacao += ' = 0';
    document.getElementById('equacao_display').textContent = equacao;
}

// Função para selecionar uma opção
function selecionarOpcao(elemento, index) {
    // Remover seleção anterior
    const opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
    
    // Selecionar nova opção
    elemento.classList.add('selecionada');
    opcaoSelecionada = index;
}

// Função para verificar a resposta
function verificarResposta() {
    try {
        if (opcaoSelecionada === null) {
            alert('Por favor, selecione uma opção!');
            return;
        }
        
        const opcoes = document.querySelectorAll('.opcao');
        const feedback = document.getElementById('feedback');
        const solucaoContainer = document.querySelector('.solucao-container');
        
        // Desabilitar seleção
        opcoes.forEach(opcao => opcao.style.pointerEvents = 'none');
        
        // Marcar resposta selecionada
        opcoes.forEach((opcao, index) => {
            if (index === opcaoSelecionada) {
                opcao.classList.add('incorreta');
            }
        });
        
        // Marcar respostas corretas
        const respostasCorretas = Array.isArray(respostaCorreta) ? respostaCorreta : [respostaCorreta];
        respostasCorretas.forEach(resposta => {
            const respostaIndex = opcoesAtuais.indexOf(resposta);
            if (respostaIndex !== -1) {
                opcoes[respostaIndex].classList.add('correta');
            }
        });
        
        // Mostrar feedback
        feedback.style.display = 'block';
        feedback.className = 'feedback ' + (respostasCorretas.includes(opcoesAtuais[opcaoSelecionada]) ? 'correto' : 'incorreto');
        
        if (respostasCorretas.includes(opcoesAtuais[opcaoSelecionada])) {
            feedback.textContent = 'Parabéns! Você acertou!';
        } else {
            const respostasFormatadas = respostasCorretas.map(r => formatarNumero(r)).join(' ou ');
            feedback.textContent = `Ops! As respostas corretas eram x = ${respostasFormatadas}`;
        }
        
        // Mostrar solução detalhada
        const grau = parseInt(document.getElementById('grau').value);
        mostrarSolucaoDetalhada(coeficientesAtuais, grau);
        solucaoContainer.style.display = 'block';
        
        // Mostrar botão de próxima questão
        document.querySelector('.btn-verificar').style.display = 'none';
        document.querySelector('.btn-proxima').style.display = 'inline-block';
        
    } catch (error) {
        console.error('Erro ao verificar resposta:', error);
        alert('Ocorreu um erro ao verificar a resposta. Por favor, tente novamente.');
        resetarInterface();
    }
}

// Função para resolver a equação
function resolverEquacao() {
    const coeficientes = document.getElementById('coeficientes').value.split(',').map(Number);
    const grau = coeficientes.length - 1;
    const passos = [];
    
    // Limpar passos anteriores
    document.getElementById('passos').innerHTML = '';
    
    // Resolver baseado no grau
    switch(grau) {
        case 1:
            resolverEquacao1Grau(coeficientes, passos);
            break;
        case 2:
            resolverEquacao2Grau(coeficientes, passos);
            break;
        case 3:
            resolverEquacao3Grau(coeficientes, passos);
            break;
        default:
            passos.push('Grau não suportado');
    }
    
    // Exibir passos
    passos.forEach(passo => {
        const div = document.createElement('div');
        div.className = 'passo';
        div.textContent = passo;
        document.getElementById('passos').appendChild(div);
    });
}

// Função para resolver equação de 1º grau
function resolverEquacao1Grau(coeficientes, passos) {
    const a = coeficientes[0];
    const b = coeficientes[1];
    
    passos.push(`Equação: ${a}x + ${b} = 0`);
    passos.push(`Isolando x: ${a}x = ${-b}`);
    passos.push(`Dividindo ambos os lados por ${a}: x = ${-b}/${a}`);
    passos.push(`Solução: x = ${-b/a}`);
}

// Função para resolver equação de 2º grau
function resolverEquacao2Grau(coeficientes, passos) {
    const a = coeficientes[0];
    const b = coeficientes[1];
    const c = coeficientes[2];
    
    passos.push(`Equação: ${a}x² + ${b}x + ${c} = 0`);
    passos.push(`Calculando o discriminante: Δ = b² - 4ac`);
    passos.push(`Δ = ${b}² - 4(${a})(${c})`);
    
    const delta = b * b - 4 * a * c;
    passos.push(`Δ = ${delta}`);
    
    if (delta < 0) {
        passos.push('Como Δ < 0, a equação não possui soluções reais.');
    } else if (delta === 0) {
        const x = -b / (2 * a);
        passos.push('Como Δ = 0, a equação possui uma única solução real:');
        passos.push(`x = ${x}`);
    } else {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        passos.push('Como Δ > 0, a equação possui duas soluções reais distintas:');
        passos.push(`x₁ = ${x1}`);
        passos.push(`x₂ = ${x2}`);
    }
}

// Função para resolver equação de 3º grau
function resolverEquacao3Grau(coeficientes, passos) {
    const a = coeficientes[0];
    const b = coeficientes[1];
    const c = coeficientes[2];
    const d = coeficientes[3];
    
    passos.push(`Equação: ${a}x³ + ${b}x² + ${c}x + ${d} = 0`);
    
    // Reduzir à forma x³ + px + q = 0
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    
    passos.push(`Reduzindo à forma x³ + px + q = 0:`);
    passos.push(`p = ${formatarNumero(p)}`);
    passos.push(`q = ${formatarNumero(q)}`);
    
    // Calcular discriminante
    const D = (q/2) * (q/2) + (p/3) * (p/3) * (p/3);
    passos.push(`Discriminante D = ${formatarNumero(D)}`);
    
    if (D > 0) {
        passos.push('Como D > 0, a equação possui uma raiz real e duas complexas.');
        const u = Math.cbrt(-q/2 + Math.sqrt(D));
        const v = Math.cbrt(-q/2 - Math.sqrt(D));
        const x = u + v - b/(3*a);
        passos.push(`x = ${formatarNumero(x)}`);
    } else if (D < 0) {
        passos.push('Como D < 0, a equação possui três raízes reais distintas.');
        const phi = Math.acos(-q/(2 * Math.sqrt(-p*p*p/27)));
        const r = 2 * Math.sqrt(-p/3);
        const x1 = r * Math.cos(phi/3) - b/(3*a);
        const x2 = r * Math.cos((phi + 2*Math.PI)/3) - b/(3*a);
        const x3 = r * Math.cos((phi + 4*Math.PI)/3) - b/(3*a);
        passos.push(`x₁ = ${formatarNumero(x1)}`);
        passos.push(`x₂ = ${formatarNumero(x2)}`);
        passos.push(`x₃ = ${formatarNumero(x3)}`);
    } else {
        passos.push('Como D = 0, a equação possui três raízes reais (pelo menos duas iguais).');
        const u = Math.cbrt(-q/2);
        const x1 = 2 * u - b/(3*a);
        const x2 = -u - b/(3*a);
        passos.push(`x₁ = ${formatarNumero(x1)}`);
        passos.push(`x₂ = ${formatarNumero(x2)}`);
    }
}

// Função para formatar número
function formatarNumero(numero) {
    if (numero === null) return 'Sem solução real';
    if (Number.isInteger(numero)) return numero.toString();
    return numero.toFixed(2);
} 