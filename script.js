// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const setTheme = (theme) => {
        document.body.dataset.theme = theme;
        darkModeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    };
 
    darkModeToggle.addEventListener('click', () => {
        setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
    });
 
    setTheme(localStorage.getItem('theme') || 'light');
 
    // Parallax
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const rate = element.dataset.rate || 0.5;
            element.style.transform = `translateY(${scrolled * rate}px)`;
        });
    });
 
    // Skill Animations
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = `${entry.target.dataset.level}%`;
            }
        });
    });
 
    document.querySelectorAll('.skill-level-fill').forEach(skill => {
        skillObserver.observe(skill);
    });
 
    // Case Studies
    document.querySelectorAll('.case-study-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const caseStudy = toggle.closest('.case-study');
            caseStudy.classList.toggle('active');
            toggle.textContent = caseStudy.classList.contains('active') ? 'Show Less' : 'Read More';
        });
    });
 
    // Gallery Filter
    const filterGallery = (category) => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.display = 
                category === 'all' || item.dataset.category === category ? 'block' : 'none';
        });
    };
 
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterGallery(tab.dataset.category);
        });
    });
 
    // Modal
    const modal = document.getElementById('imageModal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = document.querySelector('.modal-close');
    
    const openModal = (item) => {
        // Clear previous content
        modalContent.innerHTML = '';
        
        // Check if the gallery item contains a video or an image
        const mediaElement = item.querySelector('video, img');
        
        if (mediaElement.tagName === 'VIDEO') {
            // Clone the video element and its properties
            const videoClone = mediaElement.cloneNode(true);
            videoClone.style.maxWidth = '90%';
            videoClone.style.maxHeight = '90vh';
            modalContent.appendChild(videoClone);
        } else {
            // Create new image element
            const img = document.createElement('img');
            img.src = mediaElement.src;
            modalContent.appendChild(img);
        }
        
        modal.classList.add('active');
    };
    
    const closeModal = () => {
        modal.classList.remove('active');
        // Clear content when closing
        modalContent.innerHTML = '';
    };
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            openModal(item);
        });
    });
 
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeBtn) closeModal();
    });
 
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});