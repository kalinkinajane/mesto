import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import {
    options, popupProfile, buttonEdit, popupAdd, buttonAdd,
    inputName, inputAbout, editAvatar, popupAva, popupButton
} from '../utils/constants.js';
import '../pages/index.css';

const placesSection = document.querySelector('.places');
// Экземпляр класс Api
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

// Экземпляр класс Userinfo для редактирования профиля
const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about',
    avatarSelector: '.profile__avatar'
});

function renderLoading(popup, isLoading) {
    if (isLoading) {
        popup.querySelector('.popup__button').innerText = 'Сохранение...'
    } else if (popup === popupAdd) {
        popup.querySelector('.popup__button').innerText = 'Создать'
    }
    else {
        popup.querySelector('.popup__button').innerText = 'Сохранить'
    }
}

// Попап просмотра изображения
const imagePopup = new PopupWithImage('.popup-view');
imagePopup.setEventListeners();

// Попап удаления карточки
const popupDel = new PopupConfirm('.popup-delete');
popupDel.setEventListeners();

// Попап редактирования профиля
const popupProf = new PopupWithForm('.popup-profile', (item) => {
    renderLoading(popupProfile, true)
    api.patchUserInfo(item).then((res) => {
        userInfo.setUserInfo({ name: res.name, about: res.about });
    }).then(() => {
        popupProf.close();
    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(() => {
        renderLoading(popupProfile, false)
    })
});
popupProf.setEventListeners();
// Попап редактирования аватара
const popupAvatar = new PopupWithForm('.popup-avatar', (link) => {
    renderLoading(popupAva, true)
    api.editAvatar(link).then((res) => {
        userInfo.setUserInfo({ avatar: res.avatar });
    }).then(() => {
        popupAvatar.close();
    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(() => {
        renderLoading(popupAva, false)
    })
});
popupAvatar.setEventListeners();

// Получение данных и отрисовка на странице
api.getUserInfo().then((userData) => {
    api.getItems().then((cards) => {
        const createCard = (items, myId) => {
            const card = new Card({
                data: items,
                myId: myId,
                ownerId: items.owner._id,
                handleCardClick: (item) => { imagePopup.open(item.name, item.link) },
                handleLikeClick: (id) => {
                    api.addLikes(id)
                        .then((data) => {
                            card.updateLikes(data.likes)
                        }).catch((err) => console.log(`Ошибка: ${err}`))
                },
                handleDislikeClick: (id) => {
                    api.deleteLikes(id)
                        .then((data) => {
                            card.updateLikes(data.likes)
                        }).catch((err) => console.log(`Ошибка: ${err}`))
                },
                handleDeleteClick: (id) => {
                    popupDel.setSubmitAction(() => {
                        api.removeCard(id)
                            .then((data) => {
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
        const user = userData;
        const myId = user._id;
        userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });
        // Попап добавления карточки
        const popupAddForm = new PopupWithForm(
            '.popup-add', (formData) => {
                renderLoading(popupAdd, true)
                api.addnewCard(formData).then((res) => {
                    const card = createCard(res, myId)
                    const cardElement = card.generateCard();
                    cardList.addItem(cardElement, true);
                }).then(() => {
                    popupAddForm.close();
                }).catch((err) => console.log(`Ошибка: ${err}`)).finally(() => {
                    renderLoading(popupAdd, false)
                })
            });
        // Открытие попапа добавления карточки
        popupAddForm.setEventListeners();
        buttonAdd.addEventListener('click', () => {
            popupAddForm.open();
            formAdd.resetPopupValid(popupAdd);
        });
        // Добавление карточек из загруженных данных
        const cardList = new Section({
            items: cards,
            renderer: (items) => {
                const card = createCard(items, myId);
                const cardElement = card.generateCard();
                cardList.addItem(cardElement, false);
            }
        }, placesSection)
        cardList.renderItems();
        // Открытие Попапов редактирования профиля и аватара
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
    }).catch((err) => console.log(`Ошибка: ${err}`))
    
}).catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
        formProf.enableValidation();
        formAdd.enableValidation();
        formAva.enableValidation();
    })

