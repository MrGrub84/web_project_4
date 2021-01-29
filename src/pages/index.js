import "./index.css";
import Api from "../components/Api.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { settingsObj } from "../utils/constants.js";
import {
    saveProfile,
    updatePhoto,
    delPlace,
    submitPlace,
    createCard
} from "../utils/utils.js";

//setup popups
export const popupEditProfile = new PopupWithForm(".popup_edit-profile", { submitFunction: saveProfile });
popupEditProfile.setEventListeners();
export const popupEditPhoto = new PopupWithForm(".popup_edit-photo", { submitFunction: updatePhoto });
popupEditPhoto.setEventListeners();
export const popupDeletePlace = new PopupWithForm(".popup_delete-place", { submitFunction: delPlace });
popupDeletePlace.setEventListeners();
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


//load initial cards from server
export const sectionCards = new Section({ 
    items: [], 
    renderer: createCard
},
".places__list");
sectionCards.setItems();

export const api = new Api({
    token: "0d68338b-8a47-4f79-b386-dae8c785bd51", 
    baseUrl: "https://around.nomoreparties.co/v1/group-8"
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
            }).catch((err) => {
                console.log(err);
            });
    }).catch((err) => {
        console.log(err);
    });