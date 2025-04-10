document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-toggle') && !event.target.closest('.main-nav')) {
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        }
    });
    
    // Restaurant Slider
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderItems = document.querySelectorAll('.slider-item');
    
    if (sliderTrack && prevBtn && nextBtn && sliderItems.length > 0) {
        let position = 0;
        const itemWidth = sliderItems[0].offsetWidth;
        const totalItems = sliderItems.length;
        let itemsPerView = 5;
        
        // Adjust items per view based on screen width
        function updateItemsPerView() {
            if (window.innerWidth <= 480) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 768) {
                itemsPerView = 2;
            } else if (window.innerWidth <= 992) {
                itemsPerView = 3;
            } else {
                itemsPerView = 5;
            }
        }
        
        updateItemsPerView();
        
        // Update slider position
        function updateSliderPosition() {
            sliderTrack.style.transform = `translateX(${position}px)`;
        }
        
        // Next slide
        nextBtn.addEventListener('click', function() {
            if (Math.abs(position) < (totalItems - itemsPerView) * itemWidth) {
                position -= itemWidth;
                updateSliderPosition();
            }
        });
        
        // Previous slide
        prevBtn.addEventListener('click', function() {
            if (position < 0) {
                position += itemWidth;
                updateSliderPosition();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            updateItemsPerView();
            position = 0; // Reset position on resize
            updateSliderPosition();
        });
    }
    
    // Scroll Animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.service-item, .benefit-item, .event-card, .slider-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(function(element, index) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                setTimeout(function() {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                }, index * 100);
            }
        });
    }
    
    // Hide elements initially
    document.querySelectorAll('.service-item, .benefit-item, .event-card, .slider-item').forEach(function(element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    // Trigger reveal on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
    });
});