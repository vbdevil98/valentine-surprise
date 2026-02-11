document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. RELATIONSHIP TIMER (Only runs if #timer exists) ---
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        // CHANGE THIS DATE TO YOUR ANNIVERSARY (YYYY-MM-DD)
        const startDate = new Date("2024-01-01"); 

        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            timerElement.innerHTML = `
                <div style="font-size: 0.9rem; color: #777; margin-bottom: 5px;">We've been together for:</div>
                <div style="font-size: 1.1rem; font-weight: bold; color: #ff4d4d;">
                    ${days} Days, ${hours} Hrs, ${minutes} Mins, ${seconds} Secs ❤️
                </div>
            `;
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // --- 2. THE RUNAWAY "NO" BUTTON (Only runs if #noBtn exists) ---
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = ["Are you sure? 🥺", "Don't do this! 💔", "I'll cry... 😭", "Please? 🌹", "Think again! 🤔", "Just click YES! 😡"];
        let textIndex = 0;

        function moveButton() {
            // Calculate available screen space
            const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
            const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;

            // Generate random coordinates
            const randomX = Math.max(10, Math.floor(Math.random() * maxWidth));
            const randomY = Math.max(10, Math.floor(Math.random() * maxHeight));

            // Apply new style
            noBtn.style.position = "fixed";
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            noBtn.style.zIndex = "1000";
            
            // Change text and style to look "angry/sad"
            noBtn.innerText = noTexts[textIndex];
            noBtn.style.backgroundColor = "#ff6b6b";
            noBtn.style.color = "white";
            
            textIndex = (textIndex + 1) % noTexts.length;
        }

        // Trigger on hover (desktop) and touch (mobile)
        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", function(e) {
            e.preventDefault(); // Prevents clicking
            moveButton();
        });
        noBtn.addEventListener("click", moveButton); // Just in case they click fast
    }

    // --- 3. MUSIC PLAYER ---
    // Note: Music logic is inline in index.html to ensure it works simply
});

// --- 4. GLOBAL FUNCTIONS (Called by onclick attributes) ---

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.querySelector(".music-control");
    
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️ Pause Song";
    } else {
        music.pause();
        btn.innerHTML = "🎵 Play Song";
    }
}

function checkQuiz(isCorrect, btn) {
    if (isCorrect) {
        // Success animation or redirect
        btn.style.backgroundColor = "#4cd137";
        btn.innerText = "Correct! 🎉";
        setTimeout(() => {
            location.href = "reasons.html";
        }, 800);
    } else {
        // Shake effect
        btn.style.backgroundColor = "#ffcccc";
        btn.classList.add("shake");
        btn.innerText = "Try Again! 😈";
        setTimeout(() => {
            btn.classList.remove("shake");
        }, 500);
    }
}

function redeemCoupon(element) {
    if (!element.classList.contains("redeemed")) {
        element.style.background = "#d1ccc0";
        element.style.borderColor = "#777";
        element.style.cursor = "default";
        element.classList.add("redeemed");
        element.querySelector("h3").innerText = "REDEEMED ✅";
        
        // Confetti explosion
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        alert("Coupon redeemed! Take a screenshot instantly! 📸");
    }
}

function signContract() {
    const nameInput = document.getElementById("signature");
    if (nameInput.value.trim() === "") {
        alert("Hey! You need to sign your name first! 🖋️");
        nameInput.focus();
    } else {
        alert("It is official! " + nameInput.value + " has agreed to be my Valentine forever! ❤️");
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            location.href = "coupons.html";
        }, 2000);
    }
}
