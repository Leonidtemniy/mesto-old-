const editButton = document.querySelector('.profile__edit-button'); //объявляем переменную для кнопки редактирования профиля
const editPopup = document.querySelector('.editpopup'); //объявляем переменную для всего попапа редактирования профиля
const editPopupCloseButton = editPopup.querySelector('.popup__closebutton'); //объявляем переменную для кнопки закрытия профиля
const nameInput = editPopup.querySelector('.popup__input_type_name'); //объявляем переменную для ипута имени профиля
const professionInput = editPopup.querySelector('.popup__input_type_profession'); //объявляем переменную для инпута профессии
const editPopupForm = editPopup.querySelector('.popup__form'); //объявляем переменную для формы редактирования профиля
const profileTitle = document.querySelector('.profile__title'); //объявляем переменную для значения имени
const profileProfession = document.querySelector('.profile__subtitle'); //объявляем переменную для значения профессии

const addPopup = document.querySelector('.addpopup'); //объявляем переменную для всего попапа добавленияя мест
const addButton = document.querySelector('.profile__add-button'); // объявляем переменную для открытия попапа добавления мест
const addPopupCloseButton = addPopup.querySelector('#addPopupCloseButton'); // объявляем переменную для кнопки закрытия мест
const addPopupForm = addPopup.querySelector('#popupAddCardForm'); //объявляем переменную для формы добавления мест

function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened'); // создаем функцию на закрытие попапа
}
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened'); // создаем функцию на открытие попапа
}

addButton.addEventListener('click', () => openPopup(addPopup)); // добавляем ивентлисинер на кнопку addButton на открытие попапа добавления мест

editButton.addEventListener('click', function () {
  openPopup(editPopup); // добавляем ивентлисинер по клику на кнопку редактирования профиля для открытия попапа
  nameInput.value = profileTitle.textContent; // пишем текстконтент тайтла в инпут
  professionInput.value = profileProfession.textContent; // пишем текстконтент профессии в инпут
});
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup)); //закрытие попапа профиля
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup)); // закрытие попапа мест

editPopupForm.addEventListener('submit', function (evt) {
  // добавляем сабмит на форму
  evt.preventDefault(); //прерываем обновление страницы и отправку на сервер
  profileTitle.textContent = nameInput.value; // присваеваем значениее из инпута
  profileProfession.textContent = professionInput.value; // присваеваем значениее из инпута
  closePopup(editPopup); //закрытие попапа после сабмита формы
});

addPopupForm.addEventListener('submit', evt => {
  evt.preventDefault(); // прерываем обновление страницы и отправку на сервер

  closePopup(addPopup); //закрытие попапа после сабмита формы
});
