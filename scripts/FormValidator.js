export class FormValidator {
  constructor(formSelectorsSet, formElement) {
    this._formElement = formElement;
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
    this._inputList = Array.from(formElement.querySelectorAll(`${this._inputElement}`));
    this._submitButton = formElement.querySelector(`${this._buttonElement}`);

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
  ///метод на проверку на невалидность всех инпутов
  hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  /// метод изменения состояния кнопки
  toggleButtonState() {
    if (this.hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  enableValidation() {
    //const formElement = document.querySelector(`${this._formElement}`);
    this.setEventListeners(this._formElement);
  }
  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach(inputElement => {
      this.hideInputError(inputElement);
    });
  }
}
