import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import { popupAddPlace, popupEditProfile, popupShowPlace, sectionCards } from "../index.js";
import {
    initialCards,
    profileName,
    profileAbout,
    inputName,
    inputAbout,
    inputPlaceTitle,
    inputPlaceUrl,
    profileEdit,
    addButton
} from "./constants.js";

const user = new UserInfo({name: profileName.textContent, job: profileAbout.textContent });

function saveProfile(evt) {
    user.setUserInfo({
        name: inputName.value,
        job: inputAbout.value
    });
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    popupEditProfile.close();
}

function getProfile() {
    const info = user.getUserInfo();
    inputName.value = info.name;
    inputAbout.value = info.job;
}

const createCard = (item) => {
    const card = new Card({ 
        data: { text: item.text, url: item.url, cardSelector: "#placeTemplate"},
        handleCardClick: () => {
            popupShowPlace.open({ url: item.url, text: item.text })
        },
    });
    return card.get()
}

function onLoad() {
    initialCards.forEach(function(item) {
        const card = createCard({
            text: item.text, 
            url: item.link,
            cardSelector: "#placeTemplate"
        });
        sectionCards.addItem(card);
    });
}

function submitPlace() {
    const card = createCard({ 
        text: inputPlaceTitle.value, 
        url: inputPlaceUrl.value, 
        cardSelector: "#placeTemplate"
    });
    sectionCards.addItem(card);
    popupAddPlace.close();
}

profileEdit.addEventListener("click", () => {
    getProfile(); 
    popupEditProfile.open();
});

addButton.addEventListener("click", function() { 
    popupAddPlace.open();
});

export {
    saveProfile,
    getProfile,
    createCard,
    onLoad,
    submitPlace
}