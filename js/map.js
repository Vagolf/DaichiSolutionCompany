
document.addEventListener('DOMContentLoaded', function () {
    const mapViewport = document.getElementById('branchMap');
    if (!mapViewport) return;

    const mapInner = mapViewport.querySelector('.map-inner');
    const zoomInBtn = document.querySelector('[data-map-zoom="in"]');
    const zoomOutBtn = document.querySelector('[data-map-zoom="out"]');
    const zoomLabel = document.getElementById('mapZoomLabel');
    const infoCard = document.getElementById('mapInfo');
    const points = mapViewport.querySelectorAll('.map-point');

    // Data 33 
    const locations = {
        g01_bangkok: {
            title: 'กรุงเทพฯ',
            subtitle: 'ครอบคลุม 7 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>กรุงเทพฯ</li>
        <li>ฉะเชิงเทรา</li>
        <li>นครนายก</li>
        <li>นนทบุรี</li>
        <li>ปทุมธานี</li>
        <li>สมุทรปราการ</li>
        <li>สมุทรสาคร</li>
    </ul>`
        },

        g02_nakhon_pathom: {
            title: 'นครปฐม',
            subtitle: 'ครอบคลุม 3 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>กาญจนบุรี</li>
        <li>นครปฐม</li>
        <li>ราชบุรี</li>
    </ul>`
        },

        g03_prachuap_khiri_khan: {
            title: 'ประจวบคีรีขันธ์',
            subtitle: 'ครอบคลุม 3 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>เพชรบุรี</li>
        <li>ประจวบคีรีขันธ์</li>
        <li>สมุทรสงคราม</li>
    </ul>`
        },

        g04_ayutthaya: {
            title: 'พระนครศรีอยุธยา',
            subtitle: 'ครอบคลุม 5 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ลพบุรี</li>
        <li>พระนครศรีอยุธยา</li>
        <li>สระบุรี</li>
        <li>สุพรรณบุรี</li>
        <li>อ่างทอง</li>
    </ul>`
        },

        g05_chon_buri: {
            title: 'ชลบุรี',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ชลบุรี</li>
        <li>ระยอง</li>
    </ul>`
        },

        g06_chanthaburi: {
            title: 'จันทบุรี',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>จันทบุรี</li>
        <li>ตราด</li>
    </ul>`
        },

        g07_prachin_buri: {
            title: 'ปราจีนบุรี',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ปราจีนบุรี</li>
        <li>สระแก้ว</li>
    </ul>`
        },

        g08_khon_kaen: {
            title: 'ขอนแก่น',
            subtitle: 'ครอบคลุม 4 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ขอนแก่น</li>
        <li>กาฬสินธุ์</li>
        <li>มหาสารคาม</li>
        <li>หนองบัวลำภู</li>
    </ul>`
        },

        g09_udon_thani: {
            title: 'อุดรธานี',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>บึงกาฬ</li>
        <li>อุดรธานี</li>
    </ul>`
        },

        g10_loei: {
            title: 'เลย',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>เลย</li></ul>`
        },

        g11_nong_khai: {
            title: 'หนองคาย',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>หนองคาย</li>
    </ul>`
        },

        g12_nakhon_phanom: {
            title: 'นครพนม',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>นครพนม</li>
    </ul>`
        },

        g13_nakhon_ratchasima: {
            title: 'นครราชสีมา',
            subtitle: 'ครอบคลุม 4 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>นครราชสีมา</li>
        <li>ชัยภูมิ</li>
        <li>สุรินทร์</li>
        <li>บุรีรัมย์</li>
    </ul>`
        },

        g14_ubon_ratchathani: {
            title: 'อุบลราชธานี',
            subtitle: 'ครอบคลุม 3 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>อุบลราชธานี</li>
        <li>อำนาจเจริญ</li>
        <li>ร้อยเอ็ด</li>
    </ul>`
        },

        g15_sakon_nakhon: {
            title: 'สกลนคร',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3"><li>สกลนคร</li></ul>`
        },

        g16_srisaket: {
            title: 'ศรีสะเกษ',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ศรีสะเกษ</li>
    </ul>`
        },

        g17_yasothon: {
            title: 'ยโสธร',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>มุกดาหาร</li>
        <li>ยโสธร</li>
    </ul>`
        },

        g18_chiang_mai: {
            title: 'เชียงใหม่',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>เชียงใหม่</li>
        <li>ลำพูน</li>
    </ul>`
        },

        g19_chiang_rai: {
            title: 'เชียงราย',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>เชียงราย</li>
    </ul>`
        },

        g20_lampang: {
            title: 'ลำปาง',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ลำปาง</li>
        <li>พะเยา</li>
    </ul>`
        },

        g21_nan: {
            title: 'น่าน',
            subtitle: 'ครอบคลุม 3 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>น่าน</li>
        <li>แพร่</li>
        <li>อุตรดิตถ์</li>
    </ul>`
        },

        g22_nakhon_sawan: {
            title: 'นครสวรรค์',
            subtitle: 'ครอบคลุม 4 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ชัยนาท</li>
        <li>นครสวรรค์</li>
        <li>สิงห์บุรี</li>
        <li>อุทัยธานี</li>
    </ul>`
        },

        g23_tak: {
            title: 'ตาก',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ตาก</li>
    </ul>`
        },

        g24_phetchabun: {
            title: 'เพชรบูรณ์',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>เพชรบูรณ์</li>
    </ul>`
        },

        g25_sukhothai: {
            title: 'สุโขทัย',
            subtitle: 'ครอบคลุม 4 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>กำแพงเพชร</li>
        <li>พิจิตร</li>
        <li>พิษณุโลก</li>
        <li>สุโขทัย</li>
    </ul>`
        },

        g26_songkhla: {
            title: 'สงขลา',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>สตูล</li>
        <li>สงขลา</li>
    </ul>`
        },

        g27_chumphon: {
            title: 'ชุมพร',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>ชุมพร</li>
        <li>ระนอง</li>
    </ul>`
        },

        g28_koh_samui: {
            title: 'เกาะสมุย',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>สุราษฎร์ธานี</li>
    </ul>`
        },

        g29_krabi: {
            title: 'กระบี่',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>กระบี่</li>
        <li>ตรัง</li>
    </ul>`
        },

        g30_nakhon_si_thammarat: {
            title: 'นครศรีธรรมราช',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>นครศรีธรรมราช</li>
        <li>สุราษฎร์ธานี</li>
    </ul>`
        },

        g31_phatthalung: {
            title: 'พัทลุง',
            subtitle: 'ครอบคลุม 1 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>พัทลุง</li>
    </ul>`
        },

        g32_phuket: {
            title: 'ภูเก็ต',
            subtitle: 'ครอบคลุม 2 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>พังงา</li>
        <li>ภูเก็ต</li>
    </ul>`
        },

        g33_narathiwat: {
            title: 'นราธิวาส',
            subtitle: 'ครอบคลุม 3 จังหวัด',
            desc: `
    <div class="text-muted mb-1"><i class="fa-solid fa-map-location-dot me-2"></i>ครอบคลุมจังหวัด:</div>
    <ul class="mb-0 ps-3">
        <li>นราธิวาส</li>
        <li>ปัตตานี</li>
        <li>ยะลา</li>
    </ul>`
        },
    };



    // ====== Utils: ดึงรายชื่อจังหวัดจาก ======
    function extractProvinces(descHtml) {
        const tmp = document.createElement('div');
        tmp.innerHTML = descHtml || '';
        return [...tmp.querySelectorAll('li')]
            .map(li => li.textContent.trim())
            .filter(Boolean);
    }

    function splitAliases(provinceText) {
        // "BANGKOK (กรุงเทพฯ)" => ["BANGKOK", "กรุงเทพฯ", "BANGKOK (กรุงเทพฯ)"]
        const m = provinceText.match(/^(.*?)\s*\((.*?)\)\s*$/);
        if (!m) return [provinceText];
        return [m[1].trim(), m[2].trim(), provinceText.trim()].filter(Boolean);
    }

    function norm(s) {
        return String(s || '')
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, '');
    }

    function tooltipText(provs) {
        const max = 8; 
        if (provs.length <= max) return provs.join(', ');
        return provs.slice(0, max).join(', ') + ` … (+${provs.length - max})`;
    }

    // index: จังหวัด -> (หลาย)กลุ่ม
    const provinceToGroups = new Map(); 
    const provinceDisplay = new Set();

    function addIndex(name, key) {
        const k = norm(name);
        if (!k) return;
        const set = provinceToGroups.get(k) || new Set();
        set.add(key);
        provinceToGroups.set(k, set);
    }

    // เติม provinces + tooltip ให้ทุกกลุ่ม
    Object.entries(locations).forEach(([key, data]) => {
        const provs = extractProvinces(data.desc);
        data.provinces = provs;

        provs.forEach(p => {
            provinceDisplay.add(p);
            splitAliases(p).forEach(alias => addIndex(alias, key));
        });
    });

    // ใส่ tooltip ให้ปุ่มทุกจุดจาก locations
    points.forEach(point => {
        const key = point.dataset.branch;
        const data = locations[key];
        if (!data) return;

        // 1. ดึงชื่อจังหวัดหลักออกจาก title (เช่น "กลุ่ม กรุงเทพฯ" => "กรุงเทพฯ")
        const mainTitle = (data.title || '').replace('กลุ่ม ', '').trim();

        // 2. กำหนด data-tip ด้วยชื่อจังหวัดหลักเท่านั้น
        point.setAttribute('data-tip', mainTitle);
    });

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 3;
    const ZOOM_STEP = 0.25;

    function clampOffsets() {
        const rect = mapViewport.getBoundingClientRect();
        const maxX = (rect.width * (scale - 1)) / 2;
        const maxY = (rect.height * (scale - 1)) / 2;

        if (scale <= 1) {
            translateX = 0;
            translateY = 0;
            return;
        }

        translateX = Math.max(-maxX, Math.min(maxX, translateX));
        translateY = Math.max(-maxY, Math.min(maxY, translateY));
    }

    function applyTransform() {
        clampOffsets();
        mapInner.style.transform =
            `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
        if (zoomLabel) {
            zoomLabel.textContent = Math.round(scale * 100) + '%';
        }
    }

    function changeZoom(delta) {
        const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale + delta));
        if (newScale === scale) return;
        scale = newScale;
        applyTransform();
    }

    zoomInBtn && zoomInBtn.addEventListener('click', () => changeZoom(ZOOM_STEP));
    zoomOutBtn && zoomOutBtn.addEventListener('click', () => changeZoom(-ZOOM_STEP));


    // Zoom ด้วย scroll wheel (ซูมเข้าตำแหน่งเมาส์)
    mapViewport.addEventListener('wheel', (e) => {
        e.preventDefault();

        const prevScale = scale;

        // scroll ขึ้น = zoom in, scroll ลง = zoom out
        const delta = (e.deltaY < 0) ? +ZOOM_STEP : -ZOOM_STEP;
        const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevScale + delta));
        if (newScale === prevScale) return;

        const rect = mapViewport.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // center ของ viewport (เพราะคุณใช้ clamp แบบ center และ transform-origin center)
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const ratio = newScale / prevScale; 

        // ปรับ translate ให้จุดใต้เมาส์อยู่ตำแหน่งเดิมหลังซูม
        translateX = (mx - cx) * (1 - ratio) + translateX * ratio;
        translateY = (my - cy) * (1 - ratio) + translateY * ratio;

        scale = newScale;
        applyTransform();
    }, { passive: false });


    // Drag / pan
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let startTranslateX = 0;
    let startTranslateY = 0;

    function startPan(clientX, clientY) {
        if (scale === 1) return;
        isPanning = true;
        startX = clientX;
        startY = clientY;
        startTranslateX = translateX;
        startTranslateY = translateY;
        mapViewport.classList.add('is-panning');
    }

    function movePan(clientX, clientY) {
        if (!isPanning) return;
        const dx = clientX - startX;
        const dy = clientY - startY;
        translateX = startTranslateX + dx;
        translateY = startTranslateY + dy;
        applyTransform();
    }

    function endPan() {
        if (!isPanning) return;
        isPanning = false;
        mapViewport.classList.remove('is-panning');
    }

    // กันการลากแผนที่ไปแย่งคลิกจุด
    function isPointTarget(e) {
        return !!(e.target && e.target.closest && e.target.closest('.map-point'));
    }

    // mouse
    mapViewport.addEventListener('mousedown', (e) => {
        if (isPointTarget(e)) return;   
        if (scale === 1) return;          
        e.preventDefault();
        startPan(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        movePan(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', endPan);
    mapViewport.addEventListener('mouseleave', endPan);

    // touch
    mapViewport.addEventListener('touchstart', (e) => {
        if (isPointTarget(e)) return;     
        if (scale === 1) return;
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        startPan(t.clientX, t.clientY);
    }, { passive: true });

    mapViewport.addEventListener('touchmove', (e) => {
        if (!isPanning || e.touches.length !== 1) return;
        const t = e.touches[0];
        movePan(t.clientX, t.clientY);
    }, { passive: true });

    mapViewport.addEventListener('touchend', endPan);
    mapViewport.addEventListener('touchcancel', endPan);

    function selectPoint(pointEl, { scroll = true } = {}) {
        const key = pointEl.dataset.branch;
        const data = locations[key];
        if (!data || !infoCard) return;

        points.forEach(p => p.classList.remove('active'));
        pointEl.classList.add('active');

        // รองรับ desc เป็น HTML
        infoCard.innerHTML = `
    <strong>${data.title}</strong>
    <p class="mb-2 text-muted">${data.subtitle || ''}</p>
    <div>${data.desc || ''}</div>
  `;

        if (scroll) infoCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // click บนจุด
    points.forEach(point => {
        point.addEventListener('click', (e) => {
            e.stopPropagation();
            selectPoint(point, { scroll: true });
        });
    });

    // ให้ search เรียกเหมือน "คลิกจุดจริง"
    function selectByKey(key) {
        const el = mapViewport.querySelector(`.map-point[data-branch="${key}"]`);
        if (!el) return;
        el.click();
    }

    // ค้นหาจังหวัด
    const searchProvince = (function () {
        let hint = null;

        document.getElementById('provinceSearchBtn').addEventListener('click', () => {
            const input = document.getElementById('provinceSearch');
            const q = input.value.trim();
            if (!q) return;
            doSearch(q);
        });

        const inputEl = document.getElementById('provinceSearch');

        inputEl && inputEl.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            const q = inputEl.value.trim();
            if (!q) return;
            doSearch(q);
        });


        // สร้าง element ช่วยแสดงผลลัพธ์การค้นหา
        function initHint() {
            hint = document.getElementById('provinceSearchHint');
            if (!hint) return;

            // ให้เป็นกล่องผลลัพธ์ใต้ปุ่ม (อยู่ใน flow ปกติ)
            hint.className = 'bg-white rounded py-2 px-3 mt-2';
            hint.style.maxHeight = '300px';
            hint.style.overflowY = 'auto';
            hint.style.pointerEvents = 'auto';
        }


        function renderMultiGroupChoices(keys) {
            if (!hint) return;
            hint.innerHTML = `
      <div class="small text-muted mb-2">พบหลายจุดให้บริการสำหรับจังหวัดนี้ เลือกกลุ่มที่ต้องการ:</div>
      <div>
        ${keys.map(k => `
          <button type="button" class="btn btn-sm btn-outline-secondary me-2 mb-2" data-jump="${k}">
            ${locations[k]?.title || k}
          </button>
        `).join('')}
      </div>
    `;

            // ผูก event ให้ปุ่มกดได้แน่นอน
            hint.querySelectorAll('[data-jump]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const key = btn.getAttribute('data-jump');
                    selectByKey(key);
                    hint.innerHTML = '';
                });
            });
        }

        function doSearch(raw) {
            const q = (raw || '').trim();
            if (!q) return;

            const exact = provinceToGroups.get(norm(q));
            if (exact && exact.size) {
                const keys = [...exact];
                if (keys.length === 1) {
                    selectByKey(keys[0]);
                    return;
                }
                renderMultiGroupChoices(keys);
                return;
            }

            // fallback: partial match
            const nq = norm(q);
            if (!nq) return;

            const matches = [];
            provinceDisplay.forEach(p => {
                if (norm(p).includes(nq)) matches.push(p);
            });

            if (!matches.length) {
                hint.innerHTML = 'ไม่พบจังหวัดนี้ในรายการ (ลองเลือกจาก dropdown)';
                return;
            }

            const top = matches.slice(0, 10).map(p => `<button type="button" class="btn btn-sm btn-outline-secondary me-2 mb-2" data-q="${p}">${p}</button>`).join('');
            hint.innerHTML = `พบที่ใกล้เคียง: <div class="mt-2">${top}</div>`;

            // click suggestion => search exact
            hint.querySelectorAll('[data-q]').forEach(b => {
                b.addEventListener('click', () => doSearch(b.getAttribute('data-q')));
            });
        }

        initHint();

        return doSearch;
    })();
});

function resetView() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();
}

window.addEventListener("resize", resetView);

