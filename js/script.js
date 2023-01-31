`use strict`;

//////////////////////////////

const btnShowTooltip = document.querySelector(".card__text span");
const btnOpenContact = document.querySelector(".nav__link--cta");
const btnCloseContact = document.querySelector(".popup-window__close");
const btnMenu = document.querySelector(".menu-bar");

const btnsNav = document.querySelectorAll(".nav__link");
const btnLogo = document.querySelector(".nav__logo");
const btnHero = document.querySelector(".hero__btn");

const btnsPop = document.querySelectorAll(".popup-window__link");

const bodyEl = document.querySelector("body");
const tooltipEL = document.querySelector(".card__tooltip");
const popupEl = document.querySelector(".popup-background");
const windowEl = document.querySelector(".popup-window");

const contactEls = document.querySelectorAll(".contact-item");

const sectionAbout = document.querySelector(".about");
const sectionPortfolio = document.querySelector(".portfolio");

const cardsAbout = document.querySelectorAll(".card");

//////////////////////////////

btnShowTooltip.addEventListener("click", function () {
  tooltipEL.classList.toggle("card__tooltip--active");
});

document.addEventListener("click", function (e) {
  if (btnShowTooltip === e.target) return;
  tooltipEL.classList.remove("card__tooltip--active");
});

btnOpenContact.addEventListener("click", function () {
  popupEl.classList.add("popup-background--open");
  bodyEl.classList.add("scroll-disabled");
});

btnCloseContact.addEventListener("click", function () {
  popupEl.classList.remove("popup-background--open");
  bodyEl.classList.remove("scroll-disabled");
});

popupEl.addEventListener("click", function (e) {
  const target = e.target;

  if (target.closest(".popup-window")) return;

  popupEl.classList.remove("popup-background--open");
  bodyEl.classList.remove("scroll-disabled");
  btnMenu.classList.remove("menu-bar--open");
});

contactEls.forEach((el) => {
  el.addEventListener("click", function () {
    const text = this.querySelector(".contact-item__text")?.textContent;

    if (text) {
      navigator.clipboard.writeText(text);
      alert(`Copied to clipboard: ${text}`);
    }
  });
});

btnsNav.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const child = this.querySelector("a");
    const href = child.getAttribute("href");

    if (href.length == 1) return;

    console.log(href);

    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: "smooth" });
  });
});

btnLogo.addEventListener("click", function (e) {
  e.preventDefault();

  const section = document.querySelector("body");
  section.scrollIntoView({ behavior: "smooth" });
});

btnHero.addEventListener("click", function () {
  const section = document.querySelector(".about");
  section.scrollIntoView({ behavior: "smooth" });
});

const showCard = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("card--hidden");
    observer.unobserve(entry.target);
  });
};

const cardObserver = new IntersectionObserver(showCard, {
  root: null,
  threshold: 0.15,
});

cardsAbout.forEach(function (card) {
  cardObserver.observe(card);
  card.classList.add("card--hidden");
});

btnMenu.addEventListener("click", function () {
  this.classList.toggle("menu-bar--open");

  popupEl.classList.toggle("popup-background--open");
  bodyEl.classList.toggle("scroll-disabled");
});

btnsPop.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    popupEl.classList.remove("popup-background--open");
    bodyEl.classList.remove("scroll-disabled");
    btnMenu.classList.remove("menu-bar--open");

    const child = this.querySelector("a");
    const href = child.getAttribute("href");

    if (href.length == 1) return;

    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: "smooth" });
  });
});
