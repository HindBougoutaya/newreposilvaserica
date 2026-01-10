// Silva Serica - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initProcessTimeline();
    initContactForm();
    initSilkAnimations();
    initImpactCounters();
    initParallaxEffects();
    initMarketplace();
    initAdoptionSteps();
    initKitCards();
    initMarketplaceItems();
    initSellSection();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const revealElements = document.querySelectorAll('.highlight-item, .impact-card, .gallery-item');
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
        scrollObserver.observe(element);
    });
}

// Process timeline animations
function initProcessTimeline() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    processSteps.forEach(step => {
        processObserver.observe(step);
    });
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('.vintage-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--silk-gold)' : 'var(--silk-brown)'};
        color: var(--silk-cream);
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Silk animations
function initSilkAnimations() {
    // Add floating silk threads
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        for (let i = 0; i < 5; i++) {
            const silkThread = document.createElement('div');
            silkThread.className = 'silk-decoration';
            silkThread.style.cssText = `
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 6}s;
                opacity: 0.3;
            `;
            heroSection.appendChild(silkThread);
        }
    }
    
    // Add hover effects to vintage frames
    const vintageFrames = document.querySelectorAll('.vintage-frame');
    vintageFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.boxShadow = '0 12px 35px rgba(139, 69, 19, 0.3)';
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.2)';
        });
    });
}

// Impact counters animation
function initImpactCounters() {
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Skip if already animated
                if (target.classList.contains('counted')) {
                    return;
                }
                
                target.classList.add('counted');
                
                // Parse the value
                let numericValue = finalValue.replace(/[^0-9.]/g, '');
                const suffix = finalValue.replace(/[0-9.]/g, '');
                
                // Animate counter
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (suffix === 'M') {
                        target.textContent = currentValue.toFixed(1) + suffix;
                    } else if (suffix === '%') {
                        target.textContent = Math.round(currentValue) + suffix;
                    } else {
                        target.textContent = Math.round(currentValue).toLocaleString();
                    }
                }, 30);
            }
        });
    }, {
        threshold: 0.5
    });
    
    impactNumbers.forEach(number => {
        counterObserver.observe(number);
    });
}

// Parallax effects
function initParallaxEffects() {
    const heroContent = document.querySelector('.hero-content');
    const decorativeBorder = document.querySelector('.decorative-border');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (heroContent && scrolled < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
        
        if (decorativeBorder && scrolled < window.innerHeight) {
            const borderParallaxSpeed = 0.3;
            decorativeBorder.style.transform = `translateY(${scrolled * borderParallaxSpeed}px) scale(${1 + scrolled * 0.0002})`;
        }
    });
}

// Navigation active state on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNav();

// Add active nav styling
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: var(--silk-gold) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Typewriter effect for hero title
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.vintage-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--silk-gold)';
        heroTitle.style.animation = 'blink 1s infinite';
        
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            } else {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }
        }
        
        // Add blink animation
        const blinkStyle = document.createElement('style');
        blinkStyle.textContent = `
            @keyframes blink {
                0%, 50% { border-color: var(--silk-gold); }
                51%, 100% { border-color: transparent; }
            }
        `;
        document.head.appendChild(blinkStyle);
        
        setTimeout(typeWriter, 1000);
    }
}

initTypewriterEffect();

// Explore button functionality
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.hero-content .vintage-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const visionSection = document.querySelector('#vision');
            if (visionSection) {
                const offsetTop = visionSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Gallery lightbox effect
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const frame = this.querySelector('.vintage-frame');
            const content = frame.querySelector('.placeholder-content').textContent;
            const title = this.querySelector('p').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-frame vintage-frame large-frame">
                        <div class="placeholder-content" style="font-size: 6rem;">${content}</div>
                        <div class="frame-caption">${title}</div>
                    </div>
                    <button class="close-modal vintage-btn">Close</button>
                </div>
            `;
            
            // Add modal styles
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .gallery-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(44, 24, 16, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .modal-content {
                    background: var(--silk-cream);
                    padding: 40px;
                    border-radius: 15px;
                    text-align: center;
                    border: 3px solid var(--silk-gold);
                    max-width: 600px;
                }
                
                .modal-frame {
                    width: 300px;
                    height: 300px;
                    margin: 0 auto 30px;
                }
                
                .close-modal {
                    margin-top: 20px;
                }
            `;
            document.head.appendChild(modalStyle);
            
            document.body.appendChild(modal);
            
            // Close modal
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(modalStyle);
                }, 300);
            });
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeBtn.click();
                }
            });
        });
    });
}

// Marketplace functionality
function initMarketplace() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const marketplaceItems = document.querySelectorAll('.marketplace-item');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const category = this.getAttribute('data-category');
            marketplaceItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.classList.add('show'), 100);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Initialize all items as visible
    marketplaceItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('show'), index * 100);
    });
}

// Adoption steps animation
function initAdoptionSteps() {
    const adoptionSteps = document.querySelectorAll('.adoption-step');
    
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    adoptionSteps.forEach(step => {
        stepsObserver.observe(step);
    });
}

// Kit card interactions
function initKitCards() {
    const kitCards = document.querySelectorAll('.kit-card');
    
    kitCards.forEach(card => {
        const adoptBtn = card.querySelector('.vintage-btn');
        
        if (adoptBtn) {
            adoptBtn.addEventListener('click', function() {
                const kitName = card.querySelector('h4').textContent;
                const kitPrice = card.querySelector('.kit-price').textContent;
                
                showNotification(`Thank you for your interest in the ${kitName}! Our team will contact you shortly. Price: ${kitPrice}`, 'success');
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                ripple.style.width = ripple.style.height = '20px';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        }
    });
}

// Marketplace item interactions
function initMarketplaceItems() {
    const marketplaceItems = document.querySelectorAll('.marketplace-item');
    
    marketplaceItems.forEach(item => {
        const viewBtn = item.querySelector('.view-btn');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                const itemName = item.querySelector('h4').textContent;
                const designer = item.querySelector('.designer').textContent;
                const price = item.querySelector('.item-price').textContent;
                
                // Create detailed modal
                const modal = document.createElement('div');
                modal.className = 'item-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>${itemName}</h3>
                            <button class="close-modal">×</button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-image">
                                <div class="vintage-frame large-frame">
                                    <div class="placeholder-content" style="font-size: 5rem;">${item.querySelector('.placeholder-content').textContent}</div>
                                </div>
                            </div>
                            <div class="modal-details">
                                <p class="designer-info">${designer}</p>
                                <p class="price-info">${price}</p>
                                <p class="description">Exquisite Victorian-inspired silk creation, handcrafted with care and attention to detail. Perfect for special occasions or adding elegance to your everyday style.</p>
                                <div class="modal-actions">
                                    <button class="vintage-btn purchase-btn">Purchase</button>
                                    <button class="vintage-btn inquiry-btn">Make Inquiry</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add modal styles
                const modalStyle = document.createElement('style');
                modalStyle.textContent = `
                    .item-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(44, 24, 16, 0.9);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                        opacity: 0;
                        animation: fadeIn 0.3s ease forwards;
                    }
                    
                    .modal-content {
                        background: var(--silk-cream);
                        border-radius: 20px;
                        border: 3px solid var(--silk-gold);
                        max-width: 800px;
                        max-height: 90vh;
                        overflow-y: auto;
                        margin: 20px;
                    }
                    
                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 30px;
                        border-bottom: 1px solid var(--silk-gold);
                    }
                    
                    .modal-header h3 {
                        font-family: 'Playfair Display', serif;
                        font-size: 2rem;
                        color: var(--silk-dark-brown);
                    }
                    
                    .close-modal {
                        background: none;
                        border: none;
                        font-size: 2rem;
                        color: var(--silk-brown);
                        cursor: pointer;
                        transition: color 0.3s ease;
                    }
                    
                    .close-modal:hover {
                        color: var(--silk-gold);
                    }
                    
                    .modal-body {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 40px;
                        padding: 30px;
                    }
                    
                    .modal-image .vintage-frame {
                        width: 250px;
                        height: 250px;
                        margin: 0 auto;
                    }
                    
                    .designer-info {
                        font-style: italic;
                        color: var(--silk-sepia);
                        margin-bottom: 10px;
                    }
                    
                    .price-info {
                        font-family: 'Playfair Display', serif;
                        font-size: 1.8rem;
                        color: var(--silk-gold);
                        font-weight: 700;
                        margin-bottom: 20px;
                    }
                    
                    .description {
                        line-height: 1.8;
                        color: var(--silk-ink);
                        margin-bottom: 30px;
                    }
                    
                    .modal-actions {
                        display: flex;
                        gap: 20px;
                    }
                    
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                
                if (!document.querySelector('style[data-item-modal]')) {
                    modalStyle.setAttribute('data-item-modal', 'true');
                    document.head.appendChild(modalStyle);
                }
                
                document.body.appendChild(modal);
                
                // Close modal functionality
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', () => {
                    modal.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => modal.remove(), 300);
                });
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeBtn.click();
                    }
                });
                
                // Purchase and inquiry buttons
                const purchaseBtn = modal.querySelector('.purchase-btn');
                const inquiryBtn = modal.querySelector('.inquiry-btn');
                
                purchaseBtn.addEventListener('click', () => {
                    showNotification(`Purchase initiated for ${itemName}. You will be redirected to payment.`, 'success');
                    setTimeout(() => closeBtn.click(), 2000);
                });
                
                inquiryBtn.addEventListener('click', () => {
                    showNotification(`Inquiry sent for ${itemName}. The designer will contact you soon.`, 'success');
                    setTimeout(() => closeBtn.click(), 2000);
                });
            });
        }
    });
}

// Sell section functionality
function initSellSection() {
    const sellBtn = document.querySelector('.sell-section .vintage-btn');
    
    if (sellBtn) {
        sellBtn.addEventListener('click', function() {
            showNotification('Welcome to our seller community! Please register your design studio to start selling.', 'success');
            
            // Create registration form modal
            const modal = document.createElement('div');
            modal.className = 'seller-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Register Your Design Studio</h3>
                        <button class="close-modal">×</button>
                    </div>
                    <div class="modal-body">
                        <form class="seller-form">
                            <div class="form-group">
                                <input type="text" placeholder="Studio Name" required>
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="Email Address" required>
                            </div>
                            <div class="form-group">
                                <input type="tel" placeholder="Phone Number" required>
                            </div>
                            <div class="form-group">
                                <textarea placeholder="Tell us about your Victorian modern designs..." rows="4" required></textarea>
                            </div>
                            <button type="submit" class="vintage-btn">Submit Application</button>
                        </form>
                    </div>
                </div>
            `;
            
            // Add styles for seller modal
            const sellerModalStyle = document.createElement('style');
            sellerModalStyle.textContent = `
                .seller-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(44, 24, 16, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .seller-modal .modal-content {
                    background: var(--silk-cream);
                    border-radius: 20px;
                    border: 3px solid var(--silk-gold);
                    max-width: 500px;
                    margin: 20px;
                }
                
                .seller-modal .modal-header {
                    padding: 30px;
                    border-bottom: 1px solid var(--silk-gold);
                    text-align: center;
                }
                
                .seller-modal .modal-body {
                    padding: 30px;
                }
                
                .seller-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
            `;
            
            if (!document.querySelector('style[data-seller-modal]')) {
                sellerModalStyle.setAttribute('data-seller-modal', 'true');
                document.head.appendChild(sellerModalStyle);
            }
            
            document.body.appendChild(modal);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => modal.remove(), 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeBtn.click();
                }
            });
            
            // Form submission
            const form = modal.querySelector('.seller-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('Application submitted successfully! We will review your studio within 48 hours.', 'success');
                setTimeout(() => closeBtn.click(), 2000);
            });
        });
    }
}


initGalleryLightbox();

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// Vintage loading effect
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Interactive hover effects for impact cards
document.addEventListener('DOMContentLoaded', function() {
    const impactCards = document.querySelectorAll('.impact-card');
    
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const number = this.querySelector('.impact-number');
            if (number) {
                number.style.transform = 'scale(1.1)';
                number.style.color = 'var(--silk-brass)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const number = this.querySelector('.impact-number');
            if (number) {
                number.style.transform = 'scale(1)';
                number.style.color = 'var(--silk-gold)';
            }
        });
    });
});

// Process step hover effects
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const stepNumber = this.querySelector('.step-number');
            const stepContent = this.querySelector('.step-content');
            
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1.1) rotate(10deg)';
                stepNumber.style.background = 'var(--silk-brass)';
            }
            
            if (stepContent) {
                stepContent.style.transform = 'scale(1.02)';
                stepContent.style.boxShadow = '0 12px 35px rgba(139, 69, 19, 0.2)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const stepNumber = this.querySelector('.step-number');
            const stepContent = this.querySelector('.step-content');
            
            if (stepNumber) {
                stepNumber.style.transform = 'scale(1) rotate(0deg)';
                stepNumber.style.background = 'var(--silk-gold)';
            }
            
            if (stepContent) {
                stepContent.style.transform = 'scale(1)';
                stepContent.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.1)';
            }
        });
    });
});

// Mobile menu toggle (for responsive design)
function initMobileMenu() {
    const nav = document.querySelector('.vintage-nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 20px;
            background: var(--silk-gold);
            color: var(--silk-cream);
            border: none;
            padding: 10px 15px;
            font-size: 1.5rem;
            cursor: pointer;
            border-radius: 5px;
            z-index: 1001;
        `;
        
        nav.appendChild(mobileMenuBtn);
        
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(244, 232, 208, 0.98)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '20px';
            navMenu.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.2)';
        });
    }
}

// Initialize mobile menu
initMobileMenu();

// Window resize handler
window.addEventListener('resize', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768 && mobileMenuBtn) {
        mobileMenuBtn.remove();
        navMenu.style.display = 'flex';
        navMenu.style.position = 'static';
        navMenu.style.background = 'transparent';
        navMenu.style.flexDirection = 'row';
        navMenu.style.padding = '0';
        navMenu.style.boxShadow = 'none';
    }
});

// Add silk thread cursor trail effect
function initSilkCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursorTrail);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorTrail.style.transform = `translate(${trailX - 10}px, ${trailY - 10}px)`;
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize silk cursor trail on desktop
if (window.innerWidth > 768) {
    initSilkCursorTrail();
}
