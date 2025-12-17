let currentCount = 0;

function initializeCalculator() {
    const num = document.getElementById('subject-count').value;
    if (num <= 0 || num === "") {
        alert("Please enter a valid number of subjects.");
        return;
    }

    document.getElementById('setup-view').style.display = 'none';
    document.getElementById('calc-view').style.display = 'block';

    for (let i = 0; i < num; i++) {
        addSubject();
    }
}

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
    container.scrollTop = container.scrollHeight;
}

function calculateGPA() {
    const grades = document.querySelectorAll('.grade');
    const credits = document.querySelectorAll('.credits');
    let totalPoints = 0, totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {
        const g = parseFloat(grades[i].value);
        const c = parseFloat(credits[i].value);
        if (!isNaN(g) && !isNaN(c) && c > 0) {
            totalPoints += g * c;
            totalCredits += c;
        }
    }

    const gpaDisplay = document.getElementById('gpa-display');
    if (totalCredits > 0) {
        gpaDisplay.innerText = (totalPoints / totalCredits).toFixed(2);
    } else {
        alert("Please enter values to calculate.");
    }
}
