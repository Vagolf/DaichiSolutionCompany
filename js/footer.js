// footer.js
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer-main pt-0 pb-10 site-footer">
        <div class="container">
            <div class="row g-4">

                <div class="col-lg-2 d-none d-lg-block"></div>

                <!-- Address -->
                <div class="col-lg-4 col-md-6">

            <h5 class="mb-3">ที่อยู่</h5>
                <ul class="list-unstyled footer-contact mb-3">
                    <li>
                        <i class="fa-solid fa-location-dot me-2"></i>
                        135/2-3 ซ. ลาดพร้าว 94 แขวงพลับพลา <br>
                        เขตวังทองหลาง กรุงเทพฯ 10310 ประเทศไทย
                    </li>
                    <li class="mt-2">
                        <i class="fa-solid fa-phone me-2"></i>
                        02 004 1722
                    </li>
                    <li class="mt-2">
                        <i class="fa-solid fa-phone me-2"></i>
                        02 052 2426
                    </li>
                    <li class="mt-2">
                        <i class="fa-solid fa-envelope me-2"></i>
                        sale@daichisolution.com
                    </li>
                    <li class="mt-2">
                        <i class="fa-solid fa-envelope me-2"></i>
                        helpdesk@daichisolution.com
                    </li> 
                    <li class="mt-2">
                        <a class="social-row" href="https://line.me/ti/p/T_3q5_F59F" target="_blank" rel="noopener">
                        <i class="fa-brands fa-line me-2"></i>
                        Daichi Solution 
                        </a>
                    </li>
                    <li class="mt-2">
                        <a class="social-row" href="https://www.facebook.com/p/Daichi-Solution-CoLtd-100063740402307/?locale=th_TH" target="_blank" rel="noopener">
                        <i class="fa-brands fa-facebook me-2"></i>
                        Daichi Solution Co., Ltd.
                        </a>
                    </li>

                     
                    </li>
                </ul>
            </div>
                <!-- Location Map -->
                <div class="col-lg-4 col-md-6">
                    <h5 class="mb-3">แผนที่ตั้ง</h5>
                    <div class="footer-map-wrapper">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d768.9039418198836!2d100.60951409488433!3d13.776893573757079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f0300996c01%3A0x5d8f225c643b9ee5!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5hOC4lOC4iOC4tOC5guC4i-C4peC4ueC4iuC4seC5iOC4mSDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1764660716086!5m2!1sth!2sth"
                            width="100%" height="190" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            <hr class="border-top border-light mt-1 mb-2">

            <div class="text-center small">
            </div>
            <!--- &copy; 2025 Daichisolution Website. All Rights Reserved. --->
        </div>
    </footer>
  `;
});
