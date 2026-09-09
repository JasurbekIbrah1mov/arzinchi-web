/*
  BOSH-SAHIFA.JS — faqat index.html sahifasida ishlatiladi.
  Vazifasi: "Tavsiya etilgan mahsulotlar" bo'limini MAHSULOTLAR
  massividan olib, kartochkalar shaklida chizish.
*/

document.addEventListener("DOMContentLoaded", function () {
  var konteyner = document.getElementById("tavsiya-mahsulotlar");
  if (!konteyner) return;

  if (!mahsulotlarRoyxatiTogri()) {
    xatoXabariniChiz(
      "tavsiya-mahsulotlar",
      "Mahsulotlar ro'yxatini ko'rsatib bo'lmadi",
      "Ma'lumotlar faylida xatolik bo'lishi mumkin (js/malumotlar-mahsulot.js). Iltimos, faylni tekshiring yoki sayt egasiga xabar bering."
    );
    return;
  }

  // Marketpleys: aksiyadagi mahsulotlar birinchi, keyin qolganlari.
  // Butun ro'yxat beriladi — "Yana ko'rsatish" bo'lak-bo'lak chizadi.
  var mavjudlar = MAHSULOTLAR.filter(function (m) { return m.mavjud; });
  if (mavjudlar.length === 0) mavjudlar = MAHSULOTLAR.slice();

  var aksiyada = [], qolgani = [];
  for (var i = 0; i < mavjudlar.length; i++) {
    (DOKON.aksiyaOl(mavjudlar[i]) ? aksiyada : qolgani).push(mavjudlar[i]);
  }
  var tavsiyaRoyxati = aksiyada.concat(qolgani);

  var yanaBlok = boshYanaBlok(konteyner);
  DOKON.yanaKorsatUla({
    grid: konteyner,
    royxat: tavsiyaRoyxati,
    boshlangich: 10,
    qadam: 10,
    tugma: yanaBlok.querySelector(".yana-tugma"),
    hisoblagich: yanaBlok.querySelector(".yana-hisob")
  });
});

/* -----------------------------------------------------------------
   MAHSULOT KARUSELLARI — bosh sahifa
   Jasur aka: "karusellar bo'lishi kerak — har bitta mahsulotni
   qisqacha obzori, rasmi, holati". Ikki qator: chegirmadagilar va
   yangi kelganlar. Gorizontal suriladi (barmoq/sichqoncha), o'q
   tugmalari bor, "Hammasini ko'rish" katalogga olib boradi.
   Avtomatik aylanmaydi — mahsulot qatori mijoz qo'li ostida turishi
   kerak (faqat reklama banneri o'zi aylanadi).
------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("tavsiya-mahsulotlar");
  if (!grid || !mahsulotlarRoyxatiTogri()) return;
  var joy = grid.closest("section");
  if (!joy || !joy.parentNode) return;

  /* Bosh sahifadagi karusellarga FAQAT haqiqiy fotosi borlari tushadi.
     Sabab: ro'yxat oxirida 12 ta eski namuna mahsulot bor (mt-001…mt-012),
     ularning rasm yo'li hech qachon mavjud bo'lmagan. "Yangi kelganlar"
     ro'yxat oxiridan olingani uchun butun qator "Rasm mavjud emas"
     bo'lib chiqardi. Lokal nusxasi bo'lgan (ya'ni API'dan kelgan va
     tayyorlangan) mahsulotlarni olamiz. */
  var mavjud = MAHSULOTLAR.filter(function (m) {
    return m.mavjud && m.rasm && lokalRasmYoli(m.rasm);
  });

  var chegirmadagilar = mavjud.filter(function (m) { return !!DOKON.aksiyaOl(m); }).slice(0, 12);
  // "Yangi kelganlar" — ro'yxat oxiridagilar (API oxirgi qo'shilganlarni oxiriga yozadi)
  var yangilar = mavjud.slice(-12).reverse();

  var qatorlar = [
    { id: "karusel-chegirma", sarlavha: "Chegirmadagi mahsulotlar", royxat: chegirmadagilar, havola: "katalog.html?aksiya=1" },
    { id: "karusel-yangi",    sarlavha: "Yangi kelganlar",          royxat: yangilar,        havola: "katalog.html" }
  ];

  for (var q = qatorlar.length - 1; q >= 0; q--) {
    var qator = qatorlar[q];
    if (qator.royxat.length < 3) continue;
    var bolim = document.createElement("section");
    bolim.className = "bolim mahsulot-karusel-bolim";
    bolim.innerHTML =
      '<div class="konteyner">' +
      '<div class="karusel-bosh">' +
      "<h2>" + htmlXavfsiz(qator.sarlavha) + "</h2>" +
      '<div class="karusel-boshqaruv">' +
      '<a class="karusel-hammasi" href="' + qator.havola + '">Hammasini ko\'rish &rarr;</a>' +
      '<button type="button" class="karusel-oq" data-oq="-1" aria-label="Oldingi">&#8249;</button>' +
      '<button type="button" class="karusel-oq" data-oq="1" aria-label="Keyingi">&#8250;</button>' +
      "</div></div>" +
      '<div class="mahsulot-karusel" id="' + qator.id + '">' + qator.royxat.map(mahsulotKartaHTML).join("") + "</div>" +
      "</div>";
    joy.parentNode.insertBefore(bolim, joy);

    (function (karusel, tugmalar) {
      for (var t = 0; t < tugmalar.length; t++) {
        tugmalar[t].addEventListener("click", function () {
          var yonalish = parseInt(this.getAttribute("data-oq"), 10);
          var birKarta = karusel.firstElementChild ? karusel.firstElementChild.offsetWidth + 12 : 220;
          karusel.scrollBy({ left: yonalish * birKarta * 2, behavior: "smooth" });
        });
      }
    })(bolim.querySelector(".mahsulot-karusel"), bolim.querySelectorAll(".karusel-oq"));
  }

  DOKON.kartochkalarniUla(document);
  DOKON.badgelarYangila();
});

/* Bosh sahifadagi "Yana ko'rsatish" bloki (grid ostiga bir marta) */
function boshYanaBlok(grid) {
  var mavjud = document.getElementById("bosh-yana-blok");
  if (mavjud) return mavjud;
  var blok = document.createElement("div");
  blok.id = "bosh-yana-blok";
  blok.className = "yana-blok";
  blok.innerHTML =
    '<p class="yana-hisob"></p>' +
    '<button type="button" class="yana-tugma">Yana ko\'rsatish</button>';
  grid.parentNode.insertBefore(blok, grid.nextSibling);
  return blok;
}

/* -----------------------------------------------------------------
   REKLAMA KARUSELI
   Jasur aka: "har doim biz reklama berganimizda mana shu joyga
   karusel bo'lib chiqib turishi kerak".
   Bannerlar `js/malumotlar-qoshimcha.js` dagi REKLAMA_BANNERLARI
   massividan olinadi — kelajakda admin panel shu massivni to'ldiradi.
   Swiper kabi kutubxona ISHLATILMAYDI: CSS scroll-snap yetadi.
------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  // HERO endi qora aylanadigan banner (TZ 04). Bannerlar #hero-banner ichiga
  // chiziladi; alohida "reklama-bolim" YARATILMAYDI.
  var joy = document.getElementById("hero-banner");
  if (!joy) return;
  if (typeof REKLAMA_BANNERLARI === "undefined" || !REKLAMA_BANNERLARI.length) return;

  var slaydlar = "", nuqtalar = "";
  for (var i = 0; i < REKLAMA_BANNERLARI.length; i++) {
    var b = REKLAMA_BANNERLARI[i];
    slaydlar +=
      '<a class="hero-slayd" href="' + htmlXavfsiz(b.havola || "#") + '">' +
        '<span class="hero-slayd-glow" aria-hidden="true"></span>' +
        '<div class="hero-slayd-matn">' +
          (b.yorliq ? '<span class="hero-slayd-yorliq">' + htmlXavfsiz(b.yorliq) + "</span>" : "") +
          "<h2>" + htmlXavfsiz(b.sarlavha) + "</h2>" +
          "<p>" + htmlXavfsiz(b.matn) + "</p>" +
          (b.tugmaMatn ? '<span class="hero-slayd-tugma">' + htmlXavfsiz(b.tugmaMatn) + " &rarr;</span>" : "") +
        "</div>" +
        (b.mahsulotRasm
          ? '<img class="hero-slayd-rasm" src="' + htmlXavfsiz(b.mahsulotRasm) + '" alt="" loading="eager" onerror="this.remove()">'
          : "") +
      "</a>";
    nuqtalar += '<button type="button" class="hero-nuqta' + (i === 0 ? " hero-nuqta--faol" : "") +
      '" data-slayd="' + i + '" aria-label="Banner ' + (i + 1) + '"></button>';
  }

  joy.innerHTML =
    '<div class="hero-karusel" id="hero-karusel">' + slaydlar + "</div>" +
    '<div class="hero-nuqtalar">' + nuqtalar + "</div>";

  var karusel = document.getElementById("hero-karusel");
  var nuqtaTugmalar = joy.querySelectorAll(".hero-nuqta");

  for (var n = 0; n < nuqtaTugmalar.length; n++) {
    (function (indeks) {
      nuqtaTugmalar[indeks].addEventListener("click", function () {
        karusel.scrollTo({ left: karusel.offsetWidth * indeks, behavior: "smooth" });
      });
    })(n);
  }

  karusel.addEventListener("scroll", function () {
    var joriy = Math.round(karusel.scrollLeft / karusel.offsetWidth);
    for (var k = 0; k < nuqtaTugmalar.length; k++) {
      nuqtaTugmalar[k].classList.toggle("hero-nuqta--faol", k === joriy);
    }
  });

  avtoAylantir(karusel, REKLAMA_BANNERLARI.length, 5000);
});

/* -----------------------------------------------------------------
   AVTOMATIK AYLANTIRGICH (umumiy) — scroll-snap karuseli uchun
   `karusel` — gorizontal scroll qilinadigan element,
   `soni` — slaydlar soni, `oraliqMs` — necha millisekundda o'tadi.
------------------------------------------------------------------ */
function avtoAylantir(karusel, soni, oraliqMs) {
  if (!karusel || soni < 2) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var taymer = null;
  var toxtatilgan = false;

  function keyingi() {
    if (toxtatilgan || document.hidden) return;
    var joriy = Math.round(karusel.scrollLeft / karusel.offsetWidth);
    var keyingisi = (joriy + 1) % soni;
    karusel.scrollTo({ left: karusel.offsetWidth * keyingisi, behavior: "smooth" });
  }

  function boshla() { if (!taymer) taymer = setInterval(keyingi, oraliqMs); }
  function toxta()  { if (taymer) { clearInterval(taymer); taymer = null; } }

  karusel.addEventListener("mouseenter", function () { toxtatilgan = true; });
  karusel.addEventListener("mouseleave", function () { toxtatilgan = false; });
  karusel.addEventListener("focusin",    function () { toxtatilgan = true; });
  karusel.addEventListener("focusout",   function () { toxtatilgan = false; });
  karusel.addEventListener("touchstart", function () { toxtatilgan = true; }, { passive: true });
  karusel.addEventListener("touchend",   function () {
    // barmoq ketgach 8 soniya kutib, keyin yana aylanadi
    setTimeout(function () { toxtatilgan = false; }, 8000);
  }, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) toxta(); else boshla();
  });

  boshla();
}

// Bosh sahifadagi "Filiallarimiz" qisqa blokini to'ldirish
document.addEventListener("DOMContentLoaded", function () {
  var filialKonteyner = document.getElementById("bosh-sahifa-filiallar");
  if (!filialKonteyner) return;

  if (!filiallarRoyxatiTogri()) {
    xatoXabariniChiz(
      "bosh-sahifa-filiallar",
      "Filiallar ro'yxatini ko'rsatib bo'lmadi",
      "Ma'lumotlar faylida xatolik bo'lishi mumkin (js/malumotlar-filial.js). Iltimos, faylni tekshiring yoki sayt egasiga xabar bering."
    );
    return;
  }

  filialKonteyner.innerHTML = FILIALLAR.slice(0, 3).map(filialQisqaKartaHTML).join("");
});

/* =================================================================
   v3 QO'SHIMCHALARI (DASTURCHIGA-TOPSHIRIQ.md):
   1) kategoriyaFotolariniQoy  — 3.2: ikonka o'rniga real mahsulot foto
   2) hamkorBrendlarniQoy      — 3.4: noyob brendlardan matn-chip grid
   3) heroVizualniQoy          — 3.1: hero o'ng vizual blokidagi rasmlar
   Uchchalasi ham faqat global MAHSULOTLAR massividan o'qiydi va
   umumiy.js'dagi tayyor rasmYokiPlaceholderHTML/kategoriyaNomi'dan
   foydalanadi. Ma'lumot buzilgan bo'lsa jimgina hech narsa qilmaydi —
   sahifa eski (v2) ko'rinishida ishlayveradi.
================================================================= */

// 3.4 sozlamalari: kamida nechta mahsulotli brend chiqadi va eng ko'pi
// bilan nechta chip ko'rsatiladi (chegarani o'zgartirish oson bo'lsin)
var BREND_MIN_MAHSULOT = 5;
var BREND_MAKS_SONI = 16;

// 3.2: har kategoriya kartasiga o'z mahsulotining rasmini qo'yish.
// HTML'dagi SVG ikonka JS ishlamasa joyida qolaveradi (zaxira ko'rinish).
function kategoriyaFotolariniQoy() {
  if (!mahsulotlarRoyxatiTogri()) return;
  var kartalar = document.querySelectorAll(".kategoriya-karta[data-kategoriya]");
  kartalar.forEach(function (karta) {
    var slug = karta.getAttribute("data-kategoriya");

    // Qo'lda tayyorlangan, toza kategoriya-belgi rasmi bo'lsa — shu ustun
    // turadi (DIZAYN.md 15-band: matnsiz, suv belgisisiz, markazda bitta
    // mahsulot). KATEGORIYA_RASMLARI global obyekti yo'q/bo'sh bo'lsa ham
    // funksiya avvalgidek ishlaydi — regressiya yo'q.
    var qoliplashtirilganRasm = (typeof KATEGORIYA_RASMLARI !== "undefined" && KATEGORIYA_RASMLARI)
      ? KATEGORIYA_RASMLARI[slug]
      : null;

    // Massiv tartibidagi birinchi mos (mavjud + rasmli) mahsulot — deterministik
    var topilgan = null;
    for (var i = 0; i < MAHSULOTLAR.length; i++) {
      var m = MAHSULOTLAR[i];
      if (m.kategoriya === slug && m.mavjud && m.rasm) {
        topilgan = m;
        break;
      }
    }

    // Mos mahsulot topilmasa ham karta foto-rejimga o'tadi — rasm o'rnida
    // mavjud .rasm-placeholder komponenti turadi (kelajak uchun himoya)
    var rasmHTML = rasmYokiPlaceholderHTML(
      qoliplashtirilganRasm ? qoliplashtirilganRasm : (topilgan ? topilgan.rasm : ""),
      kategoriyaNomi(slug),
      "",
      ""
    );

    // MUHIM: avval eski ikonkani olib tashlaymiz, keyin rasm blokini
    // qo'yamiz — aks holda querySelector placeholder'ning SVG'sini topib
    // uni o'chirib yuborishi mumkin edi
    var ikonka = karta.querySelector("svg");
    if (ikonka) ikonka.remove();

    var rasmBlok = document.createElement("div");
    rasmBlok.className = "kategoriya-karta-rasm";
    rasmBlok.innerHTML = rasmHTML;
    karta.insertBefore(rasmBlok, karta.firstChild);
    karta.classList.add("foto");
  });
}

// 3.4: mavjud mahsulotlardagi noyob brendlardan matnli chip qatori.
// Ro'yxat qattiq kodlanmaydi — har safar ma'lumotdan hisoblanadi,
// ommaviy yangilashdan keyin o'z-o'zidan yangilanib turadi.
function hamkorBrendlarniQoy() {
  var konteyner = document.getElementById("hamkor-brendlar");
  if (!konteyner) return;
  if (!mahsulotlarRoyxatiTogri()) return; // bo'lim bo'sh qoladi, sahifa buzilmaydi

  var sanoq = {};
  MAHSULOTLAR.forEach(function (m) {
    if (!m.mavjud || !m.brend) return;
    // "Umumiy" — brend emas, ma'lumot sifati chekinishi; chiqarilmaydi
    if (m.brend === "Umumiy") return;
    sanoq[m.brend] = (sanoq[m.brend] || 0) + 1;
  });

  var brendlar = Object.keys(sanoq)
    .filter(function (b) {
      return sanoq[b] >= BREND_MIN_MAHSULOT;
    })
    .sort(function (a, b) {
      return sanoq[b] - sanoq[a]; // mahsulot soni bo'yicha kamayish tartibida
    })
    .slice(0, BREND_MAKS_SONI);

  konteyner.innerHTML = brendlar
    .map(function (b) {
      return '<span class="brend-chip">' + htmlXavfsiz(b) + "</span>";
    })
    .join("");
}

// 3.1: hero vizual blokiga tavsiya ro'yxatidagi (mavjud + rasmli)
// birinchi 1-3 mahsulot rasmi. Ma'lumot yo'q bo'lsa blok bo'sh qoladi —
// CSS'dagi .hero-vizual:empty uni butunlay yashiradi.
function heroVizualniQoy() {
  var blok = document.getElementById("hero-vizual");
  if (!blok) return;
  if (!mahsulotlarRoyxatiTogri()) return;

  /* Hero'da 3 ta rasm joyi bor. Jasur aka: "tepadagi ham o'zi o'tib turishi
     kerak" — shuning uchun 3 ta emas, KO'PROQ mahsulot olinadi va har
     4 soniyada uchtasi keyingisiga almashadi (yumshoq so'nish bilan).
     Turli turkumlardan olinadi — bir xil muzlatgichlar ketma-ket kelmasin. */
  var hovuz = [], korilganTurkum = {};
  for (var i = 0; i < MAHSULOTLAR.length && hovuz.length < 12; i++) {
    var m = MAHSULOTLAR[i];
    if (!m.mavjud || !m.rasm) continue;
    if (korilganTurkum[m.kategoriya] >= 2) continue;
    korilganTurkum[m.kategoriya] = (korilganTurkum[m.kategoriya] || 0) + 1;
    hovuz.push(m);
  }
  if (hovuz.length === 0) return;

  var shiorEl = document.getElementById("hero-shior");
  var boshi = 0;

  /* Ega talabi: "yozuvga qarab rasm o'zgarsin" — rasm to'plamining
     BIRINCHISI yetakchi mahsulot hisoblanadi va shiorni u belgilaydi.
     Shior matni `js/malumotlar-qoshimcha.js` dagi KATEGORIYA_SHIORI
     jadvalidan olinadi (admin panel keyinchalik shuni tahrirlaydi). */
  function shiorMatni(m) {
    if (typeof KATEGORIYA_SHIORI !== "undefined" && KATEGORIYA_SHIORI[m.kategoriya]) {
      return KATEGORIYA_SHIORI[m.kategoriya];
    }
    return (typeof SHIOR_ZAXIRA !== "undefined") ? SHIOR_ZAXIRA : "";
  }

  function uchtasiniChiz() {
    var uchta = [];
    for (var k = 0; k < 3; k++) uchta.push(hovuz[(boshi + k) % hovuz.length]);
    blok.innerHTML = uchta
      .map(function (m) {
        return (
          '<a class="hero-vizual-rasm" href="mahsulot.html?id=' + encodeURIComponent(m.id) + '">' +
          rasmYokiPlaceholderHTML(m.rasm, m.nomi, "", "") +
          "</a>"
        );
      })
      .join("");

    if (shiorEl) {
      var yetakchi = uchta[0];
      var matn = shiorMatni(yetakchi);
      // Turkum nomi qizil bilan ajratiladi (birinchi tire'gacha bo'lgan qism)
      var tire = matn.indexOf(" — ");
      shiorEl.innerHTML = tire > 0
        ? "<b>" + htmlXavfsiz(matn.slice(0, tire)) + "</b>" + htmlXavfsiz(matn.slice(tire))
        : htmlXavfsiz(matn);
    }
  }
  uchtasiniChiz();

  if (hovuz.length > 3 &&
      !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    setInterval(function () {
      if (document.hidden) return;
      blok.classList.add("hero-vizual--sonmoqda");
      if (shiorEl) shiorEl.classList.add("hero-shior--sonmoqda");
      setTimeout(function () {
        boshi = (boshi + 3) % hovuz.length;
        uchtasiniChiz();
        blok.classList.remove("hero-vizual--sonmoqda");
        if (shiorEl) shiorEl.classList.remove("hero-shior--sonmoqda");
      }, 350);
    }, 4000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  kategoriyaFotolariniQoy();
  hamkorBrendlarniQoy();
  heroVizualniQoy();
});

/* Kategoriya kartochkalarida mahsulot soni (Dizayner TZ 04) */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof MAHSULOTLAR === "undefined" || !Array.isArray(MAHSULOTLAR)) return;
  var sanoq = {};
  for (var i = 0; i < MAHSULOTLAR.length; i++) {
    var k = MAHSULOTLAR[i].kategoriya;
    sanoq[k] = (sanoq[k] || 0) + 1;
  }
  var kartalar = document.querySelectorAll(".kategoriya-karta[data-kategoriya]");
  for (var j = 0; j < kartalar.length; j++) {
    var kod = kartalar[j].getAttribute("data-kategoriya");
    var n = sanoq[kod] || 0;
    if (!n || kartalar[j].querySelector(".kategoriya-soni")) continue;
    var s = document.createElement("span");
    s.className = "kategoriya-soni";
    s.textContent = n + " ta";
    kartalar[j].appendChild(s);
  }
});
