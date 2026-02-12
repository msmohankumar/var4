let revealIndex = 0;
let totalSteps = 5;
let likeCount = 0;
let answeredCount = 0;
let musicStarted = false;

// PDF Storage Object
let storyData = {
    score: "0%", belief: "50%", hobbies: "", food: "", 
    family: "", career: "", expect: "", trip: "N/A", 
    home: "N/A", partner: "N/A"
};

// Start Experience & Music
function initExperience() {
    document.getElementById("startOverlay").style.display = "none";
    const music = document.getElementById("bgMusic");
    if (music && !musicStarted) {
        music.volume = 0.4;
        music.play().catch(e => console.log("Music blocked"));
        musicStarted = true;
    }
    setTimeout(autoRevealSteps, 1000);
    createFloatingHearts();
}

document.addEventListener("DOMContentLoaded", () => {
    // Love Meter logic
    const loveMeter = document.getElementById("loveMeter");
    if (loveMeter) {
        loveMeter.addEventListener("input", (e) => {
            const val = e.target.value;
            storyData.belief = val + "%";
            document.getElementById("loveValue").innerText = val;
            const emoji = document.getElementById("loveEmoji");
            if (val <= 25) emoji.innerText = "😢";
            else if (val <= 50) emoji.innerText = "😕";
            else if (val <= 75) emoji.innerText = "😊";
            else emoji.innerText = "😍";
        });
    }

    // Marriage Form logic
    const form = document.getElementById("marriageForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            storyData.hobbies = document.getElementById("herHobbies").value;
            storyData.food = document.getElementById("herFood").value;
            storyData.family = document.getElementById("herFamily").value;
            storyData.career = document.getElementById("herCareer").value;
            storyData.expect = document.getElementById("herExpectations").value;
            romanticBurst("💖");
            alert("Your answers are saved in our story 💕");
        });
    }
});

function autoRevealSteps() {
    const steps = document.querySelectorAll("#stepContainer .step-item");
    if (revealIndex < steps.length) {
        steps[revealIndex].classList.add("show");
        revealIndex++;
        let percent = Math.floor((revealIndex / totalSteps) * 100);
        document.getElementById("progressBar").style.width = percent + "%";
        document.getElementById("progressText").innerText = "Understanding Level: " + percent + "%";
        setTimeout(autoRevealSteps, 1000);
    }
}

function handleReaction(button, liked) {
    if (!liked) {
        alert("Only if you select ❤️ we will go forward... 💖");
        return;
    }
    const parent = button.parentElement;
    if (parent.classList.contains("answered")) return;
    parent.classList.add("answered");
    likeCount++;
    answeredCount++;
    if (answeredCount === totalSteps) {
        storyData.score = Math.floor((likeCount / totalSteps) * 100) + "%";
        document.getElementById("continueBtn").disabled = false;
        document.getElementById("likeSummary").classList.remove("hidden");
        document.getElementById("likeSummary").innerHTML = `You liked <b>${likeCount}/${totalSteps}</b> things about me 💖`;
    }
}

function selectOption(card, category) {
    let choice = card.innerText.replace("💖", "").trim();
    if(category === 'trip') storyData.trip = choice;
    if(category === 'home') storyData.home = choice;
    if(category === 'partner') storyData.partner = choice;
    card.parentElement.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    romanticBurst("💖");
}

function valentineYes() {
    romanticBurst("💘");
    const container = document.getElementById("valentineSection");
    container.innerHTML = `
        <h1 style="color: #ff4757;">Perfect Choice! 💖</h1>
        <p>You've made me the happiest person, Sonam. 💍✨</p>
        <button id="downloadBtn" class="cute-btn" style="background: #2ecc71; margin-top: 20px;" onclick="downloadPDF()">Download Our Full Story (PDF) 📄💖</button>
    `;
}

function downloadPDF() {
    document.getElementById("pdf-score").innerText = storyData.score;
    document.getElementById("pdf-belief").innerText = storyData.belief;
    document.getElementById("pdf-hobbies").innerText = storyData.hobbies;
    document.getElementById("pdf-food").innerText = storyData.food;
    document.getElementById("pdf-family").innerText = storyData.family;
    document.getElementById("pdf-career").innerText = storyData.career;
    document.getElementById("pdf-expect").innerText = storyData.expect;
    document.getElementById("pdf-trip").innerText = storyData.trip;
    document.getElementById("pdf-home").innerText = storyData.home;
    document.getElementById("pdf-partner").innerText = storyData.partner;

    const element = document.getElementById('pdf-template');
    element.style.display = 'block';
    const opt = { margin: 10, filename: 'Our_Story_Sonam.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(element).save().then(() => element.style.display = 'none');
}

// All your original UI functions
function startProcess() { document.getElementById("introSection").classList.add("hidden"); document.getElementById("mainContent").classList.remove("hidden"); showOnly("question1"); }
function showNext(num) { showOnly("question" + num); }
function showOnly(id) { document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden")); document.getElementById(id).classList.remove("hidden"); }
function yesReaction(next) { romanticBurst("💖"); setTimeout(() => showNext(next), 500); }
function celebrate() { romanticBurst("💘"); showOnly("celebration"); }
function goToMarriageForm() { showOnly("marriageFormSection"); }
function finalEnding() { showOnly("finalEnding"); }
function goToMedia() { showOnly("mediaSection"); }
function goToValentine() { showOnly("valentineSection"); }
function openMemory(imageSrc, message) { 
    const modal = document.getElementById("memoryModal");
    document.getElementById("modalImage").src = imageSrc;
    document.getElementById("modalMessage").innerText = message;
    modal.classList.remove("hidden");
}
function closeMemoryModal() { document.getElementById("memoryModal").classList.add("hidden"); }
function moveButton(btn) { btn.style.position = "fixed"; btn.style.left = Math.random() * 80 + "vw"; btn.style.top = Math.random() * 80 + "vh"; }
function createFloatingHearts() {
    const container = document.querySelector(".floating-elements");
    for (let i = 0; i < 20; i++) {
        const h = document.createElement("div"); h.className = "heart"; h.innerText = "💖";
        h.style.left = Math.random() * 100 + "vw"; h.style.animationDuration = (Math.random() * 3 + 3) + "s";
        container.appendChild(h);
    }
}
function romanticBurst(symbol) {
    for (let i = 0; i < 10; i++) {
        const el = document.createElement("div"); el.innerText = symbol; el.style.position = "fixed";
        el.style.left = Math.random() * 100 + "vw"; el.style.top = Math.random() * 100 + "vh";
        el.style.fontSize = "2rem"; el.animate([{ opacity: 1 }, { opacity: 0 }], 2000);
        document.body.appendChild(el); setTimeout(() => el.remove(), 2000);
    }
}