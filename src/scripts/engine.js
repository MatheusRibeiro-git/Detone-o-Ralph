// Objeto `state` armazena informações do jogo
const state = {
    view: {
        // Elementos da interface do usuário (DOM)
        squares: document.querySelectorAll(".square"), // Lista de todos os quadrados
        enemy: document.querySelector("enemy"), // Elemento do inimigo (se aplicável)
        timeLeft: document.querySelector("#time-left"), // Elemento que exibe o tempo restante
        score: document.querySelector("#score"), // Elemento que exibe a pontuação
    },
    values: {
        // Valores do jogo
        gameVelocity: 1000, // Velocidade do jogo em milissegundos (intervalo entre quadrados inimigos)
        hitPosition: 0, // ID do quadrado atualmente como inimigo (0 indica nenhum inimigo ativo)
        result: 0, // Pontuação atual do jogador
        currentTime: 60, // Tempo restante do jogo em segundos
    },
    actions: {
        // Identificadores de intervalos
        countDownTimerId: setInterval(countDown, 1000), // Contagem regressiva
        timerId: setInterval(randomSquare, 1000), // Quadrado inimigo aleatório
    },
};

function gameOver() {
    // Exibir mensagem de fim de jogo (pode ser personalizada)
    alert("Fim de Jogo! Sua pontuação: " + state.values.result);
    alert("Recarregue a página para jogar novamente...")
    // Limpar intervalos (já feito em countDown)
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    // Remover a classe "enemy" de todos os quadrados (para garantir que nenhum inimigo permaneça)
    state.view.squares.forEach((square) => square.classList.remove("enemy"));

    // Desabilitar todos os quadrados para evitar cliques após o fim do jogo
    state.view.squares.forEach((square) => square.removeEventListener("mousedown"));

}

// Função para contagem regressiva
function countDown() {
    state.values.currentTime--; // Decrementar tempo restante
    state.view.timeLeft.textContent = state.values.currentTime; // Atualizar elemento de tempo

    if (state.values.currentTime <= 0) {
        // Fim de jogo
        gameOver();
    }
}

// Função para tocar som
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`); // Criar objeto de áudio
    audio.volume = 0.09; // Definir volume (opcional)
    audio.play(); // Reproduzir som
}

// Função para selecionar quadrado inimigo aleatório
function randomSquare() {
    // Remover classe "enemy" de todos os quadrados
    state.view.squares.forEach((square) => square.classList.remove("enemy"));

    let randomNumber = Math.floor(Math.random() * 9); // Gerar número aleatório (0-8)
    let randomSquare = state.view.squares[randomNumber]; // Selecionar quadrado correspondente
    randomSquare.classList.add("enemy"); // Adicionar classe "enemy" ao quadrado selecionado
    state.values.hitPosition = randomSquare.id; // Atualizar ID do inimigo ativo
}

// Função para adicionar listener de clique aos quadrados
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                // Acerto (clique no quadrado inimigo)
                state.values.result++; // Incrementar pontuação
                state.view.score.textContent = state.values.result; // Atualizar elemento de pontuação
                state.values.hitPosition = null; // Limpar ID do inimigo ativo
                playSound("hit"); // Tocar som de acerto
            }
        });
    });
}

// Função para inicializar o jogo
function initialize() {
    addListenerHitBox(); // Adicionar listener de clique
}

initialize(); // Iniciar o jogo