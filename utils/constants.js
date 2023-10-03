export const cardData = [
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1630535879508-9a3a8967d9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80'
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
export const editButton = document.querySelector('.profile__edit-button');
export const editPopup = document.querySelector('.editpopup');
export const nameInput = editPopup.querySelector('.popup__input_type_name');
export const professionInput = editPopup.querySelector('.popup__input_type_profession');
export const editPopupForm = editPopup.querySelector('.popup__form');
export const profileTitle = document.querySelector('.profile__title');
export const profileProfession = document.querySelector('.profile__subtitle');
export const addPopup = document.querySelector('.addpopup');
export const addButton = document.querySelector('.profile__add-button');
export const addPopupForm = addPopup.querySelector('.popup__form-add');
export const popups = document.querySelectorAll('.popup');
export const cardSection = document.querySelector('.elements');
export const addPopupInputPlace = addPopup.querySelector('.popup__input_type_place');
export const addPopupInputPath = addPopup.querySelector('.popup__input_type_img-path');
export const token = '64ae26d1-10a9-4e49-86a2-9595fb33be7b';
export const cohort = '76';

//=================Селекторы для валидации===================//
export const settings = {
  inputElement: '.popup__input',
  buttonElement: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorElement: 'popup__input_invalid',
  errorClass: 'popup__input-error'
};
