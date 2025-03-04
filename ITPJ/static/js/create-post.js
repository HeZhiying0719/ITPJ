/**
 * Focus Photography Forum - Create Post JavaScript
 * Handles the post creation form functionality including text formatting and image uploads
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const postForm = document.getElementById('create-post-form');
    const uploadButton = document.querySelector('.upload-image-btn');
    const fileInput = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');
    const postBody = document.getElementById('post-body');
    const formattingButtons = document.querySelectorAll('.editor-toolbar .btn:not(.upload-image-btn)');

    // Track uploaded images
    let uploadedImages = [];

    // Handle formatting buttons
    formattingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textArea = postBody;
            const format = this.title.toLowerCase();
            const startPos = textArea.selectionStart;
            const endPos = textArea.selectionEnd;
            const selectedText = textArea.value.substring(startPos, endPos);
            let formattedText = '';
            
            switch(format) {
                case 'bold':
                    formattedText = `**${selectedText}**`;
                    break;
                case 'italic':
                    formattedText = `*${selectedText}*`;
                    break;
                case 'underline':
                    formattedText = `_${selectedText}_`;
                    break;
                case 'list':
                    formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
                    break;
                case 'link':
                    const url = prompt('Enter URL:', 'https://');
                    if (url) {
                        formattedText = `[${selectedText}](${url})`;
                    } else {
                        return;
                    }
                    break;
                default:
                    formattedText = selectedText;
            }
            
            // Replace the selected text with the formatted text
            textArea.value = textArea.value.substring(0, startPos) + formattedText + textArea.value.substring(endPos);
            
            // Set the cursor position after the formatted text
            textArea.focus();
            textArea.setSelectionRange(startPos + formattedText.length, startPos + formattedText.length);
        });
    });

    // Handle image upload button click
    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Only image files are allowed.');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should not exceed 5MB.');
                return;
            }
            
            // Show the image preview section if it's hidden
            imagePreview.classList.remove('d-none');
            
            // Create a unique ID for the image
            const imageId = `img-${Date.now()}`;
            
            // Read the file and create a preview
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                
                // Add to uploaded images array
                uploadedImages.push({
                    id: imageId,
                    file: file,
                    url: imageUrl
                });
                
                // Create preview element
                const previewCol = document.createElement('div');
                previewCol.className = 'col-md-3 col-sm-6 mb-3';
                previewCol.innerHTML = `
                    <div class="preview-image-container">
                        <img src="${imageUrl}" alt="Preview" class="preview-image">
                        <div class="remove-image" data-image-id="${imageId}">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                `;
                
                // Add to preview container
                previewContainer.appendChild(previewCol);
                
                // Insert placeholder in text area
                const placeholder = `[image:${imageId}]`;
                const textArea = postBody;
                const cursorPos = textArea.selectionStart;
                textArea.value = textArea.value.substring(0, cursorPos) + placeholder + textArea.value.substring(cursorPos);
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Handle remove image clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-image')) {
            const removeBtn = e.target.closest('.remove-image');
            const imageId = removeBtn.dataset.imageId;
            
            // Remove from uploaded images array
            uploadedImages = uploadedImages.filter(img => img.id !== imageId);
            
            // Remove from preview container
            removeBtn.closest('.col-md-3').remove();
            
            // Remove placeholder from text area
            const placeholder = `[image:${imageId}]`;
            postBody.value = postBody.value.replace(placeholder, '');
            
            // Hide preview section if no images left
            if (uploadedImages.length === 0) {
                imagePreview.classList.add('d-none');
            }
        }
    });

    // Handle form submission
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const category = document.getElementById('post-category').value;
        const title = document.getElementById('post-title').value;
        const body = postBody.value;
        
        // Validate form
        if (!category || !title || !body.trim()) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // In a real application, you would send this data to the server
        // along with the uploaded images
        console.log('Post data:', { category, title, body, images: uploadedImages });
        
        // Show success message
        alert('Your post has been created successfully!');
        
        // Redirect to homepage or post view page
        // window.location.href = 'index.html';
    });
    
    // Additional functionality for responsive design
    const handleResponsiveLayout = () => {
        if (window.innerWidth < 768) {
            // Mobile layout adjustments
            document.querySelectorAll('.editor-toolbar .btn').forEach(btn => {
                btn.classList.add('btn-sm');
            });
        } else {
            // Desktop layout adjustments
            document.querySelectorAll('.editor-toolbar .btn').forEach(btn => {
                btn.classList.remove('btn-sm');
            });
        }
    };
    
    // Initial call and window resize event
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
});