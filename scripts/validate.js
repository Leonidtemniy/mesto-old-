////константы:
//формы из попапов вместо

////функции:

///функция показывает элемент ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add('popup__input_invalid'); //красим инпкт красным
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error'); // показываем сообщение об ошибке
};
///функция скрывает элемент ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove('popup__input_invalid'); //убираем красным боксшэдоу
  errorElement.classList.remove('popup__input-error'); // скрываем сообщение об ошибке
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
  const buttonElement = formElement.querySelector('.popup__savebutton');

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
///функция на проверку на невалидность всех инпутов
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};
/// функция изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__savebutton_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__savebutton_disabled');
    buttonElement.removeAttribute('disabled', true);
  }
};
///функция запуска валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    setEventListeners(formElement);
  });
};

//вызов функции enableValidation
enableValidation({
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorElement: 'popup__input_invalid',
  errorClass: 'popup__input-error_active'
});
////////////////////////////
