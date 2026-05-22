// Profile Page JavaScript for 3D Shoes Website

class ProfilePage {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.bindEvents();
        this.updateUI();
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
        // Tab switching
        const tabButtons = document.querySelectorAll('.profile-tab');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Form submissions
        this.bindFormEvents();
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Account actions
        this.bindAccountActions();
    }

    bindFormEvents() {
        // Personal info form
        const personalInfoForm = document.getElementById('personalInfoForm');
        if (personalInfoForm) {
            personalInfoForm.addEventListener('submit', (e) => this.handlePersonalInfoUpdate(e));
        }

        // Change password form
        const changePasswordForm = document.getElementById('changePasswordForm');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', (e) => this.handlePasswordChange(e));
        }

        // Preference toggles
        const toggles = document.querySelectorAll('input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', () => this.savePreferences());
        });

        // Select changes
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', () => this.savePreferences());
        });
    }

    bindAccountActions() {
        // Download data button
        const downloadDataBtn = document.getElementById('downloadDataBtn');
        if (downloadDataBtn) {
            downloadDataBtn.addEventListener('click', () => this.downloadUserData());
        }

        // Delete account button
        const deleteAccountBtn = document.getElementById('deleteAccountBtn');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => this.confirmDeleteAccount());
        }

        // Profile picture change
        const changeProfilePic = document.getElementById('changeProfilePic');
        if (changeProfilePic) {
            changeProfilePic.addEventListener('click', () => this.changeProfilePicture());
        }
    }

    switchTab(tabName) {
        // Remove active class from all tabs
        const tabButtons = document.querySelectorAll('.profile-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(btn => {
            btn.classList.remove('active', 'border-blue-600', 'text-blue-600');
            btn.classList.add('border-transparent', 'text-gray-700');
        });

        tabContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Add active class to current tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.getElementById(`${tabName}Tab`);

        if (activeTab && activeContent) {
            activeTab.classList.remove('border-transparent', 'text-gray-700');
            activeTab.classList.add('active', 'border-blue-600', 'text-blue-600');
            activeContent.classList.remove('hidden');
        }
    }

    updateUI() {
        const loginRequired = document.getElementById('loginRequired');
        const profileSections = document.getElementById('profileSections');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.isLoggedIn && this.currentUser) {
            // Show profile sections
            if (loginRequired) loginRequired.classList.add('hidden');
            if (profileSections) profileSections.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');

            // Update profile header
            this.updateProfileHeader();
            
            // Load user data into forms
            this.loadUserData();
        } else {
            // Show login required
            if (loginRequired) loginRequired.classList.remove('hidden');
            if (profileSections) profileSections.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
        }
    }

    updateProfileHeader() {
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const memberSince = document.getElementById('memberSince');

        if (profileName) {
            profileName.textContent = `Welcome, ${this.currentUser.name || 'User'}!`;
        }

        if (profileEmail) {
            profileEmail.textContent = this.currentUser.email || '';
        }

        if (memberSince && this.currentUser.joinDate) {
            const joinDate = new Date(this.currentUser.joinDate);
            memberSince.textContent = `Member since: ${joinDate.toLocaleDateString()}`;
        }
    }

    loadUserData() {
        // Load personal information
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
            if (field) {
                field.value = fields[fieldId];
            }
        });

        // Load preferences from localStorage
        this.loadPreferences();
    }

    loadPreferences() {
        const preferences = JSON.parse(localStorage.getItem('3dshoes_preferences') || '{}');
        
        // Load notification preferences
        const emailNotifications = document.getElementById('emailNotifications');
        const smsNotifications = document.getElementById('smsNotifications');
        
        if (emailNotifications) {
            emailNotifications.checked = preferences.emailNotifications !== false;
        }
        
        if (smsNotifications) {
            smsNotifications.checked = preferences.smsNotifications || false;
        }

        // Load language and currency
        const language = document.getElementById('language');
        const currency = document.getElementById('currency');
        
        if (language && preferences.language) {
            language.value = preferences.language;
        }
        
        if (currency && preferences.currency) {
            currency.value = preferences.currency;
        }

        // Load 2FA setting
        const enable2FA = document.getElementById('enable2FA');
        if (enable2FA) {
            enable2FA.checked = preferences.enable2FA || false;
        }
    }

    async handlePersonalInfoUpdate(e) {
        e.preventDefault();
        
        try {
            this.showLoading();

            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                pincode: document.getElementById('pincode').value
            };

            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email) {
                throw new Error('Please fill in all required fields');
            }

            // Simulate API call
            await this.simulateDelay(1000);

            // Update user data
            this.currentUser = { ...this.currentUser, ...formData };
            this.currentUser.name = `${formData.firstName} ${formData.lastName}`;
            
            // Save to localStorage
            localStorage.setItem('3dshoes_user', JSON.stringify(this.currentUser));

            // Update UI
            this.updateProfileHeader();
            
            this.hideLoading();
            this.showNotification('Profile updated successfully!', 'success');
        } catch (error) {
            this.hideLoading();
            this.showNotification(error.message, 'error');
        }
    }

    async handlePasswordChange(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        // Validation
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            this.showNotification('Please fill in all password fields', 'error');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            this.showNotification('New passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return;
        }

        try {
            this.showLoading();
            
            // Simulate API call
            await this.simulateDelay(1000);
            
            this.hideLoading();
            
            // Clear form
            document.getElementById('changePasswordForm').reset();
            
            this.showNotification('Password updated successfully!', 'success');
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to update password. Please try again.', 'error');
        }
    }

    savePreferences() {
        const preferences = {
            emailNotifications: document.getElementById('emailNotifications').checked,
            smsNotifications: document.getElementById('smsNotifications').checked,
            language: document.getElementById('language').value,
            currency: document.getElementById('currency').value,
            enable2FA: document.getElementById('enable2FA').checked
        };

        localStorage.setItem('3dshoes_preferences', JSON.stringify(preferences));
        this.showNotification('Preferences saved!', 'success');
    }

    downloadUserData() {
        const userData = {
            profile: this.currentUser,
            preferences: JSON.parse(localStorage.getItem('3dshoes_preferences') || '{}'),
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `3dshoes-userdata-${Date.now()}.json`;
        link.click();

        this.showNotification('User data downloaded successfully!', 'success');
    }

    confirmDeleteAccount() {
        const confirmation = confirm(
            'Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.'
        );

        if (confirmation) {
            const finalConfirmation = prompt(
                'Please type "DELETE" to confirm account deletion:'
            );

            if (finalConfirmation === 'DELETE') {
                this.deleteAccount();
            } else {
                this.showNotification('Account deletion cancelled.', 'info');
            }
        }
    }

    async deleteAccount() {
        try {
            this.showLoading();
            
            // Simulate API call
            await this.simulateDelay(2000);
            
            // Clear all user data
            localStorage.removeItem('3dshoes_user');
            localStorage.removeItem('3dshoes_preferences');
            localStorage.removeItem('3dshoes_cart');
            localStorage.removeItem('3dshoes_wishlist');
            
            this.hideLoading();
            
            // Show confirmation and redirect
            this.showNotification('Account deleted successfully. Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to delete account. Please try again.', 'error');
        }
    }

    changeProfilePicture() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // In a real app, you would upload to server
                    // For demo, we'll just show notification
                    this.showNotification('Profile picture updated! (Demo mode)', 'success');
                };
                reader.readAsDataURL(file);
            }
        };
        
        fileInput.click();
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
}

// Initialize profile page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.profilePage = new ProfilePage();
});