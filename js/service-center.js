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
    address: "135/2-3 ซ.ลาดพร้าว 94 แขวงพลับพลา เขตวังทองหลาง กรุงเทพฯ 10310",
    provinces: [
      "กรุงเทพมหานคร", "ฉะเชิงเทรา", "นครนายก", "นนทบุรี", "ปทุมธานี",
      "สมุทรปราการ","สมุทรสาคร"
    ]
  },
  {
    key: "nakhon_pathom",
    title: "ศูนย์บริการจังหวัดนครปฐม",
    address: "24/1 ม.2 ต.วังตะกู อ.เมือง จ.นครปฐม 73000",
    provinces: [
        "กาญจนบุรี", "นครปฐม", "ราชบุรี"
    ]
  },
  // {
  //   key: "prachuap_khiri_khan",
  //   title: "ศูนย์บริการจังหวัดประจวบคีรีขันธ์",
  //   address: "...................ที่อยู่.............",
  //   provinces: [
  //       "เพชรบุรี", "ประจวบคีรีขันธ์", "สมุทรสงคราม"
  //   ]
  // },
  {
    key: "ayutthaya",
    title: "ศูนย์บริการจังหวัดพระนครศรีอยุธยา",
    address: "3/2 ม.7 ต.หลักชัย อ.ลาดบัวหลวง จ.อยุธยา 13230",
    provinces: [
        "ลพบุรี", "พระนครศรีอยุธยา", "สระบุรี", "สุพรรณบุรี", "อ่างทอง"
    ]
  },
  {
    key: "chon_buri",
    title: "ศูนย์บริการจังหวัดชลบุรี",
    address: "24/148 หมู่ 9 ซอยนครชัยแอร์ เลียบทางรถไฟต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150",
    provinces: [
        "ชลบุรี", "ระยอง"
    ]
  },
  // {
  //   key: "chanthaburi",
  //   title: "ศูนย์บริการจังหวัดจันทบุรี",
  //   address: "...................ที่อยู่.............",
  //   provinces: [
  //       "จันทบุรี", "ตราด"
  //   ]
  // },
  {
    key: "prachin_buri",
    title: "ศูนย์บริการจังหวัดปราจีนบุรี",
    address: "365/2  ถ.ปราจีนธานี  ต.หน้าเมือง อ.เมืองปราจีนบุรี  จ.ปราจีนบุรี 25000",
    provinces: [
        "ปราจีนบุรี", "สระแก้ว"
    ]
  },
  {
    key: "khon_kaen",
    title: "ศูนย์บริการจังหวัดขอนแก่น",
    address: "51 หมู่ 26 ซอยข้างวัดต.ศิลา อ.เมือง จ.ขอนแก่น 40000",
    provinces: [
        "ขอนแก่น", "กาฬสินธุ์", "มหาสารคาม", "หนองบัวลำภู"
    ]
  },
  {
    key: "udon_thani",
    title: "ศูนย์บริการจังหวัดอุดรธานี",
    address: "128/1 ซ.ประชาราษฎร์ ถ.นิตโย ต.หมากแข้ง  อ.เมือง จ.อุดรธานี 41000 ",
    provinces: [
        "บึงกาฬ", "อุดรธานี"
    ]
  },
  {
    key: "loei",
    title: "ศูนย์บริการจังหวัดเลย",
    address: "97 หมู่ 2 ต.นาโป่ง อ.เมืองเลย จ. เลย 42000",
    provinces: [
        "เลย"
    ]
  },
  {
    key: "nong_khai",
    title: "ศูนย์บริการจังหวัดหนองคาย",
    address: "209  หมู่ 4  ต.กุดบง อ.โพนพิสัย จ.หนองคาย  43120",
    provinces: [
        "หนองคาย"
    ]
  },
  {
    key: "nakhon_phanom",
    title: "ศูนย์บริการจังหวัดนครพนม",
    address: "10 หมู่ 6 บ.หนองญาติ ต.หนองญาติ ถ.นิตโย ซอย.มิตรประชา อ.เมือง จ.นครพนม 48000",
    provinces: [
        "นครพนม"
    ]
  },
  {
    key: "nakhon_ratchasima",
    title: "ศูนย์บริการจังหวัดนครราชสีมา",
    address: "555/84 ม. 15 ต.โคกกรวด อ.เมือง จ.นครราชสีมา 30280 ",
    provinces: [
        "นครราชสีมา", "ชัยภูมิ", "สุรินทร์", "บุรีรัมย์"
    ]
  },
  {
    key: "ubon_ratchathani",
    title: "ศูนย์บริการจังหวัดอุบลราชธานี",
    address: "130 หมู่ 35 บ้านทุ่งไทรงาม​ ต.เมืองเดช อ.เดชอุดม​ จ.อุบลราชธานี​ 34160",
    provinces: [
        "อุบลราชธานี", "อำนาจเจริญ", "ร้อยเอ็ด"
    ]
  },
  {
    key: "sakon_nakhon",
    title: "ศูนย์บริการจังหวัดสกลนคร",
    address: "98/4 ถ.รัฐบำรุง ต.ธาตุเชิงชุม อ.เมือง จ.สกลนคร 47000",
    provinces: [
        "สกลนคร"
    ]
  },
  // {
  //   key: "srisaket",
  //   title: "ศูนย์บริการจังหวัดศรีสะเกษ",
  //   address: "...................ที่อยู่.............",
  //   provinces: [
  //       "ศรีสะเกษ"
  //   ]
  // },
  // {
  //   key: "yasothon",
  //   title: "ศูนย์บริการจังหวัดยโสธร",
  //   address: "...................ที่อยู่.............",
  //   provinces: [
  //       "มุกดาหาร", "ยโสธร"
  //   ]
  // },
  {
    key: "chiang_mai",
    title: "ศูนย์บริการจังหวัดเชียงใหม่",
    address: "103 ม.7 ซ.จามจุรีรวมใจ 38 ต.ยางเนิ้ง อ.สารภี จ.เชียงใหม่ 50140 ",
    provinces: [
        "เชียงใหม่", "ลำพูน"
    ]
  },
  {
    key: "chiang_rai",
    title: "ศูนย์บริการจังหวัดเชียงราย",
    address: "18 ม.9 ต.ป่าอ้อดอนชัย อ.เมือง จ.เชียงราย 57000",
    provinces: [
        "เชียงราย"
    ]
  },
  {
    key: "lampang",
    title: "ศูนย์บริการจังหวัดลำปาง",
    address: "86 ม.5 ต.บ่อทอง อ.ทองแสนขัน จ.อุตรดิตถ์ 53230",
    provinces: [
        "ลำปาง", "พะเยา"
    ]
  },
  {
    key: "nan",
    title: "ศูนย์บริการจังหวัดน่าน",
    address: "143 หมู่ 5 ตำบล ม่วงตึ๊ด อำเภอภูเพียง จังหวัดน่าน 55000",
    provinces: [
        "น่าน", "แพร่", "อุตรดิตถ์"
    ]
  },
  {
    key: "nakhon_sawan",
    title: "ศูนย์บริการจังหวัดนครสวรรค์",
    address: "4/233 หมู่​ 15 ต.วัดไทรย์​ อ.เมือง​ จ.นครสวรรค์​ 60000",
    provinces: [
        "ชัยนาท", "นครสวรรค์", "สิงห์บุรี", "อุทัยธานี"
    ]
  },
  {
    key: "tak",
    title: "ศูนย์บริการจังหวัดตาก",
    address: "6/33-34.  ถ.พหลโยธิน ต.ระแหง อ.เมือง จ.ตาก 63000",
    provinces: [
        "ตาก"
    ]
  },
  {
    key: "phetchabun",
    title: "ศูนย์บริการจังหวัดเพชรบูรณ์",
    address: "65 ม.10 ต.นางั่ว อ.เมือง จ.เพชรบูรณ์ 67000",
    provinces: [
        "เพชรบูรณ์"
    ]
  },
  {
    key: "sukhothai",
    title: "ศูนย์บริการจังหวัดสุโขทัย",
    address: "94/2 ม.3 ต.สามเรือน  อ.ศรีสำโรง จ.สุโขทัย 64120",
    provinces: [
        "กำแพงเพชร", "พิจิตร", "พิษณุโลก", "สุโขทัย"
    ]
  },
  {
    key: "songkhla",
    title: "ศูนย์บริการจังหวัดสงขลา",
    address: "19 ม.5 ต.ทุ่งตำเสา อ.หาดใหญ่ จ.สงขลา 90110",
    provinces: [
        "สตูล", "สงขลา"
    ]
  },
  {
    key: "chumphon",
    title: "ศูนย์บริการจังหวัดชุมพร",
    address: "99/13 ถ.ชุมพพร-ระนอง ซ.สุขาภิบาล 7 ม.5 ต.วังไผ่ อ.เมือง จ.ชุมพร 86000",
    provinces: [
        "ชุมพร", "ระนอง"
    ]
  },
  {
    key: "koh_samui",
    title: "ศูนย์บริการจังหวัดสุราษฎร์ธานี",
    address: "59/5 หมู่ 1 ต.บางกุ้ง อ.เมือง จ.สุราษฎร์ธานี 84000",
    provinces: [
        "สุราษฎร์ธานี"
    ]
  },
  {
    key: "krabi",
    title: "ศูนย์บริการจังหวัดกระบี่",
    address: "487/1 ถนนอุตรกิจ ตำบลกระบี่ใหญ่ อำเภอเมือง จังหวัดกระบี่ 81000 ",
    provinces: [
        "กระบี่", "ตรัง"
    ]
  },
  {
    key: "nakhon_si_thammarat",
    title: "ศูนย์บริการจังหวัดนครศรีธรรมราช",
    address: "100/4 หมู่ที่ 6 ซ.พ่อสิงห์ ตำบลโพธิ์เสด็จ อ.เมืองนครศรีธรรมราช จ.นครศรีธรรมราช 80000",
    provinces: [
        "นครศรีธรรมราช", "สุราษฎร์ธานี"
    ]
  },
  {
    key: "phatthalung",
    title: "ศูนย์บริการจังหวัดพัทลุง",
    address: "362 ม.1 ต.ลานข่อย อ.ป่าพะยอม จ.พัทลุง 93210",
    provinces: [
        "พัทลุง"
    ]
  },
  {
    key: "phuket",
    title: "ศูนย์บริการจังหวัดภูเก็ต",
    address: "79/95 หมู่ 4 ซ.นิมิตร​ ต.วิชิต​ อ.เมือง​ จ.ภูเก็ต​ 83000",
    provinces: [
        "พังงา", "ภูเก็ต"
    ]
  },
  {
    key: "narathiwat",
    title: "ศูนย์บริการจังหวัดนราธิวาส",
    address: "39 ถ.ลูกเสืออนุสรณ์ 3 ต.สไหงโกลก อ.สุไหงโก-ลก จ.นราธิวาส 96120",
    provinces: [
        "นราธิวาส", "ปัตตานี", "ยะลา"
    ]
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
          <div class="sc-icon"><i class="bi bi-geo-fill"></i></div>
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
