// Products Data and Management

// Sample products data
const productsData = [
    {
        id: 1,
        slug: "nike-air-max-270",
        name: "Nike Air Max 270",
        category: "sports",
        price: 12000,
        originalPrice: 15000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Revolutionary air cushioning system with modern style",
        rating: 4.5,
        reviews: 128,
        colors: ["Black", "White", "Red"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: true,
        inStock: true
    },
    {
        id: 2,
        slug: "adidas-ultraboost",
        name: "Adidas Ultraboost 22",
        category: "sports",
        price: 16000,
        originalPrice: 18000,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Premium running shoes with responsive boost cushioning",
        rating: 4.7,
        reviews: 89,
        colors: ["Black", "White", "Blue"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: true,
        inStock: true
    },
    {
        id: 3,
        slug: "puma-rs-x",
        name: "Puma RS-X",
        category: "casual",
        price: 8500,
        originalPrice: 10000,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Retro-inspired sneakers with bold design and comfort",
        rating: 4.2,
        reviews: 67,
        colors: ["White", "Black", "Blue"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: false,
        inStock: true
    },
    {
        id: 4,
        slug: "clarks-desert-boot",
        name: "Clarks Desert Boot",
        category: "formal",
        price: 14000,
        originalPrice: 16000,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Classic desert boots with premium suede construction",
        rating: 4.4,
        reviews: 45,
        colors: ["Brown", "Black", "Tan"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: false,
        inStock: true
    },
    {
        id: 5,
        slug: "converse-chuck-taylor",
        name: "Converse Chuck Taylor",
        category: "casual",
        price: 5500,
        originalPrice: 6500,
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Iconic high-top sneakers with timeless appeal",
        rating: 4.6,
        reviews: 234,
        colors: ["Black", "White", "Red"],
        sizes: [5, 6, 7, 8, 9, 10, 11, 12],
        featured: true,
        inStock: true
    },
    {
        id: 6,
        slug: "new-balance-990",
        name: "New Balance 990v5",
        category: "sports",
        price: 18000,
        originalPrice: 20000,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Made in USA premium running shoes with ENCAP cushioning",
        rating: 4.8,
        reviews: 156,
        colors: ["Gray", "Navy", "Black"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: true,
        inStock: true
    },
    {
        id: 7,
        slug: "vans-old-skool",
        name: "Vans Old Skool",
        category: "casual",
        price: 4500,
        originalPrice: 5500,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Classic skate shoes with signature side stripe",
        rating: 4.3,
        reviews: 189,
        colors: ["Black", "White", "Checkered"],
        sizes: [5, 6, 7, 8, 9, 10, 11, 12],
        featured: false,
        inStock: true
    },
    {
        id: 8,
        slug: "dr-martens-1460",
        name: "Dr. Martens 1460",
        category: "formal",
        price: 16500,
        originalPrice: 18500,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Iconic leather boots with air-cushioned sole",
        rating: 4.5,
        reviews: 92,
        colors: ["Black", "Cherry Red", "Brown"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: false,
        inStock: true
    },
    {
        id: 9,
        slug: "jordan-air-jordan-1",
        name: "Jordan Air Jordan 1",
        category: "sports",
        price: 22000,
        originalPrice: 25000,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Legendary basketball shoes with premium leather upper",
        rating: 4.9,
        reviews: 312,
        colors: ["Black/Red", "White/Black", "Royal Blue"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: true,
        inStock: true
    },
    {
        id: 10,
        slug: "reebok-classic-leather",
        name: "Reebok Classic Leather",
        category: "casual",
        price: 6500,
        originalPrice: 7500,
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Retro running shoes with soft garment leather upper",
        rating: 4.1,
        reviews: 78,
        colors: ["White", "Black", "Gray"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: false,
        inStock: true
    },
    {
        id: 11,
        slug: "gucci-ace-sneakers",
        name: "Gucci Ace Sneakers",
        category: "formal",
        price: 45000,
        originalPrice: 50000,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Luxury leather sneakers with iconic bee embroidery",
        rating: 4.6,
        reviews: 34,
        colors: ["White", "Black", "Beige"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        featured: true,
        inStock: true
    },
    {
        id: 12,
        slug: "allbirds-tree-runners",
        name: "Allbirds Tree Runners",
        category: "casual",
        price: 9500,
        originalPrice: 11000,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Sustainable sneakers made from eucalyptus tree fiber",
        rating: 4.4,
        reviews: 167,
        colors: ["Gray", "Navy", "White"],
        sizes: [5, 6, 7, 8, 9, 10, 11, 12],
        featured: false,
        inStock: true
    }
];

// Product Management Class
class ProductManager {
    constructor() {
        this.products = [...productsData];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.productsPerPage = 8;
        this.searchQuery = '';
    }

    // Get products based on current filter and search
    getFilteredProducts() {
        let filtered = this.products;

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(product => product.category === this.currentFilter);
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        return filtered;
    }

    // Get products for current page
    getProductsForPage() {
        const filtered = this.getFilteredProducts();
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        return filtered.slice(0, endIndex); // Show all products up to current page
    }

    // Check if more products are available
    hasMoreProducts() {
        const filtered = this.getFilteredProducts();
        const currentlyShown = this.currentPage * this.productsPerPage;
        return filtered.length > currentlyShown;
    }

    // Load more products
    loadMore() {
        if (this.hasMoreProducts()) {
            this.currentPage++;
            return true;
        }
        return false;
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
    }

    // Set search query
    setSearch(query) {
        this.searchQuery = query;
        this.currentPage = 1;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    // Get featured products
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    // Get products by category
    getProductsByCategory(category) {
        return this.products.filter(product => product.category === category);
    }
}

// Create product manager instance
const productManager = new ProductManager();

// Render product card HTML
function createProductCard(product) {
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return `
        <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <div class="product-actions">
                        <button class="action-btn quick-view-btn" data-product-id="${product.id}" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn add-to-cart-action" data-product-id="${product.id}" title="Add to Cart">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="action-btn wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                ${discountPercentage > 0 ? `<div class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">-${discountPercentage}%</div>` : ''}
                ${!product.inStock ? '<div class="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Out of Stock</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    ₹${product.price.toLocaleString('en-IN')}
                    ${product.originalPrice > product.price ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="flex gap-2 mt-2">
                    <button class="add-to-cart-btn flex-1" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart mr-2"></i>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <a href="product.html?id=${product.slug || product.id}" 
                       class="flex items-center justify-center px-3 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium text-sm"
                       title="View Details">
                        <i class="fas fa-eye"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star star"></i>';
    }
    
    return starsHtml;
}

// Render products to grid
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!productsGrid) return;
    
    const products = productManager.getProductsForPage();
    
    // Clear grid if it's a new filter/search
    if (productManager.currentPage === 1) {
        productsGrid.innerHTML = '';
    }
    
    // Add new products
    const startIndex = (productManager.currentPage - 1) * productManager.productsPerPage;
    const newProducts = products.slice(startIndex);
    
    newProducts.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.innerHTML = createProductCard(product);
        productElement.firstElementChild.style.animationDelay = `${index * 0.1}s`;
        productElement.firstElementChild.classList.add('animate-fade-in-up');
        productsGrid.appendChild(productElement.firstElementChild);
    });
    
    // Update load more button
    if (loadMoreBtn) {
        if (productManager.hasMoreProducts()) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Filter buttons event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and render
            const filter = this.dataset.filter;
            productManager.setFilter(filter);
            renderProducts();
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (productManager.loadMore()) {
                renderProducts();
            }
        });
    }
    
    // Product card interactions
    document.addEventListener('click', function(e) {
        // Quick view functionality
        if (e.target.closest('.quick-view-btn')) {
            const productId = e.target.closest('.quick-view-btn').dataset.productId;
            showProductModal(productId);
        }
        
        // Add to cart from overlay
        if (e.target.closest('.add-to-cart-action')) {
            const productId = e.target.closest('.add-to-cart-action').dataset.productId;
            if (window.cart) {
                window.cart.addItem(productId);
            }
        }
        
        // Wishlist functionality
        if (e.target.closest('.wishlist-btn')) {
            const productId = e.target.closest('.wishlist-btn').dataset.productId;
            toggleWishlist(productId);
        }
    });
});

// Show product detail modal
function showProductModal(productId) {
    const product = productManager.getProductById(productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="text-2xl font-bold text-gray-800">${product.name}</h2>
                <button class="close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover rounded-lg">
                        <div class="flex gap-2 mt-4">
                            <div class="w-16 h-16 bg-gray-100 rounded border-2 border-blue-500">
                                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded">
                            </div>
                            <div class="w-16 h-16 bg-gray-100 rounded">
                                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded">
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="text-gray-600 mb-4">${product.description}</p>
                        <div class="product-rating mb-4">
                            <div class="stars">
                                ${generateStars(product.rating)}
                            </div>
                            <span class="rating-text ml-2">(${product.reviews} reviews)</span>
                        </div>
                        <div class="mb-6">
                            <span class="text-3xl font-bold text-blue-600">₹${product.price.toLocaleString('en-IN')}</span>
                            ${product.originalPrice > product.price ? `<span class="original-price text-xl ml-2">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                        </div>
                        
                        <div class="mb-6">
                            <h4 class="font-semibold mb-2">Available Colors:</h4>
                            <div class="flex gap-2">
                                ${product.colors.map(color => `
                                    <div class="w-8 h-8 rounded-full border-2 cursor-pointer" 
                                         style="background-color: ${getColorCode(color)}"
                                         title="${color}"></div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h4 class="font-semibold mb-2">Size:</h4>
                            <div class="grid grid-cols-4 gap-2">
                                ${product.sizes.map(size => `
                                    <button class="size-btn px-3 py-2 border border-gray-300 rounded text-center hover:border-blue-500 hover:text-blue-500">
                                        ${size}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="flex gap-4">
                            <button class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors add-to-cart-btn" 
                                    data-product-id="${product.id}">
                                <i class="fas fa-shopping-cart mr-2"></i>
                                Add to Cart
                            </button>
                            <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 wishlist-btn" 
                                    data-product-id="${product.id}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}

// Get color code for color name
function getColorCode(colorName) {
    const colors = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Red': '#DC2626',
        'Blue': '#2563EB',
        'Gray': '#6B7280',
        'Navy': '#1E3A8A',
        'Brown': '#92400E',
        'Tan': '#D2B48C',
        'Cherry Red': '#DC143C',
        'Royal Blue': '#4169E1',
        'Checkered': '#000000',
        'Beige': '#F5F5DC'
    };
    return colors[colorName] || '#6B7280';
}

// Toggle wishlist
function toggleWishlist(productId) {
    const btn = document.querySelector(`[data-product-id="${productId}"].wishlist-btn i`);
    if (btn.classList.contains('fas')) {
        btn.classList.remove('fas');
        btn.classList.add('far');
        showMessage('Removed from wishlist', 'info');
    } else {
        btn.classList.remove('far');
        btn.classList.add('fas');
        showMessage('Added to wishlist', 'success');
    }
}

// Show message
function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.className = `message ${type} fixed top-20 right-4 z-50 min-w-80 shadow-lg`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (document.body.contains(message)) {
            document.body.removeChild(message);
        }
    }, 3000);
}

// Search functionality
function handleSearch(query) {
    productManager.setSearch(query);
    renderProducts();
    
    // Update search results
    const searchResults = document.getElementById('searchResults');
    if (searchResults && query) {
        const results = productManager.getFilteredProducts().slice(0, 5);
        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="showProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="search-result-image">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>₹${product.price.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `).join('');
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productManager, createProductCard, generateStars };
}