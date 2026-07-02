/**
 * ==========================================
 * HEADER COMPONENT
 * ==========================================
 */

function initHeader() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    /* ==========================
       Mobile Navigation
    ========================== */

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", isOpen);
        });

        /* Close menu after clicking a navigation link */

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });

        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {
            const clickedInsideHeader =
                event.target.closest(".header");

            if (!clickedInsideHeader && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        /* Close menu with Escape key */

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                navLinks.classList.contains("active")
            ) {
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.focus();
            }
        });
    }

    /* ==========================
       Active Navigation Link
    ========================== */

    const currentPath = window.location.pathname;

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");

        const linkPath = new URL(link.href).pathname;

        if (
            currentPath === linkPath ||
            (linkPath !== "/" && currentPath.startsWith(linkPath))
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    /* ==========================
       Sticky Header Shadow
    ========================== */

    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
}

/* ==========================================
   Initialize Header
========================================== */

document.addEventListener("DOMContentLoaded", initHeader);