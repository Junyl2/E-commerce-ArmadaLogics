document.addEventListener("DOMContentLoaded", function() {
const galleries = document.querySelectorAll(".gallery");
const fullscreenView = document.getElementById("fullscreenView");
const fullImage = document.getElementById("fullImage");

galleries.forEach(gallery => {
    gallery.addEventListener("click", function(event) {
        if (event.target.tagName === "IMG") {
                fullImage.src = event.target.src;
                fullscreenView.style.display = "flex";
        }
    });
});

fullscreenView.addEventListener("click", function(event) {
    if (event.target !== fullImage) {
        fullscreenView.style.display = "none";
        }
    });
});