// Создайте класс PopupWithImage

// Создайте класс PopupWithImage, который наследует от Popup.
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgPhoto = this._popupSelector.querySelector('.popup-img__photo');
    this._popupImgTitle - this._popupSelector.querySelector('.popup-img__title');
  }

  open(name, link) {
    super.open();
    this._popupImgPhoto.src = link;
    this._popupImgTitle.textContent = name;
    this._popupImgPhoto.alt = `Фотография ${name}`;
  }
}
