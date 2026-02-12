document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. RELATIONSHIP TIMER ---
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        // OFFICIAL DATE: Oct 13, 2023
        const startDate = new Date("2023-10-13T00:00:00");

        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            // Pad with zeros for better display
            const pad = (num) => String(num).padStart(2, '0');

            timerElement.innerHTML = `
                <div style="font-size: 1.1rem; color: #555; margin-bottom: 10px; font-weight: 500;">
                    Together since October 13, 2023 ❤️
                </div>
                <div style="font-size: 1.5rem; font-weight: 700; color: #d63031; background: rgba(255,255,255,0.6); padding: 15px; border-radius: 12px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <span style="background: rgba(255,107,107,0.2); padding: 8px 15px; border-radius: 8px;">
                        <strong>${days}</strong> Days
                    </span>
                    <span style="background: rgba(255,107,107,0.2); padding: 8px 15px; border-radius: 8px;">
                        <strong>${pad(hours)}</strong> Hours
                    </span>
                    <span style="background: rgba(255,107,107,0.2); padding: 8px 15px; border-radius: 8px;">
                        <strong>${pad(minutes)}</strong> Mins
                    </span>
                    <span style="background: rgba(255,107,107,0.2); padding: 8px 15px; border-radius: 8px;">
                        <strong>${pad(seconds)}</strong> Secs
                    </span>
                </div>
            `;
        }
        
        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // --- 2. THE IMPOSSIBLE NO BUTTON (Enhanced for Desktop) ---
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
        const noTexts = [
            "Are you sure? 🥺",
            "Wrong button! ❌",
            "I'll cry... 😭",
            "Try the other one! 👉",
            "Don't do this! 💔",
            "Please reconsider 🙏",
            "This hurts... 😞",
            "Really? REALLY? 😠",
            "Last chance! 💝",
            "Fine, I'm hiding! 🏃"
        ];
        let textIndex = 0;
        let moveCount = 0;

        function moveButton(event) {
            // Prevent default behavior
            if (event) {
                event.preventDefault();
            }

            const container = document.querySelector('.container');
            const containerRect = container.getBoundingClientRect();
            
            // Get button dimensions
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;
            
            // Calculate safe bounds (keep button visible on screen)
            const maxWidth = window.innerWidth - btnWidth - 40;
            const maxHeight = window.innerHeight - btnHeight - 40;
            const minWidth = 20;
            const minHeight = 20;

            // Generate random position
            let randomX = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);
            let randomY = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);

            // Ensure button doesn't overlap with container
            if (randomX > containerRect.left - btnWidth - 20 && 
                randomX < containerRect.right + 20 &&
                randomY > containerRect.top - btnHeight - 20 && 
                randomY < containerRect.bottom + 20) {
                // Move button further away if it overlaps
                randomX = randomX < window.innerWidth / 2 ? minWidth : maxWidth - btnWidth;
            }

            // Apply position
            noBtn.style.position = "fixed";
            noBtn.style.left = randomX + "px";
            noBtn.style.top = randomY + "px";
            noBtn.style.zIndex = "1000";
            
            // Visual changes with progression
            moveCount++;
            noBtn.innerText = noTexts[textIndex];
            
            if (moveCount > 5) {
                noBtn.style.backgroundColor = "#ff4757";
                noBtn.style.color = "white";
                noBtn.style.transform = "scale(0.9)";
            } else if (moveCount > 3) {
                noBtn.style.backgroundColor = "#ff7675";
                noBtn.style.color = "white";
            }
            
            noBtn.style.boxShadow = "0 8px 20px rgba(255, 71, 87, 0.4)";
            
            textIndex = (textIndex + 1) % noTexts.length;
        }

        // Desktop: Move on hover with slight delay for better UX
        let hoverTimer;
        noBtn.addEventListener("mouseenter", function(e) {
            hoverTimer = setTimeout(() => moveButton(e), 200);
        });

        noBtn.addEventListener("mouseleave", function() {
            clearTimeout(hoverTimer);
        });

        // Mobile: Move on touch
        noBtn.addEventListener("touchstart", function(e) {
            e.preventDefault();
            moveButton(e);
        });

        // Click also moves it
        noBtn.addEventListener("click", function(e) {
            e.preventDefault();
            moveButton(e);
        });
    }

    // --- 3. AUTO-PLAY MUSIC (with user interaction) ---
    const music = document.getElementById("bgMusic");
    if (music) {
        // Try to autoplay after first user interaction
        const tryAutoplay = () => {
            music.play().then(() => {
                const btn = document.querySelector(".music-control");
                if (btn) {
                    btn.innerHTML = "⏸️";
                    btn.style.animation = "none";
                }
            }).catch(() => {
                // Autoplay blocked, user needs to click
                console.log("Autoplay blocked. Click music button to play.");
            });
        };

        // Try autoplay on first click anywhere
        document.body.addEventListener('click', tryAutoplay, { once: true });
    }
});

// --- GLOBAL FUNCTIONS ---

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.querySelector(".music-control");
    
    if (!music || !btn) return;
    
    if (music.paused) {
        music.play().then(() => {
            btn.innerHTML = "⏸️";
            btn.style.animation = "none";
            btn.style.background = "linear-gradient(135deg, #55efc4, #00b894)";
        }).catch(error => {
            console.error("Error playing music:", error);
            alert("Unable to play music. Please check if the audio file exists.");
        });
    } else {
        music.pause();
        btn.innerHTML = "🎵";
        btn.style.background = "linear-gradient(135deg, #ffffff, #ffeaa7)";
        btn.style.animation = "pulse 2.5s infinite";
    }
}

function checkQuiz(isCorrect, btn) {
    // Disable all buttons temporarily
    const allButtons = document.querySelectorAll('.quiz-btn');
    allButtons.forEach(b => b.disabled = true);
    
    if (isCorrect) {
        btn.style.background = "linear-gradient(135deg, #55efc4, #00b894)";
        btn.style.transform = "scale(1.05)";
        btn.innerHTML = "✅ YAY! Correct! 🎉";
        
        // Confetti effect if available
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        
        setTimeout(() => {
            window.location.href = "reasons.html";
        }, 1500);
    } else {
        btn.style.background = "linear-gradient(135deg, #ff7675, #d63031)";
        btn.innerHTML = "❌ Wrong! Try Again 😈";
        btn.classList.add("shake-animation");
        
        setTimeout(() => {
            btn.innerHTML = "Seriously? Try the middle one! 😏";
            btn.classList.remove("shake-animation");
            // Re-enable buttons
            allButtons.forEach(b => b.disabled = false);
        }, 1500);
    }
}

function redeemCoupon(element) {
    if (!element.classList.contains("redeemed")) {
        element.style.background = "#b2bec3";
        element.style.borderColor = "#636e72";
        element.classList.add("redeemed");
        
        const heading = element.querySelector("h3");
        if (heading) {
            heading.innerHTML = "✅ REDEEMED";
            heading.style.color = "#2d3436";
        }
        
        // Confetti effect
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff6b6b', '#ffeaa7', '#74b9ff', '#a29bfe']
            });
        }
        
        // Show message
        showNotification("🎉 Coupon Redeemed! Screenshot this page to claim your reward!");
    } else {
        showNotification("⚠️ Already redeemed! Choose another one.");
    }
}

function signContract() {
    const nameInput = document.getElementById("signature");
    
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    
    if (name === "") {
        showNotification("Please sign your name first! 🖋️");
        nameInput.focus();
        nameInput.style.borderColor = "#ff7675";
        nameInput.style.animation = "shake 0.5s";
        
        setTimeout(() => {
            nameInput.style.borderColor = "#dfe6e9";
            nameInput.style.animation = "";
        }, 500);
    } else {
        // Confetti celebration
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 250,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#ff6b6b', '#ffeaa7', '#74b9ff', '#a29bfe', '#fd79a8']
            });
        }
        
        showNotification(`💖 Officially Signed! ${name} is now my Valentine forever! 💖`, 3000);
        
        setTimeout(() => {
            window.location.href = "coupons.html";
        }, 2000);
    }
}

// Notification function
function showNotification(message, duration = 2500) {
    // Remove existing notification if any
    const existing = document.querySelector('.custom-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 18px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'Fredoka', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        text-align: center;
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => notification.remove(), 500);
    }, duration);
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Enter key on buttons
    if (e.key === 'Enter' && document.activeElement.tagName === 'BUTTON') {
        document.activeElement.click();
    }
});

// Preload images for better performance
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preload = new Image();
            preload.src = src;
        }
    });
});
