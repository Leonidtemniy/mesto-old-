export const formSelectors = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorElement: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor(formSelectors, formElement) {
    this._formSelectors = formSelectors;
    this._formElement = formElement;
  }
  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add('popup__input_invalid'); //красим инпкт красным
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error'); // показываем сообщение об ошибке
  }
  ///функция скрывает элемент ошибки
  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('popup__input_invalid'); //убираем красным боксшэдоу
    errorElement.classList.remove('popup__input-error'); // скрываем сообщение об ошибке
    errorElement.textContent = '';
  }
  ///функция проверки инпутов на валидность
  checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }
  ///функция добавления слушателей на все инпуты
  setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__savebutton');

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(formElement, inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }
  ///функция на проверку на невалидность всех инпутов
  hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  /// функция изменения состояния кнопки
  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__savebutton_disabled');
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove('popup__savebutton_disabled');
      buttonElement.removeAttribute('disabled', true);
    }
  }
  ///функция запуска валидации
  enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(formElement => {
      this.setEventListeners(formElement);
    });
  }
}
