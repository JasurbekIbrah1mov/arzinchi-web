/*
  =======================================================================
  TASDIQ.JS — buyurtma tasdiqlangan sahifa (Dizayner Tasdiq.dc.html)
  =======================================================================
  rasmiylashtirish.html'dan kelinadi: buyurtma sessionStorage'ga
  yozilgan bo'ladi. Bu sahifa uni o'qib, muvaffaqiyat ekrani + holat
  chizig'i + buyurtma tafsilotlarini ko'rsatadi. To'g'ridan-to'g'ri
  kirilsa (buyurtmasiz) — bo'sh holat + savatga havola.
  =======================================================================
*/

var OXIRGI_BUYURTMA_KALIT = "arzonchi_oxirgi_buyurtma_v1";

document.addEventListener("DOMContentLoaded", function () {
  var tarkib = document.getElementById("tasdiq-tarkib");
  if (!tarkib) return;

  var buyurtma = null;
  try {
    var xom = sessionStorage.getItem(OXIRGI_BUYURTMA_KALIT);
    if (xom) buyurtma = JSON.parse(xom);
  } catch (e) { buyurtma = null; }

  if (!buyurtma || !buyurtma.raqam) {
    tarkib.innerHTML = boshHolatHTML({
      ikonka: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
      sarlavha: "Buyurtma topilmadi",
      izoh: "Bu sahifa buyurtma rasmiylashtirilgandan so'ng ko'rsatiladi. Savatingizni ko'rib chiqing.",
      tugma: '<a href="savat.html" class="tugma tugma-asosiy">Savatga o\'tish</a>'
    });
    DOKON.badgelarYangila();
    return;
  }

  chiz(tarkib, buyurtma);
  DOKON.badgelarYangila();
});

function chiz(tarkib, b) {
  var telSongi = (function () {
    var raqamlar = String(b.mijoz && b.mijoz.telefon ? b.mijoz.telefon : "").replace(/\D/g, "");
    return raqamlar.length >= 2 ? raqamlar.slice(-2) : "**";
  })();

  // Mahsulot qatorlari
  var mahsulotlar = "";
  var m = b.mahsulotlar || [];
  for (var i = 0; i < m.length; i++) {
    mahsulotlar +=
      '<div class="td-mahsulot">' +
      '<div class="td-nom">' + htmlXavfsiz(m[i].nomi) +
      '<span class="td-soni">' + m[i].soni + " dona</span></div>" +
      '<div class="td-narx">' + htmlXavfsiz(m[i].narxMatn) + "</div>" +
      "</div>";
  }

  // Holat chizig'i (timeline)
  var bosqichlar = [
    { nom: "Qabul qilindi", izoh: "Hozir", holat: "tugadi" },
    { nom: "Operator tasdiqlaydi", izoh: "10 daqiqa ichida", holat: "" },
    { nom: "Yo'lga chiqdi", izoh: "Ertaga ertalab", holat: "" },
    { nom: "Yetkazildi", izoh: "1 kun ichida", holat: "" }
  ];
  var timeline = '<div class="td-timeline">';
  for (var t = 0; t < bosqichlar.length; t++) {
    if (t > 0) timeline += '<div class="td-tl-chiziq' + (bosqichlar[t - 1].holat === "tugadi" && bosqichlar[t].holat === "tugadi" ? " tugadi" : "") + '"></div>';
    var bel = bosqichlar[t].holat === "tugadi"
      ? '<span class="td-tl-belgi tugadi"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg></span>'
      : '<span class="td-tl-belgi"></span>';
    timeline +=
      '<div class="td-tl-band">' + bel +
      '<div class="td-tl-matn"><b>' + bosqichlar[t].nom + "</b><span>" + bosqichlar[t].izoh + "</span></div></div>";
  }
  timeline += "</div>";

  tarkib.innerHTML =
    // Muvaffaqiyat karta
    '<div class="td-muvaffaqiyat">' +
    '<div class="td-belgi"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg></div>' +
    "<h1>Buyurtmangiz qabul qilindi</h1>" +
    '<p class="td-raqam">Raqami <b>' + htmlXavfsiz(b.raqam) + "</b> &middot; tasdiq SMS +998 " +
    "** *** " + telSongi + " raqamiga yuboriladi</p>" +
    '<div class="td-tugmalar">' +
    '<a href="buyurtmalarim.html" class="tugma tugma-asosiy">Buyurtmalarim</a>' +
    '<a href="katalog.html" class="tugma tugma-ikkilamchi">Xaridni davom ettirish</a>' +
    "</div>" +
    "</div>" +

    // Holat chizig'i
    '<div class="td-blok">' + timeline + "</div>" +

    // Tafsilotlar (2 ustun)
    '<div class="td-tafsilot">' +
    '<div class="td-karta">' +
    "<h2>Buyurtma tarkibi</h2>" + mahsulotlar +
    '<div class="td-jami"><span>Jami</span><span>' + htmlXavfsiz(b.jamiMatn) + "</span></div>" +
    "</div>" +
    '<div class="td-karta">' +
    "<h2>Yetkazish va to'lov</h2>" +
    td_qator("Mijoz", b.mijoz ? b.mijoz.ism : "") +
    td_qator("Telefon", b.mijoz ? b.mijoz.telefon : "") +
    (b.mijoz && b.mijoz.email ? td_qator("Email", b.mijoz.email) : "") +
    td_qator("Yetkazish", b.yetkazish) +
    td_qator("To'lov", b.tolov) +
    "</div>" +
    "</div>" +
    '<p class="modal-mayda" style="margin-top:16px">Bu — namoyish rejimi: haqiqiy SMS va operator ' +
    "tasdig'i server ulangach ishlaydi. Buyurtma ma'lumotlaringiz saqlab qo'yildi.</p>";
}

function td_qator(nom, qiymat) {
  return '<div class="td-satr"><span>' + htmlXavfsiz(nom) + "</span><span>" + htmlXavfsiz(qiymat || "—") + "</span></div>";
}
