/*
  =======================================================================
  VIRTUAL.JS — "Xonamda qanday turadi?" kompozit vositasi (v2)
  =======================================================================
  Jasur aka: "odam o'z uyini rasmga olib, o'sha joyga qanaqa texnika mos
  kelishini ko'rsin... hech qanaqa zazor bo'lmasligi kerak".

  TAMOYIL (tadqiqot xulosasi, 2026-09-08):
    Mahsulotni SUN'IY INTELLEKT CHIZMAYDI — biz uni KESIB QO'YAMIZ.
    Sabab: hech bir generativ AI "rasmdagi muzlatgich aynan sizniki
    bo'ladi" deb kafolat bermaydi (model raqami, tutqichi, logotipi
    o'zgarib ketishi mumkin — sotuv sayti uchun bu noto'g'ri reklama).
    IKEA va Amazon ham shu sababdan generativ AI ishlatmaydi.
    Bizda mahsulotning har bir pikseli o'zgarmaydi — matematik kafolat.

  QANDAY ISHLAYDI:
    1. Mijoz xona rasmini tanlaydi — fayl brauzerdan CHIQMAYDI.
    2. Mahsulot rasmi lokal papkadan olinadi va uning OQ FONI
       avtomatik kesiladi (chetlardan to'ldirish usuli — AI emas,
       oddiy piksel tahlili; katalog fotolari oq fonda olingani uchun
       ishonchli ishlaydi).
    3. Mijoz uni surib, kattalashtirib, aylantirib joyiga qo'yadi;
       tagiga yumshoq soya tushadi — "yopishtirilgan" ko'rinmasligi
       uchun asosiy narsa shu.
    4. Natijani PNG qilib yuklab oladi yoki to'g'ridan-to'g'ri savatga
       qo'shadi.

  NOL BOG'LIQLIK: kutubxona yo'q, API kaliti yo'q, server chaqiruvi yo'q.
  ⚠️ Faqat bitta shart: sayt HTTP orqali ochilishi kerak (lokal server
     yoki hosting). `file://` da brauzer canvas'ni bloklaydi.
  =======================================================================
*/

document.addEventListener("DOMContentLoaded", function () {
  var sahna = document.getElementById("virtual-sahna");
  if (!sahna) return;

  if (!mahsulotlarRoyxatiTogri()) {
    xatoXabariniChiz("virtual-sahna", "Ma'lumot yuklanmadi",
      "Mahsulotlar ro'yxatini o'qib bo'lmadi.");
    return;
  }

  /* ---------------- Elementlar ---------------- */
  var fonRasm      = document.getElementById("virtual-fon");
  var boshHolat    = document.getElementById("virtual-bosh");
  var qatlam       = document.getElementById("virtual-mahsulot");
  var qatlamImg    = qatlam.querySelector("img");
  var soyaEl       = document.getElementById("virtual-soya");
  var faylInput    = document.getElementById("virtual-fayl");
  var royxat       = document.getElementById("virtual-royxat");
  var qidiruv      = document.getElementById("virtual-qidiruv");
  var olcham       = document.getElementById("virtual-olcham");
  var olchamQiymat = document.getElementById("virtual-olcham-qiymat");
  var burchak      = document.getElementById("virtual-burchak");
  var burchakQiymat= document.getElementById("virtual-burchak-qiymat");
  var teskariTugma = document.getElementById("virtual-teskari");
  var fonTugma     = document.getElementById("virtual-fon-kes");
  var soyaTugma    = document.getElementById("virtual-soya-tugma");
  var tozalaTugma  = document.getElementById("virtual-tozala");
  var saqlaTugma   = document.getElementById("virtual-saqla");
  var savatTugma   = document.getElementById("virtual-savat");
  var sahifaTugma  = document.getElementById("virtual-sahifa");
  var tanlanganNom = document.getElementById("virtual-tanlangan");

  /* ---------------- Holat ---------------- */
  var joriyMahsulot = null;
  var fonBormi = false;
  var aslRasm = null;        // kesilmagan Image
  var kesilganURL = null;    // fon kesilgan data URL
  var fonKesilsinmi = true;
  var soyaKorinsinmi = true;

  /* =================================================================
     1. OQ FONNI KESISH
     -----------------------------------------------------------------
     Usul: rasmning CHETLARIDAN boshlab "oqqa yaqin" piksellarni
     to'ldirish (flood fill) bilan tarqatib chiqamiz. Mahsulot ichidagi
     oq joylar (masalan muzlatgich eshigi) TEGILMAYDI, chunki ular
     chetga ulanmagan. Chekkada yumshoq o'tish (feather) qoldiramiz —
     aks holda kesilgan joyda oq "hoshiya" ko'rinib qoladi.
  ================================================================== */
  function fonniKes(img) {
    var c = document.createElement("canvas");
    var w = c.width = img.naturalWidth;
    var h = c.height = img.naturalHeight;
    var x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(img, 0, 0);

    var d;
    try {
      d = x.getImageData(0, 0, w, h);
    } catch (e) {
      // canvas "iflos" (CORS) — kesib bo'lmaydi, aslini qaytaramiz
      return null;
    }

    var p = d.data;
    var CHEGARA = 238;   // shundan yorug' piksel "fon" deb hisoblanadi
    var FARQ = 18;       // kanallar orasidagi farq (rangsizlik) chegarasi
    var korilgan = new Uint8Array(w * h);
    var navbat = [];

    function fonmi(i) {
      var r = p[i], g = p[i + 1], b = p[i + 2];
      if (r < CHEGARA || g < CHEGARA || b < CHEGARA) return false;
      var maks = Math.max(r, g, b), min = Math.min(r, g, b);
      return (maks - min) <= FARQ;   // kulrang/oq bo'lsin, rangli bo'lmasin
    }

    // Chetdagi barcha piksellardan boshlaymiz
    for (var i = 0; i < w; i++) {
      navbat.push(i, (h - 1) * w + i);
    }
    for (var j = 0; j < h; j++) {
      navbat.push(j * w, j * w + w - 1);
    }

    while (navbat.length) {
      var n = navbat.pop();
      if (n < 0 || n >= w * h || korilgan[n]) continue;
      var idx = n * 4;
      if (!fonmi(idx)) continue;
      korilgan[n] = 1;
      p[idx + 3] = 0;                       // shaffof qilamiz
      var qx = n % w, qy = (n - qx) / w;
      if (qx > 0)     navbat.push(n - 1);
      if (qx < w - 1) navbat.push(n + 1);
      if (qy > 0)     navbat.push(n - w);
      if (qy < h - 1) navbat.push(n + w);
    }

    // Yumshoq chekka: shaffof pikselga tegib turgan noshaffoflarning
    // alfasini pasaytiramiz — oq hoshiya ko'rinmasin
    var nusxa = new Uint8Array(korilgan);
    for (var y2 = 1; y2 < h - 1; y2++) {
      for (var x2 = 1; x2 < w - 1; x2++) {
        var m = y2 * w + x2;
        if (nusxa[m]) continue;
        var qoshni = nusxa[m - 1] + nusxa[m + 1] + nusxa[m - w] + nusxa[m + w];
        if (qoshni) p[m * 4 + 3] = Math.round(255 * (1 - qoshni / 5));
      }
    }

    x.putImageData(d, 0, 0);
    return c;
  }

  /* Kesilgan yoki asl rasmni qatlamga qo'yish */
  function qatlamniYangila() {
    if (!aslRasm) return;
    if (fonKesilsinmi) {
      if (!kesilganURL) {
        var c = fonniKes(aslRasm);
        if (c) {
          kesilganURL = c.toDataURL("image/png");
        } else {
          fonKesilsinmi = false;
          DOKON.xabar("Bu rasmning fonini kesib bo'lmadi — asl holida qo'yildi.", "ogoh");
        }
      }
      qatlamImg.src = kesilganURL || aslRasm.src;
    } else {
      qatlamImg.src = aslRasm.src;
    }
    fonTugma.setAttribute("aria-pressed", fonKesilsinmi ? "true" : "false");
    fonTugma.classList.toggle("faol", fonKesilsinmi);
  }

  /* =================================================================
     2. XONA RASMI
  ================================================================== */
  faylInput.addEventListener("change", function () {
    var fayl = this.files && this.files[0];
    if (!fayl) return;
    if (!/^image\//.test(fayl.type)) {
      DOKON.xabar("Faqat rasm fayli yuklang (JPG, PNG).", "ogoh"); return;
    }
    if (fayl.size > 20 * 1024 * 1024) {
      DOKON.xabar("Rasm juda katta (20 MB dan oshmasin).", "ogoh"); return;
    }
    var oquvchi = new FileReader();
    oquvchi.onload = function (h) {
      fonRasm.onload = function () {
        fonBormi = true;
        boshHolat.hidden = true;
        fonRasm.hidden = false;
        DOKON.xabar("Xona rasmi tayyor. Endi texnikani tanlang.", "ok");
        holatniYangila();
      };
      fonRasm.src = h.target.result;
    };
    oquvchi.onerror = function () { DOKON.xabar("Rasmni o'qib bo'lmadi.", "xato"); };
    oquvchi.readAsDataURL(fayl);
  });

  /* =================================================================
     3. MAHSULOT RO'YXATI
  ================================================================== */
  function royxatniChiz(filtr) {
    var matn = (filtr || "").trim().toLowerCase();
    var html = "", soni = 0;
    for (var i = 0; i < MAHSULOTLAR.length && soni < 60; i++) {
      var m = MAHSULOTLAR[i];
      if (!m.mavjud || !m.rasm || !rasmManziliXavfsizmi(m.rasm)) continue;
      if (matn && m.nomi.toLowerCase().indexOf(matn) === -1 &&
          kategoriyaNomi(m.kategoriya).toLowerCase().indexOf(matn) === -1) continue;
      html +=
        '<button type="button" class="virtual-mahsulot-tugma' +
        (joriyMahsulot && joriyMahsulot.id === m.id ? " faol" : "") +
        '" data-id="' + htmlXavfsiz(m.id) + '" title="' + htmlXavfsiz(m.nomi) + '">' +
        '<img src="' + htmlXavfsiz(lokalRasmYoli(m.rasm) || m.rasm) + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
        "<span>" + htmlXavfsiz(m.nomi) + "</span></button>";
      soni++;
    }
    royxat.innerHTML = html || '<p class="modal-izoh">Hech narsa topilmadi.</p>';
    var tugmalar = royxat.querySelectorAll("[data-id]");
    for (var t = 0; t < tugmalar.length; t++) {
      tugmalar[t].addEventListener("click", function () {
        mahsulotniTanla(this.getAttribute("data-id"));
      });
    }
  }

  qidiruv.addEventListener("input", function () { royxatniChiz(this.value); });

  function mahsulotniTanla(id) {
    var m = mahsulotniTop(id);
    if (!m) return;
    joriyMahsulot = m;
    kesilganURL = null;
    tanlanganNom.textContent = m.nomi;

    var yuk = new Image();
    yuk.crossOrigin = "anonymous";
    yuk.onload = function () {
      aslRasm = yuk;
      qatlamniYangila();
      qatlam.hidden = false;
      qatlam.style.left = "32%";
      qatlam.style.top = "30%";
      qatlam.style.width = olcham.value + "%";
      qatlam.style.setProperty("--burchak", burchak.value + "deg");
      qatlam.classList.remove("virtual-mahsulot--teskari");
      soyaniYangila();
      if (!fonBormi) DOKON.xabar("Texnika tanlandi. Endi xona rasmini yuklang.", "ok");
      holatniYangila();
    };
    yuk.onerror = function () {
      DOKON.xabar("Mahsulot rasmini yuklab bo'lmadi.", "xato");
    };
    /* Kompozit uchun LOKAL nusxa SHART: tashqi CDN CORS bermaydi va
       canvas "iflos" bo'lib qoladi — fonni kesib ham, saqlab ham
       bo'lmaydi. Lokal fayl yo'q bo'lsa onerror ishga tushadi. */
    yuk.src = lokalRasmYoli(m.rasm) || m.rasm;

    var faol = royxat.querySelectorAll(".faol");
    for (var i = 0; i < faol.length; i++) faol[i].classList.remove("faol");
    var yangi = royxat.querySelector('[data-id="' + String(id).replace(/"/g, "") + '"]');
    if (yangi) yangi.classList.add("faol");
  }

  /* =================================================================
     4. SURISH / O'LCHAM / AYLANTIRISH
  ================================================================== */
  var surilmoqda = false, boshX = 0, boshY = 0, boshLeft = 0, boshTop = 0;

  function nuqta(h) { var t = h.touches ? h.touches[0] : h; return { x: t.clientX, y: t.clientY }; }

  function surishBoshla(h) {
    if (qatlam.hidden) return;
    surilmoqda = true;
    var n = nuqta(h);
    boshX = n.x; boshY = n.y;
    boshLeft = qatlam.offsetLeft; boshTop = qatlam.offsetTop;
    qatlam.classList.add("surilmoqda");
    if (h.cancelable) h.preventDefault();
  }

  function surish(h) {
    if (!surilmoqda) return;
    var n = nuqta(h);
    var l = boshLeft + (n.x - boshX);
    var t = boshTop + (n.y - boshY);
    var chekW = qatlam.offsetWidth / 2, chekH = qatlam.offsetHeight / 2;
    l = Math.max(-chekW, Math.min(sahna.clientWidth - chekW, l));
    t = Math.max(-chekH, Math.min(sahna.clientHeight - chekH, t));
    qatlam.style.left = l + "px";
    qatlam.style.top = t + "px";
    soyaniYangila();
    if (h.cancelable) h.preventDefault();
  }

  function surishTugat() { surilmoqda = false; qatlam.classList.remove("surilmoqda"); }

  qatlam.addEventListener("mousedown", surishBoshla);
  document.addEventListener("mousemove", surish);
  document.addEventListener("mouseup", surishTugat);
  qatlam.addEventListener("touchstart", surishBoshla, { passive: false });
  document.addEventListener("touchmove", surish, { passive: false });
  document.addEventListener("touchend", surishTugat);

  // Klaviatura (A11y)
  qatlam.setAttribute("tabindex", "0");
  qatlam.addEventListener("keydown", function (h) {
    var q = h.shiftKey ? 20 : 4;
    var l = qatlam.offsetLeft, t = qatlam.offsetTop, ozgardi = true;
    if (h.key === "ArrowLeft") qatlam.style.left = (l - q) + "px";
    else if (h.key === "ArrowRight") qatlam.style.left = (l + q) + "px";
    else if (h.key === "ArrowUp") qatlam.style.top = (t - q) + "px";
    else if (h.key === "ArrowDown") qatlam.style.top = (t + q) + "px";
    else ozgardi = false;
    if (ozgardi) { soyaniYangila(); h.preventDefault(); }
  });

  olcham.addEventListener("input", function () {
    qatlam.style.width = this.value + "%";
    olchamQiymat.textContent = this.value + "%";
    soyaniYangila();
  });

  burchak.addEventListener("input", function () {
    qatlam.style.setProperty("--burchak", this.value + "deg");
    burchakQiymat.textContent = this.value + "°";
  });

  teskariTugma.addEventListener("click", function () {
    qatlam.classList.toggle("virtual-mahsulot--teskari");
  });

  fonTugma.addEventListener("click", function () {
    fonKesilsinmi = !fonKesilsinmi;
    qatlamniYangila();
    DOKON.xabar(fonKesilsinmi ? "Fon kesildi" : "Fon qaytarildi", "ok");
  });

  soyaTugma.addEventListener("click", function () {
    soyaKorinsinmi = !soyaKorinsinmi;
    soyaTugma.classList.toggle("faol", soyaKorinsinmi);
    soyaTugma.setAttribute("aria-pressed", soyaKorinsinmi ? "true" : "false");
    soyaniYangila();
  });

  /* Soya — mahsulot tagida, uning kengligiga moslashadi.
     "Yopishtirilgan" ko'rinmasligining 80%i shu soyada. */
  function soyaniYangila() {
    if (!soyaEl) return;
    if (qatlam.hidden || !soyaKorinsinmi) { soyaEl.hidden = true; return; }
    soyaEl.hidden = false;
    var w = qatlam.offsetWidth;
    soyaEl.style.width = Math.round(w * 0.86) + "px";
    soyaEl.style.height = Math.round(w * 0.10) + "px";
    soyaEl.style.left = Math.round(qatlam.offsetLeft + w / 2) + "px";
    soyaEl.style.top = Math.round(qatlam.offsetTop + qatlam.offsetHeight - w * 0.05) + "px";
  }

  tozalaTugma.addEventListener("click", function () {
    fonRasm.src = ""; fonRasm.hidden = true;
    boshHolat.hidden = false;
    qatlam.hidden = true;
    if (soyaEl) soyaEl.hidden = true;
    joriyMahsulot = null; aslRasm = null; kesilganURL = null;
    fonBormi = false; faylInput.value = "";
    tanlanganNom.textContent = "—";
    royxatniChiz(qidiruv.value);
    holatniYangila();
  });

  /* =================================================================
     5. NATIJANI SAQLASH (PNG)
     -----------------------------------------------------------------
     Ekrandagi joylashuvni xona rasmining ASL o'lchamiga ko'chiramiz —
     shunda saqlangan rasm sifati yuqori bo'ladi.
  ================================================================== */
  saqlaTugma.addEventListener("click", function () {
    if (!fonBormi || qatlam.hidden) {
      DOKON.xabar("Avval xona rasmi va texnikani tanlang.", "ogoh"); return;
    }
    try {
      var nisbat = fonRasm.naturalWidth / fonRasm.clientWidth;
      var c = document.createElement("canvas");
      c.width = fonRasm.naturalWidth;
      c.height = fonRasm.naturalHeight;
      var x = c.getContext("2d");
      x.drawImage(fonRasm, 0, 0, c.width, c.height);

      // Fon rasm sahna ichida markazlashgani uchun uning chap/tepa siljishi
      var fonQuti = fonRasm.getBoundingClientRect();
      var sahnaQuti = sahna.getBoundingClientRect();
      var siljishX = fonQuti.left - sahnaQuti.left;
      var siljishY = fonQuti.top - sahnaQuti.top;

      var w = qatlam.offsetWidth * nisbat;
      var h = qatlam.offsetHeight * nisbat;
      var l = (qatlam.offsetLeft - siljishX) * nisbat;
      var t = (qatlam.offsetTop - siljishY) * nisbat;

      // Soya
      if (soyaKorinsinmi) {
        x.save();
        var gr = x.createRadialGradient(l + w / 2, t + h, 0, l + w / 2, t + h, w * 0.5);
        gr.addColorStop(0, "rgba(0,0,0,0.40)");
        gr.addColorStop(0.55, "rgba(0,0,0,0.14)");
        gr.addColorStop(1, "rgba(0,0,0,0)");
        x.fillStyle = gr;
        x.beginPath();
        x.ellipse(l + w / 2, t + h, w * 0.45, w * 0.07, 0, 0, Math.PI * 2);
        x.fill();
        x.restore();
      }

      // Mahsulot (aylantirish va akslantirish bilan)
      x.save();
      x.translate(l + w / 2, t + h / 2);
      x.rotate((parseFloat(burchak.value) || 0) * Math.PI / 180);
      if (qatlam.classList.contains("virtual-mahsulot--teskari")) x.scale(-1, 1);
      x.drawImage(qatlamImg, -w / 2, -h / 2, w, h);
      x.restore();

      c.toBlob(function (blob) {
        if (!blob) { DOKON.xabar("Rasmni yasashda xatolik.", "xato"); return; }
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "arzonchi-xonamda.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        DOKON.xabar("Rasm yuklab olindi", "ok");
      }, "image/png");
    } catch (e) {
      DOKON.xabar("Saqlab bo'lmadi: sayt HTTP orqali ochilishi kerak.", "xato");
    }
  });

  /* =================================================================
     6. SAVAT / BATAFSIL
  ================================================================== */
  savatTugma.addEventListener("click", function () {
    if (!joriyMahsulot) { DOKON.xabar("Avval texnikani tanlang.", "ogoh"); return; }
    if (DOKON.savatQosh(joriyMahsulot.id)) {
      DOKON.xabar(joriyMahsulot.nomi.slice(0, 30) + " savatga qo'shildi", "ok");
    }
  });

  sahifaTugma.addEventListener("click", function () {
    if (!joriyMahsulot) { DOKON.xabar("Avval texnikani tanlang.", "ogoh"); return; }
    window.location.href = "mahsulot.html?id=" + encodeURIComponent(joriyMahsulot.id);
  });

  function holatniYangila() {
    var bor = !!joriyMahsulot;
    savatTugma.disabled = !bor;
    sahifaTugma.disabled = !bor;
    saqlaTugma.disabled = !(bor && fonBormi);
  }

  /* =================================================================
     7. BOSHLANG'ICH HOLAT
  ================================================================== */
  royxatniChiz("");
  var urlId = new URLSearchParams(window.location.search).get("id");
  if (urlId) mahsulotniTanla(urlId);
  holatniYangila();

  // Oyna o'lchami o'zgarsa soya joyida qolsin
  window.addEventListener("resize", soyaniYangila);
});
