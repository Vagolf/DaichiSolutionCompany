<?php
session_start();
require_once __DIR__ . "/../connect.php"; // ปรับ path ตามโปรเจกต์

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $username = trim($_POST["username"] ?? "");
  $password = $_POST["password"] ?? "";

  if ($username === "" || $password === "") {
    $error = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
  } else {
    // ดึง user
    $stmt = $conn->prepare("SELECT id, username, password_hash, is_active FROM admin_accounts WHERE username = ? LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // ✅ จุดที่ต้องใส่ password_verify อยู่ตรงนี้
    if ($row && (int)$row["is_active"] === 1 && password_verify($password, $row["password_hash"])) {
      // login ok
      $_SESSION["admin_id"] = (int)$row["id"];
      $_SESSION["admin_username"] = $row["username"];

      header("Location: careers.php"); // หน้าแอดมินหลังล็อกอิน
      exit();
    } else {
      $error = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    }
  }
}
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Daichi Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-5" style="max-width:520px;">
    <div class="card p-4 shadow-sm">
      <h3 class="mb-3">Daichi Admin</h3>

      <?php if ($error): ?>
        <div class="alert alert-danger"><?php echo htmlspecialchars($error, ENT_QUOTES, "UTF-8"); ?></div>
      <?php endif; ?>

      <form method="post">
        <label class="form-label">Username</label>
        <input class="form-control mb-3" name="username" autocomplete="username" required>

        <label class="form-label">Password</label>
        <input class="form-control mb-3" type="password" name="password" autocomplete="current-password" required>

        <button class="btn btn-primary w-100 mb-2">Login</button>
        <a class="btn btn-outline-secondary w-100" href="../career.html">Back</a>
      </form>
    </div>
  </div>
</body>
</html>
