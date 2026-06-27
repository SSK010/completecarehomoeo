const toggle = document.querySelector(".mobile-toggle");
const menu = document.querySelector(".nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage || (href === "index.html" && currentPage === "")) {
    link.classList.add("active");
  }
});

function trackEvent(eventName, parameters = {}) {
    if (typeof gtag === "function") {
        gtag("event", eventName, parameters);
    }
}