import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { openModal, closeModal } from './utils.js';

export const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const page = document.querySelector('.page');
const popupProfile = page.querySelector('.popup-profile');
const buttonEdit = page.querySelector('.profile__button-edit');
const popupClose = popupProfile.querySelector('.popup__close');
const inputName = page.querySelector('.popup__input_type_name');
const inputJob = page.querySelector('.popup__input_type_job');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__form');
const popupAdd = page.querySelector('.popup-add');
const formAddElement = page.querySelector('.popup__form_add');
const buttonAdd = page.querySelector('.profile__button-add');
const closePopup = popupAdd.querySelector('.popup__close');
const inputPlace = page.querySelector('.popup__input_type_place-name');
const inputLink = page.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupView = document.querySelector('.popup-view');
const closeView = document.querySelector('.popup__close_view');
const placesSection = document.querySelector('.places');
export { popupImage, popupCaption, popupView, closeView };

// Создание экземпляра класса для проверяемой формы
const formProf = new FormValidator(options, popupProfile);
const formAdd = new FormValidator(options, popupAdd);

formProf.enableValidation();
formAdd.enableValidation();
// обход массива и создание экземпляра класса Card
initialCards.forEach((data) => {
    const card = new Card(data);
    // Добавляем карточку в DOM
    placesSection.prepend(card.generateCard());
});

/* Обработчик отправки формы редактирования профиля */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModal(popupProfile);
};

// Добавление новой каточки
function formAddCard(evt) {
    evt.preventDefault();
    const newCards = {
        name: '',
        link: ''
    }
    newCards.name = inputPlace.value;
    newCards.link = inputLink.value;
    const newCard = new Card(newCards);
    placesSection.prepend(newCard.generateCard());
    closeModal(popupAdd);
};

// слушатели событий
buttonEdit.addEventListener('click', () => {
    openModal(popupProfile);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    formProf.resetPopupValid(popupProfile);
});
buttonAdd.addEventListener('click', () => {
    openModal(popupAdd);
    formAddElement.reset();
    formAdd.resetPopupValid(popupAdd);
});
popupClose.addEventListener('click', () => closeModal(popupProfile));
closePopup.addEventListener('click', () => closeModal(popupAdd));
formElement.addEventListener('submit', formSubmitHandler);
formAddElement.addEventListener('submit', formAddCard);
closeView.addEventListener('click', () => closeModal(popupView));




