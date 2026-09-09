/* ===================================================================
   ILOVA.JS — Capacitor ilova qobig'i (B13, 5-A bosqich)
   -------------------------------------------------------------------
   FAQAT haqiqiy ilova ichida (Capacitor native) yoqiladi. Oddiy
   brauzerda HECH NARSA qilmaydi — sayt avvalgidek qoladi (regressiya
   yo'q). Arxitektor: ARXITEKTORDAN-DASTURCHIGA-ILOVA-TELEFON.md §5-A.

   Chok falsafasi: sayt qayta yozilmaydi, do-kon.js ga tegilmaydi.
   Ilovaga xos narsa (pastki tab bar doim ko'rinadi, safe-area, Android
   orqaga tugmasi) shu yerda, `isNativePlatform()` ortida.
=================================================================== */
(function () {
  "use strict";

  // Capacitor bormi va HAQIQIY qurilmadami? (brauzerda false)
  function ilovaMi() {
    return !!(window.Capacitor &&
      typeof window.Capacitor.isNativePlatform === "function" &&
      window.Capacitor.isNativePlatform());
  }

  if (!ilovaMi()) return;   // ← brauzer: bu yerda to'xtaydi, sayt o'zgarmaydi

  // <html class="ilova"> — ilova CSS shunga tayanadi (safe-area,
  // pastki panelni doim ko'rsatish)
  document.documentElement.classList.add("ilova");

  document.addEventListener("DOMContentLoaded", function () {
    // Joriy sahifaga qarab pastki paneldagi tugmani "faol" qilish
    try {
      var yol = (location.pathname.split("/").pop() || "index.html").toLowerCase();
      var xarita = {
        "index.html": "bosh", "": "bosh",
        "katalog.html": "katalog",
        "savat.html": "savat",
        "saralangan.html": "saralangan"
      };
      var faol = xarita[yol];
      if (faol) {
        var t = document.querySelector('.mobil-panel a[data-mobil="' + faol + '"]');
        if (t) t.classList.add("faol");
      }
    } catch (e) {}

    // Android "orqaga" tugmasi: tarix bo'lsa orqaga, bo'lmasa ilovadan chiqmaydi
    // (Capacitor App plagini bo'lsa). Plagin yo'q bo'lsa — WebView o'zi hal qiladi.
    try {
      var App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
      if (App && App.addListener) {
        App.addListener("backButton", function () {
          // 1) Modal (kirish/shahar/hisob) ochiq bo'lsa — AVVAL uni yopamiz,
          //    ilovadan chiqmaymiz (ega ko'rsatgan xato shu edi)
          if (document.getElementById("modal-qatlam")) {
            if (window.DOKON && DOKON.modalYop) DOKON.modalYop();
            return;
          }
          // 2) Mobil menyu ochiq bo'lsa — yopamiz
          var burger = document.querySelector('.hamburger-tugma[aria-expanded="true"]');
          if (burger) { burger.click(); return; }
          // 3) Tarix bo'lsa — orqaga
          if (window.history.length > 1) { window.history.back(); return; }
          // 4) Bosh sahifa va tarix yo'q — ilovadan chiqamiz
          App.exitApp();
        });
      }
    } catch (e) {}
  });
})();
