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
                <div style="font-size: 1rem; color: #666; margin-bottom: 5px; font-weight: 600;">Together since Oct 13, 2023 ❤️</div>
                <div style="font-size: 1.4rem; font-weight: 800; color: #d63031; background: rgba(255,255,255,0.8); padding: 10px 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: inline-block;">
                    ${days}d : ${hours}h : ${minutes}m : ${seconds}s
                </div>
            `;
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // --- 2. THE "UN-CATCHABLE" NO BUTTON (Fixed) ---
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = [
            "Are you sure? 🥺", 
            "Don't do this! 💔", 
            "I'm gonna cry... 😭", 
            "Just click YES! 😡", 
            "Wrong button! ❌", 
            "You can't catch me! 🏃‍♂️"
        ];
        let textIndex = 0;

        function moveButton() {
            // 1. Get the current size of the button
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;

            // 2. Get the window size
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 3. Calculate Safe Boundaries (50px padding from edges)
            // We subtract the button size so it doesn't hang off the right/bottom
            const maxLeft = windowWidth - btnWidth - 50;
            const maxTop = windowHeight - btnHeight - 50;

            // 4. Generate Random Coordinates within the safe zone
            // Math.max(20, ...) ensures it doesn't stick to the top/left edge either
            const randomX = Math.max(20, Math.floor(Math.random() * maxLeft));
            const randomY = Math.max(20, Math.floor(Math.random() * maxTop));

            // 5. Apply the new position
            noBtn.style.position = "fixed"; // Force it to float
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            noBtn.style.zIndex = "9999"; // Always on top
            
            // 6. Visual Updates
            noBtn.innerText = noTexts[textIndex];
            noBtn.style.backgroundColor = "#ff7675"; // Angry Red
            noBtn.style.color = "white";
            noBtn.style.transform = "scale(1.1)"; // Make it slightly bigger to taunt
            noBtn.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
            
            // Cycle through texts
            textIndex = (textIndex + 1) % noTexts.length;
        }

        // Trigger on Hover (Desktop) and Touch (Mobile)
        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", function(e) {
             e.preventDefault(); // Stop the click from happening
             moveButton(); 
        });
        noBtn.addEventListener("click", moveButton); // Backup in case they click fast
    }
});

// --- 3. GLOBAL FUNCTIONS (No changes needed here) ---
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.querySelector(".music-control");
    
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️";
        btn.classList.add("playing");
    } else {
        music.pause();
        btn.innerHTML = "🎵";
        btn.classList.remove("playing");
    }
}

function checkQuiz(isCorrect, btn) {
    if (isCorrect) {
        btn.style.backgroundColor = "#00b894"; // Green
        btn.innerText = "Correct! You know me! 🎉";
        setTimeout(() => { location.href = "reasons.html"; }, 1000);
    } else {
        btn.style.backgroundColor = "#d63031"; // Red
        btn.innerText = "Wrong! Try Again 😈";
        btn.classList.add("shake-animation");
        setTimeout(() => { 
            btn.innerText = "Ryan Reynolds? Seriously?"; 
            btn.classList.remove("shake-animation");
            btn.style.backgroundColor = "#dfe6e9"; // Reset color
        }, 1200);
    }
}

function redeemCoupon(element) {
    if (!element.classList.contains("redeemed")) {
        element.style.background = "#b2bec3";
        element.style.cursor = "default";
        element.classList.add("redeemed");
        element.querySelector("h3").innerText = "REDEEMED ✅";
        
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        alert("Yay! Screenshot this immediately! 📸");
    }
}

function signContract() {
    const nameInput = document.getElementById("signature");
    if (nameInput.value.trim() === "") {
        alert("You have to sign it! I need proof! 🖋️");
        nameInput.focus();
        nameInput.style.border = "2px solid red";
    } else {
        alert("Contract Validated! ❤️ " + nameInput.value + " is officially mine forever.");
        confetti({ particleCount: 250, spread: 120, origin: { y: 0.6 } });
        setTimeout(() => { location.href = "coupons.html"; }, 2000);
    }
}
