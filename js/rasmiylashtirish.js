/*
  =======================================================================
  RASMIYLASHTIRISH.JS — buyurtma rasmiylashtirish sahifasi
  (Dizayner Rasmiylashtirish.dc.html, TZ 07 — 4-qadamli stepper)
  =======================================================================
  Savatdan tanlangan mahsulotlar bilan kelinadi. Chap ustunda forma
  (aloqa · yetkazib berish · to'lov), o'ng ustunda buyurtma xulosasi.
  "Buyurtma berish" bosilganda buyurtma yoziladi, savatdagi tanlanganlar
  tozalanadi va tasdiq.html sahifasiga o'tiladi.

  Server yo'q — buyurtma brauzer xotirasiga (buyurtmalarim) yoziladi va
  royxat-server ishga tushgan bo'lsa unga ham yuboriladi.
  =======================================================================
*/

var OXIRGI_BUYURTMA_KALIT = "arzonchi_oxirgi_buyurtma_v1";

document.addEventListener("DOMContentLoaded", function () {
  var tarkib = document.getElementById("rasmiy-tarkib");
  if (!tarkib) return;

  if (!mahsulotlarRoyxatiTogri()) {
    xatoXabariniChiz("rasmiy-tarkib", "Ma'lumot yuklanmadi",
      "Mahsulotlar ro'yxatini o'qib bo'lmadi.");
    return;
  }

  var h = DOKON.savatHisob();
  if (h.tanlanganTur === 0) {
    tarkib.innerHTML = boshHolatHTML({
      ikonka: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
      sarlavha: "Rasmiylashtirish uchun mahsulot yo'q",
      izoh: "Savatda belgilangan mahsulot topilmadi. Avval savatga qaytib mahsulot tanlang.",
      tugma: '<a href="savat.html" class="tugma tugma-asosiy">Savatga qaytish</a>'
    });
    return;
  }

  chiz();
});

function chiz() {
  var tarkib = document.getElementById("rasmiy-tarkib");
  var hisob = DOKON.hisobOl();
  var manzil = DOKON.manzilOl();

  // To'lov variantlari
  var tolovlar = "";
  for (var i = 0; i < TOLOV_USULLARI.length; i++) {
    var t = TOLOV_USULLARI[i];
    tolovlar +=
      '<label class="checkout-variant"><input type="radio" name="tolov" value="' + htmlXavfsiz(t.kod) + '"' +
      (i === 0 ? " checked" : "") + '>' +
      '<span class="cv-radio"></span>' +
      '<span class="cv-matn"><b>' + htmlXavfsiz(t.nom) + "</b><span>" + htmlXavfsiz(t.izoh) + "</span></span></label>";
  }

  var forma =
    '<div class="checkout-forma">' +

    // 1. Aloqa ma'lumotlari
    '<section class="checkout-blok">' +
    '<div class="checkout-blok-bosh"><span class="cb-raqam">1</span><h2>Aloqa ma\'lumotlari</h2></div>' +
    '<div class="checkout-maydonlar">' +
    '<label class="maydon"><span>Ism va familiya</span>' +
    '<input type="text" id="mijoz-ism" value="' + htmlXavfsiz(hisob && hisob.ism ? hisob.ism : "") + '" placeholder="Ismingiz" autocomplete="name"></label>' +
    '<label class="maydon"><span>Telefon raqam</span>' +
    '<input type="tel" id="mijoz-telefon" value="' + htmlXavfsiz(hisob && hisob.telefon ? DOKON.telefonKorinishi(hisob.telefon) : "") + '" placeholder="+998 90 123 45 67" inputmode="tel" autocomplete="tel"></label>' +
    '<label class="maydon maydon--keng"><span>Email <span class="maydon-ixtiyoriy">— ixtiyoriy</span></span>' +
    '<input type="email" id="mijoz-email" placeholder="pochta@misol.uz" autocomplete="email"></label>' +
    '</div>' +
    '<p class="maydon-xato" id="aloqa-xato" hidden></p>' +
    "</section>" +

    // 2. Yetkazib berish
    '<section class="checkout-blok">' +
    '<div class="checkout-blok-bosh"><span class="cb-raqam">2</span><h2>Yetkazib berish</h2></div>' +
    '<div class="checkout-variantlar" id="yetkazish-royxat">' +
    '<label class="checkout-variant"><input type="radio" name="yetkazish" value="kuryer" checked>' +
    '<span class="cv-radio"></span>' +
    '<span class="cv-ikon"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="1.5" y="6" width="14" height="10" rx="2"/><path d="M15.5 9h3.5l3 3.5V16h-6.5"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg></span>' +
    '<span class="cv-matn"><b>Kuryer yetkazib beradi</b><span>Toshkent bo\'ylab, 1 kun ichida</span></span>' +
    '<span class="cv-ong cv-bepul">Bepul</span></label>' +
    '<label class="checkout-variant"><input type="radio" name="yetkazish" value="filial">' +
    '<span class="cv-radio"></span>' +
    '<span class="cv-ikon"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 10l9-6 9 6v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 21v-7h6v7"/></svg></span>' +
    '<span class="cv-matn"><b>Filialdan olib ketaman</b><span>30 ta filial · bugun tayyor</span></span>' +
    '<span class="cv-ong">0 so\'m</span></label>' +
    "</div>" +
    '<button type="button" class="checkout-manzil" data-shahar-tugma>' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
    '<span data-manzil-matn>' + (manzil ? htmlXavfsiz(manzil.shahar || "Toshkent") : "Shaharni tanlang") + '</span></button>' +
    "</section>" +

    // 3. To'lov usuli
    '<section class="checkout-blok">' +
    '<div class="checkout-blok-bosh"><span class="cb-raqam">3</span><h2>To\'lov usuli</h2></div>' +
    '<div class="checkout-variantlar">' + tolovlar + "</div>" +
    "</section>" +

    "</div>";

  tarkib.innerHTML =
    '<div class="checkout-tuzilma">' + forma + xulosaHTML() + "</div>";

  hodisalarniUla();
  DOKON.badgelarYangila();
}

function xulosaHTML() {
  var h = DOKON.savatHisob();
  var royxat = DOKON.savatRoyxati();

  var qatorlar = "";
  var dona = 0;
  for (var i = 0; i < royxat.length; i++) {
    if (!royxat[i].tanlangan) continue;
    var m = mahsulotniTop(royxat[i].id);
    if (!m) continue;
    dona += royxat[i].soni;
    qatorlar +=
      '<div class="xk-qator">' +
      '<div class="xk-rasm">' + rasmYokiPlaceholderHTML(m.rasm, m.nomi, "", "") + "</div>" +
      '<div class="xk-nom">' + htmlXavfsiz(m.nomi) +
      '<span class="xk-soni">' + royxat[i].soni + " dona</span></div>" +
      '<div class="xk-narx">' + narxniFormatla(m.narx * royxat[i].soni) + "</div>" +
      "</div>";
  }

  var tejamHTML = h.tejaldi > 0
    ? '<div class="xulosa-qator"><span>Aksiya bo\'yicha tejaldi</span><span class="xulosa-tejam">' + narxniFormatla(h.tejaldi) + "</span></div>"
    : "";

  return (
    '<aside class="checkout-xulosa">' +
    "<h2>Buyurtma xulosasi</h2>" +
    '<div class="xk-royxat">' + qatorlar + "</div>" +
    '<div class="xulosa-qator"><span>Mahsulotlar (' + dona + " dona)</span><span>" + narxniFormatla(h.tanlanganJami) + "</span></div>" +
    '<div class="xulosa-qator"><span>Yetkazib berish</span><span class="xulosa-tejam">Bepul</span></div>' +
    tejamHTML +
    '<div class="xulosa-qator xulosa-qator--jami"><span>Jami</span><span>' + narxniFormatla(h.tanlanganJami) + "</span></div>" +
    '<button type="button" class="karta-cta checkout-berish" id="buyurtma-berish">Buyurtma berish</button>' +
    '<p class="modal-mayda">Tugmani bosish orqali ommaviy oferta shartlariga rozilik bildirasiz.</p>' +
    "</aside>"
  );
}

function hodisalarniUla() {
  var berish = document.getElementById("buyurtma-berish");
  if (berish) berish.addEventListener("click", buyurtmaBer);

  var el = document.querySelectorAll("[data-shahar-tugma]");
  for (var i = 0; i < el.length; i++) {
    el[i].addEventListener("click", function (h) {
      h.preventDefault();
      DOKON.shaharModal();
    });
  }
}

function buyurtmaBer() {
  var ism = (document.getElementById("mijoz-ism").value || "").trim();
  var telefonXom = (document.getElementById("mijoz-telefon").value || "").trim();
  var email = (document.getElementById("mijoz-email").value || "").trim();
  var xato = document.getElementById("aloqa-xato");

  if (ism.length < 2) {
    xato.textContent = "Ism va familiyangizni to'liq yozing.";
    xato.hidden = false;
    document.getElementById("mijoz-ism").focus();
    return;
  }
  if (!DOKON.telefonTogrimi(telefonXom)) {
    xato.textContent = "Telefon raqamni to'g'ri kiriting (masalan +998 90 123 45 67).";
    xato.hidden = false;
    document.getElementById("mijoz-telefon").focus();
    return;
  }
  xato.hidden = true;

  var h = DOKON.savatHisob();
  if (h.tanlanganTur === 0) {
    DOKON.xabar("Belgilangan mahsulot topilmadi.", "ogoh");
    return;
  }

  // Hisobni saqlab qo'yamiz (keyingi safar avtomatik to'lsin)
  DOKON.hisobYoz({ ism: ism, telefon: telefonXom });

  // To'lov
  var tanlanganTolov = document.querySelector('input[name="tolov"]:checked');
  var tolovKod = tanlanganTolov ? tanlanganTolov.value : "naqd";
  var tolovNomi = tolovKod;
  for (var i = 0; i < TOLOV_USULLARI.length; i++) {
    if (TOLOV_USULLARI[i].kod === tolovKod) tolovNomi = TOLOV_USULLARI[i].nom;
  }

  // Yetkazish
  var tanlanganYet = document.querySelector('input[name="yetkazish"]:checked');
  var yetKod = tanlanganYet ? tanlanganYet.value : "kuryer";
  var manzil = DOKON.manzilOl();
  var shahar = manzil && manzil.shahar ? manzil.shahar : "Toshkent";
  var yetkazishMatn = yetKod === "filial"
    ? "Filialdan olib ketish — " + shahar
    : "Kuryer yetkazib beradi — " + shahar + ", 1 kun ichida";

  // Tanlangan mahsulotlar
  var royxat = DOKON.savatRoyxati();
  var mahsulotlar = [];
  var olinganIdlar = [];
  for (var bi = 0; bi < royxat.length; bi++) {
    if (!royxat[bi].tanlangan) continue;
    var bm = mahsulotniTop(royxat[bi].id);
    if (!bm) continue;
    mahsulotlar.push({
      id: bm.id, nomi: bm.nomi, soni: royxat[bi].soni,
      narxMatn: narxniFormatla(bm.narx * royxat[bi].soni)
    });
    olinganIdlar.push(bm.id);
  }

  var raqam = "AR-" + String(Date.now()).slice(-6);
  var telefonKor = DOKON.telefonKorinishi(telefonXom);
  var buyurtma = {
    raqam: raqam,
    sana: new Date().toISOString(),
    mijoz: { ism: ism, telefon: telefonKor, email: email },
    tolov: tolovNomi,
    yetkazish: yetkazishMatn,
    mahsulotlar: mahsulotlar,
    jamiMatn: narxniFormatla(h.tanlanganJami)
  };

  // Buyurtmani yozamiz (buyurtmalarim + server md), so'ng savatni tozalaymiz
  DOKON.buyurtmaYoz(buyurtma);
  DOKON.sotibOlinganYoz(olinganIdlar);
  for (var oi = 0; oi < olinganIdlar.length; oi++) DOKON.savatOchir(olinganIdlar[oi]);

  // Tasdiq sahifasi uchun saqlaymiz
  try {
    sessionStorage.setItem(OXIRGI_BUYURTMA_KALIT, JSON.stringify(buyurtma));
  } catch (e) { /* sessionStorage yopiq bo'lsa ham davom */ }

  window.location.href = "tasdiq.html";
}
