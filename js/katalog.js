/*
  KATALOG.JS — faqat katalog.html sahifasida ishlatiladi.
  Vazifasi: kategoriya filtri, qidiruv va saralashni BIRGA ishlaydigan
  qilib, mahsulotlar gridini chizish.
*/

// Joriy holat — uchala boshqaruv elementi ham shu o'zgaruvchilarni o'qiydi/yozadi
var joriyKategoriya = "hammasi";
var joriyQidiruv = "";
var joriySaralash = "standart";
var faqatAksiya = false;   // ?aksiya=1 bo'lsa — faqat chegirmadagilar
var joriyNarxDan = null;
var joriyNarxGacha = null;
var joriyBrendlar = [];
var brendKengaytirilgan = false;

// Sahifalash (2026-09-13, ega qarori — DIZAYN.md 11-band):
// "Yana ko'rsatish" o'rniga to'liq "Oldingi/Keyingi" sahifalash, 30 tadan.
var SAHIFA_HAJM = 30;
var joriySahifa = 1;

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("mahsulot-grid");
  if (!grid) return;

  if (!mahsulotlarRoyxatiTogri()) {
    xatoXabariniChiz(
      "mahsulot-grid",
      "Katalogni ko'rsatib bo'lmadi",
      "Ma'lumotlar faylida xatolik bo'lishi mumkin (js/malumotlar-mahsulot.js). Iltimos, faylni tekshiring yoki sayt egasiga xabar bering."
    );
    var panel = document.getElementById("boshqaruv-panel");
    if (panel) panel.style.display = "none";
    return;
  }

  // URL'dan kategoriya parametrini o'qish (masalan katalog.html?kategoriya=televizor)
  var urlParametrlari = new URLSearchParams(window.location.search);
  var urlKategoriya = urlParametrlari.get("kategoriya");
  if (urlKategoriya) {
    joriyKategoriya = urlKategoriya;
  }

  // Headerdagi qidiruv shu sahifaga ?q=... bilan keladi
  var urlQidiruv = urlParametrlari.get("q");
  if (urlQidiruv) {
    joriyQidiruv = urlQidiruv;
    var qidiruvMaydon = document.getElementById("qidiruv-input");
    if (qidiruvMaydon) qidiruvMaydon.value = urlQidiruv;
  }

  // Reklama banneridan keladigan "faqat aksiyadagilar" ko'rinishi
  if (urlParametrlari.get("aksiya") === "1") {
    faqatAksiya = true;
    var sarlavha = document.querySelector(".bolim-sarlavha-matn h1");
    if (sarlavha) sarlavha.textContent = "Chegirmadagi mahsulotlar";
  }

  // Saralash tartibi URL'dan (masalan ?saralash=narx-arzon)
  var urlSaralash = urlParametrlari.get("saralash");
  if (urlSaralash) joriySaralash = urlSaralash;

  // Sahifa raqami URL'dan (masalan ?sahifa=3) — havolani ulashsa ham,
  // sahifani yangilasa ham o'sha sahifa ochiladi
  var urlSahifa = parseInt(urlParametrlari.get("sahifa"), 10);
  if (!isNaN(urlSahifa) && urlSahifa >= 1) joriySahifa = urlSahifa;

  // Ikkala qidiruv maydonini boshlang'ich holatga sinxronlash
  if (joriyQidiruv) {
    var hInput = document.querySelector(".header-qidiruv input");
    if (hInput) hInput.value = joriyQidiruv;
  }

  filtrTugmalariniChiz();
  boshqaruvElementlariniUlash();
  var saralashSelect0 = document.getElementById("saralash-select");
  if (saralashSelect0) saralashSelect0.value = joriySaralash;
  filtrlarniUla();
  qayta_chiz();

  // Brauzer "orqaga/oldinga" tugmasi — sahifa/filtr URL'dan qayta o'qiladi
  window.addEventListener("popstate", function () {
    var p = new URLSearchParams(window.location.search);
    joriyKategoriya = p.get("kategoriya") || "hammasi";
    joriyQidiruv = p.get("q") || "";
    joriySaralash = p.get("saralash") || "standart";
    faqatAksiya = p.get("aksiya") === "1";
    var s = parseInt(p.get("sahifa"), 10);
    joriySahifa = (!isNaN(s) && s >= 1) ? s : 1;

    var qidiruvMaydon = document.getElementById("qidiruv-input");
    if (qidiruvMaydon) qidiruvMaydon.value = joriyQidiruv;
    var headerInput = document.querySelector(".header-qidiruv input");
    if (headerInput) headerInput.value = joriyQidiruv;
    var saralashSelect = document.getElementById("saralash-select");
    if (saralashSelect) saralashSelect.value = joriySaralash;

    qayta_chiz();
  });
});

// Mavjud kategoriyalar asosida filtr pill tugmalarini chizadi
function filtrTugmalariniChiz() {
  var panel = document.getElementById("filtr-panel");
  if (!panel) return;

  var kategoriyalar = {};
  MAHSULOTLAR.forEach(function (m) {
    kategoriyalar[m.kategoriya] = true;
  });

  var html = '<button type="button" class="filtr-pill" data-kategoriya="hammasi">Barchasi</button>';
  Object.keys(kategoriyalar).forEach(function (kod) {
    html += '<button type="button" class="filtr-pill" data-kategoriya="' + htmlXavfsiz(kod) + '">' + htmlXavfsiz(kategoriyaNomi(kod)) + "</button>";
  });
  panel.innerHTML = html;

  panel.querySelectorAll(".filtr-pill").forEach(function (tugma) {
    tugma.addEventListener("click", function () {
      joriyKategoriya = tugma.getAttribute("data-kategoriya");
      joriySahifa = 1;   // filtr o'zgardi — 1-sahifaga qaytish (DIZAYN.md 11-band)
      qayta_chiz();
    });
  });
}

function boshqaruvElementlariniUlash() {
  var qidiruvInput = document.getElementById("qidiruv-input");
  var headerInput = document.querySelector(".header-qidiruv input");

  /* Sahifada ikkita qidiruv maydoni bor: headerdagi (butun saytda) va
     katalogning o'ziniki. Ular BIR-BIRI BILAN SINXRON ishlaydi —
     qaysinisiga yozilsa ham natija darhol filtrlanadi va ikkinchisi
     ham shu matnni ko'rsatadi. Shunda foydalanuvchi "qaysi biriga
     yozay?" deb o'ylamaydi. */
  function qidiruvOzgardi(matn, boshqasi) {
    joriyQidiruv = matn;
    joriySahifa = 1;   // filtr o'zgardi — 1-sahifaga qaytish
    if (boshqasi && boshqasi.value !== matn) boshqasi.value = matn;
    qayta_chiz();
  }

  if (qidiruvInput) {
    qidiruvInput.addEventListener("input", function () {
      qidiruvOzgardi(qidiruvInput.value, headerInput);
    });
  }

  if (headerInput) {
    headerInput.addEventListener("input", function () {
      qidiruvOzgardi(headerInput.value, qidiruvInput);
    });
    // Katalog sahifasida header formasi sahifani qayta yuklamaydi —
    // filtr allaqachon jonli ishlayapti.
    var forma = headerInput.form;
    if (forma) {
      forma.addEventListener("submit", function (hodisa) {
        hodisa.preventDefault();
        qidiruvOzgardi(headerInput.value, qidiruvInput);
      });
    }
  }

  var saralashSelect = document.getElementById("saralash-select");
  if (saralashSelect) {
    saralashSelect.addEventListener("change", function () {
      joriySaralash = saralashSelect.value;
      joriySahifa = 1;   // filtr o'zgardi — 1-sahifaga qaytish
      qayta_chiz();
    });
  }
}

// Uchala boshqaruv (kategoriya, qidiruv, saralash) shu bitta funksiya orqali BIRGA ishlaydi
// `opsiyalar.sahifaAlmashdi` — true bo'lsa, pagination bosilgan (grid tepasiga
// scroll qilinadi va URL'ga pushState — brauzer "orqaga" tugmasi ishlaydi).
function qayta_chiz(opsiyalar) {
  var grid = document.getElementById("mahsulot-grid");
  var natijalarSoni = document.getElementById("natijalar-soni");
  if (!grid) return;
  var sahifaAlmashdi = !!(opsiyalar && opsiyalar.sahifaAlmashdi);

  // 1. Kategoriya bo'yicha filtr
  var natija = MAHSULOTLAR.filter(function (m) {
    return joriyKategoriya === "hammasi" || m.kategoriya === joriyKategoriya;
  });

  // 1b. Faqat aksiyadagilar (reklama banneridan kelinganda)
  if (faqatAksiya) {
    natija = natija.filter(function (m) { return !!DOKON.aksiyaOl(m); });
  }

  // 2. Qidiruv bo'yicha filtr
  var qidiruvMatni = joriyQidiruv.trim().toLowerCase();
  if (qidiruvMatni) {
    natija = natija.filter(function (m) {
      return m.nomi.toLowerCase().includes(qidiruvMatni) ||
        m.qisqaTavsif.toLowerCase().includes(qidiruvMatni) ||
        kategoriyaNomi(m.kategoriya).toLowerCase().includes(qidiruvMatni);
    });
  }

  // 2b. Brend ro'yxati shu bazadan (narx/brenddan OLDIN — sanoq barqaror)
  brendlarniChiz(natija);

  // 2c. Narx filtri
  if (joriyNarxDan != null) natija = natija.filter(function (m) { return m.narx >= joriyNarxDan; });
  if (joriyNarxGacha != null) natija = natija.filter(function (m) { return m.narx <= joriyNarxGacha; });

  // 2d. Brend filtri
  if (joriyBrendlar.length) natija = natija.filter(function (m) { return joriyBrendlar.indexOf(m.brend) >= 0; });

  // 3. Saralash
  if (joriySaralash === "narx-arzon") {
    natija = natija.slice().sort(function (a, b) { return a.narx - b.narx; });
  } else if (joriySaralash === "narx-qimmat") {
    natija = natija.slice().sort(function (a, b) { return b.narx - a.narx; });
  } else if (joriySaralash === "nom-az") {
    natija = natija.slice().sort(function (a, b) { return a.nomi.localeCompare(b.nomi, "uz"); });
  }

  // Filtr pill'larning "faol" ko'rinishini yangilash
  document.querySelectorAll(".filtr-pill").forEach(function (tugma) {
    tugma.classList.toggle("faol", tugma.getAttribute("data-kategoriya") === joriyKategoriya);
  });

  var jamiSoni = natija.length;   // filtrlangan JAMI — sahifadagi emas
  if (natijalarSoni) {
    natijalarSoni.textContent = jamiSoni + " ta mahsulot topildi";
  }

  var eskiXabar = document.getElementById("bosh-holat-xabar");
  if (eskiXabar) eskiXabar.remove();

  var sahifalashBlok = sahifalashBlokniTayyorla(grid);

  if (jamiSoni === 0) {
    grid.innerHTML = "";
    sahifalashBlok.hidden = true;
    urlYangila(sahifaAlmashdi ? "push" : "replace");
    var taxmin = joriyQidiruv ? taxminQil(joriyQidiruv) : null;
    var izoh = joriyQidiruv
      ? "«" + htmlXavfsiz(joriyQidiruv) + "» bo'yicha natija yo'q."
      : "Tanlangan shartlarga mos mahsulot topilmadi.";
    if (taxmin) {
      izoh += ' Balki <button type="button" class="bosh-holat-taxmin" data-taxmin="' +
        htmlXavfsiz(taxmin) + '">' + htmlXavfsiz(taxmin) + "</button> demoqchimisiz?";
    }
    grid.insertAdjacentHTML("afterend", boshHolatHTML({
      id: "bosh-holat-xabar",
      sarlavha: "Hech narsa topilmadi",
      izohHTML: izoh,
      tugma: '<button type="button" class="tugma tugma-asosiy bosh-holat-tugma" data-bosh-tozala>Filtrlarni tozalash</button>'
    }));
    var host = document.getElementById("bosh-holat-xabar");
    var tozalaBtn = host.querySelector("[data-bosh-tozala]");
    if (tozalaBtn) tozalaBtn.addEventListener("click", filtrlarniTozala);
    var taxminBtn = host.querySelector("[data-taxmin]");
    if (taxminBtn) taxminBtn.addEventListener("click", function () {
      qidiruvniQoy(taxminBtn.getAttribute("data-taxmin"));
    });
    return;
  }

  // — Sahifalash (2026-09-13, ega qarori — DIZAYN.md 11-band): 30 tadan —
  var jamiSahifalar = Math.max(1, Math.ceil(jamiSoni / SAHIFA_HAJM));
  if (joriySahifa > jamiSahifalar) joriySahifa = jamiSahifalar;
  if (joriySahifa < 1) joriySahifa = 1;

  urlYangila(sahifaAlmashdi ? "push" : "replace");

  var boshlanishIndeks = (joriySahifa - 1) * SAHIFA_HAJM;
  var sahifaNatija = natija.slice(boshlanishIndeks, boshlanishIndeks + SAHIFA_HAJM);

  grid.innerHTML = sahifaNatija.map(mahsulotKartaHTML).join("");
  DOKON.badgelarYangila();
  DOKON.kartochkalarniUla(grid);
  if (typeof revealniQaytaUla === "function") revealniQaytaUla(grid);

  sahifalashBlok.hidden = false;
  sahifalashBlok.innerHTML = sahifalashHTML(joriySahifa, jamiSahifalar);

  if (sahifaAlmashdi) {
    grid.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

/* -----------------------------------------------------------------
   SAHIFALASH BLOKI (2026-09-13, ega qarori — DIZAYN.md 11-band)
   Gridning ostiga bir marta yaratiladi, keyin faqat innerHTML yangilanadi.
   Klik hodisasi delegatsiya orqali ulanadi — har chizishda qayta ulash
   shart emas.
------------------------------------------------------------------ */
function sahifalashBlokniTayyorla(grid) {
  var mavjud = document.getElementById("sahifalash-blok");
  if (mavjud) return mavjud;
  var blok = document.createElement("nav");
  blok.id = "sahifalash-blok";
  blok.className = "sahifalash";
  blok.setAttribute("aria-label", "Sahifalash");
  grid.parentNode.insertBefore(blok, grid.nextSibling);

  blok.addEventListener("click", function (hodisa) {
    var maqsad = hodisa.target.closest("button");
    if (!maqsad || maqsad.disabled) return;
    if (maqsad.hasAttribute("data-sahifa-oldingi")) {
      joriySahifa = Math.max(1, joriySahifa - 1);
    } else if (maqsad.hasAttribute("data-sahifa-keyingi")) {
      joriySahifa = joriySahifa + 1;
    } else if (maqsad.hasAttribute("data-sahifa")) {
      joriySahifa = parseInt(maqsad.getAttribute("data-sahifa"), 10) || 1;
    } else {
      return;
    }
    qayta_chiz({ sahifaAlmashdi: true });
  });

  return blok;
}

// Joriy sahifa atrofida ±2 ta raqam + birinchi/oxirgi, qolgani "…" bilan
// qisqartiriladi (DIZAYN.md 11-band: "1 2 3 … 8 9").
function sahifaRaqamlariHisobla(joriy, jami) {
  var royxat = [];
  if (jami <= 7) {
    for (var i = 1; i <= jami; i++) royxat.push(i);
    return royxat;
  }
  royxat.push(1);
  var boshlanish = Math.max(2, joriy - 2);
  var tugash = Math.min(jami - 1, joriy + 2);
  if (boshlanish > 2) royxat.push("...");
  for (var j = boshlanish; j <= tugash; j++) royxat.push(j);
  if (tugash < jami - 1) royxat.push("...");
  royxat.push(jami);
  return royxat;
}

function sahifalashHTML(joriy, jami) {
  if (jami <= 1) return "";
  var raqamlar = sahifaRaqamlariHisobla(joriy, jami);
  var html = '<button type="button" class="sahifalash-oq" data-sahifa-oldingi' +
    (joriy <= 1 ? " disabled" : "") + '>Oldingi</button>';
  for (var i = 0; i < raqamlar.length; i++) {
    var r = raqamlar[i];
    if (r === "...") {
      html += '<span class="sahifalash-nuqta" aria-hidden="true">&hellip;</span>';
    } else {
      html += '<button type="button" class="sahifalash-raqam' + (r === joriy ? " faol" : "") + '"' +
        ' data-sahifa="' + r + '"' + (r === joriy ? ' aria-current="page"' : "") + '>' + r + "</button>";
    }
  }
  html += '<button type="button" class="sahifalash-oq" data-sahifa-keyingi' +
    (joriy >= jami ? " disabled" : "") + '>Keyingi</button>';
  html += '<span class="sahifalash-korsatkich">Sahifa ' + joriy + " / " + jami + "</span>";
  return html;
}

/* K11 — bo'sh holat harakatlari */
function filtrlarniTozala() {
  joriyKategoriya = "hammasi";
  joriyQidiruv = "";
  faqatAksiya = false;
  joriySahifa = 1;
  var a = document.getElementById("qidiruv-input");
  if (a) a.value = "";
  var b = document.querySelector(".header-qidiruv input");
  if (b) b.value = "";
  qayta_chiz();
}

function qidiruvniQoy(matn) {
  joriyQidiruv = matn;
  joriySahifa = 1;
  var a = document.getElementById("qidiruv-input");
  if (a) a.value = matn;
  var b = document.querySelector(".header-qidiruv input");
  if (b) b.value = matn;
  qayta_chiz();
}

/* B5 — joriy filtr+sahifa holatini URL'ga yozadi.
   `rejim === "push"` — pushState (pagination klik: brauzer "orqaga"
   tugmasi oldingi sahifaga qaytaradi). Aks holda replaceState (filtr/
   qidiruv o'zgarganda — har harfda tarixni to'ldirmaslik uchun). */
function urlYangila(rejim) {
  try {
    var p = new URLSearchParams();
    if (joriyKategoriya && joriyKategoriya !== "hammasi") p.set("kategoriya", joriyKategoriya);
    if (joriyQidiruv && joriyQidiruv.trim()) p.set("q", joriyQidiruv.trim());
    if (joriySaralash && joriySaralash !== "standart") p.set("saralash", joriySaralash);
    if (faqatAksiya) p.set("aksiya", "1");
    if (joriySahifa > 1) p.set("sahifa", String(joriySahifa));
    var qatorb = p.toString();
    var yangiURL = window.location.pathname + (qatorb ? "?" + qatorb : "");
    if (rejim === "push") {
      window.history.pushState(null, "", yangiURL);
    } else {
      window.history.replaceState(null, "", yangiURL);
    }
  } catch (e) { /* eski brauzer — URL yangilanmaydi, sayt baribir ishlaydi */ }
}


/* ── KATALOG FILTR PANELI (Dizayner TZ 05) ── */
function brendlarniChiz(baza) {
  var host = document.getElementById("filtr-brend");
  if (!host) return;
  var sanoq = {};
  for (var i = 0; i < baza.length; i++) {
    var b = baza[i].brend;
    if (b) sanoq[b] = (sanoq[b] || 0) + 1;
  }
  var brendlar = Object.keys(sanoq).sort(function (a, b) { return sanoq[b] - sanoq[a]; });
  var korsat = brendKengaytirilgan ? brendlar : brendlar.slice(0, 8);
  var html = "";
  for (var j = 0; j < korsat.length; j++) {
    var nom = korsat[j];
    var belgi = joriyBrendlar.indexOf(nom) >= 0 ? " checked" : "";
    html += '<label><input type="checkbox" data-brend="' + htmlXavfsiz(nom) + '"' + belgi + '>' +
      '<span>' + htmlXavfsiz(nom) + '</span><span class="filtr-soni">' + sanoq[nom] + '</span></label>';
  }
  if (!brendlar.length) html = '<p class="modal-mayda">Brend topilmadi</p>';
  else if (brendlar.length > 8) {
    html += '<button type="button" class="filtr-yana" id="filtr-brend-yana">' +
      (brendKengaytirilgan ? "Kamroq" : ("Yana " + (brendlar.length - 8) + " ta brend")) + "</button>";
  }
  host.innerHTML = html;
  var cbs = host.querySelectorAll("input[data-brend]");
  for (var c = 0; c < cbs.length; c++) {
    cbs[c].addEventListener("change", function () {
      var nom = this.getAttribute("data-brend");
      var idx = joriyBrendlar.indexOf(nom);
      if (this.checked && idx < 0) joriyBrendlar.push(nom);
      else if (!this.checked && idx >= 0) joriyBrendlar.splice(idx, 1);
      joriySahifa = 1;   // filtr o'zgardi — 1-sahifaga qaytish
      qayta_chiz();
    });
  }
  var yana = document.getElementById("filtr-brend-yana");
  if (yana) yana.addEventListener("click", function () { brendKengaytirilgan = !brendKengaytirilgan; qayta_chiz(); });
}

function filtrlarniUla() {
  var dan = document.getElementById("narx-dan");
  var gacha = document.getElementById("narx-gacha");
  function narxYangila() {
    var d = parseInt(dan.value, 10); joriyNarxDan = isNaN(d) ? null : d;
    var g = parseInt(gacha.value, 10); joriyNarxGacha = isNaN(g) ? null : g;
    qayta_chiz();
  }
  if (dan) dan.addEventListener("input", narxYangila);
  if (gacha) gacha.addEventListener("input", narxYangila);
  var tozala = document.getElementById("filtr-tozala");
  if (tozala) tozala.addEventListener("click", function () {
    joriyNarxDan = null; joriyNarxGacha = null; joriyBrendlar = [];
    if (dan) dan.value = ""; if (gacha) gacha.value = "";
    qayta_chiz();
  });
  // ── Mobil filtr = bottom-sheet (Dizayner TZ 10) ──
  var ochish = document.getElementById("filtr-ochish");
  var yon = document.getElementById("filtr-yon");
  if (ochish && yon) {
    // Fon (backdrop) — bir marta yaratamiz
    var fon = document.getElementById("filtr-fon");
    if (!fon) {
      fon = document.createElement("div");
      fon.id = "filtr-fon";
      fon.className = "filtr-fon";
      document.body.appendChild(fon);
    }
    // Yopish tugmasi (sheet sarlavhasiga)
    var bosh = yon.querySelector(".filtr-yon-bosh");
    if (bosh && !bosh.querySelector(".filtr-yopish")) {
      var yopish = document.createElement("button");
      yopish.type = "button";
      yopish.className = "filtr-yopish";
      yopish.setAttribute("aria-label", "Filtrni yopish");
      yopish.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      bosh.appendChild(yopish);
      yopish.addEventListener("click", sheetYop);
    }
    // "Natijalarni ko'rish" tugmasi (sheet oxiriga)
    if (!yon.querySelector(".filtr-korish")) {
      var korish = document.createElement("button");
      korish.type = "button";
      korish.className = "filtr-korish";
      korish.id = "filtr-korish";
      korish.textContent = "Natijalarni ko'rish";
      yon.appendChild(korish);
      korish.addEventListener("click", sheetYop);
    }

    function sheetOch() {
      yon.classList.add("ochiq");
      fon.classList.add("ochiq");
      document.body.classList.add("sheet-ochiq");
      ochish.setAttribute("aria-expanded", "true");
    }
    function sheetYop() {
      yon.classList.remove("ochiq");
      fon.classList.remove("ochiq");
      document.body.classList.remove("sheet-ochiq");
      ochish.setAttribute("aria-expanded", "false");
    }
    ochish.addEventListener("click", function () {
      if (yon.classList.contains("ochiq")) sheetYop(); else sheetOch();
    });
    fon.addEventListener("click", sheetYop);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && yon.classList.contains("ochiq")) sheetYop();
    });
  }
}
