import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import { popupAddPlace, popupEditProfile, popupShowPlace, sectionCards, api } from "../../pages/index.js";
import {
    profileName,
    profileAbout,
    profilePhoto,
    inputName,
    inputAbout,
    profileEdit,
    addButton
} from "./constants.js";

const user = new UserInfo({name: profileName, job: profileAbout, photo: profilePhoto });

function saveProfile({ name, job, photo }) {
    api.updateProfileData({ name, job })
    .then((res) => {
        user.setUserInfo({
            name: res.name,
            job: res.about,
            photo: res.avatar
        });
    });
    popupEditProfile.close();
}

function submitPlace({ title, url }) {
    api.addCard({ name: title, link: url })
        .then((res) => {
            const card = createCard({ 
                name: res.name, 
                link: res.link, 
                cardSelector: "#placeTemplate"
            });
            sectionCards.addItem(card);
            popupAddPlace.close();
        });
}

function getProfile() {
    const info = user.getUserInfo();
    inputName.value = info.name;
    inputAbout.value = info.job;
}

const createCard = (item) => {
    const card = new Card({ 
        data: {card: item, cardSelector: "#placeTemplate"},
        handleCardClick: () => {
            popupShowPlace.open({ url: item.link, text: item.name })
        },
        handleDeleteClick: (evt) => {
            api.deleteCard({ id: evt.target.id })
                .then((res) => {
                    console.log(res);
                    evt.target.closest(".places__place").remove(); 
                });
        }
    });
    if (item.owner.name !== user.getUserInfo().name) {
        card._element.querySelector(".places__delete").remove();
    }
    return card.get();
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
    submitPlace
}