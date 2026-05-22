// Checkout Page JavaScript for 3D Shoes Website

class CheckoutPage {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.cart = [];
        this.currentStep = 1;
        this.shippingInfo = {};
        this.paymentInfo = {};
        this.orderTotal = 0;
        this.promoCodes = {
            'WELCOME10': { discount: 10, type: 'percentage', description: '10% off for new customers' },
            'SAVE500': { discount: 500, type: 'fixed', description: '₹500 off on orders above ₹5000' },
            'FREESHIP': { discount: 99, type: 'shipping', description: 'Free shipping' }
        };
        this.appliedPromo = null;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.loadCart();
        this.bindEvents();
        this.updateUI();
        if (this.isLoggedIn && this.cart.length > 0) {
            this.loadOrderSummary();
            this.prefillUserInfo();
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

    loadCart() {
        this.cart = JSON.parse(localStorage.getItem('3dshoes_cart') || '[]');
    }

    bindEvents() {
        // Step navigation
        document.getElementById('continueToPayment').addEventListener('click', () => this.proceedToPayment());
        document.getElementById('continueToReview').addEventListener('click', () => this.proceedToReview());
        document.getElementById('backToShipping').addEventListener('click', () => this.goToStep(1));
        document.getElementById('backToPayment').addEventListener('click', () => this.goToStep(2));
        
        // Place order
        document.getElementById('placeOrder').addEventListener('click', () => this.placeOrder());

        // Payment method selection
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const method = e.currentTarget.dataset.method;
                this.selectPaymentMethod(method);
            });
        });

        // Form input formatting
        this.bindFormFormatting();

        // Promo code
        document.getElementById('applyPromoCode').addEventListener('click', () => this.applyPromoCode());
        
        // Order success modal
        document.getElementById('continueShoppingBtn').addEventListener('click', () => {
            window.location.href = 'index.html#products';
        });
        
        document.getElementById('trackOrderBtn').addEventListener('click', () => {
            window.location.href = 'orders.html';
        });

        // Auto-populate user info if available
        this.bindAutoComplete();
    }

    bindFormFormatting() {
        // Card number formatting
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                e.target.value = value;
            });
        }

        // Expiry date formatting
        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        // CVV formatting
        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
            });
        }

        // Phone number formatting
        const phone = document.getElementById('phone');
        if (phone) {
            phone.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
            });
        }

        // Pin code formatting
        const pincode = document.getElementById('pincode');
        if (pincode) {
            pincode.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 6);
            });
        }
    }

    bindAutoComplete() {
        // Auto-fill card name with shipping name
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const cardName = document.getElementById('cardName');

        if (firstName && lastName && cardName) {
            const updateCardName = () => {
                const fullName = `${firstName.value} ${lastName.value}`.trim();
                if (fullName.length > 1) {
                    cardName.value = fullName.toUpperCase();
                }
            };

            firstName.addEventListener('blur', updateCardName);
            lastName.addEventListener('blur', updateCardName);
        }
    }

    updateUI() {
        const loginRequired = document.getElementById('loginRequired');
        const emptyCartSection = document.getElementById('emptyCartSection');
        const checkoutProcess = document.getElementById('checkoutProcess');

        if (!this.isLoggedIn) {
            // Show login required
            loginRequired.classList.remove('hidden');
            emptyCartSection.classList.add('hidden');
            checkoutProcess.classList.add('hidden');
        } else if (this.cart.length === 0) {
            // Show empty cart
            loginRequired.classList.add('hidden');
            emptyCartSection.classList.remove('hidden');
            checkoutProcess.classList.add('hidden');
        } else {
            // Show checkout process
            loginRequired.classList.add('hidden');
            emptyCartSection.classList.add('hidden');
            checkoutProcess.classList.remove('hidden');
        }
    }

    prefillUserInfo() {
        if (this.currentUser) {
            // Prefill shipping form with user data
            const fields = {
                'firstName': this.currentUser.firstName || '',
                'lastName': this.currentUser.lastName || '',
                'email': this.currentUser.email || '',
                'phone': this.currentUser.phone || '',
                'address': this.currentUser.address || '',
                'city': this.currentUser.city || '',
                'pincode': this.currentUser.pincode || ''
            };

            Object.keys(fields).forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field && fields[fieldId]) {
                    field.value = fields[fieldId];
                }
            });
        }
    }

    loadOrderSummary() {
        const orderSummaryItems = document.getElementById('orderSummaryItems');
        
        if (this.cart.length === 0) {
            orderSummaryItems.innerHTML = '<p class="text-gray-500">No items in cart</p>';
            return;
        }

        orderSummaryItems.innerHTML = this.cart.map(item => `
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-800">${item.name}</h4>
                    <p class="text-sm text-gray-600">Size: ${item.size || 'N/A'} • Qty: ${item.quantity}</p>
                    <p class="font-semibold text-blue-600">₹${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            </div>
        `).join('');

        this.calculateOrderTotal();
    }

    calculateOrderTotal() {
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        let shipping = subtotal > 2000 ? 0 : 99; // Free shipping above ₹2000
        let tax = Math.round(subtotal * 0.18); // 18% GST
        let discount = 0;

        // Apply promo code discount
        if (this.appliedPromo) {
            const promo = this.promoCodes[this.appliedPromo];
            if (promo.type === 'percentage') {
                discount = Math.round(subtotal * (promo.discount / 100));
            } else if (promo.type === 'fixed') {
                discount = Math.min(promo.discount, subtotal);
            } else if (promo.type === 'shipping') {
                shipping = Math.max(0, shipping - promo.discount);
            }
        }

        const total = subtotal + shipping + tax - discount;

        document.getElementById('subtotalAmount').textContent = `₹${subtotal.toLocaleString()}`;
        document.getElementById('shippingAmount').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
        document.getElementById('taxAmount').textContent = `₹${tax.toLocaleString()}`;
        document.getElementById('totalAmount').textContent = `₹${total.toLocaleString()}`;

        this.orderTotal = total;
    }

    goToStep(step) {
        // Hide all steps
        document.querySelectorAll('.checkout-step').forEach(stepEl => {
            stepEl.classList.add('hidden');
        });

        // Show current step
        document.getElementById(`step${step}`).classList.remove('hidden');

        // Update step indicators
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNum = index + 1;
            const circle = indicator.querySelector('span');
            
            if (stepNum < step) {
                // Completed step
                circle.className = 'w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center';
                circle.innerHTML = '<i class="fas fa-check text-sm"></i>';
                indicator.classList.remove('active');
            } else if (stepNum === step) {
                // Current step
                circle.className = 'w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center';
                circle.textContent = stepNum;
                indicator.classList.add('active');
            } else {
                // Future step
                circle.className = 'w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center';
                circle.textContent = stepNum;
                indicator.classList.remove('active');
            }
        });

        this.currentStep = step;
    }

    proceedToPayment() {
        // Validate shipping form
        const form = document.getElementById('shippingForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Store shipping information
        this.shippingInfo = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value
        };

        this.goToStep(2);
    }

    proceedToReview() {
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPayment) {
            this.showNotification('Please select a payment method', 'warning');
            return;
        }

        // Validate payment details based on selected method
        if (selectedPayment.value === 'card') {
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardName = document.getElementById('cardName').value;

            if (!cardNumber || !expiryDate || !cvv || !cardName) {
                this.showNotification('Please fill in all card details', 'warning');
                return;
            }

            if (cardNumber.replace(/\s/g, '').length !== 16) {
                this.showNotification('Please enter a valid card number', 'warning');
                return;
            }
        } else if (selectedPayment.value === 'upi') {
            const upiId = document.getElementById('upiId').value;
            if (upiId && !upiId.includes('@')) {
                this.showNotification('Please enter a valid UPI ID', 'warning');
                return;
            }
        }

        // Store payment information
        this.paymentInfo = {
            method: selectedPayment.value,
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cardName: document.getElementById('cardName').value,
            upiId: document.getElementById('upiId').value
        };

        this.generateOrderReview();
        this.goToStep(3);
    }

    selectPaymentMethod(method) {
        // Update payment option styles
        document.querySelectorAll('.payment-option').forEach(option => {
            option.classList.remove('border-blue-500', 'bg-blue-50');
            option.classList.add('border-gray-200');
        });

        const selectedOption = document.querySelector(`[data-method="${method}"]`);
        selectedOption.classList.remove('border-gray-200');
        selectedOption.classList.add('border-blue-500', 'bg-blue-50');

        // Update radio button
        document.querySelector(`input[value="${method}"]`).checked = true;

        // Show/hide relevant forms
        document.getElementById('cardDetailsForm').classList.toggle('hidden', method !== 'card');
        document.getElementById('upiDetailsForm').classList.toggle('hidden', method !== 'upi');
    }

    generateOrderReview() {
        const orderReviewContent = document.getElementById('orderReviewContent');
        
        orderReviewContent.innerHTML = `
            <!-- Shipping Information -->
            <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-shipping-fast text-blue-600 mr-2"></i>
                    Shipping Address
                </h3>
                <div class="text-gray-600">
                    <p class="font-semibold">${this.shippingInfo.firstName} ${this.shippingInfo.lastName}</p>
                    <p>${this.shippingInfo.address}</p>
                    <p>${this.shippingInfo.city}, ${this.shippingInfo.state} - ${this.shippingInfo.pincode}</p>
                    <p>Phone: ${this.shippingInfo.phone}</p>
                    <p>Email: ${this.shippingInfo.email}</p>
                </div>
            </div>

            <!-- Payment Information -->
            <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-credit-card text-green-600 mr-2"></i>
                    Payment Method
                </h3>
                <div class="text-gray-600">
                    ${this.getPaymentMethodDisplay()}
                </div>
            </div>

            <!-- Order Items -->
            <div class="border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                    <i class="fas fa-shopping-bag text-purple-600 mr-2"></i>
                    Order Items (${this.cart.length} items)
                </h3>
                <div class="space-y-4">
                    ${this.cart.map(item => `
                        <div class="flex items-center space-x-4">
                            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-800">${item.name}</h4>
                                <p class="text-gray-600">Size: ${item.size || 'N/A'} • Quantity: ${item.quantity}</p>
                                <p class="font-semibold text-blue-600">₹${(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Order Total -->
            <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹${this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Shipping:</span>
                        <span>${document.getElementById('shippingAmount').textContent}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Tax:</span>
                        <span>${document.getElementById('taxAmount').textContent}</span>
                    </div>
                    ${this.appliedPromo ? `
                        <div class="flex justify-between text-green-600">
                            <span>Discount (${this.appliedPromo}):</span>
                            <span>-₹${this.getDiscountAmount()}</span>
                        </div>
                    ` : ''}
                    <div class="border-t border-gray-300 pt-2">
                        <div class="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span>₹${this.orderTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPaymentMethodDisplay() {
        switch (this.paymentInfo.method) {
            case 'card':
                const maskedCard = this.paymentInfo.cardNumber ? 
                    '**** **** **** ' + this.paymentInfo.cardNumber.slice(-4) : 
                    'Credit/Debit Card';
                return `<p class="font-semibold">${maskedCard}</p><p>${this.paymentInfo.cardName}</p>`;
            case 'upi':
                return `<p class="font-semibold">UPI Payment</p><p>${this.paymentInfo.upiId || 'UPI ID will be requested during payment'}</p>`;
            case 'wallet':
                return `<p class="font-semibold">Digital Wallet</p><p>Payment gateway will redirect to your chosen wallet</p>`;
            case 'cod':
                return `<p class="font-semibold">Cash on Delivery</p><p>Pay ₹${this.orderTotal.toLocaleString()} when you receive your order</p>`;
            default:
                return '<p>Payment method not selected</p>';
        }
    }

    applyPromoCode() {
        const promoCode = document.getElementById('promoCode').value.toUpperCase();
        const promoMessage = document.getElementById('promoMessage');

        if (!promoCode) {
            this.showPromoMessage('Please enter a promo code', 'error');
            return;
        }

        if (!this.promoCodes[promoCode]) {
            this.showPromoMessage('Invalid promo code', 'error');
            return;
        }

        if (this.appliedPromo === promoCode) {
            this.showPromoMessage('Promo code already applied', 'warning');
            return;
        }

        const promo = this.promoCodes[promoCode];
        
        // Check if promo code conditions are met
        if (promoCode === 'SAVE500') {
            const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            if (subtotal < 5000) {
                this.showPromoMessage('This promo code requires a minimum order of ₹5000', 'error');
                return;
            }
        }

        this.appliedPromo = promoCode;
        this.calculateOrderTotal();
        this.showPromoMessage(`Promo code applied! ${promo.description}`, 'success');
    }

    showPromoMessage(message, type) {
        const promoMessage = document.getElementById('promoMessage');
        promoMessage.textContent = message;
        promoMessage.className = `mt-2 text-sm ${type === 'success' ? 'text-green-600' : type === 'warning' ? 'text-yellow-600' : 'text-red-600'}`;
        promoMessage.classList.remove('hidden');
    }

    getDiscountAmount() {
        if (!this.appliedPromo) return 0;
        
        const promo = this.promoCodes[this.appliedPromo];
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        if (promo.type === 'percentage') {
            return Math.round(subtotal * (promo.discount / 100));
        } else if (promo.type === 'fixed') {
            return Math.min(promo.discount, subtotal);
        } else if (promo.type === 'shipping') {
            return promo.discount;
        }
        return 0;
    }

    async placeOrder() {
        try {
            this.showLoading();

            // Simulate order processing
            await this.simulateDelay(2000);

            // Generate order ID
            const orderId = `ORD${Date.now()}`;
            
            // Create order object
            const order = {
                id: orderId,
                date: new Date().toISOString(),
                status: 'Processing',
                items: this.cart,
                total: this.orderTotal,
                shippingAddress: this.shippingInfo,
                paymentMethod: this.getPaymentMethodDisplay(),
                trackingNumber: `TRK${Date.now()}`
            };

            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem('3dshoes_orders') || '[]');
            orders.push(order);
            localStorage.setItem('3dshoes_orders', JSON.stringify(orders));

            // Clear cart
            localStorage.removeItem('3dshoes_cart');
            this.cart = [];

            // Add loyalty points
            const loyaltyPoints = Math.floor(this.orderTotal / 100);
            const currentPoints = parseInt(localStorage.getItem('3dshoes_loyalty_points') || '0');
            localStorage.setItem('3dshoes_loyalty_points', (currentPoints + loyaltyPoints).toString());

            this.hideLoading();

            // Show success modal
            document.getElementById('orderConfirmationId').textContent = orderId;
            document.getElementById('orderSuccessModal').classList.remove('hidden');

        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to place order. Please try again.', 'error');
        }
    }

    // Utility functions
    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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

// Initialize checkout page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.checkoutPage = new CheckoutPage();
});