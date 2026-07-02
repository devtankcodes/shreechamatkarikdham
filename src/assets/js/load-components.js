async function loadComponent(id, file) {
    const response = await fetch(file);

    if (!response.ok) {
        console.error(`Cannot load ${file}`);
        return;
    }

    document.getElementById(id).innerHTML = await response.text();
}

async function loadComponents() {
    await Promise.all([
        loadComponent("header", "/src/components/header.html"),
        loadComponent("footer", "/src/components/footer.html")
    ]);

    // Initialize component scripts after they're inserted
    if (typeof initHeader === "function") {
        initHeader();
    }

    if (typeof initFooter === "function") {
        initFooter();
    }
}

loadComponents();