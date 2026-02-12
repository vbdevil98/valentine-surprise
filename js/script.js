// --- GLOBAL FUNCTIONS (Accessible by HTML Buttons) ---

// 1. Open Envelope
function openLetter() {
    const envelope = document.getElementById("envelope");
    const container = document.querySelector(".container");
    const music = document.getElementById("bgMusic");

    // Fade out envelope
    envelope.style.transition = "opacity 0.5s ease";
    envelope.style.opacity = "0";
    
    setTimeout(() => {
        envelope.style.display = "none";
        // Show Card (Grid for desktop, Block for mobile)
        container.style.display = (window.innerWidth >= 1024) ? "grid" : "block";
        
        // Start Typing Effect
        typeWriter();

        // Attempt Auto-Play Music
        if(music) {
            music.volume = 0.5;
            music.play().then(() => {
                const btn = document.querySelector(".music-control");
                if(btn) {
                    btn.classList.add("playing");
                    btn.innerText = "⏸️";
                }
            }).catch(e => console.log("Audio requires interaction"));
        }
    }, 500);
}

// 2. Typing Effect Logic
const textToType = "Will you be my Valentine? 🌹";
let charIndex = 0;

function typeWriter() {
    const typeTarget = document.getElementById("typewriter-text");
    const cursor = document.querySelector(".cursor");
    
    if (typeTarget && charIndex < textToType.length) {
        typeTarget.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    } else if (cursor) {
        cursor.style.display = "none"; // Hide cursor when done
    }
}

// 3. Music Toggle
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.querySelector(".music-control");
    
    if (music.paused) {
        music.play();
        btn.classList.add("playing");
        btn.innerText = "⏸️";
    } else {
        music.pause();
        btn.classList.remove("playing");
        btn.innerText = "🎵";
    }
}

// 4. Quiz Logic (Fixed Scope)
function checkQuiz(isCorrect, btn) {
    if (isCorrect) {
        btn.style.background = "#55efc4"; // Green
        btn.style.color = "#fff";
        btn.innerText = "Correct! You know me! 🎉";
        setTimeout(() => {
            window.location.href = "reasons.html"; // Go to next page
        }, 1000);
    } else {
        btn.style.background = "#ff7675"; // Red
        btn.style.color = "#fff";
        btn.innerText = "Wrong! Try Again 😈";
        
        // Shake Animation
        const originalText = "Ryan Reynolds"; // Or whatever text was there
        btn.style.transform = "translateX(10px)";
        setTimeout(() => { btn.style.transform = "translateX(-10px)"; }, 100);
        setTimeout(() => { btn.style.transform = "translateX(10px)"; }, 200);
        setTimeout(() => { btn.style.transform = "translateX(0)"; }, 300);
    }
}

// 5. Contract Signature
function signContract() {
    const nameInput = document.getElementById("signature");
    if (nameInput.value.trim() === "") {
        alert("You must sign your name! 🖋️");
        nameInput.focus();
    } else {
        alert("Contract Validated! ❤️ " + nameInput.value + " is officially mine forever.");
        confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => {
            window.location.href = "coupons.html";
        }, 2000);
    }
}

// 6. Redeem Coupon
function redeemCoupon(element) {
    if (!element.classList.contains("redeemed")) {
        element.style.background = "#b2bec3";
        element.classList.add("redeemed");
        element.querySelector("h3").innerText = "REDEEMED ✅";
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        alert("Coupon Redeemed! Screenshot this! 📸");
    }
}

// --- ON LOAD EVENTS (Timer & No Button) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Timer Logic
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        const startDate = new Date("2023-10-13"); // OFFICIAL DATE
        
        setInterval(() => {
            const now = new Date();
            const diff = now - startDate;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            
            timerElement.innerText = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        }, 1000);
    }

    // No Button Logic
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = ["Are you sure?", "Don't do this!", "I'll cry...", "Wrong button!", "Click YES!"];
        let textIndex = 0;

        function moveButton() {
            const maxX = window.innerWidth - noBtn.offsetWidth - 50;
            const maxY = window.innerHeight - noBtn.offsetHeight - 50;
            
            const randomX = Math.max(20, Math.floor(Math.random() * maxX));
            const randomY = Math.max(20, Math.floor(Math.random() * maxY));

            noBtn.style.position = "fixed";
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            noBtn.innerText = noTexts[textIndex];
            textIndex = (textIndex + 1) % noTexts.length;
        }

        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("click", moveButton);
        noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveButton(); });
    }
});
