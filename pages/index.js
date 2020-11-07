let edit = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup");
let inputName = document.querySelector(".popup__name");
let inputAbout = document.querySelector(".popup__about");
let name = document.querySelector(".profile__name");
let about = document.querySelector(".profile__title");
let save = document.querySelector(".popup__button");
let exit = document.querySelector(".popup__exit");

function saveProfile() {
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    popup.classList.toggle("popup_opened");
}

edit.addEventListener("click", function() {
    popup.classList.toggle("popup_opened");
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;
});

exit.addEventListener("click", function() {
    popup.classList.toggle("popup_opened");
});

save.addEventListener("click", function() {
    saveProfile();
});

inputName.addEventListener("keyup", function(evt) {
    if (evt.keyCode == "13") {
        saveProfile();
    }
});

inputAbout.addEventListener("keyup", function(evt) {
    if (evt.keyCode == "13") {
        saveProfile();
    }
});