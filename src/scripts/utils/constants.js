export const settingsObj = {
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
}

export const initialCards = [
    {
      text: "Yosemite Valley",
      url: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      text: "Lake Louise",
      url: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      text: "Bald Mountains",
      url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      text: "Latemar",
      url: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      text: "Vanoise National Park",
      url: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      text: "Lago di Braies",
      url: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__title");
export const inputName = document.querySelector(".popup__name");
export const inputAbout = document.querySelector(".popup__about");
export const inputPlaceTitle = document.querySelector(".popup__place-title");
export const inputPlaceUrl = document.querySelector(".popup__url");
export const profileEdit = document.querySelector(".profile__edit");
export const addButton = document.querySelector(".profile__add-button");