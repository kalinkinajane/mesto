
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const buttonEdit = page.querySelector('.profile__button-edit');
const popupClose = page.querySelector('.popup__close');
let inputName = page.querySelector('.popup__item_type_name');
let inputJob = page.querySelector('.popup__item_type_job');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
const addButton = page.querySelector('.popup__button');
const formElement = page.querySelector('.popup__container');
const formAddElement = page.querySelector('.popup-add__container');



/*функция открытия и закрытия блока popup*/

function toggleForm() {
    popup.classList.toggle('popup_open');
    if (popup.classList.contains('popup_open')) {
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
}
/* Обработчик отправки формы */

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    toggleForm()
}
/*Слушатели собитий */
formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', toggleForm);
popupClose.addEventListener('click', toggleForm);


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
const placesSection = document.querySelector('.places');
const plaseTemplate = document.querySelector('.place-element').content;
const popupImage = document.querySelector('.popup-view__image');
const popupCaption = document.querySelector('.popup-view__caption');

/* Функция создания карточек plece*/
function addPlace(item) {
    const placeElement = plaseTemplate.cloneNode(true);
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
    placeElement.querySelector('.place__image').addEventListener('click', function (evt) { 
        evt.target.classList.toggle('popup-view__open');
        popupImage.src = item.link;
        popupCaption.textContent = item.name;
        togglePopupView();
    });
    placesSection.prepend(placeElement);
};
/* перебор массива*/
function render() {
    initialCards.forEach(addPlace);
}
render();

/*функция открытия и закрытия блока popup_add*/
const buttonAdd = page.querySelector('.profile__button-add');
const popupAdd = page.querySelector('.popup-add');
const closePopup = page.querySelector('.popup-add__close');
function togglePopup() {
    popupAdd.classList.toggle('popup-add__open');
    if (popupAdd.classList.contains('popup-add__open')) {
    }
}
buttonAdd.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

const inputPlace = page.querySelector('.popup__item_type_place-name');
const inputlink = page.querySelector('.popup__item_type_link');
/*Добавление карточки */
formAddElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    /*Добавление элемента в массив */
    let addInitialCards = {
        name: '',
        link: ''
    }
    addInitialCards.name = inputPlace.value;
    addInitialCards.link = inputlink.value;
    initialCards.unshift(addInitialCards);
    addPlace(addInitialCards);
    togglePopup();
});

/*функция открытия и закрытия блока popup-view__image*/
const popupView = document.querySelector('.popup-view');
const cloceView = document.querySelector('.popup-view__close');
function togglePopupView() {
    popupView.classList.toggle('popup-view__open');
    if ( popupView.classList.contains('popup-view__open')) {
    }
};
cloceView.addEventListener('click', togglePopupView);


