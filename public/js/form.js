document.addEventListener('DOMContentLoaded', function() {
    // Handle all forms with specific selectors
    const indexForm = document.querySelector('form[action="/index"]');
    const contactForm = document.querySelector('form[action="/contact"]');
    const getStartedForm = document.querySelector('form[action="/get-started"]');
    
    // Combine all forms
    const allForms = [indexForm, contactForm, getStartedForm].filter(form => form !== null);
    
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(this);
            const action = this.getAttribute('action');
            
            console.log('Form action:', action); // Debug log
            console.log('Form data:', Object.fromEntries(formData)); // Debug log
            
            // Basic validation
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('input[type="submit"], button[type="submit"]');
            const originalText = submitBtn.value || submitBtn.textContent;
            submitBtn.disabled = true;
            if (submitBtn.tagName === 'INPUT') {
                submitBtn.value = 'Sending...';
            } else {
                submitBtn.textContent = 'Sending...';
            }
            
            // Submit form via fetch
            fetch(action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status); // Debug log
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data); // Debug log
                if (data.success) {
                    alert(data.message || 'Thank you! Your message has been sent successfully.');
                    form.reset();
                } else {
                    alert(data.message || 'Failed to send message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                if (submitBtn.tagName === 'INPUT') {
                    submitBtn.value = originalText;
                } else {
                    submitBtn.textContent = originalText;
                }
            });
        });
    });
});
