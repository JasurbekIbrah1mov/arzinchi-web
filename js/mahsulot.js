/*
  MAHSULOT.JS — faqat mahsulot.html sahifasida ishlatiladi.
  Dizayner MahsulotSahifasi.dc.html (TZ 06) bo'yicha:
    3 ustun — galereya (chap) · info (o'rta) · sotib-olish kartasi (o'ng, sticky)
    ostida — tablar (Tavsif / Xususiyatlar / Sharhlar / Yetkazish)
    keyin — "Birga olsangiz arzon" to'plami + o'xshash/ko'rilgan karusellar.
  URL'dagi "?id=..." bo'yicha mahsulotni topib to'ldiradi.
*/

document.addEventListener("DOMContentLoaded", function () {
  var tarkibKonteyner = document.getElementById("mahsulot-tarkib");
  if (!tarkibKonteyner) return;

  if (!mahsulotlarRoyxatiTogri()) {
    tarkibKonteyner.innerHTML =
      '<div class="xato-xabar"><h3>Mahsulotni ko\'rsatib bo\'lmadi</h3>' +
      "<p>Ma'lumotlar faylida xatolik bo'lishi mumkin (js/malumotlar-mahsulot.js). Iltimos, faylni tekshiring yoki sayt egasiga xabar bering.</p></div>";
    return;
  }

  var urlParametrlari = new URLSearchParams(window.location.search);
  var id = urlParametrlari.get("id");
  var mahsulot = id ? mahsulotniTop(id) : null;

  if (!mahsulot) {
    mahsulotTopilmadiniChiz(tarkibKonteyner);
    return;
  }

  document.title = mahsulot.nomi + " — Arzonchi";
  mahsulotniChiz(tarkibKonteyner, mahsulot);

  // Marketpleys qatlami: ko'rilganlar tarixiga yozish + hodisalarni ulash
  DOKON.korilganYoz(mahsulot.id);
  marketpleysHodisalari(mahsulot);
});

function mahsulotTopilmadiniChiz(konteyner) {
  document.title = "Mahsulot topilmadi — Arzonchi";
  konteyner.innerHTML =
    '<div class="mahsulot-topilmadi">' +
    "<h2>Mahsulot topilmadi</h2>" +
    "<p>Siz izlayotgan mahsulot mavjud emas yoki o'chirilgan bo'lishi mumkin.</p>" +
    '<a href="katalog.html" class="tugma tugma-asosiy">Katalogga qaytish</a>' +
    "</div>";
}

/* =======================================================================
   ASOSIY CHIZISH — 3 ustun + tablar + to'plam
   ======================================================================= */
function mahsulotniChiz(konteyner, mahsulot) {
  konteyner.innerHTML =
    '<div class="mahsulot-tartib">' +
      galereyaUstuni(mahsulot) +
      infoUstuni(mahsulot) +
      sotibKartaHTML(mahsulot) +
      boshqaModellarHTML(mahsulot) +
      tablarHTML(mahsulot) +
    "</div>" +
    birgaArzonHTML(mahsulot) +
    karusellarHTML(mahsulot) +
    mobilSotibCtaHTML(mahsulot);

  document.body.classList.toggle("mobil-cta-bor", !!mahsulot.mavjud);

  var breadcrumbNom = document.getElementById("breadcrumb-mahsulot-nomi");
  if (breadcrumbNom) breadcrumbNom.textContent = mahsulot.nomi;
}

/* --- Mobil sticky CTA (tab bar ustida) — Dizayner MobilMahsulot ------- */
function mobilSotibCtaHTML(mahsulot) {
  if (!mahsulot.mavjud) return "";
  var savatda = DOKON.savatdaBormi(mahsulot.id);
  var nasiya = "";
  if (DOKON.nasiyaMumkinmi(mahsulot.narx)) {
    var eng = DOKON.nasiyaEngKichik(mahsulot.narx);
    if (eng) nasiya = '<span class="msc-nasiya">' + narxniFormatla(eng.oylik) + " &times; " + eng.oy + " oy</span>";
  }
  return '<div class="mobil-sotib-cta">' +
    '<div class="msc-narx"><b>' + narxniFormatla(mahsulot.narx) + "</b>" + nasiya + "</div>" +
    '<button type="button" class="karta-cta msc-tugma' + (savatda ? " savatda" : "") + '"' +
    ' data-savat-qosh="' + htmlXavfsiz(mahsulot.id) + '">' +
    (savatda ? "Savatda &#10003;" : "Savatga qo'shish") + "</button>" +
    "</div>";
}

/* --- 1-USTUN: galereya (asosiy rasm + kichik rasmlar) ----------------- */
function galereyaUstuni(mahsulot) {
  var rasmHTML = rasmYokiPlaceholderHTML(mahsulot.rasm, mahsulot.nomi, "", "");
  return '<div class="mahsulot-galereya">' +
    '<div class="mahsulot-tafsilot-rasm">' + rasmHTML + "</div>" +
    galereyaHTML(mahsulot) +
    "</div>";
}

/* --- 2-USTUN: nom, reyting, variantlar, asosiy xususiyatlar ----------- */
function infoUstuni(mahsulot) {
  var brendHTML = mahsulot.brend
    ? '<span class="info-brend">' + htmlXavfsiz(mahsulot.brend) + "</span>"
    : "";

  // Reyting qatori: yulduz + o'rtacha + sharh soni (bosilsa Sharhlar tabiga) + kod
  var reyting = DOKON.reytingOl(mahsulot.id);
  var reytingQator = '<div class="info-reyting">';
  if (reyting) {
    reytingQator +=
      '<span class="ir-baho"><svg width="14" height="14" viewBox="0 0 24 24" fill="#FFB020"><path d="M12 2l3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>' +
      reyting.ortacha + "</span>" +
      '<button type="button" class="ir-havola" data-tabga="fikrlar">' + reyting.soni + " ta sharh</button>";
  }
  if (mahsulot.kod) reytingQator += '<span class="ir-kod">Kod: ' + htmlXavfsiz(mahsulot.kod) + "</span>";
  reytingQator += "</div>";

  // Holat belgisi (mavjud emas bo'lsa)
  var holatHTML = "";
  if (!mahsulot.mavjud) {
    holatHTML = '<span class="holat-belgi holat-yoq">Hozircha mavjud emas</span>';
  } else if (typeof mahsulot.qoldiq === "number" && mahsulot.qoldiq > 0 && mahsulot.qoldiq <= 3) {
    holatHTML = '<div class="info-qoldiq">Soni cheklangan — ' + mahsulot.qoldiq + " dona qoldi</div>";
  }

  // Asosiy xususiyatlar (birinchi 6 ta xarakteristika — nuqtali qatorlar)
  var asosiyXus = "";
  if (mahsulot.xarakteristikalar && typeof mahsulot.xarakteristikalar === "object") {
    var kalitlar = Object.keys(mahsulot.xarakteristikalar);
    var korsat = kalitlar.slice(0, 6);
    for (var i = 0; i < korsat.length; i++) {
      asosiyXus +=
        '<div class="ax-qator"><span class="ax-nom">' + htmlXavfsiz(korsat[i]) + "</span>" +
        '<span class="ax-chiziq"></span>' +
        '<span class="ax-qiymat">' + htmlXavfsiz(mahsulot.xarakteristikalar[korsat[i]]) + "</span></div>";
    }
    if (asosiyXus) {
      asosiyXus =
        '<div class="asosiy-xus"><div class="ax-sarlavha">Asosiy xususiyatlari</div>' + asosiyXus +
        (kalitlar.length > 6
          ? '<button type="button" class="ax-yana" data-tabga="xususiyat">Barcha ' + kalitlar.length + " ta xususiyat</button>"
          : "") +
        "</div>";
    }
  }

  return '<div class="mahsulot-info">' +
    brendHTML +
    "<h1>" + htmlXavfsiz(mahsulot.nomi) + "</h1>" +
    reytingQator +
    holatHTML +
    rangVariantlariHTML(mahsulot) +
    asosiyXus +
    "</div>";
}

/* --- 3-USTUN: sotib-olish kartasi (sticky, oq, radius 16) ------------- */
function sotibKartaHTML(mahsulot) {
  // Mavjud emas — sodda karta
  if (!mahsulot.mavjud) {
    return '<aside class="sotib-karta">' +
      '<div class="sotib-narx">' + narxniFormatla(mahsulot.narx) + "</div>" +
      '<p class="sotib-yoq">Bu mahsulot hozircha mavjud emas. Xabardor bo\'lish uchun bizga qo\'ng\'iroq qiling yoki keyinroq qayta tekshiring.</p>' +
      ishonchQatorlariHTML() +
      sotuvchiQatoriHTML() +
      "</aside>";
  }

  // Narx bloki
  var narxHTML = '<div class="sotib-narx">' + narxniFormatla(mahsulot.narx) + "</div>";
  var aksiya = DOKON.aksiyaOl(mahsulot);
  if (aksiya) {
    var tejam = aksiya.eskiNarx - mahsulot.narx;
    narxHTML +=
      '<div class="sotib-eski">' +
      '<span class="se-narx">' + narxniFormatla(aksiya.eskiNarx) + "</span>" +
      '<span class="se-foiz">&minus;' + aksiya.chegirmaFoiz + "%</span>" +
      (tejam > 0 ? '<span class="se-tejam">' + narxniFormatla(tejam) + " tejaysiz</span>" : "") +
      "</div>";
  }

  // Nasiya preview box (amber) + yashirin to'liq kalkulyator
  var nasiyaHTML = "";
  if (DOKON.nasiyaMumkinmi(mahsulot.narx)) {
    var eng = DOKON.nasiyaEngKichik(mahsulot.narx);
    if (eng) {
      nasiyaHTML =
        '<div class="sotib-nasiya">' +
        '<div class="sn-bosh"><span>Nasiyaga, ' + eng.oy + " oy</span>" +
        '<button type="button" class="sn-hisob" id="nasiya-hisob-tugma">Hisoblash</button></div>' +
        '<div class="sn-oylik">' + narxniFormatla(eng.oylik) + '<span>/oy</span></div>' +
        '<div class="sn-izoh">Dastlabki to\'lovsiz &middot; ortiqcha foizsiz</div>' +
        "</div>" +
        '<div class="nasiya-toliq" id="nasiya-toliq" hidden>' + nasiyaKalkulyatorHTML(mahsulot) + "</div>";
    }
  }

  var savatda = DOKON.savatdaBormi(mahsulot.id);

  return '<aside class="sotib-karta">' +
    narxHTML +
    nasiyaHTML +
    '<button type="button" class="sk-savat karta-cta' + (savatda ? " savatda" : "") +
      '" data-savat-qosh="' + htmlXavfsiz(mahsulot.id) + '">' +
      (savatda ? "Savatda &#10003;" : "Savatga qo'shish") + "</button>" +
    '<button type="button" class="sk-bir-bosish" data-bir-bosish="' + htmlXavfsiz(mahsulot.id) + '">Bir bosishda olish</button>' +
    '<button type="button" class="sk-yurak" data-saralangan-id="' + htmlXavfsiz(mahsulot.id) +
      '" aria-pressed="false">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 10-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 000-7.1z"/></svg>' +
      "Saralanganga qo'shish</button>" +
    '<a href="virtual.html?id=' + encodeURIComponent(mahsulot.id) + '" class="sk-virtual">Xonamda qanday turadi? &rarr;</a>' +
    ishonchQatorlariHTML() +
    sotuvchiQatoriHTML() +
    "</aside>";
}

/* Ishonch qatorlari — yetkazish/filial/kafolat/qaytarish (Dizayner TZ 06) */
function ishonchQatorlariHTML() {
  var qatorlar = [
    ['<rect x="1.5" y="6" width="14" height="10" rx="2"/><path d="M15.5 9h3.5l3 3.5V16h-6.5"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
      "Ertaga bepul yetkaziladi", "Toshkent bo'ylab"],
    ['<path d="M3 10l9-6 9 6v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 21v-7h6v7"/>',
      "Filialdan olish — bugun", "30 ta filial"],
    ['<path d="M12 3l7.5 3v6c0 4.6-3.2 8.2-7.5 9.4C7.7 20.2 4.5 16.6 4.5 12V6z"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/>',
      "2 yil kafolat", "Rasmiy servis markazlari"],
    ['<path d="M3 12a9 9 0 109-9"/><path d="M3 4v5h5"/>',
      "14 kun ichida qaytarish", "Sabab ko'rsatmasdan"]
  ];
  var html = '<div class="sotib-ishonch">';
  for (var i = 0; i < qatorlar.length; i++) {
    html += '<div class="si-qator">' +
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">' +
      qatorlar[i][0] + "</svg>" +
      '<div><div class="si-bosh">' + qatorlar[i][1] + "</div>" +
      '<div class="si-izoh">' + qatorlar[i][2] + "</div></div></div>";
  }
  return html + "</div>";
}

function sotuvchiQatoriHTML() {
  return '<div class="sotib-sotuvchi">Sotuvchi: <b>Arzonchi</b> &middot; rasmiy diler</div>';
}

/* --- TABLAR: Tavsif / Xususiyatlar / Sharhlar / Yetkazish ------------- */
function tablarHTML(mahsulot) {
  var reyting = DOKON.reytingOl(mahsulot.id);
  var sharhSoni = reyting ? " &middot; " + reyting.soni : "";

  // Tavsif paneli
  var tavsif = '<p class="tavsif-matn">' +
    htmlXavfsiz(mahsulot.qisqaTavsif || (mahsulot.nomi + " — Arzonchi'dagi ishonchli mahsulot.")) + "</p>";
  if (mahsulot.xarakteristikalar && typeof mahsulot.xarakteristikalar === "object") {
    var kal = Object.keys(mahsulot.xarakteristikalar).slice(0, 3);
    if (kal.length) {
      tavsif += '<div class="tavsif-kartalar">';
      for (var t = 0; t < kal.length; t++) {
        tavsif += '<div class="tk-karta"><div class="tk-nom">' + htmlXavfsiz(kal[t]) + "</div>" +
          '<div class="tk-qiymat">' + htmlXavfsiz(mahsulot.xarakteristikalar[kal[t]]) + "</div></div>";
      }
      tavsif += "</div>";
    }
  }

  // Xususiyatlar paneli — to'liq jadval (2 ustun)
  var xusQatorlar = "";
  if (mahsulot.xarakteristikalar && typeof mahsulot.xarakteristikalar === "object") {
    Object.keys(mahsulot.xarakteristikalar).forEach(function (kalit, idx) {
      xusQatorlar += '<div class="xus-qator' + (idx % 2 ? " zebra" : "") + '">' +
        '<span class="xus-nom">' + htmlXavfsiz(kalit) + "</span>" +
        '<span class="xus-qiymat">' + htmlXavfsiz(mahsulot.xarakteristikalar[kalit]) + "</span></div>";
    });
  }
  var xususiyat = xusQatorlar
    ? '<div class="xus-jadval">' + xusQatorlar + "</div>"
    : '<p class="tavsif-matn">Xususiyatlar hozircha kiritilmagan.</p>';

  // Yetkazish paneli — yetkazish/to'lov + mavjud filiallar
  var filialChiplari = filialChiplariHTML(mahsulot);
  var yetkazish =
    '<div class="yet-blok"><h3>Yetkazib berish</h3>' +
    '<p>Toshkent bo\'ylab ertaga bepul yetkazib beramiz. Viloyatlarga 2–3 kun ichida. ' +
    "Buyurtmani filialdan bugun olib ketishingiz ham mumkin.</p></div>" +
    '<div class="yet-blok"><h3>To\'lov</h3>' +
    "<p>Naqd, karta yoki muddatli to'lov (nasiya) — dastlabki to'lovsiz, ortiqcha foizsiz. " +
    "To'lov turini rasmiylashtirishda tanlaysiz.</p></div>" +
    '<div class="yet-blok"><h3>Mavjud filiallar</h3>' +
    '<div class="mahsulot-filial-royxati">' + filialChiplari + "</div></div>";

  return '<div class="mahsulot-tablar-obertka">' +
    '<div class="mahsulot-tablar" role="tablist">' +
      '<button type="button" class="mt-tab faol" data-tab="tavsif" role="tab" aria-selected="true">Tavsif</button>' +
      '<button type="button" class="mt-tab" data-tab="xususiyat" role="tab" aria-selected="false">Xususiyatlar</button>' +
      '<button type="button" class="mt-tab" data-tab="fikrlar" role="tab" aria-selected="false">Sharhlar' + sharhSoni + "</button>" +
      '<button type="button" class="mt-tab" data-tab="yetkazish" role="tab" aria-selected="false">Yetkazish va to\'lov</button>' +
    "</div>" +
    '<div class="mt-panellar">' +
      '<div class="mt-panel faol" data-panel="tavsif">' + tavsif + "</div>" +
      '<div class="mt-panel" data-panel="xususiyat" hidden>' + xususiyat + "</div>" +
      '<div class="mt-panel" data-panel="fikrlar" hidden>' + sharhlarBolimiHTML(mahsulot) + "</div>" +
      '<div class="mt-panel" data-panel="yetkazish" hidden>' + yetkazish + "</div>" +
    "</div>" +
    "</div>";
}

/* Mavjud filiallar chiplari (Yetkazish tabida) */
function filialChiplariHTML(mahsulot) {
  var mosFiliallar = [];
  if (Array.isArray(mahsulot.filiallar)) {
    mahsulot.filiallar.forEach(function (filialId) {
      var filial = filialniTop(filialId);
      if (filial) mosFiliallar.push(filial);
    });
  }
  if (!mosFiliallar.length) {
    return '<p>Bu mahsulot uchun filial ma\'lumoti hozircha kiritilmagan. Aniqlik uchun bizga qo\'ng\'iroq qiling.</p>';
  }
  return mosFiliallar.map(function (f) {
    return '<a href="filiallar.html" class="mahsulot-filial-chip">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
      htmlXavfsiz(f.nomi) + "</a>";
  }).join("");
}

/* --- "Birga olsangiz arzon" — to'plam (joriy + 2 ta o'xshash) --------- */
function birgaArzonHTML(mahsulot) {
  if (!mahsulot.mavjud) return "";
  var qoshimcha = oxshashMahsulotlar(mahsulot, 2);
  if (qoshimcha.length < 1) return "";
  var toplam = [mahsulot].concat(qoshimcha);
  var jami = 0;
  for (var i = 0; i < toplam.length; i++) jami += toplam[i].narx;

  var kartalar = "";
  for (var k = 0; k < toplam.length; k++) {
    if (k > 0) kartalar += '<div class="ba-plus">+</div>';
    var m = toplam[k];
    kartalar += '<a class="ba-karta" href="mahsulot.html?id=' + encodeURIComponent(m.id) + '">' +
      '<div class="ba-rasm">' + rasmYokiPlaceholderHTML(m.rasm, m.nomi, "", "") + "</div>" +
      '<div class="ba-nom">' + htmlXavfsiz(m.nomi) + "</div>" +
      '<div class="ba-narx">' + narxniFormatla(m.narx) + "</div></a>";
  }

  var idlar = toplam.map(function (m) { return m.id; }).join(",");
  return '<div class="birga-arzon">' +
    '<h2>Birga olsangiz arzon</h2>' +
    '<div class="ba-qator">' + kartalar + "</div>" +
    '<div class="ba-yakun">' +
      '<div class="ba-jami"><span>Jami ' + toplam.length + ' mahsulot</span><b>' + narxniFormatla(jami) + "</b></div>" +
      '<button type="button" class="tugma tugma-asosiy ba-hammasi" data-toplam="' + htmlXavfsiz(idlar) + '">Hammasini savatga</button>' +
    "</div>" +
    "</div>";
}

/* =======================================================================
   MARKETPLEYS QO'SHIMCHALARI — narx/galereya/nasiya/sharh helperlari
   ======================================================================= */

/* --- Rasm galereyasi (kichik rasmlar) -------------------------------- */
function galereyaHTML(mahsulot) {
  var rasmlar = DOKON.rasmlarOl(mahsulot);
  if (rasmlar.length < 2) return "";
  var html = '<div class="galereya-kichik" id="galereya">';
  for (var i = 0; i < rasmlar.length; i++) {
    html += '<button type="button" class="' + (i === 0 ? "faol" : "") + '" data-rasm="' +
      htmlXavfsiz(rasmlar[i]) + '" aria-label="Rasm ' + (i + 1) + '">' +
      '<img src="' + htmlXavfsiz(rasmlar[i]) + '" alt="" onerror="rasmXatoligi(this)"></button>';
  }
  return html + "</div>";
}

/* --- Rang variantlari — JOYIDA almashadi ------------------------------ */
function rangVariantlariHTML(mahsulot) {
  var ranglar = DOKON.rangVariantlari(mahsulot);
  if (!ranglar.length) return "";
  var html = '<p class="model-izoh">Rang:</p><div class="rang-royxat">';
  for (var i = 0; i < ranglar.length; i++) {
    var r = ranglar[i];
    var joriymi = r.id === mahsulot.id;
    var ichki = '<span class="rang-nuqta" style="background:' + htmlXavfsiz(r.rang || "#ccc") + '"></span>' +
      htmlXavfsiz(r.nom);
    html += r.id && !joriymi
      ? '<button type="button" class="rang-variant" data-model-id="' + htmlXavfsiz(r.id) + '">' + ichki + "</button>"
      : '<span class="rang-variant' + (joriymi ? " faol" : "") + '">' + ichki + "</span>";
  }
  return html + "</div>";
}

/* --- Boshqa modellar (bir xil brend + turkum) — JOYIDA almashadi ------ */
function boshqaModellarHTML(mahsulot) {
  var modellar = [];
  for (var i = 0; i < MAHSULOTLAR.length && modellar.length < 6; i++) {
    var m = MAHSULOTLAR[i];
    if (m.id === mahsulot.id || !m.mavjud) continue;
    if (m.kategoriya !== mahsulot.kategoriya) continue;
    if (mahsulot.brend && m.brend !== mahsulot.brend) continue;
    modellar.push(m);
  }
  if (!modellar.length) return "";

  var html = '<div class="boshqa-modellar"><p class="model-izoh">' +
    (mahsulot.brend ? htmlXavfsiz(mahsulot.brend) + "ning boshqa modellari" : "Boshqa modellar") +
    ' <span class="model-izoh-mayda">— bosing, shu yerda almashadi</span></p>' +
    '<div class="model-royxat">' +
    '<span class="model-chip faol" aria-current="true">' +
    rasmYokiPlaceholderHTML(mahsulot.rasm, mahsulot.nomi, "", "") +
    "<span>" + htmlXavfsiz(mahsulot.nomi) + "<b>" + narxniFormatla(mahsulot.narx) + "</b></span></span>";

  for (var k = 0; k < modellar.length; k++) {
    var mm = modellar[k];
    html += '<button type="button" class="model-chip" data-model-id="' + htmlXavfsiz(mm.id) + '">' +
      rasmYokiPlaceholderHTML(mm.rasm, mm.nomi, "", "") +
      "<span>" + htmlXavfsiz(mm.nomi) + "<b>" + narxniFormatla(mm.narx) + "</b></span></button>";
  }
  return html + "</div></div>";
}

/* --- Nasiya (muddatli to'lov) kalkulyatori --------------------------- */
function nasiyaKalkulyatorHTML(mahsulot) {
  if (!mahsulot.mavjud || !DOKON.nasiyaMumkinmi(mahsulot.narx)) return "";
  var oylar = NASIYA_SHARTLARI.oylar;
  var html = '<div class="nasiya-blok"><h3>Muddatli to\'lov</h3><div class="nasiya-tugmalar">';
  for (var i = 0; i < oylar.length; i++) {
    var oy = oylar[i];
    var oylik = DOKON.nasiyaHisobla(mahsulot.narx, oy);
    html += '<button type="button" class="nasiya-tugma' + (i === oylar.length - 1 ? " faol" : "") + '"' +
      ' data-oy="' + oy + '">' + oy + " oy<b>" + narxniFormatla(oylik) + "</b></button>";
  }
  html += "</div>" +
    '<p class="nasiya-natija" id="nasiya-natija"></p>' +
    '<p class="modal-mayda" style="text-align:left">Hisob taxminiy. Aniq shartlar filialda ' +
    "rasmiylashtirishda belgilanadi.</p></div>";
  return html;
}

/* --- Sharhlar bo'limi ------------------------------------------------- */
function sharhlarBolimiHTML(mahsulot) {
  var sharhlar = DOKON.sharhlarOl(mahsulot.id);
  var reyting = DOKON.reytingOl(mahsulot.id);

  var xulosa = reyting
    ? '<div class="sharh-xulosa"><span class="sharh-ortacha">' + reyting.ortacha + "</span>" +
      "<span>" + DOKON.yulduzHTML(reyting.ortacha) +
      '<br><span class="sharh-sana">' + reyting.soni + " ta fikr asosida</span></span></div>"
    : '<p class="modal-izoh">Bu mahsulotga hali fikr bildirilmagan. Birinchi bo\'ling!</p>';

  var royxat = "";
  for (var i = 0; i < sharhlar.length; i++) {
    var s = sharhlar[i];
    royxat +=
      '<article class="sharh-karta">' +
      '<div class="sharh-bosh">' +
      '<span class="sharh-ism">' + htmlXavfsiz(s.ism) + "</span>" +
      '<span class="sharh-sana">' + htmlXavfsiz(s.sana) + "</span>" +
      "</div>" +
      DOKON.yulduzHTML(s.baho) +
      '<p class="sharh-matn" style="margin-top:8px">' + htmlXavfsiz(s.matn) + "</p>" +
      "</article>";
  }

  return (
    '<div class="sharh-bolim">' +
    xulosa +
    '<button type="button" class="tugma tugma-ikkilamchi" id="sharh-yozish">Fikr qoldirish</button>' +
    '<div class="sharh-royxat" style="margin-top:24px">' + royxat + "</div>" +
    "</div>"
  );
}

/* --- O'xshash mahsulotlar (bir xil turkumdan) ------------------------ */
function oxshashMahsulotlar(mahsulot, soni) {
  var natija = [];
  for (var i = 0; i < MAHSULOTLAR.length && natija.length < soni; i++) {
    var m = MAHSULOTLAR[i];
    if (m.id !== mahsulot.id && m.kategoriya === mahsulot.kategoriya && m.mavjud) natija.push(m);
  }
  return natija;
}

function karusellarHTML(mahsulot) {
  var html = "";

  var oxshash = oxshashMahsulotlar(mahsulot, 10);
  if (oxshash.length) {
    html += '<div class="bolim-ichki-blok"><h2>O\'xshash mahsulotlar</h2>' +
      '<div class="mahsulot-grid">' + oxshash.map(mahsulotKartaHTML).join("") + "</div></div>";
  }

  var kodlar = DOKON.korilganRoyxati(), korilgan = [];
  for (var i = 0; i < kodlar.length && korilgan.length < 5; i++) {
    var m = mahsulotniTop(kodlar[i]);
    if (m && m.id !== mahsulot.id) korilgan.push(m);
  }
  if (korilgan.length) {
    html += '<div class="bolim-ichki-blok"><h2>Ko\'rilgan mahsulotlar</h2>' +
      '<div class="mahsulot-grid">' + korilgan.map(mahsulotKartaHTML).join("") + "</div></div>";
  }

  return html;
}

/* =======================================================================
   HODISALAR — tablar, galereya, nasiya, sotib olish, sharh
   ======================================================================= */
function marketpleysHodisalari(mahsulot) {
  // --- Tablar ---
  var tablar = document.querySelectorAll(".mt-tab");
  function tabniOch(nom) {
    for (var i = 0; i < tablar.length; i++) {
      var faol = tablar[i].getAttribute("data-tab") === nom;
      tablar[i].classList.toggle("faol", faol);
      tablar[i].setAttribute("aria-selected", faol ? "true" : "false");
    }
    var panellar = document.querySelectorAll(".mt-panel");
    for (var p = 0; p < panellar.length; p++) {
      panellar[p].hidden = panellar[p].getAttribute("data-panel") !== nom;
      panellar[p].classList.toggle("faol", panellar[p].getAttribute("data-panel") === nom);
    }
  }
  for (var tb = 0; tb < tablar.length; tb++) {
    tablar[tb].addEventListener("click", function () { tabniOch(this.getAttribute("data-tab")); });
  }
  // "Barcha xususiyat" / "N ta sharh" havolalari tabga o'tkazadi
  var tabgaHavolalar = document.querySelectorAll("[data-tabga]");
  for (var th = 0; th < tabgaHavolalar.length; th++) {
    tabgaHavolalar[th].addEventListener("click", function () {
      var nom = this.getAttribute("data-tabga");
      tabniOch(nom);
      var obertka = document.querySelector(".mahsulot-tablar-obertka");
      if (obertka) obertka.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // --- Nasiya "Hisoblash" — to'liq kalkulyatorni ochadi ---
  var nasiyaHisobTugma = document.getElementById("nasiya-hisob-tugma");
  var nasiyaToliq = document.getElementById("nasiya-toliq");
  if (nasiyaHisobTugma && nasiyaToliq) {
    nasiyaHisobTugma.addEventListener("click", function () {
      nasiyaToliq.hidden = !nasiyaToliq.hidden;
      this.textContent = nasiyaToliq.hidden ? "Hisoblash" : "Yopish";
    });
  }

  // --- Galereya ---
  var galereya = document.getElementById("galereya");
  var asosiyRasm = document.querySelector(".mahsulot-tafsilot-rasm img");
  if (galereya && asosiyRasm) {
    var tugmalar = galereya.querySelectorAll("button");
    for (var i = 0; i < tugmalar.length; i++) {
      tugmalar[i].addEventListener("click", function () {
        asosiyRasm.src = this.getAttribute("data-rasm");
        for (var j = 0; j < tugmalar.length; j++) tugmalar[j].classList.remove("faol");
        this.classList.add("faol");
      });
    }
  }

  // --- Nasiya kalkulyatori tugmalari ---
  var nasiyaTugmalar = document.querySelectorAll(".nasiya-tugma");
  var nasiyaNatija = document.getElementById("nasiya-natija");
  function nasiyaKorsat(oy) {
    if (!nasiyaNatija) return;
    var oylik = DOKON.nasiyaHisobla(mahsulot.narx, oy);
    nasiyaNatija.textContent = oy + " oy davomida oyiga " + narxniFormatla(oylik) +
      " (jami " + narxniFormatla(oylik * oy) + ")";
  }
  for (var n = 0; n < nasiyaTugmalar.length; n++) {
    nasiyaTugmalar[n].addEventListener("click", function () {
      for (var k = 0; k < nasiyaTugmalar.length; k++) nasiyaTugmalar[k].classList.remove("faol");
      this.classList.add("faol");
      nasiyaKorsat(parseInt(this.getAttribute("data-oy"), 10));
    });
  }
  if (nasiyaTugmalar.length) {
    nasiyaKorsat(parseInt(nasiyaTugmalar[nasiyaTugmalar.length - 1].getAttribute("data-oy"), 10));
  }

  // --- "Bir bosishda olish" — savatga qo'shib, rasmiylashtirishga o'tadi ---
  var birBosish = document.querySelector("[data-bir-bosish]");
  if (birBosish) {
    birBosish.addEventListener("click", function () {
      DOKON.savatQosh(mahsulot.id);
      window.location.href = "savat.html";
    });
  }

  // --- "Birga olsangiz arzon" — hammasini savatga ---
  var baHammasi = document.querySelector(".ba-hammasi");
  if (baHammasi) {
    baHammasi.addEventListener("click", function () {
      var idlar = (this.getAttribute("data-toplam") || "").split(",");
      var soni = 0;
      for (var i = 0; i < idlar.length; i++) {
        if (idlar[i] && DOKON.savatQosh(idlar[i])) soni++;
      }
      DOKON.badgelarYangila();
      DOKON.xabar(soni + " ta mahsulot savatga qo'shildi", "ok");
    });
  }

  // --- Fikr qoldirish ---
  var sharhTugma = document.getElementById("sharh-yozish");
  if (sharhTugma) {
    sharhTugma.addEventListener("click", function () {
      if (!DOKON.sotibOlganmi(mahsulot.id)) {
        DOKON.modalOch("Fikr qoldirish",
          '<p class="modal-izoh">Fikrni faqat shu mahsulotni <strong>sotib olgan</strong> mijozlar ' +
          "qoldira oladi — shunda baholar haqiqiy bo'ladi.</p>" +
          '<p class="modal-izoh">Mahsulotni savat orqali rasmiylashtirganingizdan so\'ng bu yerga qaytib fikringizni yozishingiz mumkin.</p>' +
          '<button type="button" class="tugma tugma-asosiy tugma-toliq" id="sharh-yopish">Tushunarli</button>');
        var yop = document.getElementById("sharh-yopish");
        if (yop) yop.addEventListener("click", DOKON.modalYop);
        return;
      }
      DOKON.hisobTalab(function (hisob) { sharhModali(mahsulot, hisob); });
    });
  }

  // --- Rasmga bosilganda katta ko'rinish (lightbox) ---
  var kattaRasm = document.querySelector(".mahsulot-tafsilot-rasm img");
  if (kattaRasm) {
    kattaRasm.style.cursor = "zoom-in";
    kattaRasm.addEventListener("click", function () {
      DOKON.modalOch(mahsulot.nomi,
        '<img src="' + htmlXavfsiz(this.src) + '" alt="' + htmlXavfsiz(mahsulot.nomi) +
        '" class="lightbox-rasm">', "modal--lightbox");
    });
  }

  // --- Boshqa model / rang — JOYIDA almashadi ---
  var modelTugmalar = document.querySelectorAll("[data-model-id]");
  for (var mt = 0; mt < modelTugmalar.length; mt++) {
    modelTugmalar[mt].addEventListener("click", function (h) {
      h.preventDefault();
      var yangi = mahsulotniTop(this.getAttribute("data-model-id"));
      if (!yangi || yangi.id === mahsulot.id) return;
      var konteyner = document.getElementById("mahsulot-tarkib");
      if (!konteyner) return;
      konteyner.classList.add("almashmoqda");
      setTimeout(function () {
        mahsulotniChiz(konteyner, yangi);
        marketpleysHodisalari(yangi);
        DOKON.korilganYoz(yangi.id);
        document.title = yangi.nomi + " — Arzonchi";
        try { history.replaceState(null, "", "mahsulot.html?id=" + encodeURIComponent(yangi.id)); } catch (e) {}
        konteyner.classList.remove("almashmoqda");
      }, 180);
    });
  }

  // Kartochka hodisalari (savat, yurak, rasm aylanishi)
  DOKON.kartochkalarniUla(document);
  DOKON.badgelarYangila();
}

/* --- Fikr yozish modali ---------------------------------------------- */
function sharhModali(mahsulot, hisob) {
  var yulduzlar = "";
  for (var i = 1; i <= 5; i++) {
    yulduzlar += '<button type="button" class="baho-tugma' + (i <= 5 ? " faol" : "") +
      '" data-baho="' + i + '" aria-label="' + i + ' yulduz">&#9733;</button>';
  }

  DOKON.modalOch("Fikringizni qoldiring",
    '<div class="maydon"><span>Bahoyingiz</span>' +
    '<div class="baho-tanlash" id="baho-tanlash">' + yulduzlar + "</div></div>" +
    '<label class="maydon"><span>Fikringiz</span>' +
    '<textarea id="sharh-matn" placeholder="Mahsulot qanday ekan? Nima yoqdi, nima yoqmadi?"></textarea></label>' +
    '<p class="maydon-xato" id="sharh-xato" hidden></p>' +
    '<button type="button" class="tugma tugma-asosiy tugma-toliq" id="sharh-yubor">Yuborish</button>');

  var joriyBaho = 5;
  var bahoTugmalar = document.querySelectorAll("#baho-tanlash .baho-tugma");

  function bahoniKorsat(baho) {
    joriyBaho = baho;
    for (var j = 0; j < bahoTugmalar.length; j++) {
      bahoTugmalar[j].classList.toggle("faol", (j + 1) <= baho);
    }
  }

  for (var b = 0; b < bahoTugmalar.length; b++) {
    bahoTugmalar[b].addEventListener("click", function () {
      bahoniKorsat(parseInt(this.getAttribute("data-baho"), 10));
    });
  }

  var yubor = document.getElementById("sharh-yubor");
  yubor.addEventListener("click", function () {
    var matn = document.getElementById("sharh-matn").value.trim();
    var xato = document.getElementById("sharh-xato");
    if (matn.length < 5) {
      xato.textContent = "Fikringizni yozing (kamida 5 harf).";
      xato.hidden = false;
      return;
    }
    DOKON.sharhQosh(mahsulot.id, { ism: hisob.ism, baho: joriyBaho, matn: matn });
    DOKON.modalYop();
    DOKON.xabar("Fikringiz uchun rahmat!", "ok");
    var konteyner = document.getElementById("mahsulot-tarkib");
    if (konteyner) {
      mahsulotniChiz(konteyner, mahsulot);
      marketpleysHodisalari(mahsulot);
    }
  });
}
