import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import {
    options, popupProfile, buttonEdit, profileName, profileJob, popupAdd,
    buttonAdd, inputName,inputJob
} from '../utils/constants.js';
import '../pages/index.css';
const placesSection = document.querySelector('.places');

// Создание экземпляра класса для проверяемой формы
const formProf = new FormValidator(options, popupProfile);
const formAdd = new FormValidator(options, popupAdd);
formProf.enableValidation();
formAdd.enableValidation();

const imagePopup = new PopupWithImage('.popup-view');
imagePopup.setEventListeners();

// Создание карточки и добавление
function creataCard(data) {
    const card = new Card({ data, handleCardClick: (item) => { imagePopup.open(item.name, item.link) } }, '.place-element');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
        creataCard(data);
    }
},
    placesSection);

cardList.renderItems();

const popupAddForm = new PopupWithForm(
    '.popup-add', (formData) => {
        creataCard(formData);
    });

popupAddForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob);
const popupProf = new PopupWithForm('.popup-profile', (item) => {
    userInfo.setUserInfo(item);
});

popupProf.setEventListeners();

buttonEdit.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    inputName.value = info.name;
    inputJob.value = info.job;
    popupProf.open();
    formProf.resetPopupValid(popupProfile);
});

buttonAdd.addEventListener('click', () => {
    popupAddForm.open();
    formAdd.resetPopupValid(popupAdd);
})
