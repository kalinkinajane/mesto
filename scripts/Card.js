import { popupImage, popupCaption, popupView, closeView } from './constants.js';
import { openModal, closeModal } from './utils.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
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
        this._setEventListeners();
        this._element.querySelector('.place__title').textContent = this._name;
        const imagePlace = this._element.querySelector('.place__image');
        imagePlace.src = this._link;
        imagePlace.alt = this._name;

        return this._element;
    }

    _likePlace = (evt) => {
        evt.target.classList.toggle('place__like_active');
    }
    _remove() {
        this._element.remove();
        this._element = null;
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