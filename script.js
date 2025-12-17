let currentCount = 0;
let theme = "dark";
let gpaInterval = null;

/* ---------------- THEME TOGGLE ---------------- */
document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
});

function toggleTheme() {
    theme = theme === "dark" ? "neon" : "dark";
    applyTheme();
}

function applyTheme() {
    document.body.classList.toggle("neon-theme", theme === "neon");
}

/* ---------------- INITIALIZE ---------------- */
function initializeCalculator() {
    const num = document.getElementById('subject-count').value;

    if (num === "" || num <= 0) {
        alert("Please enter a valid number of subjects.");
        return;
    }

    currentCount = 0;

    document.getElementById('setup-view').style.display = 'none';
    document.getElementById('calc-view').style.display = 'block';

    const container = document.getElementById('subject-list');
    container.innerHTML = "";

    for (let i = 0; i < num; i++) {
        addSubject();
    }

    setTimeout(() => {
        const firstInput = document.querySelector('.grade');
        if (firstInput) {
            firstInput.focus();
            firstInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, 100);
}

/* ---------------- ADD SUBJECT ---------------- */
function addSubject() {
    currentCount++;

    const container = document.getElementById('subject-list');
    const row = document.createElement('div');
    row.className = 'subject-row';

    row.innerHTML = `
        <input type="number" step="0.01" class="grade" placeholder="Sub ${currentCount} Grade">
        <input type="number" class="credits" placeholder="Sub ${currentCount} Credits">
    `;

    container.appendChild(row);
    setupInputFlow();
}

/* ---------------- INPUT FLOW ---------------- */
function setupInputFlow() {
    const inputs = document.querySelectorAll('.grade, .credits');

    inputs.forEach((input, index) => {
        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();

                if (index === inputs.length - 1) {
                    addSubject();
                    setTimeout(() => {
                        document.querySelectorAll('.grade')[currentCount - 1].focus();
                    }, 50);
                } else {
                    inputs[index + 1].focus();
                }
            }
        };
    });
}

/* ---------------- GPA CALCULATION ---------------- */
function calculateGPA() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credits');

    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {
        const g = parseFloat(grades[i].value);
        const c = parseFloat(credits[i].value);

        if (!isNaN(g) && !isNaN(c) && c > 0) {
            totalPoints += g * c;
            totalCredits += c;
        }
    }

    if (totalCredits === 0) {
        alert("Please enter grade points and credits.");
        return;
    }

    animateGPA(totalPoints / totalCredits);
}

/* ---------------- GPA ANIMATION + LOOPING FULL PAGE CELEBRATION ---------------- */
function animateGPA(target) {
    const display = document.getElementById("gpa-display");
    const message = document.getElementById("gpa-message");
    const overlay = document.getElementById("celebration-overlay");

    if (gpaInterval) clearInterval(gpaInterval);

    display.innerText = "0.00";
    message.innerHTML = "";
    message.className = "";
    overlay.innerHTML = "";
    overlay.style.display = "none";

    let current = 0;
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    gpaInterval = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(gpaInterval);

            overlay.style.display = "block";

            if (target >= 7) {
                message.innerHTML = "🌸 You got concession 🌸";
                message.classList.add("flower");
                startConcessionAnimation(); // Continuous flowers + cracks
            } else {
                message.innerHTML = "❌ No concession";
                message.classList.add("sad");
                startSadAnimation(); // Continuous sad effect
            }
        }

        display.innerText = current.toFixed(2);
    }, stepTime);
}

/* ---------------- CONTINUOUS CELEBRATION FOR CONCESSION ---------------- */
function startConcessionAnimation() {
    const overlay = document.getElementById("celebration-overlay");

    setInterval(() => {
        const flower = document.createElement("div");
        flower.className = "flower-petal";
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = (20 + Math.random() * 30) + "px";
        flower.style.animationDuration = (2 + Math.random() * 3) + "s";
        flower.innerText = "🌸";
        overlay.appendChild(flower);

        // Remove after animation to prevent DOM overload
        setTimeout(() => flower.remove(), 5000);

        // Random cracks
        if (Math.random() > 0.7) {
            const crack = document.createElement("div");
            crack.className = "crack";
            crack.style.left = Math.random() * 100 + "vw";
            crack.style.top = Math.random() * 80 + "vh";
            overlay.appendChild(crack);
            setTimeout(() => crack.remove(), 4000);
        }
    }, 300); // create a flower every 0.3s
}

/* ---------------- CONTINUOUS SAD EFFECT ---------------- */
function startSadAnimation() {
    const overlay = document.getElementById("celebration-overlay");

    setInterval(() => {
        const dot = document.createElement("div");
        dot.className = "sad-dot";
        dot.style.left = Math.random() * 100 + "vw";
        dot.style.top = Math.random() * 100 + "vh";
        dot.style.width = dot.style.height = (5 + Math.random() * 5) + "px";
        overlay.appendChild(dot);
        setTimeout(() => dot.remove(), 5000);
    }, 400); // create a sad dot every 0.4s
}
