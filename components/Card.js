// Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
// Эта функция должна открывать попап с картинкой при клике на карточку.

//==========Импорт функции openPopup============//
import { openPopup } from '../utils/utils.js';

//===============Переменные и константы=========/
const popupImg = document.querySelector('.popup-img');
const popupImgPhoto = popupImg.querySelector('.popup-img__photo');
const popupImgTitle = popupImg.querySelector('.popup-img__title');

//==========Cоздаем класс Сard==============//
class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._tempateSelector = templateSelector;
    this._popupImg = popupImg;
    this._popupImgPhoto = popupImgPhoto;
    this._popupImgTitle = popupImgTitle;
    this._handleCardClick = handleCardClick;
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
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = 'Фотография' + this._name;

    this._setEventListeners();
    return this._element;
  }
  //===========Устанавливаем эвентлисенеры и передает туда методы===========//
  _setEventListeners() {
    this._likeIcon = this._element.querySelector('.element__button-like');
    this._likeIcon.addEventListener('click', () => this._likeCard());

    this._trashBinIcon = this._element.querySelector('.element__button-trash');
    this._trashBinIcon.addEventListener('click', () => this._deleteCard());

    this._elementPhoto.addEventListener('click', () => this._handleBigPicture());
  }

  //=============Методы для ивентлисенера=============//
  _deleteCard() {
    this._element.remove();
  }
  _likeCard() {
    this._likeIcon.classList.toggle('element__button-like_active');
  }
  //надо перенести в PopupWithImage
  // _handleBigPicture() {
  //   openPopup(this._popupImg);
  //   this._popupImgPhoto.src = this._link;
  //   this._popupImgTitle.textContent = this._name;
  //   this._popupImgPhoto.alt = `Фотография ` + this._popupImgTitle.textContent;
  // }
} //скобка закрытия класса

//==============Экспортируем класс Сard===============//
export { Card };
