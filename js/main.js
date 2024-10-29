// Main JavaScript file for 3CG Electric website

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
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
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
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
});

// Google Maps initialization
function initMap() {
    // Replace with your company's coordinates
    const companyLocation = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: companyLocation
    });

    const marker = new google.maps.Marker({
        position: companyLocation,
        map: map,
        title: '3CG Electric'
    });
}