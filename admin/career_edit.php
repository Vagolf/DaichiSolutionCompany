<?php
require __DIR__ . '/_guard.php';
require __DIR__ . '/../connect.php';

$id = intval($_GET['id'] ?? 0);
$isEdit = $id > 0;

$data = [
  'slug' => '',
  'title' => '',
  'short_desc' => '',
  'poster_path' => '',
  'responsibilities' => '',
  'qualifications' => '',
  'apply_email' => 'recruite@daichisolution.com',
  'apply_form_url' => '',
  'apply_notes' => '',
  'is_active' => 1
];

if ($isEdit) {
  $stmt = $conn->prepare("SELECT * FROM careers WHERE id=? LIMIT 1");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $row = $stmt->get_result()->fetch_assoc();
  if ($row) $data = array_merge($data, $row);
}

$msg = $err = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  foreach ($data as $k => $_v) {
    if ($k === 'is_active') continue;
    $data[$k] = $_POST[$k] ?? $data[$k];
  }
  $data['is_active'] = isset($_POST['is_active']) ? 1 : 0;
  // ✅ handle upload poster
  if (!empty($_FILES['poster']['name']) && ($_FILES['poster']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
    $tmp = $_FILES['poster']['tmp_name'];
    $size = (int)($_FILES['poster']['size'] ?? 0);

    // limit 2MB
    if ($size > 2 * 1024 * 1024) {
      $err = "ไฟล์รูปใหญ่เกิน 2MB";
    } else {
      $finfo = new finfo(FILEINFO_MIME_TYPE);
      $mime = $finfo->file($tmp);

      $extMap = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
      ];

      if (!isset($extMap[$mime])) {
        $err = "ชนิดไฟล์ไม่รองรับ (รองรับ JPG/PNG/WebP)";
      } else {
        $ext = $extMap[$mime];

        // filename: slug + time + random
        $safeSlug = preg_replace('~[^a-z0-9\-]+~i', '-', $data['slug']);
        $safeSlug = trim($safeSlug, '-');
        if ($safeSlug === '') $safeSlug = 'career';

        $newName = $safeSlug . '-' . date('YmdHis') . '-' . bin2hex(random_bytes(4)) . '.' . $ext;

        $uploadDir = realpath(__DIR__ . '/../uploads/careers');
        if (!$uploadDir) {
          $err = "ไม่พบโฟลเดอร์ uploads/careers";
        } else {
          $dest = $uploadDir . DIRECTORY_SEPARATOR . $newName;

          if (!move_uploaded_file($tmp, $dest)) {
            $err = "อัปโหลดรูปไม่สำเร็จ";
          } else {
            // ✅ optional: ลบรูปเก่าเมื่ออัปโหลดใหม่
            if (!empty($data['poster_file'])) {
              $old = $uploadDir . DIRECTORY_SEPARATOR . basename($data['poster_file']);
              if (is_file($old)) @unlink($old);
            }
            $data['poster_file'] = $newName;
          }
        }
      }
    }
  }

  if (trim($data['slug']) === '' || trim($data['title']) === '') {
    $err = "ต้องกรอก slug และ title";
  } else {
    if ($isEdit) {
      $stmt = $conn->prepare("UPDATE careers SET
  slug=?, title=?, short_desc=?,
  poster_file=?,
  responsibilities=?, qualifications=?,
  apply_email=?, apply_form_url=?, apply_notes=?,
  is_active=?
  WHERE id=?");

      $stmt->bind_param(
        "ssssssssssi",
        $data['slug'],
        $data['title'],
        $data['short_desc'],
        $data['poster_file'],
        $data['responsibilities'],
        $data['qualifications'],
        $data['apply_email'],
        $data['apply_form_url'],
        $data['apply_notes'],
        $data['is_active'],
        $id
      );

      $stmt->execute();
      $msg = "บันทึกแล้ว";
    } else {
      $stmt = $conn->prepare("INSERT INTO careers
  (slug,title,short_desc,poster_file,responsibilities,qualifications,apply_email,apply_form_url,apply_notes,is_active)
  VALUES (?,?,?,?,?,?,?,?,?,?)");

      $stmt->bind_param(
        "sssssssssi",
        $data['slug'],
        $data['title'],
        $data['short_desc'],
        $data['poster_file'],
        $data['responsibilities'],
        $data['qualifications'],
        $data['apply_email'],
        $data['apply_form_url'],
        $data['apply_notes'],
        $data['is_active']
      );
      $stmt->execute();
      header("Location: careers.php");
      exit;
    }
  }
}
?>
<!doctype html>
<html lang="th">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title><?= $isEdit ? "Edit Career" : "Add Career" ?></title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">
  <div class="container py-4" style="max-width: 980px;">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold m-0"><?= $isEdit ? "แก้ไขตำแหน่งงาน" : "เพิ่มตำแหน่งงาน" ?></h2>
      <a class="btn btn-outline-secondary" href="careers.php">Back</a>
    </div>

    <?php if ($msg): ?><div class="alert alert-success"><?= htmlspecialchars($msg) ?></div><?php endif; ?>
    <?php if ($err): ?><div class="alert alert-danger"><?= htmlspecialchars($err) ?></div><?php endif; ?>

    <form method="post" class="card p-3" enctype="multipart/form-data">
      <div class="row g-2">
        <div class="col-md-4">
          <label class="form-label">Slug*</label>
          <input class="form-control" name="slug" value="<?= htmlspecialchars($data['slug']) ?>" required>
        </div>
        <div class="col-md-8">
          <label class="form-label">Title*</label>
          <input class="form-control" name="title" value="<?= htmlspecialchars($data['title']) ?>" required>
        </div>

        <div class="col-12">
          <label class="form-label">Short desc (หน้า list)</label>
          <input class="form-control" name="short_desc" value="<?= htmlspecialchars($data['short_desc']) ?>">
        </div>

        <div class="col-md-6">
          <label class="form-label">Poster (อัปโหลดรูป)</label>
          <input class="form-control" type="file" name="poster" accept="image/*">
          <div class="form-text">
            รองรับ JPG/PNG/WebP | แนะนำไม่เกิน 2MB
          </div>

          <?php if (!empty($data['poster_file'])): ?>
            <div class="mt-2">
              <div class="small text-muted mb-1">รูปปัจจุบัน</div>
              <img src="../uploads/careers/<?= htmlspecialchars($data['poster_file']) ?>"
                alt="poster" style="max-width:180px;border-radius:12px;border:1px solid rgba(0,0,0,.12);">
            </div>
          <?php endif; ?>
        </div>


        <div class="col-md-6">
          <label class="form-label">Apply form URL</label>
          <input class="form-control" name="apply_form_url" value="<?= htmlspecialchars($data['apply_form_url']) ?>">
        </div>

        <div class="col-md-6">
          <label class="form-label">Apply email</label>
          <input class="form-control" name="apply_email" value="<?= htmlspecialchars($data['apply_email']) ?>">
        </div>

        <div class="col-md-3 d-flex align-items-end">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="is_active" <?= intval($data['is_active']) ? "checked" : "" ?>>
            <label class="form-check-label">Active</label>
          </div>
        </div>

        <div class="col-md-6">
          <label class="form-label">ลักษณะงาน (1 บรรทัด = 1 ข้อ)</label>
          <textarea class="form-control" rows="8" name="responsibilities"><?= htmlspecialchars($data['responsibilities']) ?></textarea>
        </div>

        <div class="col-md-6">
          <label class="form-label">คุณสมบัติ (1 บรรทัด = 1 ข้อ)</label>
          <textarea class="form-control" rows="8" name="qualifications"><?= htmlspecialchars($data['qualifications']) ?></textarea>
        </div>

        <div class="col-12">
          <label class="form-label">สิ่งที่ควรแนบในอีเมล (1 บรรทัด = 1 ข้อ)</label>
          <textarea class="form-control" rows="6" name="apply_notes"><?= htmlspecialchars($data['apply_notes']) ?></textarea>
        </div>
      </div>

      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-primary">Save</button>
        <?php if ($isEdit): ?>
          <a class="btn btn-outline-dark" href="../career-detail.php?slug=<?= urlencode($data['slug']) ?>" target="_blank" rel="noopener">Preview</a>
        <?php endif; ?>
      </div>
    </form>
  </div>
</body>

</html>