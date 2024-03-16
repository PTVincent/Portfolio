document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Portfolio Loading
    fetch('portfolio.json')
    .then(response => response.json())
    .then(data => {
        const portfolioContainer = document.querySelector('#portfolio .container');
        data.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'portfolio-item bg-white p-4 m-2 shadow-lg rounded-lg';
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="w-full h-auto rounded-t-lg" />
                <div class="p-4">
                    <h3 class="text-xl font-bold">${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Tools:</strong> ${project.tools}</p>
                </div>
            `;
            portfolioContainer.appendChild(projectElement);
        });
    });

    // Testimonials Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-item');
    const displaySlide = (index) => {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    };

    // Assuming you have left and right buttons for navigation
    document.querySelector('#testimonial-prev').addEventListener('click', () => {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        displaySlide(currentSlide);
    });

    document.querySelector('#testimonial-next').addEventListener('click', () => {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        displaySlide(currentSlide);
    });

    displaySlide(currentSlide); // Initialize the first slide

    // Simple Lightbox for Portfolio Items
    document.querySelectorAll('.portfolio-item img').forEach(image => {
        image.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            lightbox.innerHTML = `
                <img src="${image.src}" class="max-w-full max-h-full" />
            `;
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
});
