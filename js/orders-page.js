// Orders Page JavaScript for 3D Shoes Website

class OrdersPage {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.orders = [];
        this.filteredOrders = [];
        this.currentPage = 1;
        this.ordersPerPage = 10;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.bindEvents();
        this.updateUI();
        if (this.isLoggedIn) {
            this.loadOrders();
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

        // Create demo order button
        const createDemoOrderBtn = document.getElementById('createDemoOrderBtn');
        if (createDemoOrderBtn) {
            createDemoOrderBtn.addEventListener('click', () => this.createDemoOrder());
        }

        // Filter events
        const orderSearch = document.getElementById('orderSearch');
        const statusFilter = document.getElementById('statusFilter');
        const timeFilter = document.getElementById('timeFilter');

        if (orderSearch) {
            orderSearch.addEventListener('input', () => this.filterOrders());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterOrders());
        }
        if (timeFilter) {
            timeFilter.addEventListener('change', () => this.filterOrders());
        }

        // Modal events
        this.bindModalEvents();

        // Pagination events
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');
        
        if (prevPage) {
            prevPage.addEventListener('click', () => this.changePage(this.currentPage - 1));
        }
        if (nextPage) {
            nextPage.addEventListener('click', () => this.changePage(this.currentPage + 1));
        }
    }

    bindModalEvents() {
        // Order details modal
        const orderDetailsModal = document.getElementById('orderDetailsModal');
        const closeOrderModal = document.getElementById('closeOrderModal');

        if (closeOrderModal) {
            closeOrderModal.addEventListener('click', () => {
                orderDetailsModal.classList.add('hidden');
            });
        }

        if (orderDetailsModal) {
            orderDetailsModal.addEventListener('click', (e) => {
                if (e.target === orderDetailsModal) {
                    orderDetailsModal.classList.add('hidden');
                }
            });
        }

        // Track order modal
        const trackOrderModal = document.getElementById('trackOrderModal');
        const closeTrackModal = document.getElementById('closeTrackModal');

        if (closeTrackModal) {
            closeTrackModal.addEventListener('click', () => {
                trackOrderModal.classList.add('hidden');
            });
        }

        if (trackOrderModal) {
            trackOrderModal.addEventListener('click', (e) => {
                if (e.target === trackOrderModal) {
                    trackOrderModal.classList.add('hidden');
                }
            });
        }
    }

    updateUI() {
        const loginRequired = document.getElementById('loginRequired');
        const ordersContent = document.getElementById('ordersContent');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.isLoggedIn && this.currentUser) {
            // Show orders content
            if (loginRequired) loginRequired.classList.add('hidden');
            if (ordersContent) ordersContent.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        } else {
            // Show login required
            if (loginRequired) loginRequired.classList.remove('hidden');
            if (ordersContent) ordersContent.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }

    loadOrders() {
        // Load orders from localStorage
        this.orders = JSON.parse(localStorage.getItem('3dshoes_orders') || '[]');
        
        // If no orders, create some demo orders for better UX
        if (this.orders.length === 0) {
            this.createInitialDemoOrders();
        }
        
        this.filteredOrders = [...this.orders];
        this.displayOrders();
    }

    createInitialDemoOrders() {
        // Don't create demo orders automatically - let user decide
        this.displayEmptyState();
    }

    createDemoOrder() {
        const demoOrders = [
            {
                id: `ORD${Date.now()}`,
                date: new Date().toISOString(),
                status: 'Processing',
                items: [
                    {
                        name: 'Nike Air Max 270',
                        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                        size: '9',
                        color: 'Black/White',
                        quantity: 1,
                        price: 12999
                    }
                ],
                total: 12999,
                shippingAddress: {
                    name: this.currentUser.name,
                    address: '123 Main Street',
                    city: 'Mumbai',
                    pincode: '400001',
                    phone: '+91 98765 43210'
                },
                paymentMethod: 'Credit Card ending in 1234',
                trackingNumber: `TRK${Date.now()}`
            },
            {
                id: `ORD${Date.now() + 1}`,
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'Delivered',
                items: [
                    {
                        name: 'Adidas Ultraboost 22',
                        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                        size: '10',
                        color: 'Navy Blue',
                        quantity: 1,
                        price: 16999
                    }
                ],
                total: 16999,
                shippingAddress: {
                    name: this.currentUser.name,
                    address: '123 Main Street',
                    city: 'Mumbai',
                    pincode: '400001',
                    phone: '+91 98765 43210'
                },
                paymentMethod: 'UPI Payment',
                trackingNumber: `TRK${Date.now() + 1}`,
                deliveredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        // Add random demo order
        const randomOrder = demoOrders[Math.floor(Math.random() * demoOrders.length)];
        randomOrder.id = `ORD${Date.now()}`;
        randomOrder.date = new Date().toISOString();
        randomOrder.trackingNumber = `TRK${Date.now()}`;

        this.orders.unshift(randomOrder);
        localStorage.setItem('3dshoes_orders', JSON.stringify(this.orders));
        
        this.filteredOrders = [...this.orders];
        this.displayOrders();
        this.showNotification('Demo order created successfully!', 'success');
    }

    filterOrders() {
        const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const timeFilter = document.getElementById('timeFilter').value;

        this.filteredOrders = this.orders.filter(order => {
            // Search filter
            const matchesSearch = !searchTerm || 
                order.id.toLowerCase().includes(searchTerm) ||
                order.items.some(item => item.name.toLowerCase().includes(searchTerm));

            // Status filter
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

            // Time filter
            let matchesTime = true;
            if (timeFilter !== 'all') {
                const orderDate = new Date(order.date);
                const daysDiff = Math.floor((Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
                matchesTime = daysDiff <= parseInt(timeFilter);
            }

            return matchesSearch && matchesStatus && matchesTime;
        });

        this.currentPage = 1;
        this.displayOrders();
    }

    displayOrders() {
        const emptyState = document.getElementById('emptyOrdersState');
        const ordersContainer = document.getElementById('ordersContainer');
        const pagination = document.getElementById('ordersPagination');

        if (this.filteredOrders.length === 0) {
            this.displayEmptyState();
            return;
        }

        // Hide empty state
        if (emptyState) emptyState.classList.add('hidden');
        if (ordersContainer) ordersContainer.classList.remove('hidden');

        // Calculate pagination
        const totalPages = Math.ceil(this.filteredOrders.length / this.ordersPerPage);
        const startIndex = (this.currentPage - 1) * this.ordersPerPage;
        const endIndex = startIndex + this.ordersPerPage;
        const currentOrders = this.filteredOrders.slice(startIndex, endIndex);

        // Display orders
        ordersContainer.innerHTML = currentOrders.map(order => this.createOrderCard(order)).join('');

        // Show pagination if needed
        if (totalPages > 1) {
            this.displayPagination(totalPages);
        } else {
            if (pagination) pagination.classList.add('hidden');
        }

        // Bind order card events
        this.bindOrderCardEvents();
    }

    displayEmptyState() {
        const emptyState = document.getElementById('emptyOrdersState');
        const ordersContainer = document.getElementById('ordersContainer');
        const pagination = document.getElementById('ordersPagination');

        if (emptyState) emptyState.classList.remove('hidden');
        if (ordersContainer) ordersContainer.classList.add('hidden');
        if (pagination) pagination.classList.add('hidden');
    }

    createOrderCard(order) {
        const orderDate = new Date(order.date).toLocaleDateString();
        const statusClass = this.getStatusClass(order.status);
        
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                    <div class="flex-1">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2">
                            <h3 class="text-lg font-semibold text-gray-800">Order #${order.id}</h3>
                            <span class="px-3 py-1 text-xs font-semibold rounded-full ${statusClass}">
                                ${order.status}
                            </span>
                        </div>
                        <p class="text-gray-600">Ordered on ${orderDate}</p>
                        <p class="text-sm text-gray-500">${order.items.length} item(s)</p>
                    </div>
                    <div class="text-right mt-4 lg:mt-0">
                        <p class="text-2xl font-bold text-gray-800">₹${order.total.toLocaleString()}</p>
                    </div>
                </div>
                
                <!-- Order Items Preview -->
                <div class="border-t border-gray-200 pt-4 mb-4">
                    <div class="flex space-x-4 overflow-x-auto pb-2">
                        ${order.items.map(item => `
                            <div class="flex-shrink-0 flex items-center space-x-3">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                                <div>
                                    <p class="font-semibold text-gray-800 text-sm">${item.name}</p>
                                    <p class="text-xs text-gray-600">Size: ${item.size} • Qty: ${item.quantity}</p>
                                    <p class="text-sm font-semibold text-blue-600">₹${item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <button class="view-order-btn flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors" data-order-id="${order.id}">
                        <i class="fas fa-eye mr-2"></i>View Details
                    </button>
                    <button class="track-order-btn flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors" data-order-id="${order.id}">
                        <i class="fas fa-truck mr-2"></i>Track Order
                    </button>
                    ${order.status === 'Delivered' ? `
                        <button class="reorder-btn flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors" data-order-id="${order.id}">
                            <i class="fas fa-redo mr-2"></i>Reorder
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    bindOrderCardEvents() {
        // View order buttons
        document.querySelectorAll('.view-order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.target.closest('.view-order-btn').dataset.orderId;
                this.showOrderDetails(orderId);
            });
        });

        // Track order buttons
        document.querySelectorAll('.track-order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.target.closest('.track-order-btn').dataset.orderId;
                this.showOrderTracking(orderId);
            });
        });

        // Reorder buttons
        document.querySelectorAll('.reorder-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.target.closest('.reorder-btn').dataset.orderId;
                this.reorderItems(orderId);
            });
        });
    }

    showOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const orderDetailsContent = document.getElementById('orderDetailsContent');
        const orderDate = new Date(order.date).toLocaleDateString();
        const deliveredDate = order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString() : null;

        orderDetailsContent.innerHTML = `
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Order Info -->
                <div class="space-y-6">
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Order Information</h4>
                        <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                            <p><span class="font-semibold">Order ID:</span> ${order.id}</p>
                            <p><span class="font-semibold">Date:</span> ${orderDate}</p>
                            <p><span class="font-semibold">Status:</span> <span class="px-2 py-1 text-xs font-semibold rounded-full ${this.getStatusClass(order.status)}">${order.status}</span></p>
                            <p><span class="font-semibold">Total:</span> ₹${order.total.toLocaleString()}</p>
                            ${deliveredDate ? `<p><span class="font-semibold">Delivered:</span> ${deliveredDate}</p>` : ''}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h4>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="font-semibold">${order.shippingAddress.name}</p>
                            <p>${order.shippingAddress.address}</p>
                            <p>${order.shippingAddress.city} - ${order.shippingAddress.pincode}</p>
                            <p>Phone: ${order.shippingAddress.phone}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">Payment Method</h4>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p>${order.paymentMethod}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Order Items -->
                <div>
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Order Items</h4>
                    <div class="space-y-4">
                        ${order.items.map(item => `
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                                    <div class="flex-1">
                                        <h5 class="font-semibold text-gray-800">${item.name}</h5>
                                        <p class="text-gray-600">Size: ${item.size} • Color: ${item.color}</p>
                                        <p class="text-gray-600">Quantity: ${item.quantity}</p>
                                        <p class="font-semibold text-blue-600">₹${item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('orderDetailsModal').classList.remove('hidden');
    }

    showOrderTracking(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const trackingContent = document.getElementById('trackingContent');
        
        // Generate tracking timeline based on order status
        const trackingSteps = this.generateTrackingSteps(order);

        trackingContent.innerHTML = `
            <div class="mb-6">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">Tracking Number: ${order.trackingNumber}</h4>
                <p class="text-gray-600">Order #${order.id}</p>
            </div>
            
            <div class="relative">
                ${trackingSteps.map((step, index) => `
                    <div class="flex items-start space-x-4 ${index < trackingSteps.length - 1 ? 'mb-8' : ''}">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : step.current ? 'bg-blue-500' : 'bg-gray-300'}">
                            <i class="fas ${step.icon} text-white"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-gray-800">${step.title}</p>
                            <p class="text-sm text-gray-600">${step.description}</p>
                            ${step.date ? `<p class="text-xs text-gray-500 mt-1">${new Date(step.date).toLocaleDateString()}</p>` : ''}
                        </div>
                    </div>
                    ${index < trackingSteps.length - 1 ? `
                        <div class="ml-5 w-px h-8 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}"></div>
                    ` : ''}
                `).join('')}
            </div>
        `;

        document.getElementById('trackOrderModal').classList.remove('hidden');
    }

    generateTrackingSteps(order) {
        const orderDate = new Date(order.date);
        const steps = [
            {
                title: 'Order Placed',
                description: 'Your order has been confirmed',
                icon: 'fa-check-circle',
                completed: true,
                date: order.date
            },
            {
                title: 'Order Processing',
                description: 'We are preparing your order',
                icon: 'fa-cog',
                completed: order.status !== 'Processing',
                current: order.status === 'Processing',
                date: order.status !== 'Processing' ? new Date(orderDate.getTime() + 24 * 60 * 60 * 1000).toISOString() : null
            },
            {
                title: 'Shipped',
                description: 'Your order is on the way',
                icon: 'fa-truck',
                completed: order.status === 'Delivered',
                current: order.status === 'Shipped',
                date: order.status === 'Shipped' || order.status === 'Delivered' ? new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString() : null
            },
            {
                title: 'Out for Delivery',
                description: 'Your package is out for delivery',
                icon: 'fa-shipping-fast',
                completed: order.status === 'Delivered',
                current: false,
                date: order.status === 'Delivered' ? order.deliveredDate : null
            },
            {
                title: 'Delivered',
                description: 'Your order has been delivered',
                icon: 'fa-home',
                completed: order.status === 'Delivered',
                current: false,
                date: order.deliveredDate
            }
        ];

        return steps;
    }

    reorderItems(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        // Add items to cart (simulate)
        let cart = JSON.parse(localStorage.getItem('3dshoes_cart') || '[]');
        
        order.items.forEach(item => {
            const existingItem = cart.find(cartItem => 
                cartItem.name === item.name && 
                cartItem.size === item.size && 
                cartItem.color === item.color
            );
            
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push({ ...item });
            }
        });

        localStorage.setItem('3dshoes_cart', JSON.stringify(cart));
        this.showNotification('Items added to cart successfully!', 'success');
    }

    displayPagination(totalPages) {
        const pagination = document.getElementById('ordersPagination');
        const pageNumbers = document.getElementById('pageNumbers');
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');

        // Show pagination
        if (pagination) pagination.classList.remove('hidden');

        // Update prev/next buttons
        if (prevPage) {
            prevPage.disabled = this.currentPage === 1;
        }
        if (nextPage) {
            nextPage.disabled = this.currentPage === totalPages;
        }

        // Generate page numbers
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - this.currentPage) <= 1) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `px-4 py-2 border rounded-lg transition-colors ${
                    i === this.currentPage 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-gray-300 hover:bg-gray-50'
                }`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => this.changePage(i));
                pageNumbers.appendChild(pageBtn);
            } else if (Math.abs(i - this.currentPage) === 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'px-2 py-2 text-gray-500';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
    }

    changePage(page) {
        const totalPages = Math.ceil(this.filteredOrders.length / this.ordersPerPage);
        if (page < 1 || page > totalPages) return;

        this.currentPage = page;
        this.displayOrders();
    }

    getStatusClass(status) {
        const statusClasses = {
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Shipped': 'bg-blue-100 text-blue-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return statusClasses[status] || 'bg-gray-100 text-gray-800';
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

// Initialize orders page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ordersPage = new OrdersPage();
});