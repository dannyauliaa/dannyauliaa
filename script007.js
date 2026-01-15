// State Management
let currentTheme = 'spring';
let currentLang = 'id';
let currentPage = 'home';
let animationEnabled = true;
let autoSeasonEnabled = false;
let hoverEnabled = true;
let animationItems = [];
let backgroundMedia = null;

// Date and Time Update
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString(currentLang === 'id' ? 'id-ID' : currentLang === 'en' ? 'en-US' : currentLang === 'jp' ? 'ja-JP' : currentLang === 'cn' ? 'zh-CN' : 'de-DE', options);
    const timeStr = now.toLocaleTimeString(currentLang === 'id' ? 'id-ID' : 'en-US', { hour12: false });
    
    document.getElementById('current-date').textContent = dateStr;
    document.getElementById('current-time').textContent = timeStr;
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Canvas Setup
const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle Class for Animation
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

// Navigation Functions
function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.closest('.nav-link').classList.add('active');
    loadPage(page);
    // Close sidebar after navigation
    document.getElementById('sidebar').classList.remove('active');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function toggleSettings() {
    const fab = document.querySelector('.settings-fab');
    const overlay = document.getElementById('settings-overlay');
    const panel = document.getElementById('settings-panel');
    fab.classList.toggle('active');
    overlay.classList.toggle('active');
    panel.classList.toggle('active');
}

// Theme Functions
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

// Animation Functions
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

// Language Functions
function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
    event.target.closest('.language-option').classList.add('active');
    updateLanguage();
    loadPage(currentPage);
}

function updateLanguage() {
    const t = translations[currentLang];
    document.getElementById('sidebar-title').textContent = t.sidebarTitle;
    document.getElementById('sidebar-subtitle').textContent = t.sidebarSubtitle;
    document.getElementById('nav-home').textContent = t.navHome;
    document.getElementById('nav-profile').textContent = t.navProfile;
    document.getElementById('nav-creator').textContent = t.navCreator;
    document.getElementById('nav-affiliation').textContent = t.navAffiliation;
    document.getElementById('nav-project').textContent = t.navProject;
    document.getElementById('nav-gallery').textContent = t.navGallery;
    document.getElementById('nav-store').textContent = t.navStore;
    document.getElementById('nav-social').textContent = t.navSocial;
    document.getElementById('settings-main-title').textContent = t.settingsMainTitle;
    document.getElementById('settings-background-title').textContent = t.settingsBackgroundTitle;
    document.getElementById('settings-background-desc').textContent = t.settingsBackgroundDesc;
    document.getElementById('settings-theme-title').textContent = t.settingsThemeTitle;
    document.getElementById('settings-theme-desc').textContent = t.settingsThemeDesc;
    document.getElementById('settings-animation-title').textContent = t.settingsAnimationTitle;
    document.getElementById('settings-animation-desc').textContent = t.settingsAnimationDesc;
    document.getElementById('settings-language-title').textContent = t.settingsLanguageTitle;
    document.getElementById('settings-language-desc').textContent = t.settingsLanguageDesc;
    document.getElementById('settings-notification-title').textContent = t.settingsNotificationTitle;
    document.getElementById('settings-notification-desc').textContent = t.settingsNotificationDesc;
    document.getElementById('auto-season-label').textContent = t.autoSeasonLabel;
    document.getElementById('snow-animation-label').textContent = t.snowAnimationLabel;
    document.getElementById('hover-effects-label').textContent = t.hoverEffectsLabel;
    document.getElementById('email-notif-label').textContent = t.emailNotifLabel;
    document.getElementById('push-notif-label').textContent = t.pushNotifLabel;
    
    // Update date time format
    updateDateTime();
}

// Page Loading Functions
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
                    <div class="profile-image">🏢</div>
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
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">💻 ${t.skill1}</h3>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">👥 ${t.skill2}</h3>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">🎨 ${t.skill3}</h3>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">🎉 ${t.skill4}</h3>
                            </div>
                        </div>
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
                        ${generateCreatorCards()}
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
                        ${generateAffiliationCards()}
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
                        ${generateProjectCards()}
                    </div>
                </div>
            `;
            break;

        case 'gallery':
            content.innerHTML = `
                <div class="page-header">
                    <h1>${t.title}</h1>
                    <p>${t.subtitle}</p>
                </div>
                <div class="content-section">
                    <div class="card-grid">
                        ${generateGalleryCards()}
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
                        ${generateStoreCards()}
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
                        ${generateSocialCards()}
                    </div>
                </div>
            `;
            break;
    }
}

// Content Generator Functions
function generateCreatorCards() {
    const creators = [
        { name: 'Aria Sakura', role: 'Content Creator', specialty: 'Gaming & Streaming', emoji: '🎮' },
        { name: 'Leo Chen', role: 'Video Editor', specialty: 'Motion Graphics', emoji: '🎬' },
        { name: 'Maya Winters', role: 'Illustrator', specialty: 'Digital Art', emoji: '🎨' },
        { name: 'Kai Storm', role: 'Music Producer', specialty: 'Electronic Music', emoji: '🎵' },
        { name: 'Luna Star', role: 'Writer', specialty: 'Storytelling', emoji: '✍️' },
        { name: 'Nova Ray', role: '3D Artist', specialty: 'Character Design', emoji: '🎭' }
    ];

    return creators.map(c => `
        <div class="card">
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
        </div>
    `).join('');
}

function generateAffiliationCards() {
    const affiliations = [
        { name: 'TechHub Studio', desc: 'Technology & Innovation Partner', type: 'Technology', emoji: '💻' },
        { name: 'Creative Minds', desc: 'Design & Branding Partner', type: 'Design', emoji: '🎨' },
        { name: 'Digital Wave', desc: 'Marketing & Strategy Partner', type: 'Marketing', emoji: '📱' },
        { name: 'StreamPro Network', desc: 'Streaming Platform Partner', type: 'Platform', emoji: '📺' }
    ];

    return affiliations.map(a => `
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
    `).join('');
}

function generateProjectCards() {
    const t = translations[currentLang].project;
    const projects = [
        { title: 'StarFest 2025', creators: 'Aria, Leo, Maya', desc: 'Annual community festival', emoji: '🎉', tags: ['Event', 'Community'] },
        { title: 'Digital Dreamscape', creators: 'Nova, Kai', desc: '3D Interactive Experience', emoji: '🌌', tags: ['3D', 'Interactive'] },
        { title: 'Story Chronicles', creators: 'Luna, Maya', desc: 'Illustrated Story Series', emoji: '📖', tags: ['Story', 'Art'] },
        { title: 'Beat Fusion', creators: 'Kai, Leo', desc: 'Music & Video Collaboration', emoji: '🎶', tags: ['Music', 'Video'] }
    ];

    return projects.map(p => `
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
    `).join('');
}

function generateGalleryCards() {
    const emojis = ['📸', '🎥', '🎭', '🎪', '🎨', '🎬'];
    const colors = ['#ff6b9d', '#667eea', '#4caf50', '#ff9800', '#2196f3', '#9c27b0'];
    
    return emojis.map((emoji, i) => `
        <div class="card">
            <div class="card-image" style="background: linear-gradient(135deg, ${colors[i]}, ${colors[i]}cc);">
                <span style="font-size: 72px;">${emoji}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">Event ${i + 1}</h3>
                <p class="card-description">Documentation from our activities</p>
            </div>
        </div>
    `).join('');
}

function generateStoreCards() {
    const products = [
        { name: 'StarLive T-Shirt', price: 'Rp 150.000', tag: 'Limited', type: 'limited', emoji: '👕' },
        { name: 'Hoodie Collection', price: 'Rp 350.000', tag: 'Discount', type: 'discount', emoji: '🧥' },
        { name: 'Acrylic Stand', price: 'Rp 75.000', tag: null, type: null, emoji: '🎴' },
        { name: 'Sticker Pack', price: 'Rp 50.000', tag: 'Limited', type: 'limited', emoji: '✨' },
        { name: 'Art Book', price: 'Rp 200.000', tag: null, type: null, emoji: '📚' },
        { name: 'Badge Set', price: 'Rp 100.000', tag: 'Discount', type: 'discount', emoji: '🏅' }
    ];

    return products.map(p => `
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
    `).join('');
}

function generateSocialCards() {
    const socials = [
        { name: 'YouTube', handle: '@StarLiveOfficial', desc: 'Subscribe for latest videos', color: '#FF0000', icon: '▶️' },
        { name: 'Twitter / X', handle: '@StarLive_ID', desc: 'Follow for daily updates', color: '#1DA1F2', icon: '🐦' },
        { name: 'Instagram', handle: '@starlive.official', desc: 'Visual stories and behind the scenes', color: '#E1306C', icon: '📷' },
        { name: 'TikTok', handle: '@starlive', desc: 'Short videos and fun content', color: '#000000', icon: '🎵' }
    ];

    return socials.map(s => `
        <a href="#" class="social-card" style="background: ${s.color};">
            <div class="social-icon-large">${s.icon}</div>
            <div class="social-info">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <div class="social-handle">${s.handle}</div>
            </div>
        </a>
    `).join('');
}

// Background Customization Functions
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
        
        previewContent.innerHTML = `<video src="${src}" style="width: 100%; height: 100%; object-fit: cover;" muted loop></video>`;
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

// Initialize
loadPage('home');
