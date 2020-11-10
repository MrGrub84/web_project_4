let exit = document.querySelector(".popup__exit");
let edit = document.querySelector(".profile__edit");
let form = document.querySelector(".popup__form");
let inputName = document.querySelector(".popup__name");
let inputAbout = document.querySelector(".popup__about");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__title");
let popup = document.querySelector(".popup");



function saveProfile(evt) {
    evt.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    popup.classList.remove("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function openPopup() {
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;
    popup.classList.add("popup_opened");
}

edit.addEventListener("click", openPopup);
exit.addEventListener("click", closePopup);
form.addEventListener('submit', saveProfile); 

/** Thanks, this is a lot cleaner looking. */
