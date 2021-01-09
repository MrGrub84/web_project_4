import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(classSelector) {
        super(classSelector);
    }

    open({ url, text }) {
        const photo = this._elementPopup.querySelector(".popup__photo");
        this._elementPopup.querySelector(".popup__photo-title").textContent = text;
        photo.src = "";
        photo.src = url;
        photo.alt = text;
        this._elementPopup.classList.add("popup_opened");
        document.addEventListener("click",  this._handleOverlayClick);
        document.addEventListener("keydown",  this._handleEscClose);
    }
}