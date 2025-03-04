// /**
//  * Focus Photography Forum - Notifications JavaScript
//  * Handles functionality for the notifications page
//  */

// document.addEventListener('DOMContentLoaded', function () {
//     // DOM Elements
//     const notificationItems = document.querySelectorAll('.notification-item')
//     const filterOptions = document.querySelectorAll('.dropdown-item')
//     const paginationLinks = document.querySelectorAll('.pagination .page-link')
//     const logoutLink = document.querySelector('#logoutBtn')

//     // Handle logout
//     if (logoutLink) {
//         logoutLink.addEventListener('click', function (e) {
//             e.preventDefault()

//             // Clear login state
//             localStorage.removeItem('isLoggedIn')

//             // Redirect to login page
//             window.location.href = '/pages/originlogin.html'
//         })
//     }

//     // Handle filter dropdown options
//     filterOptions.forEach(option => {
//         option.addEventListener('click', function (e) {
//             e.preventDefault()

//             // Update active state
//             document
//                 .querySelector('.dropdown-item.active')
//                 .classList.remove('active')
//             this.classList.add('active')

//             const filterType = this.textContent.trim().toLowerCase()

//             // Filter notifications
//             notificationItems.forEach(item => {
//                 const actionText = item
//                     .querySelector('.action')
//                     .textContent.toLowerCase()

//                 if (filterType === 'all notifications') {
//                     item.style.display = 'flex'
//                 } else if (
//                     filterType === 'likes' &&
//                     actionText.includes('liked')
//                 ) {
//                     item.style.display = 'flex'
//                 } else if (
//                     filterType === 'comments' &&
//                     actionText.includes('comment')
//                 ) {
//                     item.style.display = 'flex'
//                 } else {
//                     item.style.display = 'none'
//                 }
//             })
//         })
//     })

//     // Handle notification item clicks to view the post
//     notificationItems.forEach(item => {
//         item.addEventListener('click', function (e) {
//             // Don't trigger if clicked on a link or button
//             if (e.target.closest('a') || e.target.closest('button')) {
//                 return
//             }

//             const postTitle = this.querySelector('.post-title').textContent

//             // In a real application, you would redirect to the post page
//             console.log(`Viewing post: ${postTitle}`)

//             // Example redirect:
//             // window.location.href = `post-details.html?id=${postId}`;
//         })
//     })

//     // Handle pagination clicks
//     paginationLinks.forEach(link => {
//         link.addEventListener('click', function (e) {
//             if (
//                 !this.parentElement.classList.contains('active') &&
//                 !this.parentElement.classList.contains('disabled')
//             ) {
//                 e.preventDefault()

//                 // Remove active class from current active page
//                 document
//                     .querySelector('.page-item.active')
//                     .classList.remove('active')

//                 // Add active class to clicked page
//                 this.parentElement.classList.add('active')

//                 // In a real application, you would load the next page of notifications
//                 // Either through AJAX or by navigating to a new page

//                 // Scroll to top of notifications
//                 document
//                     .querySelector('.notification-list')
//                     .scrollIntoView({behavior: 'smooth'})
//             }
//         })
//     })

//     // Add hover effect to notification items
//     notificationItems.forEach(item => {
//         item.style.cursor = 'pointer'
//     })
// })
