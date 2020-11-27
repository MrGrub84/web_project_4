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
    photo.src = "";
    photo.src = src;
    photo.alt = title;
    document.querySelector(".popup__photo-title").textContent = title;
}

function submitPlace(evt) {
    evt.preventDefault();

    const template = addPlace(inputPlaceTitle.value, inputPlaceUrl.value);
    places.prepend(template);
    clearForm(formAdd);
    closePopup(popupAdd);
}

function addPlace(title = "", link = "") {
    if (title && link) {
        const template = placeTemp.cloneNode(true);
        const elementPhoto = template.querySelector(".places__photo");
        elementPhoto.src = link;
        elementPhoto.alt = title;
        template.querySelector(".places__text").textContent = title;
        template.querySelector(".places__favorite").addEventListener("click", like);
        template.querySelector(".places__delete").addEventListener("click", deletePlace);
        template.querySelector(".places__photo").addEventListener("click", function(evt) { 
            const place = evt.target.parentElement;
            const src = evt.target.src;
            const title = place.querySelector(".places__text").textContent;
            showPlace(src, title);
            openPopup(popupPhoto); 
        });
        return template;
    } else {
        return false;
    }
}

function onLoad() {
    initialCards.forEach(function(item) {
        const template = addPlace(item.name, item.link);
        places.prepend(template);
    });
}

function closePopup(element) {
    element.classList.remove("popup_opened");
    popup.classList.remove("popup_opened");
}

function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
}

function getProfile() {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

function clearForm(form) {
    form.querySelectorAll("input").forEach(function(item) { item.value = ""; });
}

function openPopup(element) {
    element.classList.add("popup_opened");
    popup.classList.add("popup_opened");
}

profileEdit.addEventListener("click", () => {
    getProfile(); 
    openPopup(popupProfile); 
});
addButton.addEventListener("click", function() { openPopup(popupAdd); });
exitProfile.addEventListener("click", function() { closePopup(popupProfile); });
exitAdd.addEventListener("click", function() { closePopup(popupAdd); });
exitPhoto.addEventListener("click", function() { closePopup(popupPhoto); });
formProfile.addEventListener('submit', (evt) => {
    saveProfile(evt);
    closePopup(popupProfile);
});
formAdd.addEventListener('submit', (evt) => {
    submitPlace(evt);
    closePopup(popupAdd);
});

onLoad();
