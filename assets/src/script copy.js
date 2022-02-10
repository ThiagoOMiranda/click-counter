let currenNum = document.getElementById("currentNumber");
let reset = document.getElementById("reset");
let increment = document.getElementById("inc");
let decrement = document.getElementById("dec");
let box = document.getElementsByClassName("box");
let theme = document.getElementById("theme");
let count = 0;
let aux = 0;
let angle1 = -1;
let angle2 = -1;
let angle3 = -1;

// let rotate = (angle) => {
//     box[2].style.transform = `rotateX(${angle}deg)`;
// }

increment.addEventListener("click", function() {
    count++;
    aux++;
    currenNum.innerText = count;

    angle1 += +36;
    box[2].style.transform = `rotateX(${angle1}deg)`;

    if (aux % 100 === 0) {
        angle3 += +36;
        box[0].style.transform = `rotateX(${angle3}deg)`;
        angle2 = -1;
        // aux = 0;
    }

    if (aux % 10 === 0) {
        if (aux > 99) {
            angle1 = -1;
            box[1].style.transform = `rotateX(${angle2}deg)`;
            aux = 0;
        } else {
            angle2 += +36;
            box[1].style.transform = `rotateX(${angle2}deg)`;
        }
    }
    console.log(aux);
    // console.log(angle1, "ângulo 1");
    // console.log(angle2, "ângulo 2");
});

decrement.addEventListener("click", function() {
    count--;
    aux--;
    currenNum.innerText = count;

    angle1 -= 36;
    box[2].style.transform = `rotateX(${angle1}deg)`;

    console.log(aux);
       
    // console.log(angle1, "ângulo 1");
    // console.log(angle2, "ângulo 2");
});

reset.addEventListener("click", function() {
    count = 0;
    aux = 0;
    currenNum.innerText = count;
    angle1 = -1;
    angle2 = -1;
    angle3 = -1;
    box[0].style.transform = `rotateX(${angle3}deg)`;
    box[1].style.transform = `rotateX(${angle2}deg)`;
    box[2].style.transform = `rotateX(${angle1}deg)`;
});

theme.addEventListener("click", () => {
    document.getElementById("background").classList.toggle("themeBlack");
    // document.querySelector("div.box span").classList.toggle("number-theme");
    
    for(let i = 0; i < 30; i++) {
        document.querySelectorAll("span")[i].classList.toggle("number-theme");
    }
});