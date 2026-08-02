/* ========================================================================== 
   Interactions du site — sans dépendance, compatible avec une ouverture locale.
   ========================================================================== */

document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navigationLinks = [...document.querySelectorAll(".site-nav a")];
const backToTop = document.querySelector("[data-back-to-top]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

/** Ferme le menu mobile et restaure son état accessible. */
function closeMenu({ returnFocus = false } = {}) {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Ouvrir le menu");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");

  if (returnFocus) {
    menuButton.focus();
  }
}

function openMenu() {
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Fermer le menu");
  navigation.classList.add("is-open");
  document.body.classList.add("menu-open");
  window.requestAnimationFrame(() => navigationLinks[0]?.focus());
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu() : openMenu();
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeMenu({ returnFocus: true });
  }
});

document.addEventListener("click", (event) => {
  if (
    navigation.classList.contains("is-open") &&
    !navigation.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 920 && navigation.classList.contains("is-open")) {
    closeMenu();
  }
});

/** Ombre d’en-tête et bouton de retour en haut. */
function updateScrollControls() {
  const hasScrolled = window.scrollY > 24;
  header.classList.toggle("is-scrolled", hasScrolled);
  backToTop.classList.toggle("is-visible", window.scrollY > 650);
}

updateScrollControls();
window.addEventListener("scroll", updateScrollControls, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion.matches ? "auto" : "smooth"
  });
});

/** Indique la section active dans la navigation. */
const observedSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        if (isCurrent) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-20% 0px -62%", threshold: [0.05, 0.3, 0.6] }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

/** Apparition progressive, désactivée si l’utilisateur réduit les mouvements. */
const revealElements = document.querySelectorAll("[data-reveal]");

if (reducedMotion.matches || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5%" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/** Fenêtres légales intégrées : aucun fichier ou service externe requis. */
document.querySelectorAll("[data-dialog-open]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const dialog = document.getElementById(trigger.dataset.dialogOpen);
    if (!dialog) return;

    document.body.classList.add("dialog-open");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  });
});

function closeDialog(dialog) {
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  }
}

document.querySelectorAll(".legal-dialog").forEach((dialog) => {
  dialog.querySelector("[data-dialog-close]")?.addEventListener("click", () => closeDialog(dialog));
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
});

/** Message clair pour les réseaux sociaux volontairement fictifs. */
function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

document.querySelectorAll("[data-demo-action]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(`${link.dataset.demoAction} sera activé avec les véritables coordonnées du client.`);
  });
});

document.querySelectorAll("[data-demo-social]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showToast(`${link.dataset.demoSocial} — lien de démonstration, aucun compte réel n’est associé.`);
  });
});

/** Année automatiquement actualisée dans le pied de page. */
document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
