const navigationLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

console.log(navigationLinks);
console.log(sections);

function showSection(id) 
{
    const selectedSection = document.getElementById(id);

    if (!selectedSection)
    {
        return;
    }
    for (const section of sections) 
    {
        section.hidden = section.id !== id;
    }
}

const initialId = location.hash.slice(1) || "home";
showSection(initialId);

for (const link of navigationLinks) {
    
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href").slice(1);
        document.startViewTransition(() => {
            showSection(id);
        });
        history.pushState(null, "", `#${id}`);
    });
}

window.addEventListener("popstate", () => {
    const id = location.hash.slice(1) || "home";
    showSection(id);
});