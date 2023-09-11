//========Импорты======//

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  editPopupForm,
  addPopupForm,
  addButton,
  editButton,
  cardData,
  cardSection,
  settings
} from '../utils/constants.js';

//======================Валидация запуск(2 формы)===================///

const formSelectorsEdit = new FormValidator(settings, editPopupForm);
formSelectorsEdit.enableValidation();

const formSelectorsAdd = new FormValidator(settings, addPopupForm);
formSelectorsAdd.enableValidation();

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
