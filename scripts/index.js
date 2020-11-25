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
const popupProfile = document.querySelector(".popup__profile");
const popupAdd = document.querySelector(".popup__add");
const popupPhoto = document.querySelector(".popup__photo-display");
const popupSrc = document.querySelector(".popup__photo");


const likes = document.querySelectorAll(".places__favorite");
const places = document.querySelector('.places__list');

const placeTemp = document.querySelector("#placeTemplate").content;

function like(evt) {
    evt.target.classList.toggle("places__favorite_active");
}

function deletePlace(evt) {
    evt.target.closest(".places__place").remove();
}

function showPlace(src, title) {
    const photo = document.querySelector(".popup__photo");
    photo.src = src;
    photo.alt = title;
    document.querySelector(".popup__photo-title").textContent = title;
}


function addPlace(evt, title = "", link = "") {
    if (evt) {
        evt.preventDefault();
        title = inputPlaceTitle.value;
        link = inputPlaceUrl.value;
    }

    if (title && link) {
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

    popupProfile.classList.remove("popup_opened");
    popupAdd.classList.remove("popup_opened");
    popupPhoto.classList.remove("popup_opened");
    popupSrc.src = "";
}

function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup();
}

function openPopup(e) {
    if (e.target.classList.contains("profile__edit")) {
        inputName.value = profileName.textContent;
        inputAbout.value = profileAbout.textContent;
        popupProfile.classList.add("popup_opened");
    } else if (e.target.classList.contains("profile__add-button")) {
        popupAdd.classList.add("popup_opened");
    } else if (e.target.classList.contains("places__photo")) {
        const place = e.target.parentElement;
        const src = e.target.src;
        const title = place.querySelector(".places__text").textContent;
        
        showPlace(src, title);
        popupPhoto.classList.add("popup_opened");
    }

    popup.classList.add("popup_opened");
}

profileEdit.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopup);
exitProfile.addEventListener("click", closePopup);
exitAdd.addEventListener("click", closePopup);
exitPhoto.addEventListener("click", closePopup);
formProfile.addEventListener('submit', saveProfile);
formAdd.addEventListener('submit', addPlace);

onLoad();
