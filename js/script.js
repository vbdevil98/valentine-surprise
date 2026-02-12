// --- 1. GLOBAL FUNCTIONS (Accessible everywhere) ---

function openLetter() {
    const envelope = document.getElementById("envelope");
    const container = document.querySelector(".container");
    const music = document.getElementById("bgMusic");

    envelope.style.transition = "opacity 0.5s ease";
    envelope.style.opacity = "0";
    
    setTimeout(() => {
        envelope.style.display = "none";
        // Show container (Desktop gets grid, Mobile gets block)
        container.style.display = (window.innerWidth >= 900) ? "grid" : "block";
        
        typeWriter();

        if(music) {
            music.volume = 0.5;
            music.play().then(() => {
                const btn = document.querySelector(".music-control");
                if(btn) {
                    btn.classList.add("playing");
                    btn.innerText = "⏸️";
                }
            }).catch(e => console.log("Audio waiting for interaction"));
        }
    }, 500);
}

// Typing Effect
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
        cursor.style.display = "none";
    }
}

// Music Toggle
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

// Quiz Logic
function checkQuiz(isCorrect, btn) {
    if (isCorrect) {
        btn.style.background = "#55efc4";
        btn.style.color = "white";
        btn.innerText = "Correct! 🎉";
        setTimeout(() => { window.location.href = "reasons.html"; }, 1000);
    } else {
        btn.style.background = "#ff7675";
        btn.style.color = "white";
        btn.innerText = "Wrong! 😈";
        btn.style.transform = "translateX(10px)";
        setTimeout(() => { btn.style.transform = "translateX(0)"; }, 200);
    }
}

// Contract Logic
function signContract() {
    const nameInput = document.getElementById("signature");
    if (nameInput.value.trim() === "") {
        alert("Sign your name first! 🖋️");
        nameInput.focus();
    } else {
        alert("Contract Signed! ❤️ Welcome to forever.");
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => { window.location.href = "coupons.html"; }, 2000);
    }
}

// Coupon Logic
function redeemCoupon(element) {
    if (!element.classList.contains("redeemed")) {
        element.style.background = "#b2bec3";
        element.classList.add("redeemed");
        element.querySelector("h3").innerText = "REDEEMED ✅";
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        alert("Screenshot this coupon now! 📸");
    }
}

// --- 2. ON LOAD EVENTS ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Timer
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        const startDate = new Date("2023-10-13"); // Your Date
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

    // --- THE FIX FOR THE "NO" BUTTON ---
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = ["Are you sure?", "Really?", "Don't do it!", "Look here!", "Click YES!"];
        let textIndex = 0;

        function moveButton() {
            // 1. Get Button Size
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;
            
            // 2. Get Window Size
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;

            // 3. Define Safe Area (50px padding from all edges)
            // Example: If window is 1000px, button is 100px.
            // Max Left position = 1000 - 100 - 50 = 850px.
            const maxLeft = winWidth - btnWidth - 50;
            const maxTop = winHeight - btnHeight - 50;
            const minPos = 50; // Don't touch top/left edges

            // 4. Generate Random
            const randomX = Math.floor(Math.random() * (maxLeft - minPos + 1)) + minPos;
            const randomY = Math.floor(Math.random() * (maxTop - minPos + 1)) + minPos;

            // 5. Apply Fixed Position
            noBtn.style.position = "fixed"; // Break out of container
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            
            // 6. Style Update
            noBtn.innerText = noTexts[textIndex];
            textIndex = (textIndex + 1) % noTexts.length;
        }

        // Add both MouseOver (Desktop) and TouchStart (Mobile)
        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveButton(); });
        noBtn.addEventListener("click", moveButton);
    }
});
