document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling with enhanced validation
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');
    
    if (contactForm) {
        // Validate on submit
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset validation states
            nameInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-invalid');
            messageInput.classList.remove('is-invalid');
            formAlert.classList.add('d-none');
            
            // Validate inputs
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            }
            
            if (!isValid) {
                formAlert.textContent = 'Please correct the errors in the form.';
                formAlert.classList.remove('alert-success', 'd-none');
                formAlert.classList.add('alert-danger');
                return;
            }
            
            // Create contact object
            const contactData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim(),
                timestamp: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            // Get existing contacts or initialize array
            let contacts = JSON.parse(localStorage.getItem('portfolioContacts')) || [];
            
            // Add new contact (limit to 50 most recent)
            contacts.push(contactData);
            if (contacts.length > 50) {
                contacts = contacts.slice(-50);
            }
            
            // Save to localStorage
            localStorage.setItem('portfolioContacts', JSON.stringify(contacts));
            
            // Show success message
            formAlert.textContent = 'Thank you! Your message has been saved. I will get back to you soon.';
            formAlert.classList.remove('alert-danger', 'd-none');
            formAlert.classList.add('alert-success');
            
            // Clear form
            contactForm.reset();
            
            // Hide alert after 5 seconds
            setTimeout(() => {
                formAlert.classList.add('d-none');
            }, 5000);
            
            // For debugging: log all stored contacts
            console.log('All stored contacts:', JSON.parse(localStorage.getItem('portfolioContacts')));
        });
        
        // Add input event listeners for real-time validation
        document.getElementById('name').addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
        
        document.getElementById('email').addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
        
        document.getElementById('message').addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    }
    
    // Set active nav link
    const currentPage = location.pathname.split('/').pop() || '/Vbraganza-Portfolio/index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
