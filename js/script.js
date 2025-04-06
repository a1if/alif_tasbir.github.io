// Enhanced Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    const skillLevels = document.querySelectorAll('.skill-level');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    // Add section animation classes
    sections.forEach(section => {
        section.classList.add('section-animate');
    });

    // Toggle Mobile Navigation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Dark/Light Theme Toggle with animation
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Change icon based on theme
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Animate skill bars when in viewport
    function animateSkillBars() {
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.setProperty('--level', `${level}%`);
            skill.style.animation = 'skillBarFill 1.5s forwards ease-out';
            skill.style.width = `${level}%`;
        });
    }

    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-text h2');
    heroTitle.classList.add('typing-text');

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all sections for animations
    sections.forEach(section => {
        observer.observe(section);
    });

    // Contact Form Validation and Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        let isValid = true;
        let errorMessage = '';
        
        if (name === '') {
            isValid = false;
            errorMessage = 'Please enter your name';
        } else if (email === '') {
            isValid = false;
            errorMessage = 'Please enter your email';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email';
        } else if (subject === '') {
            isValid = false;
            errorMessage = 'Please enter a subject';
        } else if (message === '') {
            isValid = false;
            errorMessage = 'Please enter your message';
        }
        
        if (!isValid) {
            showFormError(errorMessage);
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <span class="spinner"></span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (would be an actual API call in production)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            showFormSuccess('Your message has been sent successfully!');
            
            // Reset form
            contactForm.reset();
        }, 1500);
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form error message
    function showFormError(message) {
        // Remove any existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.marginBottom = '1rem';
        errorDiv.textContent = message;
        
        // Insert at top of form
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Show form success message
    function showFormSuccess(message) {
        // Remove any existing success message
        const existingSuccess = document.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Insert at top of form
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        // Add show class after a small delay (for animation)
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 5000);
    }

    // Project cards modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    
    // Create modal container if it doesn't exist
    if (!document.querySelector('.modal')) {
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal';
        modalContainer.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modalContainer);
        
        // Close modal when clicking on close button or outside the modal
        const modal = document.querySelector('.modal');
        const closeBtn = document.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modal = document.querySelector('.modal');
            const modalBody = document.querySelector('.modal-body');
            
            // Get project details
            const projectTitle = card.querySelector('h3').textContent;
            const projectDesc = card.querySelector('p').textContent;
            const projectTech = card.querySelector('.project-tech').innerHTML;
            
            // Populate modal
            modalBody.innerHTML = `
                <h2>${projectTitle}</h2>
                <div class="project-tech">${projectTech}</div>
                <p>${projectDesc}</p>
                <div class="project-gallery">
                    <div class="gallery-item"><div style="background-color: var(--primary-color); height: 150px; display: flex; justify-content: center; align-items: center; color: white;"><i class="fas fa-image fa-3x"></i></div></div>
                    <div class="gallery-item"><div style="background-color: var(--primary-color); height: 150px; display: flex; justify-content: center; align-items: center; color: white;"><i class="fas fa-image fa-3x"></i></div></div>
                    <div class="gallery-item"><div style="background-color: var(--primary-color); height: 150px; display: flex; justify-content: center; align-items: center; color: white;"><i class="fas fa-image fa-3x"></i></div></div>
                </div>
                <h3 style="margin-top: 1.5rem;">Project Details</h3>
                <p>This is a detailed description of the project. In a real portfolio, this would contain more information about the project, challenges faced, solutions implemented, and results achieved.</p>
            `;
            
            // Show modal
            modal.classList.add('show');
        });
    });

    // Add tooltips to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        // Create tooltip wrapper
        const tooltipWrapper = document.createElement('div');
        tooltipWrapper.className = 'tooltip';
        
        // Get the parent node
        const parent = link.parentNode;
        
        // Replace the link with the tooltip wrapper
        parent.replaceChild(tooltipWrapper, link);
        
        // Add the link to the tooltip wrapper
        tooltipWrapper.appendChild(link);
        
        // Add tooltip text
        const tooltipText = document.createElement('span');
        tooltipText.className = 'tooltip-text';
        
        // Set tooltip text based on icon
        if (link.querySelector('.fa-github')) {
            tooltipText.textContent = 'GitHub';
        } else if (link.querySelector('.fa-linkedin')) {
            tooltipText.textContent = 'LinkedIn';
        } else if (link.querySelector('.fa-envelope')) {
            tooltipText.textContent = 'Email';
        }
        
        tooltipWrapper.appendChild(tooltipText);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize animations when page loads
    // Animate hero section immediately
    setTimeout(() => {
        const heroSection = document.getElementById('hero');
        heroSection.classList.add('active');
    }, 300);
});
