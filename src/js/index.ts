function logoLinkToTop(): void {
  const logoElement: HTMLLinkElement | null = document.querySelector(
    ".js_api-sidebar__logo-link"
  );

  if (logoElement) {
    logoElement.addEventListener("click", (event) => {
      event.preventDefault();
      document.documentElement.scrollTop = 0;
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  logoLinkToTop();
});
