import { closePopup, openPopup } from './script.js';

//создаем и экспортируем класс Сard

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._tempateSelector = templateSelector;
  }

  //========Cоздаем метод который возращает найденный, клонируемый,тэмплэйт элемент====//
  _getTemplate() {
    return document
      .querySelector(this._tempateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  //==============Публичный метод создания карточи и подготовка к публикации===========//
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = 'Фотография' + this._name;
    this._setEventListeners();
    return this._element;
  }
  //===========Устанавливаем эвентлисенеры и передает туда методы===========//
  _setEventListeners() {
    this._likeIcon = this._element.querySelector('.element__button-like');
    this._likeIcon.addEventListener('click', () => this._likeCard());

    this._trashBinIcon = this._element.querySelector('.element__button-trash');
    this._trashBinIcon.addEventListener('click', () => this._deleteCard());

    this._popupImg = document.querySelector('.popup-img');
    this._popupImgPhoto = this._popupImg.querySelector('.popup-img__photo');
    this._popupImgTitle = this._popupImg.querySelector('.popup-img__title');
    this._cardImage = this._element.querySelector('.element__photo');
    this._cardImage.addEventListener('click', () => this._handleBigPicture());
  }

  //=============Методы для ивентлисенера=============//
  _deleteCard() {
    this._element.remove();
  }
  _likeCard() {
    this._likeIcon.classList.toggle('element__button-like_active');
  }
  _handleBigPicture() {
    openPopup(this._popupImg);
    this._popupImgPhoto.src = this._link;
    this._popupImgTitle.textContent = this._name;
  }
} //скобка закрытия класса

export { Card };
