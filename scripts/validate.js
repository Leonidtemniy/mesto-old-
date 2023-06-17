const editPopupForm = editPopup.querySelector('.popup__form'); //41минута
const addPopupForm = addPopup.querySelector('#popupAddCardForm');
const validators = {
  name: valideteName,
  profession: validateProfession,
  place: validatePlace,
  imgPath: validateImgPath
};

const classNames = {
  inputsContainer: 'popup__form',
  input: 'popup__input',
  inputInvalid: 'popup__input_invalid',
  error: 'popup__error'
};

enableValidation(form, validators, classNames);
function enableValidation(form, validators, classNames) {
  // возращаем или строку или null
  const validate = (key, value, values) => {
    const validator = validators[key];
    return validator(value, values);
  };
  const getInputElement = (form, key) => {
    const inputClass = classNames.input;
    return form.querySelector(`.${inputClass}[name=${key}]`);
  };
  const getErrorElement = (form, key) => {
    const inputsContainerEl = form.querySelector(`.${classNames.inputsContainer}`);
    const errorClass = classNames.error;
    return inputsContainerEl.querySelector(`.${errorClass.error}[data-key=${key}]`);
  };
}
function valideteName(value) {
  if (!value) {
    return 'Вы пропустили это поле';
  }
  if (value.length < 2 || value.length > 40) {
    return 'Минимальное колличество символов 2, максимальное 200';
  }
  return null;
}
function validateProfession(value) {
  if (!value) {
    return 'Вы пропустили это поле';
  }
  if (value.length < 2 || value.length > 200) {
    return 'Минимальное колличество символов 2, максимальное 200';
  }
  return null;
}
function validatePlace(value) {
  if (!value) {
    return 'Вы пропустили это поле';
  }
  if (value.length < 2 || value.length > 30) {
    return 'Минимальное колличество символов 2, максимальное 30';
  }
  return null;
}
function validateImgPath(value) {
  const input = document.createElement('input');
  input.type = 'url';
  input.required = true;
  input.value = value;
  const isValid =
    typeof input.checkValidity === 'function'
      ? input.checkValidity()
      : /^(?:https?:\/\/)?[\w.-]+\.[a-z]{2,}$/i.test(value);

  if (!value) {
    return 'Вы пропустили это поле';
  }
  return null;
}
