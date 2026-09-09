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
      korilganlarniChiz();
      return;
    }

    var hammasiTanlangan = royxat.every(function (q) { return q.tanlangan; });

    var html =
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

    html += "</div>" + xulosaHTML() + "</div>";
    tarkib.innerHTML = html;
    hodisalarniUla();
    DOKON.badgelarYangila();
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
     RASMIYLASHTIRISH
     Ro'yxatdan o'tmagan bo'lsa — avval ism va telefon so'raladi
     (Jasur aka: "ro'yxatdan kirganda so'rashlik, telefon raqam, ismini").
  ---------------------------------------------------------------- */
  function rasmiylashtirish() {
    DOKON.hisobTalab(function (hisob) {
      var h = DOKON.savatHisob();
      if (h.tanlanganTur === 0) {
        DOKON.xabar("Kamida bitta mahsulotni belgilang.", "ogoh");
        return;
      }

      var tanlangan = document.querySelector('input[name="tolov"]:checked');
      var tolovKod = tanlangan ? tanlangan.value : "naqd";
      var tolovNomi = tolovKod;
      for (var i = 0; i < TOLOV_USULLARI.length; i++) {
        if (TOLOV_USULLARI[i].kod === tolovKod) tolovNomi = TOLOV_USULLARI[i].nom;
      }

      var manzil = DOKON.manzilOl();
      var raqam = "AR-" + String(Date.now()).slice(-6);

      // To'liq buyurtmani egaga yuborish (buyurtmalar.md) — tanlangan mahsulotlar
      var royxatB = DOKON.savatRoyxati();
      var buyurtmaMahsulotlar = [];
      for (var bi = 0; bi < royxatB.length; bi++) {
        if (!royxatB[bi].tanlangan) continue;
        var bm = mahsulotniTop(royxatB[bi].id);
        if (!bm) continue;
        buyurtmaMahsulotlar.push({
          id: bm.id, nomi: bm.nomi, soni: royxatB[bi].soni,
          narxMatn: narxniFormatla(bm.narx * royxatB[bi].soni)
        });
      }
      DOKON.buyurtmaYoz({
        raqam: raqam,
        sana: new Date().toISOString(),
        mijoz: { ism: hisob.ism, telefon: DOKON.telefonKorinishi(hisob.telefon) },
        tolov: tolovNomi,
        yetkazish: manzil ? (manzil.filialNomi + " — " + manzil.yetkazish) : "",
        mahsulotlar: buyurtmaMahsulotlar,
        jamiMatn: narxniFormatla(h.tanlanganJami)
      });

      var ichki =
        '<p class="modal-izoh">Buyurtmangiz qabul qilindi. Operator tez orada ' +
        "siz bilan bog'lanadi.</p>" +
        '<div class="xulosa-qator"><span>Buyurtma raqami</span><span><strong>' + raqam + "</strong></span></div>" +
        '<div class="xulosa-qator"><span>Mijoz</span><span>' + htmlXavfsiz(hisob.ism) + "</span></div>" +
        '<div class="xulosa-qator"><span>Telefon</span><span>' +
        htmlXavfsiz(DOKON.telefonKorinishi(hisob.telefon)) + "</span></div>" +
        '<div class="xulosa-qator"><span>To\'lov</span><span>' + htmlXavfsiz(tolovNomi) + "</span></div>" +
        (manzil
          ? '<div class="xulosa-qator"><span>' + htmlXavfsiz(manzil.filialNomi) + "</span><span>" +
            htmlXavfsiz(manzil.yetkazish) + "</span></div>"
          : "") +
        '<div class="xulosa-qator xulosa-qator--jami"><span>Jami</span><span>' +
        narxniFormatla(h.tanlanganJami) + "</span></div>" +
        '<button type="button" class="tugma tugma-asosiy tugma-toliq" style="margin-top:16px" id="buyurtma-ok">Yopish</button>' +
        '<p class="modal-mayda">Bu — namoyish rejimi: buyurtma serverga yuborilmaydi, ' +
        "chunki sayt hozircha serversiz ishlaydi.</p>";

      DOKON.modalOch("Buyurtma qabul qilindi", ichki);

      var ok = document.getElementById("buyurtma-ok");
      if (ok) {
        ok.addEventListener("click", function () {
          // Faqat TANLANGAN mahsulotlar o'chiriladi, belgilanmaganlari qoladi.
          // Ular "sotib olingan" ro'yxatiga tushadi — endi mijoz shu
          // mahsulotlarga fikr qoldira oladi (faqat olgan odam qoldiradi).
          var royxat = DOKON.savatRoyxati();
          var olinganIdlar = [];
          for (var i = 0; i < royxat.length; i++) {
            if (royxat[i].tanlangan) {
              olinganIdlar.push(royxat[i].id);
              DOKON.savatOchir(royxat[i].id);
            }
          }
          DOKON.sotibOlinganYoz(olinganIdlar);
          DOKON.modalYop();
          DOKON.xabar("Buyurtma " + raqam + " qabul qilindi", "ok");
          chiz();
        });
      }
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
