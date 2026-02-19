function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("careerGrid");
  if (!grid) return;

  try {
    const res = await fetch("api/careers.php", { cache: "no-store" });
    const data = await res.json();

    const items = Array.isArray(data.careers) ? data.careers : [];

    grid.innerHTML = items.map(x => {
      const img = x.poster_url || ""; // ✅ ใช้ตัวนี้
      return `
        <div class="col-lg-4 col-md-6">
          <div class="career-card">
            <a class="career-poster" href="career-detail.php?slug=${encodeURIComponent(x.slug)}">
              <img src="${escapeHtml(img)}"
                   alt="${escapeHtml(x.title)}"
                   onerror="this.src='images/career/default.png';this.onerror=null;">
            </a>
            <div class="career-body">
              <h3 class="career-role">${escapeHtml(x.title)}</h3>
              <p class="career-desc">${escapeHtml(x.short_desc || '')}</p>
            </div>
          </div>
        </div>
      `;
    }).join("");

  } catch (e) {
    console.error(e);
  }
});
