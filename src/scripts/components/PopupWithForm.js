import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(classSelector, { submitFunction }) {
        super(classSelector);
        this._action = submitFunction;
        this._form = this._elementPopup.querySelector(".form");
        this._formValues = {};
        this._inputList = Array.from(this._form.querySelectorAll(".input"));
        this._elementsErrors = Array.from(this._form.querySelectorAll(".form-error"));
    }

    _getInputValues() {
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            this._action(this._getInputValues());
        });
    }

    _removeErrors() {
        this._elementsErrors.forEach((el) => {
            el.textContent = "";
        });
    }

    getForm() {
        return this._form;
    }

    close() {
        super.close();
        this._removeErrors();
        this._form.reset();
    }
}