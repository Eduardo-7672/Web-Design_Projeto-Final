/* =========================================================
   ERVAS TECNOLÓGICAS — JAVASCRIPT
   Este arquivo adiciona interatividade ao site.
   ========================================================= */

/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));

  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");

  menuToggle.textContent = open ? "✕" : "☰";
});

/* Fecha o menu quando um link é clicado */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
      menuToggle.setAttribute("aria-label", "Abrir menu");
      menuToggle.textContent = "☰";
    }
  });
});

/* =========================================================
   FAQ
========================================================= */

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");

    document.querySelectorAll(".faq-item").forEach((other) => {
      if (other !== item) {
        other.classList.remove("active");
      }
    });

    item?.classList.toggle("active");
  });
});

/* =========================================================
   ANIMAÇÕES AO ENTRAR NA TELA
========================================================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

/* =========================================================
   ANO DO RODAPÉ
========================================================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* =========================================================
   FORMULÁRIO DE CONTATO
========================================================= */

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");

  const name = nameInput?.value.trim() || "visitante";

  if (status) {
    status.textContent = `Obrigado, ${name}! Esta é uma demonstração: nenhum dado foi enviado a um servidor.`;
  }

  form.reset();
});
