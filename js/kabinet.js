/*
  =======================================================================
  KABINET.JS — kabinet.html sahifasi
  =======================================================================
  Bu sahifa js/do-kon.js dagi ESKI kichik "kabinet" modalidan MUSTAQIL —
  u yerga tegilmagan (boshqa sahifalar hamon eski modalni ishlatadi).

  Kirish/hisob — HAQIQIY server API orqali (js/api.js, cookie "sessiya"):
    GET  /api/hisob          — joriy mijoz {id, telefon, rol}
    GET  /api/buyurtmalarim  — mijozning o'z buyurtmalari
    POST /api/chiqish        — chiqish

  ⚠️ js/api.js da /api/buyurtmalarim uchun tayyor funksiya YO'Q (bu fayl
  api.js ga tegishi TAQIQLANGAN) — shuning uchun shu yerda kichik, mustaqil
  fetch yordamchisi (kabApi) yozilgan, xuddi api.js dagi apiSoro naqshi.

  Profil rasmi / ism / telefon / parol — SERVERDA hali tahrirlash
  endpointi YO'Q (Menejer/Arxitektorga qoldirilgan ish). Shuning uchun bu
  uchtasi hozircha FAQAT shu qurilmadagi localStorage'da saqlanadi — har
  forma yonida shu haqda ochiq yozilgan izoh bor, "saqlandi" degan
  yolg'on da'vo yo'q.
  =======================================================================
*/

(function () {
  "use strict";

  /* =================================================================
     0. KICHIK YORDAMCHILAR
  ================================================================== */

  function el(id) { return document.getElementById(id); }

  function xavfsiz(q) {
    if (typeof htmlXavfsiz === "function") return htmlXavfsiz(q);
    if (q === null || q === undefined) return "";
    return String(q).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function narx(n) {
    if (typeof narxniFormatla === "function") return narxniFormatla(n);
    return String(n) + " so'm";
  }

  function xabar(matn, tur) {
    if (window.DOKON && DOKON.xabar) { DOKON.xabar(matn, tur); return; }
    // DOKON hali yuklanmagan bo'lsa ham sahifa buzilmasin
    window.alert(matn);
  }

  // Server bilan gaplashish — api.js dagi apiSoro'ga o'xshash, lekin
  // mustaqil (api.js faylining o'ziga tegilmagan).
  function kabApi(yol, usul) {
    return fetch(yol, {
      method: usul || "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) {
        return Object.assign({ ok: r.ok, status: r.status }, d);
      });
    }).catch(function () {
      return { ok: false, status: 0, xato: "Serverga ulanib bo'lmadi" };
    });
  }

  // localStorage — har doim try/catch ichida (loyiha qoidasi: shaxsiy
  // rejim yoki xotira to'lganda sahifa buzilmasin).
  function lsOqi(kalit, zaxira) {
    try {
      var xom = window.localStorage.getItem(kalit);
      if (!xom) return zaxira;
      var q = JSON.parse(xom);
      return (q === null || q === undefined) ? zaxira : q;
    } catch (e) { return zaxira; }
  }
  function lsYoz(kalit, qiymat) {
    try { window.localStorage.setItem(kalit, JSON.stringify(qiymat)); return true; }
    catch (e) { return false; }
  }

  function sanaFormat(ms) {
    if (!ms && ms !== 0) return "—";
    try {
      var d = new Date(ms);
      var kunlar = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];
      var oylar = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul",
        "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
      return d.getDate() + "-" + oylar[d.getMonth()] + ", " + d.getFullYear() + " (" + kunlar[d.getDay()] + ")";
    } catch (e) { return "—"; }
  }

  /* =================================================================
     1. MAHALLIY PROFIL (rasm/ism/telefon) — mijozId bo'yicha
  ================================================================== */
  var PROFIL_KALIT = "arzonchi_kabinet_profil_v1";
  var BIRINCHI_KIRISH_KALIT = "arzonchi_kabinet_birinchi_korish_v1";

  function profilOl(mijozId) {
    var hammasi = lsOqi(PROFIL_KALIT, {});
    return (hammasi && typeof hammasi === "object" && hammasi[mijozId]) ? hammasi[mijozId] : {};
  }
  function profilYoz(mijozId, patch) {
    var hammasi = lsOqi(PROFIL_KALIT, {});
    if (!hammasi || typeof hammasi !== "object") hammasi = {};
    hammasi[mijozId] = Object.assign({}, hammasi[mijozId] || {}, patch);
    return lsYoz(PROFIL_KALIT, hammasi);
  }

  // Birinchi marta shu qurilmada kabinetga kirgan sana — server
  // "ro'yxatdan o'tgan sana"ni hali bermaydi, shu taxminiy o'rniga.
  function birinchiKorishSanasi(mijozId) {
    var hammasi = lsOqi(BIRINCHI_KIRISH_KALIT, {});
    if (!hammasi || typeof hammasi !== "object") hammasi = {};
    if (!hammasi[mijozId]) {
      hammasi[mijozId] = Date.now();
      lsYoz(BIRINCHI_KIRISH_KALIT, hammasi);
    }
    return hammasi[mijozId];
  }

  /* =================================================================
     2. RASMNI KICHRAYTIRISH (canvas) — 2MB dan oshmasin
  ================================================================== */
  var RASM_FAYL_MAX = 8 * 1024 * 1024;      // 8MB dan katta fayl umuman o'qilmaydi
  var RASM_DATAURL_MAX = 2 * 1024 * 1024;   // siqilgandan keyingi maqsad — 2MB dan kichik
  var RASM_TOMON_MAX = 320;                 // eng katta tomon 320px (avatar uchun yetarli)

  function rasmniKichraytir(fayl, tugagach) {
    if (!fayl) return tugagach(null, "Fayl tanlanmadi");
    if (!/^image\//.test(fayl.type)) return tugagach(null, "Faqat rasm fayli tanlang (jpg, png, webp...)");
    if (fayl.size > RASM_FAYL_MAX) return tugagach(null, "Fayl juda katta (8MB dan oshmasin)");

    var reader = new FileReader();
    reader.onerror = function () { tugagach(null, "Faylni o'qib bo'lmadi"); };
    reader.onload = function (h) {
      var img = new Image();
      img.onerror = function () { tugagach(null, "Rasmni ochib bo'lmadi — fayl buzilgan bo'lishi mumkin"); };
      img.onload = function () {
        try {
          var kenglik = img.width, balandlik = img.height;
          var nisbat = Math.min(1, RASM_TOMON_MAX / Math.max(kenglik, balandlik));
          var yangiK = Math.max(1, Math.round(kenglik * nisbat));
          var yangiB = Math.max(1, Math.round(balandlik * nisbat));
          var kanvas = document.createElement("canvas");
          kanvas.width = yangiK; kanvas.height = yangiB;
          var ctx = kanvas.getContext("2d");
          if (!ctx) return tugagach(null, "Brauzeringiz rasm siqishni qo'llamaydi");
          ctx.drawImage(img, 0, 0, yangiK, yangiB);
          var dataUrl = kanvas.toDataURL("image/jpeg", 0.82);
          if (dataUrl.length > RASM_DATAURL_MAX) dataUrl = kanvas.toDataURL("image/jpeg", 0.5);
          if (dataUrl.length > RASM_DATAURL_MAX) return tugagach(null, "Rasmni yetarlicha siqib bo'lmadi, boshqa rasm tanlang");
          tugagach(dataUrl, null);
        } catch (e) {
          tugagach(null, "Rasmni qayta ishlashda xatolik");
        }
      };
      img.src = h.target.result;
    };
    reader.readAsDataURL(fayl);
  }

  /* =================================================================
     3. BUYURTMA HOLATI — matn/rang, bosqichlar, taxminiy sana
  ================================================================== */
  var HOLAT_MATN = {
    qabul: "Qabul qilindi", tayyor: "Tayyor", yolda: "Yo'lda",
    punktda: "Punktda", topshirildi: "Topshirildi", bekor: "Bekor qilindi"
  };
  var BOSQICHLAR = ["qabul", "tayyor", "yolda", "punktda", "topshirildi"];

  function holatMatni(holat) { return HOLAT_MATN[holat] || holat || "Noma'lum"; }

  // Taxminiy yetib borish/tayyorlik sanasi — server bu maydonni hali
  // bermaydi (buyurtma-handlers.mjs javobida yo'q), shu sabab bu YERDA
  // holat + yaratilgan vaqtga asoslangan ODDIY taxmin hisoblanadi va
  // UI'da har doim "Taxminan" so'zi bilan ko'rsatiladi — hech qachon
  // aniq/tasdiqlangan sana sifatida emas.
  function taxminiyYetibBorish(buyurtma) {
    if (buyurtma.holat === "bekor") {
      return { matn: "Bu buyurtma bekor qilingan", sinf: "kab-yb--bekor" };
    }
    if (buyurtma.holat === "topshirildi") {
      return { matn: "Siz bu buyurtmani allaqachon olib ketdingiz", sinf: "kab-yb--tayyor" };
    }
    if (buyurtma.holat === "punktda") {
      return { matn: "Punktda tayyor turibdi — istalgan payt olib ketishingiz mumkin", sinf: "kab-yb--tayyor" };
    }
    var kunlar = { qabul: 3, tayyor: 2, yolda: 1 }[buyurtma.holat];
    if (kunlar === undefined || !buyurtma.yaratilgan) {
      return { matn: "Holat kuzatilmoqda", sinf: "" };
    }
    var maqsad = buyurtma.yaratilgan + kunlar * 24 * 60 * 60 * 1000;
    // Muddat allaqachon o'tib ketgan bo'lsa, O'TMISHDAGI sanani "yetib
    // keladi" deb ko'rsatish xato bo'lardi. Bunday holatda kutilgan sana
    // emas, haqiqiy holat aytiladi (16.09 sabog'i).
    if (maqsad < Date.now()) {
      return { matn: "Kutilgan muddat o'tdi — operatorimiz siz bilan bog'lanadi", sinf: "kab-yb--kechikkan" };
    }
    return { matn: "Taxminan " + sanaFormat(maqsad) + " gacha yetib keladi", sinf: "" };
  }

  function bosqichlarHTML(holat) {
    if (holat === "bekor") {
      return '<div class="kab-bekor-belgi">Bu buyurtma bekor qilingan</div>';
    }
    var joriyIndeks = BOSQICHLAR.indexOf(holat);
    var html = '<div class="kab-bosqichlar">';
    for (var i = 0; i < BOSQICHLAR.length; i++) {
      var kod = BOSQICHLAR[i];
      var sinf = "kab-bosqich";
      if (joriyIndeks >= 0 && i < joriyIndeks) sinf += " kab-bosqich--otgan";
      if (i === joriyIndeks) sinf += " kab-bosqich--joriy";
      html += '<div class="' + sinf + '"><span class="kab-bosqich-nuqta"></span><span class="kab-bosqich-nom">' +
        xavfsiz(holatMatni(kod)) + "</span></div>";
    }
    html += "</div>";
    return html;
  }

  /* =================================================================
     4. FILIAL (PUNKT) MA'LUMOTI — js/filiallar.js dan (o'qiladi, tegilmaydi)
  ================================================================== */
  function punktTop(nomi) {
    if (typeof mijozgaOchiqFiliallarRoyxati !== "function") return null;
    var royxat = mijozgaOchiqFiliallarRoyxati();
    for (var i = 0; i < royxat.length; i++) {
      if (royxat[i].nomi === nomi) return royxat[i];
    }
    return null;
  }

  // js/malumotlar-filial.js da hali to'ldirilmagan maydonlar ichki
  // "TOLDIRING: ..." belgisini saqlaydi (kontent guruhi uchun eslatma) —
  // mijozga bunday xom matn ko'rsatilmasin, shu maydon shunchaki
  // yashiriladi (xato emas, faqat hali to'ldirilmagan).
  function toldirilganmi(qiymat) {
    return !!qiymat && !/^toldiring/i.test(String(qiymat).trim());
  }

  function punktHTML(punktNomi) {
    var f = punktTop(punktNomi);
    if (!f) {
      return '<div class="kab-punkt"><h4>' + xavfsiz(punktNomi || "Filial") + "</h4>" +
        '<p class="kab-mayda-izoh kab-mayda-izoh--oq">Aniq manzil topilmadi — filialga qo\'ng\'iroq qiling.</p></div>';
    }
    return '<div class="kab-punkt">' +
      "<h4>" + xavfsiz(f.nomi) + "</h4>" +
      (toldirilganmi(f.manzil) ? '<p class="kab-punkt-qator">' + xavfsiz(f.manzil) + "</p>" : "") +
      (toldirilganmi(f.telefon) ? '<p class="kab-punkt-qator"><a href="tel:' + xavfsiz(f.telefon) + '">' + xavfsiz(f.telefon) + "</a></p>" : "") +
      (toldirilganmi(f.ishVaqti) ? '<p class="kab-punkt-qator">' + xavfsiz(f.ishVaqti) + "</p>" : "") +
      "</div>";
  }

  /* =================================================================
     5. FAOL BUYURTMA BLOKI
  ================================================================== */
  function faolBuyurtmaniTop(buyurtmalar) {
    for (var i = 0; i < buyurtmalar.length; i++) {
      var h = buyurtmalar[i].holat;
      if (h !== "topshirildi" && h !== "bekor") return buyurtmalar[i];
    }
    return null;
  }

  function faolBlokChiz(buyurtmalar) {
    var joy = el("kab-faol-blok");
    if (!joy) return;
    var faol = faolBuyurtmaniTop(buyurtmalar);

    if (!faol) {
      var oxirgi = buyurtmalar.length ? buyurtmalar[0] : null;
      joy.innerHTML =
        '<div class="kab-faol kab-faol--bosh">' +
        "<h2>Hozircha faol buyurtmangiz yo'q</h2>" +
        (oxirgi
          ? '<p>Oxirgi buyurtmangiz — <b>' + xavfsiz(oxirgi.raqam) + "</b> (" + xavfsiz(holatMatni(oxirgi.holat)) + ")</p>"
          : "<p>Hali birorta buyurtma bermagansiz.</p>") +
        '<a href="katalog.html" class="tugma tugma-asosiy">Katalogga o\'tish</a>' +
        "</div>";
      return;
    }

    var yb = taxminiyYetibBorish(faol);
    joy.innerHTML =
      '<div class="kab-faol">' +
      '<div class="kab-faol-bosh">' +
      '<span class="kab-faol-yorliq">Faol buyurtma</span>' +
      "<h2>" + xavfsiz(faol.raqam) + "</h2>" +
      "</div>" +
      bosqichlarHTML(faol.holat) +
      '<div class="kab-faol-pastki">' +
      '<div class="kab-faol-vaqt">' +
      '<span class="kab-mayda-izoh kab-mayda-izoh--oq">Qachon</span>' +
      '<p class="kab-yb ' + yb.sinf + '">' + xavfsiz(yb.matn) + "</p>" +
      "</div>" +
      punktHTML(faol.punkt) +
      '<div class="kab-olish-kodi">' +
      '<span class="kab-mayda-izoh kab-mayda-izoh--oq">Olish kodi</span>' +
      '<div class="kab-olish-kodi-raqam">' + xavfsiz(faol.olishKodi || "----") + "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  /* =================================================================
     6. BUYURTMALAR TARIXI (hammasi)
  ================================================================== */
  function buyurtmaKartaHTML(b) {
    var mahsulotSoni = Array.isArray(b.mahsulotlar) ? b.mahsulotlar.length : 0;
    var mahsulotMatnlar = (b.mahsulotlar || []).slice(0, 3).map(function (m) {
      return xavfsiz(m.nomi) + " × " + (m.miqdor || 1);
    }).join(", ");
    var qolgan = mahsulotSoni - 3;

    return '<div class="kab-buyurtma-karta">' +
      '<div class="kab-buyurtma-bosh">' +
      "<b>" + xavfsiz(b.raqam) + "</b>" +
      '<span class="kab-holat kab-holat--' + xavfsiz(b.holat) + '">' + xavfsiz(holatMatni(b.holat)) + "</span>" +
      "</div>" +
      '<div class="kab-buyurtma-meta">' + xavfsiz(sanaFormat(b.yaratilgan)) + " · " + xavfsiz(narx(b.summa)) + "</div>" +
      (mahsulotMatnlar ? '<div class="kab-buyurtma-mahsulot">' + mahsulotMatnlar + (qolgan > 0 ? " va yana " + qolgan + " ta" : "") + "</div>" : "") +
      (b.punkt ? '<div class="kab-buyurtma-punkt">' + xavfsiz(b.punkt) + "</div>" : "") +
      "</div>";
  }

  function buyurtmalarRoyxatiniChiz(buyurtmalar) {
    var joy = el("kab-buyurtmalar-royxat");
    if (!joy) return;
    if (!buyurtmalar.length) {
      joy.innerHTML = (typeof boshHolatHTML === "function")
        ? boshHolatHTML({
            sarlavha: "Hali buyurtmangiz yo'q",
            izoh: "Katalogdan mahsulot tanlab, birinchi buyurtmangizni bering.",
            tugma: '<a href="katalog.html" class="tugma tugma-asosiy">Katalogga o\'tish</a>'
          })
        : "<p>Hali buyurtmangiz yo'q.</p>";
      return;
    }
    joy.innerHTML = buyurtmalar.map(buyurtmaKartaHTML).join("");
  }

  /* =================================================================
     7. PROFIL KARTASI (avatar, ism, telefon, statistika)
  ================================================================== */
  function statistikaHisobla(buyurtmalar) {
    var soni = buyurtmalar.length;
    var summa = 0;
    for (var i = 0; i < buyurtmalar.length; i++) {
      if (buyurtmalar[i].holat !== "bekor") summa += (buyurtmalar[i].summa || 0);
    }
    return { soni: soni, summa: summa };
  }

  function avatarYangila(profil, ismKorinishi) {
    var idish = el("kab-avatar");
    if (!idish) return;
    if (profil.avatar) {
      idish.innerHTML = "";
      idish.style.backgroundImage = "url('" + profil.avatar + "')";
      idish.classList.add("kab-avatar--rasmli");
      idish.textContent = "";
    } else {
      idish.style.backgroundImage = "";
      idish.classList.remove("kab-avatar--rasmli");
      idish.textContent = (ismKorinishi || "?").charAt(0).toUpperCase();
    }
  }

  // serverProfil — GET /api/hisob dagi `profil` (16.09 da qo'shildi):
  // {ism, manzil, royxatdanOtgan, xaridSummasi, buyurtmalarSoni}.
  // Ustuvorlik: foydalanuvchining O'Z tahriri (localStorage) > server > bo'sh.
  function profilKartasiniChiz(mijoz, buyurtmalar, serverProfil) {
    var profil = profilOl(mijoz.id);
    var telefonKorinishi = (window.DOKON && DOKON.telefonKorinishi) ? DOKON.telefonKorinishi(profil.telefon || mijoz.telefon) : (profil.telefon || mijoz.telefon);
    if (!(profil.ism && profil.ism.trim()) && serverProfil && serverProfil.ism) {
      profil = Object.assign({}, profil, { ism: serverProfil.ism });
    }
    var ismBor = profil.ism && profil.ism.trim();

    el("kab-salom").textContent = ismBor ? ("Xush kelibsiz, " + profil.ism + "!") : "Xush kelibsiz!";
    el("kab-profil-ism").textContent = ismBor ? profil.ism : "Ism kiritilmagan";
    el("kab-profil-telefon").textContent = telefonKorinishi || "—";
    avatarYangila(profil, ismBor ? profil.ism : mijoz.telefon);

    var stat = statistikaHisobla(buyurtmalar);
    el("kab-stat-summa").textContent = narx(stat.summa);
    el("kab-stat-soni").textContent = stat.soni + " ta";

    // Server haqiqiy ro'yxatdan o'tgan sanani bersa — o'shani ko'rsatamiz
    // va "bu qurilmadagi taxmin" izohini yashiramiz.
    var serverSana = serverProfil && serverProfil.royxatdanOtgan;
    el("kab-stat-sana").textContent = sanaFormat(serverSana || birinchiKorishSanasi(mijoz.id));
    var izoh = el("kab-sana-izoh");
    if (izoh) izoh.hidden = !!serverSana;

    // Header/mobil-paneldagi "Kabinet" yorlig'i — do-kon.js dagi ESKI
    // badgelarYangila() bu ikkisini [data-hisob-nom] deb tanimaydi (ataylab,
    // TEGMAYDIGAN qoidasi tufayli ularga shu atribut berilmagan), shu
    // sabab bu yerda o'zimiz yangilaymiz — ism bo'lsa ism, bo'lmasa "Kabinet".
    var headerNomEl = el("kab-header-nom"), mobilNomEl = el("kab-mobil-nom");
    var korinadiganNom = ismBor ? profil.ism.split(" ")[0] : "Kabinet";
    if (headerNomEl) headerNomEl.textContent = korinadiganNom;
    if (mobilNomEl) mobilNomEl.textContent = korinadiganNom;

    // Tahrirlash formalarini oldindan to'ldirish
    var ismInput = el("kab-ism-input"), telInput = el("kab-telefon-input");
    if (ismInput && !ismInput.value) ismInput.value = profil.ism || "";
    if (telInput && !telInput.value) telInput.value = telefonKorinishi || "";
  }

  /* =================================================================
     8. SARALANGAN / OXIRGI KO'RILGAN — DOKON orqali (mavjud, o'zgartirilmagan)
  ================================================================== */
  function mahsulotGridniChiz(gridId, boshHolatJoyId, kodlar, boshMatn) {
    var grid = el(gridId);
    if (!grid) return;
    var mahsulotlar = [];
    for (var i = 0; i < kodlar.length; i++) {
      var m = (typeof mahsulotniTop === "function") ? mahsulotniTop(kodlar[i]) : null;
      if (m) mahsulotlar.push(m);
    }
    if (!mahsulotlar.length) {
      grid.innerHTML = "";
      var joy = el(boshHolatJoyId);
      if (joy) joy.innerHTML = '<p class="kab-mayda-izoh">' + xavfsiz(boshMatn) + "</p>";
      return;
    }
    var joy2 = el(boshHolatJoyId);
    if (joy2) joy2.innerHTML = "";
    grid.innerHTML = mahsulotlar.map(mahsulotKartaHTML).join("");
    if (window.DOKON && DOKON.kartochkalarniUla) DOKON.kartochkalarniUla(grid);
    if (window.DOKON && DOKON.badgelarYangila) DOKON.badgelarYangila();
  }

  function qiziqishlarniChiz() {
    if (typeof mahsulotlarRoyxatiTogri === "function" && !mahsulotlarRoyxatiTogri()) return;
    var saralangan = (window.DOKON && DOKON.saralanganRoyxati) ? DOKON.saralanganRoyxati() : [];
    // Eng oxirgi saralangan avval ko'rinsin
    mahsulotGridniChiz("kab-saralangan-grid", "kab-saralangan-bosh",
      saralangan.slice().reverse(), "Hali hech narsani saralamagansiz — mahsulot yonidagi yurakchani bosing.");

    var korilgan = (window.DOKON && DOKON.korilganRoyxati) ? DOKON.korilganRoyxati() : [];
    mahsulotGridniChiz("kab-korilgan-grid", "kab-korilgan-bosh",
      korilgan, "Hali hech qanday mahsulotni ko'rmadingiz.");
  }

  /* =================================================================
     9. TAHRIRLASH FORMALARI
  ================================================================== */
  function tahrirniUla(mijoz) {
    var toggle = el("kab-tahrir-toggle");
    var karta = el("kab-tahrir-karta");
    if (toggle && karta) {
      toggle.addEventListener("click", function () {
        var ochiq = karta.hidden;
        karta.hidden = !ochiq;
        toggle.setAttribute("aria-expanded", ochiq ? "true" : "false");
        toggle.textContent = ochiq ? "Tahrirlashni yopish" : "Ma'lumotlarni tahrirlash";
        if (ochiq) karta.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }

    // Avatar yuklash
    var fayl = el("kab-avatar-fayl");
    if (fayl) {
      fayl.addEventListener("change", function () {
        var f = fayl.files && fayl.files[0];
        if (!f) return;
        rasmniKichraytir(f, function (dataUrl, xatoMatn) {
          if (xatoMatn) { xabar(xatoMatn, "xato"); fayl.value = ""; return; }
          var saqlandi = profilYoz(mijoz.id, { avatar: dataUrl });
          fayl.value = "";
          if (!saqlandi) { xabar("Xotira to'lgan — rasmni saqlab bo'lmadi.", "xato"); return; }
          var profil = profilOl(mijoz.id);
          avatarYangila(profil, (profil.ism || mijoz.telefon));
          xabar("Rasm yangilandi (shu qurilmada saqlanadi).", "ok");
        });
      });
    }

    // Ism + telefon
    var profilShakl = el("kab-profil-shakl");
    if (profilShakl) {
      profilShakl.addEventListener("submit", function (h) {
        h.preventDefault();
        var ism = (el("kab-ism-input").value || "").trim();
        var telefon = (el("kab-telefon-input").value || "").trim();
        if (ism && ism.length < 2) { xabar("Ismni to'liqroq kiriting (kamida 2 harf).", "xato"); return; }
        if (telefon && window.DOKON && DOKON.telefonTogrimi && !DOKON.telefonTogrimi(telefon)) {
          xabar("Telefon raqam noto'g'ri. Namuna: +998 90 123 45 67", "xato");
          return;
        }
        profilYoz(mijoz.id, { ism: ism, telefon: telefon });
        var buyurtmalar = _songgiBuyurtmalar || [];
        profilKartasiniChiz(mijoz, buyurtmalar, _serverProfil);
        xabar("Ma'lumotlar saqlandi (shu qurilmada).", "ok");
      });
    }

    // Parol — HAQIQIY o'zgartirish yo'q (SMS-kod bilan kirish), faqat
    // validatsiya + halol izoh ko'rsatiladi.
    var parolShakl = el("kab-parol-shakl");
    if (parolShakl) {
      parolShakl.addEventListener("submit", function (h) {
        h.preventDefault();
        var xatoJoy = el("kab-parol-xato");
        var eski = el("kab-parol-eski").value;
        var yangi = el("kab-parol-yangi").value;
        var takror = el("kab-parol-takror").value;
        if (!eski || !yangi || !takror) { xatoJoy.textContent = "Barcha maydonlarni to'ldiring."; return; }
        if (yangi.length < 6) { xatoJoy.textContent = "Yangi parol kamida 6 belgidan iborat bo'lsin."; return; }
        if (yangi !== takror) { xatoJoy.textContent = "Yangi parol va takrori bir xil emas."; return; }
        xatoJoy.textContent = "";
        parolShakl.reset();
        xabar("Hozircha kirish faqat SMS-kod orqali amalga oshadi — parol qo'shish keyingi bosqichda ishga tushadi.", "ogoh");
      });
    }
  }

  /* =================================================================
     10. CHIQISH
  ================================================================== */
  function chiqishniUla() {
    var t = el("kab-chiqish");
    if (!t) return;
    t.addEventListener("click", function () {
      kabApi("/api/chiqish", "POST").then(function () {
        window.location.href = "kirish.html";
      });
    });
  }

  /* =================================================================
     11. ISHGA TUSHIRISH
  ================================================================== */
  var _songgiBuyurtmalar = [];
  // GET /api/hisob dagi `profil` (ism, ro'yxatdan o'tgan sana, xarid
  // summasi). Ikki joyda kerak: sahifa ochilganda va foydalanuvchi
  // o'z ma'lumotini saqlaganda qayta chizishda.
  var _serverProfil = null;

  function kirmaganHolatniKorsat() {
    el("kab-yuklanmoqda").hidden = true;
    el("kab-kirmagan").hidden = false;
    el("kab-asosiy").hidden = true;
  }

  function boshla() {
    if (!el("kab-yuklanmoqda")) return; // kabinet.html emas
    if (!window.ArzonchiAPI) { kirmaganHolatniKorsat(); return; }

    window.ArzonchiAPI.hisob().then(function (r) {
      if (!r || !r.ok || !r.user) { kirmaganHolatniKorsat(); return; }
      var mijoz = r.user;
      _serverProfil = r.profil || null;

      kabApi("/api/buyurtmalarim").then(function (bj) {
        var serverXato = !bj || !bj.ok;
        var buyurtmalar = (bj && bj.ok && Array.isArray(bj.buyurtmalar)) ? bj.buyurtmalar : [];
        _songgiBuyurtmalar = buyurtmalar;

        el("kab-yuklanmoqda").hidden = true;
        el("kab-kirmagan").hidden = true;
        el("kab-asosiy").hidden = false;

        var ogohBanner = el("kab-server-ogohlantirish");
        if (ogohBanner) ogohBanner.hidden = !serverXato;

        faolBlokChiz(buyurtmalar);
        buyurtmalarRoyxatiniChiz(buyurtmalar);
        profilKartasiniChiz(mijoz, buyurtmalar, _serverProfil);
        qiziqishlarniChiz();
        tahrirniUla(mijoz);
        chiqishniUla();
      });
    })["catch"](function () {
      kirmaganHolatniKorsat();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boshla);
  } else {
    boshla();
  }
})();
