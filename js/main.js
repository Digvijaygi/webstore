// Main JavaScript for 3D Shoes Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    initializeNavigation();
    initializeSearch();
    initializeScrollEffects();
    initializeAnimations();
    initializeForms();
    initializeHeroSection();
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.replace('fa-times', 'fa-bars');
            } else {
                icon.classList.replace('fa-bars', 'fa-times');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // Navbar background change on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('bg-white', 'shadow-lg');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-white', 'shadow-lg');
                navbar.classList.add('bg-transparent');
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Search functionality
function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.remove('hidden');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
    }
    
    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', function() {
            searchOverlay.classList.add('hidden');
            if (searchInput) {
                searchInput.value = '';
                document.getElementById('searchResults').innerHTML = '';
            }
        });
    }
    
    // Close search overlay when clicking outside
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.add('hidden');
                if (searchInput) {
                    searchInput.value = '';
                    document.getElementById('searchResults').innerHTML = '';
                }
            }
        });
    }
    
    // Search input handling
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    handleSearch(query);
                }, 300);
            } else {
                document.getElementById('searchResults').innerHTML = '';
            }
        });
        
        // Enter key to search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Close search overlay and show results in products section
                    searchOverlay.classList.add('hidden');
                    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
                    handleSearch(query);
                }
            }
        });
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroShoe = document.getElementById('heroShoe');
        
        if (heroShoe) {
            const rate = scrolled * -0.5;
            heroShoe.style.transform = `translateY(${rate}px) rotate(12deg)`;
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects to hero buttons
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
        });
        
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse');
        });
    });
    
    // Category card click effects
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent.toLowerCase().split(' ')[0];
            
            // Scroll to products section
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
            
            // Filter products
            setTimeout(() => {
                const filterBtn = document.querySelector(`[data-filter="${category}"]`) || 
                                 document.querySelector('[data-filter="all"]');
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 800);
        });
    });
}

// Forms handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Hero section functionality
function initializeHeroSection() {
    // Hero buttons functionality
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.toLowerCase();
            
            if (text.includes('shop now') || text.includes('view collection')) {
                document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Auto-rotate hero shoe
    const heroShoe = document.getElementById('heroShoe');
    if (heroShoe) {
        let rotationAngle = 0;
        setInterval(() => {
            rotationAngle += 0.5;
            if (!heroShoe.matches(':hover')) {
                heroShoe.style.transform = `rotateY(${rotationAngle}deg)`;
            }
        }, 100);
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationClass(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getNotificationIcon(type)} mr-3"></i>
            <span>${message}</span>
            <button class="ml-auto" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationClass(type) {
    const classes = {
        'success': 'bg-green-100 border border-green-400 text-green-700',
        'error': 'bg-red-100 border border-red-400 text-red-700',
        'warning': 'bg-yellow-100 border border-yellow-400 text-yellow-700',
        'info': 'bg-blue-100 border border-blue-400 text-blue-700'
    };
    return classes[type] || classes.info;
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Loading spinner utility
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('hidden');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading-shimmer');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
    
    // Prefetch important resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Show user-friendly error message for critical errors
    if (e.error && e.error.message && e.error.message.includes('cart')) {
        showNotification('There was an issue with the shopping cart. Please refresh the page.', 'error');
    }
});

// Initialize lazy loading and performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeLazyLoading();
        optimizePerformance();
    }, 1000);
});

// Export functions for global use
window.showNotification = showNotification;
window.showLoadingSpinner = showLoadingSpinner;
window.hideLoadingSpinner = hideLoadingSpinner;