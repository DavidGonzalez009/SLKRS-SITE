const kickBtn = document.getElementById("kickBtn");
const resultText = document.getElementById("resultText");
const targets = document.querySelectorAll(".goal-target");
const goalie = document.getElementById("goalie");

const scoreDisplay = document.getElementById("scoreDisplay");
const shotsDisplay = document.getElementById("shotsDisplay");

const endMenu = document.getElementById("endMenu");

let score = 0;
let shots = 0;

targets.forEach((target) => {
  target.addEventListener("click", () => {
    if (kickBtn.disabled) return;
    if (shots >= 5) return;

    target.classList.add("hit");

    if (
      target.classList.contains("target-top-left") ||
      target.classList.contains("target-bottom-left")
    ) {
      goalie.src = "goalie-left.png";
    } else {
      goalie.src = "goalie-right.png";
    }

    const gameScreen = document.querySelector(".game-screen");
    const gameRect = gameScreen.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const ballImg = kickBtn.querySelector("img");
    const ballWidth = ballImg.offsetWidth;
    const ballHeight = ballImg.offsetHeight;

    const targetX =
      targetRect.left - gameRect.left + targetRect.width / 2 - ballWidth / 2;

    const targetY =
      targetRect.top - gameRect.top + targetRect.height / 2 - ballHeight / 2;

    const scored = Math.random() < 0.7;

    kickBtn.style.bottom = "auto";

    if (scored) {
      score++;
      kickBtn.style.left = `${targetX}px`;
      kickBtn.style.top = `${targetY}px`;
      kickBtn.style.transform = "scale(0.35)";
      resultText.textContent = "GOLAZOOOO!!!";
    } else {
      const isDesktop = window.innerWidth >= 900;

      const missOffsetX = isDesktop ? 260 : 120;
      const missOffsetY = isDesktop ? 140 : 90;

      kickBtn.style.left = `${targetX + missOffsetX}px`;
      kickBtn.style.top = `${targetY + missOffsetY}px`;
      kickBtn.style.transform = "scale(0.25) rotate(360deg)";
      resultText.textContent = "SE LA PERDIÓ!!!";
    }
    shots++;

    scoreDisplay.textContent = `GOALS: ${score}`;
    shotsDisplay.textContent = `SHOTS: ${shots}/5`;
    kickBtn.disabled = true;

    setTimeout(() => {
      kickBtn.style.top = "auto";
      kickBtn.style.bottom = "-60px";
      kickBtn.style.left = "50%";
      kickBtn.style.transform = "translateX(-50%)";
      kickBtn.classList.remove("goal");
      kickBtn.classList.remove("miss");
      target.classList.remove("hit");
      resultText.textContent = "";
      goalie.src = "goalie-center.png";

      if (shots < 5) {
        kickBtn.disabled = false;
      } else {
        let finalMessage = "";

        if (score === 5) {
          finalMessage = `FINAL SCORE: ${score}/5 - Fenómeno!!!`;
        } else if (score === 4) {
          finalMessage = `FINAL SCORE: ${score}/5 - "GOLEADOR"`;
        } else if (score === 3) {
          finalMessage = `FINAL SCORE: ${score}/5 - "SOLID PERFORMANCE"`;
        } else if (score === 2) {
          finalMessage = `FINAL SCORE: ${score}/5 - ... "SEND HIM TO MLS"`;
        } else if (score === 1) {
          finalMessage = `FINAL SCORE: ${score}/5 - "TIENE LADRILLOS EN LOS PIES"`;
        } else {
          finalMessage = `FINAL SCORE: ${score}/5 - "MALO... RETIRE IMMEDIATELY"`;
        }

        resultText.textContent = finalMessage;

        endMenu.style.display = "flex";
      }

      // window.location.href = "shop.html";
    }, 1500);
  });
});
