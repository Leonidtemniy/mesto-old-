const cardData = [
  // массив с карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//создаем и экспортируем класс Сard
class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  //создаем метод который находит, клонирует, и возращает тэмплэйт элемент
  _getTemplate() {
    const cardTemplate = document
      .querySelector('#element-template')
      .content.querySelector('.element')
      .cloneNode(true);
    return cardTemplate;
  }

  //публичный метод создания карточи и подготовка к публикации
  generateCard() {
    //передаем разметку в приватное поле _element
    this._element = this._getTemplate();
    //добавляем данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = 'Фотография' + this._name;
    return this._element;
  }
} //скобка закрытия класса

cardData.forEach(card => {
  const newCard = new Card(card.name, card.link);
  const newCardElement = newCard.generateCard();
  document.querySelector('.elements').append(newCardElement);
});
