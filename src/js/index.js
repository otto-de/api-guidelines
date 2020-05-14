(() => {
  function initNavGroups() {
    [...document.getElementsByClassName("nav-item")].forEach((e) => {
      e.addEventListener("click", (ev) => {
        console.log(ev);
        if (e === ev.target.parentElement) e.classList.toggle("focused");
      });
    });
  }

  initNavGroups();
})();
