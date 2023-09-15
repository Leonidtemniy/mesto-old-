//==========Cоздаем класс Сard==============//
export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._tempateSelector = templateSelector;
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

    this._elementPhoto.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  //=============Методы для ивентлисенера=============//
  _deleteCard() {
    this._element.remove();
  }
  _likeCard() {
    this._likeIcon.classList.toggle('element__button-like_active');
  }
}
