/*
Logan Selley
4/18/2018
CSE 154 AM
HW3 JS

JS to handle user interaction for a website to play/create ASCII animations
*/
"use strict";
let timer; // timer for frame duration
let playing; // boolean for enabling/disabling
let animation; // string array to hold the animation
let index; // index for the array

window.onload = function() {
    $("start").onclick = start;
    $("stop").onclick = stop;
    $("size").onchange = textSize;
    $("animation").onchange = chooseAnimation;
    $("speed").onchange = quickChangeSpeed;
    playing = false;
    $("stop").disabled = true;
};

// function that returns an integer to act as the length of each frame in the
// animation according to user input
function speed() {
    let aniSpeed = document.querySelector('input[name=speed]:checked').value;
    if (aniSpeed == "turbo") {
        return 50;
    } else if (aniSpeed == "normal") {
        return 250;
    } else {
        return 1500;
    }
}

// function to switch animation speed while animation is playing
function quickChangeSpeed() {
    if (playing) {
        clearInterval(timer);
        timer = setInterval(animate, speed());
    }
}

// function to alter font size of the text box according to user input
function textSize() {
    let select = $("size");
    let size = select.options[select.selectedIndex].value;
    let text = $("textarea");
    if (size == "tiny") {
        text.style.fontSize = "7pt";
    } else if (size == "small") {
        text.style.fontSize = "10pt";
    } else if (size == "medium") {
        text.style.fontSize = "12pt";
    } else if (size == "large") {
        text.style.fontSize = "16pt";
    } else if (size == "extra large") {
        text.style.fontSize = "24pt";
    } else {
        text.style.fontSize = "32pt";
    }
}

// function to set the selected premade animation to the textbox
function chooseAnimation() {
    if (playing) {
        stop();
    }
    let text = $("textarea");
    let select = $("animation");
    let value = select.options[select.selectedIndex].value;
    text.value = ANIMATIONS[value.toUpperCase()];
}

// function to split the animation into frames and
// initialize playback
function start() {
    playing = true;
    $("start").disabled = true;
    $("stop").disabled = false;
    $("animation").disabled = true;
    animation = $("textarea").value.split("=====\n");
    index = 0;
    timer = setInterval(animate, speed());
}

// function to increment frames of the animation according
// to a timer
function animate() {
    if (index >= animation.length) { // continuous loop
        index = 0;
    }
    $("textarea").value = animation[index];
    index+=1;
}

// function to stop playback of the animation and revert
// to original state
function stop() {
    clearInterval(timer);
    playing = false;
    $("stop").disabled = true;
    $("start").disabled = false;
    $("animation").disabled = false;
    chooseAnimation();
}

// shortcut function for retrieving html elements
function $(id) {
    return document.getElementById(id);
}