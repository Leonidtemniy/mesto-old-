//=====Импорты=====//
import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
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
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

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

  const formSelectorsEdit = new FormValidator(settings, editPopupForm);
  formSelectorsEdit.enableValidation();
});

//=====Добавление карточек с кнопки=====//

const popupWithAddCard = new PopupWithForm('.addpopup', inputs => {
  const cardInfo = {
    name: inputs['place'],
    link: inputs['img-path']
  };
  newSection.addItem(createCard(cardInfo));
  popupWithAddCard.close();
});
popupWithAddCard.setEventListeners();

addButton.addEventListener('click', () => {
  popupWithAddCard.open();
  const formSelectorsAdd = new FormValidator(settings, addPopupForm);
  formSelectorsAdd.enableValidation();
  formSelectorsAdd.disableButton();
});

//=====Добавление карточек из cardData =====//

const popupWithImage = new PopupWithImage('.popup-img');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}
const popupWithConfirmation = new PopupWithConfirmation('.deletepopup');
function handleTrashButtonClick() {
  popupWithConfirmation.open();
}

function createCard(data) {
  const card = new Card(data, '#element-template', handleCardClick, handleTrashButtonClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const newSection = new Section(
  {
    items: cardData,
    renderer: items => newSection.addItem(createCard(items))
  },
  cardSection
);
newSection.renderItems();

fetch('https://mesto.nomoreparties.co/v1/cohort-76/cards', {
  headers: {
    authorization: '64ae26d1-10a9-4e49-86a2-9595fb33be7b'
  }
})
  .then(res => res.json())
  .then(result => {
    console.log(result);
  });
