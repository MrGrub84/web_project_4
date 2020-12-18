import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const settingsObj = {
    inputSelector: ".input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
};

const profileEdit = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__title");

const exitProfile = document.querySelector(".popup__profile .popup__exit");
const exitAdd = document.querySelector(".popup__add .popup__exit");
const exitPhoto = document.querySelector(".popup__photo-exit");
const formProfile = document.querySelector(".popup__form[name='profileForm']");
const formAdd = document.querySelector(".popup__form[name='addForm']");
const popup = document.querySelector(".popup");
const inputName = document.querySelector(".popup__name");
const inputAbout = document.querySelector(".popup__about");
const inputPlaceTitle = document.querySelector(".popup__place-title");
const inputPlaceUrl = document.querySelector(".popup__url");
const popupProfile = document.querySelector(".popup_edit-profile");
const popupAdd = document.querySelector(".popup_add-place");
const popupPhoto = document.querySelector(".popup_photo-showcase");
const popupSrc = document.querySelector(".popup__photo");

const likes = document.querySelectorAll(".places__favorite");
const places = document.querySelector('.places__list');

const formList = Array.from(document.querySelectorAll(".form"));
        
formList.forEach((formElement) => {
    new FormValidator(settingsObj, formElement);
});

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

function submitPlace(evt) {
    const card = new Card({ text: inputPlaceTitle.value, url: inputPlaceUrl.value, cardSelector: "#placeTemplate"});
    places.prepend(card.get());
    clearForm(formAdd);
    closePopup(popupAdd);
}

function onLoad() {
    initialCards.forEach(function(item) {
        const card = new Card({ text: item.name, url: item.link, cardSelector: "#placeTemplate"});
        places.prepend(card.get());
    });
}

function closePopup(element) {
    element.classList.remove("popup_opened");
    element.removeEventListener("click", overlayListener);
    document.removeEventListener("keydown", escListener);
}

function saveProfile(evt) {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
}

function getProfile() {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

function clearForm(form) {
    form.reset();
}

function openPopup(element) {
    element.classList.add("popup_opened");
    element.addEventListener("click", overlayListener);
    document.addEventListener("keydown", escListener);
}

profileEdit.addEventListener("click", () => {
    getProfile(); 
    openPopup(popupProfile); 
});
addButton.addEventListener("click", function() { 
    const validate = new FormValidator(settingsObj,formAdd);
    validate.enableValidation();
    clearForm(formAdd);
    openPopup(popupAdd);
});
exitProfile.addEventListener("click", function() { closePopup(popupProfile); });
exitAdd.addEventListener("click", function() { closePopup(popupAdd); });
exitPhoto.addEventListener("click", function() { closePopup(popupPhoto); });
formProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveProfile(evt);
    closePopup(popupProfile);
});
formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitPlace(evt);
    closePopup(popupAdd);
});


onLoad();

export { popupPhoto, openPopup };

