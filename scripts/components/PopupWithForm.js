import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(classSelector, { submitFunction }) {
        super(classSelector);
        this._action = submitFunction;
        this._form = this._elementPopup.querySelector(".form");
    }

    _getInputValues() {
        return this._form.elements;
    }

    setEventListeners() {
        this._elementPopup
            .querySelector(".popup__exit")
            .addEventListener("click",() => {
                this.close();
            });
        this._form.addEventListener('submit', this._action );
    }

    close() {
        this._elementPopup.classList.remove("popup_opened");
        document.removeEventListener("click",  this._handleOverlayClick);
        document.removeEventListener("keydown", this._handleEscClose);
        this._form.removeEventListener("submit", this._action);
        this._form.reset();
    }
}