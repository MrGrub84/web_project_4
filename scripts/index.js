let edit = document.querySelector(".profile__edit");
let add = document.querySelector(".profile__add-button");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__title");

let exitProfile = document.querySelector(".popup__profile .popup__exit");
let exitAdd = document.querySelector(".popup__add .popup__exit");
let form = document.querySelector(".popup__form");
let popup = document.querySelector(".popup");
let inputName = document.querySelector(".popup__name");
let inputAbout = document.querySelector(".popup__about");

const placeTemp = document.querySelector("#placeTemplate").content;
const initialCards = [
    {
        name: "Yosemite Valley",
        link: "./images/places-yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "./images/places-louis.jpg"
    },
    {
        name: "Bald Mountains",
        link: "./images/places-bald.png"
    },
    {
        name: "Latemar",
        link: "./images/places-latemar.png"
    },
    {
        name: "Vanoise National Park",
        link: "./images/places-vanoise.png"
    },
    {
        name: "Lago di Braies",
        link: "./images/places-lago.png"
    }
];


function addPlace(name, link) {
    const places = document.querySelector('.places__list');

    if (name && link) {
        let template = placeTemp.cloneNode(true);
        template.querySelector(".places__photo").src = link;
        template.querySelector(".places__photo").alt = name;
        template.querySelector(".places__text").textContent = name;
        places.appendChild(template);
        return true;
    } else {
        return false;
    }
}

function onLoad() {
    initialCards.forEach(function(item) {
        addPlace(item.name, item.link);
    });
}

function closePopup() {
    popup.classList.remove("popup_opened");
    document.querySelector(".popup__profile").style.display = "none";
    document.querySelector(".popup__add").style.display = "none";
}

function saveProfile(evt) {
    evt.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    closePopup();
}

function openPopup(e) {
    if (e.target.classList.contains("profile__edit")) {
        inputName.value = name.textContent;
        inputAbout.value = about.textContent;
        document.querySelector(".popup__profile").style.display = "block";
    } else if (e.target.classList.contains("profile__add-button")) {
        document.querySelector(".popup__add").style.display = "block";
    }

    popup.classList.add("popup_opened");
}

edit.addEventListener("click", openPopup);
add.addEventListener("click", openPopup);
exitProfile.addEventListener("click", closePopup);
exitAdd.addEventListener("click", closePopup);
form.addEventListener('submit', saveProfile);
onLoad();
