export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        this._conteiner = containerSelector;

    }
    addItem(element) {
        this._conteiner.prepend(element);
    }
    renderItems() {
        this._initialCards.forEach(item => {
            this._renderer(item);
        })
    }

} 
