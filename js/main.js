/* ===================================
   ORBITALMED — main.js
   =================================== */


// Espera a página carregar completamente antes de rodar tudo
document.addEventListener("DOMContentLoaded", function () {
  menuMobile();
  faqAcordeao();
  formularioContato();
  formularioTriagem();
  animacaoFadeIn();
  scrollSuave();
});

/* ----------------------------------
   MENU MOBILE (botão hamburguer)
   ---------------------------------- */
function menuMobile() {
  var botao = document.querySelector(".menu-toggle");
  var menu = document.querySelector(".nav-menu");

  // Se não encontrar o botão ou o menu na página, para aqui
  if (!botao || !menu) {
    return;
  }

  // Quando o botão for clicado, abre ou fecha o menu
  botao.addEventListener("click", function () {
    var menuEstaAberto = menu.classList.contains("open");

    if (menuEstaAberto) {
      // Menu está aberto → fecha
      menu.classList.remove("open");
      botao.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    } else {
      // Menu está fechado → abre
      menu.classList.add("open");
      botao.classList.add("open");
      botao.setAttribute("aria-expanded", "true");
      botao.setAttribute("aria-label", "Fechar menu");
    }
  });

   // Quando qualquer link do menu for clicado, fecha o menu
  var links = menu.querySelectorAll("a");

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      menu.classList.remove("open");
      botao.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    });
  }
}

/* ----------------------------------
   FAQ — ACORDEÃO
   Só um item fica aberto por vez
   ---------------------------------- */
function faqAcordeao() {
  var perguntas = document.querySelectorAll(".faq-question");

  for (var i = 0; i < perguntas.length; i++) {
    perguntas[i].addEventListener("click", function () {
      var item = this.closest(".faq-item");
      var resposta = item.querySelector(".faq-answer");
      var itemEstaAberto = item.classList.contains("open");

      // Fecha todos os itens que estão abertos
      var itensAbertos = document.querySelectorAll(".faq-item.open");
      for (var j = 0; j < itensAbertos.length; j++) {
        itensAbertos[j].classList.remove("open");
        itensAbertos[j].querySelector(".faq-answer").style.maxHeight = null;
      }

      // Se o item clicado estava fechado, abre ele
      if (!itemEstaAberto) {
        item.classList.add("open");
        resposta.style.maxHeight = resposta.scrollHeight + "px";
      }
    });
  }
}

/* ----------------------------------
   FORMULÁRIO DE CONTATO
   Valida os campos e mostra mensagem de sucesso
   ---------------------------------- */
function formularioContato() {
  var form = document.querySelector("#contactForm");

  // Se o formulário não existir na página, para aqui
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (evento) {
    // Impede o envio padrão do formulário (que recarregaria a página)
    evento.preventDefault();

    // Limpa as mensagens de erro anteriores
    var erros = form.querySelectorAll(".error-message");
    for (var i = 0; i < erros.length; i++) {
      erros[i].textContent = "";
    }
    document.querySelector("#formSuccess").textContent = "";
    
    // Pega o valor de cada campo
    var nome = form.name.value.trim();
    var email = form.email.value.trim();
    var assunto = form.subject.value.trim();
    var mensagem = form.message.value.trim();
        // Marca se tudo está válido
    var tudoValido = true;

    // Verifica se cada campo foi preenchido
    if (!nome) {
      document.querySelector('[data-error-for="name"]').textContent = "Informe seu nome.";
      tudoValido = false;
    }

    if (!email) {
      document.querySelector('[data-error-for="email"]').textContent = "Informe seu email.";
      tudoValido = false;
    } else if (!emailValido(email)) {
      document.querySelector('[data-error-for="email"]').textContent = "Informe um email válido.";
      tudoValido = false;
    }

    if (!assunto) {
      document.querySelector('[data-error-for="subject"]').textContent = "Informe o assunto.";
      tudoValido = false;
    }

    if (!mensagem) {
      document.querySelector('[data-error-for="message"]').textContent = "Escreva sua mensagem.";
      tudoValido = false;
    }

    // Se algum campo inválido, para aqui sem enviar
    if (!tudoValido) {
      return;
    }
       // Tudo certo: limpa o formulário e mostra mensagem de sucesso
    form.reset();
    document.querySelector("#formSuccess").textContent =
      "Mensagem enviada com sucesso. A equipe GaiaTech retornará em breve.";
  });
}

// Verifica se o email tem o formato básico correto (ex: nome@email.com)
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ----------------------------------
   TRIAGEM DE SINTOMAS
   Classifica urgência com base no que o usuário digitou
   ---------------------------------- */

// Lista de níveis de urgência, do mais grave ao mais leve
var URGENCIAS = [
  {
    nivel: "Crítica",
    instrucao: "Acionar emergência imediatamente e manter acompanhamento contínuo.",
    sintomas: ["convulsão", "sangramento intenso", "inconsciência", "inconsciente", "parada respiratória", "não respira", "sem ar"]
  },
  {
    nivel: "Alta",
    instrucao: "Priorizar atendimento médico remoto e preparar encaminhamento.",
    sintomas: ["falta de ar", "dor no peito", "desmaio", "confusão", "pressão alta", "dor intensa", "dor forte"]
  },
  {
    nivel: "Média",
    instrucao: "Solicitar avaliação médica e orientar observação dos sinais.",
    sintomas: ["febre", "vômito", "diarreia", "dor moderada", "tontura", "calafrio"]
  },
  {
    nivel: "Baixa",
    instrucao: "Orientar monitoramento, hidratação e retorno se houver piora.",
    sintomas: ["tosse leve", "coriza", "dor leve", "dor", "cansaço leve", "espirro", "nariz entupido", "nariz congestionado"]
  }
];

// Remove acentos do texto para a comparação não falhar (ex: "febre" == "febre")
function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formularioTriagem() {
  var form = document.querySelector("#triageForm");
  var resultado = document.querySelector("#triageResult");

  // Se os elementos não existirem na página, para aqui
  if (!form || !resultado) {
    return;
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

        // Pega o texto digitado e remove acentos para comparar
    var textoDigitado = removerAcentos(form.symptoms.value.trim().toLowerCase());

    // Se o campo estiver vazio, pede para digitar algo
    if (!textoDigitado) {
      resultado.className = "triage-result show";
      resultado.innerHTML = "<strong>Digite ao menos um sintoma para realizar a simulação.</strong>";
      return;
    }

       // Percorre cada nível de urgência e vê se algum sintoma foi digitado
    var nivelEncontrado = null;

    for (var i = 0; i < URGENCIAS.length; i++) {
      var urgencia = URGENCIAS[i];

      for (var j = 0; j < urgencia.sintomas.length; j++) {
        var sintoma = removerAcentos(urgencia.sintomas[j]);

        if (textoDigitado.includes(sintoma)) {
          nivelEncontrado = urgencia;
          break; // Encontrou um sintoma nesse nível, não precisa continuar
        }
      }

      if (nivelEncontrado) {
        break; // Já achou o nível mais grave, para a busca
      }
    }

        // Mostra o resultado na tela
    resultado.className = "triage-result show";

    if (nivelEncontrado) {
      resultado.innerHTML =
        "<strong>Nível de urgência: " + nivelEncontrado.nivel + "</strong>" +
        "<p>" + nivelEncontrado.instrucao + "</p>";
    } else {
      resultado.innerHTML =
        "<strong>Sintomas não encontrados.</strong>" +
        "<p>Nenhum sintoma cadastrado foi identificado. Verifique a grafia e tente novamente.</p>";
    }
  });
}

/* ----------------------------------
   ANIMAÇÃO FADE-IN
   Elementos com .fade-in aparecem suavemente ao entrar na tela
   ---------------------------------- */
function animacaoFadeIn() {
  var elementos = document.querySelectorAll(".fade-in");

  // Se não houver elementos com .fade-in na página, para aqui
  if (!elementos.length) {
    return;
  }

    // Se o navegador não suportar o recurso moderno, mostra tudo de uma vez
  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < elementos.length; i++) {
      elementos[i].classList.add("visible");
    }
    return;
  }

    // Cria um "observador" que detecta quando um elemento aparece na tela
  var observador = new IntersectionObserver(function (entradas) {
    for (var i = 0; i < entradas.length; i++) {
      var entrada = entradas[i];

      if (entrada.isIntersecting) {
        // Elemento entrou na tela: adiciona a classe que faz aparecer
        entrada.target.classList.add("visible");
        // Para de observar esse elemento (já animou, não precisa mais)
        observador.unobserve(entrada.target);
      }
    }
  }, { threshold: 0.12 });

    // Começa a observar cada elemento
  for (var i = 0; i < elementos.length; i++) {
    observador.observe(elementos[i]);
  }
}

/* ----------------------------------
   SCROLL SUAVE
   Ao clicar em links internos (#secao), rola a página suavemente
   ---------------------------------- */
function scrollSuave() {
  // Pega todos os links que apontam para uma âncora interna (começam com #)
  var links = document.querySelectorAll('a[href^="#"]');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (evento) {
      // Descobre para qual seção esse link aponta
      var idDestino = this.getAttribute("href");
      var secaoDestino = document.querySelector(idDestino);

      // Se a seção não existir na página, não faz nada
      if (!secaoDestino) {
        return;
      }

      // Impede o comportamento padrão (pular direto sem animação)
      evento.preventDefault();

      // Rola até a seção com animação suave
      secaoDestino.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}


