/* ============================================================
   PORTFÓLIO — RAISSA LANDES AGUIAR
   Arquivo: script.js
   Efeitos: menu mobile, navegação ativa, animações ao rolar,
            efeito de digitação, anéis de habilidade e formulário.
   ============================================================ */

"use strict";

/* ---------- 1. MENU MOBILE (hambúrguer) ---------- */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function fecharMenu() {
  navMenu.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
}

navToggle.addEventListener("click", () => {
  const aberto = navMenu.classList.toggle("open");
  navToggle.classList.toggle("active", aberto);
  navToggle.setAttribute("aria-expanded", String(aberto));
  navToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao clicar em um link (útil no celular)
navLinks.forEach((link) => link.addEventListener("click", fecharMenu));

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (evento) => {
  const clicouFora =
    !navMenu.contains(evento.target) && !navToggle.contains(evento.target);
  if (clicouFora && navMenu.classList.contains("open")) {
    fecharMenu();
  }
});

/* ---------- 2. SOMBRA NA BARRA DE NAVEGAÇÃO AO ROLAR ---------- */
const navbar = document.getElementById("navbar");

function atualizarNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
}

window.addEventListener("scroll", atualizarNavbar, { passive: true });
atualizarNavbar(); // executa uma vez ao carregar a página

/* ---------- 3. LINK ATIVO CONFORME A SEÇÃO VISÍVEL ---------- */
// Observa qual seção está no meio da tela e destaca o link do menu.
const secoes = document.querySelectorAll("main section[id]");

const opcoesSecao = {
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

const observadorSecoes = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      const id = entrada.target.getAttribute("id");
      navLinks.forEach((link) => {
        const ativo = link.getAttribute("href") === "#" + id;
        link.classList.toggle("active", ativo);
      });
    }
  });
}, opcoesSecao);

secoes.forEach((secao) => observadorSecoes.observe(secao));

/* ---------- 4. ANIMAÇÃO DE REVELAR AO ROLAR ---------- */
const elementosReveal = document.querySelectorAll(".reveal");

const observadorReveal = new IntersectionObserver(
  (entradas, observador) => {
    entradas.forEach((entrada, indice) => {
      if (entrada.isIntersecting) {
        // Pequeno atraso em cascata para os elementos que aparecem juntos
        setTimeout(() => {
          entrada.target.classList.add("visible");
        }, indice * 90);
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12 }
);

elementosReveal.forEach((elemento) => observadorReveal.observe(elemento));

/* ---------- 5. ANÉIS DE HABILIDADE ---------- */
// Quando o painel de habilidades aparece na tela, os anéis se preenchem.
const painelHabilidades = document.getElementById("skills-panel");

if (painelHabilidades) {
  const observadorSkills = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observadorSkills.observe(painelHabilidades);
}

/* ---------- 6. EFEITO DE DIGITAÇÃO NO INÍCIO ---------- */
const frases = [
  "Estudante de Desenvolvimento de Sistemas",
  "Futura desenvolvedora full stack",
  "Apaixonada por tecnologia",
];

const elementoDigitar = document.getElementById("typewriter");

const TEMPO_DIGITANDO = 65;   // velocidade ao escrever (ms por letra)
const TEMPO_APAGANDO = 32;    // velocidade ao apagar (ms por letra)
const PAUSA_FRASE = 2200;     // pausa com a frase completa (ms)

let indiceFrase = 0;
let indiceLetra = 0;
let apagando = false;

function digitar() {
  if (!elementoDigitar) return;

  const fraseAtual = frases[indiceFrase];

  if (!apagando) {
    // Escrevendo...
    indiceLetra++;
    elementoDigitar.textContent = fraseAtual.slice(0, indiceLetra);

    if (indiceLetra === fraseAtual.length) {
      apagando = true;
      setTimeout(digitar, PAUSA_FRASE);
      return;
    }
    setTimeout(digitar, TEMPO_DIGITANDO);
  } else {
    // Apagando...
    indiceLetra--;
    elementoDigitar.textContent = fraseAtual.slice(0, indiceLetra);

    if (indiceLetra === 0) {
      apagando = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
    }
    setTimeout(digitar, TEMPO_APAGANDO);
  }
}

digitar();

/* ---------- 7. FORMULÁRIO DE CONTATO ---------- */
// Como o portfólio é estático, o envio abre o aplicativo de e-mail
// do visitante com a mensagem já pronta (mailto:).
const formulario = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const EMAIL_DESTINO = "raissalandes12@email.com"; // <-- troque pelo seu e-mail

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  const assunto = encodeURIComponent("Contato pelo portfólio — " + nome);
  const corpo = encodeURIComponent(
    "Nome: " + nome + "\nE-mail: " + email + "\n\nMensagem:\n" + mensagem
  );

  window.location.href =
    "mailto:" + EMAIL_DESTINO + "?subject=" + assunto + "&body=" + corpo;

  feedback.textContent =
    "Abrindo seu aplicativo de e-mail... Se preferir, escreva direto para " +
    EMAIL_DESTINO +
    ".";
  feedback.classList.add("sucesso");

  formulario.reset();
});

/* ---------- 8. ANO AUTOMÁTICO NO RODAPÉ ---------- */
const anoAtual = document.getElementById("year");
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

/* ---------- 9. FUNDO GALÁXIA (estrelas e meteoros) ---------- */
// Cria as estrelas e os meteoros do fundo de forma aleatória,
// para que o céu nunca fique exatamente igual a cada visita.
function criarGalaxia() {
  const ceuEstrelas = document.getElementById("estrelas");
  const ceuMeteoros = document.getElementById("meteoros");

  if (!ceuEstrelas || !ceuMeteoros) return;

  // Estrelas: pontos que piscam em ritmos diferentes
  const TOTAL_ESTRELAS = 110;
  for (let i = 0; i < TOTAL_ESTRELAS; i++) {
    const estrela = document.createElement("span");
    estrela.className = "star";

    const tamanho = Math.random() * 2 + 1; // entre 1px e 3px
    estrela.style.width = tamanho.toFixed(1) + "px";
    estrela.style.height = tamanho.toFixed(1) + "px";
    estrela.style.top = (Math.random() * 100).toFixed(1) + "%";
    estrela.style.left = (Math.random() * 100).toFixed(1) + "%";
    estrela.style.setProperty("--dur", (Math.random() * 3 + 2).toFixed(2) + "s");
    estrela.style.setProperty("--op", (Math.random() * 0.55 + 0.35).toFixed(2));
    estrela.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";

    // As estrelas maiores ganham um brilho extra
    if (tamanho > 2.4) estrela.classList.add("star-brilho");

    ceuEstrelas.appendChild(estrela);
  }

  // Meteoros: riscos luminosos que cruzam o céu
  const TOTAL_METEOROS = 7;
  for (let i = 0; i < TOTAL_METEOROS; i++) {
    const meteoro = document.createElement("span");
    meteoro.className = "meteor";

    meteoro.style.top = (Math.random() * 45).toFixed(1) + "%";
    meteoro.style.left = (Math.random() * 70 + 25).toFixed(1) + "%";
    meteoro.style.setProperty("--dur", (Math.random() * 3 + 4).toFixed(2) + "s");
    meteoro.style.animationDelay = (Math.random() * 10).toFixed(2) + "s";

    ceuMeteoros.appendChild(meteoro);
  }
}

criarGalaxia();
