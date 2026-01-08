/* ===== Service Center Cards (show immediately) ===== */

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* --------- OPTION --------- */
const serviceCenters = [
  {
    key: "bkk",
    title: "ศูนย์บริการกรุงเทพมหานคร",
    address: "135/2-3 ซ. ลาดพร้าว 94 แขวงพลับพลา เขตวังทองหลาง กรุงเทพฯ 10310",
    provinces: [
      "กรุงเทพมหานคร", "ฉะเชิงเทรา", "นครนายก", "นนทบุรี", "ปทุมธานี",
      "สมุทรปราการ","สมุทรสาคร"
    ],
  },
  {
    key: "nakhon_pathom",
    title: "ศูนย์บริการจังหวัดนครปฐม",
    address: "...................ที่อยู่.............",
    provinces: [
        "กาญจนบุรี", "นครปฐม", "ราชบุรี"
    ],
  },
  {
    key: "prachuap_khiri_khan",
    title: "ศูนย์บริการจังหวัดประจวบคีรีขันธ์",
    address: "...................ที่อยู่.............",
    provinces: [
        "เพชรบุรี", "ประจวบคีรีขันธ์", "สมุทรสงคราม"
    ],
  },
  {
    key: "ayutthaya",
    title: "ศูนย์บริการจังหวัดพระนครศรีอยุธยา",
    address: "...................ที่อยู่.............",
    provinces: [
        "ลพบุรี", "พระนครศรีอยุธยา", "สระบุรี", "สุพรรณบุรี", "อ่างทอง"
    ],
  },
  {
    key: "chon_buri",
    title: "ศูนย์บริการจังหวัดชลบุรี",
    address: "...................ที่อยู่.............",
    provinces: [
        "ชลบุรี", "ระยอง"
    ],
  },
  {
    key: "chanthaburi",
    title: "ศูนย์บริการจังหวัดจันทบุรี",
    address: "...................ที่อยู่.............",
    provinces: [
        "จันทบุรี", "ตราด"
    ],
  },
  {
    key: "prachin_buri",
    title: "ศูนย์บริการจังหวัดปราจีนบุรี",
    address: "...................ที่อยู่.............",
    provinces: [
        "ปราจีนบุรี", "สระแก้ว"
    ],
  },
  {
    key: "khon_kaen",
    title: "ศูนย์บริการจังหวัดขอนแก่น",
    address: "...................ที่อยู่.............",
    provinces: [
        "ขอนแก่น", "กาฬสินธุ์", "มหาสารคาม", "หนองบัวลำภู"
    ],
  },
  {
    key: "udon_thani",
    title: "ศูนย์บริการจังหวัดอุดรธานี",
    address: "...................ที่อยู่.............",
    provinces: [
        "บึงกาฬ", "อุดรธานี"
    ],
  },
  {
    key: "loei",
    title: "ศูนย์บริการจังหวัดเลย",
    address: "...................ที่อยู่.............",
    provinces: [
        "เลย"
    ],
  },
  {
    key: "nong_khai",
    title: "ศูนย์บริการจังหวัดหนองคาย",
    address: "...................ที่อยู่.............",
    provinces: [
        "หนองคาย"
    ],
  },
  {
    key: "nakhon_phanom",
    title: "ศูนย์บริการจังหวัดนครพนม",
    address: "...................ที่อยู่.............",
    provinces: [
        "นครพนม"
    ],
  },
  {
    key: "nakhon_ratchasima",
    title: "ศูนย์บริการจังหวัดนครราชสีมา",
    address: "...................ที่อยู่.............",
    provinces: [
        "นครราชสีมา", "ชัยภูมิ", "สุรินทร์", "บุรีรัมย์"
    ],
  },
  {
    key: "ubon_ratchathani",
    title: "ศูนย์บริการจังหวัดอุบลราชธานี",
    address: "...................ที่อยู่.............",
    provinces: [
        "อุบลราชธานี", "อำนาจเจริญ", "ร้อยเอ็ด"
    ],
  },
  {
    key: "sakon_nakhon",
    title: "ศูนย์บริการจังหวัดสกลนคร",
    address: "...................ที่อยู่.............",
    provinces: [
        "สกลนคร"
    ],
  },
  {
    key: "srisaket",
    title: "ศูนย์บริการจังหวัดศรีสะเกษ",
    address: "...................ที่อยู่.............",
    provinces: [
        "ศรีสะเกษ"
    ],
  },
  {
    key: "yasothon",
    title: "ศูนย์บริการจังหวัดยโสธร",
    address: "...................ที่อยู่.............",
    provinces: [
        "มุกดาหาร", "ยโสธร"
    ],
  },
  {
    key: "chiang_mai",
    title: "ศูนย์บริการจังหวัดเชียงใหม่",
    address: "...................ที่อยู่.............",
    provinces: [
        "เชียงใหม่", "ลำพูน"
    ],
  },
  {
    key: "chiang_rai",
    title: "ศูนย์บริการจังหวัดเชียงราย",
    address: "...................ที่อยู่.............",
    provinces: [
        "เชียงราย"
    ],
  },
  {
    key: "lampang",
    title: "ศูนย์บริการจังหวัดลำปาง",
    address: "...................ที่อยู่.............",
    provinces: [
        "ลำปาง", "พะเยา"
    ],
  },
  {
    key: "nan",
    title: "ศูนย์บริการจังหวัดน่าน",
    address: "...................ที่อยู่.............",
    provinces: [
        "น่าน", "แพร่", "อุตรดิตถ์"
    ],
  },
  {
    key: "nakhon_sawan",
    title: "ศูนย์บริการจังหวัดนครสวรรค์",
    address: "...................ที่อยู่.............",
    provinces: [
        "ชัยนาท", "นครสวรรค์", "สิงห์บุรี", "อุทัยธานี"
    ],
  },
  {
    key: "tak",
    title: "ศูนย์บริการจังหวัดตาก",
    address: "...................ที่อยู่.............",
    provinces: [
        "ตาก"
    ],
  },
  {
    key: "phetchabun",
    title: "ศูนย์บริการจังหวัดเพชรบูรณ์",
    address: "...................ที่อยู่.............",
    provinces: [
        "เพชรบูรณ์"
    ],
  },
  {
    key: "sukhothai",
    title: "ศูนย์บริการจังหวัดสุโขทัย",
    address: "...................ที่อยู่.............",
    provinces: [
        "กำแพงเพชร", "พิจิตร", "พิษณุโลก", "สุโขทัย"
    ],
  },
  {
    key: "songkhla",
    title: "ศูนย์บริการจังหวัดสงขลา",
    address: "...................ที่อยู่.............",
    provinces: [
        "สตูล", "สงขลา"
    ],
  },
  {
    key: "chumphon",
    title: "ศูนย์บริการจังหวัดชุมพร",
    address: "...................ที่อยู่.............",
    provinces: [
        "ชุมพร", "ระนอง"
    ],
  },
  {
    key: "koh_samui",
    title: "ศูนย์บริการจังหวัดสุราษฎร์ธานี",
    address: "...................ที่อยู่.............",
    provinces: [
        "สุราษฎร์ธานี"
    ],
  },
  {
    key: "krabi",
    title: "ศูนย์บริการจังหวัดกระบี่",
    address: "...................ที่อยู่.............",
    provinces: [
        "กระบี่", "ตรัง"
    ],
  },
  {
    key: "nakhon_si_thammarat",
    title: "ศูนย์บริการจังหวัดนครศรีธรรมราช",
    address: "...................ที่อยู่.............",
    provinces: [
        "นครศรีธรรมราช", "สุราษฎร์ธานี"
    ],
  },
  {
    key: "phatthalung",
    title: "ศูนย์บริการจังหวัดพัทลุง",
    address: "...................ที่อยู่.............",
    provinces: [
        "พัทลุง"
    ],
  },
  {
    key: "phuket",
    title: "ศูนย์บริการจังหวัดภูเก็ต",
    address: "...................ที่อยู่.............",
    provinces: [
        "พังงา", "ภูเก็ต"
    ],
  },
  {
    key: "narathiwat",
    title: "ศูนย์บริการจังหวัดนราธิวาส",
    address: "...................ที่อยู่.............",
    provinces: [
        "นราธิวาส", "ปัตตานี", "ยะลา"
    ],
  },

];

/* --------- FUNCTIONS --------- */
function buildFromLocations(locationsObj) {
  return Object.entries(locationsObj).map(([key, d]) => ({
    key,
    title: d.title || key,
    address: "",
    provinces: Array.isArray(d.provinces) ? d.provinces : [],
    // coverageCount: undefined,
  }));
}

function renderCards(data) {
  const grid = document.getElementById("serviceCenterGrid");
  if (!grid) return;

  grid.innerHTML = data.map(center => {
    const provs = Array.isArray(center.provinces) ? center.provinces : [];
    const count = provs.length;

    const list = provs.length
      ? provs.map(p => `<li>${escapeHtml(p)}</li>`).join("")
      : `<li class="text-muted"></li>`;

    return `
      <div class="col-lg-4 col-md-6">
        <div class="sc-card">
          <div class="sc-icon"><i class="bi bi-geo-fill""></i></div>
          <div class="sc-title">${escapeHtml(center.title)}</div>

          <div class="sc-address">${escapeHtml(center.address)}</div>

          <div class="sc-cover">ครอบคลุม <span>${count}</span> จังหวัด</div>
          <ol class="sc-provinces">${list}</ol>
        </div>
      </div>
    `;
  }).join("");
}

/* ===== ตรวจข้อมูลกันผิดพลาด (ดูผลใน Console) ===== */
function validateCenters(data) {
  const warnings = [];
  const provinceToCenters = new Map();

  data.forEach(c => {
    const provs = Array.isArray(c.provinces) ? c.provinces : [];
    const seen = new Set();

    // เช็คจำนวน declared (ถ้ามี)
    if (typeof c.coverageCount === "number" && c.coverageCount !== provs.length) {
      warnings.push(`❗ ${c.key}: coverageCount=${c.coverageCount} แต่มีจังหวัดจริง=${provs.length}`);
    }

    provs.forEach(p => {
      const name = String(p || "").trim();
      if (!name) {
        warnings.push(`❗ ${c.key}: พบชื่อจังหวัดว่าง`);
        return;
      }
      if (seen.has(name)) warnings.push(`❗ ${c.key}: จังหวัด "${name}" ซ้ำในกลุ่มเดียวกัน`);
      seen.add(name);

      const arr = provinceToCenters.get(name) || [];
      arr.push(c.key);
      provinceToCenters.set(name, arr);
    });
  });

  const multi = [];
  provinceToCenters.forEach((keys, prov) => {
    if (keys.length > 1) multi.push({ prov, keys });
  });

  if (warnings.length) console.warn("Service Center Validate (Issues):\n" + warnings.join("\n"));
  if (multi.length) {
    console.warn("จังหวัดที่อยู่หลายศูนย์ (ตรวจว่าเจตนาหรือพิมพ์ซ้ำ):");
    multi.forEach(x => console.warn(`- ${x.prov}: ${x.keys.join(", ")}`));
  }
}

/* ===== RUN ===== */
document.addEventListener("DOMContentLoaded", () => {

  const data = serviceCenters; 
  renderCards(data);
  validateCenters(data);
});
