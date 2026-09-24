/* =========================================================
   ERVAS TECNOLÓGICAS
   JAVASCRIPT — CANNABIS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     ANO AUTOMÁTICO
  ========================================================= */

  const ano = document.getElementById("ano");

  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  /* =========================================================
     MENU MOBILE / TABLET
  ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      const aberto = menu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(aberto));

      menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu",
      );

      menuToggle.textContent = aberto ? "✕" : "☰";
    });

    /* Fecha o menu quando clicar em algum link */

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

        menuToggle.textContent = "☰";
      });
    });
  }

  /* =========================================================
     REVEAL — ANIMAÇÃO NO SCROLL
  ========================================================= */

  const elementosReveal = document.querySelectorAll(".reveal");

  if (elementosReveal.length > 0) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -30px 0px",
        },
      );

      elementosReveal.forEach((elemento) => {
        observer.observe(elemento);
      });
    } else {
      elementosReveal.forEach((elemento) => {
        elemento.classList.add("visible");
      });
    }
  }

  /* =========================================================
     FAQ
  ========================================================= */

  const perguntas = document.querySelectorAll(".faq-question");

  perguntas.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");

      if (!item) return;

      const estavaAberto = item.classList.contains("active");

      /* Fecha todas */

      document.querySelectorAll(".faq-item").forEach((outro) => {
        outro.classList.remove("active");

        const outroBotao = outro.querySelector(".faq-question");

        if (outroBotao) {
          outroBotao.setAttribute("aria-expanded", "false");
        }
      });

      /* Abre a selecionada */

      if (!estavaAberto) {
        item.classList.add("active");

        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* =========================================================
     FORMULÁRIO DE CONTATO
  ========================================================= */

  const form = document.getElementById("formContato");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = document.getElementById("nome")?.value.trim();

      const email = document.getElementById("email")?.value.trim();

      const mensagem = document.getElementById("mensagem")?.value.trim();

      const feedback = document.getElementById("feedback");

      if (!feedback) return;

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

      if (!nome || !emailValido || !mensagem) {
        feedback.classList.add("erro");

        feedback.style.display = "block";

        feedback.textContent =
          "Por favor, preencha todos os campos corretamente.";

        return;
      }

      feedback.classList.remove("erro");

      feedback.style.display = "block";

      feedback.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e retornaremos em breve.`;

      form.reset();
    });
  }

  /* =========================================================
     BOTÃO VOLTAR AO TOPO
  ========================================================= */

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

/* =========================================================
   FUNÇÃO DE SELEÇÃO DE PLANO
========================================================= */

function escolherPlano(nome) {
  alert(
    `Você escolheu o plano ${nome}! Em breve nossa equipe entrará em contato.`,
  );
}
