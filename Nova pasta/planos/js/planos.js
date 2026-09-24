document.addEventListener("DOMContentLoaded", () => {
  const planButtons = document.querySelectorAll(".plan-button");
  const selectPlan = document.getElementById("selectPlan");
  const installments = document.getElementById("installments");
  const installmentValue = document.getElementById("installmentValue");
  const totalValue = document.getElementById("totalValue");
  const confirmationPlan = document.getElementById("confirmationPlan");
  const confirmationInstallments = document.getElementById(
    "confirmationInstallments",
  );
  const confirmationPrice = document.getElementById("confirmationPrice");
  const confirmationTotal = document.getElementById("confirmationTotal");
  const confirmPlanButton = document.getElementById("confirmPlanButton");
  const planConfirmed = document.getElementById("planConfirmed");
  let planoSelecionado = null,
    precoSelecionado = 0,
    parcelasSelecionadas = 1;
  const moeda = (v) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  function resetConfirmacao() {
    confirmPlanButton.classList.remove("confirmed");
    planConfirmed.classList.remove("show");
    planConfirmed.textContent = "";
  }
  function atualizar() {
    const preco = Number(selectPlan.value),
      parcelas = Number(installments.value),
      opcao = selectPlan.options[selectPlan.selectedIndex];
    planoSelecionado = opcao.dataset.plan;
    precoSelecionado = preco;
    parcelasSelecionadas = parcelas;
    const valor = preco / parcelas;
    installmentValue.textContent = moeda(valor);
    totalValue.textContent = moeda(preco);
    confirmationPlan.textContent = planoSelecionado;
    confirmationInstallments.textContent = `${parcelas}x`;
    confirmationPrice.textContent = moeda(valor);
    confirmationTotal.textContent = moeda(preco);
    confirmPlanButton.textContent =
      parcelas === 1
        ? `Confirmar ${planoSelecionado} — ${moeda(preco)}`
        : `Confirmar ${planoSelecionado} — ${parcelas}x de ${moeda(valor)}`;
    confirmPlanButton.disabled = false;
  }
  planButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      resetConfirmacao();
      selectPlan.value = Number(btn.dataset.price).toFixed(2);
      atualizar();
      document
        .getElementById("parcelamento")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }),
  );
  selectPlan.addEventListener("change", () => {
    resetConfirmacao();
    atualizar();
  });
  installments.addEventListener("change", () => {
    resetConfirmacao();
    atualizar();
  });
  confirmPlanButton.addEventListener("click", () => {
    const valor = precoSelecionado / parcelasSelecionadas;
    confirmPlanButton.classList.add("confirmed");
    confirmPlanButton.textContent = "✓ Plano confirmado";
    planConfirmed.textContent = `✓ ${planoSelecionado} confirmado — ${parcelasSelecionadas}x de ${moeda(valor)}.`;
    planConfirmed.classList.add("show");
  });
  document.querySelectorAll(".faq-question").forEach((btn) =>
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item"),
        aberto = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".faq-question")?.setAttribute(
          "aria-expanded",
          "false",
        );
      });
      if (!aberto) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      }
    }),
  );
  const menu = document.getElementById("menuToggle"),
    links = document.getElementById("navLinks");
  menu?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });
  links
    ?.querySelectorAll("a")
    .forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open")),
    );
  const observer = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
  const top = document.getElementById("backTop");
  window.addEventListener(
    "scroll",
    () => top.classList.toggle("show", scrollY > 500),
    { passive: true },
  );
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  document.getElementById("year").textContent = new Date().getFullYear();
  atualizar();
});
