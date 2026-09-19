// ========= Comum: menu mobile, ano no rodapé =========
document.addEventListener("DOMContentLoaded", () => {
  // Preenche o ano automaticamente no footer
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu mobile (toggle)
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
    menu
      .querySelectorAll("a")
      .forEach((a) =>
        a.addEventListener("click", () => menu.classList.remove("open")),
      );
  }
});

// ========= Validação simples do formulário =========
const form = document.getElementById("formContato");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // impede o envio padrão
    const feedback = document.getElementById("feedback");
    feedback.style.display = "block";

    // Pega valores dos campos
    const nome = form.querySelector("#nome")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const mensagem = form.querySelector("#mensagem")?.value.trim();

    // Regex básico para validar e-mail
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

    if (!nome || !emailOk || !mensagem) {
      feedback.classList.add("erro");
      feedback.textContent =
        "Por favor, preencha todos os campos corretamente.";
      return;
    }

    feedback.classList.remove("erro");
    feedback.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e retornaremos em breve.`;
    form.reset();
  });
}

// ========= Seleção de plano =========
function escolherPlano(nome) {
  alert(
    `Você escolheu o plano ${nome}! Em breve nossa equipe entrará em contato.`,
  );
}