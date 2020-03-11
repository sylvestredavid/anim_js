let img
let imgProp = {
    left: 10,
    top: 100,
    run1: './img/droite1.png',
    run2: './img/droite2.png',
}
let carreaux = [];
let colision = false;
let start = false;
let body;

function createImg() {
    img = document.createElement('img');
    img.src = imgProp.run1;
    img.style.position = 'absolute';
    img.style.top = imgProp.top + "px";
    img.style.left = imgProp.left + "px";
    body.appendChild(img);
}

function generateBlocs() {
    for(let i = 200; i < window.innerWidth; i += 200) {
        createBloc(i)
    }
}

function createBloc(left) {
    let carreau = document.createElement('div');
    carreau.style.height = "40px";
    carreau.style.width = "20px";
    carreau.style.backgroundColor = "red";
    carreau.style.position = 'absolute';
    carreau.style.top = "120px";
    carreau.style.left = left + "px";
    body.appendChild(carreau);
    carreaux.push(carreau);
}

function run() {
    let run = setInterval(() => {
        imgProp.left += 5;
        img.style.left = imgProp.left + "px";
        carreaux.forEach(carreau => {
            console.log(carreau.offsetLeft)
            if(((imgProp.left + img.clientWidth >= carreau.offsetLeft) && (imgProp.left <= carreau.offsetLeft + carreau.clientWidth)) && (imgProp.top + img.clientHeight >= 120)) {
                colision = true;
            }
        })
        if(imgProp.left % 2 === 0 && imgProp.top === 100) {
            img.src = imgProp.run1;
        } else {
            img.src = imgProp.run2;
        }
        if(imgProp.left >= window.innerWidth) {
            imgProp.left = 0;
        }
        if(colision) {
            clearInterval(run)
        }
    }, 50)
}

function jump() {
    document.addEventListener('keydown', (e) => {
        if(e.code === "Space") {
           let jump = setInterval(() => {
                if(imgProp.top >= 30) {
                    imgProp.top -= 1;
                    img.style.top = imgProp.top + "px";
                } else {
                    clearInterval(jump)
                }
               if(colision) {
                   clearInterval(jump)
               }
            }, 10);
           setTimeout(() => {
               let jump = setInterval(() => {
                   img.src = imgProp.run2
                   if(imgProp.top <= 100) {
                       imgProp.top += 1;
                       img.style.top = imgProp.top + "px";
                   } else {
                       imgProp.top = 100;
                       img.style.top = imgProp.top + "px";
                       clearInterval(jump)
                   }
                   if(colision) {
                       clearInterval(jump)
                   }
               }, 10);
           }, 1100)
        }
    })
}

(function () {
    body = document.getElementById("body");
    createImg();
    generateBlocs();
    document.addEventListener('keydown', (e) => {
        if (e.code !== "Space") {
            run()
        }
    })
    jump()

})();
