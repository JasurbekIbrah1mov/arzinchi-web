/* ===================================================================
   QIDIRUV — ochiluvchi ro'yxat (K12, TZ 02 §12)
   Header qidiruv maydonini "jonli" dropdownga aylantiradi:
   OXIRGI QIDIRUVLARINGIZ · TAKLIFLAR · MAHSULOTLAR + "Barcha N".
   Nol bog'liqlik, klaviatura bilan boshqariladi, XSS-xavfsiz.
=================================================================== */
(function () {
  "use strict";

  var TARIX_KALIT = "arzonchi_qidiruv_tarix_v1";
  var MAX_TARIX = 6;
  var MAX_MAHSULOT = 6;
  var MAX_TAKLIF = 4;
  var KUTISH = 120; // ms, debounce

  /* ---------- localStorage tarix (majburiy try/catch) ---------- */
  function tarixOl() {
    try {
      var t = JSON.parse(localStorage.getItem(TARIX_KALIT));
      return Array.isArray(t) ? t : [];
    } catch (e) { return []; }
  }
  function tarixYoz(q) {
    q = String(q || "").trim();
    if (!q) return;
    try {
      var t = tarixOl().filter(function (x) { return x.toLowerCase() !== q.toLowerCase(); });
      t.unshift(q);
      localStorage.setItem(TARIX_KALIT, JSON.stringify(t.slice(0, MAX_TARIX)));
    } catch (e) {}
  }
  function tarixTozala() { try { localStorage.removeItem(TARIX_KALIT); } catch (e) {} }

  /* ---------- ma'lumot manbalari ---------- */
  function baza() { return (typeof MAHSULOTLAR !== "undefined") ? MAHSULOTLAR : []; }
  function katObyekt() { return (typeof KATEGORIYALAR !== "undefined") ? KATEGORIYALAR : {}; }

  /* mos qismini <b> bilan belgilash — har bo'lak alohida xavfsizlanadi */
  function belgila(matn, sorov) {
    matn = String(matn || "");
    if (!sorov) return htmlXavfsiz(matn);
    var i = matn.toLowerCase().indexOf(sorov.toLowerCase());
    if (i < 0) return htmlXavfsiz(matn);
    return htmlXavfsiz(matn.slice(0, i)) +
      "<b>" + htmlXavfsiz(matn.slice(i, i + sorov.length)) + "</b>" +
      htmlXavfsiz(matn.slice(i + sorov.length));
  }

  /* ---------- qidiruv ---------- */
  function qidir(sorov) {
    sorov = sorov.trim().toLowerCase();
    var b = baza(), mahsulot = [], jami = 0;
    if (!sorov) return { mahsulot: [], taklif: [], jami: 0 };
    for (var i = 0; i < b.length; i++) {
      var m = b[i];
      var nom = (m.nomi || "").toLowerCase();
      var br = (m.brend || "").toLowerCase();
      if (nom.indexOf(sorov) >= 0 || br.indexOf(sorov) >= 0) {
        jami++;
        if (mahsulot.length < MAX_MAHSULOT) mahsulot.push(m);
      }
    }
    // kategoriya takliflari (nomi mos kelsa)
    var kt = katObyekt(), taklif = [];
    for (var k in kt) {
      if (!Object.prototype.hasOwnProperty.call(kt, k)) continue;
      if (taklif.length >= MAX_TAKLIF) break;
      var nomi = String(kt[k]);
      if (nomi.toLowerCase().indexOf(sorov) >= 0) {
        var soni = 0;
        for (var j = 0; j < b.length; j++) if (b[j].kategoriya === k) soni++;
        taklif.push({ kalit: k, nomi: nomi, soni: soni });
      }
    }
    return { mahsulot: mahsulot, taklif: taklif, jami: jami };
  }

  /* ---------- ikonkalar ---------- */
  var IK_SOAT = '<svg class="qd-ik" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  var IK_LUPA = '<svg class="qd-ik" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';

  /* 44px thumbnail: lokal webp -> asl (remote) -> neytral quti. Katta
     card-placeholder ISHLATILMAYDI (u 44px qatorni buzadi). */
  window.qidiruvRasmXato = function (img) {
    var z = img.getAttribute("data-zaxira");
    if (z) { img.removeAttribute("data-zaxira"); img.src = z; return; }
    img.remove(); // neytral .qd-rasm qutisi qoladi
  };
  function rasmKataksi(m) {
    var lokal = lokalRasmYoli(m.rasm);
    var xavfsizAsl = rasmManziliXavfsizmi(m.rasm);
    var src = lokal || (xavfsizAsl ? m.rasm : "");
    if (!src) return '<span class="qd-rasm"></span>';
    var zaxira = (lokal && xavfsizAsl) ? ' data-zaxira="' + htmlXavfsiz(m.rasm) + '"' : "";
    return '<span class="qd-rasm"><img src="' + htmlXavfsiz(src) + '" alt="" loading="lazy"' + zaxira + ' onerror="qidiruvRasmXato(this)"></span>';
  }

  /* ---------- render ---------- */
  function render(dropdown, input) {
    var sorov = input.value.trim();
    var html = "";

    if (!sorov) {
      var t = tarixOl();
      if (!t.length) { yop(dropdown); return; }
      html += '<div class="qd-bolim"><div class="qd-sarlavha">Oxirgi qidiruvlaringiz' +
        '<button type="button" class="qd-tozala" data-qd-tozala>o\'chirish</button></div>';
      for (var i = 0; i < t.length; i++) {
        html += '<a class="qd-qator qd-tanlanuvchi" href="katalog.html?q=' + encodeURIComponent(t[i]) + '" data-qd-sorov="' + htmlXavfsiz(t[i]) + '">' +
          IK_SOAT + '<span class="qd-matn">' + htmlXavfsiz(t[i]) + '</span></a>';
      }
      html += '</div>';
    } else {
      var r = qidir(sorov);
      if (!r.mahsulot.length && !r.taklif.length) {
        html += '<div class="qd-bosh-holat">"' + htmlXavfsiz(sorov) + '" bo\'yicha hech narsa topilmadi</div>';
      } else {
        if (r.taklif.length) {
          html += '<div class="qd-bolim"><div class="qd-sarlavha">Takliflar</div>';
          for (var a = 0; a < r.taklif.length; a++) {
            var s = r.taklif[a];
            html += '<a class="qd-qator qd-tanlanuvchi" href="katalog.html?kategoriya=' + encodeURIComponent(s.kalit) + '" data-qd-sorov="' + htmlXavfsiz(s.nomi) + '">' +
              IK_LUPA + '<span class="qd-matn">' + belgila(s.nomi, sorov) + '</span><em class="qd-soni">' + s.soni + '</em></a>';
          }
          html += '</div>';
        }
        if (r.mahsulot.length) {
          html += '<div class="qd-bolim"><div class="qd-sarlavha">Mahsulotlar</div>';
          for (var c = 0; c < r.mahsulot.length; c++) {
            var m = r.mahsulot[c];
            html += '<a class="qd-qator qd-tanlanuvchi qd-mahsulot" href="mahsulot.html?id=' + encodeURIComponent(m.id) + '" data-qd-sorov="' + htmlXavfsiz(m.nomi) + '">' +
              rasmKataksi(m) +
              '<span class="qd-nom">' + belgila(m.nomi, sorov) + '</span>' +
              '<em class="qd-narx">' + narxniFormatla(m.narx) + '</em></a>';
          }
          html += '</div>';
        }
        html += '<a class="qd-qator qd-tanlanuvchi qd-barcha" href="katalog.html?q=' + encodeURIComponent(sorov) + '" data-qd-sorov="' + htmlXavfsiz(sorov) + '">Barcha ' + r.jami + ' ta natijani ko\'rish</a>';
      }
    }

    dropdown.innerHTML = html;
    dropdown.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function yop(dropdown, input) {
    dropdown.hidden = true;
    dropdown.innerHTML = "";
    if (input) input.setAttribute("aria-expanded", "false");
  }

  /* ---------- klaviatura navigatsiyasi ---------- */
  function qatorlar(dropdown) {
    return Array.prototype.slice.call(dropdown.querySelectorAll(".qd-tanlanuvchi"));
  }
  function faolIndeks(qs) {
    for (var i = 0; i < qs.length; i++) if (qs[i].classList.contains("qd-faol")) return i;
    return -1;
  }
  function faolla(qs, idx) {
    for (var i = 0; i < qs.length; i++) qs[i].classList.toggle("qd-faol", i === idx);
    if (qs[idx]) qs[idx].scrollIntoView({ block: "nearest" });
  }

  /* ---------- bitta formani ulash ---------- */
  function ula(form) {
    var input = form.querySelector('input[type="search"], input[name="q"]');
    if (!input) return;

    // dropdown elementi
    var dropdown = document.createElement("div");
    dropdown.className = "qd-royxat";
    dropdown.hidden = true;
    dropdown.setAttribute("role", "listbox");
    form.appendChild(dropdown);
    form.classList.add("header-qidiruv--k12");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-expanded", "false");

    var taymer = null;
    function kechik() {
      if (taymer) clearTimeout(taymer);
      taymer = setTimeout(function () { render(dropdown, input); }, KUTISH);
    }

    input.addEventListener("input", kechik);
    input.addEventListener("focus", function () { render(dropdown, input); });

    // tashqariga bosilganda yopish
    document.addEventListener("click", function (e) {
      if (!form.contains(e.target)) yop(dropdown, input);
    });

    // dropdown ichidagi bosishlar
    dropdown.addEventListener("mousedown", function (e) {
      // "o'chirish" tugmasi
      var toz = e.target.closest("[data-qd-tozala]");
      if (toz) { e.preventDefault(); tarixTozala(); render(dropdown, input); return; }
      // qatorni bosganda tarixga yozish (havola o'zi navigatsiya qiladi)
      var qator = e.target.closest(".qd-tanlanuvchi");
      if (qator) { tarixYoz(qator.getAttribute("data-qd-sorov")); }
    });

    // klaviatura
    input.addEventListener("keydown", function (e) {
      if (dropdown.hidden) return;
      var qs = qatorlar(dropdown);
      if (!qs.length) return;
      var idx = faolIndeks(qs);
      if (e.key === "ArrowDown") {
        e.preventDefault(); faolla(qs, (idx + 1) % qs.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault(); faolla(qs, (idx - 1 + qs.length) % qs.length);
      } else if (e.key === "Enter") {
        if (idx >= 0) {
          e.preventDefault();
          tarixYoz(qs[idx].getAttribute("data-qd-sorov"));
          window.location.href = qs[idx].getAttribute("href");
        } else {
          tarixYoz(input.value); // oddiy submit -> katalog.html?q=
        }
      } else if (e.key === "Escape") {
        yop(dropdown, input); input.blur();
      }
    });

    // oddiy submit (Qidirish tugmasi / Enter) — tarixga yoz
    form.addEventListener("submit", function () { tarixYoz(input.value); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var formlar = document.querySelectorAll("form.header-qidiruv");
    for (var i = 0; i < formlar.length; i++) ula(formlar[i]);
  });
})();
