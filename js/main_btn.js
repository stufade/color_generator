let mainBtn = document.querySelector(".btn");
let content = document.querySelector(".flex");
let input = document.querySelector(".input");

let cardsCount = 5;

createCards();

mainBtn.addEventListener("click", function changeColors() {
    let inputValue = +input.value;

    if (inputValue > 0 && inputValue != cardsCount) {
        cardsCount = inputValue;
        createCards();
        return;
    }

    let cards = document.querySelectorAll(".card");

    for (let card of cards) {
        let btn = card.querySelector(".card-btn");
        let textElem = card.querySelector(".text");

        let color = randomColor();

        textElem.textContent = color;

        card.style.backgroundColor = color;
        card.style.boxShadow = `0px 10px 25px ${color}`;
    }

});

function createCards() {
    let cards = document.querySelectorAll(".card");

    for (let card of cards) {
        card.remove();
    }

    for (let i = 0; i < cardsCount  ; i++) {
        let color = randomColor();
        let card = document.createElement("div");
        card.classList.add("card");
    
        card.innerHTML = `
        <button class="card-btn">
            <img src="img/copy.png" alt="Copy">
        </button>
        <div class="text">${color}</div>
        `;
        card.style.backgroundColor = color;
        card.style.boxShadow = `0px 10px 25px ${color}`;
    
        content.append(makesCopyButtonWorks(card));
    }
}

function makesCopyButtonWorks(card) {
    let btn = card.querySelector(".card-btn");
    let textElem = card.querySelector(".text");

    let coolDown = false;

    btn.addEventListener("click", function copyToClipboard() {
        let range = document.createRange();
        range.selectNode(textElem);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    });

    btn.addEventListener("click", function message() {
        if (coolDown) return;
        let notification = document.createElement("div");
        notification.classList.add("notification-wrap");
        notification.innerHTML = `<div class="notification">Copied!</div>`;

        card.prepend(notification);
        coolDown = true;
        setTimeout(() => {
            notification.remove();
            coolDown = false;
        }, 2500);
    });

    return card;
}

function randomColor() {
    let c = '';

    while (c.length < 6) {
        c += (Math.random()).toString(16).substr(-6).substr(-1);
    }

    return '#' + c;
}