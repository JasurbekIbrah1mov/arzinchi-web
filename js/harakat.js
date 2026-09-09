/*
  =======================================================================
  HARAKAT.JS — skroll-reveal, kaskad va YO'NALISHLAR (v4.2)
  =======================================================================
  Qoidalar (references/motion.md) — o'zgarmadi:
  - Faqat transform/opacity animatsiya qilinadi (.reveal — css/style.css).
  - Har element faqat BIR MARTA reveal bo'ladi (unobserve).
  - Kaskad qadami 70ms (60-80 oralig'idan), yuqori chegara 560ms —
    "stagger-spam" taqiqlangan.
  - prefers-reduced-motion yoqiq yoki IntersectionObserver yo'q bo'lsa —
    skript umuman hech narsa qilmaydi, hamma narsa darhol ko'rinadi.
  - HTML'da .reveal oldindan yozilmagan — sinfni faqat shu skript qo'yadi,
    shuning uchun JS o'chiq foydalanuvchi hech narsa yo'qotmaydi.
  - Kutubxonasiz, file:// da internetsiz ishlaydi.

  2026-09-08 QO'SHILDI — YO'NALISHLAR (ega talabi: "bir xil payt yondan
  chiqishi kerak, bir xil payt pastdan"):
      .reveal--past   pastdan ko'tariladi   (asosiy, ro'yxatlar)
      .reveal--chap   chapdan suriladi     (ikki ustunli blokning chapi)
      .reveal--ong    o'ngdan suriladi     (o'ng ustun, karusel)
      .reveal--katta  kattalashib chiqadi  (rasm plitkalari)

  ⚠️ FAQ (`.faq-royxat`) ATAYLAB yo'nalishsiz qoldirilgan — 2026-09-05
  dagi "FAQ intermittent" tergovidan keyin uning harakati asl holida
  muhrlangan. Unga tegilmaydi.
  =======================================================================
*/

(function () {
  "use strict";

  // Ikki himoya: kamaytirilgan harakat va juda eski brauzer
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  var KASKAD_QADAMI_MS = 70;    // bitta konteyner ichidagi elementlar orasi
  var KASKAD_MAKSIMUM_MS = 560; // ~8-elementdan keyin kechikish o'smaydi
  var REVEAL_DAVOMIYLIGI_MS = 500; // eng uzun variant (.reveal--katta) bilan teng

  /* Qaysi konteynerning farzandlari qanday chiqadi.
     `yonalish` bo'sh bo'lsa — asl (yo'nalishsiz) harakat. */
  var GURUHLAR = [
    { selektor: ".kategoriya-grid",   yonalish: "katta", kaskad: true },
    { selektor: ".mahsulot-grid",     yonalish: "past",  kaskad: true },
    { selektor: ".mahsulot-karusel",  yonalish: "ong",   kaskad: true },
    { selektor: ".filial-grid",       yonalish: "past",  kaskad: true },
    { selektor: ".brend-grid",        yonalish: "past",  kaskad: true },
    { selektor: ".qadam-grid",        yonalish: "navbat", kaskad: true }, // chap-past-chap
    { selektor: ".faq-royxat",        yonalish: "",      kaskad: true }   // ⚠️ tegilmaydi
  ];

  /* Ikki ustunli bloklar: chap yarmi CHAPDAN, o'ng yarmi PASTDAN.
     ⚠️ O'ng ustun ataylab "o'ngdan" emas: sahifaning o'ng chekkasidagi
     elementni o'ngga surish gorizontal toshish (scrollWidth) hosil qiladi —
     chapga surish esa qilmaydi (LTR'da chap toshish kesiladi). Buni
     o'lchab ko'rdik: `translateX(28px)` sahifani 4px kengaytirdi. */
  var IKKI_USTUN = [".hero-ichki", ".mahsulot-tafsilot", ".virtual-tuzilma", ".savat-tuzilma"];

  /* "ong" faqat KESUVCHI idish ichida xavfsiz (karusel — overflow-x:auto).
     Sahifa oqimidagi elementlar uchun chap/past ishlatiladi. */
  var NAVBAT = ["chap", "past", "chap"];

  function nishonQosh(el, yonalish, kechikish, royxat) {
    el.classList.add("reveal");
    if (yonalish) el.classList.add("reveal--" + yonalish);
    el.setAttribute("data-kechikish", String(kechikish));
    royxat.push(el);
  }

  // Reveal tugagach vaqtinchalik sinf va inline kechikishni tozalaymiz —
  // aks holda transition-delay kartalarning hover fizikasini ham
  // kechiktirib, "sekin javob beradigan" tuyg'u qoldirardi
  function tozala(el, kechikish) {
    window.setTimeout(function () {
      el.classList.remove("reveal", "in", "reveal--past", "reveal--chap", "reveal--ong", "reveal--katta");
      el.style.transitionDelay = "";
    }, kechikish + REVEAL_DAVOMIYLIGI_MS + 100);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nishonlar = [];

    // 1) Har bo'limning sarlavha bloki — kechikishsiz, pastdan
    document.querySelectorAll(".bolim-sarlavha, .karusel-bosh").forEach(function (el) {
      nishonQosh(el, "past", 0, nishonlar);
    });

    // 2) Ikki ustunli bloklar — chap yarmi chapdan, o'ng yarmi o'ngdan
    document.querySelectorAll(IKKI_USTUN.join(", ")).forEach(function (blok) {
      for (var i = 0; i < blok.children.length; i++) {
        nishonQosh(blok.children[i], i === 0 ? "chap" : "past", 0, nishonlar);
      }
    });

    // 3) Grid/karusel konteynerlarining bevosita farzandlari — kaskad bilan
    //    (har konteyner o'z hisobini 0 dan boshlaydi)
    GURUHLAR.forEach(function (guruh) {
      document.querySelectorAll(guruh.selektor).forEach(function (idish) {
        for (var i = 0; i < idish.children.length; i++) {
          var el = idish.children[i];
          if (el.classList.contains("reveal")) continue; // ikki marta qo'shilmasin
          var kechikish = guruh.kaskad
            ? Math.min(i * KASKAD_QADAMI_MS, KASKAD_MAKSIMUM_MS)
            : 0;
          var yonalish = guruh.yonalish === "navbat"
            ? NAVBAT[i % NAVBAT.length]
            : guruh.yonalish;
          nishonQosh(el, yonalish, kechikish, nishonlar);
        }
      });
    });

    if (nishonlar.length === 0) return;

    var kuzatuvchi = new IntersectionObserver(
      function (yozuvlar) {
        yozuvlar.forEach(function (yozuv) {
          if (!yozuv.isIntersecting) return;
          var el = yozuv.target;
          var kechikish = parseInt(el.getAttribute("data-kechikish"), 10) || 0;
          el.style.transitionDelay = kechikish + "ms";
          el.classList.add("in");
          el.removeAttribute("data-kechikish");
          kuzatuvchi.unobserve(el); // faqat bir marta ko'rinadi
          tozala(el, kechikish);
        });
      },
      { threshold: 0.15 }
    );

    nishonlar.forEach(function (el) {
      kuzatuvchi.observe(el);
    });

    /* ─── XAVFSIZLIK TO'RI (2026-09-08) ─────────────────────────────
       IntersectionObserver ba'zi holatlarda UMUMAN ishga tushmaydi:
       sahifa ko'rinmas oynada/panelda ochilgan, fon tabida qolgan,
       yoki brauzer uni tejash uchun to'xtatgan. Bunda BUTUN SAHIFA
       `opacity:0` bo'lib qolardi — ya'ni mijoz bo'm-bo'sh sayt ko'radi.
       Aynan shu holat 2026-09-08 da o'lchandi: 72 ta elementning
       hammasi ko'rinmas edi.

       Shuning uchun 2,5 soniyadan keyin hali ochilmagan hamma narsa
       MAJBURAN ko'rsatiladi. Animatsiya — bezak; kontent esa majburiy.
       Normal holatda bu taymer hech narsa qilmaydi (hammasi allaqachon
       ochilgan bo'ladi). */
    window.setTimeout(function () {
      for (var i = 0; i < nishonlar.length; i++) {
        var el = nishonlar[i];
        if (el.classList.contains("in")) continue;
        el.style.transitionDelay = "0ms";   // kaskadsiz — darhol
        el.classList.add("in");
        el.removeAttribute("data-kechikish");
        kuzatuvchi.unobserve(el);
        tozala(el, 0);                      // vaqtinchalik sinflarni ham tozalaymiz
      }
    }, 2500);

    /* Keyinchalik JS bilan qo'shilgan kartochkalar ("Yana ko'rsatish")
       uchun — do-kon.js shu funksiyani chaqiradi. Yangi elementlar
       KECHIKISHSIZ va yo'nalishsiz chiqadi: foydalanuvchi tugmani endi
       bosgan, kutib turishi shart emas. */
    window.revealniQaytaUla = function () { /* ataylab bo'sh — yangi kartalar darhol ko'rinadi */ };
  });
})();
