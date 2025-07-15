// Journey page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Journey page loaded');
    
    // Initialize Lucide icons first
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    }
    
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeJourneyToggles();
        initializeJourneyAnimations();
    }, 100);
});

// Initialize journey toggle functionality
function initializeJourneyToggles() {
    console.log('Initializing journey toggles...');
    
    // Get all journey cards and details
    const allDetails = document.querySelectorAll('.journey-details');
    const allButtons = document.querySelectorAll('.journey-toggle');
    
    console.log(`Found ${allDetails.length} detail sections and ${allButtons.length} toggle buttons`);
    
    // FORCE all details to be collapsed initially
    allDetails.forEach((details, index) => {
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
        details.style.paddingTop = '0px';
        details.style.paddingBottom = '0px';
        details.style.overflow = 'hidden';
        details.style.transition = 'all 0.4s ease';
        details.classList.remove('expanded');
        
        console.log(`Detail section ${index} forced to collapsed state`);
    });
    
    // Reset all buttons to initial state
    allButtons.forEach((button, index) => {
        button.classList.remove('expanded');
        const buttonIcon = button.querySelector('.toggle-icon');
        if (buttonIcon) {
            buttonIcon.style.transform = 'rotate(0deg)';
        }
        console.log(`Button ${index} reset to initial state`);
    });
    
    // Add click event listeners to journey cards (clicking anywhere on header)
    const journeyCards = document.querySelectorAll('.journey-card');
    journeyCards.forEach((card, index) => {
        const header = card.querySelector('.journey-header');
        const button = card.querySelector('.journey-toggle');
        
        if (header && button) {
            // Remove any existing event listeners by cloning
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            
            // Add click event to the new header
            newHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Journey card ${index} clicked`);
                toggleJourneyDetails(card);
            });
            
            console.log(`Event listener added to journey card ${index}`);
        }
    });
    
    console.log(`Initialized ${journeyCards.length} journey cards`);
}

// Toggle journey details function
function toggleJourneyDetails(journeyCard) {
    console.log('Toggle function called for card:', journeyCard);
    
    if (!journeyCard) {
        console.warn('Journey card not found');
        return;
    }
    
    const details = journeyCard.querySelector('.journey-details');
    const button = journeyCard.querySelector('.journey-toggle');
    const icon = button?.querySelector('.toggle-icon');
    
    if (!details || !button) {
        console.warn('Journey details or button not found');
        return;
    }
    
    const isExpanded = details.classList.contains('expanded');
    console.log(`Current state: ${isExpanded ? 'expanded' : 'collapsed'}`);
    
    // Close all other expanded items first
    const allCards = document.querySelectorAll('.journey-card');
    allCards.forEach(card => {
        if (card !== journeyCard) {
            const otherDetails = card.querySelector('.journey-details');
            const otherButton = card.querySelector('.journey-toggle');
            const otherIcon = otherButton?.querySelector('.toggle-icon');
            
            if (otherDetails && otherDetails.classList.contains('expanded')) {
                // Collapse other items
                otherDetails.classList.remove('expanded');
                otherDetails.style.maxHeight = '0px';
                otherDetails.style.opacity = '0';
                otherDetails.style.paddingTop = '0px';
                otherDetails.style.paddingBottom = '0px';
                
                if (otherButton) {
                    otherButton.classList.remove('expanded');
                }
                if (otherIcon) {
                    otherIcon.style.transform = 'rotate(0deg)';
                }
                
                console.log('Collapsed other expanded item');
            }
        }
    });
    
    if (isExpanded) {
        // Collapse current item
        console.log('Collapsing current item');
        details.classList.remove('expanded');
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
        details.style.paddingTop = '0px';
        details.style.paddingBottom = '0px';
        
        button.classList.remove('expanded');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        
        console.log('Collapsed journey details');
    } else {
        // Expand current item
        console.log('Expanding current item');
        
        // First, set padding and get natural height
        details.style.paddingTop = '1.5rem';
        details.style.paddingBottom = '1.5rem';
        details.style.maxHeight = 'none';
        const scrollHeight = details.scrollHeight;
        details.style.maxHeight = '0px';
        
        // Force reflow
        details.offsetHeight;
        
        // Now animate to the calculated height
        details.classList.add('expanded');
        details.style.maxHeight = scrollHeight + 'px';
        details.style.opacity = '1';
        
        button.classList.add('expanded');
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
        
        console.log('Expanded journey details to height:', scrollHeight);
        
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
        const journeyCard = activeElement.closest('.journey-card');
        if (journeyCard) {
            event.preventDefault();
            toggleJourneyDetails(journeyCard);
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

console.log('Journey.js loaded successfully');
