document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.code === "KeyV") {
    window.location.href = "admin/login.php";
  }
});
