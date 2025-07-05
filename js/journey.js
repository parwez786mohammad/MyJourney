// Journey page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTimelineToggles();
    initializeTimelineAnimations();
});

function initializeTimelineToggles() {
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    
    timelineHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleTimelineItem(this);
        });
    });
}

function toggleTimelineItem(header) {
    const timelineItem = header.closest('.timeline-item');
    const details = timelineItem.querySelector('.timeline-details');
    const toggle = header.querySelector('.timeline-toggle');
    const toggleIcon = toggle?.querySelector('i');
    
    if (!details || !toggle) return;
    
    const isVisible = details.classList.contains('visible');
    
    // Close all other timeline items
    const allTimelineItems = document.querySelectorAll('.timeline-item');
    allTimelineItems.forEach(item => {
        if (item !== timelineItem) {
            const otherDetails = item.querySelector('.timeline-details');
            const otherToggle = item.querySelector('.timeline-toggle i');
            
            if (otherDetails) {
                otherDetails.classList.remove('visible');
            }
            if (otherToggle) {
                otherToggle.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    if (isVisible) {
        // Hide details
        details.classList.remove('visible');
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(0deg)';
        }
    } else {
        // Show details
        details.classList.add('visible');
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(180deg)';
        }
        
        // Scroll to the timeline item
        setTimeout(() => {
            timelineItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    }
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
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
        }, 1000);
    }
});