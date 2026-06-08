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