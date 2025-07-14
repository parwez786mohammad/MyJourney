// Journey page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeJourneyAnimations();
});

// Toggle journey details function
function toggleJourneyDetails(button) {
    const journeyCard = button.closest('.journey-card');
    const details = journeyCard.querySelector('.journey-details');
    const icon = button.querySelector('i');
    const buttonText = button.querySelector('span');
    
    if (!details || !icon || !buttonText) {
        console.warn('Journey toggle elements not found');
        return;
    }
    
    const isExpanded = details.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        details.classList.remove('expanded');
        details.style.maxHeight = '0';
        details.style.opacity = '0';
        details.style.paddingTop = '0';
        details.style.paddingBottom = '0';
        
        buttonText.textContent = 'View Details';
        icon.style.transform = 'rotate(0deg)';
        button.classList.remove('expanded');
    } else {
        // Expand
        details.classList.add('expanded');
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.opacity = '1';
        details.style.paddingTop = '1.5rem';
        details.style.paddingBottom = '1.5rem';
        
        buttonText.textContent = 'Hide Details';
        icon.style.transform = 'rotate(180deg)';
        button.classList.add('expanded');
        
        // Smooth scroll to show expanded content
        setTimeout(() => {
            const rect = journeyCard.getBoundingClientRect();
            const offset = window.pageYOffset + rect.top - 100;
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }, 300);
    }
    
    // Reinitialize Lucide icons
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 50);
}

// Initialize animations
function initializeJourneyAnimations() {
    const journeyCards = document.querySelectorAll('.journey-card');
    
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
    
    journeyCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('journey-toggle')) {
            event.preventDefault();
            toggleJourneyDetails(activeElement);
        }
    }
});

// Handle window resize to recalculate expanded heights
window.addEventListener('resize', function() {
    const expandedDetails = document.querySelectorAll('.journey-details.expanded');
    expandedDetails.forEach(details => {
        details.style.maxHeight = details.scrollHeight + 'px';
    });
});

// Auto-expand first journey item on page load (optional)
window.addEventListener('load', function() {
    const firstToggle = document.querySelector('.journey-toggle');
    if (firstToggle) {
        setTimeout(() => {
            toggleJourneyDetails(firstToggle);
        }, 1500);
    }
});
