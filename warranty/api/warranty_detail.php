<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../../connect.php"; // หรือ connection.php ของคุณ

$serial = isset($_GET["serial"]) ? trim($_GET["serial"]) : "";

if ($serial === "") {
  echo json_encode(["ok" => false, "message" => "กรุณาระบุ serial"]);
  exit;
}

$sql = "SELECT
          serial,
          product_name,
          TRIM(model) AS model,
          purchase_date,
          warranty_start,
          warranty_end,
          notes
        FROM product_serials
        WHERE serial = ?
        LIMIT 1";


$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $serial);
$stmt->execute();
$res = $stmt->get_result();

if (!$res || $res->num_rows === 0) {
  echo json_encode(["ok" => true, "found" => false, "message" => "ไม่พบข้อมูลสินค้า"]);
  exit;
}

$row = $res->fetch_assoc();

$today = date("Y-m-d");
$inWarranty = false;
if (!empty($row["warranty_end"])) {
  $inWarranty = ($today <= $row["warranty_end"]);
}
$row["in_warranty"] = $inWarranty ? 1 : 0;

echo json_encode(["ok" => true, "found" => true, "data" => $row]);
