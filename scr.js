

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
const popupAdd = page.querySelector('.popup-add');
const formAddElement = page.querySelector('.popup__form_add');
const popupView = document.querySelector('.popup-view');
const closeView = document.querySelector('.popup__close_view');
const buttonAdd = page.querySelector('.profile__button-add');
const closePopup = page.querySelector('.popup__close_add');
const inputPlace = page.querySelector('.popup__input_type_place-name');
const inputLink = page.querySelector('.popup__input_type_link');
const placesSection = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-element').content;
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');


/* Функция создания карточек plece*/
function createPlace(link, name) {
    const placeElement = placeTemplate.cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    const placeTitle = placeElement.querySelector('.place__title');
    const placeLike = placeElement.querySelector('.place__like')
    const deleteButton = placeElement.querySelector('.place__remove');
    placeImage.src = link;
    placeTitle.textContent = name;

    placeImage.addEventListener('click', () => viewImage(link, name));
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
// Отчистка форм
function cleanForm() {
    formAddElement.reset();
    formElement.reset();
    resetPopupValid(popupAdd, obj);
}
/*функция oткрытия popup-ов */
function openModal(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', toggleFormEsc);
};

buttonEdit.addEventListener('click', () => {
    openModal(popupProfile);
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
});

buttonAdd.addEventListener('click', () => openModal(popupAdd));
/*функция закрытия popup-ов */
function closeModal(popup) {
    popup.classList.remove('popup_open');
    cleanForm();
    resetPopupValid(popupAdd, obj);
    document.removeEventListener('keydown', toggleFormEsc);
};
popupClose.addEventListener('click', () => closeModal(popupProfile));
closePopup.addEventListener('click', () => closeModal(popupAdd));


/* Обработчик отправки формы редактирования профиля */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeModal(popupProfile);
};
formElement.addEventListener('submit', formSubmitHandler);

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
    closeModal(popupAdd);
};
formAddElement.addEventListener('submit', formAddCard);

/*Закрытие popup-ов при нажании на оврлей */

function closeOverley(evt) {
    if (evt.target.classList.contains('popup_open')) {
        evt.target.classList.remove('popup_open');
        cleanForm();
    }
};
document.addEventListener('click', closeOverley);


/*Закрытие popup-ов при нажатии Esc */
function toggleFormEsc(evt) {
    const openPopup = document.querySelector('.popup_open');
    if (evt.keyCode === 27) {
        closeModal(openPopup);
    }
};


/*функция oткрыть и закрыть popup-Image */
function viewImage(link, name) {
    popupImage.src = link;
    popupCaption.textContent = name;
    openModal(popupView);
};

closeView.addEventListener('click', () => closeModal(popupView));
enableValidation(obj);