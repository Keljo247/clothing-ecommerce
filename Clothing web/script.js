// ===== SAMPLE PRODUCT DATA ===== 
// This array contains sample clothing products for the featured collection
const products = [
    {
        id: 1,
        name: "Sample T-Shirt",
        description: "Premium quality, comfortable fit",
        price: "150 PHP",
        image: "photosample.png",
        badge: "New"
    },
    {
        id: 2,
        name: "Sample Hoodie",
        description: "100% organic cotton, breathable",
        price: "49.99 PHP",
        image: "photosample.png",
        badge: "Best Seller"
    },
    {
        id: 3,
        name: "Sample Jacket",
        description: "Vintage-inspired, tailored fit",
        price: "129.99 PHP",
        image: "photosample.png",
        badge: ""
    },
    {
        id: 4,
        name: "Sample Hat",
        description: "Modern streetwear, multiple pockets",
        price: "99.99 PHP",
        image: "photosample.png",
        badge: "Sale"
    },
    {
        id: 5,
        name: "Sample shorts",
        description: "Premium Italian wool, warm & cozy",
        price: "119.99 PHP",
        image: "photosample.png",
        badge: ""
    },
    {
        id: 6,
        name: "Sample Pants",
        description: "Lightweight, perfect for layering",
        price: "109.99 PHP",
        image: "photosample.png",
        badge: "Limited"
    }
];

// ===== DOM ELEMENTS =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navbar = document.getElementById('navbar');
const navLink = document.querySelectorAll('.nav-link');
const productsGrid = document.getElementById('productsGrid');
const shopBtn = document.getElementById('shopBtn');

// ===== HAMBURGER MENU FUNCTIONALITY =====
/**
 * Toggle mobile navigation menu when hamburger icon is clicked
 */
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger lines
    const lines = hamburger.querySelectorAll('span');
    lines[0].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(45deg) translateY(10px)' 
        : 'rotate(0) translateY(0)';
    lines[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    lines[2].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(-45deg) translateY(-10px)' 
        : 'rotate(0) translateY(0)';
});

// ===== CLOSE MOBILE MENU ON LINK CLICK =====
/**
 * Close the mobile menu when a navigation link is clicked
 */
navLink.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const lines = hamburger.querySelectorAll('span');
        lines[0].style.transform = 'rotate(0) translateY(0)';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'rotate(0) translateY(0)';
    });
});

// ===== STICKY NAVBAR ON SCROLL =====
/**
 * Add scroll effect to navbar - becomes more pronounced when scrolled
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== RENDER PRODUCT CARDS =====
/**
 * Dynamically generate and display product cards from the products array
 */
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        // Create product card HTML
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        // Add event listener to "Add to Cart" button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleAddToCart(product.name);
        });
        
        // Add click animation effect
        productCard.addEventListener('click', () => {
            console.log(`Viewing product: ${product.name}`);
        });
        
        productsGrid.appendChild(productCard);
    });
}

// ===== HANDLE ADD TO CART =====
/**
 * Handle "Add to Cart" button click with visual feedback
 */
function handleAddToCart(productName) {
    // Show feedback to user
    alert(`✓ ${productName} added to cart!`);
    // In a real application, this would add the item to a shopping cart
}

// ===== SHOP NOW BUTTON =====
/**
 * Smooth scroll to products section when "Shop Now" button is clicked
 */
shopBtn.addEventListener('click', () => {
    const shopSection = document.getElementById('shop');
    shopSection.scrollIntoView({ behavior: 'smooth' });
});

// ===== SCROLL REVEAL ANIMATION =====
/**
 * Animate elements into view as they become visible on the screen
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== INITIALIZE =====
/**
 * Initialize the website on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Render products
    renderProducts();
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.product-card, .about-image, .about-content');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
    
    // Log initialization
    console.log('✓ VELORA website loaded successfully!');
    console.log('✓ Products rendered: ' + products.length);
});

// ===== KEYBOARD NAVIGATION =====
/**
 * Allow users to close mobile menu with Escape key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        
        // Reset hamburger animation
        const lines = hamburger.querySelectorAll('span');
        lines[0].style.transform = 'rotate(0) translateY(0)';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'rotate(0) translateY(0)';
    }
});

// ===== SMOOTH SCROLL OFFSET FOR FIXED NAVBAR =====
/**
 * Handle smooth scrolling with offset for fixed navigation bar
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
/**
 * Lazy load images for better performance
 */
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// ===== DEVELOPER CONSOLE WELCOME MESSAGE =====
/**
 * Display welcome message in browser console
 */
console.log('%c🎨 Welcome to VELORA', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cPremium Fashion. Bold Identity. Elevated Style.', 'font-size: 14px; color: #b0b0b0;');
console.log('%c© 2024 VELORA - All rights reserved', 'font-size: 12px; color: #666;');
