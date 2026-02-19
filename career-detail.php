<?php
require __DIR__ . '/connect.php';

$slug = trim($_GET['slug'] ?? '');
if ($slug === '') { http_response_code(404); exit('Not found'); }

$stmt = $conn->prepare("SELECT * FROM careers WHERE slug=? AND is_active=1 LIMIT 1");
$stmt->bind_param("s", $slug);
$stmt->execute();
$c = $stmt->get_result()->fetch_assoc();

if (!$c) { http_response_code(404); exit('Not found'); }

function linesToLis($text) {
  $lines = preg_split("/\r\n|\n|\r/", (string)$text);
  $lis = [];
  foreach ($lines as $ln) {
    $ln = trim($ln);
    if ($ln !== '') $lis[] = "<li>" . htmlspecialchars($ln) . "</li>";
  }
  return implode("\n", $lis);
}
?>
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>สมัครงาน | <?= htmlspecialchars($c['title']) ?> - Daichi Solution</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="style.css">

  <style>
    .muted{color:#6b7280;}
    .sec-title{font-weight:800;}
    .card-soft{border:1px solid rgba(0,0,0,.08);border-radius:18px;box-shadow:0 10px 26px rgba(0,0,0,.06);background:#fff;}
    .job-hero{padding:56px 0 20px;}
    .job-img{border-radius:14px;width:100%;height:auto;object-fit:cover;}
    .job-narrow{max-width:900px;margin:0 auto;}
    .list-check li{margin-bottom:.65rem;}
  </style>
</head>

<body>
  <div id="navbar" class="sticky-top"></div>

  <main>
    <section class="job-hero">
      <div class="container job-narrow">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <h1 class="display-6 fw-bold mb-2 scroll-slide-up"><?= htmlspecialchars($c['title']) ?></h1>
            <div class="scroll-slide-down" style="width:300px;height:1px;background:#0F172A;border-radius:999px;margin:18px auto 0;"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-5">
      <div class="container job-narrow">
        <div class="row g-4 align-items-start">
          <div class="col-lg-4">
            <img class="job-img img-fluid card-soft scroll-slide-right"
                 src="<?= htmlspecialchars($c['poster_path']) ?>" alt="<?= htmlspecialchars($c['title']) ?>">
          </div>

          <div class="col-lg-8 scroll-slide-left">
            <h3 class="sec-title mb-3" style="font-size:20px;">ลักษณะงาน</h3>
            <ul class="list-check mb-0" style="font-size:13px;">
              <?= linesToLis($c['responsibilities']) ?>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="apply" class="py-5" style="background:#f8fafc;">
      <div class="container job-narrow">
        <div class="row g-4 align-items-start">

          <div class="col-lg-5 scroll-slide-left">
            <h2 class="h5 sec-title mb-3">คุณสมบัติ</h2>
            <ul class="list-check mb-0" style="font-size:13px;">
              <?= linesToLis($c['qualifications']) ?>
            </ul>
          </div>

          <div class="col-lg-7 scroll-slide-right">
            <div class="card-soft p-4 h-100">
              <h2 class="h5 sec-title mb-2">ช่องทางติดต่อสำหรับสมัครงาน</h2>
              <p>Email: <?= htmlspecialchars($c['apply_email'] ?: 'recruite@daichisolution.com') ?></p>

              <h3 class="h6 fw-bold mb-2">สิ่งที่ควรแนบในอีเมล</h3>
              <ul class="mb-4">
                <?= linesToLis($c['apply_notes']) ?>
              </ul>

              <div class="d-flex flex-wrap gap-2">
                <?php if (!empty($c['apply_form_url'])): ?>
                  <a class="btn btn-outline-secondary" href="<?= htmlspecialchars($c['apply_form_url']) ?>" rel="noopener" target="_blank">
                    สมัครทันที
                  </a>
                <?php endif; ?>
              </div>

              <?php if (!empty($_SESSION['admin_id'])): ?>
                <div class="mt-3 small muted">Admin preview</div>
              <?php endif; ?>
            </div>
          </div>

        </div>
      </div>
    </section>
  </main>

  <div id="footer"></div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js/navbar.js"></script>
  <script src="js/footer.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const targets = document.querySelectorAll('.scroll-slide-left, .scroll-slide-right, .scroll-slide-up, .scroll-slide-down');
      if (!targets.length) return;
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.2 });
      targets.forEach(el => observer.observe(el));
    });
  </script>
</body>
</html>
