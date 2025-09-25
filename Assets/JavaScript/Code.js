    <script>
        // ===== WINTER THEME JAVASCRIPT =====

        // DOM Elements
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        const fabButton = document.getElementById('fabButton');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const settingItems = document.querySelectorAll('.setting-item');
        const previewContents = document.querySelectorAll('.preview-content');
        const themeButtons = document.querySelectorAll('.theme-btn');

        // Navigation System
        function initNavigation() {
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    
                    // Update active states
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    sections.forEach(section => section.classList.remove('active'));
                    
                    // Activate target
                    link.classList.add('active');
                    document.getElementById(targetId).classList.add('active');
                });
            });
        }

        // Snow Animation System
        function createSnowAnimation() {
            const snowContainer = document.getElementById('snowContainer');
            const snowflakeCount = 50;
            
            for (let i = 0; i < snowflakeCount; i++) {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.innerHTML = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
                
                // Random properties
                snowflake.style.left = Math.random() * 100 + '%';
                snowflake.style.animationDuration = (Math.random() * 10 + 8) + 's';
                snowflake.style.animationDelay = Math.random() * 8 + 's';
                snowflake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
                snowflake.style.opacity = Math.random() * 0.6 + 0.4;
                
                snowContainer.appendChild(snowflake);
            }
        }

        // Modal System
        function initModal() {
            // Open modal
            fabButton.addEventListener('click', () => {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            // Close modal
            modalClose.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
            
            // ESC key close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                    closeModal();
                }
            });
        }

        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Settings System
        function initSettings() {
            settingItems.forEach(item => {
                item.addEventListener('click', () => {
                    const settingType = item.getAttribute('data-setting');
                    
                    // Update active states
                    settingItems.forEach(setting => setting.classList.remove('active'));
                    previewContents.forEach(content => content.classList.remove('active'));
                    
                    // Activate selected
                    item.classList.add('active');
                    document.querySelector(`[data-preview="${settingType}"]`).classList.add('active');
                });
            });
        }

        // Theme System
        function initThemeSystem() {
            themeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const theme = button.getAttribute('data-theme');
                    
                    // Update active state
                    themeButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Apply theme
                    applyTheme(theme);
                    showNotification(`Theme changed to ${theme}!`, 'success');
                });
            });
        }

        function applyTheme(theme) {
            const root = document.documentElement;
            
            switch(theme) {
                case 'winter':
                    root.style.setProperty('--winter-primary', '#E8F4FD');
                    root.style.setProperty('--winter-secondary', '#B8E0FF');
                    root.style.setProperty('--winter-accent', '#7DD3FC');
                    break;
                case 'spring':
                    root.style.setProperty('--winter-primary', '#F0FDF4');
                    root.style.setProperty('--winter-secondary', '#BBF7D0');
                    root.style.setProperty('--winter-accent', '#86EFAC');
                    break;
                case 'summer':
                    root.style.setProperty('--winter-primary', '#FFF7ED');
                    root.style.setProperty('--winter-secondary', '#FFEDD5');
                    root.style.setProperty('--winter-accent', '#FED7AA');
                    break;
            }
        }

        // Skill Bar Animation
        function animateSkillBars() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const width = bar.style.width;
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 200);
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            const profileSection = document.getElementById('profile');
            if (profileSection) observer.observe(profileSection);
        }

        // Animation Controls
        function initAnimationControls() {
            const toggles = document.querySelectorAll('.toggle-label input[type="checkbox"]');
            
            toggles.forEach(toggle => {
                toggle.addEventListener('change', (e) => {
                    const isChecked = e.target.checked;
                    const label = e.target.closest('.toggle-label').textContent.trim();
                    
                    if (label.includes('Snow')) {
                        toggleSnowAnimation(isChecked);
                    } else if (label.includes('Hover')) {
                        toggleHoverEffects(isChecked);
                    }
                });
            });
        }

        function toggleSnowAnimation(enabled) {
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(flake => {
                flake.style.animationPlayState = enabled ? 'running' : 'paused';
            });
        }

        function toggleHoverEffects(enabled) {
            const cards = document.querySelectorAll('.social-card, .project-card');
            cards.forEach(card => {
                if (enabled) {
                    card.style.transition = 'all 0.3s ease';
                } else {
                    card.style.transition = 'none';
                }
            });
        }

        // Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.textContent = message;
            
            Object.assign(notification.style, {
                position: 'fixed',
                top: '24px',
                right: '24px',
                padding: '1rem 1.5rem',
                background: type === 'success' ? 'var(--winter-deep)' : 'var(--winter-accent)',
                color: 'var(--white)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-medium)',
                zIndex: '3000',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease',
                fontSize: '0.875rem',
                fontWeight: '500'
            });
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.style.transform = 'translateX(0)', 100);
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        }

        // Scroll to Top
        function initScrollToTop() {
            const logo = document.querySelector('.nav-logo');
            logo.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Initialize Everything
        document.addEventListener('DOMContentLoaded', () => {
            try {
                initNavigation();
                initModal();
                initSettings();
                initThemeSystem();
                initAnimationControls();
                initScrollToTop();
                
                createSnowAnimation();
                animateSkillBars();
                
                // Welcome message
                setTimeout(() => {
                    showNotification('❄️ Welcome to Winter Portfolio!', 'success');
                }, 1000);
                
                console.log('❄️ Winter Portfolio initialized successfully!');
                
            } catch (error) {
                console.error('Initialization error:', error);
            }
        });
    </script>
