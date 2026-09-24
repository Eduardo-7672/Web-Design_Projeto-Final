document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     ANO DO FOOTER
  ========================= */

  const ano = document.getElementById("ano");

  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  /* =========================
     MENU MOBILE
  ========================= */

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

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

        menuToggle.textContent = "☰";
      });
    });
  }

  /* =========================
     REVEAL ANIMATION
  ========================= */

  const elementosReveal = document.querySelectorAll(".reveal");

  if (elementosReveal.length > 0 && "IntersectionObserver" in window) {
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
        rootMargin: "0px 0px -40px 0px",
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

  /* =========================
   CALCULADORA DE PARCELAMENTO
========================= */

  const selectPlan = document.getElementById("selectPlan");
  const installments = document.getElementById("installments");

  const installmentValue = document.getElementById("installmentValue");
  const totalValue = document.getElementById("totalValue");

  /* =========================
   REVISÃO DA ESCOLHA
========================= */

  const planConfirmation = document.getElementById("planConfirmation");

  const confirmationPlan = document.getElementById("confirmationPlan");
  const confirmationInstallments = document.getElementById(
    "confirmationInstallments",
  );
  const confirmationPrice = document.getElementById("confirmationPrice");
  const confirmationTotal = document.getElementById("confirmationTotal");

  const confirmPlanButton = document.getElementById("confirmPlanButton");
  const planConfirmed = document.getElementById("planConfirmed");

  let planoSelecionado = null;
  let precoSelecionado = null;

  /* =========================
   ATUALIZA TUDO
========================= */

  function atualizarParcelamento() {
    if (!selectPlan || !installments) {
      return;
    }

    const valor = Number(selectPlan.value);
    const parcelas = Number(installments.value);

    if (!valor || !parcelas) {
      return;
    }

    const valorParcela = valor / parcelas;

    /* =========================
     FORMATADORES
  ========================= */

    const valorParcelaFormatado = valorParcela.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const valorTotalFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    /* =========================
     ATUALIZA CALCULADORA
  ========================= */

    if (installmentValue) {
      installmentValue.textContent = valorParcelaFormatado;

      installmentValue.classList.remove("value-update");

      void installmentValue.offsetWidth;

      installmentValue.classList.add("value-update");
    }

    if (totalValue) {
      totalValue.textContent = `Total: ${valorTotalFormatado}`;
    }

    /* =========================
     ATUALIZA REVISÃO
  ========================= */

    if (confirmationPlan) {
      confirmationPlan.textContent =
        selectPlan.options[selectPlan.selectedIndex].text;
    }

    if (confirmationInstallments) {
      confirmationInstallments.textContent = `${parcelas}x`;
    }

    if (confirmationPrice) {
      confirmationPrice.textContent = valorParcelaFormatado;
    }

    if (confirmationTotal) {
      confirmationTotal.textContent = valorTotalFormatado;
    }

    /* =========================
     ATUALIZA VARIÁVEIS
  ========================= */

    planoSelecionado = selectPlan.options[selectPlan.selectedIndex].text;

    precoSelecionado = valor;
  }

  /* =========================
   ALTERAÇÃO DO PLANO
========================= */

  selectPlan?.addEventListener("change", () => {
    atualizarParcelamento();

    /* Se o usuário alterar a escolha,
     permite confirmar novamente */

    if (confirmPlanButton) {
      confirmPlanButton.disabled = false;
      confirmPlanButton.textContent = "Confirmar plano";
      confirmPlanButton.classList.remove("confirmed");
    }

    if (planConfirmed) {
      planConfirmed.classList.remove("visible");
    }
  });

  /* =========================
   ALTERAÇÃO DAS PARCELAS
========================= */

  installments?.addEventListener("change", () => {
    atualizarParcelamento();

    /* A alteração das parcelas também
     libera uma nova confirmação */

    if (confirmPlanButton) {
      confirmPlanButton.disabled = false;
      confirmPlanButton.textContent = "Confirmar plano";
      confirmPlanButton.classList.remove("confirmed");
    }

    if (planConfirmed) {
      planConfirmed.classList.remove("visible");
    }
  });

  /* =========================
   INICIALIZA CALCULADORA
========================= */

  atualizarParcelamento();

  /* =========================
   BOTÕES DOS PLANOS
========================= */

  const planButtons = document.querySelectorAll(".plan-button");

  planButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plano = button.dataset.plan;
      const preco = Number(button.dataset.price);

      if (!plano || !preco) {
        return;
      }

      planoSelecionado = plano;
      precoSelecionado = preco;

      /* Atualiza o select do plano */

      if (selectPlan) {
        selectPlan.value = preco.toFixed(2);
      }

      /* Atualiza calculadora + revisão */

      atualizarParcelamento();

      /* Mostra a área de revisão */

      if (planConfirmation) {
        planConfirmation.classList.add("visible");

        planConfirmation.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      /* Libera botão */

      if (confirmPlanButton) {
        confirmPlanButton.disabled = false;
        confirmPlanButton.textContent = "Confirmar plano";
        confirmPlanButton.classList.remove("confirmed");
      }

      /* Esconde confirmação anterior */

      if (planConfirmed) {
        planConfirmed.classList.remove("visible");
      }
    });
  });

  /* =========================
   CONFIRMAR PLANO
========================= */

  if (confirmPlanButton) {
    confirmPlanButton.addEventListener("click", () => {
      if (!planoSelecionado || !precoSelecionado) {
        return;
      }

      const parcelas = Number(installments?.value || 1);

      const valorParcela = precoSelecionado / parcelas;

      const valorParcelaFormatado = valorParcela.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const valorTotalFormatado = precoSelecionado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      /* Mensagem de sucesso */

      if (planConfirmed) {
        planConfirmed.innerHTML = `
        <strong>✓ Plano ${planoSelecionado} confirmado com sucesso!</strong>
        <span>
          Parcelamento: ${parcelas}x de ${valorParcelaFormatado}
          — Total: ${valorTotalFormatado}
        </span>
      `;

        planConfirmed.classList.add("visible");
      }

      /* Atualiza botão */

      confirmPlanButton.textContent = "Plano confirmado ✓";

      confirmPlanButton.classList.add("confirmed");

      confirmPlanButton.disabled = true;
    });
  }

  /* =========================
     FAQ
  ========================= */

  const perguntas = document.querySelectorAll(".faq-question");

  perguntas.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");

      if (!item) return;

      document.querySelectorAll(".faq-item").forEach((outro) => {
        if (outro !== item) {
          outro.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });

  /* =========================
     VOLTAR AO TOPO
  ========================= */

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
