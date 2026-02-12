/* js/script.js - improved, accessible, and robust */
document.addEventListener('DOMContentLoaded', () => {

  // ---------- TIMER ----------
  const timerElement = document.getElementById("timer");
  if (timerElement) {
    // OFFICIAL DATE: Oct 13, 2023 (elapsed time since then)
    const startDate = new Date("2023-10-13T00:00:00");

    function updateTimerOnce() {
      const now = new Date();
      let diff = now - startDate;
      if (isNaN(diff)) diff = 0;
      diff = Math.max(0, diff);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      timerElement.innerHTML = `
        <div style="font-size:0.98rem;color:#555;margin-bottom:6px;">Together since Oct 13, 2023 ❤️</div>
        <div style="font-size:1.15rem;font-weight:700;color:#d63031;background:rgba(255,255,255,0.55);padding:8px;border-radius:8px;display:inline-block;">
          ${days} Days : ${String(hours).padStart(2,'0')} Hrs : ${String(minutes).padStart(2,'0')} Mins : ${String(seconds).padStart(2,'0')} Secs
        </div>
      `;
    }

    // Update every second (use setInterval - simple & reliable)
    updateTimerOnce();
    setInterval(updateTimerOnce, 1000);
  }


  // ---------- NO BUTTON (elusive but sane) ----------
  const noBtn = document.getElementById("noBtn");
  const musicControl = document.querySelector(".music-control");
  if (noBtn) {
    const noTexts = ["Are you sure? 🥺", "Wrong button! ❌", "I'll cry... 😭", "Try the other one! 👉", "Don't do this! 💔", "Sigh... 😞"];
    let textIndex = 0;

    // compute safe bounding box so button never goes off-screen or over key UI (music)
    function computeSafeCoords(btnRect) {
      const margin = 16;
      const musicRect = musicControl ? musicControl.getBoundingClientRect() : null;
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      // allowable area
      const leftMin = margin;
      const leftMax = vw - btnRect.width - margin;
      const topMin = margin;
      const topMax = vh - btnRect.height - margin;

      let x = Math.floor(Math.random() * (leftMax - leftMin + 1)) + leftMin;
      let y = Math.floor(Math.random() * (topMax - topMin + 1)) + topMin;

      // avoid overlap with the music control button by nudging if needed
      if (musicRect) {
        const pad = 12;
        const musicArea = {
          left: musicRect.left - pad,
          right: musicRect.right + pad,
          top: musicRect.top - pad,
          bottom: musicRect.bottom + pad
        };
        // If overlap, push button to a different quadrant
        if (!(x + btnRect.width < musicArea.left || x > musicArea.right || y + btnRect.height < musicArea.top || y > musicArea.bottom)) {
          // choose alternate quadrant
          if (x + btnRect.width + 120 < vw) x = Math.min(leftMax, musicArea.right + 20);
          else x = Math.max(leftMin, musicArea.left - btnRect.width - 20);

          if (y + btnRect.height + 120 < vh) y = Math.min(topMax, musicArea.bottom + 20);
          else y = Math.max(topMin, musicArea.top - btnRect.height - 20);
        }
      }
      return {x, y};
    }

    function moveButton() {
      // ensure style is set to fixed so we can position anywhere
      noBtn.style.position = "fixed";
      const btnRect = noBtn.getBoundingClientRect();
      const coords = computeSafeCoords(btnRect);

      // apply smooth transition
      noBtn.style.transition = "left 220ms ease, top 220ms ease, transform 160ms ease";
      noBtn.style.left = coords.x + "px";
      noBtn.style.top = coords.y + "px";
      noBtn.style.zIndex = "9999";

      // visual update
      noBtn.innerText = noTexts[textIndex];
      noBtn.style.background = "linear-gradient(45deg,#ff7675,#ff6b6b)";
      noBtn.style.color = "white";
      noBtn.style.boxShadow = "0 8px 22px rgba(0,0,0,0.16)";

      textIndex = (textIndex + 1) % noTexts.length;
    }

    // Desktop: mouseover. Mobile: touchstart. Always support keyboard (Enter/Space).
    noBtn.addEventListener("mouseover", moveButton);
    noBtn.addEventListener("touchstart", function(e){ e.preventDefault(); moveButton(); }, {passive:false});
    noBtn.addEventListener("click", moveButton);
    noBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        moveButton();
      }
    });

    // Make focusable for keyboard users
    noBtn.setAttribute("tabindex", "0");
    noBtn.setAttribute("aria-label", "No button - try to click me if you can");
  }


  // ---------- Keyboard accessibility for music control ----------
  const music = document.getElementById("bgMusic");
  if (musicControl) {
    musicControl.setAttribute("role","button");
    musicControl.setAttribute("tabindex","0");
    musicControl.setAttribute("aria-pressed","false");
    musicControl.setAttribute("aria-label","Toggle background music");

    function setMusicIcon(isPlaying){
      musicControl.innerHTML = isPlaying ? "⏸️" : "🎵";
      musicControl.style.animation = isPlaying ? "none" : "";
      musicControl.setAttribute("aria-pressed", String(isPlaying));
    }

    async function toggleMusic() {
      if (!music) return;
      try {
        if (music.paused) {
          const playPromise = music.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
          setMusicIcon(true);
        } else {
          music.pause();
          setMusicIcon(false);
        }
      } catch (err) {
        // Play may be blocked; inform user
        console.warn("Music play blocked:", err);
        alert("Browser blocked audio autoplay — please click the music button again to allow playback.");
      }
    }

    musicControl.addEventListener("click", toggleMusic);
    musicControl.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggleMusic(); }
    });

    // If there is an initial animation pulse, keep until user activates
    setMusicIcon(!music || music.paused ? false : true);
  }

  // ---------- Helper functions used by pages ----------
  window.checkQuiz = function(isCorrect, btn) {
    if (!btn) return;
    if (isCorrect) {
      btn.style.backgroundColor = "#55efc4";
      btn.innerText = "YAY! Correct! 🎉";
      setTimeout(() => { location.href = "reasons.html"; }, 900);
    } else {
      btn.style.backgroundColor = "#ff7675";
      btn.innerText = "Wrong! Try Again 😈";
      btn.classList.add("shake-animation");
      setTimeout(() => {
        btn.innerText = "Try again?";
        btn.classList.remove("shake-animation");
      }, 900);
    }
  };

  window.redeemCoupon = function(element) {
    if (!element) return;
    if (!element.classList.contains("redeemed")) {
      element.classList.add("redeemed");
      element.querySelector("h3") && (element.querySelector("h3").innerText = "REDEEMED ✅");
      if (window.confetti) {
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      }
      alert("Redeemed — take a screenshot to claim! 📸");
    } else {
      alert("You already redeemed this one 👍");
    }
  };

  window.signContract = function() {
    const nameInput = document.getElementById("signature");
    if (!nameInput) return;
    if (nameInput.value.trim() === "") {
      alert("Please sign your name first! 🖋️");
      nameInput.focus();
      return;
    }
    alert("Officially Signed! ❤️ " + nameInput.value + " is now my Valentine forever.");
    if (window.confetti) confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    setTimeout(() => { location.href = "coupons.html"; }, 1200);
  };

});
