// navbar.js
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light sticky-top py-3 px-3 px-lg-5 shadow-sm"
        style="background-color: #0F172A;">
        <div class="container-fluid">
            <a href="index.html" class="navbar-brand">
                <img class="me-3" src="images/logo/Daichi-logo-navbar.png" alt="Daichisolution Logo"
                    style="max-height: 50px;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto p-2 p-lg-0">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="#about" class="nav-link">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a href="services.html" class="nav-link">Solutions & Services</a>
                    </li>
                    <li class="nav-item">
                        <a href="products.html" class="nav-link">Products</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="nav-link">Contact Us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  `;
});
