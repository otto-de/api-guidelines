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

function initRuleFilter(): void {
  const ruleSelection = document.querySelectorAll(
    ".js_api-rule-selection"
  )[0] as HTMLSelectElement;
  const cssClasses = [...ruleSelection.options]
    .map((option: HTMLOptionElement) => option.value)
    .filter((x, i, a) => a.indexOf(x) === i)
    .filter((x) => x !== "");
  const apiContainer: Element = document.querySelectorAll(".api-container")[0];

  ruleSelection.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLSelectElement;

    apiContainer.classList.remove(
      ...cssClasses.map((cl) => `api-rule-filter-${cl}`)
    );
    if (target.value !== "") {
      apiContainer.classList.add(`api-rule-filter-${target.value}`);
    }

    document.documentElement.scrollTo(0, 0);
    target.blur();
  });
}

document.addEventListener("DOMContentLoaded", function initTopMenu() {
  logoLinkToTop();
  initRuleFilter();
});
