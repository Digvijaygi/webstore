// Wishlist Page JavaScript for 3D Shoes Website

class WishlistPage {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.wishlist = [];
        this.filteredWishlist = [];
        this.displayedItems = 0;
        this.itemsPerPage = 12;
        this.selectedProduct = null;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.bindEvents();
        this.updateUI();
        if (this.isLoggedIn) {
            this.loadWishlist();
        }
    }

    checkLoginStatus() {
        const userData = localStorage.getItem('3dshoes_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            } catch (e) {
                console.error('Error parsing user data:', e);
                localStorage.removeItem('3dshoes_user');
            }
        }
    }

    bindEvents() {
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Add demo items buttons
        const addDemoItemsBtn = document.getElementById('addDemoItemsBtn');
        const addDemoItemsEmptyBtn = document.getElementById('addDemoItemsEmptyBtn');
        
        if (addDemoItemsBtn) {
            addDemoItemsBtn.addEventListener('click', () => this.addDemoItems());
        }
        if (addDemoItemsEmptyBtn) {
            addDemoItemsEmptyBtn.addEventListener('click', () => this.addDemoItems());
        }

        // Clear wishlist button
        const clearWishlistBtn = document.getElementById('clearWishlistBtn');
        if (clearWishlistBtn) {
            clearWishlistBtn.addEventListener('click', () => this.clearWishlist());
        }

        // Search and sort
        const wishlistSearch = document.getElementById('wishlistSearch');
        const sortWishlist = document.getElementById('sortWishlist');

        if (wishlistSearch) {
            wishlistSearch.addEventListener('input', () => this.filterWishlist());
        }
        if (sortWishlist) {
            sortWishlist.addEventListener('change', () => this.sortAndDisplayWishlist());
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreItems());
        }

        // Modal events
        this.bindModalEvents();
    }

    bindModalEvents() {
        // Quick view modal
        const quickViewModal = document.getElementById('quickViewModal');
        const closeQuickViewModal = document.getElementById('closeQuickViewModal');

        if (closeQuickViewModal) {
            closeQuickViewModal.addEventListener('click', () => {
                quickViewModal.classList.add('hidden');
            });
        }

        if (quickViewModal) {
            quickViewModal.addEventListener('click', (e) => {
                if (e.target === quickViewModal) {
                    quickViewModal.classList.add('hidden');
                }
            });
        }

        // Move to cart modal
        const moveToCartModal = document.getElementById('moveToCartModal');
        const confirmMoveToCart = document.getElementById('confirmMoveToCart');
        const cancelMoveToCart = document.getElementById('cancelMoveToCart');

        if (confirmMoveToCart) {
            confirmMoveToCart.addEventListener('click', () => this.confirmMoveToCart());
        }

        if (cancelMoveToCart) {
            cancelMoveToCart.addEventListener('click', () => {
                moveToCartModal.classList.add('hidden');
            });
        }

        if (moveToCartModal) {
            moveToCartModal.addEventListener('click', (e) => {
                if (e.target === moveToCartModal) {
                    moveToCartModal.classList.add('hidden');
                }
            });
        }
    }

    updateUI() {
        const loginRequired = document.getElementById('loginRequired');
        const wishlistContent = document.getElementById('wishlistContent');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.isLoggedIn && this.currentUser) {
            // Show wishlist content
            if (loginRequired) loginRequired.classList.add('hidden');
            if (wishlistContent) wishlistContent.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        } else {
            // Show login required
            if (loginRequired) loginRequired.classList.remove('hidden');
            if (wishlistContent) wishlistContent.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }

    loadWishlist() {
        // Load wishlist from localStorage
        this.wishlist = JSON.parse(localStorage.getItem('3dshoes_wishlist') || '[]');
        this.updateWishlistCount();
        this.filterWishlist();
    }

    updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlistCount');
        if (wishlistCount) {
            const count = this.wishlist.length;
            wishlistCount.textContent = `${count} ${count === 1 ? 'Item' : 'Items'}`;
        }
    }

    addDemoItems() {
        const demoItems = [
            {
                id: 'demo-1',
                name: 'Nike Air Max 270 React',
                price: 12999,
                originalPrice: 15999,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                category: 'sports',
                brand: 'Nike',
                rating: 4.5,
                reviews: 128,
                colors: ['Black/White', 'Navy/Blue', 'Red/Black'],
                sizes: ['7', '8', '9', '10', '11', '12'],
                addedDate: new Date().toISOString(),
                inStock: true,
                description: 'Experience unparalleled comfort and style with the Nike Air Max 270 React.'
            },
            {
                id: 'demo-2',
                name: 'Adidas Ultraboost 22',
                price: 16999,
                originalPrice: 19999,
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                category: 'sports',
                brand: 'Adidas',
                rating: 4.7,
                reviews: 256,
                colors: ['White/Black', 'Navy/Blue', 'Gray/Orange'],
                sizes: ['7', '8', '9', '10', '11', '12'],
                addedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                inStock: true,
                description: 'The most responsive running shoe with incredible energy return.'
            },
            {
                id: 'demo-3',
                name: 'Puma RS-X³ Puzzle',
                price: 8999,
                originalPrice: 11999,
                image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                category: 'casual',
                brand: 'Puma',
                rating: 4.3,
                reviews: 89,
                colors: ['Multi-Color', 'Black/White', 'Blue/Red'],
                sizes: ['7', '8', '9', '10', '11'],
                addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                inStock: true,
                description: 'Bold design meets comfort in this retro-futuristic silhouette.'
            },
            {
                id: 'demo-4',
                name: 'Converse Chuck Taylor All Star',
                price: 4999,
                originalPrice: 5999,
                image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                category: 'casual',
                brand: 'Converse',
                rating: 4.6,
                reviews: 312,
                colors: ['Classic White', 'All Black', 'Red'],
                sizes: ['6', '7', '8', '9', '10', '11', '12'],
                addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                inStock: true,
                description: 'The iconic sneaker that never goes out of style.'
            }
        ];

        // Add items that aren't already in wishlist
        const existingIds = this.wishlist.map(item => item.id);
        const newItems = demoItems.filter(item => !existingIds.includes(item.id));

        if (newItems.length === 0) {
            this.showNotification('All demo items are already in your wishlist!', 'info');
            return;
        }

        this.wishlist.unshift(...newItems);
        localStorage.setItem('3dshoes_wishlist', JSON.stringify(this.wishlist));
        
        this.updateWishlistCount();
        this.filterWishlist();
        this.showNotification(`Added ${newItems.length} demo items to your wishlist!`, 'success');
    }

    clearWishlist() {
        if (this.wishlist.length === 0) {
            this.showNotification('Your wishlist is already empty!', 'info');
            return;
        }

        const confirmed = confirm('Are you sure you want to clear your entire wishlist? This action cannot be undone.');
        
        if (confirmed) {
            this.wishlist = [];
            localStorage.setItem('3dshoes_wishlist', JSON.stringify(this.wishlist));
            
            this.updateWishlistCount();
            this.displayWishlist();
            this.showNotification('Wishlist cleared successfully!', 'success');
        }
    }

    filterWishlist() {
        const searchTerm = document.getElementById('wishlistSearch').value.toLowerCase();
        
        this.filteredWishlist = this.wishlist.filter(item => {
            return !searchTerm || 
                   item.name.toLowerCase().includes(searchTerm) ||
                   item.brand.toLowerCase().includes(searchTerm) ||
                   item.category.toLowerCase().includes(searchTerm);
        });

        this.sortAndDisplayWishlist();
    }

    sortAndDisplayWishlist() {
        const sortValue = document.getElementById('sortWishlist').value;

        switch (sortValue) {
            case 'name':
                this.filteredWishlist.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                this.filteredWishlist.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredWishlist.sort((a, b) => b.price - a.price);
                break;
            case 'recent':
            default:
                this.filteredWishlist.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
                break;
        }

        this.displayedItems = 0;
        this.displayWishlist();
    }

    displayWishlist() {
        const emptyState = document.getElementById('emptyWishlistState');
        const wishlistGrid = document.getElementById('wishlistGrid');
        const loadMoreSection = document.getElementById('loadMoreSection');

        if (this.filteredWishlist.length === 0) {
            // Show empty state
            if (emptyState) emptyState.classList.remove('hidden');
            if (wishlistGrid) wishlistGrid.classList.add('hidden');
            if (loadMoreSection) loadMoreSection.classList.add('hidden');
            return;
        }

        // Hide empty state and show grid
        if (emptyState) emptyState.classList.add('hidden');
        if (wishlistGrid) wishlistGrid.classList.remove('hidden');

        // Load initial items
        this.loadMoreItems();
    }

    loadMoreItems() {
        const wishlistGrid = document.getElementById('wishlistGrid');
        const loadMoreSection = document.getElementById('loadMoreSection');
        
        const nextItems = this.filteredWishlist.slice(this.displayedItems, this.displayedItems + this.itemsPerPage);
        
        if (this.displayedItems === 0) {
            // First load - replace content
            wishlistGrid.innerHTML = '';
        }

        // Add new items
        nextItems.forEach(item => {
            const itemElement = this.createWishlistItemCard(item);
            wishlistGrid.appendChild(itemElement);
        });

        this.displayedItems += nextItems.length;

        // Show/hide load more button
        if (this.displayedItems >= this.filteredWishlist.length) {
            if (loadMoreSection) loadMoreSection.classList.add('hidden');
        } else {
            if (loadMoreSection) loadMoreSection.classList.remove('hidden');
        }

        // Bind events for new items
        this.bindWishlistItemEvents();
    }

    createWishlistItemCard(item) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group';
        
        const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;
        
        card.innerHTML = `
            <div class="relative">
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
                ${discount > 0 ? `<span class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">${discount}% OFF</span>` : ''}
                <button class="remove-from-wishlist absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors" data-item-id="${item.id}">
                    <i class="fas fa-heart text-sm"></i>
                </button>
                ${!item.inStock ? '<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span class="text-white font-semibold">Out of Stock</span></div>' : ''}
            </div>
            
            <div class="p-4">
                <div class="mb-2">
                    <h3 class="font-semibold text-gray-800 mb-1 line-clamp-2">${item.name}</h3>
                    <p class="text-sm text-gray-500">${item.brand}</p>
                </div>
                
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm">
                        ${Array.from({ length: 5 }, (_, i) => 
                            `<i class="fas fa-star${i < Math.floor(item.rating) ? '' : i < item.rating ? ' half' : ' opacity-30'}"></i>`
                        ).join('')}
                    </div>
                    <span class="text-xs text-gray-500 ml-2">(${item.reviews})</span>
                </div>
                
                <div class="mb-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-xl font-bold text-gray-800">₹${item.price.toLocaleString()}</span>
                        ${item.originalPrice ? `<span class="text-sm text-gray-500 line-through">₹${item.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                </div>
                
                <div class="space-y-2">
                    <button class="move-to-cart w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors ${!item.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                            data-item-id="${item.id}" ${!item.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart mr-2"></i>Move to Cart
                    </button>
                    <button class="quick-view w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors" 
                            data-item-id="${item.id}">
                        <i class="fas fa-eye mr-2"></i>Quick View
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    bindWishlistItemEvents() {
        // Remove from wishlist buttons
        document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.dataset.itemId;
                this.removeFromWishlist(itemId);
            });
        });

        // Move to cart buttons
        document.querySelectorAll('.move-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = btn.dataset.itemId;
                if (!btn.disabled) {
                    this.showMoveToCartModal(itemId);
                }
            });
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = btn.dataset.itemId;
                this.showQuickView(itemId);
            });
        });
    }

    removeFromWishlist(itemId) {
        const itemIndex = this.wishlist.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            const item = this.wishlist[itemIndex];
            this.wishlist.splice(itemIndex, 1);
            localStorage.setItem('3dshoes_wishlist', JSON.stringify(this.wishlist));
            
            this.updateWishlistCount();
            this.filterWishlist();
            this.showNotification(`${item.name} removed from wishlist`, 'success');
        }
    }

    showMoveToCartModal(itemId) {
        const item = this.wishlist.find(i => i.id === itemId);
        if (!item) return;

        this.selectedProduct = item;
        
        const sizeSelector = document.getElementById('sizeSelector');
        sizeSelector.innerHTML = item.sizes.map(size => `
            <button class="size-option px-3 py-2 border border-gray-300 rounded hover:border-gray-500 transition-colors" 
                    data-size="${size}">${size}</button>
        `).join('');

        // Bind size selection
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.size-option').forEach(b => b.classList.remove('border-blue-500', 'bg-blue-50'));
                btn.classList.add('border-blue-500', 'bg-blue-50');
            });
        });

        document.getElementById('moveToCartModal').classList.remove('hidden');
    }

    confirmMoveToCart() {
        const selectedSize = document.querySelector('.size-option.border-blue-500');
        if (!selectedSize) {
            this.showNotification('Please select a size', 'warning');
            return;
        }

        const size = selectedSize.dataset.size;
        
        // Add to cart
        let cart = JSON.parse(localStorage.getItem('3dshoes_cart') || '[]');
        
        const cartItem = {
            ...this.selectedProduct,
            size: size,
            quantity: 1,
            addedToCart: new Date().toISOString()
        };

        const existingItem = cart.find(item => 
            item.id === cartItem.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('3dshoes_cart', JSON.stringify(cart));
        
        // Remove from wishlist
        this.removeFromWishlist(this.selectedProduct.id);
        
        document.getElementById('moveToCartModal').classList.add('hidden');
        this.showNotification(`${this.selectedProduct.name} moved to cart!`, 'success');
    }

    showQuickView(itemId) {
        const item = this.wishlist.find(i => i.id === itemId);
        if (!item) return;

        const quickViewContent = document.getElementById('quickViewContent');
        const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0;

        quickViewContent.innerHTML = `
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Product Image -->
                <div class="relative">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-96 object-cover rounded-lg">
                    ${discount > 0 ? `<span class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded">${discount}% OFF</span>` : ''}
                </div>
                
                <!-- Product Info -->
                <div class="space-y-6">
                    <div>
                        <h3 class="text-3xl font-bold text-gray-800 mb-2">${item.name}</h3>
                        <p class="text-lg text-gray-600">${item.brand}</p>
                    </div>
                    
                    <div class="flex items-center">
                        <div class="flex text-yellow-400 mr-3">
                            ${Array.from({ length: 5 }, (_, i) => 
                                `<i class="fas fa-star${i < Math.floor(item.rating) ? '' : ' opacity-30'}"></i>`
                            ).join('')}
                        </div>
                        <span class="text-gray-600">${item.rating}/5 (${item.reviews} reviews)</span>
                    </div>
                    
                    <div>
                        <div class="flex items-center space-x-3 mb-2">
                            <span class="text-3xl font-bold text-gray-800">₹${item.price.toLocaleString()}</span>
                            ${item.originalPrice ? `<span class="text-lg text-gray-500 line-through">₹${item.originalPrice.toLocaleString()}</span>` : ''}
                        </div>
                        ${item.originalPrice ? `<p class="text-green-600 font-semibold">You save ₹${(item.originalPrice - item.price).toLocaleString()}</p>` : ''}
                    </div>
                    
                    <div>
                        <p class="text-gray-700">${item.description}</p>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">Available Colors:</h4>
                        <div class="flex space-x-2">
                            ${item.colors.map(color => `
                                <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">${color}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">Available Sizes:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${item.sizes.map(size => `
                                <span class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded">${size}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors ${!item.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                                onclick="wishlistPage.showMoveToCartModal('${item.id}')" ${!item.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart mr-2"></i>Move to Cart
                        </button>
                        <button class="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors" 
                                onclick="wishlistPage.removeFromWishlist('${item.id}')">
                            <i class="fas fa-heart mr-2"></i>Remove from Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('quickViewModal').classList.remove('hidden');
    }

    logout() {
        localStorage.removeItem('3dshoes_user');
        this.showNotification('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    // Utility functions
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

// Initialize wishlist page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.wishlistPage = new WishlistPage();
});