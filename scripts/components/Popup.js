export default class Popup {
    constructor(classSelector) {
        this._elementPopup = document.querySelector(classSelector);
    }

    open() {
        this._elementPopup.classList.add("popup_opened");
        document.addEventListener("keypress", this._handleEscClose);
    }

    close() {
        this._elementPopup.classList.remove("popup_opened");
        document.removeEventListener("keypress", this._handleEscClose);
    }

    _handleEscClose(evt) {
        console.log(evt.key);
        if (evt.key === "Escape") { console.log("esc"); this.close(); } 
    }

    setEventListeners() {
        this._elementPopup
            .querySelector(".popup__exit")
            .addEventListener("click",() => {
        console.log("clicked");

                this.close();
            });
    }
}