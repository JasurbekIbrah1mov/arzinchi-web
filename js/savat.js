/*
  =======================================================================
  SAVAT.JS — savat sahifasi (savat.html)
  =======================================================================
  Jasur aka talabi: "savat bo'limida ko'paytirish, kamaytirish bo'ladi,
  o'chirib tashlash bor... bitta quticha (belgilash)... rasmiylashtirish".

  Server yo'q — buyurtma brauzer xotirasiga yoziladi va mijozga raqami
  ko'rsatiladi. Haqiqiy buyurtma qabul qilish server talab qiladi
  (ARXITEKTURA masalasi, admin panel bilan birga hal qilinadi).
  =======================================================================
*/

document.addEventListener("DOMContentLoaded", function () {
  var tarkib = document.getElementById("savat-tarkib");
  if (!tarkib) return;

  if (!mahsulotlarRoyxatiTogri()) {
    xatoXabariniChiz("savat-tarkib", "Ma'lumot yuklanmadi",
      "Mahsulotlar ro'yxatini o'qib bo'lmadi. js/malumotlar-mahsulot.js faylini tekshiring.");
    return;
  }

  chiz();

  /* ---------------------------------------------------------------
     SAHIFANI CHIZISH
  ---------------------------------------------------------------- */
  function chiz() {
    var royxat = DOKON.savatRoyxati();

    if (!royxat.length) {
      tarkib.innerHTML = boshHolatHTML({
        ikonka: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
          '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>' +
          '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
        sarlavha: "Savat bo'sh",
        izoh: "Katalogdan mahsulot tanlang — u shu yerda paydo bo'ladi.",
        tugma: '<a href="katalog.html" class="tugma tugma-asosiy">Katalogga o\'tish</a>'
      });
      document.body.classList.remove("mobil-cta-bor");
      korilganlarniChiz();
      return;
    }

    var hammasiTanlangan = royxat.every(function (q) { return q.tanlangan; });

    var html =
      checkoutQadamHTML(1) +
      '<div class="savat-tuzilma">' +
      '<div class="savat-royxat">' +
      '<div class="savat-bosh-qator">' +
      '<label style="display:flex;align-items:center;gap:12px;cursor:pointer">' +
      '<input type="checkbox" class="belgi" id="hammasini-tanla"' + (hammasiTanlangan ? " checked" : "") + ">" +
      "<span>Hammasini tanlash</span></label>" +
      '<button type="button" class="ochir-tugma" id="savatni-tozala">Savatni tozalash</button>' +
      "</div>";

    for (var i = 0; i < royxat.length; i++) {
      html += qatorHTML(royxat[i]);
    }

    html += "</div>" + xulosaHTML() + "</div>" + mobilSavatCtaHTML();
    tarkib.innerHTML = html;
    document.body.classList.add("mobil-cta-bor");
    hodisalarniUla();
    DOKON.badgelarYangila();
  }

  /* Mobil sticky CTA (tab bar ustida) — jami + Rasmiylashtirish */
  function mobilSavatCtaHTML() {
    var h = DOKON.savatHisob();
    var ochiq = h.tanlanganTur > 0;
    return '<div class="mobil-savat-cta">' +
      '<div class="msc-narx"><span>' + h.tanlanganDona + ' dona</span><b>' + narxniFormatla(h.tanlanganJami) + "</b></div>" +
      '<button type="button" class="karta-cta msc-tugma" id="rasmiylashtir-mobil"' +
      (ochiq ? "" : " disabled") + ">Rasmiylashtirish</button>" +
      "</div>";
  }

  /* ---------------------------------------------------------------
     BITTA QATOR
  ---------------------------------------------------------------- */
  function qatorHTML(band) {
    var m = mahsulotniTop(band.id);
    if (!m) return "";

    var havola = "mahsulot.html?id=" + encodeURIComponent(m.id);
    var aksiya = DOKON.aksiyaOl(m);
    var summa = m.narx * band.soni;

    var narxHTML = '<div class="savat-qator-narx">' + narxniFormatla(summa) + "</div>";
    if (aksiya) {
      narxHTML += '<div class="narx-eski-qator">' +
        '<span class="mahsulot-karta-narx-eski">' + narxniFormatla(aksiya.eskiNarx * band.soni) + "</span>" +
        '<span class="mahsulot-karta-chegirma">-' + aksiya.chegirmaFoiz + "%</span></div>";
    }
    if (band.soni > 1) {
      narxHTML += '<div class="mahsulot-karta-meta">' + narxniFormatla(m.narx) + " &times; " + band.soni + "</div>";
    }

    return (
      '<div class="savat-qator" data-qator="' + htmlXavfsiz(m.id) + '">' +
      '<input type="checkbox" class="belgi" data-tanla="' + htmlXavfsiz(m.id) + '"' +
      (band.tanlangan ? " checked" : "") + ' aria-label="Tanlash">' +
      '<a href="' + havola + '" class="savat-qator-rasm">' +
      rasmYokiPlaceholderHTML(m.rasm, m.nomi, "", "") + "</a>" +
      "<div>" +
      '<a href="' + havola + '" class="savat-qator-nom">' + htmlXavfsiz(m.nomi) + "</a>" +
      narxHTML +
      "</div>" +
      '<div class="savat-qator-boshqaruv">' +
      '<span class="soni-boshqaruv">' +
      '<button type="button" class="soni-tugma" data-kamaytir="' + htmlXavfsiz(m.id) + '"' +
      (band.soni <= 1 ? " disabled" : "") + ' aria-label="Kamaytirish">&minus;</button>' +
      '<span class="soni-qiymat">' + band.soni + "</span>" +
      '<button type="button" class="soni-tugma" data-kopaytir="' + htmlXavfsiz(m.id) + '"' +
      (band.soni >= DOKON.ombordagiMax(m.id) ? " disabled" : "") + ' aria-label="Ko\'paytirish">+</button>' +
      "</span>" +
      (band.soni >= DOKON.ombordagiMax(m.id) && DOKON.ombordagiMax(m.id) < 99
        ? '<span class="soni-max-eslatma">Bor-yo\'g\'i ' + DOKON.ombordagiMax(m.id) + ' dona</span>'
        : "") +
      '<button type="button" class="ochir-tugma" data-ochir="' + htmlXavfsiz(m.id) + '">O\'chirish</button>' +
      "</div>" +
      "</div>"
    );
  }

  /* ---------------------------------------------------------------
     XULOSA PANELI (o'ng ustun)
  ---------------------------------------------------------------- */
  function xulosaHTML() {
    var h = DOKON.savatHisob();
    var manzil = DOKON.manzilOl();

    var tolovlar = "";
    for (var i = 0; i < TOLOV_USULLARI.length; i++) {
      var t = TOLOV_USULLARI[i];
      tolovlar +=
        '<label class="tolov-variant">' +
        '<input type="radio" name="tolov" value="' + htmlXavfsiz(t.kod) + '"' + (i === 0 ? " checked" : "") + ">" +
        "<span><strong>" + htmlXavfsiz(t.nom) + "</strong>" +
        "<span>" + htmlXavfsiz(t.izoh) + "</span></span></label>";
    }

    var yetkazishHTML = manzil
      ? '<div class="xulosa-qator"><span>' + htmlXavfsiz(manzil.shahar) + "</span>" +
        "<span>" + htmlXavfsiz(manzil.yetkazish) + "</span></div>"
      : '<div class="xulosa-qator"><span>Yetkazish</span>' +
        '<button type="button" class="ochir-tugma" data-shahar-tugma>Shaharni tanlang</button></div>';

    var tejamHTML = h.tejaldi > 0
      ? '<div class="xulosa-qator"><span>Aksiya bo\'yicha tejaldi</span>' +
        '<span class="xulosa-tejam">' + narxniFormatla(h.tejaldi) + "</span></div>"
      : "";

    return (
      '<aside class="savat-xulosa">' +
      "<h2>Buyurtma xulosasi</h2>" +
      '<div class="xulosa-qator"><span>Tanlangan mahsulot</span><span>' + h.tanlanganDona + " dona</span></div>" +
      tejamHTML +
      yetkazishHTML +
      '<div class="xulosa-qator xulosa-qator--jami"><span>Jami</span><span>' +
      narxniFormatla(h.tanlanganJami) + "</span></div>" +
      "<h3 style=\"margin:20px 0 8px;font-size:var(--matn-h4)\">To'lov usuli</h3>" +
      '<div class="tolov-royxat">' + tolovlar + "</div>" +
      '<button type="button" class="karta-cta" id="rasmiylashtir"' +
      (h.tanlanganTur === 0 ? " disabled" : "") + ">Rasmiylashtirish</button>" +
      (h.tanlanganTur === 0
        ? '<p class="modal-mayda">Rasmiylashtirish uchun kamida bitta mahsulotni belgilang.</p>'
        : "") +
      "</aside>"
    );
  }

  /* ---------------------------------------------------------------
     HODISALAR
  ---------------------------------------------------------------- */
  function hodisalarniUla() {
    ulash("[data-kopaytir]", "click", function () {
      var id = this.getAttribute("data-kopaytir");
      DOKON.savatSoniOzgart(id, soniniOl(id) + 1);
      chiz();
    });

    ulash("[data-kamaytir]", "click", function () {
      var id = this.getAttribute("data-kamaytir");
      DOKON.savatSoniOzgart(id, soniniOl(id) - 1);
      chiz();
    });

    ulash("[data-ochir]", "click", function () {
      var id = this.getAttribute("data-ochir");
      var m = mahsulotniTop(id);
      DOKON.savatOchir(id);
      DOKON.xabar((m ? m.nomi.slice(0, 28) : "Mahsulot") + " savatdan o'chirildi", "ok");
      chiz();
    });

    ulash("[data-tanla]", "change", function () {
      DOKON.savatTanlaTogla(this.getAttribute("data-tanla"), this.checked);
      chiz();
    });

    var hammasi = document.getElementById("hammasini-tanla");
    if (hammasi) {
      hammasi.addEventListener("change", function () {
        DOKON.savatHammasiniTanla(this.checked);
        chiz();
      });
    }

    var tozala = document.getElementById("savatni-tozala");
    if (tozala) {
      tozala.addEventListener("click", function () {
        DOKON.modalOch("Savatni tozalash",
          '<p class="modal-izoh">Savatdagi barcha mahsulotlar o\'chiriladi. Davom etamizmi?</p>' +
          '<button type="button" class="tugma tugma-asosiy tugma-toliq" id="tozala-tasdiq">Ha, tozalansin</button>');
        var t = document.getElementById("tozala-tasdiq");
        if (t) {
          t.addEventListener("click", function () {
            DOKON.savatTozala();
            DOKON.modalYop();
            DOKON.xabar("Savat tozalandi", "ok");
            chiz();
          });
        }
      });
    }

    var rasmiy = document.getElementById("rasmiylashtir");
    if (rasmiy) rasmiy.addEventListener("click", rasmiylashtirish);
    var rasmiyMobil = document.getElementById("rasmiylashtir-mobil");
    if (rasmiyMobil) rasmiyMobil.addEventListener("click", rasmiylashtirish);

    // Header/xulosadagi shahar tugmasi
    ulash("[data-shahar-tugma]", "click", function (h) {
      h.preventDefault();
      DOKON.shaharModal();
    });
  }

  function ulash(selektor, hodisa, ishlov) {
    var el = tarkib.querySelectorAll(selektor);
    for (var i = 0; i < el.length; i++) el[i].addEventListener(hodisa, ishlov);
  }

  function soniniOl(id) {
    var r = DOKON.savatRoyxati();
    for (var i = 0; i < r.length; i++) if (r[i].id === id) return r[i].soni;
    return 1;
  }

  /* ---------------------------------------------------------------
     RASMIYLASHTIRISH — alohida sahifaga o'tadi (Dizayner TZ 07).
     Buyurtma endi modal emas, to'liq sahifada rasmiylashtiriladi:
     rasmiylashtirish.html (forma) -> tasdiq.html (natija).
     Ro'yxatdan o'tmagan bo'lsa avval kirish so'raladi.
  ---------------------------------------------------------------- */
  function rasmiylashtirish() {
    var h = DOKON.savatHisob();
    if (h.tanlanganTur === 0) {
      DOKON.xabar("Kamida bitta mahsulotni belgilang.", "ogoh");
      return;
    }
    DOKON.hisobTalab(function () {
      window.location.href = "rasmiylashtirish.html";
    });
  }

  /* ---------------------------------------------------------------
     BO'SH SAVATDA — ko'rilgan mahsulotlar (marketpleys naqshi:
     bo'sh sahifa hech qachon shunchaki bo'sh qolmaydi)
  ---------------------------------------------------------------- */
  function korilganlarniChiz() {
    var kodlar = DOKON.korilganRoyxati();
    var mahsulotlar = [];
    for (var i = 0; i < kodlar.length && mahsulotlar.length < 10; i++) {
      var m = mahsulotniTop(kodlar[i]);
      if (m) mahsulotlar.push(m);
    }
    if (!mahsulotlar.length) return;

    tarkib.insertAdjacentHTML("beforeend",
      '<div class="bolim-sarlavha" style="margin-top:48px">' +
      '<div class="bolim-sarlavha-matn"><h2>Ko\'rilgan mahsulotlar</h2></div></div>' +
      '<div class="mahsulot-grid">' + mahsulotlar.map(mahsulotKartaHTML).join("") + "</div>");
    DOKON.kartochkalarniUla(tarkib);
    DOKON.badgelarYangila();
  }
});

/* Checkout stepper — 4 qadam (Savat / Ma'lumotlar / To'lov / Tasdiq).
   active: joriy qadam (1..4). Undan oldingilar "tugadi", o'zi "faol". */
function checkoutQadamHTML(active) {
  var qadamlar = ["Savat", "Ma'lumotlar", "To'lov", "Tasdiq"];
  var chek = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var html = '<ol class="checkout-qadam" aria-label="Buyurtma bosqichlari">';
  for (var i = 0; i < qadamlar.length; i++) {
    var n = i + 1;
    if (i > 0) html += '<li class="cq-chiziq' + (n <= active ? " cq-chiziq--tugadi" : "") + '"></li>';
    var sinf = n < active ? " cq-tugadi" : (n === active ? " cq-faol" : "");
    var belgi = n < active ? chek : String(n);
    html += '<li class="cq-band' + sinf + '"><span class="cq-belgi">' + belgi +
      '</span><span class="cq-matn">' + qadamlar[i] + "</span></li>";
  }
  return html + "</ol>";
}
