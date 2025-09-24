<script>
        // Loading screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe portfolio items for scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            const skillItems = document.querySelectorAll('.skill-item');
            
            [...portfolioItems, ...skillItems].forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
                observer.observe(item);
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            const submitBtn = document.querySelector('.contact-form button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Mobile menu toggle (basic implementation)
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            this.classList.toggle('active');
            // You can add mobile menu functionality here
        });

        // Portfolio item click handler
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', function() {
                const title = this.querySelector('.portfolio-title').textContent;
                const description = this.querySelector('.portfolio-description').textContent;
                
                // You can add modal or detailed view functionality here
                console.log('Portfolio item clicked:', title);
            });
        });

        // Parallax effect for floating shapes
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Dynamic text animation
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Enhanced hover effects for portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Skills animation on scroll
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillIcon = entry.target.querySelector('.skill-icon');
                    skillIcon.style.animation = 'none';
                    setTimeout(() => {
                        skillIcon.style.animation = 'float 3s ease-in-out infinite';
                    }, 100);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(skill => {
            skillsObserver.observe(skill);
        });

        // Add some interactive cursor effects
        document.addEventListener('mousemove', function(e) {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const cursorEl = document.createElement('div');
                cursorEl.className = 'cursor';
                cursorEl.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: rgba(37, 99, 235, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.1s ease;
                    mix-blend-mode: difference;
                `;
                document.body.appendChild(cursorEl);
            }
            
            const cursor2 = document.querySelector('.cursor');
            cursor2.style.left = e.clientX - 10 + 'px';
            cursor2.style.top = e.clientY - 10 + 'px';
        });

        // Add hover effects for interactive elements
        document.querySelectorAll('a, button, .portfolio-item').forEach(element => {
            element.addEventListener('mouseenter', function() {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.transform = 'scale(2)';
                    cursor.style.background = 'rgba(245, 158, 11, 0.7)';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.transform = 'scale(1)';
                    cursor.style.background = 'rgba(37, 99, 235, 0.5)';
                }
            });
        });

        // Performance optimization: Throttle scroll events
        let ticking = false;

        function updateScrollEffects() {
            // All scroll-based animations go here
            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestScrollUpdate);

</script>
