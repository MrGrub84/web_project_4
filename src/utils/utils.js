import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import { popupAddPlace, popupEditProfile, popupEditPhoto, popupShowPlace, popupDeletePlace, sectionCards, api } from "../pages/index.js";
import {
    profileName,
    profileAbout,
    profilePhoto,
    inputName,
    inputAbout,
    profileEdit,
    addButton
} from "../utils/constants.js";

console.log(profileEdit, profileName, addButton)

const user = new UserInfo({name: profileName, job: profileAbout, photo: profilePhoto });

function saveProfile({ name, job, photo }) {
    api.updateProfileData({ name, job })
    .then((res) => {
        user.setUserInfo({
            name: res.name,
            job: res.about,
            photo: res.avatar
        });
        popupEditProfile.close();
    })
    .catch((err) => {
        console.log(err);
    })
}

function updatePhoto({ link }) {
    const text = popupEditPhoto.updateSubmitButton({ text: "Saving..." });
    api.updatePhoto({ link })
        .then((res) => {
           profilePhoto.src = res.avatar;
           profilePhoto.alt = res.name;
           popupEditPhoto.close();
           popupEditPhoto.updateSubmitButton({ text });
        })
        .catch((err) => {
            console.log(err);
        });
}

function submitPlace({ title, url }) {
    const text = popupAddPlace.updateSubmitButton({ text: "Saving..." });
    api.addCard({ name: title, link: url })
        .then((res) => {
            const card = createCard(res);
            sectionCards.addItem(card);
            popupAddPlace.close();
            popupAddPlace.updateSubmitButton({ text });
        })
        .catch((err) => {
            console.log(err);
        });
}

function delPlace(id) {
    const text = popupDeletePlace.updateSubmitButton({ text: "Deleting..." });
    api.deleteCard({ id: id["popup__delete-id"] })
        .then((res) => {
            document.querySelector(`#postId-${id["popup__delete-id"]}`).closest(".places__place").remove();
            popupDeletePlace.close();
            popupDeletePlace.updateSubmitButton({ text });
        })
        .catch((err) => {
            console.log(err);
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
            popupDeletePlace.getForm().querySelector("input").value = evt.target.dataset.postId;
            popupDeletePlace.open();
        },
        handleLikeClick: function(evt) {
            const counter = evt.target.nextElementSibling;
            if (this.classList.contains("places__favorite_active")) {
                api.unlikeCard({ id: evt.target.dataset.postId })
                .then((res) => {
                    counter.textContent = res.likes.length;
                    evt.target.classList.remove("places__favorite_active");
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                api.likeCard({ id: evt.target.dataset.postId })
                .then((res) => {
                    counter.textContent = res.likes.length;
                    evt.target.classList.add("places__favorite_active");
                }).catch((err) => {
                    console.log(err);
                });
            }
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

profilePhoto.addEventListener("click", (evt) => {
    popupEditPhoto.open();
})

export {
    saveProfile,
    updatePhoto,
    delPlace,
    getProfile,
    createCard,
    submitPlace
}