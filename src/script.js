import galleryItems from "./gallery-items.js";

const refs = {
    galleryNode: document.querySelector(".js-gallery"),
    modalNode: document.querySelector(".js-lightbox"),
    modalOverlay: document.querySelector(".lightbox__overlay"),
    modalImage: document.querySelector(".lightbox__image"),
    modalBtn: document.querySelector(".lightbox__button"),
    modalImgWrapper: document.querySelector(".lightbox__content"),
};

const galleryArr = [];

galleryItems.forEach(img => {
    const liNode = document.createElement("li");
    liNode.classList.add("gallery__item");

    const aNode = document.createElement("a");
    aNode.classList.add("gallery__link");
    aNode.href = img.original;
    liNode.append(aNode);

    aNode.innerHTML = `<img class="gallery__image" src= ${img.preview} data-source=${img.original} alt=${img.description}/>`;
    
    galleryArr.push(liNode);
});

refs.galleryNode.append(...galleryArr);

refs.galleryNode.addEventListener('click', galleryOpen);

refs.modalNode.addEventListener('click', galleryCloseClick);


function galleryOpen(evt) {
    if (evt.target.nodeName !== "IMG") {
        return
    };
    window.addEventListener('keydown', galleryCloseKey);
    window.addEventListener('keydown', galleryChange);
    evt.preventDefault();
    refs.modalNode.classList.add("is-open");
    refs.modalImgWrapper.innerHTML = `<img class="lightbox__image" src="${evt.target.dataset.source}" alt="${evt.target.getAttribute("alt")}" />`;
};

function galleryChange(evt) {
    if (evt.code === "ArrowRight") {
        // const currentImg = refs.modalImage;
        // console.log(currentImg);
        // refs.modalImage.src = "321";
        // refs.modalImage.alt = "321";
        console.log("swipe to the right")
    }
    else if (evt.code === "ArrowLeft") {
        console.log("turn left")
    }
    else return
};

function closeModal() {
    refs.modalNode.classList.remove("is-open");
    refs.modalImgWrapper.innerHTML = "";
}

function galleryCloseClick(evt) {
    if (evt.target === refs.modalOverlay || evt.target === refs.modalBtn) {
        closeModal();
    }
};

function galleryCloseKey(evt) {
    if (evt.code === "Escape") {
        closeModal();
    }
}
