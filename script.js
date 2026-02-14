document.addEventListener('DOMContentLoaded', () => {
    // Definisi Elemen
    const bigHeart = document.getElementById('big-heart');
    const treeContainer = document.getElementById('tree-container');
    const questionSection = document.getElementById('question-section');
    const letterSection = document.getElementById('letter-section');
    const envelope = document.querySelector('.envelope');
    
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const fallingHeartsContainer = document.getElementById('falling-hearts');

    let noClickCount = 0;

    // --- 1. LOGIKA KLIK POHON HATI ---
    if (bigHeart) {
        bigHeart.addEventListener('click', () => {
            // Efek ledakan saat hati diklik
            bigHeart.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            bigHeart.style.transform = 'scale(10)';
            bigHeart.style.opacity = '0';
            
            // Sembunyikan pohon, munculkan bagian pertanyaan & amplop
            setTimeout(() => {
                treeContainer.style.display = 'none';
                questionSection.classList.remove('hidden');
                // Scroll ke tengah otomatis untuk kenyamanan mobile
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 500);
        });
    }

    // --- 2. LOGIKA TOMBOL "TIDAK" (MENGHINDAR) ---
    const moveButton = () => {
        noClickCount++;
        
        // Jika sudah 10 kali mencoba, tombol menghilang
        if (noClickCount >= 10) {
            btnNo.style.display = 'none';
            return;
        }

        // Hitung posisi acak agar tidak keluar layar
        const maxX = window.innerWidth - btnNo.offsetWidth;
        const maxY = window.innerHeight - btnNo.offsetHeight;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Terapkan posisi baru dan perkecil ukuran tombol
        btnNo.style.position = 'fixed';
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
        
        const currentScale = 1 - (noClickCount * 0.1);
        btnNo.style.transform = `scale(${currentScale})`;
    };

    // Deteksi kursor mendekat (Desktop) dan sentuhan (Mobile)
    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah klik tidak sengaja di mobile
        moveButton();
    });

    // --- 3. LOGIKA KLIK TOMBOL "IYA" (BUKA AMPLOP) ---
    btnYes.addEventListener('click', () => {
        // Tambahkan class 'open' untuk memicu animasi CSS pada amplop
        if (envelope) {
            envelope.classList.add('open');
        }

        // Beri jeda 1.5 detik agar animasi amplop terbuka terlihat dulu
        setTimeout(() => {
            questionSection.classList.add('hidden');
            letterSection.classList.remove('hidden');
            
            // Mulai hujan hati terus menerus
            setInterval(createFallingHeart, 300);
        }, 1500);
    });

    // --- 4. FUNGSIONALITAS HUJAN HATI ---
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-fall');
        
        // Pilih emoji hati secara acak
        const heartTypes = ['❤️', '💖', '💕', '💗', '🌸'];
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        // Atur posisi dan kecepatan jatuh acak
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.position = 'fixed';
        heart.style.top = '-20px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.zIndex = '1000';
        
        // Durasi jatuh antara 3 sampai 6 detik
        const duration = Math.random() * 3 + 3;
        heart.style.animation = `fall ${duration}s linear forwards`;
        
        fallingHeartsContainer.appendChild(heart);

        // Hapus elemen setelah jatuh agar tidak memberatkan browser
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
});

/**
 * TIPS UNTUK ABE:
 * Agar website ini makin romantis, kamu bisa menambahkan file musik 
 * dan memainkannya di dalam fungsi btnYes.addEventListener menggunakan:
 * let audio = new Audio('lagu-romantis.mp3');
 * audio.play();
 */
