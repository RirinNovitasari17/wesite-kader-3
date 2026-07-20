// ── Navbar scroll ──
const nav = document.getElementById('navbar');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
    nav.classList.toggle('s', window.scrollY > 50);
    btt.classList.toggle('on', window.scrollY > 300);
    hilite();
});
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Hamburger ──
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
});
document.querySelectorAll('.nav-a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); links.classList.remove('open');
}));

// ── Active nav ──
function hilite() {
    const y = window.scrollY + 120;
    document.querySelectorAll('section[id]').forEach(s => {
        const a = document.querySelector(`.nav-a[href="#${s.id}"]`);
        if (!a) return;
        a.classList.toggle('on', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
    });
}

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
}));

// ── Typed text ──
const words = ['Content Creator', 'Creative Thinker', 'Brand Builder', 'Problem Solver', 'Konsisten & Berdedikasi'];
let wi = 0, ci = 0, del = false, sp = 100;
const el = document.getElementById('typedTxt');
function tick() {
    const w = words[wi];
    el.textContent = del ? w.slice(0, ci - 1) : w.slice(0, ci + 1);
    del ? ci-- : ci++;
    sp = del ? 50 : 110;
    if (!del && ci === w.length) { sp = 2400; del = true; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; sp = 500; }
    setTimeout(tick, sp);
}
setTimeout(tick, 1000);

// ── Hero counters ──
const cobs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.hstat-n').forEach(n => {
        const t = +n.dataset.t, s = t / (2000 / 16); let c = 0;
        const iv = setInterval(() => { c += s; if (c >= t) { c = t; clearInterval(iv); } n.textContent = Math.floor(c) + '+'; }, 16);
    });
    cobs.unobserve(e.target);
}), { threshold: .5 });
const hs = document.querySelector('.hero-stats');
if (hs) cobs.observe(hs);

// ── Skill bars ──
function animBars() {
    document.querySelectorAll('.sk-bar[data-w]').forEach(b => {
        const f = b.querySelector('.sk-fill');
        if (f) f.style.width = b.dataset.w + '%';
    });
}
const skObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { animBars(); skObs.unobserve(e.target); }
}), { threshold: .2 });
const sg = document.querySelector('#skills');
if (sg) skObs.observe(sg);

// ── Habit bars ──
const hObs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.h-fill').forEach(f => {
        const w = f.dataset.w; f.style.width = '0';
        setTimeout(() => f.style.width = w + '%', 100);
    });
    hObs.unobserve(e.target);
}), { threshold: .3 });
const hw = document.querySelector('.habit-wrap');
if (hw) hObs.observe(hw);

// ── Tabs ──
document.querySelectorAll('.tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('on'));
        document.querySelectorAll('.pane').forEach(p => p.classList.remove('on'));
        btn.classList.add('on');
        const p = document.getElementById('tp-' + btn.dataset.tp);
        if (p) { p.classList.add('on'); if (btn.dataset.tp === 'hard') setTimeout(animBars, 80); }
    });
});

// ── Timeline ──
const tObs = new IntersectionObserver(es => es.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('vis'), i * 120); tObs.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.tl-item').forEach(t => tObs.observe(t));

// ── Reveal on scroll ──
function initReveal() {
    const rObs = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('r'); rObs.unobserve(e.target); }
    }), { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => rObs.observe(el));
    // hero always visible
    document.querySelectorAll('.hero .reveal-l, .hero .reveal-r').forEach(el => el.classList.add('r'));
}

// ── Contact form ──
function doSend(e) {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const lang = document.documentElement.lang || 'id';
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${lang === 'en' ? 'Sending...' : 'Mengirim...'}`;
    btn.disabled = true;
    setTimeout(() => {
        document.getElementById('cForm').style.display = 'none';
        document.getElementById('fOk').style.display = 'block';
    }, 1500);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', initReveal);
window.addEventListener('load', () => { initReveal(); animBars(); });

// ── Music ──
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            musicBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
        }
        isPlaying = !isPlaying;
    });
}

// ── Translations (i18n) ──
const translations = {
    id: {
        // Meta
        'page-title': 'Ririn Novitasari — Portofolio',
        // Navbar
        'nav-home': 'Beranda',
        'nav-about': 'Tentang',
        'nav-skills': 'Keahlian',
        'nav-exp': 'Pengalaman',
        'nav-prj': 'Proyek',
        'nav-ct': 'Kontak',
        // Hero
        'hero-greet': 'Halo.',
        'hero-sub': 'Saya',
        'hero-p': 'Individu yang berdedikasi, kreatif, dan konsisten dalam setiap langkah perjalanan profesional. Saya percaya bahwa kualitas lahir dari komitmen yang tidak pernah goyah.',
        'hero-btn-about': 'Kenali Saya',
        'hero-btn-contact': 'Hubungi',
        'hero-stat-years': 'Tahun Perjalanan',
        'hero-stat-projects': 'Proyek Selesai',
        'hero-stat-skills': 'Keahlian Utama',
        'hero-chip-1': 'Kreatif & Inovatif',
        'hero-chip-2': 'Konsisten & Berdedikasi',
        'hero-scroll': 'Scroll',
        // About
        'about-eyebrow': 'Tentang Saya',
        'about-label': 'Profil Singkat',
        'about-title-role': 'Mahasiswa Aktif & Profesional Kreatif',
        'about-p1': 'Saya adalah individu yang penuh semangat dan selalu haus akan pengembangan diri. Dengan latar belakang yang kuat dalam dunia kreatif dan akademis, saya berkomitmen untuk memberikan hasil terbaik dalam setiap hal yang saya kerjakan.',
        'about-p2': 'Konsistensi adalah nilai utama saya. Setiap pengalaman menjadi batu loncatan menuju versi diri yang lebih baik — tidak hanya secara kompetensi, tetapi juga karakter dan personal branding yang autentik.',
        'about-info-name': 'Nama',
        'about-info-status-label': 'Status',
        'about-info-status-val': 'Mahasiswa Aktif',
        'about-info-domicile': 'Domisili',
        'about-info-language': 'Bahasa',
        'about-info-language-val': 'Indonesia & Inggris',
        'about-btn-collab': 'Mari Berkolaborasi',
        'about-avail': 'Open to Opportunities',
        // Skills
        'skills-eyebrow': 'Kemampuan',
        'skills-title': 'Keahlian & Kompetensi',
        'skills-sub': 'Kumpulan kemampuan yang terus diasah dan dikembangkan setiap hari',
        // Hard Skills
        'sk-content-writing': 'Penulisan Konten',
        'sk-content-writing-dc': 'Konten yang menarik, informatif, dan SEO-friendly untuk berbagai platform digital.',
        'sk-graphic-design': 'Desain Grafis',
        'sk-graphic-design-dc': 'Visual yang estetis dan profesional untuk kebutuhan branding dan media sosial.',
        'sk-sosmed': 'Manajemen Media Sosial',
        'sk-sosmed-dc': 'Mengelola akun media sosial dengan strategi konten yang terencana dan konsisten.',
        'sk-presentation': 'Presentasi Publik',
        'sk-presentation-dc': 'Menyampaikan ide secara sistematis, percaya diri, dan menarik di hadapan audiens.',
        'sk-research': 'Riset & Analisis',
        'sk-research-dc': 'Riset mendalam dan analisis data untuk mendukung pengambilan keputusan yang tepat.',
        'sk-event': 'Event Organizing',
        'sk-event-dc': 'Merencanakan dan mengelola acara dari konsep hingga eksekusi secara profesional.',
        // Soft Skills
        'ss-communication': 'Komunikasi',
        'ss-communication-dc': 'Menyampaikan pesan dengan jelas, empati, dan efektif',
        'ss-teamwork': 'Kerja Tim',
        'ss-teamwork-dc': 'Berkolaborasi harmonis untuk mencapai tujuan bersama',
        'ss-leadership': 'Kepemimpinan',
        'ss-leadership-dc': 'Memimpin dan memotivasi tim dengan integritas dan visi',
        'ss-adaptability': 'Adaptabilitas',
        'ss-adaptability-dc': 'Fleksibel dan cepat beradaptasi dengan perubahan situasi',
        'ss-problemsolving': 'Problem Solving',
        'ss-problemsolving-dc': 'Berpikir kritis dan kreatif dalam menyelesaikan masalah',
        'ss-timemanagement': 'Manajemen Waktu',
        'ss-timemanagement-dc': 'Mengatur prioritas dan memenuhi deadline secara konsisten',
        // Experience
        'exp-eyebrow': 'Pengalaman',
        'exp-title': 'Jejak Perjalanan',
        'exp-sub': 'Setiap pengalaman adalah pelajaran yang membentuk karakter diri',
        'exp-badge-academic': 'Akademik',
        'exp-academic-period': '2022 – Sekarang',
        'exp-academic-title': 'Mahasiswa Aktif',
        'exp-academic-place': 'Universitas / Perguruan Tinggi',
        'exp-academic-p': 'Menjalani perkuliahan dengan penuh semangat dan aktif terlibat dalam berbagai kegiatan akademik. Mempertahankan prestasi sambil mengembangkan soft skill melalui kegiatan kemahasiswaan yang beragam.',
        'exp-tag-academic': 'Akademik',
        'exp-tag-leadership': 'Kepemimpinan',
        'exp-tag-org': 'Organisasi',
        'exp-badge-org': 'Organisasi',
        'exp-org-title': 'Pengurus Organisasi Kemahasiswaan',
        'exp-org-place': 'Himpunan Mahasiswa / BEM',
        'exp-org-p': 'Aktif sebagai pengurus dan bertanggung jawab dalam perencanaan serta pelaksanaan berbagai program kerja yang memberikan dampak nyata bagi civitas akademika.',
        'exp-tag-management': 'Manajemen',
        'exp-badge-intern': 'Magang',
        'exp-intern-title': 'Intern / Magang Profesional',
        'exp-intern-place': 'Lembaga / Perusahaan',
        'exp-intern-p': 'Mendapatkan pengalaman kerja nyata di lingkungan profesional. Terlibat langsung dalam proyek-proyek yang mengasah kemampuan teknis dan interpersonal.',
        'exp-tag-professional': 'Profesional',
        'exp-tag-networking': 'Networking',
        'exp-badge-achievement': 'Prestasi',
        'exp-achievement-title': 'Partisipan Kompetisi & Lomba',
        'exp-achievement-place': 'Tingkat Regional / Nasional',
        'exp-achievement-p': 'Berpartisipasi dalam berbagai kompetisi akademik dan non-akademik yang melatih mentalitas kompetitif, kemampuan strategis, dan ketangguhan menghadapi tekanan.',
        'exp-tag-competition': 'Kompetisi',
        'exp-tag-achievement': 'Prestasi',
        'exp-tag-strategy': 'Strategi',
        'exp-badge-volunteer': 'Volunteer',
        'exp-volunteer-period': '2022 – Sekarang',
        'exp-volunteer-title': 'Kegiatan Sosial & Relawan',
        'exp-volunteer-place': 'Komunitas & LSM',
        'exp-volunteer-p': 'Aktif terlibat dalam kegiatan sosial yang memberikan dampak positif bagi masyarakat, memperkaya perspektif, dan membangun kepekaan sosial.',
        'exp-tag-social': 'Sosial',
        'exp-tag-empathy': 'Empati',
        'exp-tag-impact': 'Dampak Positif',
        // Projects
        'prj-eyebrow': 'Proyek Terpilih',
        'prj-title': 'Karya & Pencapaian',
        'prj-sub': 'Beberapa karya dan proyek terbaik yang pernah saya tangani, dari konsep hingga eksekusi nyata.',
        'prj-1-title': 'Kampanye Media Sosial Berkelanjutan',
        'prj-1-p': 'Merancang dan mengeksekusi kampanye digital end-to-end yang berhasil meningkatkan brand awareness dan engagement klien. Mulai dari riset audiens, pembuatan kalender konten, hingga analisis performa.',
        'prj-2-title': 'Manajemen Konten Blog & Artikel',
        'prj-2-p': 'Menulis puluhan artikel SEO-friendly yang informatif dan edukatif, membantu klien mendapatkan trafik organik yang stabil setiap bulan.',
        'prj-3-title': 'Visual Identity & Rebranding Bisnis',
        'prj-3-p': 'Berkolaborasi membantu merancang ulang identitas visual UMKM lokal agar tampil lebih modern, menarik, dan sesuai dengan target pasar masa kini.',
        'prj-3-tag': 'Desain Grafis',
        'prj-4-title': 'Produksi Konten Video Pendek (Reels/TikTok)',
        'prj-4-p': 'Mengonsep, mengarahkan, dan mengedit video pendek kreatif yang sukses viral dan mencapai puluhan ribu tayangan organik secara konsisten.',
        'prj-5-title': 'Event Organizing Kemahasiswaan',
        'prj-5-p': 'Menjadi ketua pelaksana seminar nasional dengan 500+ peserta. Mengatur dari awal konsep, sponsorship, hingga pelaksanaan hari-H dengan lancar.',
        'prj-5-tag': 'Manajemen Event',
        // Contact
        'ct-eyebrow': 'Kontak',
        'ct-title': 'Mari Terhubung',
        'ct-sub': 'Terbuka untuk kolaborasi, diskusi, dan peluang proyek baru yang menarik',
        'ct-heading': 'Hubungi Saya',
        'ct-p': 'Tertarik berkolaborasi atau sekadar berdiskusi? Saya senang mendengar dari Anda.',
        'form-name-label': 'Nama Lengkap',
        'form-name-ph': 'Nama Anda',
        'form-email-label': 'Email',
        'form-email-ph': 'email@contoh.com',
        'form-subject-label': 'Subjek',
        'form-subject-ph': 'Topik pesan Anda',
        'form-message-label': 'Pesan',
        'form-message-ph': 'Tulis pesan Anda di sini...',
        'form-send-btn': 'Kirim Pesan',
        'form-success-title': 'Pesan Terkirim!',
        'form-success-p': 'Terima kasih. Saya akan segera membalas pesan Anda.',
        // Footer
        'footer-home': 'Beranda',
        'footer-about': 'Tentang',
        'footer-skills': 'Keahlian',
        'footer-exp': 'Pengalaman',
        'footer-prj': 'Proyek',
        'footer-ct': 'Kontak',
        'footer-copy': '© 2025 Ririn Novitasari — Portofolio Pribadi',
    },
    en: {
        // Meta
        'page-title': 'Ririn Novitasari — Portfolio',
        // Navbar
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-exp': 'Experience',
        'nav-prj': 'Projects',
        'nav-ct': 'Contact',
        // Hero
        'hero-greet': 'Hello.',
        'hero-sub': "I'm",
        'hero-p': 'A dedicated, creative, and consistent individual in every step of the professional journey. I believe that quality is born from an unwavering commitment.',
        'hero-btn-about': 'Know Me',
        'hero-btn-contact': 'Contact',
        'hero-stat-years': 'Years Journey',
        'hero-stat-projects': 'Projects Done',
        'hero-stat-skills': 'Core Skills',
        'hero-chip-1': 'Creative & Innovative',
        'hero-chip-2': 'Consistent & Dedicated',
        'hero-scroll': 'Scroll',
        // About
        'about-eyebrow': 'About Me',
        'about-label': 'Brief Profile',
        'about-title-role': 'Active Student & Creative Professional',
        'about-p1': 'I am an enthusiastic individual who is always eager for self-development. With a strong background in the creative and academic world, I am committed to delivering the best results in everything I do.',
        'about-p2': 'Consistency is my core value. Every experience becomes a stepping stone toward a better version of myself — not only in terms of competence, but also character and authentic personal branding.',
        'about-info-name': 'Name',
        'about-info-status-label': 'Status',
        'about-info-status-val': 'Active Student',
        'about-info-domicile': 'Domicile',
        'about-info-language': 'Language',
        'about-info-language-val': 'Indonesian & English',
        'about-btn-collab': "Let's Collaborate",
        'about-avail': 'Open to Opportunities',
        // Skills
        'skills-eyebrow': 'Abilities',
        'skills-title': 'Skills & Competencies',
        'skills-sub': 'A collection of abilities constantly honed and developed every day',
        // Hard Skills
        'sk-content-writing': 'Content Writing',
        'sk-content-writing-dc': 'Engaging, informative, and SEO-friendly content for various digital platforms.',
        'sk-graphic-design': 'Graphic Design',
        'sk-graphic-design-dc': 'Aesthetic and professional visuals for branding and social media needs.',
        'sk-sosmed': 'Social Media Management',
        'sk-sosmed-dc': 'Managing social media accounts with a planned and consistent content strategy.',
        'sk-presentation': 'Public Presentation',
        'sk-presentation-dc': 'Delivering ideas systematically, confidently, and engagingly in front of an audience.',
        'sk-research': 'Research & Analysis',
        'sk-research-dc': 'In-depth research and data analysis to support accurate decision-making.',
        'sk-event': 'Event Organizing',
        'sk-event-dc': 'Planning and managing events from concept to professional execution.',
        // Soft Skills
        'ss-communication': 'Communication',
        'ss-communication-dc': 'Delivering messages clearly, empathetically, and effectively',
        'ss-teamwork': 'Teamwork',
        'ss-teamwork-dc': 'Collaborating harmoniously to achieve shared goals',
        'ss-leadership': 'Leadership',
        'ss-leadership-dc': 'Leading and motivating teams with integrity and vision',
        'ss-adaptability': 'Adaptability',
        'ss-adaptability-dc': 'Flexible and quick to adapt to changing situations',
        'ss-problemsolving': 'Problem Solving',
        'ss-problemsolving-dc': 'Thinking critically and creatively to solve problems',
        'ss-timemanagement': 'Time Management',
        'ss-timemanagement-dc': 'Setting priorities and meeting deadlines consistently',
        // Experience
        'exp-eyebrow': 'Experience',
        'exp-title': 'Journey Milestones',
        'exp-sub': 'Every experience is a lesson that shapes character',
        'exp-badge-academic': 'Academic',
        'exp-academic-period': '2022 – Present',
        'exp-academic-title': 'Active Student',
        'exp-academic-place': 'University / Higher Education',
        'exp-academic-p': 'Pursuing studies with great enthusiasm and actively involved in various academic activities. Maintaining achievements while developing soft skills through diverse campus activities.',
        'exp-tag-academic': 'Academic',
        'exp-tag-leadership': 'Leadership',
        'exp-tag-org': 'Organization',
        'exp-badge-org': 'Organization',
        'exp-org-title': 'Student Organization Board Member',
        'exp-org-place': 'Student Association / BEM',
        'exp-org-p': 'Active as a board member responsible for planning and executing various work programs that have a real impact on the academic community.',
        'exp-tag-management': 'Management',
        'exp-badge-intern': 'Internship',
        'exp-intern-title': 'Professional Intern',
        'exp-intern-place': 'Institution / Company',
        'exp-intern-p': 'Gained real work experience in a professional environment. Directly involved in projects that honed technical and interpersonal skills.',
        'exp-tag-professional': 'Professional',
        'exp-tag-networking': 'Networking',
        'exp-badge-achievement': 'Achievement',
        'exp-achievement-title': 'Competition & Contest Participant',
        'exp-achievement-place': 'Regional / National Level',
        'exp-achievement-p': 'Participated in various academic and non-academic competitions that trained a competitive mindset, strategic abilities, and resilience under pressure.',
        'exp-tag-competition': 'Competition',
        'exp-tag-achievement': 'Achievement',
        'exp-tag-strategy': 'Strategy',
        'exp-badge-volunteer': 'Volunteer',
        'exp-volunteer-period': '2022 – Present',
        'exp-volunteer-title': 'Social Activities & Volunteering',
        'exp-volunteer-place': 'Community & NGO',
        'exp-volunteer-p': 'Actively involved in social activities that provide a positive impact on society, enrich perspectives, and build social awareness.',
        'exp-tag-social': 'Social',
        'exp-tag-empathy': 'Empathy',
        'exp-tag-impact': 'Positive Impact',
        // Projects
        'prj-eyebrow': 'Selected Projects',
        'prj-title': 'Works & Achievements',
        'prj-sub': 'Some of the best works and projects I have handled, from concept to real execution.',
        'prj-1-title': 'Sustainable Social Media Campaign',
        'prj-1-p': 'Designed and executed an end-to-end digital campaign that successfully increased client brand awareness and engagement. From audience research, content calendar creation, to performance analysis.',
        'prj-2-title': 'Blog & Article Content Management',
        'prj-2-p': 'Wrote dozens of informative and educational SEO-friendly articles, helping clients get stable organic traffic every month.',
        'prj-3-title': 'Visual Identity & Business Rebranding',
        'prj-3-p': 'Collaborated to help redesign the visual identity of local SMEs to appear more modern, attractive, and aligned with today\'s target market.',
        'prj-3-tag': 'Graphic Design',
        'prj-4-title': 'Short Video Content Production (Reels/TikTok)',
        'prj-4-p': 'Conceptualized, directed, and edited creative short videos that went viral and consistently reached tens of thousands of organic views.',
        'prj-5-title': 'Student Event Organizing',
        'prj-5-p': 'Led a national seminar with 500+ participants. Managed from the initial concept, sponsorship, to the smooth execution of the event day.',
        'prj-5-tag': 'Event Management',
        // Contact
        'ct-eyebrow': 'Contact',
        'ct-title': "Let's Connect",
        'ct-sub': 'Open for collaborations, discussions, and exciting new project opportunities',
        'ct-heading': 'Get in Touch',
        'ct-p': 'Interested in collaborating or just having a chat? I\'d love to hear from you.',
        'form-name-label': 'Full Name',
        'form-name-ph': 'Your Name',
        'form-email-label': 'Email',
        'form-email-ph': 'email@example.com',
        'form-subject-label': 'Subject',
        'form-subject-ph': 'Your message topic',
        'form-message-label': 'Message',
        'form-message-ph': 'Write your message here...',
        'form-send-btn': 'Send Message',
        'form-success-title': 'Message Sent!',
        'form-success-p': 'Thank you. I will reply to your message shortly.',
        // Footer
        'footer-home': 'Home',
        'footer-about': 'About',
        'footer-skills': 'Skills',
        'footer-exp': 'Experience',
        'footer-prj': 'Projects',
        'footer-ct': 'Contact',
        'footer-copy': '© 2025 Ririn Novitasari — Personal Portfolio',
    }
};

// Apply translations to the page
function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;

    return; // Menonaktifkan penimpaan teks terjemahan

    // Update page title
    document.title = t['page-title'];

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute (text content)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    // Update all elements with data-i18n-html attribute (innerHTML, for elements with icons)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) {
            // Preserve icons inside buttons
            const icon = el.querySelector('i');
            el.textContent = t[key];
            if (icon) el.appendChild(icon);
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update typed words based on language
    if (lang === 'en') {
        words.splice(0, words.length, 'Content Creator', 'Creative Thinker', 'Brand Builder', 'Problem Solver', 'Consistent & Dedicated');
    } else {
        words.splice(0, words.length, 'Content Creator', 'Creative Thinker', 'Brand Builder', 'Problem Solver', 'Konsisten & Berdedikasi');
    }
}

// ── Language Toggle ──
const langBtn = document.getElementById('langBtn');
let currentLang = 'id';

if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        langBtn.textContent = currentLang === 'id' ? 'ID' : 'EN';
        applyLang(currentLang);
    });
}

// Init language on load
applyLang('id');
