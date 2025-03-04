/**
 * Focus Photography Forum - My Posts JavaScript
 * Handles functionality for the user's posts page
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const postCards = document.querySelectorAll('.card');
    const heartIcons = document.querySelectorAll('.fa-heart');
    const editButtons = document.querySelectorAll('.dropdown-item:contains("Edit")');
    const deleteButtons = document.querySelectorAll('.dropdown-item:contains("Delete")');
    const paginationLinks = document.querySelectorAll('.pagination .page-link');

    // Add hover effects to post cards
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        });
    });

    // Handle heart icon clicks (like/unlike)
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Toggle between regular and solid heart
            if (this.classList.contains('far')) {
                this.classList.remove('far');
                this.classList.add('fas');
                this.style.color = '#dc3545';
                
                // Increase the count
                const countElement = this.nextSibling;
                if (countElement && countElement.nodeType === Node.TEXT_NODE) {
                    let count = parseInt(countElement.nodeValue);
                    countElement.nodeValue = ' ' + (count + 1);
                }
            } else {
                this.classList.remove('fas');
                this.classList.add('far');
                this.style.color = '';
                
                // Decrease the count
                const countElement = this.nextSibling;
                if (countElement && countElement.nodeType === Node.TEXT_NODE) {
                    let count = parseInt(countElement.nodeValue);
                    countElement.nodeValue = ' ' + (count - 1);
                }
            }
        });
    });

    // Handle edit button clicks
    document.querySelectorAll('.dropdown-item').forEach(item => {
        if (item.textContent.includes('Edit')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const postCard = this.closest('.card');
                const postTitle = postCard.querySelector('.post-title').textContent;
                
                // In a real application, you would redirect to the edit page
                // with the post ID or load the post data into a form
                alert(`Editing post: ${postTitle}`);
                
                // Example redirect:
                // window.location.href = `edit-post.html?id=${postId}`;
            });
        }
        
        if (item.textContent.includes('Delete')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const postCard = this.closest('.card');
                const postTitle = postCard.querySelector('.post-title').textContent;
                
                // Confirm before deleting
                if (confirm(`Are you sure you want to delete "${postTitle}"?`)) {
                    // In a real application, you would send a delete request to the server
                    // and remove the post from the DOM upon success
                    postCard.style.opacity = '0';
                    setTimeout(() => {
                        postCard.style.display = 'none';
                    }, 500);
                    
                    // Example AJAX delete request:
                    /*
                    fetch(`/api/posts/${postId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            postCard.remove();
                        } else {
                            alert('Failed to delete post');
                        }
                    });
                    */
                }
            });
        }
    });

    // Handle pagination clicks
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.parentElement.classList.contains('active') && !this.parentElement.classList.contains('disabled')) {
                e.preventDefault();
                
                // Remove active class from current active page
                document.querySelector('.page-item.active').classList.remove('active');
                
                // Add active class to clicked page
                this.parentElement.classList.add('active');
                
                // In a real application, you would load the next page of posts
                // Either through AJAX or by navigating to a new page
                
                // Scroll to top of posts
                document.querySelector('.posts').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Example function to handle post filtering (for future implementation)
    function filterPosts(category) {
        postCards.forEach(card => {
            const postCategory = card.querySelector('.text-muted').textContent;
            
            if (category === 'all' || postCategory.includes(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});