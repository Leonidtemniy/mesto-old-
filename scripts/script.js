import { Card, popupImg } from './Card.js';

import { FormValidator } from './FormValidator.js';
////---------------------------///

////---------------------------///

const cardData = [
  // массив с карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formSelectors = new FormValidator({
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorElement: 'popup__input_invalid',
  errorClass: 'popup__input-error'
});

formSelectors.enableValidation();
console.log(formSelectors._inputErrorElement);

////Переменные и константы

//объявляем переменную для кнопки редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
//объявляем переменную для всего попапа редактирования профиля
const editPopup = document.querySelector('.editpopup');
//объявляем переменную для кнопки закрытия профиля
const editPopupCloseButton = editPopup.querySelector('.popup__closebutton');
//объявляем переменную для ипута имени профиля
const nameInput = editPopup.querySelector('.popup__input_type_name');
//объявляем переменную для инпута профессии
const professionInput = editPopup.querySelector('.popup__input_type_profession');
//объявляем переменную для формы редактирования профиля
const editPopupForm = editPopup.querySelector('.popup__form');
//объявляем переменную для значения имени
const profileTitle = document.querySelector('.profile__title');
//объявляем переменную для значения профессии
const profileProfession = document.querySelector('.profile__subtitle');
//объявляем переменную для всего попапа добавленияя мест
const addPopup = document.querySelector('.addpopup');
//объявляем переменную для открытия попапа добавления мест
const addButton = document.querySelector('.profile__add-button');
//объявляем переменную для кнопки закрытия мест
const addPopupCloseButton = addPopup.querySelector('#addPopupCloseButton');
//объявляем переменную для формы добавления мест
const addPopupForm = addPopup.querySelector('#popupAddCardForm');
//объявляем переменную всех Попапов
const popups = document.querySelectorAll('.popup');
/////////////////////

////функции закрытия и открытия

//функция закрытия по Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//функцию на закрытие попапа
export function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//функцию на открытие попапа
export function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//метод прохода по всем попапам для закрытия кликом по оверлею
popups.forEach(popup => {
  popup.addEventListener('click', click => {
    if (click.target === popup) {
      closePopup(popup);
    }
  });
});
// добавляем ивентлисинер на кнопку addButton на открытие попапа добавления мест
addButton.addEventListener('click', () => openPopup(addPopup));
// добавляем ивентлисинер по клику на кнопку editButton для открытия попапа редактирования
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileTitle.textContent;
  professionInput.value = profileProfession.textContent;
});
//закрытие попапов профиля и добавления мест
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));
popupImg
  .querySelector('.popup-img__closebutton')
  .addEventListener('click', () => closePopup(popupImg));
//перебор массива для создания карточек при загрузки
cardData.forEach(card => {
  const newCard = new Card(card, '#element-template');
  const newCardElement = newCard.generateCard();
  document.querySelector('.elements').append(newCardElement);
});

// добавляем сабмит на форму edit
editPopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault(); //прерываем обновление страницы и отправку на сервер
  profileTitle.textContent = nameInput.value; // присваеваем значениее из инпута
  profileProfession.textContent = professionInput.value; // присваеваем значениее из инпута
  closePopup(editPopup); //закрытие попапа после сабмита формы
});

//добавляем сабмит на форму add
addPopupForm.addEventListener('submit', evt => {
  evt.preventDefault(); // прерываем обновление страницы и отправку на сервер
  const form = evt.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const placeValue = values['place'];
  const linkValue = values['img-path'];

  const card = new Card({ name: placeValue, link: linkValue }, '#element-template');
  const newUserCard = card.generateCard();
  document.querySelector('.elements').prepend(newUserCard);
  form.reset(); // скидываем ранее введенные данные с полей
  closePopup(addPopup); //закрытие попапа после сабмита формы
  const closeButton = addPopupForm.querySelector('.popup__savebutton');
  closeButton.classList.add('popup__savebutton_disabled');
  closeButton.setAttribute('disabled', 'disabled');
});

export { cardData, formSelectors };
