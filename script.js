document.addEventListener('DOMContentLoaded', () => {
    const bigHeart = document.getElementById('big-heart');
    const treeContainer = document.getElementById('tree-container');
    const questionSection = document.getElementById('question-section');
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const letterSection = document.getElementById('letter-section');
    const fallingHeartsContainer = document.getElementById('falling-hearts');

    let noClickCount = 0;

    // 1. Klik Hati Besar -> Meledak & Muncul Pertanyaan
    bigHeart.addEventListener('click', () => {
        // Efek ledakan hati saat menghilang
        bigHeart.style.transition = 'all 0.5s ease';
        bigHeart.style.transform = 'scale(5)';
        bigHeart.style.opacity = '0';
        
        setTimeout(() => {
            treeContainer.style.display = 'none';
            questionSection.classList.remove('hidden');
        }, 500);
    });

    // 2. Tombol TIDAK (Mengecil & Menghilang)
    const moveButton = () => {
        noClickCount++;
        if (noClickCount >= 10) {
            btnNo.style.display = 'none';
            return;
        }
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
        btnNo.style.position = 'fixed';
        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;
        btnNo.style.transform = `scale(${1 - (noClickCount * 0.1)})`;
    };

    btnNo.addEventListener('mouseover', moveButton);

    // 3. Klik Tombol IYA -> Buka Surat
    btnYes.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        letterSection.classList.remove('hidden');
        setInterval(createHeart, 300); // Mulai hujan hati
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-fall');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.position = 'fixed';
        heart.style.top = '-20px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        fallingHeartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }
});
