import { Popup } from './Popup.js';
import {
    popupImage,
    popupCaption
} from './constants.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

    }
    open(name, link) {
        super.open();
        popupCaption.textContent = name;
        popupImage.src = link;
        popupImage.alt = name;
    }
}