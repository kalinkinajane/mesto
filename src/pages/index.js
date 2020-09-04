import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import {
    options, popupProfile, buttonEdit, profileName, profileJob, popupAdd,
    buttonAdd, placesSection
} from '../components/constants.js';
import '../pages/index.css';
// Создание экземпляра класса для проверяемой формы
const formProf = new FormValidator(options, popupProfile);
const formAdd = new FormValidator(options, popupAdd);
formProf.enableValidation();
formAdd.enableValidation();

function viewImage(item) {
    const imagePopup = new PopupWithImage('.popup-view');
    imagePopup.open(item.name, item.link);
    imagePopup.setEventListeners();
}

const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card({
            data,
            handleCardClick: (item) => {
                viewImage(item);
            }
        }, '.place-element');
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
},
    placesSection);
cardList.renderItems();

const addCards = new Section({
    data: []
}, placesSection);

const popupAddForm = new PopupWithForm(
    '.popup-add', (formData) => {
        const card = new Card({ data: formData, handleCardClick: (item) => { viewImage(item) } }, '.place-element');
        const cardElement = card.generateCard();
        addCards.addItem(cardElement);
    });

popupAddForm.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob);
const popupProf = new PopupWithForm('.popup-profile', (item) => { userInfo.setUserInfo(item.name, item.job); });
popupProf.setEventListeners();

buttonEdit.addEventListener('click', () => {
    popupProf.open();
    userInfo.getUserInfo();
    formProf.resetPopupValid(popupProfile);
});

buttonAdd.addEventListener('click', () => {
    popupAddForm.open();
    formAdd.resetPopupValid(popupAdd);
});

