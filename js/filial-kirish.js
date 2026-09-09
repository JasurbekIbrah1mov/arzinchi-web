/*
  =======================================================================
  FILIAL-KIRISH.JS — lokal filial ma'lumot kiritish asboby (Yo'l 1)
  =======================================================================
  Bu — Arzonchi saytining bir qismi EMAS. Bu alohida, faqat EGA o'zi
  kompyuterida ochadigan LOKAL asbob: 30 ta filialning manzili, ish
  vaqti va xarita koordinatasi ("kenglik"/"uzunlik") shu orqali
  kiritiladi, so'ng "Eksport qilish" tugmasi bilan tayyor
  malumotlar-filial.js fayli yuklab olinadi va saytga qo'yiladi.

  Muhim tamoyillar (arzonchi-sayt/js/do-kon.js bilan bir xil ruhda):
    1. Server YO'Q, API kalit YO'Q. Hammasi shu brauzerda ishlaydi,
       `file://` orqali ochilganda ham (internetsiz).
    2. localStorage har doim try/catch ichida — xotira o'chirilgan
       yoki to'lgan bo'lsa ham asbob QULAMAYDI, shunchaki saqlamaydi.
    3. Bu fayl `js/malumotlar-filial.js` ni FAQAT O'QIYDI (o'sha faylni
       <script> bilan ulaymiz). Uni to'g'ridan-to'g'ri TAHRIRLAMAYDI —
       yangi holat "Eksport" orqali alohida fayl sifatida yuklab
       beriladi, ega uni o'zi eskisining ustiga saqlaydi.
    4. "Saqlash" mantig'i BITTA saqla() funksiyasida jamlangan — Yo'l 2
       kelganda shu funksiya ichiga Cloudflare API chaqiruvi
       qo'shiladi, forma va tekshiruv qismi o'zgarmaydi (izohga
       qarang: "Yo'l 2" ko'prigi).
  =======================================================================
*/

var FILKIR = (function () {
  "use strict";

  /* =================================================================
     0. DOIMIYLAR
  ================================================================== */

  var LS_KALIT = "arzonchi_filial_kirish_qoralama_v1";

  // O'zbekiston chegarasi (Arxitektor/Dizayner topshirig'i: kenglik 37–46,
  // uzunlik 55–74). Shundan tashqarisi xato hisoblanadi.
  var KENGLIK_MIN = 37, KENGLIK_MAX = 46;
  var UZUNLIK_MIN = 55, UZUNLIK_MAX = 74;

  // Hudud ro'yxati — O'zbekistonning 14 ta hukumat birligi (12 viloyat +
  // Qoraqalpog'iston Respublikasi + Toshkent viloyati) va alohida
  // Toshkent shahri, alifbo tartibida.
  var HUDUDLAR = [
    "Andijon viloyati",
    "Buxoro viloyati",
    "Farg'ona viloyati",
    "Jizzax viloyati",
    "Namangan viloyati",
    "Navoiy viloyati",
    "Qashqadaryo viloyati",
    "Qoraqalpog'iston Respublikasi",
    "Samarqand viloyati",
    "Sirdaryo viloyati",
    "Surxondaryo viloyati",
    "Toshkent shahri",
    "Toshkent viloyati",
    "Xorazm viloyati"
  ];

  // Hafta kunlari — "kun bo'yicha" ish vaqti jadvali uchun
  var KUNLAR = [
    { toliq: "Dushanba", qisqa: "Dush" },
    { toliq: "Seshanba", qisqa: "Sesh" },
    { toliq: "Chorshanba", qisqa: "Chor" },
    { toliq: "Payshanba", qisqa: "Pay" },
    { toliq: "Juma", qisqa: "Jum" },
    { toliq: "Shanba", qisqa: "Shan" },
    { toliq: "Yakshanba", qisqa: "Yak" }
  ];

  // Eksport qilinadigan obyektlarda maydonlar shu tartibda yoziladi
  // (asl malumotlar-filial.js faylidagi tartib bilan bir xil).
  var MAYDON_TARTIBI = ["id", "nomi", "manzil", "telefon", "ishVaqti", "xaritaEmbed", "rasm", "holat", "kenglik", "uzunlik"];

  /* -----------------------------------------------------------------
     malumotlar-filial.js faylining ASL sarlavha-izohi va
     FILIALLAR_QOLDA oldidagi "TOZALANDI" izohi — Eksport qilinganda
     AYNAN shu matn qayta yoziladi (Arxitektor topshirig'i: "asl fayl
     sarlavha-izohi" saqlansin). `file://` rejimida raw faylni fetch()
     bilan o'qib bo'lmaydi (CORS), shuning uchun bu matn shu yerda
     qo'lda saqlanadi.
  ------------------------------------------------------------------ */
  var MFJ_SARLAVHA_IZOH = [
    "/*",
    "  =======================================================================",
    "  MA'LUMOT FAYLI — FILIALLAR RO'YXATI",
    "  =======================================================================",
    "  Bu fayl IKKI QISMDAN iborat:",
    "",
    "  1. FILIALLAR_AVTOMATIK — API'dagi telefon raqamli omborlar asosida",
    "     avtomatik hosil bo'ladigan blok. Har yangilashda nomi/telefon API'dan",
    '     yangilanadi, lekin "manzil", "ishVaqti", "xaritaEmbed", "rasm"',
    "     maydonlari SIZ TO'LDIRGANINGIZDAN KEYIN SAQLANIB QOLADI — skript",
    '     ularni qayta "TOLDIRING: ..." bilan almashtirmaydi. Oxirgi yangilash:',
    "     2026-08-29T12:40:38.380Z.",
    "",
    '     Agar bu blokda "TOLDIRING: manzil" yoki "TOLDIRING: ish vaqti" matnini',
    "     ko'rsangiz — o'sha qatorni haqiqiy manzil/ish vaqti bilan almashtiring,",
    "     keyingi yangilashda siz yozgan qiymat saqlanib qoladi.",
    "",
    "  2. FILIALLAR_QOLDA — siz butunlay qo'lda qo'shgan filiallar (API bilan",
    "     bog'liq bo'lmagan). Skript BU BLOKKA HECH QACHON TEGMAYDI.",
    "",
    "  ------------------------------------------------------------------",
    "  QO'LDA FILIAL QO'SHISH (pastdagi FILIALLAR_QOLDA ro'yxatiga):",
    "  ------------------------------------------------------------------",
    "  Maydonlar tushuntirishi:",
    '    id          — filialning ichki kodi (unikal, masalan "fl-30").',
    "    nomi        — filial nomi (ekranda ko'rinadi).",
    "    manzil      — to'liq manzil (ekranda ko'rinadi).",
    '    telefon     — filial telefon raqami, "+998..." formatida.',
    "    ishVaqti    — ish vaqti matni (ekranda ko'rinadi).",
    "    xaritaEmbed — Google Maps'dan olingan \"embed\" (o'rnatish) havolasi.",
    "    rasm        — filial rasmining fayl yo'li (ixtiyoriy, bo'sh \"\" bo'lishi mumkin).",
    "",
    "  NAMUNA OBYEKT:",
    "  {",
    '    id: "fl-30",',
    '    nomi: "Arzonchi — Yangi filial nomi",',
    "    manzil: \"Toshkent sh., ... tumani, ... ko'chasi ...\",",
    '    telefon: "+998901112233",',
    '    ishVaqti: "Har kuni 09:00 – 20:00",',
    '    xaritaEmbed: "https://www.google.com/maps?q=Toshkent&output=embed",',
    '    rasm: ""',
    "  }",
    "  =======================================================================",
    "*/"
  ].join("\n");

  var MFJ_TOZALANDI_IZOH = [
    "/*",
    "  ─────────────────────────────────────────────────────────────────────",
    "  2026-09-09 — TOZALANDI (ega qarori)",
    "  ─────────────────────────────────────────────────────────────────────",
    "  Bu blokda uchta QO'LDA yozilgan namuna yozuv bor edi. Ular fayl",
    "  boshidagi shablondan ko'chirilgani telefon raqamlaridan bilinib",
    "  turardi: +99890123456**7**, ...**8**, ...**9** — ketma-ket soxta.",
    "",
    "    • fl-02 «Yunusobod filiali» — ega: «Yunusobod filiali o'chiriladi».",
    "      → BUTUNLAY O'CHIRILDI.",
    "",
    "    • fl-01 «Chilonzor filiali» — API'da HAQIQIY yozuv bor",
    "      («Toshkent (Chilonzor) filiali»). Ikkitasi bir vaqtda ko'rinib,",
    "      ikki xil telefon ko'rsatardi. Ega: «bor filiallar qolsin» —",
    "      shuning uchun API'dagi haqiqiysi qoldi, qo'lda yozilgan",
    "      TAKRORI o'chirildi. Manzilini ega admin ekrani orqali kiritadi.",
    "",
    "    • fl-03 «Sergeli» — hozircha yo'q. Ega: «yo'q filiallarimiz nomi",
    "      qolsin, lekin hali ochilmagan bo'lib chiqsin».",
    "      → Nomi qoldi, `holat: \"ochilmagan\"` qo'yildi. Soxta telefon,",
    "      manzil va xarita OLIB TASHLANDI — mijoz mavjud bo'lmagan",
    "      raqamga qo'ng'iroq qilmasin.",
    "",
    "  YANGI MAYDON — `holat`:",
    '      "ochiq"      (yoki maydon umuman yo\'q) — oddiy ishlayotgan filial',
    "      \"ochilmagan\" — hali ochilmagan; kartochkada «Tez orada ochiladi»",
    "                     yorlig'i chiqadi, telefon/xarita ko'rsatilmaydi.",
    "  ─────────────────────────────────────────────────────────────────────",
    "*/"
  ].join("\n");

  /* =================================================================
     1. XAVFSIZ LOCALSTORAGE (do-kon.js dagi oqi()/yoz() bilan bir xil naqsh)
  ================================================================== */
  function oqi(zaxira) {
    try {
      var xom = window.localStorage.getItem(LS_KALIT);
      if (!xom) return zaxira;
      var q = JSON.parse(xom);
      return (q === null || q === undefined) ? zaxira : q;
    } catch (e) {
      return zaxira;
    }
  }

  function yoz(qiymat) {
    try {
      window.localStorage.setItem(LS_KALIT, JSON.stringify(qiymat));
      return true;
    } catch (e) {
      return false;
    }
  }

  /* =================================================================
     2. HTML EKRANLASH (XSS himoyasi — umumiy.js dagi htmlXavfsiz bilan bir xil)
  ================================================================== */
  function matnXavfsiz(qiymat) {
    if (qiymat === null || qiymat === undefined) return "";
    return String(qiymat)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* =================================================================
     3. MANBA MA'LUMOTI — js/malumotlar-filial.js dan o'qish
  ================================================================== */
  function manbaTayyormi() {
    return typeof FILIALLAR_AVTOMATIK !== "undefined" && Array.isArray(FILIALLAR_AVTOMATIK) &&
      typeof FILIALLAR_QOLDA !== "undefined" && Array.isArray(FILIALLAR_QOLDA) &&
      typeof FILIALLAR !== "undefined" && Array.isArray(FILIALLAR);
  }

  function filialTop(id) {
    for (var i = 0; i < FILIALLAR.length; i++) {
      if (FILIALLAR[i].id === id) return FILIALLAR[i];
    }
    return null;
  }

  // "ochilmagan" (masalan fl-03 Sergeli) — ro'yxatda ko'rinadi, lekin
  // tahrirlanmaydi va 30 talik progressga kirmaydi.
  function filialOchiqmi(filial) {
    return !!filial && filial.holat !== "ochilmagan";
  }

  /* =================================================================
     4. QORALAMA (DRAFT) — har filial uchun kiritilayotgan forma holati
     -----------------------------------------------------------------
     Bu obyekt localStorage'da saqlanadi. Diqqat: yangi qoralama HAR
     DOIM bo'sh/standart qiymatlar bilan boshlanadi (masalan ish vaqti
     "" — "09:00" EMAS) — aks holda tool shunchaki RO'YXATNI ko'rsatish
     uchun ochilganda ham filial "to'ldirilgan" deb noto'g'ri
     hisoblanib qolardi. Forma ekranida bo'sh qiymatlar o'rniga
     qulay taklif ("09:00") ko'rsatiladi, lekin bu faqat KO'RINISH —
     ega "Saqlash"ni bosmaguncha ma'lumot haqiqiy to'ldirilgan
     hisoblanmaydi.
  ================================================================== */
  var QORALAMA = {};

  function qoralamaniYukla() {
    var q = oqi({});
    QORALAMA = (q && typeof q === "object") ? q : {};
  }

  function qoralamaniSaqla() {
    yoz(QORALAMA);
  }

  function boshKunlarYarat() {
    var r = [];
    for (var i = 0; i < KUNLAR.length; i++) {
      r.push({ ochilish: "", yopilish: "", damOlish: false });
    }
    return r;
  }

  // Manba (asl fayl)dagi ish vaqti matnidan "HH:MM - HH:MM" ni
  // ajratishga urinamiz — topilsa formaga qulaylik uchun tayyor turadi.
  function ishVaqtidanVaqtAjrat(matn) {
    var mos = String(matn || "").match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
    return mos ? { ochilish: mos[1], yopilish: mos[2] } : null;
  }

  function yangiQoralama(filial) {
    var q = {
      hudud: (typeof filial.hudud === "string") ? filial.hudud : "",
      shaharTuman: "",
      kochaUy: "",
      moljal: (typeof filial.moljal === "string") ? filial.moljal : "",
      ishVaqtiUsul: "harkuni",
      harkuni: { ochilish: "", yopilish: "" },
      kunlar: boshKunlarYarat(),
      kenglik: (typeof filial.kenglik === "number") ? filial.kenglik : null,
      uzunlik: (typeof filial.uzunlik === "number") ? filial.uzunlik : null,
      punktimi: (typeof filial.punktMi === "boolean") ? filial.punktMi : true,
      faolmi: (typeof filial.faolmi === "boolean") ? filial.faolmi : true
    };
    // Manzil allaqachon (masalan qayta yuklangan eksport faylida) real
    // qiymat bo'lsa — ajratib bo'lmagani uchun to'liq matn "ko'cha va uy"
    // maydoniga tushadi, ega xohlasa qismlarga bo'lib qayta yozadi.
    if (manzilToldirilganmi(filial.manzil)) {
      q.kochaUy = filial.manzil;
    }
    if (manzilToldirilganmi(filial.ishVaqti)) {
      var vaqt = ishVaqtidanVaqtAjrat(filial.ishVaqti);
      if (vaqt) { q.harkuni = vaqt; }
    }
    return q;
  }

  function filialQoralamasi(filial) {
    if (!QORALAMA[filial.id]) {
      QORALAMA[filial.id] = yangiQoralama(filial);
    }
    return QORALAMA[filial.id];
  }

  /* =================================================================
     5. TEKSHIRISH / HISOBLASH YORDAMCHILARI
  ================================================================== */

  // "TOLDIRING: ..." yoki bo'sh — to'ldirilmagan hisoblanadi
  // (umumiy.js dagi maydonToldirilganmi() bilan bir xil qoida).
  function manzilToldirilganmi(matn) {
    var m = String(matn || "").trim();
    return m.length > 0 && m.toUpperCase().indexOf("TOLDIRING") !== 0;
  }

  function kenglikYaroqlimi(k) {
    return typeof k === "number" && isFinite(k) && k >= KENGLIK_MIN && k <= KENGLIK_MAX;
  }

  function uzunlikYaroqlimi(u) {
    return typeof u === "number" && isFinite(u) && u >= UZUNLIK_MIN && u <= UZUNLIK_MAX;
  }

  function yaxlitlaOlti(son) {
    if (typeof son !== "number" || !isFinite(son)) return null;
    return Math.round(son * 1000000) / 1000000;
  }

  function manzilMatniniYig(q) {
    var qismlar = [];
    if (q.hudud) qismlar.push(q.hudud);
    if (q.shaharTuman) qismlar.push(q.shaharTuman);
    if (q.kochaUy) qismlar.push(q.kochaUy);
    var asosiy = qismlar.join(", ");
    if (!asosiy) return "";
    if (q.moljal) asosiy += " (mo'ljal: " + q.moljal + ")";
    return asosiy;
  }

  // Ish vaqti matnini yig'adi. 3 bosqich: (1) "kun bo'yicha"da barcha
  // kunlar bir xil bo'lsa — "Har kuni ..." qisqa shakl; (2) Dush-Shan bir
  // xil + Yakshanba dam bo'lsa — qisqa shakl; (3) aks holda har kun
  // alohida sanaladi (har doim to'g'ri, hech narsa noto'g'ri "yig'ilmaydi").
  function ishVaqtiMatniniYig(q) {
    if (q.ishVaqtiUsul === "kunlar" && q.kunlar && q.kunlar.length === 7) {
      var kunlar = q.kunlar;
      var i;

      var barchaBirXil = true;
      for (i = 1; i < 7; i++) {
        if (kunlar[i].damOlish !== kunlar[0].damOlish ||
          kunlar[i].ochilish !== kunlar[0].ochilish ||
          kunlar[i].yopilish !== kunlar[0].yopilish) { barchaBirXil = false; break; }
      }
      if (barchaBirXil && !kunlar[0].damOlish && kunlar[0].ochilish && kunlar[0].yopilish) {
        return "Har kuni " + kunlar[0].ochilish + " – " + kunlar[0].yopilish;
      }

      var dush6BirXil = true;
      for (i = 1; i < 6; i++) {
        if (kunlar[i].damOlish || kunlar[i].ochilish !== kunlar[0].ochilish || kunlar[i].yopilish !== kunlar[0].yopilish) { dush6BirXil = false; break; }
      }
      if (dush6BirXil && !kunlar[0].damOlish && kunlar[0].ochilish && kunlar[0].yopilish && kunlar[6].damOlish) {
        return "Dushanbadan shanbagacha " + kunlar[0].ochilish + " – " + kunlar[0].yopilish + ", yakshanba dam olish kuni";
      }

      var hechBoshQiymatYoq = true;
      var qismlar = [];
      for (i = 0; i < 7; i++) {
        var kun = kunlar[i];
        if (kun.damOlish) {
          qismlar.push(KUNLAR[i].qisqa + " dam olish");
          hechBoshQiymatYoq = false;
        } else if (kun.ochilish && kun.yopilish) {
          qismlar.push(KUNLAR[i].qisqa + " " + kun.ochilish + "–" + kun.yopilish);
          hechBoshQiymatYoq = false;
        }
      }
      return hechBoshQiymatYoq ? "" : qismlar.join(", ");
    }

    var och = (q.harkuni && q.harkuni.ochilish) || "";
    var yop = (q.harkuni && q.harkuni.yopilish) || "";
    if (!och || !yop) return "";
    return "Har kuni " + och + " – " + yop;
  }

  // Filialning "hozirgi ko'rinishi" — qoralama manba ustiga qo'yiladi.
  // Qoralamada hali hech narsa kiritilmagan bo'lsa, natija manbadagi
  // (odatda hali TOLDIRING) qiymatga tushadi.
  function effektivHolat(filial) {
    var q = filialQoralamasi(filial);
    var manzilMatn = manzilMatniniYig(q);
    var ishVaqtiMatn = ishVaqtiMatniniYig(q);
    return {
      id: filial.id,
      nomi: filial.nomi,
      hudud: q.hudud,
      manzil: manzilMatn || filial.manzil,
      ishVaqti: ishVaqtiMatn || filial.ishVaqti,
      kenglik: q.kenglik,
      uzunlik: q.uzunlik
    };
  }

  function filialToldirilganmi(filial) {
    var e = effektivHolat(filial);
    return manzilToldirilganmi(e.manzil) && manzilToldirilganmi(e.ishVaqti) &&
      kenglikYaroqlimi(e.kenglik) && uzunlikYaroqlimi(e.uzunlik);
  }

  function progressHisobla() {
    var jami = 0, toldirilgan = 0;
    for (var i = 0; i < FILIALLAR.length; i++) {
      if (!filialOchiqmi(FILIALLAR[i])) continue;
      jami++;
      if (filialToldirilganmi(FILIALLAR[i])) toldirilgan++;
    }
    return {
      jami: jami,
      toldirilgan: toldirilgan,
      toldirilmagan: jami - toldirilgan,
      foiz: jami > 0 ? Math.round((toldirilgan / jami) * 100) : 0
    };
  }

  function telefonKorinishi(tel) {
    var t = String(tel || "");
    var mos = t.match(/^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!mos) return t;
    return "+998 " + mos[1] + " " + mos[2] + " " + mos[3] + " " + mos[4];
  }

  /* =================================================================
     6. KOORDINATA — Yandex/Google xarita havolasidan ajratish
     -----------------------------------------------------------------
     Kalit fikr: kenglik (37–46) va uzunlik (55–74) oralig'i BIR-BIRIGA
     UMUMAN TAQALMAYDI. Shu tufayli havoladagi ikkita sondan qaysi
     birortasi qaysi oraliqqa tushishini tekshirib, MANBA (Yandex "lon,lat"
     yoki Google "lat,lon") tartibidan qat'i nazar to'g'ri aniqlaymiz —
     sayt turini bilish shart emas.
  ================================================================== */
  function havoladanKoordinataAjrat(matn) {
    var xom = String(matn || "").trim();
    if (!xom) return null;

    var ochilgan = xom;
    try { ochilgan = decodeURIComponent(xom.replace(/\+/g, "%20")); } catch (e) { ochilgan = xom; }
    ochilgan = ochilgan.replace(/%5B/gi, "[").replace(/%5D/gi, "]").replace(/%2C/gi, ",");

    var juftRegex = /(-?\d{1,3}\.\d{3,8})\s*,\s*(-?\d{1,3}\.\d{3,8})/g;
    var mos;
    while ((mos = juftRegex.exec(ochilgan)) !== null) {
      var a = parseFloat(mos[1]);
      var b = parseFloat(mos[2]);
      if (kenglikYaroqlimi(a) && uzunlikYaroqlimi(b)) {
        return { kenglik: yaxlitlaOlti(a), uzunlik: yaxlitlaOlti(b) };
      }
      if (kenglikYaroqlimi(b) && uzunlikYaroqlimi(a)) {
        return { kenglik: yaxlitlaOlti(b), uzunlik: yaxlitlaOlti(a) };
      }
    }
    return null;
  }

  /* =================================================================
     7. RO'YXAT UCHUN MA'LUMOT TAYYORLASH
  ================================================================== */
  function faolFiliallarAsliTartibda() {
    var r = [];
    for (var i = 0; i < FILIALLAR.length; i++) {
      if (filialOchiqmi(FILIALLAR[i])) r.push(FILIALLAR[i]);
    }
    return r;
  }

  // Ro'yxat ekrani uchun: to'ldirilmaganlari TEPADA (Dizayner §2).
  function royxatKorinishiUchunOl(filtr, huduFiltr) {
    var faolHammasi = faolFiliallarAsliTartibda();
    var ochilmagan = [];
    for (var i = 0; i < FILIALLAR.length; i++) {
      if (!filialOchiqmi(FILIALLAR[i])) ochilmagan.push(FILIALLAR[i]);
    }

    faolHammasi.sort(function (a, b) {
      var ta = filialToldirilganmi(a), tb = filialToldirilganmi(b);
      if (ta !== tb) return ta ? 1 : -1;
      return String(a.nomi).localeCompare(String(b.nomi));
    });

    var natija = [];
    for (var j = 0; j < faolHammasi.length; j++) {
      var f = faolHammasi[j];
      if (filtr === "toldirilmagan" && filialToldirilganmi(f)) continue;
      if (filtr === "toldirilgan" && !filialToldirilganmi(f)) continue;
      if (huduFiltr) {
        var q = filialQoralamasi(f);
        if ((q.hudud || "") !== huduFiltr) continue;
      }
      natija.push(f);
    }
    return { faol: natija, ochilmagan: ochilmagan };
  }

  // "Saqlash va keyingisi" — joriydan keyingi TO'LDIRILMAGAN filial (asl,
  // o'zgarmas tartibda, aylanma tarzda qidiriladi).
  function keyingiToldirilmaganId(joriyId) {
    var royxat = faolFiliallarAsliTartibda();
    if (!royxat.length) return null;
    var boshlanish = 0;
    for (var i = 0; i < royxat.length; i++) {
      if (royxat[i].id === joriyId) { boshlanish = i; break; }
    }
    for (var offset = 1; offset <= royxat.length; offset++) {
      var idx = (boshlanish + offset) % royxat.length;
      if (!filialToldirilganmi(royxat[idx])) return royxat[idx].id;
    }
    return null;
  }

  /* =================================================================
     8. KICHIK UI YORDAMCHILARI — toast, tasdiq
  ================================================================== */
  var XABAR_TAYMER = null;

  function xabarKorsat(matn, tur) {
    var joy = document.getElementById("fk-toast-joy");
    if (!joy) return;
    var sinf = (tur === "xato") ? "fk-toast fk-toast--xato" : "fk-toast fk-toast--ok";
    var belgi = (tur === "xato") ? "&#10007;" : "&#10003;";
    joy.innerHTML = '<div class="' + sinf + '"><span class="fk-toast-belgi">' + belgi + '</span><span>' + matnXavfsiz(matn) + "</span></div>";
    joy.hidden = false;
    if (XABAR_TAYMER) clearTimeout(XABAR_TAYMER);
    XABAR_TAYMER = setTimeout(function () { joy.hidden = true; joy.innerHTML = ""; }, 3200);
  }

  function tasdiqSora(matn) {
    return window.confirm(matn);
  }

  /* =================================================================
     9. RO'YXAT EKRANI
  ================================================================== */
  var JORIY_FILTR = "hammasi";
  var JORIY_HUDUD_FILTR = "";

  function royxatQatoriHTML(filial) {
    var e = effektivHolat(filial);
    var manzilHTML = manzilToldirilganmi(e.manzil)
      ? matnXavfsiz(e.manzil)
      : '<span class="fk-yorliq-sariq">To\'ldirilmagan</span>';
    var vaqtHTML = manzilToldirilganmi(e.ishVaqti)
      ? matnXavfsiz(e.ishVaqti)
      : '<span class="fk-yorliq-sariq">To\'ldirilmagan</span>';
    var xaritaHTML = (kenglikYaroqlimi(e.kenglik) && uzunlikYaroqlimi(e.uzunlik))
      ? '<span class="fk-belgi-ok" title="Koordinata bor">&#10003;</span>'
      : '<span class="fk-yorliq-sariq">To\'ldirilmagan</span>';
    var huduHTML = e.hudud ? matnXavfsiz(e.hudud) : '<span class="fk-bosh">&mdash;</span>';

    return (
      '<div class="fk-qator fk-qator-grid">' +
      '<div class="fk-qator-nomi"><strong>' + matnXavfsiz(filial.nomi) + '</strong><span class="fk-qator-id">' + matnXavfsiz(filial.id) + "</span></div>" +
      "<div>" + huduHTML + "</div>" +
      "<div>" + manzilHTML + "</div>" +
      "<div>" + vaqtHTML + "</div>" +
      "<div>" + xaritaHTML + "</div>" +
      '<div><a href="#tahrir/' + encodeURIComponent(filial.id) + '" class="fk-tahrirlash">Tahrirlash</a></div>' +
      "</div>"
    );
  }

  function royxatOchilmaganQatoriHTML(filial) {
    return (
      '<div class="fk-qator fk-qator-grid fk-qator--ochilmagan">' +
      '<div class="fk-qator-nomi"><strong>' + matnXavfsiz(filial.nomi) + '</strong><span class="fk-qator-id">' + matnXavfsiz(filial.id) + "</span></div>" +
      "<div>&mdash;</div><div>&mdash;</div><div>&mdash;</div><div>&mdash;</div>" +
      '<div><span class="fk-tag-ochilmagan" title="Ega qarori: hali ochilmagan, tahrirlanmaydi">Ochilmagan</span></div>' +
      "</div>"
    );
  }

  function royxatEkraniniChiz() {
    var formaEkran = document.getElementById("fk-ekran-forma");
    if (formaEkran) formaEkran.hidden = true;
    var ekran = document.getElementById("fk-ekran-royxat");
    if (!ekran) return;
    ekran.hidden = false;

    var progres = progressHisobla();
    var royxat = royxatKorinishiUchunOl(JORIY_FILTR, JORIY_HUDUD_FILTR);

    var huduOptsHTML = '<option value="">Hudud bo\'yicha (hammasi)</option>';
    for (var i = 0; i < HUDUDLAR.length; i++) {
      var tanlanganmi = (JORIY_HUDUD_FILTR === HUDUDLAR[i]) ? " selected" : "";
      huduOptsHTML += '<option value="' + matnXavfsiz(HUDUDLAR[i]) + '"' + tanlanganmi + ">" + matnXavfsiz(HUDUDLAR[i]) + "</option>";
    }

    var qatorlarHTML = "";
    if (royxat.faol.length === 0) {
      qatorlarHTML = '<div class="fk-bosh-holat">Bu filtr bo\'yicha filial topilmadi.</div>';
    } else {
      for (var j = 0; j < royxat.faol.length; j++) qatorlarHTML += royxatQatoriHTML(royxat.faol[j]);
    }
    for (var m = 0; m < royxat.ochilmagan.length; m++) qatorlarHTML += royxatOchilmaganQatoriHTML(royxat.ochilmagan[m]);

    ekran.innerHTML =
      '<div class="fk-royxat-bosh">' +
      "<h1>Filiallar</h1>" +
      '<p class="fk-progress-matn">' + progres.jami + " ta &middot; <span class=\"fk-qizil\">" + progres.toldirilmagan + " tasi to'ldirilmagan</span></p>" +
      '<div class="fk-progress-track"><div class="fk-progress-fill" style="width:' + progres.foiz + '%"></div></div>' +
      "</div>" +
      '<div class="fk-filtr-qatori">' +
      '<button type="button" class="filtr-pill' + (JORIY_FILTR === "hammasi" ? " faol" : "") + '" data-filtr="hammasi">Hammasi</button>' +
      '<button type="button" class="filtr-pill' + (JORIY_FILTR === "toldirilmagan" ? " faol" : "") + '" data-filtr="toldirilmagan">To\'ldirilmagan</button>' +
      '<button type="button" class="filtr-pill' + (JORIY_FILTR === "toldirilgan" ? " faol" : "") + '" data-filtr="toldirilgan">To\'ldirilgan</button>' +
      '<select id="fk-hudud-filtr" class="fk-hudud-select" aria-label="Hudud bo\'yicha filtr">' + huduOptsHTML + "</select>" +
      "</div>" +
      '<div class="fk-jadval-qobiq"><div class="fk-jadval">' +
      '<div class="fk-jadval-bosh fk-qator-grid"><div>Nomi</div><div>Hudud</div><div>Manzil</div><div>Ish vaqti</div><div>Xarita nuqtasi</div><div></div></div>' +
      qatorlarHTML +
      "</div></div>";

    var chipTugmalar = ekran.querySelectorAll("[data-filtr]");
    for (var c = 0; c < chipTugmalar.length; c++) {
      chipTugmalar[c].addEventListener("click", function () {
        JORIY_FILTR = this.getAttribute("data-filtr");
        royxatEkraniniChiz();
      });
    }
    var huduSelect = document.getElementById("fk-hudud-filtr");
    if (huduSelect) {
      huduSelect.addEventListener("change", function () {
        JORIY_HUDUD_FILTR = this.value;
        royxatEkraniniChiz();
      });
    }
  }

  /* =================================================================
     10. FORMA EKRANI (tahrirlash)
  ================================================================== */
  var FORMA_IFLOSMI = false;
  var FORMA_JORIY_ID = null;

  var XATO_MAYDON_XARITASI = {
    hudud: { xato: "fk-xato-hudud", kirish: "fk-f-hudud" },
    shaharTuman: { xato: "fk-xato-shahar", kirish: "fk-f-shahar" },
    kochaUy: { xato: "fk-xato-kocha", kirish: "fk-f-kocha" },
    ishVaqti: { xato: "fk-xato-ishvaqti", kirish: "fk-f-harkuni-och" },
    koordinata: { xato: "fk-xato-koordinata", kirish: "fk-f-kenglik" }
  };

  function formaEkraniniChiz(id) {
    var filial = filialTop(id);
    if (!filial || !filialOchiqmi(filial)) { joyniOzgartir("#royxat"); return; }

    var royxatEkran = document.getElementById("fk-ekran-royxat");
    if (royxatEkran) royxatEkran.hidden = true;
    var ekran = document.getElementById("fk-ekran-forma");
    if (!ekran) return;
    ekran.hidden = false;

    FORMA_JORIY_ID = id;
    FORMA_IFLOSMI = false;

    var q = filialQoralamasi(filial);
    var progres = progressHisobla();

    var huduOptsHTML = '<option value="">Tanlang...</option>';
    for (var i = 0; i < HUDUDLAR.length; i++) {
      var tanlanganmi = (q.hudud === HUDUDLAR[i]) ? " selected" : "";
      huduOptsHTML += '<option value="' + matnXavfsiz(HUDUDLAR[i]) + '"' + tanlanganmi + ">" + matnXavfsiz(HUDUDLAR[i]) + "</option>";
    }

    var kunlarHTML = "";
    for (var k = 0; k < KUNLAR.length; k++) {
      var kun = q.kunlar[k] || { ochilish: "", yopilish: "", damOlish: false };
      kunlarHTML +=
        '<div class="fk-kun-qator">' +
        '<span class="fk-kun-nomi">' + KUNLAR[k].toliq + "</span>" +
        '<input type="time" data-kun-idx="' + k + '" data-kun-maydon="ochilish" value="' + matnXavfsiz(kun.ochilish || "09:00") + '"' + (kun.damOlish ? " disabled" : "") + ">" +
        '<span class="fk-kun-chiziq">&mdash;</span>' +
        '<input type="time" data-kun-idx="' + k + '" data-kun-maydon="yopilish" value="' + matnXavfsiz(kun.yopilish || "20:00") + '"' + (kun.damOlish ? " disabled" : "") + ">" +
        '<label class="fk-dam-belgi"><input type="checkbox" data-kun-idx="' + k + '" data-kun-maydon="damolish"' + (kun.damOlish ? " checked" : "") + "> Dam olish</label>" +
        "</div>";
    }

    var kunlarUsulmi = q.ishVaqtiUsul === "kunlar";
    var havolaKengligi = kenglikYaroqlimi(q.kenglik) ? q.kenglik : "";
    var havolaUzunligi = uzunlikYaroqlimi(q.uzunlik) ? q.uzunlik : "";

    ekran.innerHTML =
      '<div class="fk-forma-bosh">' +
      '<a href="#royxat" class="fk-orqaga">&larr; Ro\'yxatga qaytish</a>' +
      "<h1>" + matnXavfsiz(filial.nomi) + "</h1>" +
      '<p class="fk-progress-matn-kichik">' + progres.toldirilgan + " / " + progres.jami + " to'ldirildi</p>" +
      "</div>" +
      '<form id="fk-forma" novalidate>' +
      '<div class="fk-forma-grid">' +
      '<div class="maydon"><span>Filial nomi</span><input type="text" value="' + matnXavfsiz(filial.nomi) + '" disabled></div>' +
      '<div class="maydon"><span>Telefon</span><input type="text" value="' + matnXavfsiz(telefonKorinishi(filial.telefon)) + '" disabled></div>' +
      '<div class="maydon"><span>Hudud</span><select id="fk-f-hudud">' + huduOptsHTML + '</select><p class="maydon-xato" id="fk-xato-hudud" hidden></p></div>' +
      '<div class="maydon"><span>Shahar / tuman</span><input type="text" id="fk-f-shahar" value="' + matnXavfsiz(q.shaharTuman) + '" placeholder="masalan: Chilonzor tumani"><p class="maydon-xato" id="fk-xato-shahar" hidden></p></div>' +
      '<div class="maydon maydon--keng"><span>Ko\'cha va uy</span><input type="text" id="fk-f-kocha" value="' + matnXavfsiz(q.kochaUy) + '" placeholder="masalan: Bunyodkor ko\'chasi 12-uy"><p class="maydon-xato" id="fk-xato-kocha" hidden></p></div>' +
      '<div class="maydon maydon--keng"><span>Mo\'ljal — ixtiyoriy</span><input type="text" id="fk-f-moljal" value="' + matnXavfsiz(q.moljal) + '" placeholder="masalan: markaziy bozor yonida"></div>' +
      "</div>" +

      '<h3 class="fk-blok-sarlavha">Ish vaqti</h3>' +
      '<div class="fk-radio-qator">' +
      '<label><input type="radio" name="fk-ish-usul" value="harkuni"' + (!kunlarUsulmi ? " checked" : "") + "> Har kuni bir xil</label>" +
      '<label><input type="radio" name="fk-ish-usul" value="kunlar"' + (kunlarUsulmi ? " checked" : "") + "> Kun bo'yicha</label>" +
      "</div>" +
      '<div id="fk-ish-harkuni" class="fk-forma-grid"' + (kunlarUsulmi ? " hidden" : "") + ">" +
      '<div class="maydon"><span>Ochilish</span><input type="time" id="fk-f-harkuni-och" value="' + matnXavfsiz(q.harkuni.ochilish || "09:00") + '"></div>' +
      '<div class="maydon"><span>Yopilish</span><input type="time" id="fk-f-harkuni-yop" value="' + matnXavfsiz(q.harkuni.yopilish || "20:00") + '"></div>' +
      "</div>" +
      '<div id="fk-ish-kunlar" class="fk-kunlar-blok"' + (!kunlarUsulmi ? " hidden" : "") + ">" + kunlarHTML + "</div>" +
      '<p class="maydon-xato" id="fk-xato-ishvaqti" hidden></p>' +

      '<h3 class="fk-blok-sarlavha">Xarita nuqtasi</h3>' +
      '<div class="maydon">' +
      '<span>1-usul: Yandex yoki Google xarita havolasini shu yerga joylashtiring</span>' +
      '<input type="text" id="fk-f-havola" placeholder="https://yandex.uz/maps/... yoki https://maps.google.com/...">' +
      "</div>" +
      '<p id="fk-havola-natija" class="fk-havola-natija"></p>' +
      '<div class="fk-forma-grid">' +
      '<div class="maydon"><span>2-usul: Kenglik (latitude)</span><input type="number" step="0.000001" id="fk-f-kenglik" value="' + havolaKengligi + '" placeholder="masalan: 41.311081"></div>' +
      '<div class="maydon"><span>Uzunlik (longitude)</span><input type="number" step="0.000001" id="fk-f-uzunlik" value="' + havolaUzunligi + '" placeholder="masalan: 69.240562"></div>' +
      "</div>" +
      '<p class="maydon-xato" id="fk-xato-koordinata" hidden></p>' +
      '<div id="fk-xarita-oldindan" class="fk-xarita-oldindan" hidden></div>' +

      '<h3 class="fk-blok-sarlavha">Qo\'shimcha</h3>' +
      '<label class="fk-kalit-qator"><span class="fk-kalit"><input type="checkbox" id="fk-f-punkt"' + (q.punktimi ? " checked" : "") + '><span class="fk-kalit-trek"></span></span> Bu — topshirish punkti ham</label>' +
      '<label class="fk-kalit-qator"><span class="fk-kalit"><input type="checkbox" id="fk-f-faol"' + (q.faolmi ? " checked" : "") + '><span class="fk-kalit-trek"></span></span> Faolmi</label>' +
      '<p class="fk-eslatma">* Bu ikkala sozlama hozircha faqat shu asbobda saqlanadi; saytga ulash keyingi bosqichda (Yo\'l 2) qo\'shiladi.</p>' +

      '<div class="fk-tugmalar-qatori">' +
      '<button type="button" class="tugma tugma-ikkilamchi" id="fk-bekor-tugma">Bekor qilish</button>' +
      '<button type="button" class="tugma tugma-ikkilamchi" id="fk-saqlash-tugma">Saqlash</button>' +
      '<button type="submit" class="tugma tugma-asosiy" id="fk-saqlash-keyingi-tugma">Saqlash va keyingisi</button>' +
      "</div>" +
      "</form>";

    formaHodisalariniUla(id);
    xaritaOldindanKorishniYangila();
  }

  function ishVaqtiUsulKorinishiniYangila(kunlarMi) {
    var harkuniBlok = document.getElementById("fk-ish-harkuni");
    var kunlarBlok = document.getElementById("fk-ish-kunlar");
    if (harkuniBlok) harkuniBlok.hidden = kunlarMi;
    if (kunlarBlok) kunlarBlok.hidden = !kunlarMi;
  }

  function xaritaOldindanKorishniYangila() {
    var kEl = document.getElementById("fk-f-kenglik");
    var uEl = document.getElementById("fk-f-uzunlik");
    var qobiq = document.getElementById("fk-xarita-oldindan");
    if (!kEl || !uEl || !qobiq) return;
    var k = parseFloat(kEl.value);
    var u = parseFloat(uEl.value);
    if (kenglikYaroqlimi(k) && uzunlikYaroqlimi(u)) {
      qobiq.hidden = false;
      qobiq.innerHTML = '<iframe src="https://www.google.com/maps?q=' + k + "," + u +
        '&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Xarita oldindan ko\'rinishi"></iframe>';
    } else {
      qobiq.hidden = true;
      qobiq.innerHTML = "";
    }
  }

  function havolaniIshla() {
    var havolaEl = document.getElementById("fk-f-havola");
    var natijaEl = document.getElementById("fk-havola-natija");
    if (!havolaEl || !natijaEl) return;
    var matn = havolaEl.value;
    if (!matn || !matn.trim()) {
      natijaEl.textContent = "";
      natijaEl.className = "fk-havola-natija";
      return;
    }
    var n = havoladanKoordinataAjrat(matn);
    if (n) {
      var kEl = document.getElementById("fk-f-kenglik");
      var uEl = document.getElementById("fk-f-uzunlik");
      if (kEl) kEl.value = n.kenglik;
      if (uEl) uEl.value = n.uzunlik;
      natijaEl.textContent = "Aniqlandi: kenglik " + n.kenglik + ", uzunlik " + n.uzunlik + " (O'zbekiston chegarasida ✓)";
      natijaEl.className = "fk-havola-natija fk-havola-natija--ok";
      FORMA_IFLOSMI = true;
      xaritaOldindanKorishniYangila();
    } else {
      natijaEl.textContent = "Havoladan koordinata topilmadi. To'liq (qisqartirilmagan) havolani joylashtiring yoki pastda qo'lda kiriting.";
      natijaEl.className = "fk-havola-natija fk-havola-natija--xato";
    }
  }

  function formaHodisalariniUla(id) {
    var forma = document.getElementById("fk-forma");
    if (!forma) return;

    var iflosBelgila = function () { FORMA_IFLOSMI = true; };
    var kirishlar = forma.querySelectorAll("input, select");
    var i;
    for (i = 0; i < kirishlar.length; i++) {
      if (kirishlar[i].disabled) continue;
      kirishlar[i].addEventListener("input", iflosBelgila);
      kirishlar[i].addEventListener("change", iflosBelgila);
    }

    var usulRadio = forma.querySelectorAll('input[name="fk-ish-usul"]');
    for (i = 0; i < usulRadio.length; i++) {
      usulRadio[i].addEventListener("change", function () {
        ishVaqtiUsulKorinishiniYangila(this.value === "kunlar");
      });
    }

    var damBelgilar = forma.querySelectorAll('[data-kun-maydon="damolish"]');
    for (i = 0; i < damBelgilar.length; i++) {
      damBelgilar[i].addEventListener("change", function () {
        var idx = this.getAttribute("data-kun-idx");
        var och = forma.querySelector('[data-kun-idx="' + idx + '"][data-kun-maydon="ochilish"]');
        var yop = forma.querySelector('[data-kun-idx="' + idx + '"][data-kun-maydon="yopilish"]');
        if (och) och.disabled = this.checked;
        if (yop) yop.disabled = this.checked;
      });
    }

    var havolaEl = document.getElementById("fk-f-havola");
    if (havolaEl) {
      var havolaVaqti = null;
      havolaEl.addEventListener("input", function () {
        if (havolaVaqti) clearTimeout(havolaVaqti);
        havolaVaqti = setTimeout(havolaniIshla, 350);
      });
      havolaEl.addEventListener("blur", havolaniIshla);
    }

    var kEl = document.getElementById("fk-f-kenglik");
    var uEl = document.getElementById("fk-f-uzunlik");
    if (kEl) kEl.addEventListener("change", xaritaOldindanKorishniYangila);
    if (uEl) uEl.addEventListener("change", xaritaOldindanKorishniYangila);

    var bekorTugma = document.getElementById("fk-bekor-tugma");
    if (bekorTugma) {
      bekorTugma.addEventListener("click", function () {
        if (FORMA_IFLOSMI && !tasdiqSora("Saqlanmagan o'zgarishlar bor. Chiqishni xohlaysizmi?")) return;
        FORMA_IFLOSMI = false;
        joyniOzgartir("#royxat");
      });
    }

    var saqlashTugma = document.getElementById("fk-saqlash-tugma");
    if (saqlashTugma) {
      saqlashTugma.addEventListener("click", function () { saqla(id, false); });
    }

    forma.addEventListener("submit", function (hodisa) {
      hodisa.preventDefault();
      saqla(id, true);
    });
  }

  function formadanOqi() {
    var q = {};
    q.hudud = (document.getElementById("fk-f-hudud") || {}).value || "";
    q.shaharTuman = ((document.getElementById("fk-f-shahar") || {}).value || "").trim();
    q.kochaUy = ((document.getElementById("fk-f-kocha") || {}).value || "").trim();
    q.moljal = ((document.getElementById("fk-f-moljal") || {}).value || "").trim();

    var usulEl = document.querySelector('input[name="fk-ish-usul"]:checked');
    q.ishVaqtiUsul = usulEl ? usulEl.value : "harkuni";
    q.harkuni = {
      ochilish: (document.getElementById("fk-f-harkuni-och") || {}).value || "",
      yopilish: (document.getElementById("fk-f-harkuni-yop") || {}).value || ""
    };

    q.kunlar = [];
    for (var i = 0; i < KUNLAR.length; i++) {
      var och = document.querySelector('[data-kun-idx="' + i + '"][data-kun-maydon="ochilish"]');
      var yop = document.querySelector('[data-kun-idx="' + i + '"][data-kun-maydon="yopilish"]');
      var dam = document.querySelector('[data-kun-idx="' + i + '"][data-kun-maydon="damolish"]');
      q.kunlar.push({
        ochilish: och ? och.value : "",
        yopilish: yop ? yop.value : "",
        damOlish: !!(dam && dam.checked)
      });
    }

    var kEl = document.getElementById("fk-f-kenglik");
    var uEl = document.getElementById("fk-f-uzunlik");
    q.kenglik = (kEl && kEl.value !== "") ? yaxlitlaOlti(parseFloat(kEl.value)) : null;
    q.uzunlik = (uEl && uEl.value !== "") ? yaxlitlaOlti(parseFloat(uEl.value)) : null;

    q.punktimi = !!(document.getElementById("fk-f-punkt") || {}).checked;
    q.faolmi = !!(document.getElementById("fk-f-faol") || {}).checked;

    return q;
  }

  function formaniTekshir(q) {
    var xatolar = {};
    if (!q.hudud) xatolar.hudud = "Hududni tanlang.";
    if (!q.shaharTuman || q.shaharTuman.length < 2) xatolar.shaharTuman = "Shahar yoki tumanni kiriting.";
    if (!q.kochaUy || q.kochaUy.length < 3) xatolar.kochaUy = "Ko'cha va uy raqamini kiriting.";

    var ishVaqtiMatn = ishVaqtiMatniniYig(q);
    if (!ishVaqtiMatn) {
      xatolar.ishVaqti = "Ish vaqtini to'liq kiriting.";
    } else if (q.ishVaqtiUsul === "kunlar") {
      for (var i = 0; i < q.kunlar.length; i++) {
        var kun = q.kunlar[i];
        if (!kun.damOlish && (!kun.ochilish || !kun.yopilish)) {
          xatolar.ishVaqti = "Har bir kun uchun vaqt kiriting yoki 'Dam olish' belgilang.";
          break;
        }
      }
    }

    if (!kenglikYaroqlimi(q.kenglik) || !uzunlikYaroqlimi(q.uzunlik)) {
      xatolar.koordinata = "Koordinata O'zbekiston chegarasida bo'lishi kerak (kenglik 37–46, uzunlik 55–74).";
    }

    return xatolar;
  }

  function barchaXatolarniYashir() {
    for (var kalit in XATO_MAYDON_XARITASI) {
      if (!Object.prototype.hasOwnProperty.call(XATO_MAYDON_XARITASI, kalit)) continue;
      var el = document.getElementById(XATO_MAYDON_XARITASI[kalit].xato);
      if (el) { el.hidden = true; el.textContent = ""; }
    }
    var xatoKirishlar = document.querySelectorAll(".fk-kirish-xato");
    for (var i = 0; i < xatoKirishlar.length; i++) xatoKirishlar[i].classList.remove("fk-kirish-xato");
  }

  function xatolarniKorsat(xatolar) {
    var birinchiKirish = null;
    for (var kalit in xatolar) {
      if (!Object.prototype.hasOwnProperty.call(xatolar, kalit)) continue;
      var joy = XATO_MAYDON_XARITASI[kalit];
      if (!joy) continue;
      var xatoEl = document.getElementById(joy.xato);
      if (xatoEl) { xatoEl.textContent = xatolar[kalit]; xatoEl.hidden = false; }
      var kirishEl = document.getElementById(joy.kirish);
      if (kirishEl) {
        kirishEl.classList.add("fk-kirish-xato");
        if (!birinchiKirish) birinchiKirish = kirishEl;
      }
    }
    if (birinchiKirish) {
      birinchiKirish.scrollIntoView({ behavior: "smooth", block: "center" });
      birinchiKirish.focus();
    }
  }

  /* =================================================================
     11. SAQLASH — bitta funksiyaga jamlangan (Yo'l 2 uchun ko'prik)
  ================================================================== */
  function saqla(id, keyingigaOtish) {
    var filial = filialTop(id);
    if (!filial) return false;

    var q = formadanOqi();
    var xatolar = formaniTekshir(q);
    barchaXatolarniYashir();

    var xatoBormi = false;
    for (var kalit in xatolar) {
      if (Object.prototype.hasOwnProperty.call(xatolar, kalit)) { xatoBormi = true; break; }
    }
    if (xatoBormi) {
      xatolarniKorsat(xatolar);
      xabarKorsat("Formada xatolik bor. Belgilangan maydonlarni to'g'rilang.", "xato");
      return false;
    }

    QORALAMA[id] = q;
    qoralamaniSaqla();
    FORMA_IFLOSMI = false;

    /* === "Yo'l 2" ko'prigi ===
       Hozircha saqlash faqat localStorage'ga (yuqoridagi ikki qator)
       yozadi — server yo'q. Kelajakda Cloudflare backend ulanganda,
       aynan shu joyga (QORALAMA[id] tayyor bo'lgach) API so'rovi
       qo'shiladi. Forma, tekshiruv va navigatsiya mantig'i o'zgarmaydi
       — faqat saqlash manzili almashadi. */

    xabarKorsat("Saqlandi", "ok");

    if (keyingigaOtish) {
      var keyingiId = keyingiToldirilmaganId(id);
      if (keyingiId) {
        joyniOzgartir("#tahrir/" + encodeURIComponent(keyingiId));
      } else {
        xabarKorsat("Barcha faol filiallar to'ldirildi!", "ok");
        joyniOzgartir("#royxat");
      }
    } else {
      formaEkraniniChiz(id);
    }
    return true;
  }

  /* =================================================================
     12. EKSPORT — malumotlar-filial.js ni qayta hosil qilish
  ================================================================== */
  function jsQiymatMatni(v) {
    if (typeof v === "number") return isFinite(v) ? String(v) : "0";
    if (typeof v === "boolean") return v ? "true" : "false";
    if (v === null || v === undefined) return '""';
    return JSON.stringify(String(v));
  }

  function filialObyektMatni(obyekt) {
    var qatorlar = [];
    for (var i = 0; i < MAYDON_TARTIBI.length; i++) {
      var k = MAYDON_TARTIBI[i];
      if (!Object.prototype.hasOwnProperty.call(obyekt, k)) continue;
      qatorlar.push("    " + k + ": " + jsQiymatMatni(obyekt[k]));
    }
    return "  {\n" + qatorlar.join(",\n") + "\n  }";
  }

  // FILIALLAR_AVTOMATIK dagi bitta filial uchun eksport obyekti: id/nomi/
  // telefon/rasm o'zgarmaydi, manzil/ishVaqti to'ldirilgan qiymatga
  // (yoki hali TOLDIRING bo'lsa o'shandayligicha) almashadi, kenglik/
  // uzunlik faqat chegara ichida to'g'ri bo'lsagina qo'shiladi.
  function exportUchunFilialObyekti(filial) {
    var e = effektivHolat(filial);
    var natija = {
      id: filial.id,
      nomi: filial.nomi,
      manzil: e.manzil,
      telefon: filial.telefon,
      ishVaqti: e.ishVaqti,
      xaritaEmbed: filial.xaritaEmbed || "",
      rasm: filial.rasm || ""
    };
    if (filial.holat) natija.holat = filial.holat;

    if (kenglikYaroqlimi(e.kenglik) && uzunlikYaroqlimi(e.uzunlik)) {
      natija.kenglik = e.kenglik;
      natija.uzunlik = e.uzunlik;
      // xaritaEmbed bo'sh bo'lsa — endi bor koordinatadan avtomatik
      // to'ldiramiz (shu bilan filiallar.html'dagi mavjud xarita
      // iframe'i darrov ishlay boshlaydi). Ega/boshqa jarayon allaqachon
      // o'ziga xos embed qo'ygan bo'lsa — UNGA TEGILMAYDI.
      if (!natija.xaritaEmbed) {
        natija.xaritaEmbed = "https://www.google.com/maps?q=" + e.kenglik + "," + e.uzunlik + "&output=embed";
      }
    }
    return natija;
  }

  // FILIALLAR_QOLDA (masalan fl-03 Sergeli) — AYNAN shu ko'yidagicha,
  // hech narsa o'zgartirilmaydi.
  function exportUchunQoldaObyekti(filial) {
    var natija = {};
    for (var i = 0; i < MAYDON_TARTIBI.length; i++) {
      var k = MAYDON_TARTIBI[i];
      if (k === "kenglik" || k === "uzunlik") continue;
      if (Object.prototype.hasOwnProperty.call(filial, k)) natija[k] = filial[k];
    }
    return natija;
  }

  function eksportMatniniYarat() {
    var avtomatikMatnlar = [];
    for (var i = 0; i < FILIALLAR_AVTOMATIK.length; i++) {
      avtomatikMatnlar.push(filialObyektMatni(exportUchunFilialObyekti(FILIALLAR_AVTOMATIK[i])));
    }
    var qoldaMatnlar = [];
    for (var j = 0; j < FILIALLAR_QOLDA.length; j++) {
      qoldaMatnlar.push(filialObyektMatni(exportUchunQoldaObyekti(FILIALLAR_QOLDA[j])));
    }
    return MFJ_SARLAVHA_IZOH + "\n\n" +
      "const FILIALLAR_AVTOMATIK = [\n" + avtomatikMatnlar.join(",\n") + "\n];\n\n" +
      MFJ_TOZALANDI_IZOH + "\n" +
      "const FILIALLAR_QOLDA = [\n" + qoldaMatnlar.join(",\n") + "\n];\n\n" +
      "const FILIALLAR = FILIALLAR_AVTOMATIK.concat(FILIALLAR_QOLDA);\n";
  }

  function eksportZaxiraYuklab(matn) {
    try {
      var blob = new Blob([matn], { type: "text/javascript;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "malumotlar-filial.js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      xabarKorsat("Fayl yuklab olindi: malumotlar-filial.js", "ok");
    } catch (e) {
      xabarKorsat("Faylni yuklab bo'lmadi. Brauzer konsolini tekshiring.", "xato");
    }
  }

  // Eksport: Chrome/Edge'da imkon bo'lsa File System Access API bilan
  // to'g'ridan-to'g'ri saqlash (bonus, Arxitektor §3), bo'lmasa oddiy
  // yuklab olish (hamma brauzerda ishlaydi).
  function eksportQil() {
    if (!manbaTayyormi()) {
      xabarKorsat("Ma'lumot yuklanmagan, eksport qilib bo'lmaydi.", "xato");
      return;
    }
    var matn = eksportMatniniYarat();

    if (typeof window.showSaveFilePicker === "function") {
      window.showSaveFilePicker({
        suggestedName: "malumotlar-filial.js",
        types: [{ description: "JavaScript fayli", accept: { "text/javascript": [".js"] } }]
      }).then(function (tutqich) {
        return tutqich.createWritable().then(function (yozuvchi) {
          return yozuvchi.write(matn).then(function () { return yozuvchi.close(); });
        });
      }).then(function () {
        xabarKorsat("Fayl saqlandi: malumotlar-filial.js", "ok");
      }).catch(function (xato) {
        if (xato && xato.name === "AbortError") return; // ega bekor qildi
        eksportZaxiraYuklab(matn);
      });
    } else {
      eksportZaxiraYuklab(matn);
    }
  }

  /* =================================================================
     13. MARSHRUTLASH (#royxat / #tahrir/<id>)
  ================================================================== */
  var OLDINGI_MARSHRUT = "";
  var ICHKI_MARSHRUT_OZGARISHI = false;

  function joyniOzgartir(marshrut) {
    ICHKI_MARSHRUT_OZGARISHI = true;
    location.hash = marshrut;
    ekranniYangila();
  }

  function ekranniYangila() {
    var h = location.hash || "#royxat";
    var mos = h.match(/^#tahrir\/(.+)$/);
    if (mos) {
      var id = decodeURIComponent(mos[1]);
      var filial = filialTop(id);
      if (filial && filialOchiqmi(filial)) {
        formaEkraniniChiz(id);
      } else {
        joyniOzgartir("#royxat");
        return;
      }
    } else {
      royxatEkraniniChiz();
    }
    OLDINGI_MARSHRUT = location.hash || "#royxat";
  }

  function hashOzgarganda() {
    if (ICHKI_MARSHRUT_OZGARISHI) { ICHKI_MARSHRUT_OZGARISHI = false; return; }
    if (FORMA_IFLOSMI && !tasdiqSora("Saqlanmagan o'zgarishlar bor. Baribir chiqasizmi?")) {
      ICHKI_MARSHRUT_OZGARISHI = true;
      location.hash = OLDINGI_MARSHRUT;
      return;
    }
    FORMA_IFLOSMI = false;
    ekranniYangila();
  }

  function chiqishdanOldinTekshir(hodisa) {
    if (FORMA_IFLOSMI) {
      hodisa.preventDefault();
      hodisa.returnValue = "";
    }
  }

  /* =================================================================
     14. ISHGA TUSHIRISH
  ================================================================== */
  function manbaXatosiniKorsat() {
    var ekran = document.getElementById("fk-ekran-royxat");
    var formaEkran = document.getElementById("fk-ekran-forma");
    if (formaEkran) formaEkran.hidden = true;
    if (!ekran) return;
    ekran.hidden = false;
    ekran.innerHTML =
      '<div class="fk-xato-holat">' +
      "<h3>Ma'lumotlar yuklanmadi</h3>" +
      "<p>js/malumotlar-filial.js fayli topilmadi yoki buzilgan. Bu asbob shu fayl bilan bir loyihada " +
      "(<code>arzonchi-sayt/</code> ichida, <code>js/</code> papkasi yonida) turishi kerak.</p>" +
      "</div>";
  }

  function ishgaTushir() {
    qoralamaniYukla();

    if (!manbaTayyormi()) {
      manbaXatosiniKorsat();
      return;
    }

    var eksportTugma = document.getElementById("fk-eksport-tugma");
    if (eksportTugma) eksportTugma.addEventListener("click", eksportQil);

    window.addEventListener("hashchange", hashOzgarganda);
    window.addEventListener("beforeunload", chiqishdanOldinTekshir);

    ekranniYangila();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ishgaTushir);
  } else {
    ishgaTushir();
  }

  /* =================================================================
     TASHQI INTERFEYS (ixtiyoriy — konsoldan tekshirish uchun)
  ================================================================== */
  return {
    progressHisobla: progressHisobla,
    havoladanKoordinataAjrat: havoladanKoordinataAjrat,
    eksportMatniniYarat: eksportMatniniYarat,
    eksportQil: eksportQil
  };
})();
