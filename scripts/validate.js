////константы:
//формы из попапов вместо const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput}-error`); // Выбираем элемент ошибки на основе уникального класса
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
///функция добавления слушателей на все инпуты
const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
};
///функция проверки инпутов на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.valididy.valid) {
    showInputError(formElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity(form, formInput);
});

///функция состояния кнопки
function setSubmitButtonState(isFormValid, button) {
  if (isFormValid) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__savebutton_disabled ');
  }
}

///вызов функции enableValidation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled ',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
});
