import { Popup } from './Popup.js';
export class PopupConfirm extends Popup {
    constructor(popupSelector, handleSubmitCallback) {
        super(popupSelector);
        this._handleSubmitCallback = handleSubmitCallback
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
      }
      setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.setSubmitAction();
        })
    }
}