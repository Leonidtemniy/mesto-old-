import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgPhoto = this._popupSelector.querySelector('.popup-img__photo');
    this._popupImgTitle = this._popupSelector.querySelector('.popup-img__title');
  }

  open(name, link) {
    this._popupImgPhoto.src = link;
    this._popupImgTitle.textContent = name;
    this._popupImgPhoto.alt = `Фотография ${name}`;
    super.open();
  }
}
