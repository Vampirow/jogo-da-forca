const palavras = {
  facil: [
    "gato",
    "casa",
    "mesa",
    "bola",
    "carro",
    "casa",
    "nuvem",
    "tempo",
    "festa",
    "nobre",
    "vento",
    "luz",
    "chuva",
    "praia",
    "fogo",
    "campo",
    "ninja",
    "feliz",
    "tigre",
    "verde",
    "rocha",
    "folha",
    "sonho",
    "livro",
    "dente",
  ],
  medio: [
    "computador",
    "javascript",
    "internet",
    "programa",
    "amável",
    "brilho",
    "estrela",
    "foguete",
    "montanha",
    "nuvens",
    "planeta",
    "segredo",
    "viagem",
    "marítimo",
    "tesouro",
    "caminho",
    "guerrei",
    "mágico",
    "sombra",
    "vento",
    "pássaro",
    "mistério",
    "bravura",
    "tempest",
  ],
  dificil: [
    "desenvolvimento",
    "engenharia",
    "criptografia",
    "seguranca",
    "aventuras",
    "brilhante",
    "criatividade",
    "descoberta",
    "eletrônico",
    "fenômeno",
    "galáxias",
    "hipótese",
    "iluminação",
    "jornada",
    "labirinto",
    "maravilhoso",
    "notificação",
    "observação",
    "programador",
    "quebra-cabeça",
    "realização",
    "tecnologia",
    "universo",
    "velocidade",
  ],
};

let palavraSecreta = "";
let tentativasRestantes = 6;
let letrasCorretas = new Set();
let letrasErradas = new Set();
const canvas = document.getElementById("forca");
const ctx = canvas.getContext("2d");

function iniciarJogo() {
  const dificuldade = document.getElementById("dificuldade").value;
  palavraSecreta =
    palavras[dificuldade][
      Math.floor(Math.random() * palavras[dificuldade].length)
    ].toUpperCase();

  tentativasRestantes = 6;
  letrasCorretas.clear();
  letrasErradas.clear();

  atualizarInterface();
  desenharForca();
}

function atualizarInterface() {
  let palavraAtualizada = palavraSecreta
    .split("")
    .map((l) => (letrasCorretas.has(l) ? l : "_"))
    .join(" ");

  document.getElementById("palavra").textContent = palavraAtualizada;
  document.getElementById("tentativas").textContent = tentativasRestantes;
  document.getElementById("letras-usadas").textContent = [
    ...letrasErradas,
  ].join(", ");
}

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000";

  // Base da forca
  ctx.beginPath();
  ctx.moveTo(10, 240);
  ctx.lineTo(190, 240);
  ctx.stroke();

  // Poste
  ctx.moveTo(50, 240);
  ctx.lineTo(50, 20);
  ctx.lineTo(130, 20);
  ctx.lineTo(130, 50);
  ctx.stroke();
}

function desenharBoneco(erros) {
  ctx.strokeStyle = "#D32F2F";
  ctx.lineWidth = 3;

  switch (erros) {
    case 1:
      desenharParte(() => {
        ctx.beginPath();
        ctx.arc(130, 70, 20, 0, Math.PI * 2);
        ctx.stroke();
      });
      break;
    case 2:
      desenharParte(() => {
        ctx.moveTo(130, 90);
        ctx.lineTo(130, 160);
        ctx.stroke();
      });
      break;
    case 3:
      desenharParte(() => {
        ctx.moveTo(130, 100);
        ctx.lineTo(100, 130);
        ctx.stroke();
      });
      break;
    case 4:
      desenharParte(() => {
        ctx.moveTo(130, 100);
        ctx.lineTo(160, 130);
        ctx.stroke();
      });
      break;
    case 5:
      desenharParte(() => {
        ctx.moveTo(130, 160);
        ctx.lineTo(110, 200);
        ctx.stroke();
      });
      break;
    case 6:
      desenharParte(() => {
        ctx.moveTo(130, 160);
        ctx.lineTo(150, 200);
        ctx.stroke();
      });
      break;
  }
}

function desenharParte(callback) {
  setTimeout(callback, 500);
}

function verificarLetra(letra) {
  if (letrasCorretas.has(letra) || letrasErradas.has(letra)) return;

  if (palavraSecreta.includes(letra)) {
    letrasCorretas.add(letra);
  } else {
    letrasErradas.add(letra);
    tentativasRestantes--;
    desenharBoneco(6 - tentativasRestantes);
  }

  atualizarInterface();
  verificarFimDeJogo();
}

function verificarFimDeJogo() {
  let palavraAtualizada = palavraSecreta
    .split("")
    .map((l) => (letrasCorretas.has(l) ? l : "_"))
    .join(" ");

  if (!palavraAtualizada.includes("_")) {
    setTimeout(() => alert("Parabéns, você venceu!"), 300);
  } else if (tentativasRestantes === 0) {
    setTimeout(
      () => alert("Fim de jogo! A palavra era " + palavraSecreta),
      300
    );
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
    verificarLetra(e.key.toUpperCase());
  }
});

iniciarJogo();
