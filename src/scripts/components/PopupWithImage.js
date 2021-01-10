import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(classSelector) {
        super(classSelector);
        this._photo = this._elementPopup.querySelector(".popup__photo");
        this._title = this._elementPopup.querySelector(".popup__photo-title")
    }

    open({ url, text }) {
        this._title.textContent = text;
        this._photo.src = "";
        this._photo.src = url;
        this._photo.alt = text;
        super.open(); 
    }
}