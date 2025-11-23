// Foodies Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // =============================================
  // Navigation and Header Functionality
  // =============================================

  // Active navbar scroll effect
  const navigationWrap = document.querySelector(".navigation-wrap");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navigationWrap.classList.add("scroll-on");
    } else {
      navigationWrap.classList.remove("scroll-on");
    }
  });

  // Nav hide on mobile when clicking links
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector('.nav-link[href="#' + sectionId + '"]')
          ?.classList.add("active");
      } else {
        document
          .querySelector('.nav-link[href="#' + sectionId + '"]')
          ?.classList.remove("active");
      }
    });
  });

  // =============================================
  // Counter Animation
  // =============================================

  function startCounter(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      obj.textContent = value.toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Initialize counters when section is in viewport
  const counterSection = document.querySelector(".counter-section");
  if (counterSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start counters with different durations for variety
            startCounter("count1", 0, 1287, 2000);
            startCounter("count2", 100, 5786, 2500);
            startCounter("count3", 0, 1440, 2200);
            startCounter("count4", 0, 7110, 2800);

            observer.unobserve(counterSection);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(counterSection);
  }

  // =============================================
  // Food Cards Interactive Features
  // =============================================

  // Add to favorites functionality
  const favoriteButtons = document.querySelectorAll(".secondary-btn");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".food-card");
      const foodName = card.querySelector(".card-title").textContent;

      // Toggle favorite state
      const isFavorite = this.classList.contains("favorited");

      if (isFavorite) {
        this.classList.remove("favorited");
        this.innerHTML = '<i class="fas fa-heart me-2"></i>Add to Favorites';
        this.style.backgroundColor = "transparent";
        this.style.color = "var(--primary-color)";
        showNotification(`Removed ${foodName} from favorites`, "info");
      } else {
        this.classList.add("favorited");
        this.innerHTML = '<i class="fas fa-heart me-2"></i>Added to Favorites';
        this.style.backgroundColor = "var(--primary-color)";
        this.style.color = "var(--white-color)";
        showNotification(`Added ${foodName} to favorites!`, "success");
      }
    });
  });

  // Order now functionality
  const orderButtons = document.querySelectorAll(".main-btn");
  orderButtons.forEach((button) => {
    if (button.textContent.includes("Order Now")) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const card = this.closest(".food-card");
        const foodName = card.querySelector(".card-title").textContent;
        const price = card.querySelector(".current-price").textContent;

        showNotification(`Added ${foodName} to cart for ${price}`, "success");

        // Add cart animation
        this.innerHTML = '<i class="fas fa-check me-2"></i>Added to Cart';
        this.style.backgroundColor = "#28a745";
        this.style.borderColor = "#28a745";

        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-shopping-cart me-2"></i>Order Now';
          this.style.backgroundColor = "";
          this.style.borderColor = "";
        }, 2000);
      });
    }
  });

  // View More button functionality
  const viewMoreBtn = document.querySelector(".view-more-btn");
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function () {
      showNotification("Loading more menu items...", "info");

      // Simulate loading
      this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML =
          'View All Menu Items <i class="fas fa-chevron-right ms-2"></i>';
        this.disabled = false;
        showNotification("More items loaded successfully!", "success");
      }, 1500);
    });
  }

  // =============================================
  // Testimonial Carousel Enhancements
  // =============================================

  // Auto-rotate testimonial carousel
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      pause: "hover",
      wrap: true,
    });

    // Add keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        carousel.prev();
      } else if (e.key === "ArrowRight") {
        carousel.next();
      }
    });
  }

  // =============================================
  // Newsletter Form Handling
  // =============================================

  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        emailInput.focus();
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Successfully subscribed to our newsletter!",
          "success"
        );
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
    });
  }

  // =============================================
  // FAQ Section Interactive Features
  // =============================================

  const faqItems = document.querySelectorAll(".faq h4");
  faqItems.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isVisible = answer.style.display === "block";

      // Close all other answers
      document.querySelectorAll(".faq p").forEach((p) => {
        p.style.display = "none";
      });

      // Toggle current answer
      answer.style.display = isVisible ? "none" : "block";

      // Add smooth animation
      if (!isVisible) {
        answer.style.opacity = "0";
        answer.style.transform = "translateY(-10px)";
        answer.style.display = "block";

        setTimeout(() => {
          answer.style.transition = "all 0.3s ease";
          answer.style.opacity = "1";
          answer.style.transform = "translateY(0)";
        }, 10);
      }
    });

    // Initially hide answers
    item.nextElementSibling.style.display = "none";
  });

  // =============================================
  // Utility Functions
  // =============================================

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(
      ".custom-notification"
    );
    existingNotifications.forEach((notification) => {
      notification.remove();
    });

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `custom-notification alert alert-${
      type === "error" ? "danger" : type
    } alert-dismissible fade show`;
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: none;
            border-radius: 8px;
        `;

    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // =============================================
  // Scroll Animations
  // =============================================

  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll(
    ".food-card, .testimonial-card, .about-section .card"
  );

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    fadeObserver.observe(element);
  });

  // =============================================
  // Performance Optimizations
  // =============================================

  // Throttle scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        // Handle scroll-based animations here
      }, 100);
    }
  });

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // =============================================
  // Mobile-Specific Enhancements
  // =============================================

  // Handle touch events for better mobile experience
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - previous testimonial
        const carousel = bootstrap.Carousel.getInstance(testimonialCarousel);
        if (carousel) carousel.prev();
      } else {
        // Swipe left - next testimonial
        const carousel = bootstrap.Carousel.getInstance(testimonialCarousel);
        if (carousel) carousel.next();
      }
    }
  }

  // =============================================
  // Initialize All Features
  // =============================================

  console.log("Foodies website initialized successfully!");

  // Add loading animation removal
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });
});
