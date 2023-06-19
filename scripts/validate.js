const validators = {
  name: validateName,
  profession: validateProfession,
  place: validatePlace,
  'img-path': validateImgPath
};

const classNames = {
  inputsContainer: 'popup__input',
  input: 'popup__input',
  inputInvalid: 'popup__input_invalid',
  error: 'popup__error'
};

enableValidation(editPopupForm, validators, classNames);
enableValidation(addPopupForm, validators, classNames);

function enableValidation(form, validators, classNames) {
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
    // return inputsContainerEl.querySelector(`.${classNames.error}[data-key=${key}]`);
    return document.querySelector(`.${classNames.error}[data-key="${key}"]`); // поиск по всей странице, а не в одной форме
  };

  const setError = (key, errorMessage) => {
    const inputEl = getInputElement(key);
    inputEl.classList.add(classNames.inputInvalid);

    let errorEl = getErrorElement(key);
    if (!errorEl) {
      errorEl = document.createElement('p');
      inputEl.after(errorEl);
      errorEl.dataset.key = key;
      errorEl.classList.add(classNames.error);
    }
    errorEl.textContent = errorMessage;
  };
  const clearError = key => {
    const inputEl = getInputElement(key);
    inputEl.classList.remove(classNames.inputInvalid);
    const errorEl = getErrorElement(key);
    errorEl.remove();
  };

  form.addEventListener('input', evt => {
    const key = evt.target.name;
    const value = evt.target.value;
    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData);

    const error = validate(key, value, values); // вызываем функцмю validate с данными всплывшими их инпута и поймаными на форме
    if (!error) {
      // ранний ретёрн если нет ошибки(венулся null)
      clearError(key);
      return;
    }
    setError(key, error);
    return;
  });

  form.addEventListener('submit', evt => {
    // добавляем слушатель на сабмит формы
    evt.preventDefault(); // Отменяем отправку формы по умолчанию

    let isFormValid = true;
    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData);

    formData.forEach((value, key) => {
      const error = validate(key, value, values);
      if (!error) {
        return;
      }

      setError(key, error);
      isFormValid = false;
    });

    if (!isFormValid) {
      return; // Прерываем выполнение функции
    }

    const placeValue = values['place'];
    const linkValue = values['img-path'];
    const newUserCard = createCard({ name: placeValue, link: linkValue });
    elements.prepend(newUserCard);
    form.reset(); // Сбрасываем форму
    closePopup(addPopup); // Закрываем попап
  });
}
function validateName(value) {
  if (!value) {
    return 'Вы пропустили это поле';
  }
  if (value.length < 2 || value.length > 40) {
    return 'Минимальное колличество символов 2, максимальное 40';
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
  if (!value) {
    return 'Вы пропустили это поле';
  }

  if (!/^(http|https):\/\/.*\.(jpg|jpeg|png|gif)$/i.test(value)) {
    return 'Некорретный адрес сайта';
  }

  return null;
}
