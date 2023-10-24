const btnLeftv = document.querySelector(".btn-leftv");
const btnRightv = document.querySelector(".btn-rightv");
const sliderv = document.querySelector("#slider-video");
const sliderSectionv = document.querySelectorAll(".slider-section-video");

const contCarousel = document.querySelector(".container-carousel")
const slideSection = document.querySelector(".slider-section")
let position = 0;
let counter = 0;
let widthVideo = 100 / sliderSectionv.length;

window.addEventListener("load", e => {
    getData();
});

function getData() {
    const data = document.getElementById("allProduction").dataset.params
    console.log(JSON.parse((JSON.stringify(data))))
    // if (dataSet) {
    //     return dataSet
    // }
}
setInterval(() => {
    moveToRightv()
}, 6000000);

const moveToRightv = () => {
    if (counter >= sliderSectionv.length-1) {
        counter = 0;
        position = 0;
        sliderv.style.transform = `translate(-${position}%)`;
        sliderv.style.transition = "none";
        return;
    } 
    counter++;
    position = position + widthVideo;
    sliderv.style.transform = `translate(-${position}%)`;
    sliderv.style.transition = "all ease 0.7s"
}  

const moveToLeftv = () => {
    counter--;
    if (counter < 0 ) {
        counter = sliderSectionv.length-1;
        position = widthVideo * (sliderSection.length-1)
        sliderv.style.transform = `translate(-${position}%)`;
        sliderv.style.transition = "none";
        return;
    } 
    position = position - widthVideo;
    sliderv.style.transform = `translate(-${position}%)`;
    sliderv.style.transition = "all ease 0.7s"
}  

btnLeftv.addEventListener("click", e => moveToLeftv())
btnRightv.addEventListener("click", e => moveToRightv())


const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slider = document.querySelector("#slider");
const sliderSection = document.querySelectorAll(".slider-section");

let positionIMG = 0;
let counterImg = 0;
let widthImg = 100 / sliderSection.length;

setInterval(() => {
    moveToRightImg()
}, 5000);

const moveToRightImg = () => {
    if (counterImg >= sliderSection.length-1) {
        counterImg = 0;
        positionIMG = 0;
        slider.style.transform = `translate(-${positionIMG}%)`;
        slider.style.transition = "none";
        return;
    } 
    counterImg++;
    positionIMG = positionIMG + widthImg;
    slider.style.transform = `translate(-${positionIMG}%)`;
    slider.style.transition = "all ease 0.7s"
}  

const moveToLeftImg = () => {
    counterImg--;
    if (counterImg < 0 ) {
        counterImg = sliderSection.length-1;
        positionIMG = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${positionIMG}%)`;
        slider.style.transition = "none";
        return;
    } 
    positionIMG = positionIMG - widthImg;
    slider.style.transform = `translate(-${positionIMG}%)`;
    slider.style.transition = "all ease 0.7s"
}  

btnLeft.addEventListener("click", e => moveToLeftImg())
btnRight.addEventListener("click", e => moveToRightImg())