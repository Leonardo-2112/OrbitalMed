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