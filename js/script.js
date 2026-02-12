document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. ENVELOPE OPENING ---
    const envelope = document.getElementById("envelope");
    const container = document.querySelector(".container");
    const music = document.getElementById("bgMusic");

    // Expose openLetter to global scope so HTML can call it
    window.openLetter = function() {
        envelope.style.transition = "opacity 0.5s";
        envelope.style.opacity = "0";
        setTimeout(() => {
            envelope.style.display = "none";
            
            // Show the card
            if (window.innerWidth >= 1024) {
                container.style.display = "grid"; // Grid for laptop
            } else {
                container.style.display = "block"; // Block for mobile
            }

            // Start Typing Effect
            typeWriter();
            
            // Try to play music automatically (Browser allows it after interaction)
            if(music) {
                music.play().then(() => {
                    document.querySelector(".music-control").classList.add("playing");
                    document.querySelector(".music-control").innerText = "⏸️";
                }).catch(e => console.log("Auto-play blocked"));
            }

        }, 500);
    };

    // --- 2. TYPING EFFECT ---
    const textToType = "Will you be my Valentine? 🌹";
    const typeTarget = document.getElementById("typewriter-text");
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typeTarget.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100); // Speed of typing
        } else {
            // Remove cursor after typing
            document.querySelector(".cursor").style.display = "none";
        }
    }

    // --- 3. RELATIONSHIP TIMER ---
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        const startDate = new Date("2023-10-13"); // OFFICIAL DATE
        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            timerElement.innerText = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // --- 4. THE NO BUTTON ---
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = ["Really? 🥺", "Think again! 💔", "Please? 🌹", "Wrong choice! ❌", "Try again! 😈"];
        let textIndex = 0;

        function moveButton() {
            // Calculate screen bounds
            const maxX = window.innerWidth - noBtn.offsetWidth - 50;
            const maxY = window.innerHeight - noBtn.offsetHeight - 50;

            const randomX = Math.max(20, Math.floor(Math.random() * maxX));
            const randomY = Math.max(20, Math.floor(Math.random() * maxY));

            noBtn.style.position = "fixed";
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            
            noBtn.innerText = noTexts[textIndex];
            noBtn.style.background = "#ff7675";
            textIndex = (textIndex + 1) % noTexts.length;
        }

        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveButton(); });
        noBtn.addEventListener("click", moveButton);
    }
});

// --- GLOBAL FUNCTIONS ---
window.toggleMusic = function() {
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
};
