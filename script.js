import galleryItems from "./gallery-items.js";

const refs = {
    galleryNode: document.querySelector(".js-gallery"),
    modalNode: document.querySelector(".js-lightbox"),
    modalOverlay: document.querySelector(".lightbox__overlay"),
    modalImage: document.querySelector(".lightbox__image"),
    modalBtn: document.querySelector(".lightbox__button"),
    modalImgWrapper: document.querySelector(".lightbox__content"),
};

const galleryArr = galleryItems.map((img, index) => {
    const liNode = document.createElement("li");
    liNode.classList.add("gallery__item");

    const aNode = document.createElement("a");
    aNode.classList.add("gallery__link");
    aNode.href = img.original;
    liNode.append(aNode);

    aNode.innerHTML = `<img class="gallery__image" src= ${img.preview} data-id=${index} data-source=${img.original} alt=${img.description}/>`;
    
    return liNode;
});

refs.galleryNode.append(...galleryArr);

refs.galleryNode.addEventListener('click', galleryOpen);

refs.modalNode.addEventListener('click', galleryCloseClick);

const galleryLength = refs.galleryNode.querySelectorAll('li').length;

let currentImgIndex = "";

function galleryOpen(evt) {
    if (evt.target.nodeName === "IMG") {
        evt.preventDefault();
        currentImgIndex = +evt.target.dataset.id;
        window.addEventListener('keydown', galleryCloseKey);
        window.addEventListener('keydown', galleryChange);
        refs.modalNode.classList.add("is-open");
        refs.modalImage.src = evt.target.dataset.source;
        refs.modalImage.alt = evt.target.alt;
    };
};

function galleryChange(evt) {
    if (evt.code === "ArrowRight") {
        if (currentImgIndex < (galleryLength - 1)) {
            currentImgIndex++;
        } else {
            currentImgIndex = 0
        }
        refs.modalImage.src = galleryItems[currentImgIndex].original;
        refs.modalImage.alt = galleryItems[currentImgIndex].description;            
        console.log("go to the right");
    }
    else if (evt.code === "ArrowLeft") {
        if (currentImgIndex > 0) {
            currentImgIndex--;
        } else {
            currentImgIndex = galleryLength - 1;
        }
        refs.modalImage.src = galleryItems[currentImgIndex].original;
        refs.modalImage.alt = galleryItems[currentImgIndex].description;
        console.log("turn to the left")
    }
    else return
};

function closeModal() {
    refs.modalNode.classList.remove("is-open");
    refs.modalImgWrapper.innerHTML = '<img class="lightbox__image" src="" alt="" />';
    currentImgIndex = "";
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
