// Premium Cursor Effect - Highly Visible & Smooth
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  // Only on desktop
  if (window.innerWidth > 768 && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;
    
    // Show cursors
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
    document.body.style.cursor = 'none';
    
    // Mouse move handler - instant dot, smooth ring
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows instantly - no lag
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    };
    
    // Smooth ring animation
    const animateRing = () => {
      // Calculate distance for smooth follow
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      
      ringX += dx * 0.25; // Smooth follow speed
      ringY += dy * 0.25;
      
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      requestAnimationFrame(animateRing);
    };
    
    // Initial positions
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
    ringX = mouseX;
    ringY = mouseY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    // Start animations
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    animateRing();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .btn, .project-card, .skill-card, .info-card, .theme-toggle, input, textarea, .social-links a, .project-link');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        cursorDot.classList.add('cursor-hover');
        cursorRing.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        cursorDot.classList.remove('cursor-hover');
        cursorRing.classList.remove('cursor-hover');
      });
    });
    
    // Hide on mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        document.body.style.cursor = 'auto';
      } else {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        document.body.style.cursor = 'none';
      }
    });
  } else {
    // Mobile fallback
    document.body.style.cursor = 'auto';
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(`${currentTheme}-theme`);

// Update icon based on theme
const updateThemeIcon = () => {
  const icon = themeToggle.querySelector('i');
  if (body.classList.contains('dark-theme')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
};

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  
  const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  
  updateThemeIcon();
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const updateActiveNav = () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNav);

// Typing Animation
const typingTexts = [
  'Frontend Developer',
  'Web Designer',
  'UI/UX Enthusiast',
  'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

const typeText = () => {
  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typeSpeed = 500;
  }

  setTimeout(typeText, typeSpeed);
};

if (typingElement) {
  typeText();
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Animate Skill Bars
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    const isVisible = bar.getBoundingClientRect().top < window.innerHeight;
    
    if (isVisible && bar.style.width === '0px' || !bar.style.width) {
      setTimeout(() => {
        bar.style.width = `${progress}%`;
      }, 200);
    }
  });
};

// Trigger skill bar animation on scroll
let skillBarsAnimated = false;
window.addEventListener('scroll', () => {
  if (!skillBarsAnimated) {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight) {
        animateSkillBars();
        skillBarsAnimated = true;
      }
    }
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Simulate form submission (you can integrate with a backend service)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon!`);
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image');
  
  if (hero && heroImage) {
    const rate = scrolled * 0.5;
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Add animation to floating shapes
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
  shape.style.animationDelay = `${index * 0.5}s`;
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-item h3');

const animateCounter = (element) => {
  const target = parseInt(element.textContent.replace('+', ''));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };
  
  updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('h3');
      if (statNumber && !statNumber.dataset.animated) {
        statNumber.dataset.animated = 'true';
        animateCounter(statNumber);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  animateSkillBars();
  
  // Add smooth fade-in to body
  body.style.opacity = '0';
  body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    body.style.opacity = '1';
  }, 100);
});