const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const wechatDialog = document.querySelector(".wechat-dialog");
const wechatTrigger = document.querySelector(".wechat-trigger");
const dialogClose = document.querySelector(".dialog-close");

const preferredTheme = localStorage.getItem("theme");
if (preferredTheme === "dark" || preferredTheme === "light") {
  root.dataset.theme = preferredTheme;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

wechatTrigger?.addEventListener("click", () => {
  wechatDialog.showModal();
  document.body.classList.add("dialog-open");
});

const closeDialog = () => {
  wechatDialog.close();
  document.body.classList.remove("dialog-open");
};

dialogClose?.addEventListener("click", closeDialog);
wechatDialog?.addEventListener("click", (event) => {
  if (event.target === wechatDialog) closeDialog();
});
wechatDialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));

document.querySelector("#current-year").textContent = new Date().getFullYear();
