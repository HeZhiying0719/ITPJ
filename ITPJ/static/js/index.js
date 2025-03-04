document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    const createButton = document.querySelector('.btn-primary')
    const searchForm = document.querySelector('.search-form')
    const categoryLinks = document.querySelectorAll('.list-group-item')
    const postsContainer = document.getElementById('postsContainer')
    const loadMoreBtn = document.getElementById('loadMoreBtn')
    const loadingIndicator = document.getElementById('loadingIndicator')
    const userAuthSection = document.getElementById('userAuthSection')
    const notificationBell = document.querySelector('.fa-bell')

    // Current category and pagination state
    let currentCategory = 'all'
    let currentPage = 1
    const postsPerPage = 3

    // Check login status (simulate with localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    // Sample post data by category
    const postData = {
        equipment: [
            {
                title: 'How to Choose Your First Mirrorless Camera',
                content:
                    "Looking to upgrade from your smartphone photography? Mirrorless cameras offer the perfect balance between quality and portability. In this guide, I'll walk you through the essential features to consider when making your purchase.",
                author: 'Robert Chen',
                category: 'Equipment',
                comments: 24,
                views: 342,
                image: '/img/dog.jpeg',
            },
            {
                title: 'The Ultimate Lens Buying Guide',
                content:
                    'Confused about which lenses to invest in? This comprehensive guide breaks down prime vs. zoom lenses, explains focal lengths, and helps you build a versatile lens collection without breaking the bank.',
                author: 'Michael Chen',
                category: 'Equipment',
                comments: 18,
                views: 275,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Best Tripods for Landscape Photography',
                content:
                    "A stable tripod is essential for sharp landscape images. I've tested dozens of models across various price points to help you find the perfect balance of stability, weight, and value.",
                author: 'Emily Parker',
                category: 'Equipment',
                comments: 12,
                views: 189,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Camera Accessories You Actually Need',
                content:
                    'Stop wasting money on unnecessary gadgets! This post covers the essential accessories every photographer should own, from memory cards to filters and camera bags.',
                author: 'David Williams',
                category: 'Equipment',
                comments: 31,
                views: 412,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Lighting Equipment for Portrait Photography',
                content:
                    'From speedlights to studio strobes and modifiers, this guide will help you build an effective lighting kit for stunning portrait photography on any budget.',
                author: 'Sophia Rodriguez',
                category: 'Equipment',
                comments: 27,
                views: 356,
                image: '/img/dog.jpeg',
            },
        ],
        photography: [
            {
                title: 'Understanding the Exposure Triangle',
                content:
                    'Mastering exposure is fundamental to photography. The relationship between aperture, shutter speed, and ISO forms what we call the "exposure triangle." This post breaks down these concepts in simple terms and shows how they affect your final image.',
                author: 'Sarah Williams',
                category: 'Photography',
                comments: 42,
                views: 518,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Composition Rules Every Photographer Should Know',
                content:
                    'From the rule of thirds to leading lines and framing, learn the fundamental composition techniques that will dramatically improve your photography regardless of what camera you use.',
                author: 'Thomas Brown',
                category: 'Photography',
                comments: 35,
                views: 423,
                image: '/img/dog.jpeg',
            },
            {
                title: 'The Art of Black and White Photography',
                content:
                    'Black and white photography strips away color distractions to focus on emotion, texture, and composition. Learn how to see in monochrome and create powerful B&W images.',
                author: 'Julia Martinez',
                category: 'Photography',
                comments: 19,
                views: 267,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Mastering Manual Mode',
                content:
                    'Ready to take full control of your camera? This step-by-step guide will teach you how to confidently shoot in manual mode for consistent, intentional results in any situation.',
                author: 'Kevin Taylor',
                category: 'Photography',
                comments: 48,
                views: 589,
                image: '/img/dog.jpeg',
            },
        ],
        sharing: [
            {
                title: 'Photo Expedition: Capturing the Northern Lights',
                content:
                    "Last month, I traveled to Iceland to photograph the Aurora Borealis. This post shares my experience, the gear I used, and practical tips for anyone planning a similar trip. From location scouting to camera settings, here's everything you need to know.",
                author: 'Amanda Torres',
                category: 'Sharing',
                comments: 37,
                views: 425,
                image: '/img/dog.jpeg',
            },
            {
                title: 'My Journey Through Portrait Photography',
                content:
                    "From awkward beginnings to finding my style, here's how my portrait photography evolved over five years, complete with examples and lessons learned along the way.",
                author: 'Carlos Mendez',
                category: 'Sharing',
                comments: 22,
                views: 310,
                image: '/img/dog.jpeg',
            },
            {
                title: 'A Day in the Life of a Wildlife Photographer',
                content:
                    "Ever wondered what it's like to spend 14 hours waiting for the perfect wildlife shot? This post chronicles a typical day in the field, including preparations, challenges, and rewards.",
                author: 'Lisa Johnson',
                category: 'Sharing',
                comments: 29,
                views: 387,
                image: '/img/dog.jpeg',
            },
        ],
        events: [
            {
                title: 'Annual Photography Festival 2025 - Call for Submissions',
                content:
                    'The biggest photography festival of the year is now accepting submissions. Learn about categories, prizes, deadlines, and submission guidelines in this comprehensive overview.',
                author: 'Festival Committee',
                category: 'Events',
                comments: 15,
                views: 245,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Workshop: Mastering Studio Lighting',
                content:
                    'Join master photographer Jane Smith for a two-day workshop on studio lighting techniques. Limited spots available, early bird pricing ends soon!',
                author: 'Events Team',
                category: 'Events',
                comments: 8,
                views: 178,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Photo Walk: Urban Exploration',
                content:
                    "Join us this Saturday for a guided photo walk through the historic downtown district. All skill levels welcome! We'll cover street photography techniques and creative approaches to urban subjects.",
                author: 'Community Manager',
                category: 'Events',
                comments: 27,
                views: 312,
                image: '/img/dog.jpeg',
            },
        ],
        'problem-solving': [
            {
                title: 'Troubleshooting Common Focusing Issues',
                content:
                    'Frustrated with blurry images? This guide helps diagnose and fix the most common focusing problems, from technique errors to camera settings and lens calibration issues.',
                author: 'Tech Support Team',
                category: 'Problem Solving',
                comments: 53,
                views: 634,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Fixing Color Cast in Your Photos',
                content:
                    "Whether it's the greenish tint from fluorescent lights or the orange glow of indoor lighting, this tutorial walks you through effective methods to correct color casts in post-processing.",
                author: 'Edward Kim',
                category: 'Problem Solving',
                comments: 31,
                views: 402,
                image: '/img/dog.jpeg',
            },
            {
                title: 'Solutions for Indoor Low-Light Photography',
                content:
                    'Stop struggling with grainy, blurry indoor photos! This guide covers camera settings, equipment choices, and techniques to capture clean, sharp images in challenging indoor lighting.',
                author: 'Natalie Wong',
                category: 'Problem Solving',
                comments: 45,
                views: 521,
                image: '/img/dog.jpeg',
            },
        ],
    }

    // Update UI based on login status
    updateAuthUI()

    // Function to trigger category selection
    function selectCategory(category) {
        // Find the category link
        const categoryLink = document.querySelector(
            `.list-group-item[data-category="${category}"]`,
        )

        if (categoryLink) {
            // Remove active class from all links
            categoryLinks.forEach(link => {
                link.classList.remove('active')
            })

            // Add active class to clicked link
            categoryLink.classList.add('active')

            // Update current category
            currentCategory = category
            currentPage = 1 // Reset to first page when changing categories

            // Load posts for this category
            loadPosts(category, 1, true) // true = clear existing posts
        }
    }

    // Check for category in URL on page load
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get('category')

    // Initialize page with posts
    if (categoryParam && postData[categoryParam]) {
        // If valid category is in URL, select that category
        selectCategory(categoryParam)
    } else {
        // Otherwise, load default all posts
        loadPosts(currentCategory, currentPage)
    }

    // Handle clicks on the CREATE button - redirect to login if not logged in
    createButton.addEventListener('click', function (e) {
        if (!isLoggedIn) {
            e.preventDefault()
            redirectToLogin('You need to log in before creating a post')
        }
        // If logged in, the link will work normally
    })

    // Handle notification bell clicks - redirect to login if not logged in
    notificationBell.addEventListener('click', function (e) {
        e.preventDefault()

        if (!isLoggedIn) {
            redirectToLogin('You need to log in to view notifications')
        } else {
            // Show notifications for logged in users
            alert(
                'You have 3 new notifications:\n- New comment on your post\n- Your post was featured\n- New message from admin',
            )
        }
    })

    // Event listener for the search form
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const searchTerm = this.querySelector('input').value.trim()

        if (searchTerm) {
            console.log('Searching for:', searchTerm)
            // In a real application, you would implement search functionality here
            alert(`You searched for: ${searchTerm}`)
            // window.location.href = `search-results.html?query=${encodeURIComponent(searchTerm)}`;
        }
    })

    // Event listeners for category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault()

            // Only if it's not already active
            if (!this.classList.contains('active')) {
                // Remove active class from all links
                categoryLinks.forEach(item => {
                    item.classList.remove('active')
                })

                // Add active class to clicked link
                this.classList.add('active')

                // Get selected category
                const category = this.getAttribute('data-category')
                currentCategory = category
                currentPage = 1 // Reset to first page when changing categories

                // Load posts for this category
                loadPosts(category, 1, true) // true = clear existing posts
            }
        })
    })

    // Load more button click event
    loadMoreBtn.addEventListener('click', function () {
        currentPage++
        loadPosts(currentCategory, currentPage, false) // false = append posts
    })

    // Infinite scroll functionality
    window.addEventListener('scroll', function () {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 500
        ) {
            // User is close to the bottom of the page
            if (
                !loadingIndicator.classList.contains('d-none') ||
                loadMoreBtn.classList.contains('d-none')
            ) {
                // Already loading or no more posts, so do nothing
                return
            }

            // Hide button, show loading indicator
            loadMoreBtn.click()
        }
    })

    // Simulated login/logout handling
    function login() {
        localStorage.setItem('isLoggedIn', 'true')
        updateAuthUI()
        showToast('Successfully logged in!', 'success')
    }

    function logout() {
        localStorage.setItem('isLoggedIn', 'false')
        updateAuthUI()
        showToast('Successfully logged out', 'info')
    }

    // Function to render posts
    function renderPosts(posts) {
        return posts
            .map(
                post => `
            <div class="card mb-3 post-card" data-category="${post.category
                .toLowerCase()
                .replace(' ', '-')}">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img
                            src="${post.image}"
                            class="img-fluid rounded-start post-img w-100 h-100"
                            alt="Post image"
                        />
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="post-title">${post.title}</h5>
                            <p class="post-content">${post.content}</p>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <small class="text-muted">By ${post.author} • ${
                    post.category
                }</small>
                                <div>
                                    <span class="me-3"><i class="far fa-comment"></i> ${
                                        post.comments
                                    }</span>
                                    <span><i class="far fa-eye"></i> ${
                                        post.views
                                    }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
            )
            .join('')
    }

    // Function to load posts based on category and page
    function loadPosts(category, page, clearExisting = false) {
        // Show loading indicator, hide load more button
        loadMoreBtn.classList.add('d-none')
        loadingIndicator.classList.remove('d-none')

        // Simulate network delay
        setTimeout(() => {
            let posts = []

            // Get all posts if category is 'all', otherwise filter by category
            if (category === 'all') {
                // Combine all categories
                Object.keys(postData).forEach(key => {
                    posts = posts.concat(postData[key])
                })
            } else if (postData[category]) {
                posts = postData[category]
            }

            // Calculate pagination
            const startIndex = (page - 1) * postsPerPage
            const endIndex = startIndex + postsPerPage
            const paginatedPosts = posts.slice(startIndex, endIndex)
            const hasMorePosts = endIndex < posts.length

            // Update UI
            if (clearExisting) {
                postsContainer.innerHTML = renderPosts(paginatedPosts)
            } else {
                postsContainer.innerHTML += renderPosts(paginatedPosts)
            }

            // Hide loading indicator
            loadingIndicator.classList.add('d-none')

            // Show/hide load more button based on whether there are more posts
            if (hasMorePosts) {
                loadMoreBtn.classList.remove('d-none')
            } else {
                loadMoreBtn.classList.add('d-none')
            }

            // Set up post clicks
            setupPostClicks()
        }, 800) // Simulate loading delay
    }

    // Function to update UI based on login status
    function updateAuthUI() {
        if (isLoggedIn) {
            // User is logged in, show profile dropdown
            userAuthSection.innerHTML = `
                <div class="nav-item dropdown">
                    <a
                        href="#"
                        class="nav-link dropdown-toggle"
                        id="profileDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="/img/default-user.png"
                            alt="Profile"
                            class="avatar"
                        />
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="profileDropdown"
                    >
                        <li>
                            <a class="dropdown-item" href="/pages/myaccount.html">My Profile</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Settings</a>
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <a class="dropdown-item" href="#" id="logoutBtn">Log Out</a>
                        </li>
                    </ul>
                </div>
            `

            // Add logout handler
            document
                .getElementById('logoutBtn')
                .addEventListener('click', function (e) {
                    e.preventDefault()
                    logout()
                })
        } else {
            // User is logged out, show login button
            userAuthSection.innerHTML = `
                <a href="/pages/login.html" class="btn btn-outline-primary">Login</a>
            `

            // For demo purposes, add a click handler to simulate login
            userAuthSection
                .querySelector('.btn')
                .addEventListener('click', function (e) {
                    // Allow normal navigation to login page
                    // e.preventDefault()
                    // login() // Simulate login for demo
                })
        }
    }

    // Function to redirect to login page with a message
    function redirectToLogin(message) {
        // Store the message in localStorage to display after redirect
        localStorage.setItem('loginRedirectMessage', message)

        // Redirect to login page
        window.location.href = '/pages/originlogin.html'
    }

    // Function to handle post clicks
    function setupPostClicks() {
        const postCards = document.querySelectorAll('.posts .card')

        postCards.forEach(card => {
            card.addEventListener('click', function () {
                const postTitle = this.querySelector('.post-title').textContent
                console.log('Post clicked:', postTitle)
                // In a real application, you would redirect to the post page
                // window.location.href = `post-details.html?title=${encodeURIComponent(postTitle)}`;
                alert(`You clicked on the post: ${postTitle}`)
            })
        })
    }

    // Add hover effect to featured posts
    const featuredPosts = document.querySelectorAll('.col-md-4 .card')

    featuredPosts.forEach(post => {
        post.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)'
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)'
        })

        post.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px)'
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'
        })

        post.addEventListener('click', function () {
            const postTitle = this.querySelector('.card-title').textContent
            console.log('Featured post clicked:', postTitle)
            // In a real application, you would redirect to the post page
            alert(`You clicked on the featured post: ${postTitle}`)
        })
    })

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
