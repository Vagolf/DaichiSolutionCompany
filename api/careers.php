<?php
require __DIR__ . '/../connect.php';
header('Content-Type: application/json; charset=utf-8');

$sql = "SELECT id, slug, title, short_desc, poster_path, poster_file, is_active
        FROM careers
        WHERE is_active = 1
        ORDER BY updated_at DESC, id DESC";

$res = $conn->query($sql);
$rows = $res ? $res->fetch_all(MYSQLI_ASSOC) : [];

// ถ้า API อยู่ /dcs/api/careers.php => ได้ "/dcs"
$siteRoot = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/');

foreach ($rows as &$r) {
  // 1) ถ้ามีอัปโหลดไฟล์ ใช้ uploads ก่อน
  $p = '';
  if (!empty($r['poster_file'])) {
    $p = "uploads/careers/" . $r['poster_file'];
  } else {
    $p = $r['poster_path'] ?? '';
  }

  // 2) กันค่า "../" ที่หลุดมาจากหน้าในโฟลเดอร์อื่น
  $p = preg_replace('~^(\.\./)+~', '', $p);

  // 3) ทำเป็น absolute url: "/dcs/...."
  $r['poster_url'] = $p ? ($siteRoot . '/' . ltrim($p, '/')) : '';
}

echo json_encode(['careers' => $rows], JSON_UNESCAPED_UNICODE);
