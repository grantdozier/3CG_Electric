document.addEventListener('DOMContentLoaded', function() {
    // Original Quote Form handling
    const quoteForm = document.getElementById('quoteForm');
    const contactForm = document.getElementById('contactForm');
    
    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending Message...';
            submitButton.disabled = true;

            try {
                // Get form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Format the email body with line breaks
                const emailBody = `Name: ${name}%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                
                // Create the mailto link
                const mailToLink = `mailto:contact@3cgelectric.com?subject=Contact Form Submission from ${name}&body=${emailBody}`;
                
                // Create success message before opening email client
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
                successMessage.innerHTML = `
                    <strong class="font-bold">Success!</strong>
                    <span class="block sm:inline ml-2">Your email client should open shortly. If it doesn't, please contact us directly.</span>
                `;
                
                this.insertAdjacentElement('beforebegin', successMessage);
                
                // Open user's email client
                window.location.href = mailToLink;
                
                // Clear the form
                this.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);

            } catch (error) {
                console.error('Error:', error);
                
                // Error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
                errorMessage.innerHTML = `
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline ml-2">There was a problem opening your email client. Please try again or contact us directly at contact@3cgelectric.com</span>
                `;
                
                this.insertAdjacentElement('beforebegin', errorMessage);

                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Quote Form handling (your original code)
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending Request...';
            submitButton.disabled = true;

            try {
                // Get form data
                const formData = new FormData(this);
                
                // Handle file uploads
                const fileInput = this.querySelector('#attachment');
                if (fileInput && fileInput.files.length > 0) {
                    // Remove any existing file entries
                    formData.delete('attachment');
                    
                    // Add each file individually
                    Array.from(fileInput.files).forEach((file, index) => {
                        formData.append('attachment', file);
                    });
                }

                // Add the current date/time to the form data
                formData.append('submission_date', new Date().toLocaleString());

                // Send to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const responseData = await response.json();

                if (response.ok) {
                    // Success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
                    successMessage.innerHTML = `
                        <strong class="font-bold">Success!</strong>
                        <span class="block sm:inline ml-2">Thank you for your quote request! We will review your information and get back to you soon.</span>
                    `;
                    
                    this.insertAdjacentElement('beforebegin', successMessage);
                    this.reset();

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);

                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error(responseData.error || 'Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                
                // Error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
                errorMessage.innerHTML = `
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline ml-2">There was a problem submitting your request. Please try again or contact us directly.</span>
                `;
                
                this.insertAdjacentElement('beforebegin', errorMessage);

                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
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

        // File upload validation
        const imageInput = quoteForm.querySelector('#attachment');
        if (imageInput) {
            imageInput.addEventListener('change', function(e) {
                const files = Array.from(this.files);
                const maxSize = 10 * 1024 * 1024; // 10MB max size
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                
                // Remove any existing error messages
                const existingError = this.parentNode.querySelector('.text-red-500');
                if (existingError) {
                    existingError.remove();
                }

                // Validate each file
                const invalidFiles = files.filter(file => {
                    return file.size > maxSize || !allowedTypes.includes(file.type);
                });

                if (invalidFiles.length > 0) {
                    // Create error message
                    const errorMessage = document.createElement('p');
                    errorMessage.className = 'text-red-500 text-sm mt-1';
                    errorMessage.textContent = 'Please select images under 10MB in JPG, PNG, or GIF format.';
                    this.parentNode.appendChild(errorMessage);
                    
                    // Clear the file input
                    this.value = '';
                }
            });
        }
    }
});