document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. RELATIONSHIP TIMER ---
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        // OFFICIAL DATE: Oct 13, 2023
        const startDate = new Date("2023-10-13"); 

        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            timerElement.innerHTML = `
                <div style="font-size: 1rem; color: #555; margin-bottom: 5px;">Together since Oct 13, 2023 ❤️</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #d63031; background: rgba(255,255,255,0.5); padding: 10px; border-radius: 10px;">
                    ${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs
                </div>
            `;
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // --- 2. THE IMPOSSIBLE NO BUTTON ---
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = ["Are you sure? 🥺", "Wrong button! ❌", "I'll cry... 😭", "Try the other one! 👉", "Don't do this! 💔", "Sigh... 😞"];
        let textIndex = 0;

        function moveButton() {
            const maxWidth = window.innerWidth - noBtn.offsetWidth - 30;
            const maxHeight = window.innerHeight - noBtn.offsetHeight - 30;

            const randomX = Math.max(20, Math.floor(Math.random() * maxWidth));
            const randomY = Math.max(20, Math.floor(Math.random() * maxHeight));

            noBtn.style.position = "fixed";
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            noBtn.style.zIndex = "100";
            
            // Visual changes
            noBtn.innerText = noTexts[textIndex];
            noBtn.style.backgroundColor = "#ff7675";
            noBtn.style.color = "white";
            noBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
            
            textIndex = (textIndex + 1) % noTexts.length;
        }

        // Move on Hover (Desktop) & Touch (Mobile)
        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", function(e) {
             e.preventDefault(); 
             moveButton(); 
        });
        noBtn.addEventListener("click", moveButton);
    }
});

// --- 3. GLOBAL FUNCTIONS ---

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.querySelector(".music-control");
    
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️";
        btn.style.animation = "none"; // Stop pulsing when playing
    } else {
        music.pause();
        btn.innerHTML = "🎵";
    }
}

function checkQuiz(isCorrect, btn) {
    if (isCorrect) {
        btn.style.backgroundColor = "#55efc4";
        btn.innerText = "YAY! Correct! 🎉";
        setTimeout(() => { location.href = "reasons.html"; }, 1000);
    } else {
        btn.style.backgroundColor = "#ff7675";
        btn.innerText = "Wrong! Try Again 😈";
        btn.classList.add("shake-animation");
        setTimeout(() => { 
            btn.innerText = "Ryan Reynolds? Really?"; 
            btn.classList.remove("shake-animation");
        }, 1000);
    }
}

function redeemCoupon(element) {
    if (!element.classList.contains("redeemed")) {
        element.style.background = "#b2bec3";
        element.classList.add("redeemed");
        element.querySelector("h3").innerText = "REDEEMED ✅";
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        alert("Success! Take a screenshot to claim this reward! 📸");
    }
}

function signContract() {
    const nameInput = document.getElementById("signature");
    if (nameInput.value.trim() === "") {
        alert("Please sign your name first! 🖋️");
        nameInput.focus();
    } else {
        alert("Officially Signed! ❤️ " + nameInput.value + " is now my Valentine forever.");
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        setTimeout(() => { location.href = "coupons.html"; }, 1500);
    }
}
