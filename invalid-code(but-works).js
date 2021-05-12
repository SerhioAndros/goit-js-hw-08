import galleryItems from "./gallery-items.js";

const refs = {
    galleryNode: document.querySelector(".js-gallery"),
    modalNode: document.querySelector(".js-lightbox"),
    modalOverlay: document.querySelector(".lightbox__overlay"),
    // modalImage: document.querySelector(".lightbox__image"),
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

    aNode.innerHTML = `<img class="gallery__image" src= ${img.preview} id=${galleryItems.indexOf(img)} data-source=${img.original} alt=${img.description}/>`;
    
    galleryArr.push(liNode);
});

refs.galleryNode.append(...galleryArr);

refs.galleryNode.addEventListener('click', galleryOpen);

refs.modalNode.addEventListener('click', galleryCloseClick);

const galleryLength = refs.galleryNode.querySelectorAll('li').length;

let currentImgIndex = "";

function galleryOpen(evt) {
    if (evt.target.nodeName === "IMG") {
        evt.preventDefault();
        currentImgIndex = evt.target.id;
        window.addEventListener('keydown', galleryCloseKey);
        window.addEventListener('keydown', galleryChange);
        refs.modalNode.classList.add("is-open");
        refs.modalImgWrapper.innerHTML = `<img class="lightbox__image" src="${evt.target.dataset.source}" alt="${evt.target.getAttribute("alt")}" />`;
    };
};

function galleryChange(evt) {
    if (evt.code === "ArrowRight") {
        if (currentImgIndex < (galleryLength - 1)) {
            let nextImgIndex = +currentImgIndex + 1;
            let nextImg = document.getElementById(nextImgIndex);
            currentImgIndex++;
            refs.modalImgWrapper.innerHTML = `<img class="lightbox__image" src="${nextImg.dataset.source}" alt="${nextImg.getAttribute("alt")}" />`;
        }
        // else if (currentImgIndex === (galleryLength)) {
        //     currentImgIndex = 0;
        //     let nextImgIndex = +currentImgIndex;
        //     let nextImg = document.getElementById(nextImgIndex);
        //     refs.modalImgWrapper.innerHTML = `<img class="lightbox__image" src="${nextImg.dataset.source}" alt="${nextImg.getAttribute("alt")}" />`;
        //     console.log("go to the right");
        // };
    }
    else if (evt.code === "ArrowLeft") {
        if (currentImgIndex > 0) {
            let nextImgIndex = +currentImgIndex - 1;
            let nextImg = document.getElementById(nextImgIndex);
            currentImgIndex--;
            refs.modalImgWrapper.innerHTML = `<img class="lightbox__image" src="${nextImg.dataset.source}" alt="${nextImg.getAttribute("alt")}" />`;
        }
        // else if (currentImgIndex === 1) {
            
        //     currentImgIndex = galleryLength;
        //     let nextImgIndex = +currentImgIndex;
        //     let nextImg = document.getElementById(nextImgIndex);
        //     currentImgIndex--;
        //     refs.modalImgWrapper.innerHTML = `<img class="lightbox__image" src="${nextImg.dataset.source}" alt="${nextImg.getAttribute("alt")}" />`;
        //     console.log("go to the right");
        // }
        
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