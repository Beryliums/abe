const treeSection = document.getElementById('tree-section');
const questionSection = document.getElementById('question-section');
const letterSection = document.getElementById('letter-section');
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const envBox = document.getElementById('env-box');

let noCount = 0;

// Klik Pohon -> Ganti ke Pertanyaan
treeSection.addEventListener('click', () => {
    treeSection.classList.add('hidden');
    questionSection.classList.remove('hidden');
});

// Tombol "TIDAK" Berpindah
const moveNoButton = () => {
    noCount++;
    if (noCount < 10) {
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
        btnNo.style.position = 'fixed';
        btnNo.style.left = x + 'px';
        btnNo.style.top = y + 'px';
        btnNo.style.transform = `scale(${1 - noCount * 0.1})`;
    } else {
        btnNo.style.display = 'none';
    }
};

btnNo.addEventListener('mouseover', moveNoButton);

// Klik "IYA" -> Animasi Buka Amplop -> Muncul Surat
btnYes.addEventListener('click', () => {
    envBox.classList.add('open');
    setTimeout(() => {
        questionSection.classList.add('hidden');
        letterSection.classList.remove('hidden');
        setInterval(createHeart, 300);
    }, 1000);
});

function createHeart() {
    const h = document.createElement('div');
    h.classList.add('heart-fall');
    h.innerHTML = '❤️';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    document.getElementById('falling-hearts-container').appendChild(h);
    setTimeout(() => h.remove(), 5000);
}
