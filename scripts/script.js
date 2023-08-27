//========Импорты======//
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
//=========Предустановленные карточки==============//
const cardData = [
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

//======================Селекторы для валидации===================///
const settings = {
  inputElement: '.popup__input',
  buttonElement: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorElement: 'popup__input_invalid',
  errorClass: 'popup__input-error'
};

const formElement = document.querySelector('.popup__form');
const addFormElement = document.querySelector('.popup__form-add');

const formSelectorsEdit = new FormValidator(settings, formElement);
formSelectorsEdit.enableValidation();

const formSelectorsAdd = new FormValidator(settings, addFormElement);
formSelectorsAdd.enableValidation();

//======================Переменные и константы===================///
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.editpopup');
const editPopupCloseButton = editPopup.querySelector('.popup__closebutton');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const professionInput = editPopup.querySelector('.popup__input_type_profession');
const editPopupForm = editPopup.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const addPopup = document.querySelector('.addpopup');
const addButton = document.querySelector('.profile__add-button');
const addPopupCloseButton = addPopup.querySelector('#addPopupCloseButton');
const addPopupForm = addPopup.querySelector('#popupAddCardForm');
const popups = document.querySelectorAll('.popup');
const cardSection = document.querySelector('.elements');
const addPopupInputPlace = addPopup.querySelector('.popup__input_type_place');
const addPopupInputPath = addPopup.querySelector('.popup__input_type_img-path');

//=================Функция закрытия попапа по Esc================//
export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//=================Функцию н закрытия попапа===================//
export function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//=================Функцию открытие попапа======================//
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//================Закрытие кликом по оверлею===================//
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__closebutton')) {
      closePopup(popup);
    }
  });
});
//===========Ивентлисинер на кнопку addButton на открытие попапа добавления мест======//
addButton.addEventListener('click', () => {
  addPopupInputPlace.value = '';
  addPopupInputPath.value = '';
  formSelectorsAdd.resetValidation();
  openPopup(addPopup);
});
// добавляем ивентлисинер по клику на кнопку editButton для открытия попапа редактирования
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  formSelectorsEdit.resetValidation();
  nameInput.value = profileTitle.textContent;
  professionInput.value = profileProfession.textContent;
});
//закрытие попапов профиля и добавления мест
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup));
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup));

function createCard(data) {
  const cardElement = new Card(data, '#element-template');
  return cardElement.generateCard();
}

cardData.forEach(card => {
  const newCardElement = createCard(card);
  cardSection.append(newCardElement);
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

  const card = createCard({ name: placeValue, link: linkValue });
  cardSection.prepend(card);
  form.reset(); // скидываем ранее введенные данные с полей
  closePopup(addPopup); //закрытие попапа после сабмита формы
});

export { cardData, openPopup };
