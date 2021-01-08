import Popup from "./components/Popup.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import FormValidator from "./FormValidator.js";
import Section from "./components/Section.js";
import { settingsObj, popupSelectors, initialCards } from "./utils/constants.js";
import { Card } from "./Card.js";

const profileEdit = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__title");
const inputName = document.querySelector(".popup__name");
const inputAbout = document.querySelector(".popup__about");
const inputPlaceTitle = document.querySelector(".popup__place-title");
const inputPlaceUrl = document.querySelector(".popup__url");
const places = document.querySelector('.places__list');

//setup popups
const popupEditProfile = new PopupWithForm(".popup_edit-profile", { submitFunction: saveProfile });
popupEditProfile.setEventListeners();
const popupAddPlace = new PopupWithForm(".popup_add-place", { submitFunction: submitPlace });
popupAddPlace.setEventListeners();
const popupShowPlace = new PopupWithImage(".popup_photo-showcase");
popupShowPlace.setEventListeners();

//setup Forms
const formList = Array.from(document.querySelectorAll(".form"));      
formList.forEach((formElement) => {
    const validator = new FormValidator(settingsObj, formElement);
    validator.enableValidation();
});

function submitPlace() {
    const card = createCard({ 
        text: inputPlaceTitle.value, 
        url: inputPlaceUrl.value, 
        cardSelector: "#placeTemplate"
    });
    places.prepend(card);
    popupAddPlace.close();
}

function onLoad() {
    initialCards.forEach(function(item) {
        const card = createCard({
            text: item.text, 
            url: item.link,
            cardSelector: "#placeTemplate"
        });
        places.prepend(card);
    });
}


function saveProfile(evt) {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupEditProfile.close();
}

function getProfile() {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

profileEdit.addEventListener("click", () => {
    getProfile(); 
    popupEditProfile.open();
});
addButton.addEventListener("click", function() { 
    popupAddPlace.open();
});


const createCard = (item) => {
    const card = new Card({ 
        data: { text: item.text, url: item.url, cardSelector: "#placeTemplate"},
        handleCardClick: () => {
            popupShowPlace.open({ url: item.url, text: item.text })
        },
    });
    return card.get()
}


onLoad();

