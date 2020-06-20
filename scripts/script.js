

const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const popupProfile = page.querySelector('.popup-profile');
const buttonEdit = page.querySelector('.profile__button-edit');
const popupClose = page.querySelector('.popup__close');
const inputName = page.querySelector('.popup__input_type_name');
const inputJob = page.querySelector('.popup__input_type_job');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__form');
const formAddElement = page.querySelector('.popup__form_add');
const popupView = document.querySelector('.popup-view');
const closeView = document.querySelector('.popup__close_view');
const buttonAdd = page.querySelector('.profile__button-add');
const popupAdd = page.querySelector('.popup-add');
const closePopup = page.querySelector('.popup__close_add');
const inputPlace = page.querySelector('.popup__input_type_place-name');
const inputLink = page.querySelector('.popup__input_type_link');
const placesSection = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-element').content;
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');


/* Функция создания карточек plece*/
function createPlace(link, name) {
    const placeTemplate = document.querySelector('.place-element').content;
    const placeElement = placeTemplate.cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    const placeTitle = placeElement.querySelector('.place__title');
    const placeLike = placeElement.querySelector('.place__like')
    const deleteButton = placeElement.querySelector('.place__remove');
    placeImage.src = link;
    placeTitle.textContent = name;

    placeImage.addEventListener('click', evt => viewImage(link, name))
    placeLike.addEventListener('click', likePlace);
    deleteButton.addEventListener('click', deletePlace);
    return placeElement;
};

/* Функция добавления карточек plece*/
function getPlace(placeElement, placesSection) {
    placesSection.prepend(placeElement);
};
/* перебор массива*/
initialCards.forEach((place) => {
    const item = createPlace(place.link, place.name);
    getPlace(item, placesSection);
});

/*Лайк карточек */
function likePlace(evt) {
    evt.target.classList.toggle('place__like_active');
};

/*Удаление карточек */
function deletePlace(evt) {
    const placeItem = evt.target.closest('.place');
    placeItem.remove();
};
/*функция oткрыть и закрыть popup-profile */
function toggleProfilePopup() {
    if (popupProfile.classList.contains('popup_open')) {
        popupProfile.classList.remove('popup_open');
        document.removeEventListener('keydown', toggleProfileEsc);
        return;
    }
    popupProfile.classList.add('popup_open');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    resetPopupValid(popupProfile, obj);
    document.addEventListener('keydown', toggleProfileEsc);
};
/*Закрытие popup-ов при нажатии Esc */
function toggleProfileEsc(evt) {
    const openPopup = document.querySelector('.popup_open');
    if (evt.keyCode === 27) {
        toggleProfilePopup(openPopup);
    }
};
/* Обработчик отправки формы */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    toggleProfilePopup();
};
formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', toggleProfilePopup);
popupClose.addEventListener('click', toggleProfilePopup);
/*функция oткрыть и закрыть popup-add */
function toggleAddPopup() {
    if (popupAdd.classList.contains('popup_open')) {
        popupAdd.classList.remove('popup_open');
        document.removeEventListener('keydown', toggleAddEsc);
        return;
    }
    popupAdd.classList.add('popup_open');
    inputPlace.value = '';
    inputLink.value = '';
    enableValidation(obj);
    resetPopupValid(popupAdd, obj);
    document.addEventListener('keydown', toggleAddEsc);
};
/*Закрытие popup-ов при нажатии Esc */
function toggleAddEsc(evt) {
    const openPopup = document.querySelector('.popup_open');
    if (evt.keyCode === 27) {
        toggleAddPopup(openPopup);
    }
};

/*Добавление карточки */
function formAddCard(evt) {
    evt.preventDefault();
    const newCards = {
        name: '',
        link: ''
    }
    newCards.name = inputPlace.value;
    newCards.link = inputLink.value;
    const newCard = createPlace(inputLink.value, inputPlace.value);
    getPlace(newCard, placesSection);
    toggleAddPopup();
};
formAddElement.addEventListener('submit', formAddCard);
buttonAdd.addEventListener('click', toggleAddPopup);
closePopup.addEventListener('click', toggleAddPopup);
/*функция oткрыть и закрыть popup-Image */
function toggleImagePopup(link, name) {
    if (popupView.classList.contains('popup_open')) {
        popupView.classList.remove('popup_open');
        document.removeEventListener('keydown', toggleImageEsc);
        return;
    }
    popupView.classList.add('popup_open');
    popupImage.src = link;
    popupCaption.textContent = name;
    document.addEventListener('keydown', toggleImageEsc);
}
popupImage.addEventListener('click', toggleImagePopup);
closeView.addEventListener('click', toggleImagePopup);

/*Закрытие popup-ов при нажатии Esc */
function toggleImageEsc(evt) {
    const openPopup = document.querySelector('.popup_open');
    if (evt.keyCode === 27) {
        toggleImagePopup(openPopup);
    }
};
/*Закрытие popup-ов при на оврлей */
function closeOverley(evt) {
    if (evt.target.classList.contains('popup_open')) {
        evt.target.classList.remove('popup_open')
    }
};
document.addEventListener('click', closeOverley);
enableValidation(obj);