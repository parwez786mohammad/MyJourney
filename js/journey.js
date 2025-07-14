// Journey page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeTimelineToggles();
    initializeTimelineAnimations();
});

function initializeTimelineToggles() {
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    
    timelineHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTimelineItem(this);
        });
    });
}

function toggleTimelineItem(header) {
    const timelineItem = header.closest('.timeline-item');
    const details = timelineItem.querySelector('.timeline-details');
    const toggle = header.querySelector('.timeline-toggle');
    const toggleIcon = toggle?.querySelector('i');
    
    if (!details || !toggle) {
        console.warn('Timeline details or toggle not found');
        return;
    }
    
    const isExpanded = details.classList.contains('expanded');
    
    // Close all other timeline items first
    const allTimelineItems = document.querySelectorAll('.timeline-item');
    allTimelineItems.forEach(item => {
        if (item !== timelineItem) {
            const otherDetails = item.querySelector('.timeline-details');
            const otherToggle = item.querySelector('.timeline-toggle');
            const otherToggleIcon = otherToggle?.querySelector('i');
            
            if (otherDetails && otherDetails.classList.contains('expanded')) {
                otherDetails.classList.remove('expanded');
                otherDetails.style.maxHeight = '0';
                otherDetails.style.padding = '0 1.5rem';
            }
            if (otherToggle) {
                otherToggle.classList.remove('expanded');
            }
            if (otherToggleIcon) {
                otherToggleIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    if (isExpanded) {
        // Hide details
        details.classList.remove('expanded');
        details.style.maxHeight = '0';
        details.style.padding = '0 1.5rem';
        toggle.classList.remove('expanded');
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(0deg)';
        }
    } else {
        // Show details
        details.classList.add('expanded');
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.padding = '1.5rem';
        toggle.classList.add('expanded');
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(180deg)';
        }
        
        // Scroll to the timeline item after animation
        setTimeout(() => {
            timelineItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 400);
    }
    
    // Reinitialize Lucide icons after a short delay
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 50);
}

function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.dataset.index);
                const delay = index * 200; // Stagger animation
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach((item, index) => {
        item.dataset.index = index;
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Keyboard navigation for timeline items
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('timeline-header')) {
            event.preventDefault();
            toggleTimelineItem(activeElement);
        }
    }
});

// Auto-expand first timeline item on page load
window.addEventListener('load', function() {
    const firstTimelineHeader = document.querySelector('.timeline-header');
    if (firstTimelineHeader) {
        setTimeout(() => {
            toggleTimelineItem(firstTimelineHeader);
        }, 1500);
    }
});

// Handle window resize to recalculate max-height for expanded items
window.addEventListener('resize', function() {
    const expandedDetails = document.querySelectorAll('.timeline-details.expanded');
    expandedDetails.forEach(details => {
        details.style.maxHeight = details.scrollHeight + 'px';
    });
});
