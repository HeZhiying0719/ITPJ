/**
 * Focus Photography Forum - Authentication Pages JavaScript
 * Handles functionality for login and registration forms
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements - Common
    const togglePasswordBtns = document.querySelectorAll('#togglePassword')

    // DOM Elements - Login Form
    const loginForm = document.getElementById('loginForm')

    // DOM Elements - Registration Form
    const registrationForm = document.getElementById('registrationForm')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const passwordStrength = document.getElementById('passwordStrength')
    const fullNameInput = document.getElementById('fullName')
    const emailInput = document.getElementById('email')

    // Check for redirect message
    const redirectMessage = localStorage.getItem('loginRedirectMessage')
    if (redirectMessage) {
        // Display the redirect message
        showToast(redirectMessage, 'warning')

        // Clear the message so it doesn't show again on refresh
        localStorage.removeItem('loginRedirectMessage')
    }

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const passwordField = this.previousElementSibling
            const type =
                passwordField.getAttribute('type') === 'password'
                    ? 'text'
                    : 'password'
            passwordField.setAttribute('type', type)

            // Change icon
            const icon = this.querySelector('i')
            icon.classList.toggle('fa-eye')
            icon.classList.toggle('fa-eye-slash')
        })
    })

    // Password strength checker
    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener('input', function () {
            const password = this.value
            updatePasswordStrength(password, passwordStrength)
        })
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault()

            const email = document.getElementById('email').value
            const password = document.getElementById('password').value

            if (!email || !password) {
                showToast('Please fill out all required fields', 'warning')
                return
            }

            // Simulate login API call
            console.log('Login attempt:', {email, password})

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]')
            const originalText = submitBtn.textContent
            submitBtn.disabled = true
            submitBtn.innerHTML =
                '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Logging in...'

            // Simulate API response delay
            setTimeout(() => {
                // Reset button
                submitBtn.disabled = false
                submitBtn.textContent = originalText

                // Check credentials (just for demo - in real app, this would be done server-side)
                if (
                    email === 'demo@example.com' &&
                    password === 'password123'
                ) {
                    // Set logged in status
                    localStorage.setItem('isLoggedIn', 'true')

                    showToast('Login successful! Redirecting...', 'success')

                    // Redirect to dashboard/home page after a delay
                    setTimeout(() => {
                        window.location.href = '../index.html'
                    }, 1500)
                } else {
                    showToast('Invalid email or password', 'danger')
                }
            }, 1500)
        })
    }

    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault()

            const fullName = fullNameInput.value
            const email = emailInput.value
            const password = passwordInput.value
            const confirmPassword = confirmPasswordInput.value
            const agreeTerms = document.getElementById('agreeTerms').checked

            // Validation
            if (!fullName || !email || !password || !confirmPassword) {
                showToast('Please fill out all required fields', 'warning')
                return
            }

            if (!agreeTerms) {
                showToast(
                    'You must agree to the Terms of Service and Privacy Policy',
                    'warning',
                )
                return
            }

            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'danger')
                confirmPasswordInput.focus()
                return
            }

            if (password.length < 8) {
                showToast(
                    'Password must be at least 8 characters long',
                    'warning',
                )
                passwordInput.focus()
                return
            }

            // Calculate password strength
            const strength = calculatePasswordStrength(password)
            if (strength < 2) {
                showToast('Please choose a stronger password', 'warning')
                passwordInput.focus()
                return
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]')
            const originalText = submitBtn.textContent
            submitBtn.disabled = true
            submitBtn.innerHTML =
                '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Creating account...'

            // Simulate API call
            console.log('Registration attempt:', {fullName, email, password})

            // Simulate API response delay
            setTimeout(() => {
                // Reset button
                submitBtn.disabled = false
                submitBtn.textContent = originalText

                // Success scenario - set demo user credentials
                localStorage.setItem('demoEmail', email)

                showToast(
                    'Account created successfully! Redirecting to login...',
                    'success',
                )

                // Redirect to login page after a delay
                setTimeout(() => {
                    window.location.href = 'originlogin.html'
                }, 2000)
            }, 1500)
        })
    }

    // Function to calculate password strength
    function calculatePasswordStrength(password) {
        let strength = 0

        // Length check
        if (password.length >= 8) strength += 1
        if (password.length >= 12) strength += 1

        // Complexity checks
        if (/[A-Z]/.test(password)) strength += 1 // Has uppercase
        if (/[a-z]/.test(password)) strength += 1 // Has lowercase
        if (/[0-9]/.test(password)) strength += 1 // Has number
        if (/[^A-Za-z0-9]/.test(password)) strength += 1 // Has special character

        return Math.min(5, strength) // Max score of 5
    }

    // Function to update password strength indicator
    function updatePasswordStrength(password, strengthElement) {
        if (!password) {
            strengthElement.style.width = '0'
            strengthElement.className = 'strength'
            return
        }

        const strength = calculatePasswordStrength(password)

        // Update strength indicator
        if (strength <= 2) {
            strengthElement.className = 'strength strength-weak'
        } else if (strength <= 4) {
            strengthElement.className = 'strength strength-medium'
        } else {
            strengthElement.className = 'strength strength-strong'
        }
    }

    // Helper function to show toast notifications
    function showToast(message, type = 'info') {
        // Create a toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container')
        if (!toastContainer) {
            toastContainer = document.createElement('div')
            toastContainer.className =
                'toast-container position-fixed bottom-0 end-0 p-3'
            toastContainer.style.zIndex = '1050'
            document.body.appendChild(toastContainer)
        }

        // Create toast element
        const toastEl = document.createElement('div')
        toastEl.className = `toast align-items-center text-white bg-${type} border-0`
        toastEl.setAttribute('role', 'alert')
        toastEl.setAttribute('aria-live', 'assertive')
        toastEl.setAttribute('aria-atomic', 'true')

        // Set toast content
        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `

        // Add toast to container
        toastContainer.appendChild(toastEl)

        // Initialize and show the toast
        const toast = new bootstrap.Toast(toastEl, {delay: 5000})
        toast.show()

        // Remove the toast element when hidden
        toastEl.addEventListener('hidden.bs.toast', function () {
            toastEl.remove()
            // Remove container if it's empty
            if (toastContainer.children.length === 0) {
                toastContainer.remove()
            }
        })
    }
})
