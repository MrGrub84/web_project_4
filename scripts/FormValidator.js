export class FormValidator {
    constructor(settingsObj, formElement) {
        this._settings = settingsObj;
        this._element = formElement;
    }

    enableValidation = () => {
        this._element.addEventListener("submit", (evt) => { evt.preventDefault(); });
        this._setEventListeners(this._element);
    }

    _setEventListeners = () => {
        const inputList = Array.from(this._element.querySelectorAll(this._settings.inputSelector));
        inputList.forEach((inputElement) => {
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
        return !Array.from(this._element.querySelectorAll(this._settings.inputSelector)).some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity = (inputElement) => {
        return inputElement.validity.valid;
    };

    _toggleButtonState() {
        const button = this._element.querySelector(this._settings.submitButtonSelector);
        if (this._checkFormValidity(this._settings, this._element)) {
            button.classList.remove(this._settings.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._settings.inactiveButtonClass);
            button.disabled = true;
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