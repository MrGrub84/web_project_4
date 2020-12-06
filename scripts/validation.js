function escListener(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
};

function overlayListener(evt) {
    if (evt.target.classList.contains("popup_opened")) {
        closePopup(evt.target);
    }
}

function toggleButtonState(settingsObj, formElement) {
    const button = formElement.querySelector(settingsObj.submitButtonSelector);
    if (checkFormValidity(settingsObj, formElement)) {
        button.classList.remove(settingsObj.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(settingsObj.inactiveButtonClass);
        button.disabled = true;
    }
}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      return true;
    } else {
      return false;
    }
  };

  const checkFormValidity = (settingsObj, formElement) => {
    return !Array.from(formElement.querySelectorAll(settingsObj.inputSelector)).some((inputElement) => {
        return !inputElement.validity.valid;
    });
  }
  
  const setEventListeners = (settingsObj, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        toggleButtonState(settingsObj, formElement);
        if (checkInputValidity(inputElement)) {
            hideInputError(formElement, inputElement);
        } else {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        }
      });
    });
  };
  
  const enableValidation = (settingsObj) => {
    const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
    
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => { evt.preventDefault(); });
      setEventListeners(settingsObj, formElement);
    });
  }
  
  enableValidation({
    formSelector: ".form",
    inputSelector: ".input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
  }); 