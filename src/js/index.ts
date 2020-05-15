function initNavGroups(): void {
  Array.from(document.getElementsByClassName("nav-item")).forEach((e) => {
    e.classList.remove("focused");
    e.addEventListener("click", (ev) => {
      if (e === (ev.target as HTMLElement).parentElement)
        e.classList.toggle("focused");
    });
  });
}

initNavGroups();
