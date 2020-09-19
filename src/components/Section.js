export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        this._conteiner = containerSelector;

    }
    addItem(element, isCard) {
        if(isCard){
            this._conteiner.prepend(element);
        }else{
            this._conteiner.append(element); 
        }
        
    }
    renderItems() {
        this._initialCards.forEach(item => {
            this._renderer(item);
        })
    }
}
