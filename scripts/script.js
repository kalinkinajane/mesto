
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const buttonEdit = page.querySelector('.profile__button-edit');
const popupClose = page.querySelector('.popup__close');
let inputName = page.querySelector('.popup__input-container_type_name');
let inputJob = page.querySelector('.popup__input-container_type_job');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
const addButton = page.querySelector('.popup__button');
let formElement = page.querySelector('.popup__container');

function toggleForm() {
    popup.classList.toggle('popup_open');
    if (popup.classList.contains('popup_open')) {
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    toggleForm()
}

formElement.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', toggleForm);
popupClose.addEventListener('click', toggleForm);