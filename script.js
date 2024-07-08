const palavras = ["banana", "carro", "casa", "computador", "programador"];
let palavraSecreta = "";
let letrasChutadas = [];
let tentativasRestantes = 6;
let bonecoPartes = ["cabeca", "tronco", "bracos", "pernas", "pes"];

function sortearPalavra() {
    palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
    console.log(palavraSecreta); // Para ver a palavra secreta no console

    mostrarPalavraSecreta();
    atualizarTentativasRestantes();
}

function mostrarPalavraSecreta() {
    const palavra = document.getElementById("palavra-secreta");
    palavra.innerHTML = "";

    for (let letra of palavraSecreta) {
        if (letrasChutadas.includes(letra)) {
            palavra.innerHTML += letra + " ";
        } else {
            palavra.innerHTML += "_ ";
        }
    }
}

function atualizarTentativasRestantes() {
    const tentativas = document.getElementById("tentativas-restantes");
    tentativas.textContent = tentativasRestantes;
}

function mostrarBonecoParte() {
    const boneco = document.getElementById("boneco");
    const partes = boneco.querySelectorAll("div");
    partes[5 - tentativasRestantes].style.display = "block";
}

function chutarLetra() {
    const letra = document.getElementById("letra-chute").value.toUpperCase();
    document.getElementById("letra-chute").value = ""; // Limpar o campo de input

    if (!letra || letra.length !== 1 || letrasChutadas.includes(letra)) {
        return;
    }

    letrasChutadas.push(letra);
    mostrarPalavraSecreta();

    if (palavraSecreta.includes(letra)) {
        console.log("Letra correta!");
    } else {
        tentativasRestantes--;
        atualizarTentativasRestantes();
        mostrarBonecoParte();

        if (tentativasRestantes === 0) {
            gameOver("Você perdeu!");
        }
    }

    verificarVitoria();
}

function verificarVitoria() {
    let acertos = 0;
    for (let letra of palavraSecreta) {
        if (letrasChutadas.includes(letra)) {
            acertos++;
        }
    }

    if (acertos === palavraSecreta.length) {
        gameOver("Você ganhou!");
    }
}

function gameOver(mensagem) {
    document.getElementById("letra-chute").disabled = true;
    document.getElementById("mensagem-jogo").textContent = mensagem;
}

sortearPalavra();