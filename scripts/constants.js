export const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const page = document.querySelector('.page');
export const popupProfile = page.querySelector('.popup-profile');
export const buttonEdit = page.querySelector('.profile__button-edit');
export const popupClose = popupProfile.querySelector('.popup__close');
export const inputName = page.querySelector('.popup__input_type_name');
export const inputJob = page.querySelector('.popup__input_type_job');
export const profileName = page.querySelector('.profile__name');
export const profileJob = page.querySelector('.profile__job');
export const formElement = page.querySelector('.popup__form');
export const popupAdd = page.querySelector('.popup-add');
export const formAddElement = page.querySelector('.popup__form_add');
export const buttonAdd = page.querySelector('.profile__button-add');
export const closePopup = popupAdd.querySelector('.popup__close');
export const inputPlace = page.querySelector('.popup__input_type_place-name');
export const inputLink = page.querySelector('.popup__input_type_link');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const popupView = document.querySelector('.popup-view');
export const closeView = document.querySelector('.popup__close_view');
export const placesSection = document.querySelector('.places');

