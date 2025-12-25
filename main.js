document.addEventListener("DOMContentLoaded", function () {
  // ====== CONTACT FORM ======
  // JavaScript for handling form validation and submission
  // Validates name, email, and message fields
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      if (nameInput.value.trim() === "") {
        alert("Please enter your name.");
        nameInput.focus();
        isValid = false;
      } else if (emailInput.value.trim() === "") {
        alert("Please enter your email.");
        emailInput.focus();
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        isValid = false;
      } else if (messageInput.value.trim() === "") {
        alert("Please enter your message.");
        messageInput.focus();
        isValid = false;
      }

      if (isValid) {
        alert("Thank you for your inquiry! We will contact you shortly.");
        contactForm.reset();
      }
    });
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // ====== SMOOTH SCROLL ======
  // Smooth scrolling for internal links
  // Applies smooth scroll behavior to anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // ====== INTERSECTION OBSERVER ======
  // IntersectionObserver for lazy loading or animations
  // Observes elements with data-group attribute
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const group = entry.target.getAttribute("data-group");
          if (group) {
            const elements = document.querySelectorAll(`[data-group="${group}"]`);
            elements.forEach((el) => el.classList.add("in-view"));
          }
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll("[data-group]").forEach((el) => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll(
    '.scroll-slide-left, .scroll-slide-right, .scroll-slide-up, .scroll-slide-down'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  els.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    // Find all elements with the class 'product-hover-image'
    const productImages = document.querySelectorAll('.product-hover-image');

    // Loop through each image element
    productImages.forEach(imgElement => {
        // Get the image URLs from data attributes
        const originalSrc = imgElement.getAttribute('data-original-src');
        const hoverSrc = imgElement.getAttribute('data-hover-src');

        // Check if both URLs are present
        if (!originalSrc || !hoverSrc) return;

        // (Optional) Preload hover image
        const preloadImg = new Image();
        preloadImg.src = hoverSrc;

        // Add Event Listener for mouseover
        imgElement.addEventListener('mouseover', () => {
            imgElement.src = hoverSrc;
        });

        // Add Event Listener for mouseout
        imgElement.addEventListener('mouseout', () => {
            imgElement.src = originalSrc;
        });
    });
});



