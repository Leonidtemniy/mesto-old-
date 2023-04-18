let closeButton = document.querySelector(".popup__closebutton");
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});
editButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});
