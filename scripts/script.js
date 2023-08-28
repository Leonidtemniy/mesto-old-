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

//======================Переменные и константы===================///
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.editpopup');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const professionInput = editPopup.querySelector('.popup__input_type_profession');
const editPopupForm = editPopup.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');
const addPopup = document.querySelector('.addpopup');
const addButton = document.querySelector('.profile__add-button');
const addPopupForm = addPopup.querySelector('.popup__form-add');
const popups = document.querySelectorAll('.popup');
const cardSection = document.querySelector('.elements');
const addPopupInputPlace = addPopup.querySelector('.popup__input_type_place');
const addPopupInputPath = addPopup.querySelector('.popup__input_type_img-path');

//======================Селекторы для валидации и ее запуск ===================///
const settings = {
  inputElement: '.popup__input',
  buttonElement: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorElement: 'popup__input_invalid',
  errorClass: 'popup__input-error'
};

const formSelectorsEdit = new FormValidator(settings, editPopupForm);
formSelectorsEdit.enableValidation();

const formSelectorsAdd = new FormValidator(settings, addPopupForm);
formSelectorsAdd.enableValidation();

//=================Функция закрытия попапа по Esc================//
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//=================Функцию н закрытия попапа===================//
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//=================Функцию открытие попапа======================//
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//================Закрытие кликом по оверлею и крестику===================//
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
//===========Ивентлисинер на кнопку addButton для открытие попапа добавления мест======//
addButton.addEventListener('click', () => {
  addPopupInputPlace.value = '';
  addPopupInputPath.value = '';
  formSelectorsAdd.resetValidation();
  openPopup(addPopup);
});
//========Ивентлисинер на кнопку editButton для открытия попапа редактирования========//
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  formSelectorsEdit.resetValidation();
  nameInput.value = profileTitle.textContent;
  professionInput.value = profileProfession.textContent;
});
//=========Функция создания карточки===========//
function createCard(data) {
  const cardElement = new Card(data, '#element-template');
  return cardElement.generateCard();
}
//=========Цикл перебора масива cardData=====//
cardData.forEach(card => {
  const newCardElement = createCard(card);
  cardSection.append(newCardElement);
});

//================Добавляем сабмит на форму edit===============//
editPopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(editPopup);
});

//================Добавляем сабмит на форму add================//
addPopupForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const placeValue = values['place'];
  const linkValue = values['img-path'];
  const card = createCard({ name: placeValue, link: linkValue });
  cardSection.prepend(card);
  form.reset();
  closePopup(addPopup);
});

export { openPopup };
