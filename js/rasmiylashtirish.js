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

  V4 (16.09, ega qarori):
   1) To'lov usullari ro'yxati yangilandi — naqd/terminal, Payme/Click,
      bank kartasi (Humo/Uzcard/Visa), "0-0-12" muddatli to'lov
      (foizsiz, boshlang'ich to'lovsiz). Oylik to'lov SOF HISOB — jami
      summa 12 ga bo'linadi (nasiyaOylikToza), serverga so'rov yo'q.
      savat.js dagi ro'yxat bilan bir xil, lekin mustaqil nusxa —
      loyihaning odatiy konventsiyasi (har sahifa skripti alohida).
   2) "Filialdan olib ketish" tanlansa — mijozga rasman e'lon qilingan
      14 ta filialdan (js/filiallar.js, mijozgaOchiqFiliallarRoyxati())
      punkt tanlash paydo bo'ladi. Ikkala yetkazish blokini avvaldan
      chizib, faqat hidden bilan almashtiramiz — to'liq qayta chizish
      (chiz()) YO'Q, aks holda 1-bosqichdagi yozilgan ism/telefon
      yo'qolib qolardi.
  =======================================================================
*/

var OXIRGI_BUYURTMA_KALIT = "arzonchi_oxirgi_buyurtma_v1";

/* To'lov guruhlari — savat.js bilan bir xil ro'yxat (V4, 16.09). */
var TOLOV_GURUHLARI = [
  { kod: "naqd", nom: "Naqd yoki terminal", izoh: "Yetkazib berishda naqd pul yoki terminal orqali karta bilan",
    ikon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="7" width="16" height="10" rx="2"/><circle cx="10" cy="12" r="2"/><path d="M22 9v8a2 2 0 0 1-2 2H6"/></svg>' },
  { kod: "payme-click", nom: "Payme / Click", izoh: "Ilova orqali onlayn, bir zumda va xavfsiz",
    ikon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18h2"/></svg>' },
  { kod: "karta", nom: "Humo / Uzcard / Visa", izoh: "Bank kartangiz orqali to'g'ridan-to'g'ri onlayn to'lov",
    ikon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>' },
  { kod: "nasiya", nom: "0-0-12 muddatli to'lov", izoh: "Boshlang'ich to'lovsiz, ustamasiz — 12 oyga teng bo'lib",
    ikon: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>' }
];

/* "0-0-12": foizsiz, sof bo'lish — jami summa aynan 12 ga bo'linadi.
   Eligibility uchun mavjud DOKON.nasiyaMumkinmi (min narx chegarasi)
   ishlatiladi, hisob-kitobning o'zi mustaqil (server/ustama shart emas). */
function nasiyaOylikToza(jami) { return Math.round(jami / 12); }
function somdanMatn(n) { return narxniFormatla(n).replace(" so'm", "") + " so'mdan"; }

function tolovGuruhiTop(kod) {
  for (var i = 0; i < TOLOV_GURUHLARI.length; i++) {
    if (TOLOV_GURUHLARI[i].kod === kod) return TOLOV_GURUHLARI[i];
  }
  return TOLOV_GURUHLARI[0];
}

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
  var h = DOKON.savatHisob();
  var jami = h.tanlanganJami;
  var nasiyaMumkin = DOKON.nasiyaMumkinmi(jami);
  var nasiyaOylik = nasiyaMumkin ? nasiyaOylikToza(jami) : 0;

  // To'lov variantlari (V4: naqd/terminal, Payme/Click, karta, 0-0-12)
  var tolovlar = "";
  for (var i = 0; i < TOLOV_GURUHLARI.length; i++) {
    var g = TOLOV_GURUHLARI[i];
    var bandmi = g.kod === "nasiya" && !nasiyaMumkin;
    var oylikHTML = "";
    if (g.kod === "nasiya") {
      oylikHTML = nasiyaMumkin
        ? '<span class="cv-oylik">Oyiga ' + somdanMatn(nasiyaOylik) + " (12 oy)</span>"
        : '<span class="cv-oylik cv-oylik--ojiz">Buyurtma summasi nasiya uchun kam</span>';
    }
    tolovlar +=
      '<label class="checkout-variant' + (bandmi ? " checkout-variant--band" : "") + '">' +
      '<input type="radio" name="tolov" value="' + htmlXavfsiz(g.kod) + '"' +
      (i === 0 ? " checked" : "") + (bandmi ? " disabled" : "") + '>' +
      '<span class="cv-radio"></span>' +
      '<span class="cv-ikon">' + g.ikon + '</span>' +
      '<span class="cv-matn"><b>' + htmlXavfsiz(g.nom) + "</b><span>" + htmlXavfsiz(g.izoh) + "</span>" + oylikHTML + "</span>" +
      (g.kod === "nasiya" ? '<span class="cv-ong cv-bepul">0% ustama</span>' : "") +
      "</label>";
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
    '<span class="cv-matn"><b>Filialdan olib ketaman</b><span>14 ta filial · bugun tayyor</span></span>' +
    '<span class="cv-ong">0 so\'m</span></label>' +
    "</div>" +
    '<div id="yetkazish-kuryer-blok">' +
    '<button type="button" class="checkout-manzil" data-shahar-tugma>' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
    '<span data-manzil-matn>' + (manzil ? htmlXavfsiz(manzil.shahar || "Toshkent") : "Shaharni tanlang") + '</span></button>' +
    "</div>" +
    '<div id="yetkazish-filial-blok" hidden>' + punktTanlashHTML() + "</div>" +
    "</section>" +

    // 3. To'lov usuli
    '<section class="checkout-blok">' +
    '<div class="checkout-blok-bosh"><span class="cb-raqam">3</span><h2>To\'lov usuli</h2></div>' +
    '<div class="checkout-variantlar">' + tolovlar + "</div>" +
    "</section>" +

    "</div>";

  tarkib.innerHTML =
    '<div class="checkout-tuzilma">' + forma + xulosaHTML(nasiyaMumkin, nasiyaOylik) + "</div>";

  hodisalarniUla();
  DOKON.badgelarYangila();
}

/* ---------------------------------------------------------------
   PUNKT (FILIAL) TANLASH — mijozga rasman e'lon qilingan 14 ta
   filialdan (js/filiallar.js, mijozgaOchiqFiliallarRoyxati()).
   Bazadagi 30 ta emas — ega qarori (16.09), FILIALLAR-KOORDINATA.md.
---------------------------------------------------------------- */
function ochiqPunktlar() {
  return (typeof mijozgaOchiqFiliallarRoyxati === "function") ? mijozgaOchiqFiliallarRoyxati() : [];
}

function tanlanganPunktId(royxat) {
  if (!royxat.length) return "";
  var manzil = DOKON.manzilOl();
  if (manzil && manzil.filialId) {
    for (var i = 0; i < royxat.length; i++) {
      if (royxat[i].id === manzil.filialId) return royxat[i].id;
    }
  }
  return royxat[0].id;
}

function punktTanlashHTML() {
  var royxat = ochiqPunktlar();
  if (!royxat.length) {
    return '<p class="maydon-xato">Filiallar ro\'yxatini ko\'rsatib bo\'lmadi. js/filiallar.js faylini tekshiring.</p>';
  }
  var tanlangan = tanlanganPunktId(royxat);
  var optionlar = "";
  for (var i = 0; i < royxat.length; i++) {
    optionlar += '<option value="' + htmlXavfsiz(royxat[i].id) + '"' +
      (royxat[i].id === tanlangan ? " selected" : "") + ">" + htmlXavfsiz(royxat[i].nomi) + "</option>";
  }
  return (
    '<label class="maydon punkt-maydon"><span>Filialni tanlang (' + royxat.length + ' ta)</span>' +
    '<select id="punkt-select">' + optionlar + "</select></label>" +
    '<div class="punkt-malumot" id="punkt-malumot">' + punktMalumotHTML(tanlangan) + "</div>"
  );
}

function punktMalumotHTML(filialId) {
  var f = filialniTop(filialId);
  if (!f) return "";
  var qatorlar = filialQatoriHTML(FILIAL_IKONKA_JOY, f.manzil, false) +
    filialQatoriHTML(FILIAL_IKONKA_VAQT, f.ishVaqti, false);
  return qatorlar || '<p class="modal-mayda">Bu filial uchun manzil hali kiritilmagan — buyurtma berishdan oldin filialga qo\'ng\'iroq qiling.</p>';
}

function xulosaHTML(nasiyaMumkin, nasiyaOylik) {
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

  var nasiyaEslatmaHTML = nasiyaMumkin
    ? '<div class="arz-nasiya-eslatma"><span>Muddatli to\'lovda</span>' +
      "<span>" + somdanMatn(nasiyaOylik) + " (0-0-12)</span></div>"
    : "";

  return (
    '<aside class="checkout-xulosa">' +
    "<h2>Buyurtma xulosasi</h2>" +
    '<div class="xk-royxat">' + qatorlar + "</div>" +
    '<div class="xulosa-qator"><span>Mahsulotlar (' + dona + " dona)</span><span>" + narxniFormatla(h.tanlanganJami) + "</span></div>" +
    '<div class="xulosa-qator"><span>Yetkazib berish</span><span class="xulosa-tejam">Bepul</span></div>' +
    tejamHTML +
    '<div class="xulosa-qator xulosa-qator--jami"><span>Jami</span><span>' + narxniFormatla(h.tanlanganJami) + "</span></div>" +
    nasiyaEslatmaHTML +
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

  // Yetkazish turi (kuryer/filial) — faqat tegishli blokni ko'rsatadi,
  // sahifa qayta chizilmaydi (1-bosqichdagi yozilgan ma'lumot saqlanadi).
  var yetRadio = document.querySelectorAll('input[name="yetkazish"]');
  for (var j = 0; j < yetRadio.length; j++) {
    yetRadio[j].addEventListener("change", function () {
      var kuryerBlok = document.getElementById("yetkazish-kuryer-blok");
      var filialBlok = document.getElementById("yetkazish-filial-blok");
      var filialTanlandi = this.value === "filial";
      if (kuryerBlok) kuryerBlok.hidden = filialTanlandi;
      if (filialBlok) filialBlok.hidden = !filialTanlandi;
    });
  }

  // Punkt tanlanganda — tanlangan filial ma'lumoti yangilanadi
  var punktSelect = document.getElementById("punkt-select");
  if (punktSelect) {
    punktSelect.addEventListener("change", function () {
      var info = document.getElementById("punkt-malumot");
      if (info) info.innerHTML = punktMalumotHTML(this.value);
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

  // To'lov (V4: TOLOV_GURUHLARI — naqd/payme-click/karta/nasiya)
  var tanlanganTolov = document.querySelector('input[name="tolov"]:checked');
  var tolovKod = tanlanganTolov ? tanlanganTolov.value : "naqd";
  var tolovObj = tolovGuruhiTop(tolovKod);
  var tolovNomi = tolovObj.nom;
  if (tolovKod === "nasiya" && DOKON.nasiyaMumkinmi(h.tanlanganJami)) {
    tolovNomi += " (oyiga " + somdanMatn(nasiyaOylikToza(h.tanlanganJami)) + ", 12 oy)";
  }

  // Yetkazish
  var tanlanganYet = document.querySelector('input[name="yetkazish"]:checked');
  var yetKod = tanlanganYet ? tanlanganYet.value : "kuryer";
  var manzil = DOKON.manzilOl();
  var shahar = manzil && manzil.shahar ? manzil.shahar : "Toshkent";
  var yetkazishMatn;
  if (yetKod === "filial") {
    var punktSelect = document.getElementById("punkt-select");
    // Punkt tanlash ro'yxati 14 talik ko'rgazmali nom bilan chizilgan edi
    // (mijozgaOchiqFiliallarRoyxati -> korinadiganNom); mijoz shuni tanladi,
    // shuning uchun tasdiqda ham AYNAN o'sha nom ko'rinishi kerak — raw
    // filialniTop() bazadagi boshqacha nom qaytarishi mumkin (30 talik ro'yxat).
    var punktRoyxat = ochiqPunktlar();
    var punktF = null;
    for (var pi = 0; pi < punktRoyxat.length; pi++) {
      if (punktSelect && punktRoyxat[pi].id === punktSelect.value) { punktF = punktRoyxat[pi]; break; }
    }
    yetkazishMatn = "Filialdan olib ketish — " + (punktF ? punktF.nomi : "tanlangan filial");
  } else {
    yetkazishMatn = "Kuryer yetkazib beradi — " + shahar + ", 1 kun ichida";
  }

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
