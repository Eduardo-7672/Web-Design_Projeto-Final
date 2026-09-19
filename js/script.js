/* =========================================================
   ERVAS TECNOLÓGICAS — JAVASCRIPT
   Este arquivo adiciona interatividade ao site.
   ========================================================= */

/* Seleciona o botão usado para abrir e fechar o menu no celular. */
const menuToggle = document.querySelector(".menu-toggle");

/* Seleciona o container que possui os links do menu. */
const navLinks = document.querySelector(".nav-links");

/* Quando o botão do menu é clicado, alternamos sua abertura. */
menuToggle?.addEventListener("click", () => {
  /* Adiciona ou remove a classe "open", que é estilizada pelo CSS. */
  const open = navLinks.classList.toggle("open");

  /* Atualiza a acessibilidade informando se o menu está aberto. */
  menuToggle.setAttribute("aria-expanded", open);

  /* Troca o ícone entre menu (☰) e fechar (✕). */
  menuToggle.textContent = open ? "✕" : "☰";
});

/* Percorre cada link do menu. */
document.querySelectorAll(".nav-links a").forEach((link) => {
  /* Ao clicar em um link, fechamos o menu mobile. */
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

/* Seleciona todas as perguntas do FAQ. */
document.querySelectorAll(".faq-question").forEach((button) => {
  /* Ao clicar em uma pergunta, sua resposta é aberta/fechada. */
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");

    /* Fecha outras perguntas para manter o FAQ organizado. */
    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });

    /* Abre ou fecha a pergunta selecionada. */
    item.classList.toggle("active");
  });
});

/* Observa elementos que entram na tela durante o scroll. */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      /* Quando o elemento aparece, adicionamos a classe que inicia a animação. */
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        /* Depois de animar uma vez, deixa de observar o elemento. */
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

/* Ativa o sistema de animação em todos os elementos com a classe .reveal. */
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Mostra automaticamente o ano atual no rodapé. */
document.getElementById("year").textContent = new Date().getFullYear();

/* Seleciona o formulário de contato e a área onde mostraremos o resultado. */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

/* Intercepta o envio para demonstrar o funcionamento sem servidor. */
form?.addEventListener("submit", (event) => {
  /* Impede o navegador de recarregar a página. */
  event.preventDefault();

  /* Obtém e limpa o nome digitado pelo visitante. */
  const name = document.getElementById("name").value.trim();

  /* Mostra uma mensagem explicando que o formulário é apenas demonstrativo. */
  status.textContent = `Obrigado, ${name || "visitante"}! Esta é uma demonstração: nenhum dado foi enviado a um servidor.`;

  /* Limpa os campos depois do envio demonstrativo. */
  form.reset();
});
