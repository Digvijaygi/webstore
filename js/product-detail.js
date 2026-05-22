// Product Detail Page JavaScript for 3D Shoes Website

class ProductDetailPage {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.productId = null;
        this.product = null;
        this.selectedSize = null;
        this.selectedColor = null;
        this.quantity = 1;
        this.currentImageIndex = 0;
        this.isWishlisted = false;
        this.rotationAngle = 0;
        this.autoRotating = false;
        
        // Demo products data
        this.demoProducts = {
            'nike-air-max-270': {
                id: 'nike-air-max-270',
                name: 'Nike Air Max 270 React',
                brand: 'Nike',
                price: 12999,
                originalPrice: 15999,
                rating: 4.5,
                reviews: 128,
                category: 'sports',
                inStock: true,
                stockCount: 5,
                images: [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                colors: [
                    { name: 'Black/White', value: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    { name: 'Navy/Blue', value: '#1e3a8a', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    { name: 'Red/Black', value: '#dc2626', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                ],
                sizes: ['7', '8', '9', '10', '11', '12'],
                description: `
                    <p class="mb-4">Experience unparalleled comfort and style with the Nike Air Max 270 React. This innovative sneaker combines Nike's legendary Air Max cushioning with React foam technology to deliver exceptional comfort and energy return with every step.</p>
                    
                    <h4 class="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <ul class="list-disc list-inside space-y-1 mb-4">
                        <li>Air Max 270 unit provides maximum cushioning</li>
                        <li>React foam midsole for lightweight comfort</li>
                        <li>Breathable mesh upper with synthetic overlays</li>
                        <li>Rubber outsole with waffle pattern for traction</li>
                        <li>Pull tabs for easy on and off</li>
                    </ul>
                    
                    <p>Perfect for running, training, or casual wear, the Air Max 270 React is designed for those who demand both performance and style.</p>
                `,
                specifications: {
                    'Upper Material': 'Mesh and synthetic leather',
                    'Midsole': 'React foam with Air Max 270 unit',
                    'Outsole': 'Rubber with waffle pattern',
                    'Closure': 'Lace-up',
                    'Weight': '310g (Size 9)',
                    'Drop': '8mm',
                    'Support': 'Neutral',
                    'Surface': 'Road'
                },
                keyFeatures: [
                    { icon: 'fa-wind', title: 'Breathable', description: 'Mesh upper for ventilation' },
                    { icon: 'fa-shield-alt', title: 'Durable', description: 'High-quality materials' },
                    { icon: 'fa-feather-alt', title: 'Lightweight', description: 'React foam technology' },
                    { icon: 'fa-running', title: 'Comfort', description: 'Air Max cushioning' }
                ],
                reviews: [
                    {
                        id: 1,
                        name: 'Rahul Sharma',
                        rating: 5,
                        date: '2024-01-15',
                        title: 'Amazing comfort!',
                        comment: 'These shoes are incredibly comfortable. Perfect for my daily runs and they look great too!'
                    },
                    {
                        id: 2,
                        name: 'Priya Patel',
                        rating: 4,
                        date: '2024-01-10',
                        title: 'Great style',
                        comment: 'Love the design and color options. Very satisfied with the quality.'
                    }
                ]
            },
            'adidas-ultraboost': {
                id: 'adidas-ultraboost',
                name: 'Adidas Ultraboost 22',
                brand: 'Adidas',
                price: 16999,
                originalPrice: 19999,
                rating: 4.7,
                reviews: 256,
                category: 'sports',
                inStock: true,
                stockCount: 8,
                images: [
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                colors: [
                    { name: 'White/Black', value: '#ffffff', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                ],
                sizes: ['7', '8', '9', '10', '11', '12'],
                description: `
                    <p class="mb-4">The most responsive running shoe with incredible energy return. Featuring Boost technology and a Primeknit upper.</p>
                `,
                specifications: {
                    'Upper Material': 'Primeknit',
                    'Midsole': 'Boost foam',
                    'Outsole': 'Continental rubber',
                    'Drop': '10mm'
                },
                keyFeatures: [
                    { icon: 'fa-bolt', title: 'Energy Return', description: 'Boost technology' },
                    { icon: 'fa-wind', title: 'Breathable', description: 'Primeknit upper' }
                ],
                reviews: []
            },
            'puma-rs-x': {
                id: 'puma-rs-x',
                name: 'Puma RS-X',
                brand: 'Puma',
                price: 8500,
                originalPrice: 10000,
                rating: 4.2,
                reviews: 67,
                category: 'casual',
                inStock: true,
                stockCount: 12,
                images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'White/Black', value: '#ffffff', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Retro-inspired sneakers with bold design and superior comfort.</p>',
                specifications: { 'Upper': 'Synthetic mesh', 'Midsole': 'RS foam', 'Outsole': 'Rubber' },
                keyFeatures: [{ icon: 'fa-star', title: 'Retro Style', description: 'Bold design' }],
                reviews: []
            },
            'clarks-desert-boot': {
                id: 'clarks-desert-boot',
                name: 'Clarks Desert Boot',
                brand: 'Clarks',
                price: 14000,
                originalPrice: 16000,
                rating: 4.4,
                reviews: 45,
                category: 'formal',
                inStock: true,
                stockCount: 10,
                images: ['https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Brown', value: '#8B4513', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Classic desert boots with premium suede construction and crepe sole.</p>',
                specifications: { 'Upper': 'Premium suede', 'Sole': 'Crepe', 'Closure': 'Lace-up' },
                keyFeatures: [{ icon: 'fa-gem', title: 'Premium', description: 'Suede construction' }],
                reviews: []
            },
            'converse-chuck-taylor': {
                id: 'converse-chuck-taylor',
                name: 'Converse Chuck Taylor',
                brand: 'Converse',
                price: 5500,
                originalPrice: 6500,
                rating: 4.6,
                reviews: 234,
                category: 'casual',
                inStock: true,
                stockCount: 15,
                images: ['https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['5', '6', '7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Iconic high-top sneakers with timeless appeal. A wardrobe essential since 1917.</p>',
                specifications: { 'Upper': 'Canvas', 'Sole': 'Natural rubber', 'Closure': 'Lace-up' },
                keyFeatures: [{ icon: 'fa-star', title: 'Iconic', description: 'Since 1917' }],
                reviews: []
            },
            'new-balance-990': {
                id: 'new-balance-990',
                name: 'New Balance 990v5',
                brand: 'New Balance',
                price: 18000,
                originalPrice: 20000,
                rating: 4.8,
                reviews: 156,
                category: 'sports',
                inStock: true,
                stockCount: 6,
                images: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Gray', value: '#9CA3AF', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Made in USA premium running shoes with ENCAP cushioning for superior support and comfort.</p>',
                specifications: { 'Upper': 'Pigskin/mesh', 'Midsole': 'ENCAP', 'Origin': 'Made in USA' },
                keyFeatures: [{ icon: 'fa-flag', title: 'Made in USA', description: 'Premium quality' }],
                reviews: []
            },
            'vans-old-skool': {
                id: 'vans-old-skool',
                name: 'Vans Old Skool',
                brand: 'Vans',
                price: 4500,
                originalPrice: 5500,
                rating: 4.3,
                reviews: 189,
                category: 'casual',
                inStock: true,
                stockCount: 20,
                images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Black/White', value: '#000000', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['5', '6', '7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Classic skate shoes with the signature Vans side stripe. The original skate shoe.</p>',
                specifications: { 'Upper': 'Canvas/suede', 'Sole': 'Waffle rubber', 'Style': 'Low-top' },
                keyFeatures: [{ icon: 'fa-skating', title: 'Skate Ready', description: 'Waffle sole grip' }],
                reviews: []
            },
            'dr-martens-1460': {
                id: 'dr-martens-1460',
                name: 'Dr. Martens 1460',
                brand: 'Dr. Martens',
                price: 16500,
                originalPrice: 18500,
                rating: 4.5,
                reviews: 92,
                category: 'formal',
                inStock: true,
                stockCount: 8,
                images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Black', value: '#000000', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['6', '7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Iconic leather boots with air-cushioned sole. Built to last a lifetime.</p>',
                specifications: { 'Upper': 'Smooth leather', 'Sole': 'AirWair air-cushioned', 'Height': '8-eye boot' },
                keyFeatures: [{ icon: 'fa-shield-alt', title: 'Durable', description: 'Built to last' }],
                reviews: []
            },
            'jordan-air-jordan-1': {
                id: 'jordan-air-jordan-1',
                name: 'Jordan Air Jordan 1',
                brand: 'Jordan',
                price: 22000,
                originalPrice: 25000,
                rating: 4.9,
                reviews: 312,
                category: 'sports',
                inStock: true,
                stockCount: 4,
                images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Black/Red', value: '#dc2626', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Legendary basketball shoes that started a revolution. Premium leather upper with iconic Nike Air cushioning.</p>',
                specifications: { 'Upper': 'Premium leather', 'Midsole': 'Nike Air', 'Style': 'High-top' },
                keyFeatures: [{ icon: 'fa-basketball-ball', title: 'Basketball', description: 'Court performance' }],
                reviews: []
            },
            'reebok-classic-leather': {
                id: 'reebok-classic-leather',
                name: 'Reebok Classic Leather',
                brand: 'Reebok',
                price: 6500,
                originalPrice: 7500,
                rating: 4.1,
                reviews: 78,
                category: 'casual',
                inStock: true,
                stockCount: 14,
                images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'White', value: '#ffffff', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['6', '7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Retro running shoes with soft garment leather upper. A timeless classic.</p>',
                specifications: { 'Upper': 'Garment leather', 'Sole': 'EVA midsole', 'Style': 'Low-top' },
                keyFeatures: [{ icon: 'fa-history', title: 'Classic', description: 'Timeless design' }],
                reviews: []
            },
            'gucci-ace-sneakers': {
                id: 'gucci-ace-sneakers',
                name: 'Gucci Ace Sneakers',
                brand: 'Gucci',
                price: 45000,
                originalPrice: 50000,
                rating: 4.6,
                reviews: 34,
                category: 'formal',
                inStock: true,
                stockCount: 3,
                images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'White', value: '#ffffff', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['6', '7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Luxury leather sneakers with iconic bee embroidery. The pinnacle of Italian craftsmanship.</p>',
                specifications: { 'Upper': 'Italian leather', 'Sole': 'Rubber', 'Origin': 'Made in Italy' },
                keyFeatures: [{ icon: 'fa-crown', title: 'Luxury', description: 'Italian craftsmanship' }],
                reviews: []
            },
            'allbirds-tree-runners': {
                id: 'allbirds-tree-runners',
                name: 'Allbirds Tree Runners',
                brand: 'Allbirds',
                price: 9500,
                originalPrice: 11000,
                rating: 4.4,
                reviews: 167,
                category: 'casual',
                inStock: true,
                stockCount: 9,
                images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                colors: [{ name: 'Gray', value: '#9CA3AF', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }],
                sizes: ['5', '6', '7', '8', '9', '10', '11', '12'],
                description: '<p class="mb-4">Sustainable sneakers made from eucalyptus tree fiber. Good for your feet and the planet.</p>',
                specifications: { 'Upper': 'Eucalyptus fiber', 'Midsole': 'SweetFoam (sugarcane)', 'Carbon Footprint': '7.6 kg CO2e' },
                keyFeatures: [{ icon: 'fa-leaf', title: 'Sustainable', description: 'Eco-friendly materials' }],
                reviews: []
            }
        };

        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.getProductIdFromUrl();
        this.bindEvents();
        this.loadProduct();
    }

    checkLoginStatus() {
        const userData = localStorage.getItem('3dshoes_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            } catch (e) {
                console.error('Error parsing user data:', e);
            }
        }
    }

    getProductIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id') || 'nike-air-max-270';
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.product-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Quantity controls
        document.getElementById('decreaseQty').addEventListener('click', () => this.changeQuantity(-1));
        document.getElementById('increaseQty').addEventListener('click', () => this.changeQuantity(1));

        // Action buttons
        document.getElementById('addToCartBtn').addEventListener('click', () => this.addToCart());
        document.getElementById('buyNowBtn').addEventListener('click', () => this.buyNow());
        document.getElementById('wishlistBtn').addEventListener('click', () => this.toggleWishlist());

        // 360° view
        document.getElementById('view360Btn').addEventListener('click', () => this.show360View());
        document.getElementById('close360Modal').addEventListener('click', () => this.close360View());
        document.getElementById('autoRotateBtn').addEventListener('click', () => this.toggleAutoRotate());

        // Write review
        document.getElementById('writeReviewBtn').addEventListener('click', () => this.showWriteReviewModal());
    }

    loadProduct() {
        this.product = this.demoProducts[this.productId];
        
        if (!this.product) {
            this.showProductNotFound();
            return;
        }

        this.displayProduct();
        this.checkWishlistStatus();
        this.updateCartCount();
    }

    showProductNotFound() {
        document.getElementById('productNotFound').classList.remove('hidden');
        document.getElementById('productDetails').classList.add('hidden');
    }

    displayProduct() {
        const p = this.product;
        
        // Hide not found, show details
        document.getElementById('productNotFound').classList.add('hidden');
        document.getElementById('productDetails').classList.remove('hidden');

        // Basic info
        document.getElementById('breadcrumbProduct').textContent = p.name;
        document.getElementById('productBrand').textContent = p.brand;
        document.getElementById('productName').textContent = p.name;
        document.getElementById('currentPrice').textContent = `₹${p.price.toLocaleString()}`;
        
        // Pricing
        if (p.originalPrice) {
            document.getElementById('originalPrice').classList.remove('hidden');
            document.getElementById('originalPrice').textContent = `₹${p.originalPrice.toLocaleString()}`;
            document.getElementById('savingsAmount').classList.remove('hidden');
            document.getElementById('savingsAmount').textContent = `Save ₹${(p.originalPrice - p.price).toLocaleString()}`;
            
            const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
            document.getElementById('discountBadge').textContent = `${discount}% OFF`;
            document.getElementById('discountBadge').classList.remove('hidden');
        }

        // EMI info
        const emiAmount = Math.round(p.price / 24);
        document.getElementById('emiInfo').textContent = `EMI starting from ₹${emiAmount}/month`;

        // Stock info
        document.getElementById('stockCount').textContent = p.stockCount;
        if (!p.inStock) {
            document.getElementById('stockStatus').innerHTML = `
                <i class="fas fa-times-circle text-red-600 mr-2"></i>
                <span class="text-red-600 font-semibold">Out of Stock</span>
            `;
        }

        // Rating
        this.displayRating(p.rating, p.reviews);

        // Images
        this.displayImages();

        // Sizes and colors
        this.displaySizeOptions();
        this.displayColorOptions();

        // Key features
        this.displayKeyFeatures();

        // Description and tabs
        this.loadTabContent();

        // Load related products
        this.loadRelatedProducts();
    }

    displayRating(rating, reviewCount) {
        const ratingContainer = document.getElementById('productRating');
        ratingContainer.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            if (i <= Math.floor(rating)) {
                star.className = 'fas fa-star';
            } else if (i - 0.5 <= rating) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
            ratingContainer.appendChild(star);
        }

        document.getElementById('ratingText').textContent = `${rating} (${reviewCount} reviews)`;
    }

    displayImages() {
        const mainImage = document.getElementById('mainProductImage');
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        
        // Set main image
        mainImage.src = this.product.images[0];
        mainImage.alt = this.product.name;

        // Create thumbnails
        thumbnailContainer.innerHTML = '';
        this.product.images.forEach((image, index) => {
            const thumbnail = document.createElement('button');
            thumbnail.className = `w-20 h-20 border-2 rounded-lg overflow-hidden hover:border-blue-500 transition-colors ${index === 0 ? 'border-blue-500' : 'border-gray-200'}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}" class="w-full h-full object-cover">`;
            
            thumbnail.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateMainImage();
                this.updateThumbnailSelection();
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
    }

    updateMainImage() {
        const mainImage = document.getElementById('mainProductImage');
        mainImage.src = this.product.images[this.currentImageIndex];
    }

    updateThumbnailSelection() {
        const thumbnails = document.querySelectorAll('#thumbnailContainer button');
        thumbnails.forEach((thumb, index) => {
            if (index === this.currentImageIndex) {
                thumb.classList.add('border-blue-500');
                thumb.classList.remove('border-gray-200');
            } else {
                thumb.classList.remove('border-blue-500');
                thumb.classList.add('border-gray-200');
            }
        });
    }

    displaySizeOptions() {
        const sizeContainer = document.getElementById('sizeOptions');
        sizeContainer.innerHTML = '';

        this.product.sizes.forEach(size => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-option p-3 border-2 border-gray-200 rounded-lg font-semibold hover:border-blue-500 transition-colors';
            sizeBtn.textContent = size;
            sizeBtn.dataset.size = size;
            
            sizeBtn.addEventListener('click', () => {
                this.selectSize(size);
            });
            
            sizeContainer.appendChild(sizeBtn);
        });
    }

    displayColorOptions() {
        const colorContainer = document.getElementById('colorOptions');
        colorContainer.innerHTML = '';

        this.product.colors.forEach(color => {
            const colorBtn = document.createElement('button');
            colorBtn.className = 'color-option w-12 h-12 rounded-full border-4 border-gray-200 hover:border-gray-400 transition-colors';
            colorBtn.style.backgroundColor = color.value;
            colorBtn.title = color.name;
            colorBtn.dataset.color = color.name;
            
            colorBtn.addEventListener('click', () => {
                this.selectColor(color);
            });
            
            colorContainer.appendChild(colorBtn);
        });

        // Select first color by default
        if (this.product.colors.length > 0) {
            this.selectColor(this.product.colors[0]);
        }
    }

    selectSize(size) {
        this.selectedSize = size;
        
        // Update UI
        document.querySelectorAll('.size-option').forEach(btn => {
            if (btn.dataset.size === size) {
                btn.classList.remove('border-gray-200');
                btn.classList.add('border-blue-500', 'bg-blue-50');
            } else {
                btn.classList.remove('border-blue-500', 'bg-blue-50');
                btn.classList.add('border-gray-200');
            }
        });
    }

    selectColor(color) {
        this.selectedColor = color.name;
        
        // Update UI
        document.querySelectorAll('.color-option').forEach(btn => {
            if (btn.dataset.color === color.name) {
                btn.classList.remove('border-gray-200');
                btn.classList.add('border-blue-500');
            } else {
                btn.classList.remove('border-blue-500');
                btn.classList.add('border-gray-200');
            }
        });

        // Update main image if color has specific image
        if (color.image) {
            document.getElementById('mainProductImage').src = color.image;
        }
    }

    displayKeyFeatures() {
        const featuresContainer = document.getElementById('keyFeatures');
        featuresContainer.innerHTML = '';

        this.product.keyFeatures.forEach(feature => {
            const featureDiv = document.createElement('div');
            featureDiv.className = 'flex items-center space-x-3';
            featureDiv.innerHTML = `
                <i class="fas ${feature.icon} text-blue-600"></i>
                <div>
                    <span class="font-semibold text-gray-800">${feature.title}:</span>
                    <span class="text-gray-600">${feature.description}</span>
                </div>
            `;
            featuresContainer.appendChild(featureDiv);
        });
    }

    changeQuantity(change) {
        const newQuantity = this.quantity + change;
        if (newQuantity >= 1 && newQuantity <= this.product.stockCount) {
            this.quantity = newQuantity;
            document.getElementById('quantity').textContent = this.quantity;
        }
    }

    addToCart() {
        if (!this.selectedSize) {
            this.showNotification('Please select a size', 'warning');
            return;
        }

        if (!this.product.inStock) {
            this.showNotification('Product is out of stock', 'error');
            return;
        }

        // Add to cart
        let cart = JSON.parse(localStorage.getItem('3dshoes_cart') || '[]');
        
        const cartItem = {
            id: this.product.id,
            name: this.product.name,
            brand: this.product.brand,
            price: this.product.price,
            image: this.product.images[0],
            size: this.selectedSize,
            color: this.selectedColor,
            quantity: this.quantity
        };

        const existingItemIndex = cart.findIndex(item => 
            item.id === cartItem.id && 
            item.size === cartItem.size && 
            item.color === cartItem.color
        );

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += this.quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('3dshoes_cart', JSON.stringify(cart));
        this.updateCartCount();
        this.showNotification('Product added to cart!', 'success');
    }

    buyNow() {
        this.addToCart();
        // Redirect to checkout
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 1000);
    }

    toggleWishlist() {
        if (!this.isLoggedIn) {
            this.showNotification('Please login to add to wishlist', 'warning');
            return;
        }

        let wishlist = JSON.parse(localStorage.getItem('3dshoes_wishlist') || '[]');
        const wishlistBtn = document.getElementById('wishlistBtn');
        const icon = wishlistBtn.querySelector('i');

        if (this.isWishlisted) {
            // Remove from wishlist
            wishlist = wishlist.filter(item => item.id !== this.product.id);
            this.isWishlisted = false;
            icon.className = 'far fa-heart text-xl';
            this.showNotification('Removed from wishlist', 'success');
        } else {
            // Add to wishlist
            const wishlistItem = {
                ...this.product,
                addedDate: new Date().toISOString()
            };
            wishlist.push(wishlistItem);
            this.isWishlisted = true;
            icon.className = 'fas fa-heart text-xl text-red-500';
            this.showNotification('Added to wishlist!', 'success');
        }

        localStorage.setItem('3dshoes_wishlist', JSON.stringify(wishlist));
    }

    checkWishlistStatus() {
        if (this.isLoggedIn) {
            const wishlist = JSON.parse(localStorage.getItem('3dshoes_wishlist') || '[]');
            this.isWishlisted = wishlist.some(item => item.id === this.product.id);
            
            if (this.isWishlisted) {
                const icon = document.getElementById('wishlistBtn').querySelector('i');
                icon.className = 'fas fa-heart text-xl text-red-500';
            }
        }
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('3dshoes_cart') || '[]');
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        
        if (count > 0) {
            cartCountElement.textContent = count;
            cartCountElement.classList.remove('hidden');
        } else {
            cartCountElement.classList.add('hidden');
        }
    }

    switchTab(tabName) {
        // Remove active class from all tabs
        document.querySelectorAll('.product-tab').forEach(tab => {
            tab.classList.remove('border-blue-600', 'text-blue-600');
            tab.classList.add('border-transparent', 'text-gray-700');
        });

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Activate selected tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}Tab`);

        if (activeTab && activeContent) {
            activeTab.classList.remove('border-transparent', 'text-gray-700');
            activeTab.classList.add('border-blue-600', 'text-blue-600');
            activeContent.classList.remove('hidden');
        }
    }

    loadTabContent() {
        // Description
        document.getElementById('productDescription').innerHTML = this.product.description;

        // Specifications
        this.loadSpecifications();

        // Reviews
        this.loadReviews();
    }

    loadSpecifications() {
        const specsContainer = document.getElementById('productSpecifications');
        specsContainer.innerHTML = '<h3 class="text-lg font-semibold text-gray-800 mb-4">Technical Specifications</h3>';
        
        const specsTable = document.createElement('div');
        specsTable.className = 'space-y-3';
        
        Object.entries(this.product.specifications).forEach(([key, value]) => {
            const row = document.createElement('div');
            row.className = 'flex justify-between py-2 border-b border-gray-200';
            row.innerHTML = `
                <span class="font-semibold text-gray-700">${key}:</span>
                <span class="text-gray-600">${value}</span>
            `;
            specsTable.appendChild(row);
        });
        
        specsContainer.appendChild(specsTable);
    }

    loadReviews() {
        // Update review count
        document.getElementById('reviewCount').textContent = `(${this.product.reviews.length})`;
        document.getElementById('totalReviews').textContent = this.product.reviews.length;
        document.getElementById('avgRating').textContent = this.product.rating;

        // Display rating stars
        this.displayRatingStars('avgRatingStars', this.product.rating);

        // Display rating breakdown
        this.displayRatingBreakdown();

        // Display reviews
        this.displayReviewsList();
    }

    displayRatingStars(containerId, rating) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            if (i <= Math.floor(rating)) {
                star.className = 'fas fa-star';
            } else if (i - 0.5 <= rating) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
            container.appendChild(star);
        }
    }

    displayRatingBreakdown() {
        const breakdownContainer = document.getElementById('ratingBreakdown');
        breakdownContainer.innerHTML = '';

        // Calculate rating distribution (mock data)
        const distribution = [
            { stars: 5, count: 80, percentage: 63 },
            { stars: 4, count: 30, percentage: 23 },
            { stars: 3, count: 12, percentage: 9 },
            { stars: 2, count: 4, percentage: 3 },
            { stars: 1, count: 2, percentage: 2 }
        ];

        distribution.forEach(item => {
            const row = document.createElement('div');
            row.className = 'flex items-center space-x-3';
            row.innerHTML = `
                <span class="text-sm font-semibold w-8">${item.stars}★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-400 h-2 rounded-full" style="width: ${item.percentage}%"></div>
                </div>
                <span class="text-sm text-gray-600 w-8">${item.count}</span>
            `;
            breakdownContainer.appendChild(row);
        });
    }

    displayReviewsList() {
        const reviewsList = document.getElementById('reviewsList');
        
        if (this.product.reviews.length === 0) {
            reviewsList.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-comment text-4xl mb-4"></i>
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            `;
            return;
        }

        reviewsList.innerHTML = this.product.reviews.map(review => `
            <div class="border border-gray-200 rounded-lg p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-semibold text-gray-800">${review.name}</h4>
                        <div class="flex text-yellow-400 text-sm mb-1">
                            ${Array.from({ length: 5 }, (_, i) => 
                                `<i class="fas fa-star${i < review.rating ? '' : ' opacity-30'}"></i>`
                            ).join('')}
                        </div>
                        <p class="text-sm text-gray-600">${new Date(review.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <h5 class="font-semibold text-gray-800 mb-2">${review.title}</h5>
                <p class="text-gray-700">${review.comment}</p>
            </div>
        `).join('');
    }

    loadRelatedProducts() {
        const relatedContainer = document.getElementById('relatedProducts');
        
        // Get other products from demo data (excluding current)
        const related = Object.values(this.demoProducts)
            .filter(p => p.id !== this.product.id)
            .slice(0, 4);

        relatedContainer.innerHTML = related.map(product => `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
                 onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.images[0]}" alt="${product.name}" 
                     class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="p-4">
                    <h3 class="font-semibold text-gray-800 mb-2">${product.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">${product.brand}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-blue-600">₹${product.price.toLocaleString()}</span>
                        <div class="flex text-yellow-400 text-sm">
                            ${Array.from({ length: 5 }, (_, i) => 
                                `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : ' opacity-30'}"></i>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    show360View() {
        document.getElementById('view360Modal').classList.remove('hidden');
        document.getElementById('view360Image').src = this.product.images[0];
        this.rotationAngle = 0;
        this.updateRotationAngle();
    }

    close360View() {
        document.getElementById('view360Modal').classList.add('hidden');
        this.stopAutoRotate();
    }

    toggleAutoRotate() {
        const btn = document.getElementById('autoRotateBtn');
        
        if (this.autoRotating) {
            this.stopAutoRotate();
            btn.innerHTML = '<i class="fas fa-play mr-2"></i>Auto Rotate';
        } else {
            this.startAutoRotate();
            btn.innerHTML = '<i class="fas fa-pause mr-2"></i>Stop Rotation';
        }
    }

    startAutoRotate() {
        this.autoRotating = true;
        this.rotationInterval = setInterval(() => {
            this.rotationAngle = (this.rotationAngle + 5) % 360;
            this.updateRotationAngle();
        }, 100);
    }

    stopAutoRotate() {
        this.autoRotating = false;
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }

    updateRotationAngle() {
        document.getElementById('rotationAngle').textContent = `${Math.round(this.rotationAngle)}°`;
        
        // In a real implementation, you would change the image based on rotation angle
        // For demo, we'll just show the rotation value
    }

    showWriteReviewModal() {
        if (!this.isLoggedIn) {
            this.showNotification('Please login to write a review', 'warning');
            return;
        }

        // Create and show review modal (simplified for demo)
        this.showNotification('Review feature coming soon!', 'info');
    }

    // Utility function
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white',
            warning: 'bg-yellow-500 text-black'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
    }

    removeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
}

// Initialize product detail page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.productDetailPage = new ProductDetailPage();
});