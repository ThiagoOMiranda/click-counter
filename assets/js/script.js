const CURRENTNUM = document.getElementById("currentNumber");
const RESET = document.getElementById("reset");
const INCREMENT = document.getElementById("inc");
const DECREMENT = document.getElementById("dec");
const BOX = document.getElementsByClassName("box");
const THEME = document.getElementById("theme");
const TOGGLE = document.getElementById("toggle");
const POINTER = document.getElementById("pointer");
const CARD = document.getElementById("card");
const NEXT = document.getElementById("next");
const INFO = document.getElementById("info");
const DOORTOP = document.getElementsByClassName("door-top");
const DOORDOWN = document.getElementsByClassName("door-bottom");

const CLICK = new Audio();
const CARRETEL = new Audio();
const BEEP = new Audio();
const OPEN = new Audio();
const CLOSE = new Audio();
const FORWARD= new Audio();

CLICK.src = "assets/snd/click.mp3";
CARRETEL.src = "assets/snd/carretel.mp3";
BEEP.src = "assets/snd/beep.mp3";
OPEN.src = "assets/snd/open.mp3";
CLOSE.src = "assets/snd/close.mp3";
FORWARD.src = "assets/snd/next.mp3";

let count = 0;
let aux1 = 0;
let aux2 = 0;
let angle1 = -1;
let angle2 = -1;
let angle3 = -1;

//Regras para abertura do dial com o clique do usuário;
let isOpen = false;
document.body.addEventListener("mouseup", () =>{
    if(!isOpen) {
        DOORTOP[0].classList.add("door-up");
        DOORDOWN[0].classList.add("door-down");
        OPEN.play();
    }
    isOpen = true;
});

//Altera a cor do display do currentNumber;
let signalColor = () => {
    if(count >= 0) {
        CURRENTNUM.style.backgroundColor = "#879c8b";
    }else {
        CURRENTNUM.style.backgroundColor = "lightcoral";
    }
}

//Regras de incremento do dial analógico;
let dialUp = function() {
    signalColor();
    if(count < 0) {
        angle1 = -1;
    } else if(count === 0) {
        doorMove();
    } else {
        aux1++;
        angle1 += +36;
        BOX[2].style.transform = `rotateX(${angle1}deg)`;
        
        // for(let i = 0; i < 30; i++) {
        //     document.querySelectorAll("span")[i].classList.remove("number-disabled");
        // }

        if (aux1 % 10 === 0) {
            aux2++;
            angle2 += +36;
            BOX[1].style.transform = `rotateX(${angle2}deg)`;
            aux1 = 0;

            if(aux2 % 10 === 0 && aux2 > 0) {
                angle3 += +36;
                BOX[0].style.transform = `rotateX(${angle3}deg)`;
                angle2 = -1;
                aux2 = 0; 
            }
        }
    }  
}

//Função de abertura da porta do dial;
let doorMove = function() {
    if(DOORTOP[0].classList.contains("door-up")) {
        DOORTOP[0].classList.replace("door-up", "door-up-reverse");
        DOORDOWN[0].classList.replace("door-down", "door-down-reverse");
        CLOSE.play();
    } else if(DOORTOP[0].classList.contains("door-up-reverse")) {
        DOORTOP[0].classList.replace("door-up-reverse", "door-up");
        DOORDOWN[0].classList.replace("door-down-reverse", "door-down");
        OPEN.play();
    } else {
        DOORTOP[0].classList.add("door-up");
        DOORDOWN[0].classList.add("door-down");
        OPEN.play();
    }
}

//Regras de decremento do dial analógico;
let dialDown = function() {
    signalColor();
    if(count < 0) {
        angle1 = -1;

        // for(let i = 0; i < 30; i++) {
        //     document.querySelectorAll("span")[i].classList.add("number-disabled");
        // }

        DOORTOP[0].classList.replace("door-up", "door-up-reverse");
        DOORDOWN[0].classList.replace("door-down", "door-down-reverse");

        if(count === -1) {
            CLOSE.play();
        }
    } else {
        aux1--;
        angle1 -= 36;
        BOX[2].style.transform = `rotateX(${angle1}deg)`;

        if (aux1 < 0 && count > 1) {
            aux2--;
            angle2 -= 36;
            BOX[1].style.transform = `rotateX(${angle2}deg)`;
            aux1 = 9;
        }

        if (aux2 < 0 && count > 1) {
            angle3 -= 36;
            BOX[0].style.transform = `rotateX(${angle3}deg)`;
            aux2 = 9;
        }
    }
}

//Regras de que limitam o incremento;
let limitUp = function() {
    // INCREMENT.disabled = true;
    aux1++;
    angle1 += +36;
    BOX[2].style.transform = `rotateX(${angle1}deg)`;
    if(DECREMENT.disabled) {
        DECREMENT.disabled = false;
    }

    if (aux1 % 10 === 0) {
        aux2++;
        angle2 += +36;
        BOX[1].style.transform = `rotateX(${angle2}deg)`;
        aux1 = 0;

        if(count >= 10) {
            INCREMENT.disabled = true;
            // if(DECREMENT.disabled) {
            //     DECREMENT.disabled = false;
            // }
        }
    }
}

//Regras de que limitam o decremento;
let limitDown = function() {
    // DECREMENT.disabled = false;
    aux1--;
    angle1 -= 36;
    BOX[2].style.transform = `rotateX(${angle1}deg)`;
    if(INCREMENT.disabled) {
        INCREMENT.disabled = false;
    }

    if (aux1 < 0 && count > 1) {
        aux2--;
        angle2 -= 36;
        BOX[1].style.transform = `rotateX(${angle2}deg)`;
        aux1 = 9;
    }

    if(count <= 0) {
        DECREMENT.disabled = true;
    }
}

// Função que reseta valores e variáveis;
let reset = function() {
    count = 0;
    aux1 = 0;
    aux2 = 0;
    CURRENTNUM.innerText = count;
    angle1 = -1;
    angle2 = -1;
    angle3 = -1;
    BOX[0].style.transform = `rotateX(${angle3}deg)`;
    BOX[1].style.transform = `rotateX(${angle2}deg)`;
    BOX[2].style.transform = `rotateX(${angle1}deg)`;
    CURRENTNUM.style.backgroundColor = "#879c8b";
}

// Listener do botão de incremento;
let incremento;
INCREMENT.addEventListener("click", incremento = function() {
    count++;
    CURRENTNUM.innerText = count;
    CLICK.play();
    CLICK.volume = 0.75;
    BEEP.play();
    if(!TOGGLE.checked) {
        dialUp();
        INCREMENT.disabled = false;
        DECREMENT.disabled = false;
    } else {
        limitUp();
    }
});

// Listener do botão de decremento;
let decremento;
DECREMENT.addEventListener("click", decremento = function() {
    count--;
    CURRENTNUM.innerText = count;
    CLICK.play();
    CLICK.volume = 0.75;
    BEEP.play();
    if(!TOGGLE.checked) {
        dialDown();
        INCREMENT.disabled = false;
        DECREMENT.disabled = false;
    } else {
        limitDown();
    }
});

// Listener do botão de reset;
RESET.addEventListener("click", () => {
    CARRETEL.play();
    reset();
    if(DOORTOP[0].classList.contains("door-up-reverse")) {
        doorMove();
    }
});

// Listener do botão de tema;
THEME.addEventListener("click", () => {

    if(DOORTOP[0].style.backgroundColor === "rgb(177, 179, 157)") {
        DOORTOP[0].style.backgroundColor = "rgb(85, 85, 85)";
        DOORDOWN[0].style.backgroundColor = "rgb(85, 85, 85)";
    } else if(DOORTOP[0].style.backgroundColor === "rgb(85, 85, 85)") {
        DOORTOP[0].style.backgroundColor = "rgb(177, 179, 157)";
        DOORDOWN[0].style.backgroundColor = "rgb(177, 179, 157)";
    } else {
        DOORTOP[0].style.backgroundColor = "rgb(85, 85, 85)";
        DOORDOWN[0].style.backgroundColor = "rgb(85, 85, 85)";
    }

    INFO.classList.toggle("hidden");
    INFO.classList.toggle("tutorial-black");
    setTimeout(function() {
        INFO.classList.toggle("hidden");
    },100);

    document.getElementById("background").classList.toggle("wrapperBlack");
    BEEP.play();
    for(let i = 0; i < 30; i++) {
        document.querySelectorAll("span")[i].classList.toggle("number-theme");
    }
});

// Listener do switch de toggle;
TOGGLE.addEventListener("click", () => {
    reset();
    incremento();
    decremento();
    if(DOORTOP[0].classList.contains("door-up-reverse")) {
        doorMove();
    }
});

// Regras de animação do menu;
let animate = function() {
    const BACK = document.getElementById("background");
    if(CARD.classList.contains("move-out")) {
        CARD.classList.replace("move-out", "move-out-reverse");
        CARD.classList.replace("drop-shadow", "drop-shadow-reverse");
        // BACK.classList.remove("side-shadow");
        BACK.classList.replace("wrapper-move", "wrapper-move-reverse");
        CLOSE.play();
    } else if(CARD.classList.contains("move-out-reverse")) {
        CARD.classList.replace("move-out-reverse", "move-out");
        CARD.classList.replace("drop-shadow-reverse", "drop-shadow");
        // BACK.classList.add("side-shadow");
        BACK.classList.replace("wrapper-move-reverse", "wrapper-move");
        OPEN.play();
    } else {
        CARD.classList.add("move-out");
        CARD.classList.add("drop-shadow");
        // BACK.classList.add("side-shadow");
        BACK.classList.add("wrapper-move");
        OPEN.play();
    }
}

// Listener do botão de acionamento do submenu;
POINTER.addEventListener("click", () => {
    animate();
});

// Regras do botão de próxima página do submenu;
let page = 1;
NEXT.addEventListener("click", () => {
    const TEXT01 = document.getElementsByClassName("info-text");
    const TEXT02 = document.getElementsByClassName("info-text-back");
    const TEXT03 = document.getElementsByClassName("about");
    switch (page) {
        case 1:
            TEXT01[0].classList.toggle("none");
            TEXT02[0].classList.toggle("none");
            // console.log("opção 01");
        break;
        case 2:
            TEXT02[0].classList.toggle("none");
            TEXT03[0].classList.toggle("none");
            // console.log("opção 02");
        break;
        case 3:
            TEXT03[0].classList.toggle("none");
            TEXT01[0].classList.toggle("none");
            // console.log("opção 03");
            page = 0;
        break;
    }
    page++;
    FORWARD.play();
});
 