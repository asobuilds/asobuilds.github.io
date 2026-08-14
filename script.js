// ===== AUTO-UPDATE FOOTER YEAR =====
document.addEventListener('DOMContentLoaded', function () {
    const year = new Date().getFullYear();
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `<p>&copy; ${year} Agene S. Okoh. Built with ❤️</p>`;
    }
});