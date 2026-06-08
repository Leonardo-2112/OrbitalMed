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
