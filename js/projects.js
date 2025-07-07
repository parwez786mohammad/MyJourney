// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Toggle project details function
function toggleProject(button) {
    const projectCard = button.closest('.project-card');
    const projectDetails = projectCard.querySelector('.project-details');
    const toggleText = button.querySelector('.toggle-text');
    const toggleIcon = button.querySelector('.toggle-icon');
    
    // Check current state
    const isExpanded = projectDetails.classList.contains('visible');
    
    if (isExpanded) {
        // Collapse the project
        projectDetails.classList.remove('visible');
        toggleText.textContent = 'Show More';
        button.classList.remove('expanded');
        
        // Animate the icon rotation
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(0deg)';
        }
    } else {
        // Expand the project
        projectDetails.classList.add('visible');
        toggleText.textContent = 'Hide';
        button.classList.add('expanded');
        
        // Animate the icon rotation
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(180deg)';
        }
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize animations when page loads
window.addEventListener('load', addScrollAnimations);