let edit = document.querySelector(".profile__edit");
let add = document.querySelector(".profile__add-button");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__title");

let exitProfile = document.querySelector(".popup__profile .popup__exit");
let exitAdd = document.querySelector(".popup__add .popup__exit");
let formProfile = document.querySelector(".popup__form[name='profileForm']");
let formAdd = document.querySelector(".popup__form[name='addForm']");
let popup = document.querySelector(".popup");
let inputName = document.querySelector(".popup__name");
let inputAbout = document.querySelector(".popup__about");
let inputPlaceTitle = document.querySelector(".popup__place-title");
let inputPlaceUrl = document.querySelector(".popup__url");

let likes = document.querySelectorAll(".places__favorite");
let places = document.querySelector('.places__list');

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

function like(evt) {
    evt.target.classList.toggle("places__favorite_active");
}

function deleteCard(evt) {
    evt.target.closest(".places__place").remove();
}


function addPlace(evt, title = "", link = "") {
    if (evt) {
        evt.preventDefault();
        title = inputPlaceTitle.value;
        link = inputPlaceUrl.value;
    }

    if (name && link) {
        let template = placeTemp.cloneNode(true);
        template.querySelector(".places__photo").src = link;
        template.querySelector(".places__photo").alt = title;
        template.querySelector(".places__text").textContent = title;
        template.querySelector(".places__favorite").addEventListener("click", like);
        template.querySelector(".places__delete").addEventListener("click", deleteCard);
        places.prepend(template);
        closePopup();
        return true;
    } else {
        closePopup();
        return false;
    }
}

function onLoad() {
    initialCards.forEach(function(item) {
        addPlace(false, item.name, item.link);
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
formProfile.addEventListener('submit', saveProfile);
formAdd.addEventListener('submit', addPlace);

onLoad();
