/* Массив карточек*/
export const initialCards = [
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
];

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
function renderLoading(isLoading){
    if(isLoading){
        popupButton.innerText = 'Сохранение...'
    }else{
        popupButton.innerText = 'Сохранить'
    }
}

const userInfo = new UserInfo(
    {nameSelector: '.profile__name',
         aboutSelector:'.profile__about',
          avatarSelector:'.profile__avatar' });


// Попап просмотра изображения
const imagePopup = new PopupWithImage('.popup-view');
imagePopup.setEventListeners();

// Попап удаления карточки
const popupDel = new PopupConfirm('.popup-delete');
popupDel.setEventListeners();

api.getUserInfo().then((data) => {
    const user = data;
    userInfo.setUserInfo({name: user.name, about:user.about, avatar:user.avatar });
  })


const newCardList = new Section({
    data: []
}, placesSection);

// Создание карточки и добавление

function creataCard(data) {
    const card = new Card({ data,
         handleCardClick: (item) => { imagePopup.open(item.name, item.link) },
         handleLikeClick: ()=> {},
         handleDeleteIconClick: ()=> {
            popupDel.open();
            popupDel.setSubmitAction(() => {
                api.removeCard(id).then((res) => {
                    card.remove();
                })
            })
         }
        }, '.place-element');
    const cardElement = card.generateCard();
    newCardList.addItem(cardElement);
}
api.getItems().then((data) => {
    const cardList = new Section({
        items: data,
        renderer: (items) => {
            creataCard(items)
        }
    }, placesSection
    )
    cardList.renderItems();
});
|| (this._ownerId = "4204ae1c8caf0eb6fbb2a7b8")
// Попап добавления карточки
const popupAddForm = new PopupWithForm(
    '.popup-add', (formData) => {
        console.log(formData)
        api.addnewCard(formData).then((res) =>{
            creataCard(res);
        }).then(()=> {
            popupAddForm.close();
        }).catch((err) => console.log(`Ошибка: ${err}`))
    });

popupAddForm.setEventListeners();


// Попап редактирования профиля

const popupProf = new PopupWithForm('.popup-profile', (item) => {
    renderLoading(true)
    api.patchUserInfo(item).then((res) =>{
        console.log(res)
        userInfo.setUserInfo({name: res.name, about:res.about});
    }).then(()=> {
        popupProf.close();
    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(()=>{
        renderLoading(false)
      })
});
popupProf.setEventListeners();
// Попап редактирования автвра
const popupAvatar = new PopupWithForm('.popup-avatar', (link) => {
    renderLoading(true)
    api.editAvatar(link).then((res) =>{
        console.log(res)
        userInfo.setUserInfo({avatar: res.avatar});
    }).then(()=> {
        popupAvatar.close();
    }).catch((err) => console.log(`Ошибка: ${err}`)).finally(()=>{
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

buttonAdd.addEventListener('click', () => {
    popupAddForm.open();
    formAdd.resetPopupValid(popupAdd);
});
editAvatar.addEventListener('click', () => {
    popupAvatar.open();
    formAva.resetPopupValid(popupAva)
});


export class Card {
    constructor({ data, myId,ownerId, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
       this._data = data;
        this._name = data.name;
        this._myId = myId;
        this._ownerId = ownerId;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick  = handleDeleteIconClick ;
        this._cardSelector = cardSelector;
        this._cardData = data;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.place__title').textContent = this._name;
        const imagePlace = this._element.querySelector('.place__image');
        imagePlace.src = this._link;
        imagePlace.alt = this._name;
        if(!this._myId === this._ownerId){
            this._element.querySelector('.place__remove').classList.add('place__remove-none')
        }
        this._setEventListeners();
        return this._element;
    }

    _likePlace(evt) {
        evt.target.classList.toggle('place__like_active');
    }
    remove() {
        this._element.remove();
        this._element = null;
    };
    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });
        this._element.querySelector('.place__remove').addEventListener('click', () => {
            
            this._handleDeleteIconClick(this._data._id) });
        this._element.querySelector('.place__like').addEventListener('click', (evt) => {
            this._likePlace(evt)
        });
    };
}




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

const userInfo = new UserInfo(
    {
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
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar });
api.getItems().then((data) => {
    const cardList = new Section({
        items: data,
        renderer: (items) => {
            const card = new Card({
                data: items,
                myId:  myId,
                ownerId: items.owner._id,
                handleCardClick: (item) => { imagePopup.open(item.name, item.link) },
                handleLikeClick: (id) => {
                    console.log(id)
                    api.changeLikeCardStatus(id)
                    .then((data) => {
                        console.log(data)
                        card.updateLikes(data)
                    })
                 },
                handleDeleteClick: (id) => {
                    popupDel.setSubmitAction(() => {
                        api.removeCard(id)
                        .then(() => {
                            card.remove();
                        })
                    })
                    popupDel.open();
                }
            },'.place-element');
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        }
    }, placesSection )
    cardList.renderItems();
})
})


// Попап добавления карточки
const popupAddForm = new PopupWithForm(
    '.popup-add', (formData) => {
        console.log(formData)
        api.addnewCard(formData).then((res) => {
            const card = new Card({ data: res, handleCardClick: (item) => { 
                console.log( res)
                imagePopup.open(item.name, item.link) } }, '.place-element'); 
            const cardElement = card.generateCard(); 
            newCardList.addItem(cardElement); 
        }).then(() => {
            popupAddForm.close();
        }).catch((err) => console.log(`Ошибка: ${err}`))
    });

popupAddForm.setEventListeners();


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

buttonAdd.addEventListener('click', () => {
    popupAddForm.open();
    formAdd.resetPopupValid(popupAdd);
});
editAvatar.addEventListener('click', () => {
    popupAvatar.open();
    formAva.resetPopupValid(popupAva)
});



