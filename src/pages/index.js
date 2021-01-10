import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { settingsObj, initialCards } from "../scripts/utils/constants.js";
import {
    saveProfile,
    submitPlace,
    createCard
} from "../scripts/utils/utils.js";

//setup popups
export const popupEditProfile = new PopupWithForm(".popup_edit-profile", { submitFunction: saveProfile });
popupEditProfile.setEventListeners();
export const popupAddPlace = new PopupWithForm(".popup_add-place", { submitFunction: submitPlace });
popupAddPlace.setEventListeners();
export const popupShowPlace = new PopupWithImage(".popup_photo-showcase");
popupShowPlace.setEventListeners();

//setup Forms
const formList = Array.from(document.querySelectorAll(".form"));      
formList.forEach((formElement) => {
    const validator = new FormValidator(settingsObj, formElement);
    validator.enableValidation();
});


//load initial cards from array
export const sectionCards = new Section({ 
    items: initialCards, 
    renderer: createCard
},
".places__list");
sectionCards.setItems();

