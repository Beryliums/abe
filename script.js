/**
 * INSTRUKSI DEPLOY KE GITHUB PAGES:
 * 1. Buat repository baru di GitHub (misal: "valentine-untuk-annisa").
 * 2. Upload file index.html, style.css, dan script.js ke repo tersebut.
 * 3. Buka tab 'Settings' di repository GitHub kamu.
 * 4. Cari menu 'Pages' di sisi kiri.
 * 5. Di bawah 'Build and deployment', pilih branch 'main' dan klik 'Save'.
 * 6. Tunggu 1 menit, website kamu akan live di link yang disediakan GitHub!
 */

document.addEventListener('DOMContentLoaded', () => {
    const leavesContainer = document.getElementById('leaves-container');
    const treeContainer = document.getElementById('tree-container');
    const questionSection = document.getElementById('question-section');
    const letterSection = document.getElementById('letter-section');
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const fallingHeartsContainer = document.getElementById('falling-hearts');

    const emojis = ['❤️', '💕', '💋', '😘', '💖'];
    let noClickCount = 0;

 // 1. Generate Pohon Emoji (VERSI PERBAIKAN)
const totalEmojis = 40; // Lebih banyak agar lebih rimbun
for (let i = 0; i < totalEmojis; i++) {
    const leaf = document.createElement('span');
    leaf.classList.add('leaf');
    leaf.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Teknik distribusi polar agar membentuk lingkaran/daun pohon yang rapi
    const angle = Math.random() * Math.PI * 2; // Sudut acak 360 derajat
    const radius = Math.random() * 80; // Jarak sebaran dari pusat (atur ini untuk besar pohon)
    
    // Menghitung posisi X dan Y berdasarkan sudut dan radius
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Posisikan tepat di atas batang (mengimbangi letak leaves-container)
    leaf.style.left = `calc(50% + ${x}px)`;
    leaf.style.top = `calc(50% + ${y}px)`;
    
    // Efek ukuran acak agar lebih natural
    const size = Math.random() * (2.5 - 1.5) + 1.5;
    leaf.style.fontSize = `${size}rem`;
    
    // Animasi delay yang berbeda tiap daun agar gerakan ayunannya natural
    leaf.style.animationDelay = `${Math.random() * 2}s`;
    
    leavesContainer.appendChild(leaf);
}

    // 2. Klik Pohon -> Meledak & Muncul Amplop
    treeContainer.addEventListener('click', () => {
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 300 + Math.random() * 200;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;

            leaf.style.transition = 'all 1s ease-out';
            leaf.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            leaf.style.opacity = '0';
        });

        setTimeout(() => {
            treeContainer.classList.add('hidden');
            questionSection.classList.remove('hidden');
        }, 800);
    });

    // 3. Logika Tombol "TIDAK" Berpindah & Mengecil
    const moveButton = () => {
        noClickCount++;
        
        if (noClickCount >= 10) {
            btnNo.style.display = 'none';
            return;
        }

        // Hitung posisi acak
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);

        // Perkecil ukuran
        const scale = 1 - (noClickCount * 0.1);
        
        btnNo.style.position = 'fixed';
        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;
        btnNo.style.transform = `scale(${scale})`;
    };

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah klik di HP
        moveButton();
    });

    // 4. Klik Tombol "IYA"
    btnYes.addEventListener('click', () => {
        questionSection.classList.add('hidden');
        letterSection.classList.remove('hidden');
        createExplosion();
    });

    // 5. Animasi Hati Jatuh
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-fall');
        heart.innerText = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random();
        
        fallingHeartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Bonus: Efek ledakan hati saat klik IYA
    function createExplosion() {
        for(let i=0; i<50; i++) {
            createHeart();
        }
    }

});
