export class Card {
    constructor({ data, myId,ownerId, handleCardClick, handleLikeClick, handleDislikeClick, handleDeleteClick }, cardSelector) {
        this._cardData = data;
        this._cardId = data._id;
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes
        this._myId = myId;
        this._isLiked = data;
        this._ownerId = ownerId;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDislikeClick = handleDislikeClick;
        this._handleDeleteClick  = handleDeleteClick ;
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
        this._element.querySelector('.place__title').textContent = this._name;
        const imagePlace = this._element.querySelector('.place__image');
        imagePlace.src = this._link;
        imagePlace.alt = this._name;
        if( this._ownerId !== this._myId ){
            this._element.querySelector('.place__remove').classList.add('place__remove-none')
         } 
         this.updateLikes();
         this._setEventListeners();
        return this._element;
    }

    remove() {
        this._element.remove();
        // this._element = null;
    };
    _renderLikes(){
        const countLikes = this._element.querySelector('.place__like-count');
        countLikes.textContent = this._likes.length;
        this._isLiked = this._likes.some((person) => {
            return person._id === this._myId});
            this._renderLikesButton(this._isLiked)
    }
    _renderLikesButton(isliked){
        if(isliked){
            this._element.querySelector('.place__like').classList.add('place__like_active')
        }else{
            this._element.querySelector('.place__like').classList.remove('place__like_active') 
        }
    }
    updateLikes(){
        this._isLiked = !this._isLiked;
        this._renderLikes(this._likes.length);
        this._renderLikesButton(this._isliked);
    }
    _setEventListeners() {
        this._element.querySelector('.place__image').addEventListener('click', () => {
            this._handleCardClick(this._cardData);
        });
        this._element.querySelector('.place__remove').addEventListener('click', () => {
            console.log(this._cardId);
            this._handleDeleteClick(this._cardId) 
        });
        this._element.querySelector('.place__like').addEventListener('click', () => {
            this._handleLikeClick(this._cardId);
            this._handleDislikeClick(this._cardId);
        });
    };
}

