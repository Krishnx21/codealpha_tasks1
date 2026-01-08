let images = document.querySelectorAll(".gallery img");
let lightbox = document.getElementById("lightbox");
let lightImg = document.getElementById("lightImg");
let index = 0;

function openImg(img) {
  lightbox.style.display = "flex";
  lightImg.src = img.src;
  index = [...images].indexOf(img);
}

function closeImg() {
  lightbox.style.display = "none";
}

function next() {
  index = (index + 1) % images.length;
  lightImg.src = images[index].src;
}

function prev() {
  index = (index - 1 + images.length) % images.length;
  lightImg.src = images[index].src;
}

function filter(type) {
  images.forEach(img => {
    img.style.display = (type === "all" || img.classList.contains(type))
      ? "block" : "none";
  });
}
