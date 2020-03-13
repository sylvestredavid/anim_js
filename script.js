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
let goombas = [];
let colision = false;
let isJump, recule, isGameOver, isGrounded = false;
let body;
let container;
let dernierePositionGoomba = 190;
let floors = [];

function createContainer() {
    container = document.createElement('div');
    container.style.position = 'relative';
    container.style.height = "500px";
    container.style.width = "800px";
    container.style.border = "3px solid black";
    container.style.overflow = "hidden";
    container.style.margin = "100px auto";
    container.style.textAlign = "center";
    let instruction = document.createElement('p');
    instruction.style.marginTop = "50px";
    instruction.innerText = "Utilisez les flèches pour vous déplacer et le bouton gauche de la souris pour sauter";
    container.appendChild(instruction);
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

function createWorld() {
    let sol1 = createFloor(0, 0, 500, false)
    let sol2 = createFloor(0, 550, 500, false)
    let platform1 = createFloor(120, 300, 100, true)
    floors.push(platform1)
    floors.push(sol1)
    floors.push(sol2)
    floors.forEach(f => {
        container.appendChild(f)
    })
}

function createFloor(bottom, left, width, isPlateform) {
    let sol = document.createElement('div');
    sol.style.position = 'absolute';
    sol.style.bottom = bottom + "px";
    sol.style.height = isPlateform? "10px" : "51px";
    sol.style.backgroundColor = "green";
    sol.style.left = left + "px";
    sol.style.width = width + "px";
    return sol;
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
    goombas.push(goomba);
}

function run() {
    let i = 0;
    window.addEventListener("keydown", (e) => {
        if (e.code === "ArrowRight" && !isGameOver) {
            recule = false;
            goombas.forEach((c) => {
                c.style.left = (c.offsetLeft - 4) + "px"
            })
            floors.forEach((f) => {
                f.style.left = (f.offsetLeft - 4) + "px"
            })
            gameOver()
            if (!isJump && !isGameOver && isGrounded) {
                if (i % 3 === 0) {
                    img.src = imgProp.runD
                } else {
                    img.src = imgProp.idleD
                }
            }
        } else if (e.code === "ArrowLeft" && !isGameOver) {
            recule = true;
            goombas.forEach((c) => {
                c.style.left = (c.offsetLeft + 4) + "px"
            })
            floors.forEach((f) => {
                f.style.left = (f.offsetLeft + 4) + "px"
            })
            gameOver()
            if (!isJump && !isGameOver && isGrounded) {
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
        if (!isJump) {
            const hauteur = imgProp.bottom + 100;
            isJump = true;
            isGrounded = false;
            if (recule) {
                img.src = imgProp.runG
            } else {
                img.src = imgProp.runD
            }
            let jump = setInterval(() => {
                if (imgProp.bottom <= hauteur) {
                    imgProp.bottom += 1;
                    img.style.bottom = imgProp.bottom + "px";
                } else {
                    clearInterval(jump)
                }
                if (colision) {
                    clearInterval(jump)
                }
            }, 5);
            setTimeout(() => {
                isJump = false
            }, 600);
        }
    })
}

function gravity() {
    let jump = setInterval(() => {
        if(!isJump) {
            imgProp.bottom -= 1;
            img.style.bottom = imgProp.bottom + "px";
            console.log(imgProp.bottom)
            kill()
            floors.forEach(f => {
                const bottom = (container.clientHeight - f.offsetTop) - f.clientHeight;
                if (((imgProp.left + img.clientWidth >= f.offsetLeft) && (imgProp.left <= f.offsetLeft + f.clientWidth)) && (imgProp.bottom <= (f.clientHeight + bottom)) && !(imgProp.bottom <= bottom) && !isGameOver) {
                    imgProp.bottom = f.clientHeight + bottom;
                    img.style.bottom = imgProp.bottom + "px";
                    if(!isGrounded) {
                        if (recule) {
                            img.src = imgProp.idleG
                        } else {
                            img.src = imgProp.idleD
                        }
                        isGrounded = true;
                    }
                }
            });
            if (imgProp.bottom < 15) {
                isGameOver = true;
                img.src = imgProp.dead;
                setTimeout(() => {
                    clearInterval(jump)
                    location.reload();
                }, 500)
            }
        }

    }, 5);
}

function gameOver() {
    goombas.forEach(carreau => {
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
    goombas.forEach(carreau => {
        if (((imgProp.left + img.clientWidth >= carreau.offsetLeft) && (imgProp.left <= carreau.offsetLeft + carreau.clientWidth)) && (imgProp.bottom <= (carreau.clientHeight + 50)) && !isGameOver) {
            console.log('kill');
            imgProp.bottom += 20;
            img.style.bottom = imgProp.bottom + "px";
            const index = goombas.indexOf(carreau);
            if (index > -1) {
                goombas.splice(index, 1)
                console.log(goombas)
            }
            setTimeout(() => {
                carreau.remove()
                if (goombas.length === 0) {
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
    gagner.style.marginTop = "150px";
    gagner.innerText = "Gagné !"
    let rejouer = document.createElement('p');
    rejouer.style.fontSize = "30px";
    rejouer.style.marginTop = "10px";
    rejouer.innerText = "Rejouer?";
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
    createWorld()
    generateGoombas();
    gravity()
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
