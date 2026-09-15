/* =========================
   DIGITAÇÃO
========================= */

const textos = document.querySelectorAll(".typing-text");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const elemento = entry.target;

      // Impede que a animação seja executada novamente
      if (elemento.dataset.typingStarted === "true") {
        return;
      }

      elemento.dataset.typingStarted = "true";

      const texto = elemento.dataset.text;

      let index = 0;

      // Começa vazio
      elemento.textContent = "";

      function digitar() {
        if (index < texto.length) {
          elemento.textContent += texto.charAt(index);

          index++;

          setTimeout(digitar, 45);
        }

        // Quando termina, o texto permanece na tela
      }

      digitar();
    });
  },
  {
    threshold: 0.5,
  },
);

textos.forEach((texto) => {
  observer.observe(texto);
});

/* =========================
   NAVEGAÇÃO ENTRE SEÇÕES
========================= */

const secoes = document.querySelectorAll(".story-section");

const botoesProxima = document.querySelectorAll(".next-section");
const botoesAnterior = document.querySelectorAll(".prev-section");

/* =========================
   NAVEGAÇÃO DESKTOP
========================= */

botoesProxima.forEach((botao) => {
  botao.addEventListener("click", () => {
    const secaoAtual = botao.closest(".story-section");

    const indiceAtual = Array.from(secoes).indexOf(secaoAtual);

    const proximaSecao = secoes[indiceAtual + 1];

    if (proximaSecao) {
      proximaSecao.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

botoesAnterior.forEach((botao) => {
  botao.addEventListener("click", () => {
    const secaoAtual = botao.closest(".story-section");

    const indiceAtual = Array.from(secoes).indexOf(secaoAtual);

    const secaoAnterior = secoes[indiceAtual - 1];

    if (secaoAnterior) {
      secaoAnterior.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/* =========================
   NAVEGAÇÃO MOBILE
========================= */

const mobilePrev = document.querySelector(".mobile-prev");

const mobileNext = document.querySelector(".mobile-next");

/* Descobre a seção atual */
const mobileTop = document.querySelector(".mobile-top");
const contato = document.querySelector("#contato");

const observerContato = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      mobilePrev.style.display = "none";
      mobileNext.style.display = "none";
      mobileTop.style.display = "flex";
    } else {
      mobilePrev.style.display = "flex";
      mobileNext.style.display = "flex";
      mobileTop.style.display = "none";
    }
  },
  {
    threshold: 0.5,
  },
);

observerContato.observe(contato);

mobileTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
function secaoAtualMobile() {
  const centroTela = window.innerHeight / 2;

  let indiceAtual = 0;

  secoes.forEach((secao, indice) => {
    const rect = secao.getBoundingClientRect();

    if (rect.top <= centroTela && rect.bottom >= centroTela) {
      indiceAtual = indice;
    }
  });

  return indiceAtual;
}

/* Atualiza as setas */

function atualizarSetasMobile() {
  /*
   * Se estiver na tela inicial,
   * estamos antes da primeira seção.
   */

  if (window.scrollY < 100) {
    // Não existe botão para voltar
    mobilePrev.classList.add("hidden");

    // A seta para baixo continua aparecendo
    mobileNext.classList.remove("hidden");

    return;
  }

  const indiceAtual = secaoAtualMobile();

  // Primeira seção: somente ↓

  if (indiceAtual === 0) {
    mobilePrev.classList.remove("hidden");
  } else {
    mobilePrev.classList.remove("hidden");
  }

  // Última seção: somente ↑

  if (indiceAtual === secoes.length - 1) {
    mobileNext.classList.add("hidden");
  } else {
    mobileNext.classList.remove("hidden");
  }
}

/* =========================
   BOTÃO VOLTAR MOBILE
========================= */

mobilePrev.addEventListener("click", () => {
  const indiceAtual = secaoAtualMobile();

  /*
   * Se estiver em "Sobre mim",
   * volta para a capa/foto.
   */

  if (indiceAtual === 0 && window.scrollY > 100) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  const secaoAnterior = secoes[indiceAtual - 1];

  if (secaoAnterior) {
    secaoAnterior.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

/* =========================
   BOTÃO AVANÇAR MOBILE
========================= */

mobileNext.addEventListener("click", () => {
  /*
   * Se estiver na capa/foto,
   * vai primeiro para "Sobre mim".
   */

  if (window.scrollY < 100) {
    const sobre = document.querySelector("#sobre");

    if (sobre) {
      sobre.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    return;
  }

  /*
   * Depois da capa,
   * a navegação segue normalmente.
   */

  const indiceAtual = secaoAtualMobile();

  const proximaSecao = secoes[indiceAtual + 1];

  if (proximaSecao) {
    proximaSecao.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

/* =========================
   ATUALIZAÇÃO DAS SETAS
========================= */

window.addEventListener("scroll", atualizarSetasMobile);

window.addEventListener("resize", atualizarSetasMobile);

/* Estado inicial */

atualizarSetasMobile();
/* =========================
   VOLTAR AO TOPO
========================= */

const backToTop = document.querySelector(".back-to-top");

const storyContent = document.querySelector(".story-content");

backToTop.addEventListener("click", () => {
  // MOBILE
  if (window.innerWidth <= 768) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  // DESKTOP
  storyContent.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
