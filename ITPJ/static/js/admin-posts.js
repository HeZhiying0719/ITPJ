/**
 * Focus Photography Forum - Admin Posts Management JavaScript
 * Handles functionality for the admin posts management page including
 * post actions, category management, and filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements - Post Management
    const postItems = document.querySelectorAll('.post-item');
    const adminActionButtons = document.querySelectorAll('.admin-action-btn');
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    // DOM Elements - Filters
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    // DOM Elements - Category Management
    const addCategoryForm = document.getElementById('addCategoryForm');
    const categoriesList = document.getElementById('categoriesList');
    const editCategoryButtons = document.querySelectorAll('.edit-category-btn');
    const deleteCategoryButtons = document.querySelectorAll('.delete-category-btn');
    const editCategoryForm = document.getElementById('editCategoryForm');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    // Variables
    let currentPostId = null;
    let currentCategoryName = null;
    
    // Handle post action buttons (delete, edit, info)
    adminActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            const postId = this.getAttribute('data-post-id');
            currentPostId = postId;
            
            switch(action) {
                case 'delete':
                    // Show delete confirmation modal
                    deleteModal.show();
                    break;
                    
                case 'edit':
                    // Redirect to edit page with post ID
                    window.location.href = `edit-post.html?id=${postId}`;
                    break;
                    
                case 'info':
                    // Show post details
                    window.location.href = `/manager/post-info/${postId}`;
                    break;
            }
        });
    });
    
    // Handle confirm delete button
    confirmDeleteBtn.addEventListener('click', function() {
        // In a real application, you would send an API request to delete the post
        console.log(`Deleting post with ID: ${currentPostId}`);
        
        // Find the post item element
        const postElement = document.querySelector(`.post-item .admin-action-btn[data-post-id="${currentPostId}"]`).closest('.post-item');
        
        // Fade out and remove the post element
        postElement.style.opacity = '0';
        setTimeout(() => {
            postElement.remove();
            
            // Check if there are no more posts
            if (document.querySelectorAll('.post-item').length === 0) {
                const postsListElement = document.querySelector('.posts-list');
                postsListElement.innerHTML = `
                    <div class="alert alert-info text-center my-4">
                        <i class="fas fa-info-circle mb-3" style="font-size: 2rem;"></i>
                        <h5>No posts found</h5>
                        <p>There are no posts matching your criteria.</p>
                        <a href="create-post.html" class="btn btn-primary mt-2">Create New Post</a>
                    </div>
                `;
            }
        }, 300);
        
        // Close the modal
        deleteModal.hide();
    });
    
    // Handle category and status filters
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedStatus = statusFilter.value;
        
        let visibleCount = 0;
        
        postItems.forEach(item => {
            const postCategory = item.querySelector('.text-muted').textContent.includes(selectedCategory);
            const postStatus = true; // In a real app, you would check post status
            
            // Show/hide based on filters
            if ((selectedCategory === '' || postCategory) && 
                (selectedStatus === '' || postStatus)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show no posts message if no visible items
        const postsListElement = document.querySelector('.posts-list');
        if (visibleCount === 0) {
            // Check if alert already exists
            if (!postsListElement.querySelector('.alert')) {
                postsListElement.innerHTML += `
                    <div class="alert alert-info text-center my-4">
                        <i class="fas fa-filter mb-3" style="font-size: 2rem;"></i>
                        <h5>No posts found</h5>
                        <p>There are no posts matching your criteria.</p>
                        <button class="btn btn-outline-secondary mt-2" id="resetFiltersBtn">Reset Filters</button>
                    </div>
                `;
                
                // Add event listener to the reset filters button
                document.getElementById('resetFiltersBtn').addEventListener('click', function() {
                    clearFilters();
                });
            }
        } else {
            // Remove alert if it exists
            const alertElement = postsListElement.querySelector('.alert');
            if (alertElement) {
                alertElement.remove();
            }
        }
    }
    
    // Clear filters
    function clearFilters() {
        categoryFilter.value = '';
        statusFilter.value = '';
        
        postItems.forEach(item => {
            item.style.display = 'block';
        });
        
        // Remove alert if it exists
        const alertElement = document.querySelector('.posts-list .alert');
        if (alertElement) {
            alertElement.remove();
        }
    }
    
    // Event listeners for filters
    categoryFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    clearFiltersBtn.addEventListener('click', clearFilters);
    
    // Handle category management
    
    // Add new category
    addCategoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const categoryName = document.getElementById('categoryName').value.trim();
        const categoryDescription = document.getElementById('categoryDescription').value.trim();
        
        if (!categoryName) {
            alert('Please enter a category name');
            return;
        }
        
        // Check if category already exists
        const existingCategories = Array.from(categoriesList.querySelectorAll('.list-group-item span')).map(el => el.textContent);
        
        if (existingCategories.includes(categoryName)) {
            alert('This category already exists');
            return;
        }
        
        // In a real application, you would send an API request to add the category
        
        // Create a new category element
        const newCategory = document.createElement('div');
        newCategory.className = 'list-group-item d-flex justify-content-between align-items-center category-highlight';
        newCategory.innerHTML = `
            <span>${categoryName}</span>
            <div>
                <button class="btn btn-sm btn-outline-primary me-1 edit-category-btn" data-category="${categoryName}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-category-btn" data-category="${categoryName}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Add the new category to the list
        categoriesList.appendChild(newCategory);
        
        // Add event listeners to the new buttons
        const newEditBtn = newCategory.querySelector('.edit-category-btn');
        const newDeleteBtn = newCategory.querySelector('.delete-category-btn');
        
        newEditBtn.addEventListener('click', handleEditCategory);
        newDeleteBtn.addEventListener('click', handleDeleteCategory);
        
        // Clear the form
        addCategoryForm.reset();
        
        // Add the category to the filter dropdown
        const newOption = document.createElement('option');
        newOption.value = categoryName;
        newOption.textContent = categoryName;
        categoryFilter.appendChild(newOption);
    });
    
    // Edit category
    function handleEditCategory() {
        const categoryName = this.getAttribute('data-category');
        currentCategoryName = categoryName;
        
        // Show edit form and hide add form
        addCategoryForm.classList.add('d-none');
        editCategoryForm.classList.remove('d-none');
        
        // Set current values
        document.getElementById('editCategoryName').value = categoryName;
        document.getElementById('editCategoryDescription').value = ''; // In a real app, you would fetch the description
        
        // Scroll to edit form
        editCategoryForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Cancel edit
    cancelEditBtn.addEventListener('click', function() {
        // Hide edit form and show add form
        editCategoryForm.classList.add('d-none');
        addCategoryForm.classList.remove('d-none');
    });
    
    // Save edited category
    editCategoryForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newCategoryName = document.getElementById('editCategoryName').value.trim();
        
        if (!newCategoryName) {
            alert('Please enter a category name');
            return;
        }
        
        // Check if new name already exists (except current name)
        const existingCategories = Array.from(categoriesList.querySelectorAll('.list-group-item span'))
            .map(el => el.textContent)
            .filter(name => name !== currentCategoryName);
        
        if (existingCategories.includes(newCategoryName)) {
            alert('This category name already exists');
            return;
        }
        
        // Find the category element
        const categoryElement = document.querySelector(`.edit-category-btn[data-category="${currentCategoryName}"]`).closest('.list-group-item');
        const categorySpan = categoryElement.querySelector('span');
        const editButton = categoryElement.querySelector('.edit-category-btn');
        const deleteButton = categoryElement.querySelector('.delete-category-btn');
        
        // Update category name
        categorySpan.textContent = newCategoryName;
        editButton.setAttribute('data-category', newCategoryName);
        deleteButton.setAttribute('data-category', newCategoryName);
        
        // Highlight the updated category
        categoryElement.classList.add('category-highlight');
        setTimeout(() => {
            categoryElement.classList.remove('category-highlight');
        }, 2000);
        
        // Hide edit form and show add form
        editCategoryForm.classList.add('d-none');
        addCategoryForm.classList.remove('d-none');
        
        // Update category in filter dropdown
        const option = Array.from(categoryFilter.options).find(opt => opt.value === currentCategoryName);
        if (option) {
            option.value = newCategoryName;
            option.textContent = newCategoryName;
        }
        
        // Reset current category
        currentCategoryName = null;
    });
    
    // Delete category
    function handleDeleteCategory() {
        const categoryName = this.getAttribute('data-category');
        
        // Confirm deletion
        if (confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
            // Find the category element
            const categoryElement = this.closest('.list-group-item');
            
            // Remove the category element with animation
            categoryElement.style.opacity = '0';
            setTimeout(() => {
                categoryElement.remove();
            }, 300);
            
            // Remove category from filter dropdown
            const option = Array.from(categoryFilter.options).find(opt => opt.value === categoryName);
            if (option) {
                option.remove();
            }
        }
    }
    
    // Add event listeners to edit and delete category buttons
    editCategoryButtons.forEach(button => {
        button.addEventListener('click', handleEditCategory);
    });
    
    deleteCategoryButtons.forEach(button => {
        button.addEventListener('click', handleDeleteCategory);
    });
    
    // Initialize tooltips for action buttons
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});