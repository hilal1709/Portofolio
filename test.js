document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('mobile-nav');
        nav.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('open')) {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });
    
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const galleryImages = document.querySelectorAll('.gallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const imgClone = this.cloneNode();
            imgClone.classList.add('lightbox-img');
            
            lightbox.appendChild(imgClone);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                this.remove();
            });
        });
    });
});