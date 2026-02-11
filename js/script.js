const noBtn = document.getElementById("noBtn");
const noTexts = ["Are you sure?", "Really?", "Think again!", "Last chance!", "I'll be sad 😢", "Don't do this!"];
let textIndex = 0;

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.innerText = noTexts[textIndex];
    textIndex = (textIndex + 1) % noTexts.length;
}
