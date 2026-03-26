document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === '404') {
        showError("Page Not Found");

        setTimeout(() => {
            const errorDiv = document.getElementById("error-message");
            if (errorDiv) {
                fadeOut(errorDiv, 500);
            }
        }, 3000);

        window.history.replaceState({}, document.title, window.location.pathname);
    }

    document.addEventListener('click', async (e) => {
        const link = e.target.closest('a');

        if (link && link.href && link.href.startsWith(window.location.origin)) {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

            e.preventDefault();

            try {
                const response = await fetch(link.href, { method: 'HEAD' });
                if (response.ok) {
                    window.location.href = link.href;
                } else {
                    window.location.href = "home.html?status=404";
                }
            } catch (err) {
                window.location.href = "home.html?status=404";
            }
        }
    });
});

function showError(message) {
    const errorDiv = document.getElementById("error-message");
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove("d-none");
        errorDiv.style.opacity = "1";
    }
}

function fadeOut(el, duration) {
    el.style.transition = `opacity ${duration}ms`;
    el.style.opacity = 0;
    setTimeout(() => el.classList.add("d-none"), duration);
}
