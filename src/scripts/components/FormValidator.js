export default class FormValidator {
    constructor(settingsObj, formElement) {
        this._settings = settingsObj;
        this._element = formElement;
        this._inputList = Array.from(formElement.elements);
        this._button = formElement.querySelector(settingsObj.submitButtonSelector);
    }

    enableValidation = () => {
        this._element.addEventListener("submit", (evt) => { evt.preventDefault(); });
        this._setEventListeners(this._element);
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._toggleButtonState(this._settings, this._element);
            if (this._checkInputValidity(inputElement)) {
                this._hideInputError(inputElement);
            } else {
                this._showInputError(inputElement, inputElement.validationMessage);
            }
          });
        });
    };

    _checkFormValidity = () => {
        return !this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity = (inputElement) => {
        return inputElement.validity.valid;
    };

    _toggleButtonState() {
        if (this._checkFormValidity(this._settings, this._element)) {
            this._button.classList.remove(this._settings.inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._settings.inactiveButtonClass);
            this._button.disabled = true;
        }
    }
    
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
    };
      
    _hideInputError = (inputElement) => {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "";
    };
}