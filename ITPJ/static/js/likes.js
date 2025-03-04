/**
 * Focus Photography Forum - Likes Page JavaScript
 * Handles functionality for the user's liked posts page
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const postCards = document.querySelectorAll('.card');
    const heartIcons = document.querySelectorAll('.fa-heart.liked');
    const unlikeButtons = document.querySelectorAll('.unlike-btn');
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

    // Handle unlike button clicks
    unlikeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            const postCard = this.closest('.card');
            const postTitle = postCard.querySelector('.post-title').textContent;
            const heartIcon = postCard.querySelector('.fa-heart.liked');
            const likesCountElement = heartIcon.nextSibling;
            
            if (confirm(`Remove "${postTitle}" from your liked posts?`)) {
                // In a real application, you would send an API request to unlike the post
                
                // Visual feedback - animate removal
                postCard.classList.add('removing');
                
                // After animation completes, remove the card
                setTimeout(() => {
                    postCard.style.display = 'none';
                    
                    // Check if there are no more posts and show a message if needed
                    const remainingPosts = document.querySelectorAll('.card:not([style*="display: none"])');
                    if (remainingPosts.length === 0) {
                        const postsContainer = document.querySelector('.posts');
                        postsContainer.innerHTML = `
                            <div class="alert alert-info text-center py-4">
                                <i class="fas fa-heart-broken mb-3" style="font-size: 2rem;"></i>
                                <h5>No liked posts yet</h5>
                                <p>When you like posts, they will appear here for easy access.</p>
                                <a href="index.html" class="btn btn-outline-primary mt-2">Browse posts</a>
                            </div>
                        `;
                    }
                }, 500);
                
                // Example AJAX call to unlike a post
                /*
                fetch(`/api/posts/${postId}/unlike`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        alert('Failed to unlike post');
                        postCard.classList.remove('removing');
                    }
                });
                */
            }
        });
    });

    // Handle card clicks to view post
    postCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if the unlike button was clicked
            if (e.target.closest('.unlike-btn')) {
                return;
            }
            
            const postTitle = this.querySelector('.post-title').textContent;
            
            // In a real application, you would redirect to the post page
            console.log(`Viewing post: ${postTitle}`);
            
            // Example redirect:
            // window.location.href = `post-details.html?id=${postId}`;
        });
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

    // Example function to filter liked posts by category
    function filterByCategory(category) {
        postCards.forEach(card => {
            const postCategory = card.querySelector('.text-muted').textContent;
            
            if (category === 'all' || postCategory.includes(category)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Example function to sort liked posts
    function sortPosts(criteria) {
        const postsContainer = document.querySelector('.posts');
        const postsArray = Array.from(postCards);
        
        switch(criteria) {
            case 'recent':
                // Sort by most recent
                postsArray.sort((a, b) => {
                    const dateA = a.querySelector('.text-muted').textContent.split('•')[2].trim();
                    const dateB = b.querySelector('.text-muted').textContent.split('•')[2].trim();
                    // This is a simple comparison - in a real app, parse actual dates
                    return dateA.localeCompare(dateB);
                });
                break;
            case 'popular':
                // Sort by most liked
                postsArray.sort((a, b) => {
                    const likesA = parseInt(a.querySelector('.fa-heart').nextSibling.nodeValue);
                    const likesB = parseInt(b.querySelector('.fa-heart').nextSibling.nodeValue);
                    return likesB - likesA;
                });
                break;
        }
        
        // Reorder the DOM elements
        postsArray.forEach(post => {
            postsContainer.appendChild(post);
        });
    }
});