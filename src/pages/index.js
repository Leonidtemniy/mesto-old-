//=====Импорты=====//
import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

import {
  nameInput,
  professionInput,
  editPopupForm,
  addPopupForm,
  addButton,
  editButton,
  cardData,
  cardSection,
  settings
} from '../../utils/constants.js';

//=====Профиль=====//

const userInfo = new UserInfo({
  userName: '.profile__title',
  userInfo: '#profileProfession'
});

const popupWithProfilInfo = new PopupWithForm('.editpopup', inputs => {
  userInfo.setUserInfo({
    name: inputs['name'],
    info: inputs['profession']
  });
  popupWithProfilInfo.close();
});
popupWithProfilInfo.setEventListeners();

editButton.addEventListener('click', () => {
  popupWithProfilInfo.open();
  const userNameAndProfession = userInfo.getUserInfo();
  nameInput.value = userNameAndProfession.name;
  professionInput.value = userNameAndProfession.info;
});

const formSelectorsEdit = new FormValidator(settings, editPopupForm);
formSelectorsEdit.enableValidation();

//=====Добавление карточек с кнопки=====//

const popupWithAddCard = new PopupWithForm('.addpopup', inputs => {
  const cardInfo = {
    name: inputs['place'],
    link: inputs['img-path']
  };
  newSection.addItem(newCard(cardInfo));
  popupWithAddCard.close();
});
popupWithAddCard.setEventListeners();

addButton.addEventListener('click', () => {
  popupWithAddCard.open();
});

const formSelectorsAdd = new FormValidator(settings, addPopupForm);
formSelectorsAdd.enableValidation();

//=====Добавление карточек из cardData =====//

const popupWithImage = new PopupWithImage('.popup-img');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function newCard(data) {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const newSection = new Section(
  {
    items: cardData,
    renderer: items => newSection.addItem(newCard(items))
  },
  cardSection
);
newSection.renderItems();
console.log('Hello, World!');
