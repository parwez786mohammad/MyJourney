// Videos page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoFilters();
    initializeVideoAnimations();
    initializeVideoHovers();
});

function initializeVideoFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter video cards
            filterVideoCards(videoCards, category);
        });
    });
}

function filterVideoCards(cards, category) {
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function initializeVideoAnimations() {
    const videoCards = document.querySelectorAll('.video-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(videoCards).indexOf(entry.target);
                const delay = index * 100;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    videoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initializeVideoHovers() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            if (playButton) {
                playButton.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
            if (playButton) {
                playButton.style.transform = 'scale(1)';
            }
        });
        
        // Click handler for video cards (placeholder for future video modal)
        card.addEventListener('click', function() {
            const title = this.querySelector('.video-title').textContent;
            alert(`Video "${title}" is coming soon! Stay tuned for updates.`);
        });
    });
}