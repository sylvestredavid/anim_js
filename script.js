(function () {

    let left = 0;
    let posLeftCarreau = 200;
    let img = document.createElement('img');
    img.src = './img/droite1.png';
    img.style.position = 'absolute';
    img.style.top = "100px";
    img.style.left = left + "px";
    let carreau = document.createElement('div');
    carreau.style.height = "50px";
    carreau.style.width = "50px";
    carreau.style.backgroundColor = "red";
    carreau.style.position = 'absolute';
    carreau.style.top = "110px";
    carreau.style.left = posLeftCarreau + "px";
    let body = document.getElementById("body");
    body.appendChild(img);
    body.appendChild(carreau);

    setInterval(() => {
        left += 5;
        img.style.left = left + "px";
        if(left >= posLeftCarreau - img.clientWidth) {
            posLeftCarreau = left + img.clientWidth;
            carreau.style.left = posLeftCarreau + "px";
        }
        if(left % 2 === 0) {
            img.src = './img/droite1.png';
        } else {
            img.src = './img/droite2.png';
        }
        if(left >= window.innerWidth) {
            left = 0;
        }
    }, 100)

})();
