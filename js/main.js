// Main JavaScript file for 3CG Electric website

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());

            try {
                // Replace with your actual form submission endpoint
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formObject)
                // });

                // Simulate form submission for now
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again later.');
            } finally {
                submitButton.textContent = originalText;
            }
        });

        // Form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                this.classList.add('border-red-500');
            });

            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
            });
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Video gallery functionality
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            const videoType = this.dataset.videoType;
            
            if (videoId && videoType) {
                let embedUrl = '';
                if (videoType === 'youtube') {
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                } else if (videoType === 'vimeo') {
                    embedUrl = `https://player.vimeo.com/video/${videoId}`;
                }
                
                // Replace thumbnail with video embed
                if (embedUrl) {
                    const iframe = document.createElement('iframe');
                    iframe.src = embedUrl;
                    iframe.width = '100%';
                    iframe.height = '100%';
                    iframe.frameBorder = '0';
                    iframe.allow = 'autoplay; fullscreen';
                    this.parentNode.replaceChild(iframe, this);
                }
            }
        });
    });

    // Scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-red-700 focus:outline-none';
    scrollButton.style.display = 'none';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
            setTimeout(() => scrollButton.style.opacity = '1', 100);
        } else {
            scrollButton.style.opacity = '0';
            setTimeout(() => scrollButton.style.display = 'none', 300);
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-sm');
        }

        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Handle mobile menu clicks
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        }
    });

    // Add touch support for mobile devices
    let touchStartY = 0;
    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', e => {
        if (!touchStartY) {
            return;
        }

        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;

        // Show/hide navbar based on touch direction
        if (diff > 50) { // Scrolling up
            navbar.style.transform = 'translateY(-100%)';
        } else if (diff < -50) { // Scrolling down
            navbar.style.transform = 'translateY(0)';
        }

        touchStartY = null;
    }, { passive: true });
});