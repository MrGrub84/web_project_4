import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import FormValidator from "./FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import { settingsObj, initialCards } from "./utils/constants.js";
import {
    saveProfile,
    submitPlace
} from "./utils/utils.js";

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
    renderer: (item) => {
        const card = new Card({ 
                data: { text: item.text, url: item.url, cardSelector: "#placeTemplate"},
                handleCardClick: () => {
                    popupShowPlace.open({ url: item.url, text: item.text })
                },
            });
        return card.get();
        }
    
},
".places__list");
sectionCards.setItems();

