document.addEventListener('DOMContentLoaded', () => {
    const leavesContainer = document.getElementById('leaves-container');
    const treeContainer = document.getElementById('tree-container');
    const questionSection = document.getElementById('question-section');
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const letterSection = document.getElementById('letter-section');
    const fallingHeartsContainer = document.getElementById('falling-hearts');

    const emojis = ['❤️', '💕', '💋', '😘', '💖'];
    let noClickCount = 0;

    // 1. Generate Pohon Bentuk HATI (Versi Matematika Romantis)
    const totalEmojis = 60; // Lebih rimbun
    for (let i = 0; i < totalEmojis; i++) {
        const leaf = document.createElement('span');
        leaf.classList.add('leaf');
        leaf.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Rumus Matematika membentuk Hati (Heart Shape)
        const t = Math.random() * 2 * Math.PI;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        // Atur skala penyebaran
        const scale = 6; 
        
        // Posisikan
        leaf.style.left = `calc(50% + ${x * scale}px)`;
        leaf.style.top = `calc(40% + ${y * scale}px)`;
        
        // Variasi ukuran & animasi
        leaf.style.fontSize = `${Math.random() * (2 - 1) + 1}rem`;
        leaf.style.animationDelay = `${Math.random() * 2}s`;
        
        leavesContainer.appendChild(leaf);
    }

    // 2. Klik Pohon Meledak
    treeContainer.addEventListener('click', () => {
        document.querySelectorAll('.leaf').forEach(leaf => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 500;
            leaf.style.transition = 'all 1s ease-out';
            leaf.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`;
            leaf.style.opacity = '0';
        });

        setTimeout(() => {
            treeContainer.style.display = 'none';
            questionSection.classList.remove('hidden');
        }, 800);
    });

    // 3. Tombol TIDAK yang Nakal
    const moveButton = () => {
        noClickCount++;
        if (noClickCount >= 10) {
            btnNo.style.display = 'none';
            return;
        }
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        btnNo.style.position = 'fixed';
        btnNo.style.left = x + 'px';
        btnNo.style.top = y + 'px';
        btnNo.style.transform = `scale(${1 - (noClickCount * 0.1)})`;
    };

    btnNo.addEventListener('mouseover', moveButton);

    // 4. Klik IYA
    btnYes.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        letterSection.classList.remove('hidden');
        setInterval(createHeart, 200);
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-fall');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.position = 'fixed';
        heart.style.top = '-20px';
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        fallingHeartsContainer.appendChild(heart);
    }
});
