/**
 * Custom JavaScript for P5 Management Website
 * File: script.js
 */

document.addEventListener("DOMContentLoaded", function () {
  // ====== CONTACT FORM (ของเดิมนาย) ======
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

  // ====== SMOOTH SCROLL (ของเดิมนาย) ======
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
});