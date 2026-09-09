/*
  =======================================================================
  DO'KON QATLAMI — savat, saralangan, hisob, lokatsiya, nasiya, sharhlar
  =======================================================================
  Bu fayl BARCHA sahifalarda ishlaydi (umumiy.js dan KEYIN, sahifa
  skriptidan OLDIN ulanadi).

  Muhim tamoyillar:
    1. Server YO'Q. Hamma narsa brauzer xotirasida (localStorage).
       Sayt `file://` orqali ham ishlaydi.
    2. localStorage har doim `try/catch` ichida — shaxsiy rejimda yoki
       xotira to'lganda sayt BUZILMAYDI, shunchaki saqlanmaydi.
    3. Admin panelga ULANMAGAN — Jasur aka ko'rsatmasi: "buni admin
       tomonga ulamagin, admin tomonini alohida yasab chiqamiz".
  =======================================================================
*/

var DOKON = (function () {
  "use strict";

  /* =================================================================
     0. XOTIRA — xavfsiz localStorage
  ================================================================== */
  var KALIT = {
    savat:      "arzonchi_savat_v1",
    saralangan: "arzonchi_saralangan_v1",
    korilgan:   "arzonchi_korilgan_v1",
    sharhlar:   "arzonchi_sharhlar_v1",
    hisob:      "arzonchi_hisob_v1",
    manzil:     "arzonchi_manzil_v1",
    navbat:     "arzonchi_royxat_navbat_v1",
    buyurtmaNavbat: "arzonchi_buyurtma_navbat_v1",
    buyurtmalarim: "arzonchi_buyurtmalarim_v1"
  };

  function oqi(kalit, zaxira) {
    try {
      var xom = window.localStorage.getItem(kalit);
      if (!xom) return zaxira;
      var q = JSON.parse(xom);
      return (q === null || q === undefined) ? zaxira : q;
    } catch (e) {
      return zaxira;
    }
  }

  function yoz(kalit, qiymat) {
    try {
      window.localStorage.setItem(kalit, JSON.stringify(qiymat));
      return true;
    } catch (e) {
      return false;
    }
  }

  // umumiy.js dagi ekranlash funksiyasi; u yuklanmagan bo'lsa ham ishlasin
  function xavfsiz(q) {
    if (typeof htmlXavfsiz === "function") return htmlXavfsiz(q);
    if (q === null || q === undefined) return "";
    return String(q).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function narx(n) {
    if (typeof narxniFormatla === "function") return narxniFormatla(n);
    return String(n);
  }

  function mahsulot(id) {
    if (typeof mahsulotniTop === "function") return mahsulotniTop(id);
    if (typeof MAHSULOTLAR === "undefined") return null;
    for (var i = 0; i < MAHSULOTLAR.length; i++) {
      if (MAHSULOTLAR[i].id === id) return MAHSULOTLAR[i];
    }
    return null;
  }

  /* =================================================================
     1. AKSIYA / NARX
  ================================================================== */

  // Aksiya bormi? {eskiNarx, chegirmaFoiz} yoki null
  function aksiyaOl(m) {
    if (!m) return null;
    if (typeof AKSIYALAR === "undefined" || !AKSIYALAR[m.id]) return null;
    var a = AKSIYALAR[m.id];
    if (typeof a.eskiNarx !== "number" || a.eskiNarx <= m.narx) return null;
    if (a.tugash) {
      var tugash = new Date(a.tugash + "T23:59:59");
      if (!isNaN(tugash.getTime()) && tugash < new Date()) return null; // muddati o'tgan
    }
    return {
      eskiNarx: a.eskiNarx,
      chegirmaFoiz: Math.round((1 - m.narx / a.eskiNarx) * 100)
    };
  }

  // Mahsulotning barcha rasmlari (asosiy + qo'shimcha)
  function rasmlarOl(m) {
    var royxat = [];
    if (m && m.rasm) royxat.push(m.rasm);
    if (m && typeof QOSHIMCHA_RASMLAR !== "undefined" && QOSHIMCHA_RASMLAR[m.id]) {
      var q = QOSHIMCHA_RASMLAR[m.id];
      for (var i = 0; i < q.length; i++) {
        if (q[i] && royxat.indexOf(q[i]) === -1) royxat.push(q[i]);
      }
    }
    return royxat;
  }

  function rangVariantlari(m) {
    if (!m || typeof RANG_VARIANTLARI === "undefined") return [];
    return RANG_VARIANTLARI[m.id] || [];
  }

  /* =================================================================
     2. NASIYA (muddatli to'lov)
  ================================================================== */

  function nasiyaMumkinmi(narxSoni) {
    if (typeof NASIYA_SHARTLARI === "undefined") return false;
    return typeof narxSoni === "number" && narxSoni >= NASIYA_SHARTLARI.engKamNarx;
  }

  // Berilgan oyga oylik to'lov (butun songa yaxlitlanadi)
  function nasiyaHisobla(narxSoni, oy) {
    if (!nasiyaMumkinmi(narxSoni)) return 0;
    var ustama = NASIYA_SHARTLARI.ustama[oy];
    if (typeof ustama !== "number") ustama = 0;
    return Math.round((narxSoni * (1 + ustama)) / oy / 1000) * 1000;
  }

  // Eng uzoq muddat = eng kichik oylik to'lov (kartochkada shu ko'rsatiladi)
  function nasiyaEngKichik(narxSoni) {
    if (!nasiyaMumkinmi(narxSoni)) return null;
    var oylar = NASIYA_SHARTLARI.oylar;
    var engUzoq = oylar[oylar.length - 1];
    return { oy: engUzoq, oylik: nasiyaHisobla(narxSoni, engUzoq) };
  }

  /* =================================================================
     3. SAVAT
  ================================================================== */

  function savatRoyxati() {
    var r = oqi(KALIT.savat, []);
    return Array.isArray(r) ? r : [];
  }

  function savatSaqla(r) { yoz(KALIT.savat, r); badgelarYangila(); }

  function savatdaBormi(id) {
    var r = savatRoyxati();
    for (var i = 0; i < r.length; i++) if (r[i].id === id) return true;
    return false;
  }

  // Ombordagi eng ko'p miqdor: qoldiq bo'lsa min(99, qoldiq), aks holda 99.
  function ombordagiMax(id) {
    var m = mahsulot(id);
    var q = (m && typeof m.qoldiq === "number") ? m.qoldiq : 99;
    if (q > 99) q = 99;
    if (q < 1) q = 1;
    return q;
  }

  function savatQosh(id, soni) {
    var m = mahsulot(id);
    if (!m) return false;
    soni = soni || 1;
    var r = savatRoyxati(), topildi = false;
    for (var i = 0; i < r.length; i++) {
      if (r[i].id === id) { r[i].soni = Math.min(ombordagiMax(id), r[i].soni + soni); topildi = true; break; }
    }
    if (!topildi) r.push({ id: id, soni: Math.min(ombordagiMax(id), soni), tanlangan: true });
    savatSaqla(r);
    return true;
  }

  function savatSoniOzgart(id, yangiSoni) {
    var r = savatRoyxati();
    for (var i = 0; i < r.length; i++) {
      if (r[i].id === id) {
        r[i].soni = Math.max(1, Math.min(ombordagiMax(id), yangiSoni));
        break;
      }
    }
    savatSaqla(r);
  }

  function savatOchir(id) {
    var r = savatRoyxati(), yangi = [];
    for (var i = 0; i < r.length; i++) if (r[i].id !== id) yangi.push(r[i]);
    savatSaqla(yangi);
  }

  function savatTanlaTogla(id, holat) {
    var r = savatRoyxati();
    for (var i = 0; i < r.length; i++) {
      if (r[i].id === id) r[i].tanlangan = (holat === undefined) ? !r[i].tanlangan : !!holat;
    }
    savatSaqla(r);
  }

  function savatHammasiniTanla(holat) {
    var r = savatRoyxati();
    for (var i = 0; i < r.length; i++) r[i].tanlangan = !!holat;
    savatSaqla(r);
  }

  function savatTozala() { savatSaqla([]); }

  // Badge uchun: jami dona soni
  function savatDonaSoni() {
    var r = savatRoyxati(), s = 0;
    for (var i = 0; i < r.length; i++) s += r[i].soni;
    return s;
  }

  // Hisob-kitob: {jami, tanlanganJami, tanlanganDona, tejaldi}
  function savatHisob() {
    var r = savatRoyxati();
    var natija = { jami: 0, tanlanganJami: 0, tanlanganDona: 0, tejaldi: 0, tanlanganTur: 0 };
    for (var i = 0; i < r.length; i++) {
      var m = mahsulot(r[i].id);
      if (!m) continue;
      var summa = m.narx * r[i].soni;
      natija.jami += summa;
      if (r[i].tanlangan) {
        natija.tanlanganJami += summa;
        natija.tanlanganDona += r[i].soni;
        natija.tanlanganTur += 1;
        var aks = aksiyaOl(m);
        if (aks) natija.tejaldi += (aks.eskiNarx - m.narx) * r[i].soni;
      }
    }
    return natija;
  }

  /* =================================================================
     4. SARALANGAN (yurakcha)
  ================================================================== */

  function saralanganRoyxati() {
    var r = oqi(KALIT.saralangan, []);
    return Array.isArray(r) ? r : [];
  }

  function saralanganMi(id) { return saralanganRoyxati().indexOf(id) !== -1; }

  function saralanganTogla(id) {
    var r = saralanganRoyxati(), i = r.indexOf(id), qoshildi;
    if (i === -1) { r.push(id); qoshildi = true; }
    else { r.splice(i, 1); qoshildi = false; }
    yoz(KALIT.saralangan, r);
    badgelarYangila();
    return qoshildi;
  }

  /* =================================================================
     5. KO'RILGAN MAHSULOTLAR
  ================================================================== */

  function korilganYoz(id) {
    var r = oqi(KALIT.korilgan, []);
    if (!Array.isArray(r)) r = [];
    var yangi = [id];
    for (var i = 0; i < r.length && yangi.length < 12; i++) {
      if (r[i] !== id) yangi.push(r[i]);
    }
    yoz(KALIT.korilgan, yangi);
  }

  function korilganRoyxati() {
    var r = oqi(KALIT.korilgan, []);
    return Array.isArray(r) ? r : [];
  }

  /* =================================================================
     5b. SOTIB OLINGAN MAHSULOTLAR
     -----------------------------------------------------------------
     Jasur aka: "fikrni faqat olgan odamgina qoldira oladi". Buyurtma
     rasmiylashtirilganda tanlangan mahsulotlar id'si shu ro'yxatga
     tushadi; fikr yozish tugmasi shu ro'yxatni tekshiradi.
  ================================================================== */

  function sotibOlinganRoyxati() {
    var r = oqi("arzonchi_sotib_olingan_v1", []);
    return Array.isArray(r) ? r : [];
  }

  function sotibOlinganYoz(idlar) {
    var r = sotibOlinganRoyxati();
    for (var i = 0; i < idlar.length; i++) {
      if (r.indexOf(idlar[i]) === -1) r.push(idlar[i]);
    }
    yoz("arzonchi_sotib_olingan_v1", r);
  }

  function sotibOlganmi(id) { return sotibOlinganRoyxati().indexOf(id) !== -1; }

  /* =================================================================
     6. SHARHLAR (fikr / otziv) va REYTING
     -----------------------------------------------------------------
     Jasur aka: "kimdir baho bergan bo'lsa, yulduzchasini chiqarib
     qo'yishing kerak" — ya'ni yulduz FAQAT haqiqiy sharh bo'lganda
     chiqadi. Hech qanday soxta reyting yozilmaydi.
  ================================================================== */

  function barchaSharhlar() {
    var s = oqi(KALIT.sharhlar, {});
    return (s && typeof s === "object") ? s : {};
  }

  function sharhlarOl(id) {
    var s = barchaSharhlar();
    return Array.isArray(s[id]) ? s[id] : [];
  }

  function sharhQosh(id, yozuv) {
    if (!yozuv || !yozuv.matn || !yozuv.baho) return false;
    var s = barchaSharhlar();
    if (!Array.isArray(s[id])) s[id] = [];
    s[id].unshift({
      ism:  String(yozuv.ism || "Mijoz").slice(0, 40),
      baho: Math.max(1, Math.min(5, parseInt(yozuv.baho, 10) || 5)),
      matn: String(yozuv.matn).slice(0, 600),
      sana: new Date().toISOString().slice(0, 10)
    });
    yoz(KALIT.sharhlar, s);
    return true;
  }

  // {ortacha, soni} yoki null (sharh bo'lmasa yulduz umuman chiqmaydi)
  function reytingOl(id) {
    var r = sharhlarOl(id);
    if (!r.length) return null;
    var yigindi = 0;
    for (var i = 0; i < r.length; i++) yigindi += r[i].baho;
    return { ortacha: Math.round((yigindi / r.length) * 10) / 10, soni: r.length };
  }

  // Yulduzchalar HTML'i (to'liq / yarim emas — butun yulduz, sodda va aniq)
  function yulduzHTML(ortacha) {
    var html = '<span class="yulduzlar" aria-hidden="true">';
    for (var i = 1; i <= 5; i++) {
      html += '<span class="yulduz' + (i <= Math.round(ortacha) ? " yulduz--toliq" : "") + '">★</span>';
    }
    return html + "</span>";
  }

  /* =================================================================
     7. HISOB — ro'yxatdan o'tish (ism + telefon)
  ================================================================== */

  function hisobOl() {
    var h = oqi(KALIT.hisob, null);
    return (h && h.telefon) ? h : null;
  }

  function hisobBormi() { return !!hisobOl(); }

  // "+998 90 123 45 67" -> "+998901234567"
  function telefonTozala(xom) {
    var raqamlar = String(xom || "").replace(/\D/g, "");
    if (raqamlar.indexOf("998") === 0) raqamlar = raqamlar.slice(3);
    if (raqamlar.length > 9) raqamlar = raqamlar.slice(-9);
    return raqamlar;
  }

  function telefonTogrimi(xom) { return telefonTozala(xom).length === 9; }

  function telefonKorinishi(xom) {
    var r = telefonTozala(xom);
    if (r.length !== 9) return xom;
    return "+998 " + r.slice(0, 2) + " " + r.slice(2, 5) + " " + r.slice(5, 7) + " " + r.slice(7);
  }

  function hisobYoz(ism, telefonXom) {
    if (!telefonTogrimi(telefonXom)) return false;
    var yozuv = {
      ism: String(ism || "").trim().slice(0, 60),
      telefon: "+998" + telefonTozala(telefonXom),
      sana: new Date().toISOString()
    };
    yoz(KALIT.hisob, yozuv);
    navbatQosh(yozuv);   // .md faylga yozish uchun navbatga qo'shiladi
    badgelarYangila();
    return true;
  }

  function hisobChiq() {
    try { window.localStorage.removeItem(KALIT.hisob); } catch (e) {}
    badgelarYangila();
  }

  /* -----------------------------------------------------------------
     RO'YXAT NAVBATI -> mijozlar.md
     -----------------------------------------------------------------
     Jasur aka: "har bitta kiritgan telefon raqamni md faylga saqlab
     borishlik".

     Brauzer o'zi diskka .md yoza olmaydi (xavfsizlik cheklovi). Shuning
     uchun ikki bosqich:
       1) Har ro'yxat NAVBATga yoziladi (localStorage) — hech narsa
          yo'qolmaydi, hatto internet/server bo'lmasa ham.
       2) Agar lokal yozuv serveri ishlab tursa
          (`node skriptlar/royxat-server.mjs`), navbat avtomatik unga
          yuboriladi va u `mijozlar.md` fayliga qo'shib boradi.
       3) Server bo'lmasa — `DOKON.royxatYuklab()` bilan .md faylni
          qo'lda yuklab olish mumkin (savat sahifasida tugmasi bor).
  ------------------------------------------------------------------ */

  var SERVER_MANZIL = "http://localhost:4321/royxat";

  function navbatOl() {
    var n = oqi(KALIT.navbat, []);
    return Array.isArray(n) ? n : [];
  }

  function navbatQosh(yozuv) {
    var n = navbatOl();
    n.push(yozuv);
    yoz(KALIT.navbat, n);
    navbatniYubor();
  }

  function navbatniYubor() {
    var n = navbatOl();
    if (!n.length || typeof fetch !== "function") return;
    fetch(SERVER_MANZIL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yozuvlar: n })
    }).then(function (javob) {
      if (javob.ok) { yoz(KALIT.navbat, []); }   // yozildi — navbat tozalanadi
    })["catch"](function () {
      /* server yo'q — navbat saqlanib qoladi, keyingi safar yana urinadi */
    });
  }

  // Server bo'lmasa: .md faylni brauzerdan yuklab olish
  function royxatYuklab() {
    var n = navbatOl();
    var h = hisobOl();
    if (!n.length && h) n = [h];
    if (!n.length) { xabar("Hozircha yozilgan mijoz yo'q.", "ogoh"); return; }
    var satrlar = ["# Mijozlar ro'yxati", "", "| Sana | Ism | Telefon |", "|---|---|---|"];
    for (var i = 0; i < n.length; i++) {
      satrlar.push("| " + (n[i].sana || "").slice(0, 10) + " | " +
        (n[i].ism || "—") + " | " + n[i].telefon + " |");
    }
    var matn = satrlar.join("\n") + "\n";
    try {
      var havola = document.createElement("a");
      havola.href = "data:text/markdown;charset=utf-8," + encodeURIComponent(matn);
      havola.download = "mijozlar.md";
      document.body.appendChild(havola);
      havola.click();
      document.body.removeChild(havola);
    } catch (e) {
      xabar("Yuklab olishning iloji bo'lmadi.", "xato");
    }
  }

  /* -----------------------------------------------------------------
     BUYURTMA NAVBATI -> buyurtmalar.md
     Mijoz registratsiyasidan alohida: to'liq buyurtma (raqam, mahsulotlar,
     to'lov, yetkazish, jami) lokal serverga (/buyurtma) yuboriladi.
     Server bo'lmasa — navbatda saqlanadi, keyin qayta urinadi.
  ------------------------------------------------------------------ */
  var BUYURTMA_SERVER = "http://localhost:4321/buyurtma";

  function buyurtmaNavbatOl() {
    var n = oqi(KALIT.buyurtmaNavbat, []);
    return Array.isArray(n) ? n : [];
  }

  function buyurtmaNavbatniYubor() {
    var n = buyurtmaNavbatOl();
    if (!n.length || typeof fetch !== "function") return;
    fetch(BUYURTMA_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyurtmalar: n })
    }).then(function (javob) {
      if (javob.ok) { yoz(KALIT.buyurtmaNavbat, []); }
    })["catch"](function () { /* server yo'q — navbat saqlanadi */ });
  }

  function buyurtmalarimOl() {
    var b = oqi(KALIT.buyurtmalarim, []);
    return Array.isArray(b) ? b : [];
  }

  function buyurtmaYoz(buyurtma) {
    var n = buyurtmaNavbatOl();
    n.push(buyurtma);
    yoz(KALIT.buyurtmaNavbat, n);
    buyurtmaNavbatniYubor();
    // Kabinet uchun mahalliy tarix (server yo'q — shu qurilmada ko'rinadi)
    try {
      var mine = buyurtmalarimOl();
      mine.unshift({ raqam: buyurtma.raqam, sana: buyurtma.sana, jamiMatn: buyurtma.jamiMatn, tolov: buyurtma.tolov, holat: "Qabul qilindi" });
      yoz(KALIT.buyurtmalarim, mine.slice(0, 50));
    } catch (e) {}
  }

  /* =================================================================
     8. LOKATSIYA -> ENG YAQIN FILIAL -> YETKAZISH MUDDATI
  ================================================================== */

  function manzilOl() { return oqi(KALIT.manzil, null); }
  function manzilYoz(m) { yoz(KALIT.manzil, m); badgelarYangila(); }

  // Filial koordinatasi: AVVAL filialning O'Z kengligi/uzunligi (aniq —
  // Yo'l 1 admin asbobidan kiritiladi), bo'lmasa nomidan shahar jadvalidan
  // (taxminiy). ⚠️ Bu birinchi blokni SAQLANG — "yaqinimdagi filial" aynan
  // shunga tayanadi (Arxitektor, 2026-09-09, orqaga mos qo'shimcha).
  function filialKoordinata(filial) {
    if (!filial) return null;
    var kn = parseFloat(filial.kenglik), uz = parseFloat(filial.uzunlik);
    if (!isNaN(kn) && !isNaN(uz) && kn >= 37 && kn <= 46 && uz >= 55 && uz <= 74) {
      return { lat: kn, lon: uz, nom: filial.nomi || "" };
    }
    if (typeof SHAHAR_KOORDINATA === "undefined") return null;
    var nom = String(filial.nomi || "").toLowerCase();
    for (var kalit in SHAHAR_KOORDINATA) {
      if (Object.prototype.hasOwnProperty.call(SHAHAR_KOORDINATA, kalit)) {
        if (nom.indexOf(kalit) !== -1) return SHAHAR_KOORDINATA[kalit];
      }
    }
    return null;
  }

  // Ikki nuqta orasidagi masofa (km) — haversine
  function masofaKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var d1 = (lat2 - lat1) * Math.PI / 180;
    var d2 = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(d1 / 2) * Math.sin(d1 / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(d2 / 2) * Math.sin(d2 / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function yaqinFilialTop(lat, lon) {
    if (typeof FILIALLAR === "undefined" || !FILIALLAR.length) return null;
    var eng = null;
    for (var i = 0; i < FILIALLAR.length; i++) {
      var k = filialKoordinata(FILIALLAR[i]);
      if (!k) continue;
      var d = masofaKm(lat, lon, k.lat, k.lon);
      if (!eng || d < eng.masofa) {
        eng = { filial: FILIALLAR[i], masofa: d, shahar: k.nom };
      }
    }
    return eng;
  }

  // Masofaga qarab taxminiy yetkazish muddati
  function yetkazishMuddati(masofa) {
    if (masofa <= 15)  return { kun: 0, matn: "Bugun yetkazib beramiz" };
    if (masofa <= 60)  return { kun: 1, matn: "Ertaga yetkazib beramiz" };
    if (masofa <= 200) return { kun: 2, matn: "2 kun ichida yetkazib beramiz" };
    return { kun: 3, matn: "3 kun ichida yetkazib beramiz" };
  }

  // Brauzerdan lokatsiya so'rash
  function lokatsiyaSora(tugagach) {
    if (!navigator.geolocation) {
      xabar("Brauzeringiz joylashuvni aniqlay olmaydi.", "ogoh");
      if (tugagach) tugagach(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function (holat) {
        var yaqin = yaqinFilialTop(holat.coords.latitude, holat.coords.longitude);
        if (!yaqin) { if (tugagach) tugagach(null); return; }
        var muddat = yetkazishMuddati(yaqin.masofa);
        var natija = {
          lat: holat.coords.latitude,
          lon: holat.coords.longitude,
          filialId: yaqin.filial.id,
          filialNomi: yaqin.filial.nomi,
          shahar: yaqin.shahar,
          masofa: Math.round(yaqin.masofa),
          yetkazish: muddat.matn,
          sana: new Date().toISOString()
        };
        manzilYoz(natija);
        if (tugagach) tugagach(natija);
      },
      function () {
        xabar("Joylashuvga ruxsat berilmadi. Shaharni qo'lda tanlashingiz mumkin.", "ogoh");
        if (tugagach) tugagach(null);
      },
      { timeout: 10000, maximumAge: 600000 }
    );
  }

  // Shaharni qo'lda tanlash (lokatsiyaga ruxsat bermaganlar uchun)
  function shaharniQolda(shaharKalit) {
    var k = (typeof SHAHAR_KOORDINATA !== "undefined") ? SHAHAR_KOORDINATA[shaharKalit] : null;
    if (!k) return null;
    var yaqin = yaqinFilialTop(k.lat, k.lon);
    if (!yaqin) return null;
    var muddat = yetkazishMuddati(yaqin.masofa);
    var natija = {
      lat: k.lat, lon: k.lon,
      filialId: yaqin.filial.id,
      filialNomi: yaqin.filial.nomi,
      shahar: k.nom,
      masofa: Math.round(yaqin.masofa),
      yetkazish: muddat.matn,
      qolda: true,
      sana: new Date().toISOString()
    };
    manzilYoz(natija);
    return natija;
  }

  /* =================================================================
     9. UI — xabar (toast), modal, badge
  ================================================================== */

  function xabar(matn, tur) {
    var idish = document.getElementById("xabar-idishi");
    if (!idish) {
      idish = document.createElement("div");
      idish.id = "xabar-idishi";
      idish.className = "xabar-idishi";
      document.body.appendChild(idish);
    }
    var el = document.createElement("div");
    el.className = "xabar xabar--" + (tur || "ok");
    el.setAttribute("role", "status");
    el.textContent = matn;
    idish.appendChild(el);
    setTimeout(function () { el.classList.add("xabar--chiqdi"); }, 10);
    setTimeout(function () {
      el.classList.remove("xabar--chiqdi");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }, 3000);
  }

  var oxirgiFokus = null;

  function modalOch(sarlavha, ichkiHTML, sinf) {
    modalYop();
    oxirgiFokus = document.activeElement;
    var qatlam = document.createElement("div");
    qatlam.className = "modal-qatlam" + (sinf ? " " + sinf : "");
    qatlam.id = "modal-qatlam";
    qatlam.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + xavfsiz(sarlavha) + '">' +
      '<div class="modal-bosh">' +
      "<h3>" + xavfsiz(sarlavha) + "</h3>" +
      '<button type="button" class="modal-yop" aria-label="Yopish">&times;</button>' +
      "</div>" +
      '<div class="modal-tan">' + ichkiHTML + "</div>" +
      "</div>";
    document.body.appendChild(qatlam);
    document.body.classList.add("modal-ochiq");

    qatlam.addEventListener("click", function (h) {
      if (h.target === qatlam || h.target.classList.contains("modal-yop")) modalYop();
    });
    document.addEventListener("keydown", tugmaKuzat);

    var birinchi = qatlam.querySelector("input, button, select, textarea");
    if (birinchi) birinchi.focus();
    return qatlam;
  }

  function tugmaKuzat(h) { if (h.key === "Escape") modalYop(); }

  function modalYop() {
    var q = document.getElementById("modal-qatlam");
    if (q && q.parentNode) q.parentNode.removeChild(q);
    document.body.classList.remove("modal-ochiq");
    document.removeEventListener("keydown", tugmaKuzat);
    if (oxirgiFokus && oxirgiFokus.focus) { oxirgiFokus.focus(); oxirgiFokus = null; }
  }

  // Headerdagi savat/saralangan sonlari va hisob nomini yangilash
  function badgelarYangila() {
    var s = savatDonaSoni();
    var sar = saralanganRoyxati().length;

    var savatBadge = document.querySelectorAll("[data-savat-soni]");
    for (var i = 0; i < savatBadge.length; i++) {
      savatBadge[i].textContent = s > 99 ? "99+" : String(s);
      savatBadge[i].hidden = s === 0;
    }
    var sarBadge = document.querySelectorAll("[data-saralangan-soni]");
    for (var j = 0; j < sarBadge.length; j++) {
      sarBadge[j].textContent = sar > 99 ? "99+" : String(sar);
      sarBadge[j].hidden = sar === 0;
    }
    var hisob = hisobOl();
    var hisobNom = document.querySelectorAll("[data-hisob-nom]");
    for (var k = 0; k < hisobNom.length; k++) {
      hisobNom[k].textContent = hisob ? (hisob.ism || "Hisobim") : "Kirish";
    }
    // Yurakchalar holati
    var yuraklar = document.querySelectorAll("[data-saralangan-id]");
    for (var y = 0; y < yuraklar.length; y++) {
      var id = yuraklar[y].getAttribute("data-saralangan-id");
      var faol = saralanganMi(id);
      yuraklar[y].classList.toggle("yurak--faol", faol);
      yuraklar[y].setAttribute("aria-pressed", faol ? "true" : "false");
    }
    // Lokatsiya yozuvi
    var manzil = manzilOl();
    var manzilEl = document.querySelectorAll("[data-manzil-matn]");
    for (var mm = 0; mm < manzilEl.length; mm++) {
      manzilEl[mm].textContent = manzil ? manzil.shahar : "Shaharni tanlang";
    }
  }

  /* =================================================================
     10. RO'YXATDAN O'TISH MODALI
  ================================================================== */

  function royxatModal(tugagach) {
    var html =
      '<form id="royxat-shakl" novalidate>' +
      '<p class="modal-izoh">Buyurtmani rasmiylashtirish va aksiyalardan xabardor bo\'lish uchun ' +
      "ism va telefon raqamingizni qoldiring.</p>" +
      '<label class="maydon"><span>Ismingiz</span>' +
      '<input type="text" name="ism" autocomplete="name" placeholder="Masalan: Jasur" required></label>' +
      '<label class="maydon"><span>Telefon raqamingiz</span>' +
      '<input type="tel" name="telefon" autocomplete="tel" inputmode="numeric" ' +
      'placeholder="+998 90 123 45 67" required></label>' +
      '<button type="submit" class="tugma tugma-asosiy tugma-toliq">Davom etish</button>' +
      '<p class="modal-mayda">Ma\'lumotlaringiz faqat buyurtma uchun ishlatiladi.</p>' +
      "</form>";

    var qatlam = modalOch("Ro'yxatdan o'tish", html, "modal--royxat");
    var shakl = qatlam.querySelector("#royxat-shakl");

    // K4 — maydon holatlari (blur da tekshiradi, xatodan keyin jonli)
    var ismYur = maydonUla(shakl.ism, function (v) {
      return v.trim().length < 2 ? "Ismingizni kiriting (kamida 2 harf)." : "";
    });
    var telYur = maydonUla(shakl.telefon, function (v) {
      return telefonTogrimi(v) ? "" : "Telefon raqam noto'g'ri. Namuna: +998 90 123 45 67";
    });
    // Telefon to'g'ri bo'lsa — chiqishda chiroyli ko'rinishga keltirish
    shakl.telefon.addEventListener("blur", function () {
      if (telefonTogrimi(shakl.telefon.value)) shakl.telefon.value = telefonKorinishi(shakl.telefon.value);
    });

    shakl.addEventListener("submit", function (h) {
      h.preventDefault();
      var ismOk = ismYur(), telOk = telYur();
      if (!ismOk) { shakl.ism.focus(); return; }
      if (!telOk) { shakl.telefon.focus(); return; }
      var ism = shakl.ism.value.trim();
      hisobYoz(ism, shakl.telefon.value.trim());
      modalYop();
      xabar("Xush kelibsiz, " + ism + "!", "ok");
      if (tugagach) tugagach(hisobOl());
    });
  }

  /* -----------------------------------------------------------------
     KIRISH OQIMI (test rejimi, serversiz): telefon -> SMS kod -> ism.
     SMS shlyuzi bo'lmagani uchun kod EKRANDA ko'rsatiladi ("test rejimi").
     Server ulanганda faqat shu kod-yaratish qismi almashtiriladi.
  ------------------------------------------------------------------ */
  function _testKod() {
    // 1000..9999 (Math.random brauzerda ishlaydi)
    return String(Math.floor(1000 + Math.random() * 9000));
  }

  function kirishModal(tugagach) {
    var html =
      '<form id="kirish-tel" novalidate>' +
      '<p class="modal-izoh">Kirish yoki ro\'yxatdan o\'tish uchun telefon raqamingizni kiriting. Tasdiqlash kodi keladi.</p>' +
      '<label class="maydon"><span>Telefon raqamingiz</span>' +
      '<input type="tel" name="telefon" autocomplete="tel" inputmode="numeric" placeholder="+998 90 123 45 67" required></label>' +
      '<button type="submit" class="tugma tugma-asosiy tugma-toliq">Kod olish</button>' +
      '</form>';
    var qatlam = modalOch("Kirish", html, "modal--kirish");
    var shakl = qatlam.querySelector("#kirish-tel");
    var telYur = maydonUla(shakl.telefon, function (v) {
      return telefonTogrimi(v) ? "" : "Telefon raqam noto'g'ri. Namuna: +998 90 123 45 67";
    });
    shakl.addEventListener("submit", function (h) {
      h.preventDefault();
      if (!telYur()) { shakl.telefon.focus(); return; }
      kodModal(shakl.telefon.value.trim(), tugagach);
    });
  }

  function kodModal(tel, tugagach) {
    var kod = _testKod();
    var html =
      '<form id="kod-shakl" novalidate>' +
      '<p class="modal-izoh">' + xavfsiz(telefonKorinishi(tel)) + ' raqamiga 4 xonali kod yuborildi.</p>' +
      '<div class="test-kod">Test rejimi — kod: <b>' + kod + '</b></div>' +
      '<label class="maydon"><span>Tasdiqlash kodi</span>' +
      '<input type="text" name="kod" inputmode="numeric" maxlength="4" placeholder="4 xonali kod" required></label>' +
      '<button type="submit" class="tugma tugma-asosiy tugma-toliq">Tasdiqlash</button>' +
      '<button type="button" class="tugma tugma-ikkilamchi tugma-toliq" id="kod-orqaga" style="margin-top:8px">Raqamni o\'zgartirish</button>' +
      '</form>';
    var qatlam = modalOch("SMS kod", html, "modal--kod");
    var shakl = qatlam.querySelector("#kod-shakl");
    var kodYur = maydonUla(shakl.kod, function (v) {
      return v.trim() === kod ? "" : "Kod noto'g'ri.";
    });
    var orqaga = document.getElementById("kod-orqaga");
    if (orqaga) orqaga.addEventListener("click", function () { kirishModal(tugagach); });
    shakl.addEventListener("submit", function (h) {
      h.preventDefault();
      if (!kodYur()) { shakl.kod.focus(); return; }
      var mavjud = hisobOl();
      if (mavjud && telefonTozala(mavjud.telefon) === telefonTozala(tel)) {
        modalYop(); xabar("Xush kelibsiz, " + mavjud.ism + "!", "ok");
        badgelarYangila(); if (tugagach) tugagach(mavjud);
      } else {
        ismModal(tel, tugagach);
      }
    });
  }

  function ismModal(tel, tugagach) {
    var html =
      '<form id="ism-shakl" novalidate>' +
      '<p class="modal-izoh">Tanishib olaylik — ismingizni kiriting.</p>' +
      '<label class="maydon"><span>Ismingiz</span>' +
      '<input type="text" name="ism" autocomplete="name" placeholder="Masalan: Jasur" required></label>' +
      '<button type="submit" class="tugma tugma-asosiy tugma-toliq">Kirish</button>' +
      '</form>';
    var qatlam = modalOch("Ro'yxatdan o'tish", html, "modal--ism");
    var shakl = qatlam.querySelector("#ism-shakl");
    var ismYur = maydonUla(shakl.ism, function (v) {
      return v.trim().length < 2 ? "Ismingizni kiriting (kamida 2 harf)." : "";
    });
    shakl.addEventListener("submit", function (h) {
      h.preventDefault();
      if (!ismYur()) { shakl.ism.focus(); return; }
      var ism = shakl.ism.value.trim();
      hisobYoz(ism, tel);
      modalYop(); xabar("Xush kelibsiz, " + ism + "!", "ok");
      badgelarYangila(); if (tugagach) tugagach(hisobOl());
    });
  }

  /* KABINET — kirgan foydalanuvchi: ma'lumot + buyurtmalar + chiqish */
  function kabinetModal() {
    var h = hisobOl();
    if (!h) { kirishModal(); return; }
    var buyurtmalar = buyurtmalarimOl();
    var bHTML = buyurtmalar.length
      ? buyurtmalar.map(function (b) {
          return '<div class="kabinet-buyurtma">' +
            '<div class="kabinet-buyurtma-bosh"><b>' + xavfsiz(b.raqam) + '</b>' +
            '<span class="kabinet-holat">' + xavfsiz(b.holat || "Qabul qilindi") + '</span></div>' +
            '<div class="kabinet-buyurtma-meta">' + xavfsiz(String(b.sana || "").slice(0, 10)) +
            ' · ' + xavfsiz(b.jamiMatn || "") + '</div></div>';
        }).join("")
      : '<p class="modal-mayda">Hozircha buyurtmangiz yo\'q. Katalogdan tanlang.</p>';
    modalOch("Kabinet",
      '<div class="kabinet-bosh">' +
      '<span class="kabinet-avatar">' + xavfsiz(String(h.ism || "?").charAt(0).toUpperCase()) + '</span>' +
      '<div><strong>' + xavfsiz(h.ism) + '</strong><br>' +
      '<span class="modal-mayda">' + xavfsiz(telefonKorinishi(h.telefon)) + '</span></div></div>' +
      '<h3 class="kabinet-sarlavha">Buyurtmalarim</h3>' +
      '<div class="kabinet-royxat">' + bHTML + '</div>' +
      '<button type="button" class="tugma tugma-ikkilamchi tugma-toliq" id="hisob-chiq" style="margin-top:16px">Chiqish</button>',
      "modal--kabinet");
    var chiq = document.getElementById("hisob-chiq");
    if (chiq) chiq.addEventListener("click", function () {
      hisobChiq(); modalYop(); xabar("Hisobdan chiqdingiz", "ok"); badgelarYangila();
    });
  }

  // Ro'yxatdan o'tmagan bo'lsa — kirish oqimi; o'tgan bo'lsa darhol davom etadi
  function hisobTalab(tugagach) {
    var h = hisobOl();
    if (h) { if (tugagach) tugagach(h); return; }
    kirishModal(tugagach);
  }

  /* =================================================================
     11. SHAHAR TANLASH MODALI
  ================================================================== */

  function shaharModal() {
    if (typeof SHAHAR_KOORDINATA === "undefined") return;
    var korilgan = {}, tugmalar = "";
    for (var kalit in SHAHAR_KOORDINATA) {
      if (!Object.prototype.hasOwnProperty.call(SHAHAR_KOORDINATA, kalit)) continue;
      var nom = SHAHAR_KOORDINATA[kalit].nom;
      if (korilgan[nom]) continue;
      korilgan[nom] = true;
      tugmalar += '<button type="button" class="shahar-tugma" data-shahar="' +
        xavfsiz(kalit) + '">' + xavfsiz(nom) + "</button>";
    }
    var html =
      '<button type="button" class="tugma tugma-asosiy tugma-toliq" id="lokatsiya-tugma">' +
      "Joylashuvimni aniqlash</button>" +
      '<p class="modal-izoh">Yoki shaharni ro\'yxatdan tanlang:</p>' +
      '<div class="shahar-royxat">' + tugmalar + "</div>";

    var qatlam = modalOch("Shahringizni tanlang", html, "modal--shahar");

    qatlam.querySelector("#lokatsiya-tugma").addEventListener("click", function () {
      this.textContent = "Aniqlanmoqda...";
      this.disabled = true;
      lokatsiyaSora(function (natija) {
        modalYop();
        if (natija) {
          xabar(natija.shahar + " — eng yaqin filial: " + natija.filialNomi, "ok");
        }
      });
    });

    var tugmalarEl = qatlam.querySelectorAll("[data-shahar]");
    for (var i = 0; i < tugmalarEl.length; i++) {
      tugmalarEl[i].addEventListener("click", function () {
        var n = shaharniQolda(this.getAttribute("data-shahar"));
        modalYop();
        if (n) xabar(n.shahar + " tanlandi. " + n.yetkazish, "ok");
      });
    }
  }

  /* =================================================================
     12. "YANA KO'RSATISH" — bo'lak-bo'lak chizish
     -----------------------------------------------------------------
     Jasur aka: "har bitta bo'limda yana ko'rish o'ntasini bosadi,
     ko'rib bo'lgandan keyin yana bossa pastga yana o'ntasi chiqaveradi".
  ================================================================== */

  function yanaKorsatUla(sozlama) {
    var grid = sozlama.grid;
    var royxat = sozlama.royxat || [];
    var qadam = sozlama.qadam || 10;
    // Birinchi chizishda ko'proq ko'rsatiladi (ekran bo'sh ko'rinmasin),
    // keyin har bosishda `qadam` tadan qo'shiladi.
    var boshlangich = sozlama.boshlangich || qadam;
    var tugma = sozlama.tugma;
    var hisoblagich = sozlama.hisoblagich;
    var chizuvchi = sozlama.chizuvchi || (typeof mahsulotKartaHTML === "function" ? mahsulotKartaHTML : null);
    if (!grid || !chizuvchi) return;

    var korsatilgan = 0;

    function hisobniYangila() {
      if (hisoblagich) {
        hisoblagich.textContent = korsatilgan + " / " + royxat.length + " ta mahsulot";
      }
      if (tugma) {
        var qoldi = royxat.length - korsatilgan;
        tugma.hidden = qoldi <= 0;
        tugma.textContent = "Yana ko'rsatish" + (qoldi > 0 ? " (" + Math.min(qadam, qoldi) + ")" : "");
      }
    }

    function bolakChiz() {
      var hajm = (korsatilgan === 0) ? boshlangich : qadam;
      var bolak = royxat.slice(korsatilgan, korsatilgan + hajm);
      if (!bolak.length) return;
      grid.insertAdjacentHTML("beforeend", bolak.map(chizuvchi).join(""));
      korsatilgan += bolak.length;
      hisobniYangila();
      badgelarYangila();
      kartochkalarniUla(grid);
      if (typeof revealniQaytaUla === "function") revealniQaytaUla(grid);
    }

    grid.innerHTML = "";
    korsatilgan = 0;
    bolakChiz();

    if (tugma && !tugma.getAttribute("data-ulangan")) {
      tugma.setAttribute("data-ulangan", "1");
      tugma.addEventListener("click", bolakChiz);
    }
    return { yana: bolakChiz, holat: function () { return korsatilgan; } };
  }

  /* =================================================================
     13. KARTOCHKA HODISALARI (savat, yurak, rasm aylanishi)
  ================================================================== */

  function kartochkalarniUla(ildiz) {
    ildiz = ildiz || document;

    // Savatga qo'shish
    var savatTugmalar = ildiz.querySelectorAll("[data-savat-qosh]:not([data-ulangan])");
    for (var i = 0; i < savatTugmalar.length; i++) {
      savatTugmalar[i].setAttribute("data-ulangan", "1");
      savatTugmalar[i].addEventListener("click", function (h) {
        h.preventDefault();
        h.stopPropagation();
        var id = this.getAttribute("data-savat-qosh");
        if (savatdaBormi(id)) {
          window.location.href = "savat.html";
          return;
        }
        if (savatQosh(id)) {
          this.classList.add("savatda");
          this.textContent = "Savatda ✓";
          var m = mahsulot(id);
          xabar((m ? m.nomi.slice(0, 30) : "Mahsulot") + " savatga qo'shildi", "ok");
        }
      });
    }

    // Yurakcha (saralangan)
    var yuraklar = ildiz.querySelectorAll("[data-saralangan-id]:not([data-ulangan])");
    for (var j = 0; j < yuraklar.length; j++) {
      yuraklar[j].setAttribute("data-ulangan", "1");
      yuraklar[j].addEventListener("click", function (h) {
        h.preventDefault();
        h.stopPropagation();
        var id = this.getAttribute("data-saralangan-id");
        var qoshildi = saralanganTogla(id);
        xabar(qoshildi ? "Saralanganlarga qo'shildi" : "Saralanganlardan olib tashlandi", "ok");
      });
    }

    // Rasm aylanishi — sichqoncha tekkanda
    var aylanuvchi = ildiz.querySelectorAll("[data-rasmlar]:not([data-ulangan])");
    for (var k = 0; k < aylanuvchi.length; k++) {
      aylanuvchi[k].setAttribute("data-ulangan", "1");
      rasmAylanishiniUla(aylanuvchi[k]);
    }
  }

  function rasmAylanishiniUla(idish) {
    var rasmlar = idish.querySelectorAll(".karta-rasm-slayd");
    var nuqtalar = idish.querySelectorAll(".karta-nuqta");
    if (rasmlar.length < 2) return;
    var joriy = 0, taymer = null;

    function korsat(n) {
      joriy = n % rasmlar.length;
      for (var i = 0; i < rasmlar.length; i++) {
        rasmlar[i].classList.toggle("karta-rasm-slayd--faol", i === joriy);
      }
      for (var j = 0; j < nuqtalar.length; j++) {
        nuqtalar[j].classList.toggle("karta-nuqta--faol", j === joriy);
      }
    }

    function boshla() {
      if (taymer) return;
      // prefers-reduced-motion hurmat qilinadi — avtomatik aylanish bo'lmaydi
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      taymer = setInterval(function () { korsat(joriy + 1); }, 900);
    }
    function toxta() {
      if (taymer) { clearInterval(taymer); taymer = null; }
      korsat(0);
    }

    idish.addEventListener("mouseenter", boshla);
    idish.addEventListener("mouseleave", toxta);
    idish.addEventListener("focusin", boshla);
    idish.addEventListener("focusout", toxta);

    // Mobil: nuqtaga bosish
    for (var n = 0; n < nuqtalar.length; n++) {
      (function (indeks) {
        nuqtalar[indeks].addEventListener("click", function (h) {
          h.preventDefault(); h.stopPropagation(); korsat(indeks);
        });
      })(n);
    }
  }

  /* =================================================================
     14. ISHGA TUSHIRISH
  ================================================================== */

  function ishgaTushir() {
    badgelarYangila();
    kartochkalarniUla(document);
    navbatniYubor();   // navbatda yozuv qolgan bo'lsa, serverga urinib ko'radi

    // Header: hisob tugmasi
    var hisobTugmalar = document.querySelectorAll("[data-hisob-tugma]");
    for (var i = 0; i < hisobTugmalar.length; i++) {
      hisobTugmalar[i].addEventListener("click", function (h) {
        h.preventDefault();
        kabinetModal();
      });
    }

    // Header: shahar tanlash
    var shaharTugmalar = document.querySelectorAll("[data-shahar-tugma]");
    for (var j = 0; j < shaharTugmalar.length; j++) {
      shaharTugmalar[j].addEventListener("click", function (h) {
        h.preventDefault(); shaharModal();
      });
    }

    // Birinchi tashrifda shahar so'raladi (bir marta, bezovta qilmasdan)
    if (!manzilOl() && !oqi("arzonchi_shahar_sorandi", false)) {
      yoz("arzonchi_shahar_sorandi", true);
      setTimeout(function () { if (!manzilOl()) shaharModal(); }, 1500);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ishgaTushir);
  } else {
    ishgaTushir();
  }

  /* =================================================================
     TASHQI INTERFEYS
  ================================================================== */
  return {
    // narx / aksiya
    aksiyaOl: aksiyaOl, rasmlarOl: rasmlarOl, rangVariantlari: rangVariantlari,
    // nasiya
    nasiyaMumkinmi: nasiyaMumkinmi, nasiyaHisobla: nasiyaHisobla, nasiyaEngKichik: nasiyaEngKichik,
    // savat
    savatRoyxati: savatRoyxati, savatQosh: savatQosh, savatOchir: savatOchir,
    savatSoniOzgart: savatSoniOzgart, ombordagiMax: ombordagiMax, savatTanlaTogla: savatTanlaTogla,
    savatHammasiniTanla: savatHammasiniTanla, savatTozala: savatTozala,
    savatHisob: savatHisob, savatDonaSoni: savatDonaSoni, savatdaBormi: savatdaBormi,
    // saralangan / ko'rilgan
    saralanganRoyxati: saralanganRoyxati, saralanganTogla: saralanganTogla,
    saralanganMi: saralanganMi, korilganYoz: korilganYoz, korilganRoyxati: korilganRoyxati,
    // sotib olinganlar (fikr yozish huquqi)
    sotibOlinganRoyxati: sotibOlinganRoyxati, sotibOlinganYoz: sotibOlinganYoz, sotibOlganmi: sotibOlganmi,
    // sharh
    sharhlarOl: sharhlarOl, sharhQosh: sharhQosh, reytingOl: reytingOl, yulduzHTML: yulduzHTML,
    // hisob
    hisobOl: hisobOl, hisobBormi: hisobBormi, hisobYoz: hisobYoz, hisobChiq: hisobChiq,
    hisobTalab: hisobTalab, royxatModal: royxatModal, royxatYuklab: royxatYuklab,
    kirishModal: kirishModal, kabinetModal: kabinetModal, buyurtmalarimOl: buyurtmalarimOl,
    buyurtmaYoz: buyurtmaYoz,
    telefonTogrimi: telefonTogrimi, telefonKorinishi: telefonKorinishi,
    // lokatsiya
    manzilOl: manzilOl, lokatsiyaSora: lokatsiyaSora, shaharModal: shaharModal,
    yaqinFilialTop: yaqinFilialTop, yetkazishMuddati: yetkazishMuddati,
    // UI
    xabar: xabar, modalOch: modalOch, modalYop: modalYop,
    badgelarYangila: badgelarYangila, kartochkalarniUla: kartochkalarniUla,
    yanaKorsatUla: yanaKorsatUla
  };
})();
