export class Card {
    constructor({ data, handleCardClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
        this._setEventListeners();
        return this._element;
    }

    _likePlace(evt) {
        evt.target.classList.toggle('place__like_active');
    }
    _remove() {
        this._element.remove();
        this._element = null;
    };
    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });
        this._element.querySelector('.place__remove').addEventListener('click', () => { this._remove() });
        this._element.querySelector('.place__like').addEventListener('click', (evt) => {
            this._likePlace(evt)
        });
    };
}

