<?php
header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../../connect.php"; // หรือ connection.php ของคุณ

$serial = isset($_POST["serial"]) ? trim($_POST["serial"]) : "";

if ($serial === "") {
  echo json_encode(["ok" => false, "message" => "กรุณากรอก Serial number"]);
  exit;
}

$sql = "SELECT serial FROM product_serials WHERE serial = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $serial);
$stmt->execute();
$res = $stmt->get_result();

echo json_encode([
  "ok" => true,
  "found" => ($res && $res->num_rows > 0),
  "message" => ($res && $res->num_rows > 0) ? "" : "ไม่พบ Serial นี้ในระบบ"
]);
