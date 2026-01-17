// State Management
let currentTheme = 'spring';
let currentLang = 'id';
let currentPage = 'home';
let animationEnabled = true;
let autoSeasonEnabled = false;
let hoverEnabled = true;
let animationItems = [];
let backgroundMedia = null;

// ========== DATE & TIME ==========
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const locale = currentLang === 'id' ? 'id-ID' : currentLang === 'en' ? 'en-US' : currentLang === 'jp' ? 'ja-JP' : currentLang === 'cn' ? 'zh-CN' : 'de-DE';
    const dateStr = now.toLocaleDateString(locale, options);
    const timeStr = now.toLocaleTimeString(locale, { hour12: false });
    
    document.getElementById('current-date').textContent = dateStr;
    document.getElementById('current-time').textContent = timeStr;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// ========== WELCOME NOTIFICATION ==========
function showWelcomeNotification() {
    const notif = document.getElementById('welcome-notification');
    setTimeout(() => {
        notif.classList.add('show');
    }, 500);
    
    setTimeout(() => {
        notif.classList.remove('show');
    }, 5000);
}

function closeWelcomeNotif() {
    document.getElementById('welcome-notification').classList.remove('show');
}

// Show welcome notification on page load
window.addEventListener('load', showWelcomeNotification);

// ========== CANVAS ANIMATION ==========
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = 1 + Math.random() * 2;
        this.size = 10 + Math.random() * 20;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.opacity = 0.6 + Math.random() * 0.4;
        this.drift = (Math.random() - 0.5) * 2;
    }

    update() {
        this.y += this.speed;
        this.x += this.drift;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) this.reset();
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        if (currentTheme === 'winter') {
            // Snowflake
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -this.size);
                ctx.rotate(Math.PI / 3);
            }
            ctx.fill();
        } else if (currentTheme === 'autumn') {
            // Maple Leaf
            ctx.fillStyle = '#ff6b35';
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size * 0.3, 0);
            ctx.lineTo(this.size * 0.5, this.size * 0.5);
            ctx.lineTo(0, this.size * 0.3);
            ctx.lineTo(-this.size * 0.5, this.size * 0.5);
            ctx.lineTo(-this.size * 0.3, 0);
            ctx.closePath();
            ctx.fill();
        } else if (currentTheme === 'spring') {
            // Sakura Petal
            ctx.fillStyle = '#ffb7c5';
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ff8fab';
            ctx.beginPath();
            ctx.arc(this.size * 0.2, 0, this.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
        } else if (currentTheme === 'summer') {
            // Clover Leaf
            ctx.fillStyle = '#4caf50';
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.arc(Math.cos(i * Math.PI / 2) * this.size * 0.3, 
                        Math.sin(i * Math.PI / 2) * this.size * 0.3, 
                        this.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();
    }
}

function initAnimation() {
    animationItems = [];
    for (let i = 0; i < 50; i++) {
        animationItems.push(new Particle());
    }
}

function animate() {
    if (animationEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationItems.forEach(item => {
            item.update();
            item.draw();
        });
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
}

initAnimation();
animate();

// ========== NAVIGATION ==========
function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (event && event.target) {
        const navLink = event.target.closest('.nav-link');
        if (navLink) navLink.classList.add('active');
    }
    loadPage(page);
    document.getElementById('sidebar').classList.remove('active');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleSettings() {
    const fab = document.querySelector('.settings-fab');
    const overlay = document.getElementById('settings-overlay');
    fab.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSettingsOverlay(event) {
    if (event.target === event.currentTarget) {
        toggleSettings();
    }
}

// ========== THEME FUNCTIONS ==========
function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme;
    document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
    event.target.closest('.theme-option').classList.add('active');
    initAnimation();
}

function toggleAutoSeason() {
    autoSeasonEnabled = !autoSeasonEnabled;
    document.getElementById('auto-season-toggle').classList.toggle('active');
    if (autoSeasonEnabled) {
        const month = new Date().getMonth() + 1;
        let season;
        if (month >= 3 && month <= 5) season = 'spring';
        else if (month >= 6 && month <= 8) season = 'summer';
        else if (month >= 9 && month <= 11) season = 'autumn';
        else season = 'winter';
        currentTheme = season;
        document.body.className = season;
        initAnimation();
    }
}

// ========== ANIMATION CONTROLS ==========
function toggleAnimation() {
    animationEnabled = !animationEnabled;
    document.getElementById('animation-toggle').classList.toggle('active');
}

function toggleHoverEffects() {
    hoverEnabled = !hoverEnabled;
    document.getElementById('hover-toggle').classList.toggle('active');
}

function toggleEmailNotifications() {
    document.getElementById('email-toggle').classList.toggle('active');
}

function togglePushNotifications() {
    document.getElementById('push-toggle').classList.toggle('active');
}

// ========== LANGUAGE FUNCTIONS ==========
function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
    event.target.closest('.language-option').classList.add('active');
    updateDateTime();
    loadPage(currentPage);
}

// ========== ACCOUNT SWITCH ==========
function switchAccount() {
    // Redirect ke halaman login atau account switch
    alert('Redirecting to Account Switch Page...\n\nAnda akan diarahkan ke halaman pemilihan akun.');
    // window.location.href = '/login.html'; // Uncomment untuk redirect
}

// ========== BACKGROUND CUSTOMIZATION ==========
function handleBackgroundImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setBackgroundMedia('image', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function handleBackgroundVideo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setBackgroundMedia('video', e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

function setBackgroundMedia(type, src) {
    const container = document.getElementById('background-media');
    const preview = document.getElementById('background-preview');
    const previewContent = document.getElementById('background-preview-content');
    
    container.innerHTML = '';
    
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        container.appendChild(img);
        
        previewContent.innerHTML = `<img src="${src}" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        container.appendChild(video);
        
        previewContent.innerHTML = `<video src="${src}" style="width: 100%; height: 100%; object-fit: cover;" muted loop autoplay></video>`;
    }
    
    preview.style.display = 'block';
    backgroundMedia = { type, src };
}

function removeBackground() {
    const container = document.getElementById('background-media');
    const preview = document.getElementById('background-preview');
    
    container.innerHTML = '';
    preview.style.display = 'none';
    backgroundMedia = null;
}

// ========== PAGE LOADING ==========
function loadPage(page) {
    const content = document.getElementById('main-content');
    const t = translations[currentLang][page];

    switch(page) {
        case 'home':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                    <p style="font-size: 14px; color: #999;">${t.subtitle2}</p>
                    <div class="header-buttons">
                        <button class="btn btn-primary">${t.exploreBtn}</button>
                        <button class="btn btn-secondary">${t.contactBtn}</button>
                    </div>
                </div>
                <div class="content-section">
                    <h2 class="section-title">${t.aboutTitle}</h2>
                    <p class="section-subtitle">${t.aboutText}</p>
                </div>
                <div class="content-section">
                    <h2 class="section-title">${t.updatesTitle}</h2>
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">🚀 ${t.update1}</h3>
                                <p class="card-description">StarFest 2025 collaboration with top creators</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">📅 ${t.update2}</h3>
                                <p class="card-description">Join our monthly community gathering</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">⭐ ${t.update3}</h3>
                                <p class="card-description">Welcome to our growing family!</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case 'profile':
            content.innerHTML = `
                <div class="page-header">
                    <div style="width: 120px; height: 120px; margin: 0 auto 20px; background: linear-gradient(135deg, #ff6b9d, #c44569); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 48px;">🏢</div>
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <h2 class="section-title">${t.personalInfoTitle}</h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">${t.nameLabel}</div>
                            <div class="info-value">${t.nameValue}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">${t.establishedLabel}</div>
                            <div class="info-value">${t.establishedValue}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">${t.locationLabel}</div>
                            <div class="info-value">${t.locationValue}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">${t.typeLabel}</div>
                            <div class="info-value">${t.typeValue}</div>
                        </div>
                    </div>
                </div>
                <div class="content-section">
                    <h2 class="section-title">${t.skillsTitle}</h2>
                    <div class="card-grid">
                        <div class="card"><div class="card-body"><h3 class="card-title">💻 ${t.skill1}</h3></div></div>
                        <div class="card"><div class="card-body"><h3 class="card-title">👥 ${t.skill2}</h3></div></div>
                        <div class="card"><div class="card-body"><h3 class="card-title">🎨 ${t.skill3}</h3></div></div>
                        <div class="card"><div class="card-body"><h3 class="card-title">🎉 ${t.skill4}</h3></div></div>
                    </div>
                </div>
            `;
            break;

        case 'creator':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${creatorsData.map(c => `
                            <a href="${c.link}" class="card">
                                <div class="card-image" style="background: linear-gradient(135deg, #ff6b9d, #c44569);">
                                    <span style="font-size: 72px;">${c.emoji}</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">${c.name}</h3>
                                    <p class="card-description">${c.role}</p>
                                    <div class="card-tags">
                                        <span class="tag">${c.specialty}</span>
                                    </div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'affiliation':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${affiliationsData.map(a => `
                            <div class="card">
                                <div class="card-image" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                                    <span style="font-size: 72px;">${a.emoji}</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">${a.name}</h3>
                                    <p class="card-description">${a.desc}</p>
                                    <div class="card-tags">
                                        <span class="tag">${a.type}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'project':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${projectsData.map(p => `
                            <div class="card">
                                <div class="card-image">
                                    <span style="font-size: 72px;">${p.emoji}</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">${p.title}</h3>
                                    <p class="card-description">${p.desc}</p>
                                    <p style="color: #999; font-size: 14px; margin-bottom: 10px;">${t.by}: ${p.creators}</p>
                                    <div class="card-tags">
                                        ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'gallery':
            const galleryEmojis = ['📸', '🎥', '🎭', '🎪', '🎨', '🎬'];
            const galleryColors = ['#ff6b9d', '#667eea', '#4caf50', '#ff9800', '#2196f3', '#9c27b0'];
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${galleryEmojis.map((emoji, i) => `
                            <div class="card">
                                <div class="card-image" style="background: linear-gradient(135deg, ${galleryColors[i]}, ${galleryColors[i]}cc);">
                                    <span style="font-size: 72px;">${emoji}</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">Event ${i + 1}</h3>
                                    <p class="card-description">Documentation from our activities</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'store':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${productsData.map(p => `
                            <div class="card">
                                <div class="card-image" style="background: linear-gradient(135deg, #e0e0e0, #bdbdbd);">
                                    ${p.tag ? `<div class="card-tag">${p.tag}</div>` : ''}
                                    <span style="font-size: 72px;">${p.emoji}</span>
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">${p.name}</h3>
                                    <p class="card-description" style="color: #c44569; font-weight: bold; font-size: 18px;">${p.price}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'social':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${socialMediaData.map(s => `
                            <a href="#" class="social-card" style="background: ${s.color};">
                                <div class="social-icon-large">${s.icon}</div>
                                <div class="social-info">
                                    <h3>${s.name}</h3>
                                    <p>${s.desc}</p>
                                    <div class="social-handle">${s.handle}</div>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
    }
}

// Initialize
loadPage('home');
