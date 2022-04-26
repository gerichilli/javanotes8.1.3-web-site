"use strict";

const changeFontBtn = document.getElementById("changeFont");
const changeThemeBtn = document.getElementById("changeTheme");

/* INIT */
function init() {
  /* Set font family */
  let defaultFontFamily = "sans-serif";
  const dataFontFamily = localStorage.getItem("fontFamily") || defaultFontFamily;
  document.body.setAttribute("data-fontFamily", dataFontFamily);

  /* Set theme */
  let dataTheme = localStorage.getItem("theme");

  if (!dataTheme && window.matchMedia) {
    // Check if the dark-mode Media-Query matches
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dataTheme = "dark";
    } else {
      dataTheme = "light";
    }
  }

  document.documentElement.setAttribute("data-theme", dataTheme);

  if (changeThemeBtn) {
    changeThemeButton(dataTheme);
  }
}

init();

/* HANDLE */
function handleChangeFont() {
  let dataFontFamily = document.body.getAttribute("data-fontFamily");

  if (dataFontFamily === "serif" || !dataFontFamily) {
    dataFontFamily = "sans-serif";
  } else {
    dataFontFamily = "serif";
  }

  document.body.setAttribute("data-fontFamily", dataFontFamily);
  localStorage.setItem("fontFamily", dataFontFamily);
}

function handleChangeTheme() {
  let dataTheme = localStorage.getItem("theme");

  if (dataTheme === "dark") {
    dataTheme = "light";
  } else {
    dataTheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", dataTheme);
  localStorage.setItem("theme", dataTheme);
  changeThemeButton(dataTheme);
}

function changeThemeButton(currentTheme) {
  if (currentTheme == "light") {
    document.getElementById("lightMode").style.display = "none";
    document.getElementById("darkMode").style.display = "block";
  } else {
    document.getElementById("lightMode").style.display = "block";
    document.getElementById("darkMode").style.display = "none";
  }
}

/* LISTEN FOR EVENT */
if (changeFontBtn) {
  changeFontBtn.addEventListener("click", function () {
    handleChangeFont();
  });
}

if (changeThemeBtn) {
  changeThemeBtn.addEventListener("click", function () {
    handleChangeTheme();
  });
}

/* Add code to pre */
const preEls = document.querySelectorAll("pre");

if (preEls.length) {
  preEls.forEach(el => {
    let codeEl = el.querySelector("code");

    if (!codeEl) {
      codeEl = document.createElement("code");
      codeEl.className = "language-java";
      codeEl.innerHTML = el.innerHTML;
      el.innerHTML = "";
      el.appendChild(codeEl);
    } else {
      let html = codeEl.innerHTML.trim();
      codeEl.innerHTML = "";
      codeEl.innerHTML = html;
    }
  });
}
