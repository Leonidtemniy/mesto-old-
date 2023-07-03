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

////функции закрытия и открытия

//функция закрытия по Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//функцию на закрытие попапа
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//функцию на открытие попапа
function openPopup(anyPopup) {
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

const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');
const elements = document.querySelector('.elements'); // объявляем переменную элементс
const popupImg = document.querySelector('.popup-img');

const popupImgTitle = popupImg.querySelector('.popup-img__title');
const popupImgPhoto = popupImg.querySelector('.popup-img__photo');

// функция создания карточки
const createCard = ({ name, link }) => {
  const newCard = cardTemplate.cloneNode(true);
  const newCardName = newCard.querySelector('.element__title'); // объявляем переменную с названием места
  newCardName.textContent = name; // присваеваем текст названия из масива
  const newCardPhoto = newCard.querySelector('.element__photo'); // объявляем переменную с фото
  newCardPhoto.src = link; // присваеваем текст ссылки на фото из масива
  newCardPhoto.alt = 'Фотография ' + name;
  newCardPhoto.addEventListener('click', () => {
    openPopup(popupImg);
    popupImgTitle.textContent = newCardName.textContent;
    popupImgPhoto.src = newCardPhoto.src;
    popupImgPhoto.alt = newCardPhoto.alt;
  });
  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__button-like_active');
  });
  const trashButton = newCard.querySelector('.element__button-trash');
  trashButton.addEventListener('click', () => {
    newCard.remove();
  });

  return newCard;
};

cardData.forEach(card => {
  //проходим циклом по массиву
  const newCard = createCard(card);
  elements.append(newCard);
});

// добавляем сабмит на форму edit
editPopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault(); //прерываем обновление страницы и отправку на сервер
  profileTitle.textContent = nameInput.value; // присваеваем значениее из инпута
  profileProfession.textContent = professionInput.value; // присваеваем значениее из инпута
  closePopup(editPopup); //закрытие попапа после сабмита формы
});

// добавляем сабмит на форму add
addPopupForm.addEventListener('submit', evt => {
  evt.preventDefault(); // прерываем обновление страницы и отправку на сервер
  const form = evt.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);
  const placeValue = values['place'];
  const linkValue = values['img-path'];
  const newUserCard = createCard({ name: placeValue, link: linkValue });
  elements.prepend(newUserCard);
  form.reset(); // скидываем ранее введенные данные с полей
  closePopup(addPopup); //закрытие попапа после сабмита формы
  const closeButton = addPopupForm.querySelector('.popup__savebutton');
  closeButton.classList.add('popup__savebutton_disabled');
  closeButton.setAttribute('disabled', true);
});
