export default class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }) {
        this._text = data.card.name;
        this._url = data.card.link;
        this._likes = (data.card.likes ? data.card.likes : [] );
        this._id = data.card._id;
        this._template = document.querySelector(data.cardSelector).content;;
        this._handleCardClick = handleCardClick;
        this._deletePlace = handleDeleteClick;
        this._like = handleLikeClick;
        this._element = this._createCard();
    }

    _createCard() {
        const template = this._template.cloneNode(true);
        const elementPhoto = template.querySelector(".places__photo");
        const trash = template.querySelector(".places__delete");
        const like = template.querySelector(".places__favorite");
        elementPhoto.src = this._url;
        elementPhoto.alt = this._text;
        template.querySelector(".places__text").textContent = this._text;
        template.querySelector(".places__like-count").textContent = this._likes.length;
        like.addEventListener("click", this._like);
        if (this._likes.length > 0) {
            const counter = template.querySelector(".places__like-count");
            counter.textContent = this._likes.length;
            like.classList.add("places__favorite_active");

        }
        like.dataset.postId = this._id;
        trash.addEventListener("click", this._deletePlace);
        trash.dataset.postId = this._id;
        trash.id = `postId-${this._id}`;
        this._addPopupEventListener(elementPhoto);
        return template;
    }

    get() {
        return this._element;
    }

    _addPopupEventListener(element) {
        element.addEventListener("click", (evt) => { 
            this._handleCardClick();
        });
    }
}