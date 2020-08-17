import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';
import { openModal, closeModal } from './utils.js';
import {
    options, popupProfile, buttonEdit, popupClose, inputName,
    inputJob, profileName, profileJob, formElement, popupAdd,
    formAddElement, buttonAdd, closePopup, inputPlace, inputLink,
    popupView, closeView, placesSection
} from './constants.js';

// Создание экземпляра класса для проверяемой формы
const formProf = new FormValidator(options, popupProfile);
const formAdd = new FormValidator(options, popupAdd);

formProf.enableValidation();
formAdd.enableValidation();
// обход массива и создание экземпляра класса Card
initialCards.forEach((data) => {
    const card = new Card(data, '.place-element');
    // Добавляем карточку в DOM
    placesSection.append(card.generateCard());
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
    const newCard = new Card(newCards, '.place-element');
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




