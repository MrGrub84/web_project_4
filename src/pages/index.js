import Api from "../scripts/components/Api.js";
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
    items: [], 
    renderer: createCard
},
".places__list");
sectionCards.setItems();

export const api = new Api({
    token: "0d68338b-8a47-4f79-b386-dae8c785bd51"
});
api.getMe()
    .then((res) => {
        saveProfile({ name: res.name, job: res.about, photo: res.avatar })
    })
    .then(() => {
        api.getCards()
            .then((res) => {
                res.forEach((card) => {
                    sectionCards.addItem(createCard(card));
                });
            });
    });