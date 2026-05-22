// Account Dashboard JavaScript for 3D Shoes Website

class AccountDashboard {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.stats = {
            totalOrders: 0,
            wishlistItems: 0,
            loyaltyPoints: 0,
            memberSince: '2024'
        };
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.bindEvents();
        this.updateUI();
        if (this.isLoggedIn) {
            this.loadDashboardData();
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

        // Verify account button
        const verifyAccountBtn = document.getElementById('verifyAccountBtn');
        if (verifyAccountBtn) {
            verifyAccountBtn.addEventListener('click', () => this.startVerificationProcess());
        }

        // Update preferences button
        const updatePreferencesBtn = document.getElementById('updatePreferencesBtn');
        if (updatePreferencesBtn) {
            updatePreferencesBtn.addEventListener('click', () => this.updateNotificationPreferences());
        }
    }

    updateUI() {
        const loginRequired = document.getElementById('loginRequired');
        const dashboardContent = document.getElementById('dashboardContent');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.isLoggedIn && this.currentUser) {
            // Show dashboard content
            if (loginRequired) loginRequired.classList.add('hidden');
            if (dashboardContent) dashboardContent.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');

            // Update user welcome message
            this.updateWelcomeMessage();
        } else {
            // Show login required
            if (loginRequired) loginRequired.classList.remove('hidden');
            if (dashboardContent) dashboardContent.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }

    updateWelcomeMessage() {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage && this.currentUser) {
            welcomeMessage.textContent = `Welcome Back, ${this.currentUser.firstName || this.currentUser.name || 'User'}!`;
        }
    }

    async loadDashboardData() {
        try {
            this.showLoading();
            
            // Simulate API calls to load dashboard data
            await this.simulateDelay(1000);
            
            // Load stats from localStorage or set defaults
            await this.loadUserStats();
            await this.loadRecentOrders();
            await this.loadWishlistPreview();
            await this.updateAccountStatus();
            
            this.hideLoading();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.hideLoading();
        }
    }

    async loadUserStats() {
        // Get data from localStorage
        const orders = JSON.parse(localStorage.getItem('3dshoes_orders') || '[]');
        const wishlist = JSON.parse(localStorage.getItem('3dshoes_wishlist') || '[]');
        const loyaltyPoints = parseInt(localStorage.getItem('3dshoes_loyalty_points') || '0');
        
        // Calculate member since
        const joinDate = new Date(this.currentUser.joinDate || Date.now());
        const memberSince = joinDate.getFullYear();

        this.stats = {
            totalOrders: orders.length,
            wishlistItems: wishlist.length,
            loyaltyPoints: loyaltyPoints,
            memberSince: memberSince
        };

        // Update UI
        document.getElementById('totalOrders').textContent = this.stats.totalOrders;
        document.getElementById('wishlistItems').textContent = this.stats.wishlistItems;
        document.getElementById('loyaltyPoints').textContent = this.stats.loyaltyPoints;
        document.getElementById('memberSince').textContent = this.stats.memberSince;

        // Update loyalty progress
        this.updateLoyaltyProgress();
    }

    updateLoyaltyProgress() {
        // Calculate progress based on loyalty points (every 100 points = 10% progress)
        const progress = Math.min((this.stats.loyaltyPoints / 1000) * 100, 100);
        
        document.getElementById('loyaltyProgress').textContent = `${Math.round(progress)}%`;
        document.getElementById('loyaltyBar').style.width = `${progress}%`;
    }

    async loadRecentOrders() {
        const orders = JSON.parse(localStorage.getItem('3dshoes_orders') || '[]');
        const recentOrdersList = document.getElementById('recentOrdersList');
        
        if (orders.length === 0) {
            // Keep the default empty state
            return;
        }

        // Show recent orders (last 3)
        const recentOrders = orders.slice(-3).reverse();
        
        recentOrdersList.innerHTML = recentOrders.map(order => `
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-semibold text-gray-800">Order #${order.id}</p>
                        <p class="text-sm text-gray-600">${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span class="px-3 py-1 text-xs font-semibold rounded-full ${this.getOrderStatusClass(order.status)}">
                        ${order.status}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-gray-600">${order.items.length} item(s)</p>
                    <p class="font-bold text-blue-600">₹${order.total}</p>
                </div>
            </div>
        `).join('');
    }

    getOrderStatusClass(status) {
        const statusClasses = {
            'Delivered': 'bg-green-100 text-green-800',
            'Shipped': 'bg-blue-100 text-blue-800',
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return statusClasses[status] || 'bg-gray-100 text-gray-800';
    }

    async loadWishlistPreview() {
        const wishlist = JSON.parse(localStorage.getItem('3dshoes_wishlist') || '[]');
        const wishlistPreview = document.getElementById('wishlistPreview');
        
        if (wishlist.length === 0) {
            // Keep the default empty state
            return;
        }

        // Show first 3 wishlist items
        const previewItems = wishlist.slice(0, 3);
        
        wishlistPreview.innerHTML = previewItems.map(item => `
            <div class="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                <img src="${item.image}" alt="${item.name}" class="w-full h-24 object-cover rounded mb-2">
                <p class="text-sm font-semibold text-gray-800 truncate">${item.name}</p>
                <p class="text-xs text-blue-600">₹${item.price}</p>
            </div>
        `).join('');
    }

    async updateAccountStatus() {
        // Load preferences
        const preferences = JSON.parse(localStorage.getItem('3dshoes_preferences') || '{}');
        
        // Update phone verification status
        const phoneStatus = document.getElementById('phoneVerificationStatus');
        if (this.currentUser.phone && this.currentUser.phoneVerified) {
            phoneStatus.className = 'fas fa-check-circle text-green-600';
        }

        // Update 2FA status
        const twoFactorStatus = document.getElementById('twoFactorStatus');
        if (preferences.enable2FA) {
            twoFactorStatus.className = 'fas fa-check-circle text-green-600';
        }

        // Load notification preferences
        const emailUpdates = document.getElementById('emailUpdates');
        const smsUpdates = document.getElementById('smsUpdates');
        
        if (emailUpdates) {
            emailUpdates.checked = preferences.emailNotifications !== false;
        }
        
        if (smsUpdates) {
            smsUpdates.checked = preferences.smsNotifications || false;
        }
    }

    startVerificationProcess() {
        // Create verification modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Complete Account Verification</h3>
                <div class="space-y-4">
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-2">Phone Verification</h4>
                        <p class="text-sm text-gray-600 mb-3">We'll send a code to verify your phone number</p>
                        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                            Verify Phone
                        </button>
                    </div>
                    <div class="p-4 bg-green-50 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-2">Enable 2FA</h4>
                        <p class="text-sm text-gray-600 mb-3">Add extra security to your account</p>
                        <button class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                            Setup 2FA
                        </button>
                    </div>
                </div>
                <button id="closeVerificationModal" class="mt-6 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal event
        modal.querySelector('#closeVerificationModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Mock verification processes
        modal.querySelectorAll('button:not(#closeVerificationModal)').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showNotification('Verification process started! Check your phone for instructions.', 'success');
                document.body.removeChild(modal);
            });
        });
    }

    updateNotificationPreferences() {
        const emailUpdates = document.getElementById('emailUpdates').checked;
        const smsUpdates = document.getElementById('smsUpdates').checked;
        
        const preferences = JSON.parse(localStorage.getItem('3dshoes_preferences') || '{}');
        preferences.emailNotifications = emailUpdates;
        preferences.smsNotifications = smsUpdates;
        
        localStorage.setItem('3dshoes_preferences', JSON.stringify(preferences));
        
        this.showNotification('Notification preferences updated successfully!', 'success');
    }

    logout() {
        // Clear user data
        localStorage.removeItem('3dshoes_user');
        
        // Show notification and redirect
        this.showNotification('Logged out successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    // Utility functions
    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.classList.remove('hidden');
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.classList.add('hidden');
    }

    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        // Set colors based on type
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white',
            warning: 'bg-yellow-500 text-black'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        
        // Set content
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Add close functionality
        const closeBtn = notification.querySelector('button');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        // Auto remove after 5 seconds
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

    // Public methods
    addDemoOrder() {
        const demoOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'Processing',
            items: [
                { name: 'Air Max Pro', quantity: 1, price: 8999 }
            ],
            total: 8999
        };
        
        const orders = JSON.parse(localStorage.getItem('3dshoes_orders') || '[]');
        orders.push(demoOrder);
        localStorage.setItem('3dshoes_orders', JSON.stringify(orders));
        
        this.loadDashboardData();
    }

    addLoyaltyPoints(points) {
        const currentPoints = parseInt(localStorage.getItem('3dshoes_loyalty_points') || '0');
        localStorage.setItem('3dshoes_loyalty_points', (currentPoints + points).toString());
        this.loadUserStats();
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.accountDashboard = new AccountDashboard();
});