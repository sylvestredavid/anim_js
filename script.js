let img;
let imgProp = {
    left: 150,
    bottom: 50,
    idleD: './img/droite1.png',
    runD: './img/droite2.png',
    idleG: './img/gauche1.png',
    runG: './img/gauche2.png',
    dead: './img/stop.png',
}
let carreaux = [];
let colision = false;
let isJump, recule, isGameOver = false;
let body;
let container;
let dernierePositionGoomba = 190;

function createContainer() {
    container = document.createElement('div');
    container.style.position = 'relative';
    container.style.height = "500px";
    container.style.width = "800px";
    container.style.border = "3px solid black";
    container.style.overflow = "hidden";
    container.style.margin = "100px auto";
    body.appendChild(container);
}

function createImg() {
    img = document.createElement('img');
    img.src = imgProp.idleD;
    img.style.position = 'absolute';
    img.style.bottom = imgProp.bottom + "px";
    img.style.left = imgProp.left + "px";
    container.appendChild(img);
}

function createFloor() {
    let sol = document.createElement('div');
    sol.style.position = 'absolute';
    sol.style.bottom = "0px";
    sol.style.height = "51px";
    sol.style.backgroundColor = "green";
    sol.style.boxSizing = "border-box";
    sol.style.left = "0";
    sol.style.right = "0";
    container.appendChild(sol);
}

function generateGoombas() {
    let nbEnemis = randomNumber(5, 30);
    for (let i = 0; i < nbEnemis; i++) {
        createGoomba()
    }
}

function createGoomba() {
    let left = randomNumber(50, 400) + dernierePositionGoomba;
    dernierePositionGoomba = left;
    let goomba = document.createElement('img');
    goomba.src = './img/mechant.png';
    goomba.style.position = 'absolute';
    goomba.style.bottom = "51px";
    goomba.style.left = left + "px";
    container.appendChild(goomba);
    carreaux.push(goomba);
}

function run() {
    let i = 0;
    window.addEventListener("keydown", (e) => {
        if (e.code === "ArrowRight" && !isGameOver) {
            recule = false;
            carreaux.forEach((c) => {
                c.style.left = (c.offsetLeft - 4) + "px"
            })
            gameOver()
            if (!isJump && !isGameOver) {
                if (i % 3 === 0) {
                    img.src = imgProp.runD
                } else {
                    img.src = imgProp.idleD
                }
            }
        } else if (e.code === "ArrowLeft" && !isGameOver) {
            recule = true;
            carreaux.forEach((c) => {
                c.style.left = (c.offsetLeft + 4) + "px"
            })
            gameOver()
            if (!isJump && !isGameOver) {
                if (i % 3 === 0) {
                    img.src = imgProp.runG
                } else {
                    img.src = imgProp.idleG
                }
            }
        }
        i++
    }, false)
    window.addEventListener("keyup", (e) => {
        i = 0;
        if (e.code === "ArrowRight" && !isJump && !isGameOver) {
            img.src = imgProp.idleD
        } else if (e.code === "ArrowLeft" && !isJump && !isGameOver) {
            img.src = imgProp.idleG
        }
    })
}

function jump() {
    document.addEventListener('mousedown', (e) => {
        isJump = true;
        if (recule) {
            img.src = imgProp.runG
        } else {
            img.src = imgProp.runD
        }
        let jump = setInterval(() => {
            if (imgProp.bottom <= 120) {
                imgProp.bottom += 1;
                img.style.bottom = imgProp.bottom + "px";
            } else {
                clearInterval(jump)
            }
            if (colision) {
                clearInterval(jump)
            }
        }, 10);
        setTimeout(() => {
            let jump = setInterval(() => {
                if (imgProp.bottom >= 50) {
                    imgProp.bottom -= 1;
                    img.style.bottom = imgProp.bottom + "px";
                    kill()
                } else {
                    imgProp.bottom = 50;
                    img.style.bottom = imgProp.bottom + "px";
                    clearInterval(jump)
                }
                if (colision) {
                    clearInterval(jump)
                }
            }, 10);
        }, 800);
        setTimeout(() => {
            isJump = false;
            if (recule) {
                img.src = imgProp.idleG
            } else {
                img.src = imgProp.idleD
            }
        }, 1500)
    })
}

function gameOver() {
    carreaux.forEach(carreau => {
        if (((imgProp.left + img.clientWidth >= carreau.offsetLeft) && (imgProp.left <= carreau.offsetLeft + carreau.clientWidth)) && (imgProp.bottom <= (carreau.clientHeight + 50)) && !isJump) {
            console.log('game over');
            isGameOver = true;
            img.src = imgProp.dead;
            console.log(img.src)
            let jump = setInterval(() => {
                if (imgProp.bottom <= 80) {
                    imgProp.bottom += 1;
                    img.style.bottom = imgProp.bottom + "px";
                } else {
                    clearInterval(jump)
                }
            }, 8);
            setTimeout(() => {
                let jump = setInterval(() => {
                    if (imgProp.bottom > -10) {
                        imgProp.bottom -= 1;
                        img.style.bottom = imgProp.bottom + "px";
                        kill()
                    } else {
                        location.reload();
                        clearInterval(jump)
                    }
                }, 8);
            }, 400);
        }
    })
}

function kill() {
    carreaux.forEach(carreau => {
        if (((imgProp.left + img.clientWidth >= carreau.offsetLeft) && (imgProp.left <= carreau.offsetLeft + carreau.clientWidth)) && (imgProp.bottom <= (carreau.clientHeight + 50)) && !isGameOver) {
            console.log('kill');
            imgProp.bottom += 20;
            img.style.bottom = imgProp.bottom + "px";
            const index = carreaux.indexOf(carreau);
            if(index > -1) {
                carreaux.splice(index, 1)
                console.log(carreaux)
            }
            setTimeout(() => {
                carreau.remove()
                if(carreaux.length === 0) {
                    gagne();
                    isGameOver = true;
                }
            }, 50)
        }
    })
}

function gagne() {
    let gagner = document.createElement('p');
    gagner.style.fontSize = "50px";
    gagner.style.marginTop = "200px";
    gagner.innerText= "Gagné !"
    let rejouer = document.createElement('p');
    rejouer.style.fontSize = "30px";
    rejouer.style.marginTop = "10px";
    rejouer.innerText= "Rejouer?";
    rejouer.addEventListener("mouseenter", () => {
        rejouer.style.color = "red";
        rejouer.style.cursor = "pointer";
    })
    rejouer.addEventListener("mouseleave", () => {
        rejouer.style.color = "black";
        rejouer.style.cursor = "default";
    })
    rejouer.addEventListener("mousedown", () => {
        location.reload()
    })
    container.style.textAlign = "center";
    container.appendChild(gagner)
    container.appendChild(rejouer)
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

(function () {
    body = document.getElementById("body");
    createContainer()
    createImg();
    createFloor()
    generateGoombas();
    run()
    jump()

})();
// carreaux.forEach(carreau => {
//     console.log(carreau.offsetLeft)
//     if(((imgProp.left + img.clientWidth >= carreau.offsetLeft) && (imgProp.left <= carreau.offsetLeft + carreau.clientWidth)) && (imgProp.top + img.clientHeight >= 120)) {
//         colision = true;
//     }
// })
// if(imgProp.left % 2 === 0 && imgProp.top === 100) {
//     img.src = imgProp.run1;
// } else {
//     img.src = imgProp.run2;
// }
// if(imgProp.left >= window.innerWidth) {
//     imgProp.left = 0;
// }
// if(colision) {
//     clearInterval(run)
// }
