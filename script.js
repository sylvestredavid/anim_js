(function () {

    let left = 0;
    let img = document.createElement('img');
    let body = document.getElementById("body");
    img.src = './img/droite1.png';
    img.style.position = 'absolute';
    img.style.top = "100px";
    img.style.left = left + "px";
    body.appendChild(img);

    setInterval(() => {
        left += 5;
        img.style.left = left + "px";
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
