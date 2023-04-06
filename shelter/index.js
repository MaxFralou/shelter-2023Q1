const BURGER_BTN = document.querySelector(".burger-btn")
const MENU = document.querySelector(".header-nav")
const LINKS = document.querySelectorAll(".list-item-link")
const BODY_DIMM = document.querySelector('.body-wrapper')


// IMPLEMENTATION BURGER MENU

let menuOpen = false;

function toggleMenu() {
    MENU.classList.toggle("active-nav");
    BURGER_BTN.classList.toggle("active-burger-btn");
    BODY_DIMM.classList.toggle("show-menu");
    menuOpen = !menuOpen;

    if (menuOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
}

function closeMenu() {
    MENU.classList.remove("active-nav");
    BURGER_BTN.classList.remove("active-burger-btn");
    BODY_DIMM.classList.remove("show-menu");
    menuOpen = false;
    document.body.style.overflow = "";
}

BURGER_BTN.addEventListener("click", toggleMenu);

document.addEventListener("click", (event) => {
    if (!MENU.contains(event.target) && !BURGER_BTN.contains(event.target)) {
        closeMenu();
    }
});

LINKS.forEach((link) => {
    link.addEventListener("click", closeMenu);
});