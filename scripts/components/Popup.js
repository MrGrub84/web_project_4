export default class Popup {
    constructor(classSelector) {
        this._elementPopup = document.querySelector(classSelector);
    }

    open() {
        this._elementPopup.classList.add("popup_opened");
        document.addEventListener("click",  this._handleOverlayClick);
        document.addEventListener("keydown",  this._handleEscClose);
    }

    close() {
        this._elementPopup.classList.remove("popup_opened");
        document.removeEventListener("click",  this._handleOverlayClick);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") { this.close(); } 
    }

    _handleOverlayClick = (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            this.close();
        }
    }

    setEventListeners() {
        this._elementPopup
            .querySelector(".popup__exit")
            .addEventListener("click",() => {
                this.close();
            });
    }
}