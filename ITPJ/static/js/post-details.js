/**
 * Focus Photography Forum - Post Details JavaScript
 * Handles functionality for the post details page including comments, likes, and post actions
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const likeButton = document.getElementById('likeButton')
    const likeCount = document.getElementById('likeCount')
    const deletePostBtn = document.getElementById('deletePostBtn')
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn')
    const deleteModal = new bootstrap.Modal(
        document.getElementById('deletePostModal'),
    )
    const commentForm = document.querySelector('.comment-form')
    const commentText = document.getElementById('commentText')
    const commentImage = document.getElementById('commentImage')
    const imagePreview = document.getElementById('imagePreview')
    const postCommentBtn = document.getElementById('postCommentBtn')
    const replyButtons = document.querySelectorAll('.reply-btn')
    const loadMoreComments = document.getElementById('loadMoreComments')

    // Keep track of like state
    let isLiked = false
    let currentLikes = parseInt(likeCount.textContent)

    // Handle like button click
    likeButton.addEventListener('click', function () {
        isLiked = !isLiked

        if (isLiked) {
            // Update UI for liked state
            this.classList.add('liked')
            this.querySelector('i').classList.remove('far')
            this.querySelector('i').classList.add('fas')
            currentLikes++
        } else {
            // Update UI for unliked state
            this.classList.remove('liked')
            this.querySelector('i').classList.remove('fas')
            this.querySelector('i').classList.add('far')
            currentLikes--
        }

        // Update like count
        likeCount.textContent = currentLikes

        // In a real application, you would send an API request to like/unlike the post
        console.log(
            `Post ${isLiked ? 'liked' : 'unliked'}. New count: ${currentLikes}`,
        )
    })

    // Handle delete post button click
    deletePostBtn.addEventListener('click', function (e) {
        e.preventDefault()
        deleteModal.show()
    })

    // Handle confirm delete button click
    confirmDeleteBtn.addEventListener('click', function () {
        // In a real application, you would send an API request to delete the post
        console.log('Deleting post...')

        // Redirect to index page after brief delay
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 500)
    })

    // Handle comment image upload
    commentImage.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const file = this.files[0]

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file (JPG, PNG, etc.)')
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Please select an image smaller than 5MB')
                return
            }

            // Show image preview
            const reader = new FileReader()
            reader.onload = function (e) {
                imagePreview.classList.remove('d-none')
                imagePreview.querySelector('img').src = e.target.result
            }

            reader.readAsDataURL(file)
        }
    })

    // Handle remove image button click
    if (imagePreview) {
        imagePreview
            .querySelector('.remove-image')
            ?.addEventListener('click', function () {
                imagePreview.classList.add('d-none')
                commentImage.value = ''
            })
    }

    // Handle post comment button click
    postCommentBtn.addEventListener('click', function () {
        const commentContent = commentText.value.trim()

        if (!commentContent) {
            alert('Please enter a comment')
            return
        }

        // In a real application, you would send an API request to post the comment
        console.log('Posting comment:', commentContent)

        // Create a new comment element (for demo purposes)
        const newComment = createCommentElement({
            avatar: '/img/default-user.png',
            username: 'You',
            timestamp: 'Just now',
            content: commentContent,
            image: imagePreview.classList.contains('d-none')
                ? null
                : imagePreview.querySelector('img').src,
        })

        // Add the new comment to the top of the comments list
        const commentsList = document.querySelector('.comments-list')
        commentsList.insertBefore(newComment, commentsList.firstChild)

        // Clear the form
        commentText.value = ''
        imagePreview.classList.add('d-none')
        commentImage.value = ''

        // Update comment count
        updateCommentCount(1)
    })

    // Handle reply buttons
    replyButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Find the parent comment
            const comment = this.closest('.comment') || this.closest('.reply')

            // Find the reply form container
            const replyForm = comment.querySelector('.reply-form')

            // Toggle the reply form
            if (replyForm.classList.contains('d-none')) {
                // Hide any other visible reply forms first
                document
                    .querySelectorAll('.reply-form:not(.d-none)')
                    .forEach(form => {
                        form.classList.add('d-none')
                    })

                // Show this reply form
                replyForm.classList.remove('d-none')
                replyForm.querySelector('textarea').focus()
            } else {
                replyForm.classList.add('d-none')
            }
        })
    })

    // Handle load more comments button
    loadMoreComments?.addEventListener('click', function () {
        // In a real application, you would load more comments via API
        console.log('Loading more comments...')

        // For demo purposes, disable the button and show it's loading
        this.disabled = true
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...'

        // Simulate loading delay
        setTimeout(() => {
            // Add some dummy comments
            const commentsList = document.querySelector('.comments-list')

            for (let i = 0; i < 2; i++) {
                const newComment = createCommentElement({
                    avatar: '/img/default-user.png',
                    username: `User ${i + 1}`,
                    timestamp: 'June 10, 2023',
                    content:
                        'This is a loaded comment. Great post! I learned a lot about mirrorless cameras.',
                    image: i % 2 === 0 ? '/img/dog.jpeg' : null,
                })

                commentsList.insertBefore(newComment, this.parentNode)
            }

            // Update button text and disable it (no more comments to load)
            this.innerHTML = 'No More Comments'
            this.disabled = true
        }, 1500)
    })

    // Handle comment likes
    document.addEventListener('click', function (e) {
        if (
            e.target.closest(
                '.comment-actions .btn-link:first-child, .reply-actions .btn-link:first-child',
            )
        ) {
            const likeBtn = e.target.closest('.btn-link')
            const icon = likeBtn.querySelector('i')

            // Toggle like state
            if (icon.classList.contains('far')) {
                icon.classList.remove('far')
                icon.classList.add('fas')

                // Extract the current like count and increment
                let currentCount = parseInt(likeBtn.textContent.match(/\d+/)[0])
                likeBtn.innerHTML = `<i class="fas fa-heart me-1"></i> ${
                    currentCount + 1
                } Likes`
            } else {
                icon.classList.remove('fas')
                icon.classList.add('far')

                // Extract the current like count and decrement
                let currentCount = parseInt(likeBtn.textContent.match(/\d+/)[0])
                likeBtn.innerHTML = `<i class="far fa-heart me-1"></i> ${
                    currentCount - 1
                } Likes`
            }
        }
    })

    // Function to create a new comment element
    function createCommentElement(data) {
        const comment = document.createElement('div')
        comment.className = 'comment mb-4'

        comment.innerHTML = `
            <div class="d-flex">
                <img src="${data.avatar}" alt="${
            data.username
        } Avatar" class="author-avatar rounded-circle me-2">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-0">${data.username}</h6>
                            <small class="text-muted">${data.timestamp}</small>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#"><i class="fas fa-edit me-2"></i>Edit</a></li>
                                <li><a class="dropdown-item text-danger" href="#"><i class="fas fa-trash me-2"></i>Delete</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="comment-content mt-2">
                        <p>${data.content}</p>
                        ${
                            data.image
                                ? `<img src="${data.image}" alt="Comment image" class="comment-image rounded mt-2" style="max-height: 200px;">`
                                : ''
                        }
                    </div>
                    <div class="comment-actions mt-2">
                        <button class="btn btn-sm btn-link text-decoration-none p-0 me-3">
                            <i class="far fa-heart me-1"></i> 0 Likes
                        </button>
                        <button class="btn btn-sm btn-link text-decoration-none p-0 reply-btn">
                            <i class="fas fa-reply me-1"></i> Reply
                        </button>
                    </div>
                    
                    <!-- Reply Form (initially hidden) -->
                    <div class="reply-form mt-3 d-none">
                        <textarea class="form-control mb-2" rows="2" placeholder="Write a reply..."></textarea>
                        <div class="d-flex justify-content-between">
                            <label for="newReplyImage" class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-image"></i> Add Image
                            </label>
                            <input type="file" id="newReplyImage" class="d-none" accept="image/*">
                            <button class="btn btn-primary btn-sm">Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        `

        // Add event listener to the new reply button
        const replyBtn = comment.querySelector('.reply-btn')
        replyBtn.addEventListener('click', function () {
            const replyForm = comment.querySelector('.reply-form')

            if (replyForm.classList.contains('d-none')) {
                document
                    .querySelectorAll('.reply-form:not(.d-none)')
                    .forEach(form => {
                        form.classList.add('d-none')
                    })

                replyForm.classList.remove('d-none')
                replyForm.querySelector('textarea').focus()
            } else {
                replyForm.classList.add('d-none')
            }
        })

        return comment
    }

    // Function to update comment count
    function updateCommentCount(increment) {
        const commentCountElement = document.querySelector(
            '.post-actions .btn-link:nth-child(2) span',
        )
        const commentHeaderElement = document.querySelector('.card-header h5')

        if (commentCountElement) {
            let currentCount = parseInt(commentCountElement.textContent)
            currentCount += increment
            commentCountElement.textContent = currentCount

            if (commentHeaderElement) {
                commentHeaderElement.textContent = `Comments (${currentCount})`
            }
        }
    }

    // Add smooth scrolling for comment links
    document
        .querySelector('.post-actions .btn-link:nth-child(2)')
        ?.addEventListener('click', function (e) {
            e.preventDefault()
            document
                .querySelector('.card-header')
                .scrollIntoView({behavior: 'smooth'})
        })

    // Handle image click to view larger
    document.querySelectorAll('.post-image, .comment-image').forEach(img => {
        img.addEventListener('click', function () {
            // Create image viewer (in a real application, you might use a modal or lightbox)
            console.log('Image clicked, would show full-size image')
        })
    })
})
