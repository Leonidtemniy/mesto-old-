import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputElements = this._formElement.querySelectorAll('.popup__input');
    this._getInputValues = this._getInputValues.bind(this);
  }
  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach(inputs => {
      inputValues[inputs.name] = inputs.value;
    });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formElement.reset();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
  }
}
