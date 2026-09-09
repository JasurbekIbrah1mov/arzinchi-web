/*
  =======================================================================
  UMUMIY.JS — barcha sahifalarda ishlatiladigan yordamchi funksiyalar
  =======================================================================
  Bu faylni o'zgartirish shart emas. Bu yerda sayt uchun umumiy narsalar
  bor: narxni chiroyli yozish, rasm topilmasa nima ko'rsatish, mobil
  menyu tugmasi, joriy sahifani navigatsiyada belgilash va ma'lumot
  fayllari buzilgan bo'lsa sahifani oq ekran qilib qo'ymaslik.
  =======================================================================
*/

/* -----------------------------------------------------------------
   HTML EKRANLASH (XSS himoyasi)
   Ma'lumot fayllaridan kelgan HAR QANDAY matn innerHTML'ga qo'yishdan
   oldin shu funksiyadan o'tkaziladi — ma'lumot manbai buzilgan
   taqdirda ham yozuv zararli teg emas, oddiy matn bo'lib ko'rinadi.
------------------------------------------------------------------ */
function htmlXavfsiz(qiymat) {
  if (qiymat === null || qiymat === undefined) return "";
  return String(qiymat)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* -----------------------------------------------------------------
   KATEGORIYALAR RO'YXATI
   Kategoriya kod->nom xaritasi endi shu faylda EMAS, alohida
   js/malumotlar-kategoriya.js faylida (u yerdagi global KATEGORIYALAR
   obyekti). Bu fayl skriptlar/mahsulotlarni-yangilash.mjs tomonidan
   skriptlar/kategoriya-xaritasi.json asosida avtomatik generatsiya
   qilinadi. HTML fayllarda <script src="js/malumotlar-kategoriya.js">
   shu umumiy.js dan OLDIN ulangan bo'lishi kerak.
------------------------------------------------------------------ */
function kategoriyaNomi(kod) {
  if (typeof KATEGORIYALAR !== "undefined" && KATEGORIYALAR[kod]) return KATEGORIYALAR[kod];
  return kod;
}

/* -----------------------------------------------------------------
   NARXNI FORMATLASH: 3200000 -> "3 200 000 so'm"
   Barcha brauzerlarda bir xil ko'rinishi uchun toLocaleString'ga
   to'liq ishonmay, qo'shimcha regex bilan ham tozalaymiz.
------------------------------------------------------------------ */
function narxniFormatla(narx) {
  if (typeof narx !== "number" || isNaN(narx)) {
    return "Narx ko'rsatilmagan";
  }
  var butun = Math.round(narx).toString();
  // Har 3 ta raqamdan keyin bo'shliq qo'yish (o'ngdan chapga)
  var formatlangan = butun.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return formatlangan + " so'm";
}

/* -----------------------------------------------------------------
   RASM YOKI PLACEHOLDER
   Agar rasm yo'li bo'sh bo'lsa yoki rasm yuklanmasa (onerror), o'rniga
   "Rasm mavjud emas" belgisi chiqadi. Shu tufayli sayt egasi hali
   rasm qo'ymagan bo'lsa ham, sayt buzilib qolmaydi.
------------------------------------------------------------------ */
var PLACEHOLDER_SVG =
  '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
  '<rect x="3" y="5" width="18" height="14" rx="2"/>' +
  '<circle cx="8.5" cy="10.5" r="1.5"/>' +
  '<path d="M21 15l-5-5-4 4-3-3-6 6"/>' +
  "</svg>";

function placeholderHTML(nisbatSinfi) {
  var sinf = "rasm-placeholder" + (nisbatSinfi ? " " + nisbatSinfi : "");
  return (
    '<div class="' + sinf + '">' + PLACEHOLDER_SVG + "<span>Rasm mavjud emas</span></div>"
  );
}

/* <img onerror="rasmXatoligi(this)"> shu funksiyani chaqiradi.
   Ikki bosqich: avval ZAXIRA manzilga (tashqi CDN) o'tadi — lokal
   nusxa hali tayyorlanmagan bo'lishi mumkin; u ham ishlamasa
   "Rasm mavjud emas" belgisi qo'yiladi. */
function rasmXatoligi(imgEl) {
  var zaxira = imgEl.getAttribute("data-zaxira");
  if (zaxira) {
    imgEl.removeAttribute("data-zaxira");   // ikkinchi marta urinmaymiz
    imgEl.src = zaxira;
    return;
  }
  var nisbatSinfi = imgEl.getAttribute("data-nisbat") || "";
  var vaqtinchalik = document.createElement("div");
  vaqtinchalik.innerHTML = placeholderHTML(nisbatSinfi);
  imgEl.replaceWith(vaqtinchalik.firstElementChild);
}

/* -----------------------------------------------------------------
   RASM MANZILI XAVFSIZMI?
   Faqat http(s):// va nisbiy yo'llarga ruxsat. `javascript:` va `data:`
   sxemalari bloklanadi — xuddi filial xaritasidagi kabi (vizual audit
   №1 XSS hardening qoidasi). Zararli manzil kelsa, rasm o'rniga
   "Rasm mavjud emas" belgisi chiqadi, sahifa buzilmaydi.
------------------------------------------------------------------ */
function rasmManziliXavfsizmi(yol) {
  var s = String(yol || "").trim().toLowerCase();
  if (!s) return false;
  // Sxemali manzil bo'lsa — faqat http/https
  if (/^[a-z][a-z0-9+.-]*:/.test(s)) {
    return s.indexOf("http://") === 0 || s.indexOf("https://") === 0;
  }
  return true;   // nisbiy yo'l (rasmlar/mahsulotlar/... ) — xavfsiz
}

/* -----------------------------------------------------------------
   LOKAL RASM YO'LI
   -----------------------------------------------------------------
   Mahsulot rasmlari `skriptlar/rasmlarni-tayyorlash.mjs` orqali
   o'zimizga ko'chirilgan va siqilgan (2,24 MB -> ~50 KB).
   Uchta foyda: (1) sahifa ~20 barobar tez ochiladi, (2) tashqi CDN
   o'chsa sayt rasmsiz qolmaydi, (3) CORS to'sig'i ketadi — "Virtual
   ko'rinish" kompoziti shusiz umuman ishlamaydi.

   Lokal fayl topilmasa `rasmXatoligi()` avtomatik ASL manzilga
   qaytadi — ya'ni ko'chirish tugamagan bo'lsa ham sayt buzilmaydi.
------------------------------------------------------------------ */
function lokalRasmYoli(rasmYoli) {
  if (!rasmYoli) return "";
  var m = String(rasmYoli).match(/\/products\/([\w-]+)\/photo/);
  return m ? "rasmlar/mahsulotlar/" + m[1] + ".webp" : "";
}

// rasmYoli bo'sh yoki xavfsiz bo'lmasa placeholder, aks holda <img>
function rasmYokiPlaceholderHTML(rasmYoli, altMatn, sinf, nisbatSinfi) {
  var xavfsizAlt = htmlXavfsiz(altMatn || "Mahsulot rasmi");
  if (!rasmYoli || !rasmManziliXavfsizmi(rasmYoli)) {
    return placeholderHTML(nisbatSinfi);
  }
  var lokal = lokalRasmYoli(rasmYoli);
  var korsatiladigan = lokal || rasmYoli;
  return (
    '<img src="' + htmlXavfsiz(korsatiladigan) + '" alt="' + xavfsizAlt + '"' +
    (sinf ? ' class="' + sinf + '"' : "") +
    ' data-nisbat="' + (nisbatSinfi || "") + '"' +
    (lokal ? ' data-zaxira="' + htmlXavfsiz(rasmYoli) + '"' : "") +
    ' loading="lazy"' +
    ' onerror="rasmXatoligi(this)">'
  );
}

/* -----------------------------------------------------------------
   MA'LUMOT FAYLLARINI XAVFSIZ TEKSHIRISH
   malumotlar-mahsulot.js yoki malumotlar-filial.js fayli buzilgan
   (masalan vergul tushib qolgan) yoki bo'sh bo'lsa, sahifa oq ekran
   bo'lib qolmasligi uchun shu funksiyalar ishlatiladi.
------------------------------------------------------------------ */
function mahsulotlarRoyxatiTogri() {
  return typeof MAHSULOTLAR !== "undefined" && Array.isArray(MAHSULOTLAR) && MAHSULOTLAR.length > 0;
}

function filiallarRoyxatiTogri() {
  return typeof FILIALLAR !== "undefined" && Array.isArray(FILIALLAR) && FILIALLAR.length > 0;
}

function xatoXabariniChiz(konteynerId, sarlavha, matn) {
  var konteyner = document.getElementById(konteynerId);
  if (!konteyner) return;
  konteyner.innerHTML =
    '<div class="xato-xabar">' +
    "<h3>" + sarlavha + "</h3>" +
    "<p>" + matn + "</p>" +
    "</div>";
}

/* -----------------------------------------------------------------
   K11 — BO'SH HOLAT (TZ 02 §11) va "BALKI ... DEMOQCHIMISIZ?" (fuzzy)
   Bo'sh ekran hech qachon shunchaki bo'sh qolmaydi.
------------------------------------------------------------------ */
// Qayta ishlatiladigan bo'sh-holat bloki. opts: {ikonka(svg ichi), sarlavha,
// izohHTML|izoh, tugma(tayyor HTML), id}
function boshHolatHTML(opts) {
  opts = opts || {};
  var ikonka = opts.ikonka ||
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';
  var izoh = opts.izohHTML || (opts.izoh ? htmlXavfsiz(opts.izoh) : "");
  return '<div class="bosh-holat"' + (opts.id ? ' id="' + opts.id + '"' : "") + '>' +
    '<span class="bosh-holat-ikonka">' + ikonka + '</span>' +
    '<h2>' + htmlXavfsiz(opts.sarlavha || "") + '</h2>' +
    (izoh ? '<p class="bosh-holat-izoh">' + izoh + '</p>' : "") +
    (opts.tugma || "") +
    '</div>';
}

// Levenshtein masofasi (kichik, iterativ)
function _levenshtein(a, b) {
  a = String(a); b = String(b);
  var m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  var oldingi = [], joriy = [], i, j;
  for (j = 0; j <= n; j++) oldingi[j] = j;
  for (i = 1; i <= m; i++) {
    joriy[0] = i;
    for (j = 1; j <= n; j++) {
      var narx = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      joriy[j] = Math.min(joriy[j - 1] + 1, oldingi[j] + 1, oldingi[j - 1] + narx);
    }
    for (j = 0; j <= n; j++) oldingi[j] = joriy[j];
  }
  return joriy[n];
}

// Qidiruv lug'ati: brend + kategoriya nomlari + mahsulot nomidagi so'zlar
// (>=4 harf). lowercase -> ko'rsatiladigan shakl. Bir marta yig'iladi.
var _qidiruvLugati = null;
function qidiruvLugati() {
  if (_qidiruvLugati) return _qidiruvLugati;
  var jam = {}; // lowercase -> display
  function qosh(soz) {
    soz = String(soz || "").trim();
    if (soz.length < 4) return;
    if (!/[a-zЀ-ӿ]/i.test(soz)) return; // kamida bitta harf
    var lc = soz.toLowerCase();
    if (!jam[lc]) jam[lc] = soz;
  }
  if (typeof MAHSULOTLAR !== "undefined" && Array.isArray(MAHSULOTLAR)) {
    for (var i = 0; i < MAHSULOTLAR.length; i++) {
      qosh(MAHSULOTLAR[i].brend);
      var nom = String(MAHSULOTLAR[i].nomi || "");
      var bolaklar = nom.split(/[^0-9A-Za-zЀ-ӿ']+/);
      for (var w = 0; w < bolaklar.length; w++) qosh(bolaklar[w]);
    }
  }
  if (typeof KATEGORIYALAR !== "undefined") {
    for (var k in KATEGORIYALAR) {
      if (Object.prototype.hasOwnProperty.call(KATEGORIYALAR, k)) qosh(KATEGORIYALAR[k]);
    }
  }
  _qidiruvLugati = Object.keys(jam).map(function (lc) { return jam[lc]; });
  return _qidiruvLugati;
}

// "Balki X demoqchimisiz?" — eng yaqin lug'at so'zi (yoki null)
function taxminQil(sorov) {
  sorov = String(sorov || "").trim().toLowerCase();
  if (sorov.length < 3) return null;
  var lugat = qidiruvLugati(), eng = null, engD = Infinity;
  for (var i = 0; i < lugat.length; i++) {
    var t = lugat[i].toLowerCase();
    if (t === sorov || t.indexOf(sorov) >= 0) return null; // to'g'ri/qism-mos
    var d = _levenshtein(sorov, t);
    if (d < engD) { engD = d; eng = lugat[i]; }
  }
  var chegara = Math.max(1, Math.floor(sorov.length * 0.4));
  return (eng && engD > 0 && engD <= chegara) ? eng : null;
}

/* -----------------------------------------------------------------
   K4 — KIRITISH MAYDONI HOLATLARI (TZ 02 §4)
   xato blur da ko'rsatiladi; bir marta ko'rsatilgach har o'zgarishda
   qayta tekshiriladi. tekshir(qiymat) -> xato matni yoki "" (to'g'ri).
------------------------------------------------------------------ */
function maydonHolat(input, xato) {
  var maydon = input.closest ? input.closest(".maydon") : null;
  if (!maydon) return;
  var inline = maydon.querySelector(".maydon-xato-inline");
  maydon.classList.remove("maydon--xato", "maydon--togri");
  if (xato) {
    maydon.classList.add("maydon--xato");
    if (!inline) {
      inline = document.createElement("p");
      inline.className = "maydon-xato-inline";
      maydon.appendChild(inline);
    }
    inline.textContent = xato;
    inline.hidden = false;
  } else {
    if (xato === "") maydon.classList.add("maydon--togri");
    if (inline) inline.hidden = true;
  }
}

function maydonUla(input, tekshir) {
  if (!input) return function () { return true; };
  var korsatildi = false;
  function yur() {
    var x = tekshir(input.value);
    maydonHolat(input, x);
    return !x;
  }
  input.addEventListener("blur", function () {
    if (input.value.trim() !== "" || korsatildi) { korsatildi = true; yur(); }
  });
  input.addEventListener("input", function () { if (korsatildi) yur(); });
  return function () { korsatildi = true; return yur(); };
}

function mahsulotniTop(id) {
  if (!mahsulotlarRoyxatiTogri()) return null;
  for (var i = 0; i < MAHSULOTLAR.length; i++) {
    if (MAHSULOTLAR[i].id === id) return MAHSULOTLAR[i];
  }
  return null;
}

function filialniTop(id) {
  if (!filiallarRoyxatiTogri()) return null;
  for (var i = 0; i < FILIALLAR.length; i++) {
    if (FILIALLAR[i].id === id) return FILIALLAR[i];
  }
  return null;
}

/* -----------------------------------------------------------------
   MAHSULOT KARTOCHKASI HTML'I
   Bosh sahifa (bosh-sahifa.js) va katalog (katalog.js) shu bitta
   funksiyadan foydalanadi — ikkalasida kartochka bir xil ko'rinsin.
------------------------------------------------------------------ */
function mahsulotKartaHTML(mahsulot) {
  var havola = "mahsulot.html?id=" + encodeURIComponent(mahsulot.id);
  var xavfsizNom = htmlXavfsiz(mahsulot.nomi);

  /* --- 1. RASM BLOKI (yorliqlar bilan) -------------------------------
     Bir nechta rasm bo'lsa — sichqoncha tekkanda aylanadi (do-kon.js).
     Bitta bo'lsa — oddiy <img>, hech qanday ortiqcha element yo'q.    */
  var rasmlar = (typeof DOKON !== "undefined") ? DOKON.rasmlarOl(mahsulot) : (mahsulot.rasm ? [mahsulot.rasm] : []);
  var rasmIchi, aylanuvchiAtribut = "";

  if (rasmlar.length > 1) {
    aylanuvchiAtribut = " data-rasmlar";
    rasmIchi = "";
    for (var r = 0; r < rasmlar.length; r++) {
      if (!rasmManziliXavfsizmi(rasmlar[r])) continue;
      rasmIchi +=
        '<img src="' + htmlXavfsiz(rasmlar[r]) + '" alt="' + xavfsizNom + '"' +
        ' class="karta-rasm-slayd' + (r === 0 ? " karta-rasm-slayd--faol" : "") + '"' +
        ' loading="lazy" onerror="rasmXatoligi(this)">';
    }
    rasmIchi += '<span class="karta-nuqtalar">';
    for (var n = 0; n < rasmlar.length; n++) {
      rasmIchi += '<span class="karta-nuqta' + (n === 0 ? " karta-nuqta--faol" : "") + '"></span>';
    }
    rasmIchi += "</span>";
  } else {
    rasmIchi = rasmYokiPlaceholderHTML(mahsulot.rasm, mahsulot.nomi, "", "");
  }

  /* --- 2. YORLIQLAR (rasm ustida) ------------------------------------ */
  var aksiya = (typeof DOKON !== "undefined") ? DOKON.aksiyaOl(mahsulot) : null;
  var yorliqlar = "";
  if (!mahsulot.mavjud) {
    yorliqlar += '<span class="yorliq yorliq--yoq">Mavjud emas</span>';
  } else {
    if (aksiya) {
      yorliqlar += '<span class="yorliq yorliq--chegirma">-' + aksiya.chegirmaFoiz + "%</span>";
    }
    if (typeof mahsulot.qoldiq === "number" && mahsulot.qoldiq > 0 && mahsulot.qoldiq <= 3) {
      yorliqlar += '<span class="yorliq yorliq--kam">Kam qoldi</span>';
    }
  }
  if (yorliqlar) yorliqlar = '<span class="karta-yorliqlar">' + yorliqlar + "</span>";

  /* --- 3. NARX BLOKI (nomdan YUQORIDA — DIZAYN.md v3) ---------------- */
  var narxBlok;
  if (mahsulot.mavjud) {
    narxBlok = '<div class="mahsulot-karta-narx">' + narxniFormatla(mahsulot.narx) + "</div>";

    if (aksiya) {
      narxBlok +=
        '<div class="narx-eski-qator">' +
        '<span class="mahsulot-karta-narx-eski">' + narxniFormatla(aksiya.eskiNarx) + "</span>" +
        '<span class="mahsulot-karta-chegirma">-' + aksiya.chegirmaFoiz + "%</span>" +
        "</div>";
    }

    // Muddatli to'lov — SARIQ yorliqda (qizil CTA'da band)
    if (typeof DOKON !== "undefined") {
      var nasiya = DOKON.nasiyaEngKichik(mahsulot.narx);
      if (nasiya) {
        narxBlok += '<span class="nasiya-yorliq">' + narxniFormatla(nasiya.oylik) + "/oyiga</span>";
      }
    }
  } else {
    narxBlok = '<span class="holat-yoq">Hozircha mavjud emas</span>';
  }

  /* --- 4. REYTING — FAQAT haqiqiy sharh bo'lsa chiqadi ---------------- */
  var reytingHTML = "";
  if (typeof DOKON !== "undefined") {
    var reyting = DOKON.reytingOl(mahsulot.id);
    if (reyting) {
      reytingHTML =
        '<div class="karta-reyting">' + DOKON.yulduzHTML(reyting.ortacha) +
        "<span>" + reyting.ortacha + " (" + reyting.soni + ")</span></div>";
    }
  }

  /* --- 5. META (brend + kod) va QOLDIQ -------------------------------- */
  var meta = [];
  if (mahsulot.brend) meta.push(htmlXavfsiz(mahsulot.brend));
  if (mahsulot.kod) meta.push("Kod " + htmlXavfsiz(mahsulot.kod));
  var metaHTML = meta.length ? '<div class="mahsulot-karta-meta">' + meta.join(" &middot; ") + "</div>" : "";

  var qoldiqHTML = "";
  if (mahsulot.mavjud && typeof mahsulot.qoldiq === "number" && mahsulot.qoldiq > 0) {
    var kam = mahsulot.qoldiq <= 3;
    qoldiqHTML = '<div class="mahsulot-karta-qoldiq' + (kam ? " mahsulot-karta-qoldiq--kam" : "") + '">' +
      (kam ? "Atigi " + mahsulot.qoldiq + " dona qoldi" : mahsulot.qoldiq + " dona mavjud") + "</div>";
  }

  /* --- 6. CTA --------------------------------------------------------- */
  var savatda = (typeof DOKON !== "undefined") && DOKON.savatdaBormi(mahsulot.id);
  var cta;
  if (mahsulot.mavjud) {
    cta = '<button type="button" class="karta-cta' + (savatda ? " savatda" : "") + '"' +
      ' data-savat-qosh="' + htmlXavfsiz(mahsulot.id) + '">' +
      (savatda ? "Savatda &#10003;" : "Savatga") + "</button>";
  } else {
    cta = '<a href="' + havola + '" class="karta-cta" style="display:block;line-height:40px;text-align:center;' +
      'text-decoration:none;background:var(--tugma-ikki-rest);color:var(--tugma-ikki-matn)">Batafsil</a>';
  }

  /* --- 7. YIG'ISH ------------------------------------------------------ */
  return (
    '<article class="mahsulot-karta">' +
    '<a href="' + havola + '" class="mahsulot-karta-rasm"' + aylanuvchiAtribut + ' aria-label="' + xavfsizNom + '">' +
    rasmIchi + yorliqlar +
    "</a>" +
    '<button type="button" class="yurak" data-saralangan-id="' + htmlXavfsiz(mahsulot.id) + '"' +
    ' aria-pressed="false" aria-label="Saralanganlarga qo\'shish" title="Saralanganlarga qo\'shish">&#9825;</button>' +
    '<div class="mahsulot-karta-tarkib">' +
    '<div class="mahsulot-karta-narx-blok">' + narxBlok + "</div>" +
    '<h4 class="mahsulot-karta-nom"><a href="' + havola + '">' + xavfsizNom + "</a></h4>" +
    reytingHTML +
    metaHTML +
    qoldiqHTML +
    cta +
    "</div>" +
    "</article>"
  );
}

/* -----------------------------------------------------------------
   FILIAL KARTOCHKASI HTML'I (qisqa, xaritasiz — bosh sahifada)
------------------------------------------------------------------ */
/* -----------------------------------------------------------------
   FILIAL HOLATI — uchta yordamchi
   -----------------------------------------------------------------
   Muammo: API'dan kelgan 30 dan ortiq filialda manzil va ish vaqti
   o'rniga `"TOLDIRING: manzil"` degan xizmat yozuvi turibdi va u
   MIJOZGA ko'rinib qolgan edi. Ega manzillarni admin ekrani orqali
   o'zi kiritadi (TZ 13 §3.1, 15-fayl) — shu paytgacha kartochkada
   xizmat yozuvi emas, tushunarli holat ko'rsatiladi.
------------------------------------------------------------------ */
function filialOchiqmi(filial) {
  return !filial || filial.holat !== "ochilmagan";
}

// "TOLDIRING: ..." yoki bo'sh qiymat — to'ldirilmagan hisoblanadi
function maydonToldirilganmi(qiymat) {
  var q = String(qiymat || "").trim();
  return q.length > 0 && q.toUpperCase().indexOf("TOLDIRING") !== 0;
}

function filialYorligiHTML(filial) {
  if (!filialOchiqmi(filial)) {
    return '<span class="filial-yorliq filial-yorliq--tez">Tez orada ochiladi</span>';
  }
  if (!maydonToldirilganmi(filial.manzil)) {
    return '<span class="filial-yorliq filial-yorliq--toliqmas">Manzil kiritilmagan</span>';
  }
  return "";
}

/* Bitta qator: ikonka + matn. To'ldirilmagan bo'lsa umuman chizilmaydi. */
function filialQatoriHTML(ikonka, qiymat, havolami) {
  if (!maydonToldirilganmi(qiymat)) return "";
  var ichki = havolami
    ? '<a href="tel:' + htmlXavfsiz(qiymat) + '">' + htmlXavfsiz(qiymat) + "</a>"
    : "<span>" + htmlXavfsiz(qiymat) + "</span>";
  return '<div class="filial-qator' + (havolami ? " telefon-qator" : "") + '">' + ikonka + ichki + "</div>";
}

var FILIAL_IKONKA_JOY =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
var FILIAL_IKONKA_TEL =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
var FILIAL_IKONKA_VAQT =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';

function filialQisqaKartaHTML(filial) {
  var ochiq = filialOchiqmi(filial);
  return (
    '<div class="filial-karta' + (ochiq ? "" : " filial-karta--yopiq") + '">' +
    "<h3>" + htmlXavfsiz(filial.nomi) + "</h3>" +
    filialYorligiHTML(filial) +
    (ochiq
      ? filialQatoriHTML(FILIAL_IKONKA_JOY, filial.manzil, false) +
        filialQatoriHTML(FILIAL_IKONKA_TEL, filial.telefon, true) +
        filialQatoriHTML(FILIAL_IKONKA_VAQT, filial.ishVaqti, false)
      : '<p class="filial-izoh">Bu filial hali ochilmagan. Ochilishi haqida ijtimoiy tarmoqlarimizda xabar beramiz.</p>') +
    "</div>"
  );
}

/* -----------------------------------------------------------------
   FILIAL KARTOCHKASI HTML'I (TO'LIQ — xarita bilan, filiallar.html uchun)
------------------------------------------------------------------ */
function filialToliqKartaHTML(filial) {
  var ochiq = filialOchiqmi(filial);
  var rasmHTML = rasmYokiPlaceholderHTML(filial.rasm, filial.nomi, "", "nisbat-16-9");
  // Xarita faqat https:// bilan boshlansa va filial OCHIQ bo'lsa chiziladi (XSS himoyasi)
  var xaritaHTML = (ochiq && filial.xaritaEmbed && String(filial.xaritaEmbed).indexOf("https://") === 0)
    ? '<iframe src="' + htmlXavfsiz(filial.xaritaEmbed) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + htmlXavfsiz(filial.nomi) + ' — xarita"></iframe>'
    : "";
  return (
    '<div class="filial-karta' + (ochiq ? "" : " filial-karta--yopiq") + '">' +
    rasmHTML +
    "<h3>" + htmlXavfsiz(filial.nomi) + "</h3>" +
    filialYorligiHTML(filial) +
    (ochiq
      ? filialQatoriHTML(FILIAL_IKONKA_JOY, filial.manzil, false) +
        filialQatoriHTML(FILIAL_IKONKA_TEL, filial.telefon, true) +
        filialQatoriHTML(FILIAL_IKONKA_VAQT, filial.ishVaqti, false) +
        xaritaHTML
      : '<p class="filial-izoh">Bu filial hali ochilmagan. Ochilishi haqida ijtimoiy tarmoqlarimizda xabar beramiz.</p>') +
    "</div>"
  );
}

// filiallar.html sahifasida #filiallar-sahifa-grid bo'lsa, avtomatik to'ldiriladi
document.addEventListener("DOMContentLoaded", function () {
  var konteyner = document.getElementById("filiallar-sahifa-grid");
  if (!konteyner) return;

  if (!filiallarRoyxatiTogri()) {
    xatoXabariniChiz(
      "filiallar-sahifa-grid",
      "Filiallar ro'yxatini ko'rsatib bo'lmadi",
      "Ma'lumotlar faylida xatolik bo'lishi mumkin (js/malumotlar-filial.js). Iltimos, faylni tekshiring yoki sayt egasiga xabar bering."
    );
    return;
  }

  konteyner.innerHTML = FILIALLAR.map(filialToliqKartaHTML).join("");
});

// aloqa.html sahifasida #aloqa-xarita-blok bo'lsa, birinchi filial manzili va xaritasi ko'rsatiladi
document.addEventListener("DOMContentLoaded", function () {
  var konteyner = document.getElementById("aloqa-xarita-blok");
  if (!konteyner) return;

  if (!filiallarRoyxatiTogri()) {
    xatoXabariniChiz(
      "aloqa-xarita-blok",
      "Manzil ma'lumotini ko'rsatib bo'lmadi",
      "Ma'lumotlar faylida xatolik bo'lishi mumkin (js/malumotlar-filial.js)."
    );
    return;
  }

  var filial = FILIALLAR[0];
  // Xarita manzili faqat https:// bilan boshlansa chiziladi (XSS himoyasi)
  var xaritaHTML = (filial.xaritaEmbed && String(filial.xaritaEmbed).indexOf("https://") === 0)
    ? '<iframe src="' + htmlXavfsiz(filial.xaritaEmbed) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + htmlXavfsiz(filial.nomi) + ' — xarita"></iframe>'
    : "";
  konteyner.innerHTML =
    "<h3>" + htmlXavfsiz(filial.nomi) + "</h3>" +
    '<div class="filial-qator">' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
    "<span>" + htmlXavfsiz(filial.manzil) + "</span>" +
    "</div>" +
    xaritaHTML +
    '<p class="aloqa-xarita-havola"><a href="filiallar.html">Barcha filiallarni ko\'rish →</a></p>';
});

/* -----------------------------------------------------------------
   MOBIL HAMBURGER MENYU
------------------------------------------------------------------ */
function hamburgerniIshgaTushir() {
  var tugma = document.querySelector(".hamburger-tugma");
  var menyu = document.querySelector(".header-nav");
  if (!tugma || !menyu) return;

  tugma.addEventListener("click", function () {
    var ochiqmi = menyu.classList.toggle("ochiq");
    tugma.classList.toggle("ochiq", ochiqmi);
    tugma.setAttribute("aria-expanded", ochiqmi ? "true" : "false");
  });

  // Havolaga bosilganda menyu yopilsin (mobil)
  var havolalar = menyu.querySelectorAll("a");
  havolalar.forEach(function (havola) {
    havola.addEventListener("click", function () {
      menyu.classList.remove("ochiq");
      tugma.classList.remove("ochiq");
      tugma.setAttribute("aria-expanded", "false");
    });
  });
}

/* -----------------------------------------------------------------
   JORIY SAHIFANI NAVIGATSIYADA BELGILASH
   Har sahifada <body data-sahifa="..."> va nav havolalarida
   data-sahifa="..." atributi bor. Ular mos kelsa "faol" sinfi
   qo'shiladi.
------------------------------------------------------------------ */
function faolSahifaniBelgila() {
  var joriy = document.body.getAttribute("data-sahifa");
  if (!joriy) return;
  var havolalar = document.querySelectorAll(".header-nav a[data-sahifa]");
  havolalar.forEach(function (havola) {
    if (havola.getAttribute("data-sahifa") === joriy) {
      havola.classList.add("faol");
      havola.setAttribute("aria-current", "page");
    }
  });
}

// Sahifa yuklanganda umumiy narsalarni ishga tushirish
document.addEventListener("DOMContentLoaded", function () {
  hamburgerniIshgaTushir();
  faolSahifaniBelgila();
});
