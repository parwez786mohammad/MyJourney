// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.submit-btn');
    const successMessage = document.getElementById('success-message');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const nameField = form.querySelector('#name');
    const emailField = form.querySelector('#email');
    const messageField = form.querySelector('#message');
    
    let isValid = true;
    
    // Validate name
    if (!nameField.value.trim()) {
        showFieldError(nameField, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!emailField.value.trim()) {
        showFieldError(emailField, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!messageField.value.trim()) {
        showFieldError(messageField, 'Message is required');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showFieldError(messageField, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch (field.id) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Name is required');
                return false;
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Email is required');
                return false;
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(field, 'Message is required');
                return false;
            } else if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    field.style.borderColor = '#ef4444';
    errorElement.textContent = message;
    errorElement.classList.add('visible');
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    field.style.borderColor = '#475569';
    errorElement.classList.remove('visible');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function submitForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    btnText.style.opacity = '0';
    loadingSpinner.style.display = 'block';
    
    try {
        // Submit to Formspree
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showSuccessMessage();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again or contact me directly via email.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        btnText.style.opacity = '1';
        loadingSpinner.style.display = 'none';
    }
}

function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    form.style.display = 'none';
    successMessage.classList.add('visible');
    
    // Scroll to success message
    successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function resetForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    form.reset();
    form.style.display = 'block';
    successMessage.classList.remove('visible');
    
    // Clear any error states
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.classList.remove('visible'));
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#475569';
    });
    
    // Scroll back to form
    form.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Make resetForm available globally
window.resetForm = resetForm;