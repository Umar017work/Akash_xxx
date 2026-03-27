/* 
  ===========================================
  SPM College - Dynamic UI Script
  ===========================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileToggle.querySelector('i');
            if(navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Hero Image Slider
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    if(slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 4. Statistics Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower is slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if(count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (target > 50 ? '+' : '');
                }
            };
            
            // Check if element is in viewport
            const rect = counter.getBoundingClientRect();
            if(rect.top < window.innerHeight && counter.innerText == '0') {
                updateCount();
            }
        });
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Trigger once on load

    // 5. Testimonial Slider
    const testimonialSlider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if(testimonialSlider && cards.length > 0) {
        let currentIndex = 0;
        
        const updateSlider = () => {
            let cardWidth = cards[0].offsetWidth + 20; // 20px is margin
            testimonialSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            cards.forEach((card, i) => {
                if(i === currentIndex) {
                    card.classList.add('focus');
                } else {
                    card.classList.remove('focus');
                }
            });
        };

        // Initialize
        updateSlider();

        nextBtn.addEventListener('click', () => {
            if(currentIndex < cards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            if(currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cards.length - 1; // Loop to end
            }
            updateSlider();
        });
        
        // Auto slide
        setInterval(() => {
            nextBtn.click();
        }, 6000);
    }

    // 6. Smooth Scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // close mobile menu if open
                if(navLinks.classList.contains('show')) {
                    mobileToggle.click();
                }
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

});
