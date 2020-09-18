import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import { FormValidator } from '../components/FormValidator.js';
// import { initialCards } from '../components/initialCards.js';
import {
    options, popupProfile, buttonEdit, profileName, profileJob, popupAdd,
    buttonAdd, inputName, inputAbout, profileAvatar, editAvatar, popupAva, popupButton
} from '../utils/constants.js';
import '../pages/index.css';
const placesSection = document.querySelector('.places');

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
    headers: {
        authorization: '26d86045-320c-4f7c-aeb9-3bada9d26c3e',
        'Content-Type': 'application/json',
    }
})

// Создание экземпляра класса для проверяемой формы
const formProf = new FormValidator(options, popupProfile);
const formAdd = new FormValidator(options, popupAdd);
const formAva = new FormValidator(options, popupAva);
formProf.enableValidation();
formAdd.enableValidation();
formAva.enableValidation();
function renderLoading(isLoading) {
    if (isLoading) {
        popupButton.innerText = 'Сохранение...'
    } else {
        popupButton.innerText = 'Сохранить'
    }
}

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
});


// Попап просмотра изображения
const imagePopup = new PopupWithImage('.popup-view');
imagePopup.setEventListeners();

// Попап удаления карточки
const popupDel = new PopupConfirm('.popup-delete');
popupDel.setEventListeners();

const newCardList = new Section({
    data: []
}, placesSection);

// Создание карточки и добавление



api.getUserInfo().then((data) => {
    const user = data;
    const myId = user._id;
    console.log(myId)
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });
    api.getItems().then((data) => {
        const cardList = new Section({
            items: data,
            renderer: (items) => {
                const card = createCard(items, myId);
                const cardElement = card.generateCard();
                cardList.addItem(cardElement);
            }
        }, placesSection)
        cardList.renderItems();
    }).catch((err) => console.log(`Ошибка: ${err}`))

    // Попап добавления карточки
    const popupAddForm = new PopupWithForm(
        '.popup-add', (formData) => {
            console.log(formData)
            api.addnewCard(formData).then((res) => {
                const card = createCard(res, myId)
                const cardElement = card.generateCard();
                newCardList.addItem(cardElement);
            }).then(() => {
                popupAddForm.close();
            }).catch((err) => console.log(`Ошибка: ${err}`))
        });

    popupAddForm.setEventListeners();
    buttonAdd.addEventListener('click', () => {
        popupAddForm.open();
        formAdd.resetPopupValid(popupAdd);
    });
})

const createCard = (items, myId) => {
    const card = new Card({
        data: items,
        myId: myId,
        ownerId: items.owner._id,
        handleCardClick: (item) => { imagePopup.open(item.name, item.link) },
        handleLikeClick: (id) => {
            console.log(id)
            // ID карточки выводится в консоль
            api.addLikes(id)
                .then((data) => {
                    console.log(data.likes)
                    card.updateLikes(data.likes)
                }).catch((err) => console.log(`Ошибка: ${err}`))
        },
        handleDislikeClick: (id) => {
            api.deleteLikes(id)
                .then((data) => {
                    console.log(data)
                    card.updateLikes()
                }).catch((err) => console.log(`Ошибка: ${err}`))
        },
        handleDeleteClick: (id) => {
            popupDel.setSubmitAction(() => {
                api.removeCard(id)
                    .then((data) => {
                        console.log(data)
                        card.remove(data);
                    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(() => {
                        popupDel.close();
                    })
            })
            popupDel.open();
        }
    }, '.place-element');

    return card;
}



// Попап редактирования профиля

const popupProf = new PopupWithForm('.popup-profile', (item) => {
    renderLoading(true)
    api.patchUserInfo(item).then((res) => {
        console.log(res)
        userInfo.setUserInfo({ name: res.name, about: res.about });
    }).then(() => {
        popupProf.close();
    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(() => {
        renderLoading(false)
    })
});
popupProf.setEventListeners();
// Попап редактирования автвра
const popupAvatar = new PopupWithForm('.popup-avatar', (link) => {
    renderLoading(true)
    api.editAvatar(link).then((res) => {
        console.log(res)
        userInfo.setUserInfo({ avatar: res.avatar });
    }).then(() => {
        popupAvatar.close();
    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(() => {
        renderLoading(false)
    })
});
popupAvatar.setEventListeners();


buttonEdit.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    inputName.value = info.name;
    inputAbout.value = info.about;
    popupProf.open();
    formProf.resetPopupValid(popupProfile);
});


editAvatar.addEventListener('click', () => {
    popupAvatar.open();
    formAva.resetPopupValid(popupAva)
});



