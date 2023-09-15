export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      popup.addEventListener('mousedown', evt => {
        if (
          evt.target.classList.contains('popup_opened') ||
          evt.target.classList.contains('popup__closebutton')
        ) {
          this.close();
        }
      });
    });
  }
}
