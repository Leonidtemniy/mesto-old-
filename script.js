const editButton = document.querySelector(".profile__edit-button"); //объявляем переменную для кнопки редактирования профиля
const editPopup = document.querySelector(".editpopup"); //объявляем переменную для всего попапа редактирования профиля
const editPopupCloseButton = editPopup.querySelector(".popup__closebutton"); //объявляем переменную для
const nameInput = editPopup.querySelector(".popup__name"); //объявляем переменную для ипута имени профиля
const professionInput = editPopup.querySelector(".popup__profession"); //объявляем переменную для инпута профессии
const editPopupForm = editPopup.querySelector(".popup__form"); //объявляем переменную для формы редактирования профиля
const profileTitle = document.querySelector(".profile__title"); //объявляем переменную для значения имени
const profileProfession = document.querySelector(".profile__subtitle"); //объявляем переменную для значения профессии

editButton.addEventListener("click", function () {
  // добавляем ивентлисинер по клику на кнопку редактирования профиля для открытия попапа
  editPopup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  professionInput.value = profileProfession.textContent;
});
editPopupCloseButton.addEventListener("click", function () {
  // добавляем ивнтлисинер на кнопку на закрытие
  editPopup.classList.remove("popup_opened");
});

editPopupForm.addEventListener("submit", function (evt) {
  // добавляем сабмит на форму
  evt.preventDefault(); //прерываем обновление страницы и отправку на сервер
  const name = nameInput.value;
  const profession = professionInput.value;
  profileTitle.textContent = name;
  profileProfession.textContent = profession;
  editPopup.classList.remove("popup_opened");
});
