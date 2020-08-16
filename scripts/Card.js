import { popupImage, popupCaption, popupView, closeView } from './index.js';
import { openModal, closeModal } from './utils.js';

export class Card {
    constructor(data) {
        this._name = data.name;
        this._link = data.link;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector('.place-element')
            .content
            .querySelector('.place')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.place__title').textContent = this._name;
        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__image').alt = this._name;

        return this._element;
    }

    _likePlace = (evt) => {
        evt.target.classList.toggle('place__like_active');
    }
    _remove() {
        this._element.remove();
    };
    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });
        closeView.addEventListener('click', () => {
            closeModal(popupView);
        });
        this._element.querySelector('.place__remove').addEventListener('click', () => { this._remove() });
        this._element.querySelector('.place__like').addEventListener('click', (evt) => {
            this._likePlace(evt)
        });
    };
    _handleOpenPopup() {
        popupImage.src = this._link;
        popupCaption.textContent = this._name;
        openModal(popupView);
    }
};