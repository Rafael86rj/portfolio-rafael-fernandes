/* =========================================================
   CONTROLE DE TEMA
   ========================================================= */

// Chave usada para salvar a escolha do usuário no navegador.
const THEME_STORAGE_KEY = "theme";

// Seleciona os elementos do botão de tema.
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");


/**
 * Aplica o tema escolhido à página.
 *
 * @param {"dark"|"light"} theme
 */
function applyTheme(theme) {

    const isLight = theme === "light";

    // Adiciona ou remove a classe responsável pelo tema claro.
    document.body.classList.toggle("light-theme", isLight);

    // Se os elementos não existirem, evita erro no JavaScript.
    if (!themeToggle || !themeIcon) {
        return;
    }

    // Atualiza o ícone.
    themeIcon.classList.toggle("bi-sun-fill", !isLight);
    themeIcon.classList.toggle("bi-moon-fill", isLight);

    // Atualiza os atributos de acessibilidade.
    themeToggle.setAttribute("aria-pressed", String(isLight));

    const nextThemeLabel = isLight
        ? "Ativar tema escuro"
        : "Ativar tema claro";

    themeToggle.setAttribute("aria-label", nextThemeLabel);
    themeToggle.setAttribute("title", nextThemeLabel);
}


// Recupera a preferência salva.
// Se não houver preferência, o site inicia no tema escuro.
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme === "light" ? "light" : "dark";

applyTheme(initialTheme);


// Só cria o evento se o botão existir.
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const lightThemeActive =
            document.body.classList.contains("light-theme");

        const newTheme = lightThemeActive
            ? "dark"
            : "light";

        applyTheme(newTheme);

        // Salva a preferência para os próximos acessos.
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
}