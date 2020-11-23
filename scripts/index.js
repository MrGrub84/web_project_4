let edit = document.querySelector(".profile__edit");
let add = document.querySelector(".profile__add-button");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__title");

let exitProfile = document.querySelector(".popup__profile .popup__exit");
let exitAdd = document.querySelector(".popup__add .popup__exit");
let exitPhoto = document.querySelector(".popup__photo-exit");
let formProfile = document.querySelector(".popup__form[name='profileForm']");
let formAdd = document.querySelector(".popup__form[name='addForm']");
let popup = document.querySelector(".popup");
let inputName = document.querySelector(".popup__name");
let inputAbout = document.querySelector(".popup__about");
let inputPlaceTitle = document.querySelector(".popup__place-title");
let inputPlaceUrl = document.querySelector(".popup__url");
let popupProfile = document.querySelector(".popup__profile");


let likes = document.querySelectorAll(".places__favorite");
let places = document.querySelector('.places__list');

const placeTemp = document.querySelector("#placeTemplate").content;
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

function like(evt) {
    evt.target.classList.toggle("places__favorite_active");
}

function deletePlace(evt) {
    evt.target.closest(".places__place").remove();
}

function showPlace(src, title) {
    document.querySelector(".popup__photo").src = src;
    document.querySelector(".popup__photo-title").textContent = title;
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
        template.querySelector(".places__delete").addEventListener("click", deletePlace);
        template.querySelector(".places__photo").addEventListener("click", openPopup);
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

    popupProfile.style.visibility = "hidden";
    popupProfile.style.opacity = "0";

    document.querySelector(".popup__add").style.display = "none";
    document.querySelector(".popup__photo-display").style.display = "none";
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
        popupProfile.style.visibility = "visible";
        popupProfile.style.opacity = "1";
    } else if (e.target.classList.contains("profile__add-button")) {
        document.querySelector(".popup__add").style.display = "block";
    } else if (e.target.classList.contains("places__photo")) {
        let place = e.target.parentElement;
        let src = e.target.src;
        let title = place.querySelector(".places__text").textContent;
        
        showPlace(src, title);
        document.querySelector(".popup__photo-display").style.display = "flex";
    }

    popup.classList.add("popup_opened");
}

edit.addEventListener("click", openPopup);
add.addEventListener("click", openPopup);
exitProfile.addEventListener("click", closePopup);
exitAdd.addEventListener("click", closePopup);
exitPhoto.addEventListener("click", closePopup);
formProfile.addEventListener('submit', saveProfile);
formAdd.addEventListener('submit', addPlace);

onLoad();
