//NAVBAR AND FOTTER LOADER
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and insert the navbar
    const navbarContainer = document.getElementById("navbar");
    if (navbarContainer) {
        fetch("/assets/components/navbar.html")
            .then((res) => {
                if (!res.ok) throw new Error("Navbar file not found");
                return res.text();
            })
            .then((data) => {
                navbarContainer.innerHTML = data;
            })
            .catch((err) => console.error("Error loading navbar:", err));
    }

    // Fetch and insert the footer
    const footerContainer = document.getElementById("footer");
    if (footerContainer) {
        fetch("/assets/components/footer.html")
            .then((res) => res.text())
            .then((data) => {
                footerContainer.innerHTML = data;
            })
            .catch((err) => console.error("Error loading footer:", err));
    }
});



//NAVBAR FUNCTION

document.addEventListener("DOMContentLoaded", () => {
    // 1. Highlight current active route automatically
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll(".desktop-link, .pill-nav-link");

    allLinks.forEach((link) => {
        const linkPath = link.getAttribute("href");
        if (currentPath === linkPath || (linkPath !== "/" && currentPath.startsWith(linkPath))) {
            link.classList.add("active");
        } else if (linkPath !== currentPath) {
            link.classList.remove("active");
        }
    });

    // 2. Elevation shadow on scroll
    const header = document.getElementById("topNavbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 8px 24px rgba(14, 23, 58, 0.09)";
        } else {
            header.style.boxShadow = "0 4px 20px rgba(14, 23, 58, 0.05)";
        }
    });
});


//FOTTER FUNCTION

// Auto-update footer copyright year
const yearElement = document.getElementById("currentYear");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}