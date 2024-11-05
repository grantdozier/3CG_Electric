// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending Request...';
            submitButton.disabled = true;
            
            try {
                // Using Formspree - Replace 'YOUR_FORM_ID' with the actual form ID
                const formData = new FormData(this);
                
                // Handle file uploads
                const fileInput = this.querySelector('#images');
                if (fileInput.files.length > 0) {
                    Array.from(fileInput.files).forEach((file, index) => {
                        formData.append(`image${index + 1}`, file);
                    });
                }

                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success message
                    alert('Thank you for your quote request! We will review your information and get back to you soon.');
                    this.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your request. Please try again later or contact us directly.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });

        // Form validation and UI feedback
        const inputs = quoteForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Show validation feedback
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                this.classList.add('border-red-500');
            });

            // Remove error styling on input
            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
            });
        });

        // Phone number formatting
        const phoneInput = quoteForm.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 10) {
                    value = value.slice(0, 10);
                    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
                }
                e.target.value = value;
            });
        }

        // ZIP code validation
        const zipInput = quoteForm.querySelector('#zip');
        if (zipInput) {
            zipInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 5) {
                    value = value.slice(0, 5);
                }
                e.target.value = value;
            });
        }
    }
});