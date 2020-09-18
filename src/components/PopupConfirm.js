import { Popup } from './Popup.js';
export class PopupConfirm extends Popup {
    constructor(popupSelector, handleSubmitCallback) {
        super(popupSelector);
        this._handleSubmitCallback = handleSubmitCallback
        this._formSubmit = this._popup.querySelector('.popup__form');
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
      }
      setEventListeners() {
        super.setEventListeners();
        this._formSubmit.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
           
        })
    }
}