/* Массив карточек*/
const initialCards = [
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
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const popupProfile = page.querySelector('.popup-profile');
const buttonEdit = page.querySelector('.profile__button-edit');
const popupClose = page.querySelector('.popup__close');
const inputName = page.querySelector('.popup__input_type_name');
const inputJob = page.querySelector('.popup__input_type_job');
const profileName = page.querySelector('.profile__name');
const profileJob = page.querySelector('.profile__job');
const formElement = page.querySelector('.popup__container');
const formAddElement = page.querySelector('.popup__container_add');
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
function addPlace(item) {
    const placeElement = placeTemplate.cloneNode(true);
    placeElement.querySelector('.place__image').src = item.link;
    placeElement.querySelector('.place__title').textContent = item.name;
    placeElement.querySelector('.place__like').addEventListener('click', function (evt) {
        /*Лайк карточек */
        evt.target.classList.toggle('place__like_active');
    });
    /*Удаление карточек */
    const deleteButton = placeElement.querySelector('.place__remove');
    deleteButton.addEventListener('click', function () {
        const placeItem = deleteButton.closest('.place');
        placeItem.remove();
    });
    /* oткрытие popup-view с картинкой */
    placeElement.querySelector('.place__image').addEventListener('click', function () {
        popupImage.src = item.link;
        popupCaption.textContent = item.name;
        openForm(popupView);
    });
    placesSection.prepend(placeElement);
};
/* перебор массива*/
function render() {
    initialCards.forEach(addPlace);
}
render();

/*Добавление карточки */
/* Обработчик отправки формы */
function formAddCard(evt) {
    evt.preventDefault();
    /*Добавление элемента в массив */
    const addInitialCards = {
        name: '',
        link: ''
    }
    addInitialCards.name = inputPlace.value;
    addInitialCards.link = inputLink.value;
    initialCards.unshift(addInitialCards);
    addPlace(addInitialCards);
    closeForm(popupAdd);
}
formAddElement.addEventListener('submit', formAddCard);

/*Закрытие popup-ов при нажатии Esc */
function toggleFormEsc(evt) {
    const openPopup = document.querySelector('.popup_open');
    if (evt.keyCode === 27) {
        closeForm(openPopup);
    }
    document.removeEventListener('keydown', toggleFormEsc);
};

/*Закрытие popup-ов при на оврлей */
document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_open')) {
        evt.target.classList.remove('popup_open')
    }
});
/*функция открытия блоков popup*/
function openForm(popup) {
    popup.classList.add('popup_open');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    document.addEventListener('keydown', toggleFormEsc);
}
/*функция закрытия блоков popup*/
function closeForm(popup) {
    popup.classList.remove('popup_open');
    inputPlace.value = '';
    inputLink.value = '';
}

/* Обработчик отправки формы */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeForm(popupProfile);
}
/*Слушатели  событий */
formElement.addEventListener('submit', formSubmitHandler);
/*открыть и закрыть popup-profile */
buttonEdit.addEventListener('click', () => openForm(popupProfile));
popupClose.addEventListener('click', () => closeForm(popupProfile));
/*функция открытия и закрытия блока popup-view__image*/
closeView.addEventListener('click', () => closeForm(popupView));
/*функция открытия и закрытия блока popup_add*/
buttonAdd.addEventListener('click', () => openForm(popupAdd));
closePopup.addEventListener('click', () => closeForm(popupAdd));

