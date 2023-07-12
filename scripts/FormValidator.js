export class FormValidator {
  constructor(formSelectorsSet) {
    this._formElement = formSelectorsSet.formElement;
    this._inputElement = formSelectorsSet.inputElement;
    this._buttonElement = formSelectorsSet.buttonElement;
    this._inactiveButtonClass = formSelectorsSet.inactiveButtonClass;
    this._inputErrorElement = formSelectorsSet.inputErrorElement;
    this._errorClass = formSelectorsSet.errorClass;
  }

  ///метод  элементов с ошибкой
  showInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._inputErrorElement); //красим инпкт красным
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass); // показываем сообщение об ошибке
  }
  ///метод скрытия элементов с ошибкой
  hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._inputErrorElement); //убираем красным боксшэдоу
    errorElement.classList.remove(this._errorClass); // скрываем сообщение об ошибке
    errorElement.textContent = '';
  }
  ///метод проверки инпутов на валидность
  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement);
    } else {
      this.hideInputError(inputElement);
    }
  }
  ///метод добавления слушателей на все инпуты
  setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${this._inputElement}`));
    const buttonElement = formElement.querySelector(`${this._buttonElement}`);

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
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(`${this._formElement}`));
    formList.forEach(formElement => {
      this.setEventListeners(formElement);
    });
  }
}
