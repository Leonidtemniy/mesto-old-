import { openPopup, closePopup } from './script.js';
//создаем и экспортируем класс Сard
const popupImg = document.querySelector('.popup-img'); //
const popupImgTitle = popupImg.querySelector('.popup-img__title');
const popupImgPhoto = popupImg.querySelector('.popup-img__photo');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._tempateSelector = templateSelector;
  }

  //создаем метод который находит, клонирует, и возращает тэмплэйт элемент
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._tempateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }

  //публичный метод создания карточи и подготовка к публикации
  generateCard() {
    //передаем разметку в приватное поле _element
    this._element = this._getTemplate();
    //добавляем данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = 'Фотография' + this._name;
    this._setEventListeners();
    return this._element;
  }
  //Устанавливаем эвентлисенеры и передает туда методы
  _setEventListeners() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', () => this._likeCard());
    this._element
      .querySelector('.element__button-trash')
      .addEventListener('click', () => this._deleteCard());
    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => this._handleBigPicture());
  }
  //методы для ивентлисенера
  _deleteCard() {
    this._element.remove();
  }
  _likeCard() {
    this._element
      .querySelector('.element__button-like')
      .classList.toggle('element__button-like_active');
  }
  _handleBigPicture() {
    popupImg.classList.add('popup_opened');
    popupImgPhoto.src = this._link;
    popupImgTitle.textContent = this._name;
  }
} //скобка закрытия класса

//перебор массива для создания карточек при загрузки

export { Card, popupImg, popupImgTitle, popupImgPhoto };
