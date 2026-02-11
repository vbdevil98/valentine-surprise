// --- MOVING NO BUTTON ---
const noBtn = document.getElementById("noBtn");
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
    if (!noBtn) return; // Stop if button doesn't exist on this page

    const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
    const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.max(20, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(20, Math.floor(Math.random() * maxHeight));

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    
    // Style changes
    noBtn.style.backgroundColor = "red";
    noBtn.style.color = "white";
    noBtn.style.zIndex = "1000";
    
    noBtn.innerText = noTexts[textIndex];
    textIndex = (textIndex + 1) % noTexts.length;
}

// --- MUSIC PLAYER ---
const music = document.getElementById("bgMusic");
function toggleMusic() {
    if (music.paused) {
        music.play();
        alert("Playing our song! 🎶");
    } else {
        music.pause();
    }
}

// --- RELATIONSHIP TIMER ---
// CHANGE THIS DATE to your actual anniversary (YYYY-MM-DD)
const startDate = new Date("2024-01-01"); 

function updateTimer() {
    const timerDiv = document.getElementById("timer");
    if (!timerDiv) return; // Stop if timer doesn't exist on this page

    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerDiv.innerText = `Been loving you for: ${days} days, ${hours} hours, ${minutes} mins, ${seconds} secs ❤️`;
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer();
