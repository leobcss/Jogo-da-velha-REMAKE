'use strict';
// SELECIONANDO ELEMENTOS
const casas = document.querySelectorAll('.casa');
const jogador0 = document.querySelector('.jogador-0');
const jogador1 = document.querySelector('.jogador-1');
const placar0 = document.getElementById('placar-0');
const placar1 = document.getElementById('placar-1');
const nomeJogador0 = document.getElementById('nome-jogador-0');
const nomeJogador1 = document.getElementById('nome-jogador-1');
const inputNome0 = document.getElementById('input-0');
const inputNome1 = document.getElementById('input-1');
const mensagem = document.querySelector('.mensagem');
// Casas do Tabuleiro
const a1 = document.getElementById('a1');
const a2 = document.getElementById('a2');
const a3 = document.getElementById('a3');

const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');

const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
// Modais
const overlay = document.querySelector('.overlay');
const modal = document.querySelectorAll('.modal');
const modalJogadores = document.querySelector('.modal-jogadores');
const modalModo = document.querySelector('.modal-modo');
const modalInfo = document.querySelector('.modal-info');
// Botões
const jogadores = document.querySelector('.botao-jogadores');
const xis = document.getElementById('botao-X-modal-jogadores');
const bola = document.getElementById('botao-O-modal-jogadores');
const pronto = document.getElementById('botao-pronto-modal-jogadores');
const modo = document.querySelector('.botao-modo');
const partidaSimples = document.getElementById('partida-simples');
const melhorDeTres = document.getElementById('melhor-de-3');
const melhorDeCinco = document.getElementById('melhor-de-5');
const reset = document.querySelector('.botao-reset');
const info = document.querySelector('.botao-info');
const proximaPartida = document.querySelector('.botao-proxima-partida');
const close = document.querySelectorAll('.botao-fecha-modal');

// CONDIÇÕES E VARIÁVEIS INICIAIS
let placar, jogadorAtivo, jogando, i, numeroDaPartida;
let modoPartidaSimples = true;
let modoMelhorDeTres = false;
let modoMelhorDeCinco = false;
let bolaXis = ['X', 'O']; // Posição 0 => jogador 1; Posição 1 => jogador 2;

const init = function () {
  // Variáveis
  numeroDaPartida = 1;
  placar = [0, 0];
  jogadorAtivo = 0;
  jogando = true;
  // Elementos DOM
  placar0.textContent = 0;
  placar1.textContent = 0;
  mensagem.textContent = `Partida ${numeroDaPartida}`;
  // Zera marcações
  for (i = 0; i < casas.length; i++) casas[i].textContent = '';

  jogador0.classList.remove('vencedor');
  jogador1.classList.remove('vencedor');
  jogador0.classList.add('jogador-ativo');
  jogador1.classList.remove('jogador-ativo');
};
init();

// Ganhou Partida
const ganhouPartida = function () {
  placar[jogadorAtivo] += 1;
  document.getElementById(`placar-${jogadorAtivo}`).textContent =
    placar[jogadorAtivo];
  jogando = false;
  proximaPartida.classList.remove('hidden');
};
// Ganhou Jogo
const ganhouJogo = function () {
  document.querySelector(`.jogador-${jogadorAtivo}`).classList.add('vencedor');
  mensagem.textContent = `${
    document.getElementById(`input-${jogadorAtivo}`).value
  } ganhou!`;
  placar[jogadorAtivo] += 1;
  document.getElementById(`placar-${jogadorAtivo}`).textContent =
    placar[jogadorAtivo];
  jogando = false;
};
// Checa vitória a cada jogada
const checaJogada = function () {
  if (
    ((a1.textContent === a2.textContent && a1.textContent === a3.textContent) ||
      (a1.textContent === b2.textContent &&
        a1.textContent === c3.textContent) ||
      (a1.textContent === b1.textContent &&
        a1.textContent === c1.textContent)) &&
    a1.textContent !== ''
  ) {
    if (
      modoPartidaSimples ||
      (modoMelhorDeTres && placar[jogadorAtivo] === 1) ||
      (modoMelhorDeCinco && placar[jogadorAtivo] === 2)
    ) {
      ganhouJogo();
    } else {
      ganhouPartida();
    }
  } else if (
    ((b2.textContent === b1.textContent && b2.textContent === b3.textContent) ||
      (b2.textContent === a2.textContent &&
        b2.textContent === c2.textContent) ||
      (b2.textContent === a3.textContent &&
        b2.textContent === c1.textContent)) &&
    b2.textContent !== ''
  ) {
    if (
      modoPartidaSimples ||
      (modoMelhorDeTres && placar[jogadorAtivo] === 1) ||
      (modoMelhorDeCinco && placar[jogadorAtivo] === 2)
    ) {
      ganhouJogo();
    } else {
      ganhouPartida();
    }
  } else if (
    ((c3.textContent === a3.textContent && c3.textContent === b3.textContent) ||
      (c3.textContent === c1.textContent &&
        c3.textContent === c2.textContent)) &&
    c3.textContent !== ''
  ) {
    if (
      modoPartidaSimples ||
      (modoMelhorDeTres && placar[jogadorAtivo] === 1) ||
      (modoMelhorDeCinco && placar[jogadorAtivo] === 2)
    ) {
      ganhouJogo();
    } else {
      ganhouPartida();
    }
  } else if (
    a1.textContent !== '' &&
    a2.textContent !== '' &&
    a3.textContent !== '' &&
    b1.textContent !== '' &&
    b2.textContent !== '' &&
    b3.textContent !== '' &&
    c1.textContent !== '' &&
    c2.textContent !== '' &&
    c3.textContent !== ''
  ) {
    mensagem.textContent = `Deu Velha!`;
    jogando = false;
    proximaPartida.classList.remove('hidden');
  }
};

// Troca Jogador a cada jogada
const trocaJogador = function () {
  if (jogando) {
    jogadorAtivo = jogadorAtivo === 0 ? 1 : 0;
    jogador0.classList.toggle('jogador-ativo');
    jogador1.classList.toggle('jogador-ativo');
  }
};

// Marca "X" ou "O"

const marcar = function () {
  if (
    jogando &&
    jogadorAtivo === 0 &&
    this.textContent === '' &&
    bolaXis[jogadorAtivo] === 'X'
  ) {
    this.textContent = bolaXis[jogadorAtivo];
    checaJogada();
    trocaJogador();
  } else if (
    jogando &&
    jogadorAtivo === 0 &&
    this.textContent === '' &&
    bolaXis[jogadorAtivo] === 'O'
  ) {
    this.textContent = bolaXis[jogadorAtivo];
    checaJogada();
    trocaJogador();
  } else if (
    jogando &&
    jogadorAtivo === 1 &&
    this.textContent === '' &&
    bolaXis[jogadorAtivo] === 'O'
  ) {
    this.textContent = bolaXis[jogadorAtivo];
    checaJogada();
    trocaJogador();
  } else if (
    jogando &&
    jogadorAtivo === 1 &&
    this.textContent === '' &&
    bolaXis[jogadorAtivo] === 'X'
  ) {
    this.textContent = bolaXis[jogadorAtivo];
    checaJogada();
    trocaJogador();
  }
};

for (i = 0; i < casas.length; i++) casas[i].addEventListener('click', marcar);

// FUNÇÕES BOTÕES
// Função abre modal Jogadores
const abreModalJogadores = function () {
  modalJogadores.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Função abre modal Modo
const abreModalModo = function () {
  modalModo.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Função abre modal Info
const abreModalInfo = function () {
  modalInfo.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Função fecha modal
const fechaModal = function () {
  for (i = 0; i < modal.length; i++) modal[i].classList.add('hidden');
  overlay.classList.add('hidden');
};

// BOTÕES
// JOGADORES
jogadores.addEventListener('click', abreModalJogadores);

// X, O
const setaXis = function () {
  bolaXis = ['X', 'O'];
};
const setaBola = function () {
  bolaXis = ['O', 'X'];
};
xis.addEventListener('click', setaXis); // Para Jogador 1
bola.addEventListener('click', setaBola); // Para Jogador 1

// Pronto
const setaNome = function () {
  nomeJogador0.textContent = inputNome0.value;
  nomeJogador1.textContent = inputNome1.value;
  fechaModal();
};
pronto.addEventListener('click', setaNome);

// MODO
modo.addEventListener('click', abreModalModo);

// Partida Simples
const setaPartidaSimples = function () {
  modoPartidaSimples = true;
  modoMelhorDeTres = false;
  modoMelhorDeCinco = false;
  fechaModal();
};
partidaSimples.addEventListener('click', setaPartidaSimples);

// Melhor de 3
const setaMelhorDeTres = function () {
  modoPartidaSimples = false;
  modoMelhorDeTres = true;
  modoMelhorDeCinco = false;
  fechaModal();
};
melhorDeTres.addEventListener('click', setaMelhorDeTres);

// Melhor de 5
const setaMelhorDeCinco = function () {
  modoPartidaSimples = false;
  modoMelhorDeTres = false;
  modoMelhorDeCinco = true;
  fechaModal();
};
melhorDeCinco.addEventListener('click', setaMelhorDeCinco);

// RESET
reset.addEventListener('click', init);

// i
info.addEventListener('click', abreModalInfo);

// PRÓXIMA PARTIDA
const iniciaProximaPartida = function () {
  mensagem.textContent = `Partida ${(numeroDaPartida += 1)}`;
  for (i = 0; i < casas.length; i++) casas[i].textContent = '';
  jogando = true;
  proximaPartida.classList.add('hidden');
};
proximaPartida.addEventListener('click', iniciaProximaPartida);

// X (CLOSE)
for (i = 0; i < close.length; i++)
  close[i].addEventListener('click', fechaModal);

overlay.addEventListener('click', fechaModal);
document.addEventListener('keydown', function (e) {
  for (i = 0; i < modal.length; i++)
    if (e.key === 'Escape' && !modal[i].classList.contains('hidden')) {
      fechaModal();
    }
});
