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
    const template = addPlace(inputPlaceTitle.value, inputPlaceUrl.value);
    places.prepend(template);
    clearForm(formAdd);
    closePopup(popupAdd);
}

function addPlace(title = "", link = "") {
    const template = placeTemp.cloneNode(true);
    const elementPhoto = template.querySelector(".places__photo");
    elementPhoto.src = link;
    elementPhoto.alt = title;
    template.querySelector(".places__text").textContent = title;
    template.querySelector(".places__favorite").addEventListener("click", like);
    template.querySelector(".places__delete").addEventListener("click", deletePlace);
    elementPhoto.addEventListener("click", function(evt) { 
        const place = evt.target.parentElement;
        const src = evt.target.src;
        const title = place.querySelector(".places__text").textContent;
        showPlace(src, title);
        openPopup(popupPhoto); 
    });
    return template;
}

function onLoad() {
    initialCards.forEach(function(item) {
        const template = addPlace(item.name, item.link);
        places.prepend(template);
    });
}

function closePopup(element) {
    element.classList.remove("popup_opened");
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




const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(".popup__button");
    button.classList.add("popup__button_disabled");
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(".popup__button");
    button.classList.remove("popup__button_disabled");
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".input"));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".form"));
    
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => { evt.preventDefault(); });
      setEventListeners(formElement);
    });
  }
  
  enableValidation();





