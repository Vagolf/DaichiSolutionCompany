    // 1) สร้างแผนที่โฟกัสที่ประเทศไทย
    const map = L.map('map').setView([13.736717, 100.523186], 6);

    // 2) พื้นหลังจาก OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // 3) ข้อมูลสาขา
    const branches = [
      {
        name: "สำนักงานใหญ่ กรุงเทพฯ",
        lat: 13.776890336752867,
        lng: 100.60940428074724,
        address: "เขตบางรัก กรุงเทพฯ",
        tel: "02-000-0000",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.7582677870274!2d100.60852180569194!3d13.776879220256866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f0300996c01%3A0x5d8f225c643b9ee5!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5hOC4lOC4iOC4tOC5guC4i-C4peC4ueC4iuC4seC5iOC4mSDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1765355963775!5m2!1sth!2sth"
      },
      {
        name: "สาขาเชียงใหม่",
        lat: 18.7883,
        lng: 98.9853,
        address: "อ.เมือง จ.เชียงใหม่",
        tel: "053-000-000",
        imageUrl: "https://picsum.photos/seed/branch2/400/250"
      },
      {
        name: "สาขาขอนแก่น",
        lat: 16.4419,
        lng: 102.8350,
        address: "อ.เมือง จ.ขอนแก่น",
        tel: "043-000-000",
        imageUrl: "https://picsum.photos/seed/branch3/400/250"
      },
      {
        name: "สาขาหาดใหญ่",
        lat: 7.0083,
        lng: 100.4747,
        address: "อ.หาดใหญ่ จ.สงขลา",
        tel: "074-000-000",
        imageUrl: "https://picsum.photos/seed/branch4/400/250"
      }
    ];

    // 4) วนสร้างหมุด + popup
    branches.forEach(b => {
      // ถ้าไม่มี embedUrl ให้ fallback เป็นลิ้ง search
      const googleMapsQuery = encodeURIComponent(`${b.name} ${b.address}`);
      let mapsPageUrl = `https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`;
      let embedHtml = "";

      if (b.embedUrl) {
        // ✅ ฝัง iframe จาก embedUrl
        embedHtml = `
        <div class="gmap-embed">
          <iframe
            src="${b.embedUrl}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen>
          </iframe>
        </div>
      `;

        // ✅ เอา embedUrl แปลงเป็นลิ้ง Google Maps ปกติ
        // https://www.google.com/maps/embed?pb=... -> https://www.google.com/maps?pb=...
        mapsPageUrl = b.embedUrl.replace("/maps/embed?", "/maps?");
      }

      const popupHtml = `
      <div class="branch-popup">
        <strong>${b.name}</strong>
        ${b.address}<br/>
        โทร: ${b.tel}<br/>
        ${embedHtml}
      </div>
    `;

      L.marker([b.lat, b.lng])
        .addTo(map)
        .bindPopup(popupHtml, { maxWidth: 280 });
    });