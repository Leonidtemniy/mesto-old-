//=====Импорты=====//
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
} from '../utils/constants.js';

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
