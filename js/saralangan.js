/*
  =======================================================================
  SARALANGAN.JS — saralanganlar sahifasi (saralangan.html)
  =======================================================================
  Yurakcha bosilgan mahsulotlar shu yerda to'planadi. Ma'lumot
  brauzer xotirasida (localStorage) — server kerak emas.
  =======================================================================
*/

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("mahsulot-grid");
  var soniEl = document.getElementById("natijalar-soni");
  var boshJoy = document.getElementById("bosh-holat-joyi");
  if (!grid) return;

  if (!mahsulotlarRoyxatiTogri()) {
    xatoXabariniChiz("mahsulot-grid", "Ma'lumot yuklanmadi",
      "Mahsulotlar ro'yxatini o'qib bo'lmadi. js/malumotlar-mahsulot.js faylini tekshiring.");
    return;
  }

  chiz();

  // Yurakcha bosilganda ro'yxat darhol yangilanadi
  document.addEventListener("click", function (h) {
    var tugma = h.target.closest ? h.target.closest("[data-saralangan-id]") : null;
    if (tugma) setTimeout(chiz, 50);
  });

  function chiz() {
    var kodlar = DOKON.saralanganRoyxati();
    var mahsulotlar = [];
    for (var i = 0; i < kodlar.length; i++) {
      var m = mahsulotniTop(kodlar[i]);
      if (m) mahsulotlar.push(m);
    }

    var eskiBosh = document.getElementById("bosh-holat-xabar");
    if (eskiBosh) eskiBosh.remove();

    if (!mahsulotlar.length) {
      grid.innerHTML = "";
      if (soniEl) soniEl.textContent = "";
      if (boshJoy) {
        boshJoy.innerHTML = boshHolatHTML({
          id: "bosh-holat-xabar",
          ikonka: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
            '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
          sarlavha: "Saralanganlar bo'sh",
          izoh: "Yoqqan mahsulot yonidagi belgini bosing — u shu yerda saqlanadi.",
          tugma: '<a href="katalog.html" class="tugma tugma-asosiy">Katalogga o\'tish</a>'
        });
      }
      return;
    }

    if (boshJoy) boshJoy.innerHTML = "";
    if (soniEl) soniEl.textContent = mahsulotlar.length + " ta mahsulot saqlangan";
    grid.innerHTML = mahsulotlar.map(mahsulotKartaHTML).join("");
    DOKON.kartochkalarniUla(grid);
    DOKON.badgelarYangila();
  }
});
