<?php
// connect.php (วางไว้ที่ root: /DCS/connect.php)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// ====== ตั้งค่าฐานข้อมูล ======
$DB_HOST = "localhost"; // ส่วนใหญ่ใช้ localhost
$DB_USER = "daichi";        // XAMPP ส่วนใหญ่ใช้ root
$DB_PASS = "12345678";            // XAMPP ส่วนใหญ่ไม่มีรหัสผ่าน
$DB_NAME = "daichisolution"; 

// ====== สร้างการเชื่อมต่อ ======
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
  // ใช้ die แบบเรียบง่าย (จะปรับเป็น throw ก็ได้)
  die("Database connection failed: " . $conn->connect_error);
}

// ตั้ง charset ให้รองรับภาษาไทย/อีโมจิ
$conn->set_charset("utf8mb4");
