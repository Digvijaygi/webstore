// Profile Management System for 3D Shoes Website

class ProfileManager {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.initializeProfile();
    }

    initializeProfile() {
        this.checkLoginStatus();
        this.bindEvents();
        this.updateProfileUI();
    }

    // Check if user is logged in (from localStorage)
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

    // Bind all profile-related events
    bindEvents() {
        // Profile dropdown toggle
        const profileBtn = document.getElementById('profileBtn');
        const profileDropdown = document.getElementById('profileDropdown');
        
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                    profileDropdown.classList.add('hidden');
                }
            });
        }

        // Login modal events
        this.bindLoginModalEvents();
        
        // Signup modal events
        this.bindSignupModalEvents();
        
        // Logout event
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    bindLoginModalEvents() {
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const loginForm = document.getElementById('loginForm');
        const switchToSignup = document.getElementById('switchToSignup');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                loginModal.classList.remove('hidden');
                document.getElementById('profileDropdown').classList.add('hidden');
            });
        }

        if (closeLoginModal) {
            closeLoginModal.addEventListener('click', () => {
                loginModal.classList.add('hidden');
                this.resetLoginForm();
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (switchToSignup) {
            switchToSignup.addEventListener('click', () => {
                loginModal.classList.add('hidden');
                document.getElementById('signupModal').classList.remove('hidden');
                this.resetLoginForm();
            });
        }

        // Close modal on outside click
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    loginModal.classList.add('hidden');
                    this.resetLoginForm();
                }
            });
        }
    }

    bindSignupModalEvents() {
        const signupBtn = document.getElementById('signupBtn');
        const signupModal = document.getElementById('signupModal');
        const closeSignupModal = document.getElementById('closeSignupModal');
        const signupForm = document.getElementById('signupForm');
        const switchToLogin = document.getElementById('switchToLogin');

        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                signupModal.classList.remove('hidden');
                document.getElementById('profileDropdown').classList.add('hidden');
            });
        }

        if (closeSignupModal) {
            closeSignupModal.addEventListener('click', () => {
                signupModal.classList.add('hidden');
                this.resetSignupForm();
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        if (switchToLogin) {
            switchToLogin.addEventListener('click', () => {
                signupModal.classList.add('hidden');
                document.getElementById('loginModal').classList.remove('hidden');
                this.resetSignupForm();
            });
        }

        // Close modal on outside click
        if (signupModal) {
            signupModal.addEventListener('click', (e) => {
                if (e.target === signupModal) {
                    signupModal.classList.add('hidden');
                    this.resetSignupForm();
                }
            });
        }
    }

    // Handle login form submission
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            // Show loading
            this.showLoading();

            // Simulate API call (in real app, this would be actual API)
            await this.simulateDelay(1000);

            // For demo purposes, accept any email/password combination
            if (email && password) {
                const userData = {
                    id: Date.now(),
                    email: email,
                    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                    firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                    lastName: 'User',
                    phone: '+91 98765 43210',
                    joinDate: new Date().toISOString(),
                    rememberMe: rememberMe
                };

                this.loginUser(userData);
                this.hideLoading();
                document.getElementById('loginModal').classList.add('hidden');
                this.resetLoginForm();
                this.showNotification('Login successful! Welcome back.', 'success');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.hideLoading();
            this.showNotification('Login failed. Please check your credentials.', 'error');
        }
    }

    // Handle signup form submission
    async handleSignup(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('signupFirstName').value;
        const lastName = document.getElementById('signupLastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        // Validation
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }

        if (!agreeTerms) {
            this.showNotification('Please accept the terms and conditions.', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters long.', 'error');
            return;
        }

        try {
            // Show loading
            this.showLoading();

            // Simulate API call
            await this.simulateDelay(1500);

            const userData = {
                id: Date.now(),
                email: email,
                name: `${firstName} ${lastName}`,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                joinDate: new Date().toISOString(),
                rememberMe: true
            };

            this.loginUser(userData);
            this.hideLoading();
            document.getElementById('signupModal').classList.add('hidden');
            this.resetSignupForm();
            this.showNotification('Account created successfully! Welcome to 3D Shoes.', 'success');
        } catch (error) {
            this.hideLoading();
            this.showNotification('Signup failed. Please try again.', 'error');
        }
    }

    // Login user and update UI
    loginUser(userData) {
        this.currentUser = userData;
        this.isLoggedIn = true;
        
        // Save to localStorage
        localStorage.setItem('3dshoes_user', JSON.stringify(userData));
        
        // Update UI
        this.updateProfileUI();
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        
        // Clear localStorage
        localStorage.removeItem('3dshoes_user');
        
        // Update UI
        this.updateProfileUI();
        
        // Close dropdown
        document.getElementById('profileDropdown').classList.add('hidden');
        
        // Show notification
        this.showNotification('Logged out successfully!', 'success');
    }

    // Update profile UI based on login status
    updateProfileUI() {
        const userSection = document.getElementById('userSection');
        const guestSection = document.getElementById('guestSection');
        const userMenuItems = document.getElementById('userMenuItems');
        const guestMenuItems = document.getElementById('guestMenuItems');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');

        if (this.isLoggedIn && this.currentUser) {
            // Show user sections
            if (userSection) userSection.classList.remove('hidden');
            if (guestSection) guestSection.classList.add('hidden');
            if (userMenuItems) userMenuItems.classList.remove('hidden');
            if (guestMenuItems) guestMenuItems.classList.add('hidden');
            
            // Update user info
            if (userName) userName.textContent = this.currentUser.name || 'User';
            if (userEmail) userEmail.textContent = this.currentUser.email || '';
            
            // Update profile icon
            const profileBtn = document.getElementById('profileBtn');
            if (profileBtn) {
                profileBtn.innerHTML = '<i class="fas fa-user-circle text-lg text-blue-600"></i>';
                profileBtn.title = `Logged in as ${this.currentUser.name}`;
            }
        } else {
            // Show guest sections
            if (userSection) userSection.classList.add('hidden');
            if (guestSection) guestSection.classList.remove('hidden');
            if (userMenuItems) userMenuItems.classList.add('hidden');
            if (guestMenuItems) guestMenuItems.classList.remove('hidden');
            
            // Reset profile icon
            const profileBtn = document.getElementById('profileBtn');
            if (profileBtn) {
                profileBtn.innerHTML = '<i class="fas fa-user text-lg"></i>';
                profileBtn.title = 'Login or Sign up';
            }
        }
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

    resetLoginForm() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.reset();
        }
    }

    resetSignupForm() {
        const form = document.getElementById('signupForm');
        if (form) {
            form.reset();
        }
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

    // Public methods for other scripts to use
    getCurrentUser() {
        return this.currentUser;
    }

    isUserLoggedIn() {
        return this.isLoggedIn;
    }

    getUserId() {
        return this.currentUser ? this.currentUser.id : null;
    }

    getUserEmail() {
        return this.currentUser ? this.currentUser.email : null;
    }

    getUserName() {
        return this.currentUser ? this.currentUser.name : null;
    }
}

// Initialize profile manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.profileManager = new ProfileManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileManager;
}