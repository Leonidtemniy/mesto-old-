////константы:
//формы из попапов вместо

////функции:

///функция показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_invalid '); //красим инпкт красным
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active'); // показываем сообщение об ошибке
};
///функция скрывает элемент ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_invalid '); //убираем красным боксшэдоу
  errorElement.classList.remove('form__input-error_active'); // скрываем сообщение об ошибке
  errorElement.textContent = '';
};
///функция проверки инпутов на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
///функция добавления слушателей на все инпуты
const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => checkInputValidity(formElement, inputElement));
  });
};

///функция запуска валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

///функция состояния кнопки
function setSubmitButtonState(isFormValid, button) {
  if (isFormValid) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__savebutton_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__savebutton_disabled ');
  }
}

//вызов функции enableValidation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled ',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
});
////////////////////////////
