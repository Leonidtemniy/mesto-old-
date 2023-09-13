import { popups } from './constants.js';
//перенесены в popup.js
//=================Функция закрытия попапа по Esc================//
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//=================Функцию н закрытия попапа===================//
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}
//=================Функцию открытие попапа======================//
export function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
//================Закрытие кликом по оверлею и крестику===================//
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__closebutton')) {
      closePopup(popup);
    }
  });
});
