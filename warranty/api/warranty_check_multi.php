<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../../connect.php";

$raw = isset($_POST["serials"]) ? trim($_POST["serials"]) : "";
if ($raw === "") {
  echo json_encode(["ok" => false, "message" => "กรุณาใส่ Serial อย่างน้อย 1 รายการ"]);
  exit;
}

// แยกด้วย newline / space / comma / semicolon
$tokens = preg_split('/[\s,;]+/u', $raw, -1, PREG_SPLIT_NO_EMPTY);

$serials = [];
$seen = [];
$invalid = [];

foreach ($tokens as $t) {
  $s = trim($t);
  if ($s === "") continue;

  // validate เหมือนหน้าเว็บ
  if (!preg_match('/^[a-zA-Z0-9\-]{4,40}$/', $s)) {
    $invalid[] = $s;
    continue;
  }

  if (!isset($seen[$s])) {
    $seen[$s] = true;
    $serials[] = $s;
  }
}

if (count($serials) === 0) {
  echo json_encode([
    "ok" => false,
    "message" => "ไม่มี Serial ที่รูปแบบถูกต้อง",
    "invalid" => $invalid
  ]);
  exit;
}

if (count($serials) > 50) {
  echo json_encode(["ok" => false, "message" => "ตรวจได้สูงสุด 50 รายการต่อครั้ง"]);
  exit;
}

// query ทีเดียวด้วย IN (...)
$placeholders = implode(",", array_fill(0, count($serials), "?"));
$sql = "SELECT
          serial,
          product_name,
          TRIM(model) AS model,
          warranty_start,
          warranty_end
        FROM product_serials
        WHERE serial IN ($placeholders)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
  echo json_encode(["ok" => false, "message" => "Prepare failed"]);
  exit;
}

// bind_param แบบ dynamic
$types = str_repeat("s", count($serials));
$params = array_merge([$types], $serials);
$tmp = [];
foreach ($params as $k => $v) {
  $tmp[$k] = &$params[$k]; // ต้อง reference
}
call_user_func_array([$stmt, "bind_param"], $tmp);

$stmt->execute();
$res = $stmt->get_result();

$map = [];
$today = date("Y-m-d");

while ($row = $res->fetch_assoc()) {
  $inWarranty = false;
  if (!empty($row["warranty_end"])) {
    $inWarranty = ($today <= $row["warranty_end"]);
  }
  $row["in_warranty"] = $inWarranty ? 1 : 0;
  $map[$row["serial"]] = $row;
}

// คืนผลตามลำดับ input
$items = [];
foreach ($serials as $s) {
  if (isset($map[$s])) {
    $items[] = ["serial" => $s, "found" => true, "data" => $map[$s]];
  } else {
    $items[] = ["serial" => $s, "found" => false];
  }
}

echo json_encode([
  "ok" => true,
  "items" => $items,
  "invalid" => $invalid
]);
