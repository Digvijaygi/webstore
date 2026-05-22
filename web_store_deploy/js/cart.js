// Shopping Cart Management

class ShoppingCart {
    constructor() {
        this.items = this.loadCartFromStorage();
        this.isOpen = false;
        this.init();
    }

    // Initialize cart functionality
    init() {
        this.updateCartUI();
        this.attachEventListeners();
    }

    // Load cart from localStorage
    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('3dshoes_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCartToStorage() {
        try {
            localStorage.setItem('3dshoes_cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    // Add item to cart
    addItem(productId, quantity = 1, size = null, color = null) {
        const product = productManager.getProductById(parseInt(productId));
        if (!product) {
            this.showMessage('Product not found', 'error');
            return false;
        }

        if (!product.inStock) {
            this.showMessage('Product is out of stock', 'error');
            return false;
        }

        // Check if item already exists in cart
        const existingItemIndex = this.items.findIndex(item => 
            item.productId === parseInt(productId) && 
            item.size === size && 
            item.color === color
        );

        if (existingItemIndex >= 0) {
            // Update quantity if item exists
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            const cartItem = {
                id: Date.now() + Math.random(), // Unique ID for cart item
                productId: parseInt(productId),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                size: size || product.sizes[0], // Default to first available size
                color: color || product.colors[0], // Default to first available color
                addedAt: new Date().toISOString()
            };
            this.items.push(cartItem);
        }

        this.saveCartToStorage();
        this.updateCartUI();
        this.showMessage(`${product.name} added to cart`, 'success');
        return true;
    }

    // Remove item from cart
    removeItem(cartItemId) {
        const itemIndex = this.items.findIndex(item => item.id === cartItemId);
        if (itemIndex >= 0) {
            const removedItem = this.items.splice(itemIndex, 1)[0];
            this.saveCartToStorage();
            this.updateCartUI();
            this.showMessage(`${removedItem.name} removed from cart`, 'info');
            return true;
        }
        return false;
    }

    // Update item quantity
    updateQuantity(cartItemId, newQuantity) {
        const item = this.items.find(item => item.id === cartItemId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(cartItemId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartUI();
            }
            return true;
        }
        return false;
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCartToStorage();
        this.updateCartUI();
        this.showMessage('Cart cleared', 'info');
    }

    // Toggle cart sidebar
    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (!cartSidebar) return;

        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    // Open cart sidebar
    openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('translate-x-full');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }

    // Close cart sidebar
    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('translate-x-full');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }

    // Update cart UI
    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    // Update cart count badge
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const itemCount = this.getItemCount();
        
        if (cartCount) {
            cartCount.textContent = itemCount;
            if (itemCount > 0) {
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        }
    }

    // Update cart items display
    updateCartItems() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-shopping-cart text-gray-300 text-4xl mb-4"></i>
                    <p class="text-gray-500">Your cart is empty</p>
                    <button class="mt-4 text-blue-600 hover:text-blue-700" onclick="cart.closeCart()">
                        Continue Shopping
                    </button>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="text-xs text-gray-500 mb-1">
                        Size: ${item.size} | Color: ${item.color}
                    </div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                    <div class="quantity-controls">
                        <button class="qty-btn decrease-qty" data-item-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-quantity">${item.quantity}</span>
                        <button class="qty-btn increase-qty" data-item-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="ml-auto text-red-500 hover:text-red-700 remove-item" data-item-id="${item.id}">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update cart total
    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = `₹${this.getTotal().toLocaleString('en-IN')}`;
        }
    }

    // Attach event listeners
    attachEventListeners() {
        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }

        // Close cart button
        const closeCart = document.getElementById('closeCart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.closeCart());
        }

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const productId = e.target.closest('.add-to-cart-btn').dataset.productId;
                if (productId) {
                    this.addItem(productId);
                }
            }

            // Quantity controls
            if (e.target.closest('.increase-qty')) {
                const itemId = parseFloat(e.target.closest('.increase-qty').dataset.itemId);
                const item = this.items.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity + 1);
                }
            }

            if (e.target.closest('.decrease-qty')) {
                const itemId = parseFloat(e.target.closest('.decrease-qty').dataset.itemId);
                const item = this.items.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity - 1);
                }
            }

            // Remove item
            if (e.target.closest('.remove-item')) {
                const itemId = parseFloat(e.target.closest('.remove-item').dataset.itemId);
                this.removeItem(itemId);
            }
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartBtn = document.getElementById('cartBtn');
            
            if (this.isOpen && cartSidebar && !cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
                this.closeCart();
            }
        });

        // Escape key to close cart
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });
    }

    // Checkout functionality
    checkout() {
        if (this.items.length === 0) {
            this.showMessage('Your cart is empty', 'error');
            return;
        }

        // Create checkout summary
        const total = this.getTotal();
        const itemCount = this.getItemCount();
        
        const checkoutModal = document.createElement('div');
        checkoutModal.className = 'modal-overlay';
        checkoutModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold text-gray-800">Checkout Summary</h2>
                    <button class="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4 mb-6">
                        <h3 class="text-lg font-semibold">Order Items (${itemCount})</h3>
                        ${this.items.map(item => `
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                    <div class="font-medium">${item.name}</div>
                                    <div class="text-sm text-gray-600">Size: ${item.size} | Color: ${item.color}</div>
                                    <div class="text-sm text-gray-600">Qty: ${item.quantity}</div>
                                </div>
                                <div class="font-semibold">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="border-t pt-4 mb-6">
                        <div class="flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span class="text-blue-600">₹${total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold">Delivery Information</h3>
                        <form id="checkoutForm" class="space-y-4">
                            <input type="text" placeholder="Full Name" required 
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <input type="email" placeholder="Email" required 
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <input type="tel" placeholder="Phone Number" required 
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <textarea placeholder="Delivery Address" rows="3" required 
                                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            
                            <div class="flex gap-4">
                                <button type="button" class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 cancel-checkout">
                                    Cancel
                                </button>
                                <button type="submit" class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(checkoutModal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeModal = () => {
            document.body.removeChild(checkoutModal);
            document.body.style.overflow = '';
        };
        
        checkoutModal.querySelector('.close-modal').addEventListener('click', closeModal);
        checkoutModal.querySelector('.cancel-checkout').addEventListener('click', closeModal);
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) closeModal();
        });
        
        // Handle checkout form
        checkoutModal.querySelector('#checkoutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate order processing
            const loadingSpinner = document.getElementById('loadingSpinner');
            if (loadingSpinner) {
                loadingSpinner.classList.remove('hidden');
            }
            
            setTimeout(() => {
                if (loadingSpinner) {
                    loadingSpinner.classList.add('hidden');
                }
                
                closeModal();
                this.clearCart();
                this.closeCart();
                
                // Show success message
                this.showMessage('Order placed successfully! Thank you for shopping with us.', 'success');
                
                // Generate order number
                const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
                
                // Show order confirmation
                setTimeout(() => {
                    this.showMessage(`Order Number: ${orderNumber}. You will receive a confirmation email shortly.`, 'info');
                }, 2000);
                
            }, 2000);
        });
    }

    // Show message
    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `message ${type} fixed top-20 right-4 z-50 min-w-80 shadow-lg`;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (document.body.contains(message)) {
                message.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(message)) {
                        document.body.removeChild(message);
                    }
                }, 300);
            }
        }, 3000);
    }

    // Get cart data for external use
    getCartData() {
        return {
            items: this.items,
            total: this.getTotal(),
            itemCount: this.getItemCount()
        };
    }
}

// Initialize cart when DOM is loaded
let cart;

document.addEventListener('DOMContentLoaded', function() {
    cart = new ShoppingCart();
    
    // Make cart globally available
    window.cart = cart;
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}