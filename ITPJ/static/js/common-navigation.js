/**
 * Common category navigation JavaScript
 * Handles functionality for category links on all pages
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get all category links in the sidebar
    const categoryLinks = document.querySelectorAll(
        '.category-nav .list-group-item',
    )

    // If we're on the index page, check for category parameter in URL
    if (
        window.location.pathname === '/index.html' ||
        window.location.pathname === '/'
    ) {
        const urlParams = new URLSearchParams(window.location.search)
        const categoryParam = urlParams.get('category')

        if (categoryParam) {
            // Find the category link with the matching data-category attribute
            const categoryLink = document.querySelector(
                `.list-group-item[data-category="${categoryParam}"]`,
            )

            if (categoryLink && !categoryLink.classList.contains('active')) {
                // Remove active class from all links
                categoryLinks.forEach(link => {
                    link.classList.remove('active')
                })

                // Add active class to the selected category link
                categoryLink.classList.add('active')
            }
        }
    }
    // If we're not on the index page, add event listeners for redirection
    else {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault()

                // Get the category name from the data attribute
                const category = this.getAttribute('data-category')

                // Redirect to index page with the category parameter
                if (category === 'all') {
                    window.location.href = '/index.html'
                } else {
                    window.location.href =
                        '/index.html?category=' + encodeURIComponent(category)
                }
            })
        })
    }
})
