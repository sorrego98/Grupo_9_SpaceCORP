const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const sliderSection = document.querySelectorAll(".slider-section");

let position = 0;
let counter = 0;
let widthImg = 100 / sliderSection.length;

setInterval(() => {
    moveToRight()
}, 3500);

const moveToRight = () => {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        position = 0;
        slider.style.transform = `translate(-${position}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    position = position + widthImg;
    slider.style.transform = `translate(-${position}%)`;
    slider.style.transition = "all ease 0.7s"
}  

const moveToLeft = () => {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        position = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${position}%)`;
        slider.style.transition = "none";
        return;
    } 
    position = position - widthImg;
    slider.style.transform = `translate(-${position}%)`;
    slider.style.transition = "all ease 0.7s"
}  

btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())