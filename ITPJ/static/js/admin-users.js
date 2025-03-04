/**
 * Focus Photography Forum - Admin Users Management JavaScript
 * Handles functionality for user management including editing, deleting users and
 * assigning admin rights
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements - User Management
    const userItems = document.querySelectorAll('.user-item')
    const actionButtons = document.querySelectorAll('.action-btn')
    const editUserModal = new bootstrap.Modal(
        document.getElementById('editUserModal'),
    )
    const deleteUserModal = new bootstrap.Modal(
        document.getElementById('deleteUserModal'),
    )
    const resetPasswordCheckbox = document.getElementById('resetPassword')
    const passwordFields = document.querySelector('.password-fields')

    // DOM Elements - Form Controls
    const editUserForm = document.getElementById('editUserForm')
    const addUserForm = document.getElementById('addUserForm')
    const saveUserChangesBtn = document.getElementById('saveUserChanges')
    const createUserBtn = document.getElementById('createUser')
    const confirmDeleteUserBtn = document.getElementById('confirmDeleteUser')

    // DOM Elements - Filters
    const roleFilter = document.getElementById('roleFilter')
    const clearFiltersBtn = document.getElementById('clearFilters')

    // Variables
    let currentUserId = null

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    )
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Toggle password fields visibility based on reset password checkbox
    resetPasswordCheckbox?.addEventListener('change', function () {
        if (this.checked) {
            passwordFields.classList.remove('d-none')
        } else {
            passwordFields.classList.add('d-none')
        }
    })

    // Handle user action buttons (edit, delete, make-admin)
    actionButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault()

            const action = this.getAttribute('data-action')
            const userId = this.getAttribute('data-user-id')
            currentUserId = userId

            // Find the parent user item
            const userItem = this.closest('.user-item')

            switch (action) {
                case 'edit':
                    // Populate edit form with user data
                    populateEditForm(userItem)
                    editUserModal.show()
                    break

                case 'delete':
                    // Show delete confirmation modal
                    deleteUserModal.show()
                    break

                case 'make-admin':
                    // Make user an admin
                    makeUserAdmin(userItem)
                    break

                case 'remove-admin':
                    // Remove admin rights
                    removeAdminRights(userItem)
                    break
            }
        })
    })

    // Function to populate edit form with user data
    function populateEditForm(userItem) {
        const username = userItem.querySelector('.card-title').textContent
        const email = userItem.querySelector('.text-muted').textContent
        const role = userItem.querySelector('.role-badge').textContent

        document.getElementById('editFullName').value = username
        document.getElementById('editEmail').value = email
        document.getElementById('editUserRole').value =
            role === 'Administrator' ? 'admin' : 'user'
        document.getElementById('editBio').value = '' // We don't have bio in the UI, so leave it empty

        // Reset password fields
        resetPasswordCheckbox.checked = false
        passwordFields.classList.add('d-none')
    }

    // Function to make user an admin
    function makeUserAdmin(userItem) {
        const roleBadge = userItem.querySelector('.role-badge')
        const actionBtn = userItem.querySelector('[data-action="make-admin"]')

        // Update UI
        roleBadge.textContent = 'Administrator'
        roleBadge.classList.remove('bg-secondary')
        roleBadge.classList.add('bg-primary')

        // Change button from "Make Admin" to "Remove Admin"
        actionBtn.setAttribute('data-action', 'remove-admin')
        actionBtn.setAttribute('title', 'Remove Admin')
        actionBtn.setAttribute('data-bs-original-title', 'Remove Admin')
        actionBtn.querySelector('i').classList.remove('fa-user-shield')
        actionBtn.querySelector('i').classList.add('fa-user')

        // Update tooltip
        const tooltip = bootstrap.Tooltip.getInstance(actionBtn)
        if (tooltip) {
            tooltip.dispose()
        }
        new bootstrap.Tooltip(actionBtn)

        // Provide feedback
        showToast('User has been made an administrator')
    }

    // Function to remove admin rights
    function removeAdminRights(userItem) {
        const roleBadge = userItem.querySelector('.role-badge')
        const actionBtn = userItem.querySelector('[data-action="remove-admin"]')

        // Update UI
        roleBadge.textContent = 'Regular User'
        roleBadge.classList.remove('bg-primary')
        roleBadge.classList.add('bg-secondary')

        // Change button from "Remove Admin" to "Make Admin"
        actionBtn.setAttribute('data-action', 'make-admin')
        actionBtn.setAttribute('title', 'Make Admin')
        actionBtn.setAttribute('data-bs-original-title', 'Make Admin')
        actionBtn.querySelector('i').classList.remove('fa-user')
        actionBtn.querySelector('i').classList.add('fa-user-shield')

        // Update tooltip
        const tooltip = bootstrap.Tooltip.getInstance(actionBtn)
        if (tooltip) {
            tooltip.dispose()
        }
        new bootstrap.Tooltip(actionBtn)

        // Provide feedback
        showToast('Administrator rights have been removed')
    }

    // Handle save user changes
    saveUserChangesBtn?.addEventListener('click', function () {
        const fullName = document.getElementById('editFullName').value
        const email = document.getElementById('editEmail').value
        const role = document.getElementById('editUserRole').value

        if (!fullName || !email) {
            alert('Please fill out all required fields')
            return
        }

        // Find the user item to update
        const userItem = document
            .querySelector(`.action-btn[data-user-id="${currentUserId}"]`)
            .closest('.user-item')

        // Update user data in UI
        userItem.querySelector('.card-title').textContent = fullName
        userItem.querySelector('.card-text').textContent = email

        // Update role badge if changed
        const roleBadge = userItem.querySelector('.role-badge')
        if (role === 'admin' && roleBadge.textContent !== 'Administrator') {
            roleBadge.textContent = 'Administrator'
            roleBadge.classList.remove('bg-secondary')
            roleBadge.classList.add('bg-primary')

            // Update make/remove admin button
            const adminBtn = userItem.querySelector(
                '[data-action="make-admin"]',
            )
            if (adminBtn) {
                adminBtn.setAttribute('data-action', 'remove-admin')
                adminBtn.setAttribute('title', 'Remove Admin')
                adminBtn.setAttribute('data-bs-original-title', 'Remove Admin')
                adminBtn.querySelector('i').classList.remove('fa-user-shield')
                adminBtn.querySelector('i').classList.add('fa-user')

                // Update tooltip
                const tooltip = bootstrap.Tooltip.getInstance(adminBtn)
                if (tooltip) {
                    tooltip.dispose()
                }
                new bootstrap.Tooltip(adminBtn)
            }
        } else if (
            role === 'user' &&
            roleBadge.textContent !== 'Regular User'
        ) {
            roleBadge.textContent = 'Regular User'
            roleBadge.classList.remove('bg-primary')
            roleBadge.classList.add('bg-secondary')

            // Update make/remove admin button
            const adminBtn = userItem.querySelector(
                '[data-action="remove-admin"]',
            )
            if (adminBtn) {
                adminBtn.setAttribute('data-action', 'make-admin')
                adminBtn.setAttribute('title', 'Make Admin')
                adminBtn.setAttribute('data-bs-original-title', 'Make Admin')
                adminBtn.querySelector('i').classList.remove('fa-user')
                adminBtn.querySelector('i').classList.add('fa-user-shield')

                // Update tooltip
                const tooltip = bootstrap.Tooltip.getInstance(adminBtn)
                if (tooltip) {
                    tooltip.dispose()
                }
                new bootstrap.Tooltip(adminBtn)
            }
        }

        // Close modal
        editUserModal.hide()

        // Provide feedback
        showToast('User information has been updated')
    })

    // Handle create user
    createUserBtn?.addEventListener('click', function () {
        const fullName = document.getElementById('fullName').value
        const email = document.getElementById('email').value
        const role = document.getElementById('userRole').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        if (!fullName || !email || !password || !confirmPassword) {
            alert('Please fill out all required fields')
            return
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        // In a real application, you would send an API request to create the user

        // Close modal
        const addUserModal = bootstrap.Modal.getInstance(
            document.getElementById('addUserModal'),
        )
        addUserModal.hide()

        // Create new user element
        const newUserHtml = `
            <div class="card mb-3 user-item">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-1 text-center">
                            <img src="/img/default-user.png" class="user-avatar rounded-circle" alt="User avatar">
                        </div>
                        <div class="col-md-4">
                            <h5 class="card-title mb-0">${fullName}</h5>
                            <p class="card-text text-muted small mb-0">${email}</p>
                            <span class="badge ${
                                role === 'admin' ? 'bg-primary' : 'bg-secondary'
                            } role-badge">${
            role === 'admin' ? 'Administrator' : 'Regular User'
        }</span>
                        </div>
                        <div class="col-md-5">
                            <div class="user-stats d-flex justify-content-around text-center">
                                <div class="stat-item">
                                    <div class="stat-value">0</div>
                                    <div class="stat-label small text-muted">Posts</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">0</div>
                                    <div class="stat-label small text-muted">Comments</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">Today</div>
                                    <div class="stat-label small text-muted">Joined</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-end">
                            ${
                                role === 'user'
                                    ? `
                            <button class="btn btn-outline-primary me-2 btn-sm action-btn" data-bs-toggle="tooltip" title="Make Admin" data-user-id="new" data-action="make-admin">
                                <i class="fas fa-user-shield"></i>
                            </button>
                            `
                                    : `
                            <button class="btn btn-outline-primary me-2 btn-sm action-btn" data-bs-toggle="tooltip" title="Remove Admin" data-user-id="new" data-action="remove-admin">
                                <i class="fas fa-user"></i>
                            </button>
                            `
                            }
                            <button class="btn btn-outline-secondary me-2 btn-sm action-btn" data-bs-toggle="tooltip" title="Edit User" data-user-id="new" data-action="edit">
                                <i class="fas fa-user-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm action-btn" data-bs-toggle="tooltip" title="Delete User" data-user-id="new" data-action="delete">
                                <i class="fas fa-user-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `

        // Add new user to the top of the list
        const usersList = document.querySelector('.users-list')
        usersList.insertAdjacentHTML('afterbegin', newUserHtml)

        // Add event listeners to the new buttons
        const newUserItem = usersList.querySelector('.user-item:first-child')
        const newActionButtons = newUserItem.querySelectorAll('.action-btn')

        newActionButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault()

                const action = this.getAttribute('data-action')
                const userId = this.getAttribute('data-user-id')
                currentUserId = userId

                switch (action) {
                    case 'edit':
                        populateEditForm(newUserItem)
                        editUserModal.show()
                        break

                    case 'delete':
                        deleteUserModal.show()
                        break

                    case 'make-admin':
                        makeUserAdmin(newUserItem)
                        break

                    case 'remove-admin':
                        removeAdminRights(newUserItem)
                        break
                }
            })
        })

        // Initialize tooltips for the new buttons
        newActionButtons.forEach(button => {
            new bootstrap.Tooltip(button)
        })

        // Reset form
        addUserForm.reset()

        // Provide feedback
        showToast('New user has been created')
    })

    // Handle delete user confirmation
    confirmDeleteUserBtn?.addEventListener('click', function () {
        // Find the user item to delete
        const userItem = document
            .querySelector(`.action-btn[data-user-id="${currentUserId}"]`)
            .closest('.user-item')

        // Fade out and remove the user element
        userItem.style.opacity = '0'
        setTimeout(() => {
            userItem.remove()

            // Check if there are no more users
            if (document.querySelectorAll('.user-item').length === 0) {
                const usersListElement = document.querySelector('.users-list')
                usersListElement.innerHTML = `
                    <div class="alert alert-info text-center my-4">
                        <i class="fas fa-users mb-3" style="font-size: 2rem;"></i>
                        <h5>No users found</h5>
                        <p>There are no users matching your criteria.</p>
                        <button class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
                    </div>
                `
            }
        }, 300)

        // Close modal
        deleteUserModal.hide()

        // Provide feedback
        showToast('User has been deleted')
    })

    // Handle role filter
    function applyFilters() {
        const selectedRole = roleFilter.value

        let visibleCount = 0

        userItems.forEach(item => {
            const userRoleBadge = item.querySelector('.role-badge')
            const userRole =
                userRoleBadge.textContent === 'Administrator' ? 'admin' : 'user'

            // Show/hide based on filters
            if (selectedRole === '' || userRole === selectedRole) {
                item.style.display = 'block'
                visibleCount++
            } else {
                item.style.display = 'none'
            }
        })

        // Show no users message if no visible items
        const usersListElement = document.querySelector('.users-list')
        if (visibleCount === 0) {
            // Check if alert already exists
            if (!usersListElement.querySelector('.alert')) {
                usersListElement.innerHTML += `
                    <div class="alert alert-info text-center my-4">
                        <i class="fas fa-filter mb-3" style="font-size: 2rem;"></i>
                        <h5>No users found</h5>
                        <p>There are no users matching your criteria.</p>
                        <button class="btn btn-outline-secondary mt-2" id="resetFiltersBtn">Reset Filters</button>
                    </div>
                `

                // Add event listener to the reset filters button
                document
                    .getElementById('resetFiltersBtn')
                    ?.addEventListener('click', function () {
                        clearFilters()
                    })
            }
        } else {
            // Remove alert if it exists
            const alertElement = usersListElement.querySelector('.alert')
            if (alertElement) {
                alertElement.remove()
            }
        }
    }

    // Clear filters
    function clearFilters() {
        roleFilter.value = ''

        userItems.forEach(item => {
            item.style.display = 'block'
        })

        // Remove alert if it exists
        const alertElement = document.querySelector('.users-list .alert')
        if (alertElement) {
            alertElement.remove()
        }
    }

    // Event listeners for filters
    roleFilter?.addEventListener('change', applyFilters)
    clearFiltersBtn?.addEventListener('click', clearFilters)

    // Helper function to show toast notification
    function showToast(message) {
        // Create a toast element
        const toastContainer = document.createElement('div')
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3'
        toastContainer.style.zIndex = '1050'

        const toastElement = document.createElement('div')
        toastElement.className =
            'toast align-items-center text-white bg-dark border-0'
        toastElement.setAttribute('role', 'alert')
        toastElement.setAttribute('aria-live', 'assertive')
        toastElement.setAttribute('aria-atomic', 'true')

        toastElement.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `

        toastContainer.appendChild(toastElement)
        document.body.appendChild(toastContainer)

        // Initialize and show the toast
        const toast = new bootstrap.Toast(toastElement, {delay: 3000})
        toast.show()

        // Remove the toast element when hidden
        toastElement.addEventListener('hidden.bs.toast', function () {
            document.body.removeChild(toastContainer)
        })
    }
})
