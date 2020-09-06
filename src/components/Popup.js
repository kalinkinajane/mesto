export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
    open() {
        this._popup.classList.add('popup_open');
        document.addEventListener('keydown', (evt) => { this._handleEscClose(evt) });
        this._popup.addEventListener('mousedown', (evt) => {
            this._handleOverleyClose(evt)
        });

    }
    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', (evt) => { this._handleEscClose(evt) });
        this._popup.removeEventListener('mousedown', (evt) => { this._handleOverleyClose(evt) });
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





