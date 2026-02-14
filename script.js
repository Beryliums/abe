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

    // 1. Generate Pohon Bentuk HATI RINDANG (Mengisi Tengah)
    const totalEmojis = 100; // Jumlah banyak agar sangat rindang
    for (let i = 0; i < totalEmojis; i++) {
        const leaf = document.createElement('span');
        leaf.classList.add('leaf');
        leaf.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Rumus Heart Shape
        const t = Math.random() * 2 * Math.PI;
        // Faktor "r" acak antara 0 sampai 1 untuk mengisi bagian dalam (tengah) hati
        const r = Math.sqrt(Math.random()); 
        
        const x = r * 16 * Math.pow(Math.sin(t), 3);
        const y = -r * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        // Skala besar pohon
        const scale = 7; 
        
        leaf.style.left = `calc(50% + ${x * scale}px)`;
        leaf.style.top = `calc(45% + ${y * scale}px)`; // Disesuaikan agar pas di atas batang
        
        // Ukuran acak
        const size = Math.random() * (1.8 - 0.8) + 0.8;
        leaf.style.fontSize = `${size}rem`;
        
        // Delay animasi agar gerakan ayunannya natural
        leaf.style.animationDelay = `${Math.random() * 3}s`;
        
        leavesContainer.appendChild(leaf);
    }

    // 2. Klik Pohon Meledak & Muncul Pertanyaan
    treeContainer.addEventListener('click', () => {
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach(leaf => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 600;
            leaf.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            leaf.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0) rotate(360deg)`;
            leaf.style.opacity = '0';
        });

        setTimeout(() => {
            treeContainer.style.display = 'none';
            questionSection.classList.remove('hidden');
        }, 1000);
    });

    // 3. Logika Tombol "TIDAK" (Lari dan Mengecil)
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
    btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

    // 4. Klik Tombol "IYA"
    btnYes.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        letterSection.classList.remove('hidden');
        setInterval(createHeart, 250); // Hujan hati dimulai
    });

    // 5. Fungsi Hujan Hati
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
