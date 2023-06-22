const editValidators = {
  name: validateName,
  profession: validateProfession
};

const addValidators = {
  place: validatePlace,
  'img-path': validateImgPath
};

const classNames = {
  inputsContainer: 'popup__input',
  input: 'popup__input',
  inputInvalid: 'popup__input_invalid',
  error: 'popup__error'
};

function handleSubmit(values, evt) {
  evt.preventDefault();
}

function handleError() {
  console.error('Form Error');
}

enableValidation(editPopupForm, editValidators, classNames, handleEditSubmit, handleError);
enableValidation(addPopupForm, addValidators, classNames, handleAddSubmit, handleError);

function enableValidation(form, validators, classNames, handleSubmit, handleError) {
  // возращаем или строку или null
  const validate = (key, value, values) => {
    const validator = validators[key];
    return validator(value, values);
  };

  const getInputElement = key => {
    return form.querySelector(`.${classNames.input}[name=${key}]`);
  };

  const getErrorElement = key => {
    const inputsContainerEl = form.querySelector(`.${classNames.inputsContainer}`);

    return document.querySelector(`.${classNames.error}[data-key="${key}"]`); // поиск по всей странице, а не в одной форме
  };
  //////////////
  const setDisabledButton = () => {
    const saveButton = form.querySelector('.popup__savebutton');
    saveButton.classList.add('popup__savebutton_disabled');
  };
  const setUnDisabledButton = () => {
    const saveButton = form.querySelector('.popup__savebutton');
    saveButton.classList.remove('popup__savebutton_disabled');
  };
  /////////////

  const setError = (key, errorMessage) => {
    const inputEl = getInputElement(key);
    inputEl.classList.add(classNames.inputInvalid);

    let errorEl = getErrorElement(key);
    if (!errorEl) {
      errorEl = document.createElement('p');
      inputEl.after(errorEl);
    }
    errorEl.dataset.key = key;
    errorEl.classList.add(classNames.error);
    errorEl.textContent = errorMessage;
  };

  const clearError = key => {
    const inputEl = getInputElement(key);
    inputEl.classList.remove(classNames.inputInvalid);

    const errorEl = getErrorElement(key);
    if (errorEl) {
      errorEl.remove();
    }
  };

  form.addEventListener('input', evt => {
    const input = evt.target;
    const key = input.name;
    const value = input.value;
    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData);
    ///
    function hasInvalidInput(inputList) {
      return inputList.some(inputElement => {
        return !inputElement.validity.valid;
      });
    }
    ///
    const error = validate(key, value, values); // вызываем функцмю validate с данными всплывшими их инпута и поймаными на форме
    if (!error) {
      // ранний ретёрн если нет ошибки(венулся null)
      // input.onblur = () => {
      //   input.dataset.dirty = 'true';
      //   input.onblur = null;
      // };
      clearError(key);
      setUnDisabledButton();
      return;
    }
    setDisabledButton();
    // if (input.dataset.dirty === 'true') {
    setError(key, error);
    return;
    // }

    // input.onblur = () => {
    //   input.dataset.dirty = 'true';
    //   input.onblur = null;
    //   setError(key, error);
    // };
  });

  form.addEventListener('submit', evt => {
    // добавляем слушатель на сабмит формы
    let isFormValid = true;
    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData);
    formData.forEach((value, key) => {
      const input = getInputElement(key);
      // input.dataset.dirty = 'true';
      const error = validate(key, value, values);

      if (!error) {
        return;
      }
      setError(key, error);
      isFormValid = false;
    });

    if (!isFormValid) {
      evt.preventDefault();

      handleError(values, evt);
      return; // Прерываем выполнение функции
    }
    setUnDisabledButton();
    handleSubmit(values, evt);
  });
}
function validateName(value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.required = true;
  input.minLength = 2;
  input.maxLength = 40;
  input.value = value;

  const isValid =
    typeof input.checkValidity === 'function' ? input.checkValidity() : /^\w{2,40}$/i.test(value);

  if (!isValid) {
    return input.validationMessage;
  }
  if (value.length < 2 || value.length > 40) {
    return 'Минимальное колличество символов 2, максимальное 40';
  }

  return null;
}
function validateProfession(value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.required = true;
  input.minLength = 2;
  input.maxLength = 200;
  input.value = value;

  const isValid =
    typeof input.checkValidity === 'function' ? input.checkValidity() : /^\w{2,200}$/i.test(value);

  if (!isValid) {
    return input.validationMessage;
  }
  if (value.length < 2 || value.length > 200) {
    return 'Минимальное колличество символов 2, максимальное 200';
  }

  return null;
}
function validatePlace(value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.required = true;
  input.minLength = 2;
  input.maxLength = 30;
  input.value = value;

  const isValid =
    typeof input.checkValidity === 'function' ? input.checkValidity() : /^\w{2,30}$/i.test(value);

  if (!isValid) {
    return input.validationMessage;
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
      : /^(http|https):\/\/.*\.(jpg|jpeg|png|gif)$/i.test(value);

  if (!isValid) {
    return input.validationMessage;
  }

  return null;
}
////////////////
