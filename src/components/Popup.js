export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverleyClose = this._handleOverleyClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleOverleyClose);
    }
    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._handleOverleyClose);
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape' && this._popup.classList.contains('popup_open')) {
            this.close(this._popup);
        }
    }
    _handleOverleyClose(evt) {
        if (evt.target.classList.contains('popup_open')) {
            this.close();
        }
    };
    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
    }
}





