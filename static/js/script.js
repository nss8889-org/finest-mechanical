// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme + '-theme');
    
    // Set the toggle checkbox based on saved preference
    // checked = light theme, unchecked = dark theme
    if (themeToggle) {
        themeToggle.checked = (savedTheme === 'light');
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const selectedTheme = this.checked ? 'light' : 'dark';
            body.classList.remove('dark-theme', 'light-theme');
            body.classList.add(selectedTheme + '-theme');
            localStorage.setItem('theme', selectedTheme);
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const phone = this.querySelector('input[name="phone"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();

            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Get form action URL and method
            const formAction = this.getAttribute('action');
            const formMethod = this.getAttribute('method') || 'POST';
            const formEnctype = this.getAttribute('enctype') || 'application/x-www-form-urlencoded';

            // Create FormData object
            const formData = new FormData(this);

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Submit form to action URL
            fetch(formAction, {
                method: formMethod,
                body: formData,
                headers: formEnctype === 'multipart/form-data' ? {} : {
                    'Content-Type': formEnctype
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or contact us directly.');
            })
            .finally(() => {
                // Restore button state
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }


    // Navbar background on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
});

