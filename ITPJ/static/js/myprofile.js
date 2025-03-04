/**
 * Focus Photography Forum - My Account JavaScript
 * Handles functionality for the user's account profile page
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    const avatarContainer = document.querySelector('.profile-avatar');
    const avatarInput = document.getElementById('avatar-upload');
    const avatarImage = document.querySelector('.profile-avatar img');
    const savePasswordBtn = document.getElementById('save-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrengthBar = document.querySelector('.progress-bar');
    const passwordStrengthText = document.getElementById('password-strength-text');

    // Handle avatar click to trigger file input
    avatarContainer.addEventListener('click', function() {
        avatarInput.click();
    });

    // Handle avatar file selection
    avatarInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (JPG, PNG, etc.)');
                return;
            }
            
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Please select an image smaller than 2MB');
                return;
            }
            
            // Preview the image
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarImage.src = e.target.result;
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Handle profile form submission
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('username').value;
        const bio = document.getElementById('bio').value;
        
        // Validate username
        if (!username.trim()) {
            alert('Please enter a name');
            return;
        }
        
        // In a real application, you would send these values to the server
        console.log('Saving profile:', { username, bio });
        
        // Show success message
        const successToast = createToast('Profile updated successfully!');
        document.body.appendChild(successToast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            successToast.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(successToast);
            }, 500);
        }, 3000);
    });

    // Check password strength
    newPasswordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let message = '';
        
        // Update progress bar based on password strength
        if (password.length === 0) {
            strength = 0;
            message = 'Weak';
            passwordStrengthBar.className = 'progress-bar';
        } else if (password.length < 6) {
            strength = 25;
            message = 'Weak';
            passwordStrengthBar.className = 'progress-bar weak';
        } else if (password.length < 10) {
            strength = 50;
            message = 'Medium';
            passwordStrengthBar.className = 'progress-bar medium';
        } else {
            strength = 100;
            message = 'Strong';
            passwordStrengthBar.className = 'progress-bar strong';
        }
        
        // Check for numbers
        if (password.match(/\d+/)) {
            strength += 10;
        }
        
        // Check for special characters
        if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            strength += 10;
        }
        
        // Check for uppercase and lowercase letters
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 10;
        }
        
        // Cap strength at 100
        strength = Math.min(strength, 100);
        
        // Update UI
        passwordStrengthBar.style.width = strength + '%';
        passwordStrengthBar.setAttribute('aria-valuenow', strength);
        passwordStrengthText.textContent = message;
    });

    // Handle password form submission
    savePasswordBtn.addEventListener('click', function() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validate password fields
        if (!currentPassword) {
            alert('Please enter your current password');
            return;
        }
        
        if (!newPassword) {
            alert('Please enter a new password');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            alert('New password and confirmation do not match');
            return;
        }
        
        // In a real application, you would send the password change request to the server
        console.log('Changing password');
        
        // Close modal and show success message
        const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
        modal.hide();
        
        const successToast = createToast('Password changed successfully!');
        document.body.appendChild(successToast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            successToast.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(successToast);
            }, 500);
        }, 3000);
        
        // Reset the form
        passwordForm.reset();
        passwordStrengthBar.style.width = '0%';
        passwordStrengthBar.setAttribute('aria-valuenow', 0);
        passwordStrengthText.textContent = 'Weak';
    });

    // Helper function to create a toast notification
    function createToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        return toast;
    }

    // Add toast notification styling
    const style = document.createElement('style');
    style.textContent = `
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #343a40;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            z-index: 1050;
            transition: all 0.5s ease;
            animation: slideIn 0.5s ease forwards;
        }
        
        .toast-notification.hide {
            animation: slideOut 0.5s ease forwards;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
        }
        
        .toast-content i {
            font-size: 1.5rem;
            margin-right: 10px;
            color: #28a745;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
});