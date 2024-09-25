document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const totalImages = images.length;
    let currentIndex = 0;
    let isGoingForward = true;
    const intervalTime = 4000; 
    let slideInterval;

    // Variables for touch control
    let startX = 0;
    let isSwiping = false;

    // Function to update carousel position
    function updateCarousel() {
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const imageWidth = images[currentIndex].offsetWidth;
        const translateXValue = -currentIndex * (imageWidth + 20) + (containerWidth - imageWidth) / 2;
        carousel.style.transform = `translateX(${translateXValue}px)`;
        updatePagination();
    }

    // Function to go to the next or previous image based on direction
    function changeImage() {
        if (isGoingForward) {
            if (currentIndex < totalImages - 1) {
                currentIndex++;
            } else {
                isGoingForward = false;
                currentIndex--;
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                isGoingForward = true;
                currentIndex++;
            }
        }
        updateCarousel();
    }

    // Automatic image slider
    function startSlider() {
        slideInterval = setInterval(changeImage, intervalTime);
    }

    // Pause the slider on hover
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Function to update the active dot in pagination
    function updatePagination() {
        const dots = document.querySelectorAll('.pagination .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Create pagination dots dynamically
    function createPagination() {
        const paginationContainer = document.querySelector('.pagination');
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', function() {
                currentIndex = i;
                updateCarousel();
                isGoingForward = currentIndex !== totalImages - 1;
            });
            paginationContainer.appendChild(dot);
        }
        updatePagination();
    }

    // Swipe handling
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Get initial touch point
        isSwiping = true; // Enable swipe tracking
        stopSlider(); // Stop automatic sliding when swiping
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) return; // Exit if not swiping
        const moveX = e.touches[0].clientX;
        const diffX = startX - moveX;

        // Check if swipe is significant (prevent small accidental swipes)
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - show next image
                isGoingForward = true;
                changeImage();
            } else {
                // Swipe right - show previous image
                isGoingForward = false;
                changeImage();
            }
            isSwiping = false; // Disable swipe tracking after action
        }
    });

    carousel.addEventListener('touchend', () => {
        isSwiping = false; // Reset swipe tracking on touch end
        startSlider(); // Resume automatic sliding after swipe
    });

    // Event listeners for navigation buttons
    document.querySelector('.next').addEventListener('click', function() {
        isGoingForward = true;
        changeImage();
    });

    document.querySelector('.prev').addEventListener('click', function() {
        isGoingForward = false;
        changeImage();
    });

    // Start the slider
    startSlider();

    // Pause slider on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseover', stopSlider);
    carouselContainer.addEventListener('mouseout', startSlider);

    // Create pagination on page load
    createPagination();
});
