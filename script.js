const navigationLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

function showSection(id) {
    // Fall back to home if the hash doesn't match a section
    if (!document.getElementById(id)) {
        id = "home";
    }

    for (const section of sections) {
        section.hidden = section.id !== id;
    }
}

showSection(location.hash.slice(1) || "home");

// Animate between sections where supported, switch instantly otherwise
function changeSection(id) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
        showSection(id);
        return;
    }

    document.startViewTransition(() => showSection(id));
}

for (const link of navigationLinks) {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href").slice(1);
        changeSection(id);
        history.pushState(null, "", `#${id}`);
    });
}

window.addEventListener("popstate", () => {
    changeSection(location.hash.slice(1) || "home");
});