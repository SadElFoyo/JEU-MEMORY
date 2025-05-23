const fruitSymbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍"];
let symbols = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let pairsFound = 0;
let startTime = null;
let timerInterval = null;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
    const card = document.createElement("div");
    card.classList.add("carte");
    card.dataset.symbol = symbol;

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = symbol;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", retournerCarte);
    return card;
}

function retournerCarte(e) {
    const card = e.currentTarget;
    if (lockBoard || card.classList.contains("paire-trouvee") || card === firstCard) return;

    card.classList.add("retournee");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("paire-trouvee");
        secondCard.classList.add("paire-trouvee");
        pairsFound++;
        resetTurn();

        if (pairsFound === fruitSymbols.length) {
            clearInterval(timerInterval);
            setTimeout(() => {
                const tempsFinal = document.getElementById("temps").textContent;
                alert(`Félicitations ! ${tempsFinal}`);
            }, 200);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("retournee");
            secondCard.classList.remove("retournee");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function demarrerChrono() {
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        document.getElementById("temps").textContent = `Temps écoulé : ${elapsed}s`;
    }, 1000);
}

function initGame() {
    const grille = document.getElementById("grille");
    grille.innerHTML = "";
    symbols = shuffleArray([...fruitSymbols, ...fruitSymbols]);
    pairsFound = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    symbols.forEach(symbol => {
        const card = createCard(symbol);
        grille.appendChild(card);
    });

    demarrerChrono();
}

window.onload = initGame;

