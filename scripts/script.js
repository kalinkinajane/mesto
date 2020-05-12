
const page = document.querySelector('.page');
const popup = page.querySelector('.popup');
const buttonEdit = page.querySelector('.profile__button-edit');
const popupClose = page.querySelector('.popup__close');
let InputName = page.querySelector('.popup__input_type_name');
let InputJob = page.querySelector('.popup__input_type_job');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__job');
const addButton = page.querySelector('.popup__button');
let formElement = page.querySelector('.popup__container');

function openForm() {
    popup.classList.toggle('popup__open');
    if (popup.classList.contains('popup__open')) {
        InputName.value = profileName.textContent;
        InputJob.value = profileJob.textContent;
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = InputName.value;
    profileJob.textContent = InputJob.value;
    openForm()

}

formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', formSubmitHandler);
buttonEdit.addEventListener('click', openForm);
popupClose.addEventListener('click', openForm);