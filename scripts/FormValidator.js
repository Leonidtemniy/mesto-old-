export class FormValidator {
  constructor(formSelectorsSet) {
    this._formSelectors = formSelectorsSet.formSelectors;
    this._formElement = formSelectorsSet.formElement;
    this._buttonElement = formSelectorsSet.buttonElement;
    this._inactiveButtonClass = formSelectorsSet.inactiveButtonClass;
    this._inputErrorElement = formSelectorsSet.inputErrorElement;
    this._errorClass = formSelectorsSet.errorClass;
  }
  ///метод  элементов с ошибкой
  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add('popup__input_invalid'); //красим инпкт красным
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error'); // показываем сообщение об ошибке
  }
  ///метод скрытия элементов с ошибкой
  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('popup__input_invalid'); //убираем красным боксшэдоу
    errorElement.classList.remove('popup__input-error'); // скрываем сообщение об ошибке
    errorElement.textContent = '';
  }
  ///метод проверки инпутов на валидность
  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }
  ///метод добавления слушателей на все инпуты
  setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__savebutton');

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }
  ///метод на проверку на невалидность всех инпутов
  hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  /// метод изменения состояния кнопки
  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__savebutton_disabled');
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove('popup__savebutton_disabled');
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }
  //запускаем метод
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelectors));
    formList.forEach(formElement => {
      this.setEventListeners(formElement);
    });
  }
}
