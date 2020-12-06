const settingsObj = {
    formSelector: ".form",
    inputSelector: ".input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
  };

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
    return inputElement.validity.valid;
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
  
  enableValidation(settingsObj); 