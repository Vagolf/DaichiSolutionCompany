<?php
require __DIR__ . '/_guard.php';
require __DIR__ . '/../connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? '';
  $id = intval($_POST['id'] ?? 0);

  if ($action === 'delete' && $id > 0) {
    $stmt = $conn->prepare("DELETE FROM careers WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
  }

  if ($action === 'toggle' && $id > 0) {
    $stmt = $conn->prepare("UPDATE careers SET is_active = 1 - is_active WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
  }

  // กันกด refresh แล้ว submit ซ้ำ
  header("Location: careers.php");
  exit;
}

/* ✅ ดึงรายการ careers มาใส่ $items */
$items = [];
$sql = "SELECT id, title, slug, is_active, updated_at
        FROM careers
        ORDER BY updated_at DESC, id DESC";
$res = $conn->query($sql);
if ($res) {
  $items = $res->fetch_all(MYSQLI_ASSOC);
}
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Manage Careers</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold m-0">จัดการตำแหน่งงาน</h2>
      <div class="d-flex gap-2">
        <a class="btn btn-success" href="career_edit.php">+ Add</a>
        <a class="btn btn-outline-secondary" href="logout.php">Logout</a>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped align-middle bg-white">
        <thead>
          <tr>
            <th>#</th><th>Title</th><th>Slug</th><th>Status</th><th>Updated</th><th style="width:260px;">Action</th>
          </tr>
        </thead>
        <tbody>
        <?php if (!$items): ?>
          <tr>
            <td colspan="6" class="text-center text-muted py-4">ยังไม่มีข้อมูล</td>
          </tr>
        <?php else: ?>
          <?php foreach($items as $c): ?>
            <tr>
              <td><?= intval($c['id']) ?></td>
              <td><?= htmlspecialchars($c['title']) ?></td>
              <td><?= htmlspecialchars($c['slug']) ?></td>
              <td><?= intval($c['is_active']) ? 'ON' : 'OFF' ?></td>
              <td><?= htmlspecialchars($c['updated_at'] ?? '-') ?></td>
              <td>
                <a class="btn btn-sm btn-primary" href="career_edit.php?id=<?= intval($c['id']) ?>">Edit</a>

                <form method="post" class="d-inline">
                  <input type="hidden" name="id" value="<?= intval($c['id']) ?>">
                  <button class="btn btn-sm btn-warning" name="action" value="toggle">Toggle</button>
                </form>

                <form method="post" class="d-inline" onsubmit="return confirm('ลบรายการนี้?')">
                  <input type="hidden" name="id" value="<?= intval($c['id']) ?>">
                  <button class="btn btn-sm btn-danger" name="action" value="delete">Delete</button>
                </form>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>
