// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectToggles();
});

function initializeProjectToggles() {
    const projectToggles = document.querySelectorAll('.project-toggle');
    
    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            toggleProject(this);
        });
    });
}

function toggleProject(button) {
    const projectCard = button.closest('.project-card');
    const details = projectCard.querySelector('.project-details');
    const toggleText = button.querySelector('.toggle-text');
    const toggleIcon = button.querySelector('.toggle-icon');
    
    if (!details || !toggleText || !toggleIcon) return;
    
    const isVisible = details.classList.contains('visible');
    
    if (isVisible) {
        // Hide details
        details.classList.remove('visible');
        toggleText.textContent = 'Show More';
        toggleIcon.style.transform = 'rotate(0deg)';
        button.classList.remove('expanded');
    } else {
        // Show details
        details.classList.add('visible');
        toggleText.textContent = 'Show Less';
        toggleIcon.style.transform = 'rotate(180deg)';
        button.classList.add('expanded');
    }
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Close all project details when clicking outside
document.addEventListener('click', function(event) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (!card.contains(event.target)) {
            const details = card.querySelector('.project-details');
            const toggle = card.querySelector('.project-toggle');
            const toggleText = toggle?.querySelector('.toggle-text');
            const toggleIcon = toggle?.querySelector('.toggle-icon');
            
            if (details && details.classList.contains('visible')) {
                details.classList.remove('visible');
                if (toggleText) toggleText.textContent = 'Show More';
                if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
                if (toggle) toggle.classList.remove('expanded');
            }
        }
    });
});

// Keyboard navigation for project toggles
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('project-toggle')) {
            event.preventDefault();
            toggleProject(activeElement);
        }
    }
});