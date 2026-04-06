document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Loading Screen
    // -----------------------------------------------------------------
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1200);

    // -----------------------------------------------------------------
    // 2. Theme Toggle (Light/Dark Mode via claymorphism to midnight)
    // -----------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check local storage for theme preference, default to dark base on user settings "Both Light/Dark, Dark Style: Midnight"
    let savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = htmlEl.getAttribute('data-theme');
        let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        updateThemeIcon(targetTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun'; // Show sun icon when in dark mode to switch to light
        } else {
            icon.className = 'fas fa-moon'; // Show moon icon when in light mode to switch to dark
        }
    }

    // -----------------------------------------------------------------
    // 3. Mobile Menu Toggle
    // -----------------------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // -----------------------------------------------------------------
    // 4. Navbar Scroll Effect & Active Section Indicator
    // -----------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        // Navbar shadow on scroll
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link indicator
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // -----------------------------------------------------------------
    // 5. Scroll Animations (Intersection Observer)
    // -----------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // -----------------------------------------------------------------
    // 6. Ripple Effect for Buttons
    // -----------------------------------------------------------------
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.className = 'ripple';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // -----------------------------------------------------------------
    // 7. Scroll to Top Behavior
    // -----------------------------------------------------------------
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // -----------------------------------------------------------------
    // 8. Custom Lightbox functionality for Photo Gallery
    // -----------------------------------------------------------------
    window.openLightbox = function(imageSrc) {
        const lightbox = document.getElementById('lightbox');
        const lbImg = document.getElementById('lb-img');
        lbImg.src = imageSrc;
        lightbox.classList.add('active');
    };

    const lightbox = document.getElementById('lightbox');
    const lbClose = document.getElementById('lb-close');

    if (lightbox && lbClose) {
        lbClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lightbox.classList.remove('active');
        });
    }

    // -----------------------------------------------------------------
    // 9. Simple Filtering System (Insights/Gallery)
    // -----------------------------------------------------------------
    // Apply this logic if filter categories are tied to data-attributes. 
    // Currently configured as visual interactions for placeholder demonstration.
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            btn.parentElement.querySelectorAll('.filter-btn').forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || category === itemCategory) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
    // -----------------------------------------------------------------
    // 12. YouTube Thumbnail Click Handler
    // -----------------------------------------------------------------
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const wrapper = this.parentElement;
            
            // Create the iframe
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            
            // Clear wrapper and append iframe
            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
        });
    });

    // -----------------------------------------------------------------
    // 13. Email Copy to Clipboard — Toast Notification
    // -----------------------------------------------------------------
    // Create toast element once
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-check"></i></div>
        <span>Email copied to clipboard!</span>
    `;
    document.body.appendChild(toast);

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Expose global copyEmail function for the copy button
    window.copyEmail = function() {
        const email = "audaialtaie@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            showToast();
        }).catch(err => {
            // Fallback for non-HTTPS / local file contexts
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast();
        });
    };
    // -----------------------------------------------------------------
    // 14. Testimonials Carousel / Slider
    // -----------------------------------------------------------------
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        let cardsPerView = window.innerWidth <= 768 ? 1 : 2;
        const totalSlides = Math.ceil(cards.length / cardsPerView);

        // Create dots
        function createDots() {
            dotsContainer.innerHTML = '';
            const slides = Math.ceil(cards.length / cardsPerView);
            for (let i = 0; i < slides; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonial-dot' + (i === currentIndex ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to testimonial group ' + (i + 1));
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            const gap = 30;
            const cardWidth = cards[0].offsetWidth + gap;
            const offset = currentIndex * cardsPerView * cardWidth;
            track.style.transform = `translateX(-${offset}px)`;

            // Update dots
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateSlider();
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        // Auto-play every 6 seconds
        let autoPlay = setInterval(() => {
            const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
            updateSlider();
        }, 6000);

        // Pause auto-play on hover
        track.addEventListener('mouseenter', () => clearInterval(autoPlay));
        track.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
                currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
                updateSlider();
            }, 6000);
        });

        // Responsive: recalculate on resize
        window.addEventListener('resize', () => {
            cardsPerView = window.innerWidth <= 768 ? 1 : 2;
            currentIndex = 0;
            createDots();
            updateSlider();
        });

        createDots();
        updateSlider();
    }

});

// -----------------------------------------------------------------
// 10. Toggle More Blogs
// -----------------------------------------------------------------
function toggleMoreBlogs() {
    const moreBlogs = document.getElementById('more-blogs');
    const btn = document.getElementById('view-more-blogs');
    
    if (moreBlogs.style.display === 'none') {
        moreBlogs.style.display = 'grid';
        moreBlogs.style.opacity = 0;
        setTimeout(() => { moreBlogs.style.opacity = 1; }, 50);
        moreBlogs.style.transition = 'opacity 0.5s ease';
        btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
    } else {
        moreBlogs.style.opacity = 0;
        setTimeout(() => { moreBlogs.style.display = 'none'; }, 400);
        btn.innerHTML = 'View More Blogs <i class="fas fa-chevron-down"></i>';
}
}

// -----------------------------------------------------------------
// 11. Toggle More Certificates
// -----------------------------------------------------------------
function toggleMoreCerts() {
    const moreCerts = document.getElementById('more-certs');
    const btn = document.getElementById('view-more-certs-btn');
    
    if (moreCerts.style.display === 'none') {
        moreCerts.style.display = 'grid';
        moreCerts.style.opacity = 0;
        setTimeout(() => { moreCerts.style.opacity = 1; }, 50);
        moreCerts.style.transition = 'opacity 0.5s ease';
        btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
    } else {
        moreCerts.style.opacity = 0;
        setTimeout(() => { moreCerts.style.display = 'none'; }, 400);
        btn.innerHTML = 'View More Certificates <i class="fas fa-chevron-down"></i>';
    }
}

/* --- Global Section Toggle --- */
window.toggleVisibility = function(btnId, containerId) {
  const container = document.getElementById(containerId);
  const btn = document.getElementById(btnId);
  
  if (container.classList.contains('hidden-items')) {
    container.classList.remove('hidden-items');
    btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
  } else {
    container.classList.add('hidden-items');
    btn.innerHTML = 'Explore More <i class="fas fa-chevron-down"></i>';
  }
}

