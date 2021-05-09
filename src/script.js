import galleryItems from "./gallery-items.js";

const galleryNode = document.querySelector(".js-gallery");

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

galleryNode.append(...galleryArr);
