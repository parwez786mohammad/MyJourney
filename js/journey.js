// Journey page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeJourneyAnimations();
    initializeJourneyToggles();
});

// Initialize journey toggle functionality
function initializeJourneyToggles() {
    // Set initial state for all details
    const allDetails = document.querySelectorAll('.journey-details');
    allDetails.forEach(details => {
        details.style.maxHeight = '0';
        details.style.opacity = '0';
        details.style.paddingTop = '0';
        details.style.paddingBottom = '0';
        details.style.overflow = 'hidden';
        details.style.transition = 'all 0.4s ease';
    });
    
    // Add click event listeners to toggle buttons
    const toggleButtons = document.querySelectorAll('.journey-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleJourneyDetails(this);
        });
    });
    
    console.log(`Initialized ${toggleButtons.length} journey toggle buttons`);
}

// Toggle journey details function
function toggleJourneyDetails(button) {
    if (!button) {
        console.warn('Toggle button not found');
        return;
    }
    
    const journeyCard = button.closest('.journey-card');
    if (!journeyCard) {
        console.warn('Journey card not found');
        return;
    }
    
    const details = journeyCard.querySelector('.journey-details');
    const icon = button.querySelector('i');
    const buttonText = button.querySelector('span');
    
    if (!details) {
        console.warn('Journey details not found');
        return;
    }
    
    const isExpanded = details.classList.contains('expanded');
    
    // Close all other expanded items first
    const allCards = document.querySelectorAll('.journey-card');
    allCards.forEach(card => {
        if (card !== journeyCard) {
            const otherDetails = card.querySelector('.journey-details');
            const otherButton = card.querySelector('.journey-toggle');
            const otherIcon = otherButton?.querySelector('i');
            const otherButtonText = otherButton?.querySelector('span');
            
            if (otherDetails && otherDetails.classList.contains('expanded')) {
                // Collapse other items
                otherDetails.classList.remove('expanded');
                otherDetails.style.maxHeight = '0';
                otherDetails.style.opacity = '0';
                otherDetails.style.paddingTop = '0';
                otherDetails.style.paddingBottom = '0';
                
                if (otherButton) {
                    otherButton.classList.remove('expanded');
                }
                if (otherIcon) {
                    otherIcon.style.transform = 'rotate(0deg)';
                }
                if (otherButtonText) {
                    otherButtonText.textContent = 'View Details';
                }
            }
        }
    });
    
    if (isExpanded) {
        // Collapse current item
        details.classList.remove('expanded');
        details.style.maxHeight = '0';
        details.style.opacity = '0';
        details.style.paddingTop = '0';
        details.style.paddingBottom = '0';
        
        button.classList.remove('expanded');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        if (buttonText) {
            buttonText.textContent = 'View Details';
        }
        
        console.log('Collapsed journey details');
    } else {
        // Expand current item
        details.classList.add('expanded');
        
        // Calculate the actual height needed
        details.style.maxHeight = 'none';
        details.style.paddingTop = '1.5rem';
        details.style.paddingBottom = '1.5rem';
        const scrollHeight = details.scrollHeight;
        details.style.maxHeight = '0';
        
        // Force reflow
        details.offsetHeight;
        
        // Now animate to the calculated height
        details.style.maxHeight = scrollHeight + 'px';
        details.style.opacity = '1';
        details.style.paddingTop = '1.5rem';
        details.style.paddingBottom = '1.5rem';
        
        button.classList.add('expanded');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
        if (buttonText) {
            buttonText.textContent = 'Hide Details';
        }
        
        console.log('Expanded journey details');
        
        // Smooth scroll to show expanded content after animation
        setTimeout(() => {
            const rect = journeyCard.getBoundingClientRect();
            const offset = window.pageYOffset + rect.top - 100;
            
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }, 300);
    }
    
    // Reinitialize Lucide icons after a short delay
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
        // Temporarily remove max-height to get natural height
        const currentMaxHeight = details.style.maxHeight;
        details.style.maxHeight = 'none';
        const newHeight = details.scrollHeight;
        details.style.maxHeight = currentMaxHeight;
        
        // Update to new height
        setTimeout(() => {
            details.style.maxHeight = newHeight + 'px';
        }, 10);
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

// Global function for onclick handlers (backup)
window.toggleJourneyDetails = toggleJourneyDetails;
