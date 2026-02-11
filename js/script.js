const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const noTexts = [
    "Are you sure? 🥺", 
    "Think about the snacks! 🍕", 
    "Don't break my heart! 💔", 
    "I'll do the dishes! 🧼", 
    "Pleaseeeee? 🥺", 
    "You can't catch me! 🏃"
];

let textIndex = 0;

function moveButton() {
    // Get the window size
    const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
    const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;

    // Generate random positions but keep it within bounds
    // We start at 20px so it doesn't stick to the very edge
    const randomX = Math.max(20, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(20, Math.floor(Math.random() * maxHeight));

    // Apply the new position
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    
    // Make the button scary/funny
    noBtn.style.backgroundColor = "red";
    noBtn.style.color = "white";
    noBtn.style.zIndex = "1000"; // Ensures it sits on top of everything
    
    // Change text
    noBtn.innerText = noTexts[textIndex];
    textIndex = (textIndex + 1) % noTexts.length;
}
