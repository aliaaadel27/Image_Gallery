document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const totalImages = images.length;
    let currentIndex = 0;
    let isGoingForward = true; // Track the direction of movement
    const intervalTime = 4000; // 4 seconds for autoplay
    let slideInterval;

    // Function to update carousel position
    function updateCarousel() {
        const translateXValue = -currentIndex * 100; // Move by 100% of the width of the container
        carousel.style.transform = `translateX(${translateXValue}%)`;
        updatePagination(); // Update the active pagination dot
    }

    // Function to go to the next or previous image based on direction
    function changeImage() {
        if (isGoingForward) {
            if (currentIndex < totalImages - 1) {
                currentIndex++;
            } else {
                isGoingForward = false; // Reverse direction
                currentIndex--; // Start moving backward
            }
        } else {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                isGoingForward = true; // Switch direction again
                currentIndex++; // Start moving forward
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
                currentIndex = i; // Set currentIndex to the clicked dot's index
                updateCarousel(); // Update carousel position
                isGoingForward = currentIndex !== totalImages - 1; // Adjust direction based on clicked image
                // isGoingForward=true;
            });
            paginationContainer.appendChild(dot);
        }
        updatePagination(); // Update pagination initially
    }

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
