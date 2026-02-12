// ===================================
// Theme Toggle Functionality
// ===================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ===================================
// Mobile Navigation Menu
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ===================================
// Intersection Observer for Animations
// ===================================
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

// Observe all animated elements
const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .education-item');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===================================
// Typing Effect for Hero Section
// ===================================
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Optional: Uncomment to enable typing effect on page load
// window.addEventListener('load', () => {
//     const nameElement = document.querySelector('.name');
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 100);
// });

// ===================================
// Scroll Progress Indicator
// ===================================
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Create progress bar if it doesn't exist
  let progressBar = document.getElementById('scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--accent);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);
  }

  progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Code Window Animation
// ===================================
const codeContent = document.querySelector('.code-content code');
if (codeContent) {
  const codeText = codeContent.innerHTML;
  codeContent.innerHTML = '';

  let index = 0;
  function animateCode() {
    if (index < codeText.length) {
      codeContent.innerHTML += codeText.charAt(index);
      index++;
      setTimeout(animateCode, 20);
    }
  }

  // Start animation when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateCode, 500);
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const hero = document.querySelector('.hero');
  if (hero) heroObserver.observe(hero);
}

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector('.hero-visual');

  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===================================
// Stats Counter Animation
// ===================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current * 10) / 10;
    }
  }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      const targetValue = parseFloat(statNumber.textContent);
      animateCounter(statNumber, targetValue);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
  statsObserver.observe(stat);
});

// ===================================
// Cursor Trail Effect (Optional - Desktop Only)
// ===================================
if (window.innerWidth > 768) {
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll('.cursor-circle');

  // Create cursor circles if they don't exist
  if (circles.length === 0) {
    for (let i = 0; i < 10; i++) {
      const circle = document.createElement('div');
      circle.className = 'cursor-circle';
      circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--accent);
                pointer-events: none;
                opacity: 0;
                z-index: 9999;
                transition: opacity 0.3s ease;
            `;
      document.body.appendChild(circle);
    }
  }

  const allCircles = document.querySelectorAll('.cursor-circle');

  allCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
  });

  window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCursor() {
    let x = coords.x;
    let y = coords.y;

    allCircles.forEach((circle, index) => {
      circle.style.opacity = (10 - index) / 20;
      circle.style.left = x - 5 + 'px';
      circle.style.top = y - 5 + 'px';
      circle.style.transform = `scale(${(10 - index) / 10})`;

      const nextCircle = allCircles[index + 1] || allCircles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;

      circle.x = x;
      circle.y = y;
    });

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

// ===================================
// Email Copy Functionality
// ===================================
document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
  emailLink.addEventListener('click', (e) => {
    // Don't prevent default, but show a tooltip
    const email = emailLink.href.replace('mailto:', '');

    // Create temporary tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Email copied!';
    tooltip.style.cssText = `
            position: fixed;
            top: ${e.clientY - 50}px;
            left: ${e.clientX}px;
            background: var(--accent);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.9rem;
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
        `;
    document.body.appendChild(tooltip);

    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
      setTimeout(() => {
        tooltip.remove();
      }, 2000);
    });
  });
});

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('load', () => {
  // Remove loading class if exists
  document.body.classList.remove('loading');

  // Update scroll progress
  updateScrollProgress();

  // Highlight current nav section
  highlightNavOnScroll();

  console.log('%c Welcome to my portfolio! ', 'background: #0066ff; color: white; font-size: 16px; padding: 10px;');
  console.log('%c Built with HTML, CSS, and JavaScript ', 'color: #0066ff; font-size: 12px;');
});

// ===================================
// Performance: Debounce Function
// ===================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events for better performance
const debouncedScrollProgress = debounce(updateScrollProgress, 10);
const debouncedNavHighlight = debounce(highlightNavOnScroll, 10);

window.addEventListener('scroll', debouncedScrollProgress);
window.addEventListener('scroll', debouncedNavHighlight);