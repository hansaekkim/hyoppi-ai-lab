const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");

menuButton.addEventListener("click", function () {
  menu.classList.toggle("show");
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("show");
  });
});
