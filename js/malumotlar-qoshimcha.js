/*
  =======================================================================
  QO'SHIMCHA MA'LUMOTLAR — marketpleys qatlami
  =======================================================================
  Bu faylni KELAJAKDA ADMIN PANEL boshqaradi. Hozircha qo'lda to'ldiriladi.

  Nima uchun alohida fayl:
    `malumotlar-mahsulot.js` — API'dan avtomatik quyiladi va har
    yangilashda TO'LIQ qayta yoziladi. Agar aksiya narxini o'sha yerga
    yozsak, birinchi yangilashdayoq yo'qoladi. Shuning uchun barcha
    "qo'lda boshqariladigan" ma'lumot SHU FAYLDA turadi — API yangilansa
    ham saqlanib qoladi.

  Ichida nima bor:
    1. AKSIYALAR          — eski narx (ustidan chizilgan) + chegirma
    2. QOSHIMCHA_RASMLAR  — kartochkada sichqoncha tekkanda aylanadigan rasmlar
    3. RANG_VARIANTLARI   — mahsulotning rang/model variantlari
    4. NASIYA_SHARTLARI   — 3/6/12/24 oylik to'lov hisobi
    5. TOLOV_USULLARI     — karta, naqd, nasiya turlari
    6. REKLAMA_BANNERLARI — bosh sahifadagi karusel (reklama joyi)
    7. SHAHAR_KOORDINATA  — lokatsiya bo'yicha eng yaqin filialni topish uchun
  =======================================================================
*/

/* -----------------------------------------------------------------
   1. AKSIYALAR — chegirmadagi mahsulotlar
   -----------------------------------------------------------------
   Format:  "mahsulot-id": { eskiNarx: <son>, tugash: "YYYY-MM-DD" }

   `eskiNarx` HOZIRGI narxdan KATTA bo'lishi kerak — kartochkada u
   ustidan chizilgan holda chiqadi va chegirma foizi avtomatik
   hisoblanadi. `tugash` — ixtiyoriy; o'tib ketgan sana aksiyani
   avtomatik o'chiradi.

   ⚠️ NAMUNA MA'LUMOT: quyidagilar aksiya mexanizmi ishlashini
   ko'rsatish uchun qo'yilgan. Haqiqiy aksiya narxlarini Jasur aka
   yoki admin panel belgilaydi.
------------------------------------------------------------------ */
var AKSIYALAR = {
  "ar-13110":   { eskiNarx: 5799000, tugash: "2026-12-31" },  // LG kir yuvish
  "ar-2059":    { eskiNarx: 4499000, tugash: "2026-12-31" },  // AUX konditsioner
  "ar-9495":    { eskiNarx: 7990000, tugash: "2026-12-31" },  // Hofmann idish yuvish
  "ar-1212609": { eskiNarx: 1690000, tugash: "2026-12-31" },  // Roison muzlatgich
  "ar-8967":    { eskiNarx: 2790000, tugash: "2026-12-31" },  // Ferre gaz plita
  "ar-2518":    { eskiNarx: 749000,  tugash: "2026-12-31" },  // Sirius changyutgich
  "ar-8823":    { eskiNarx: 1150000, tugash: "2026-12-31" },  // Ideal mikroto'lqinli
  "ar-1001333": { eskiNarx: 1690000, tugash: "2026-12-31" },  // Akmur suv isitgich
  "ar-479":     { eskiNarx: 749000,  tugash: "2026-12-31" },  // Volto kuler
  "ar-2442":    { eskiNarx: 499000,  tugash: "2026-12-31" },  // Odul duxovka
  "ar-6347":    { eskiNarx: 1490000, tugash: "2026-12-31" },  // Volmer tortkich
  "ar-815":     { eskiNarx: 379000,  tugash: "2026-12-31" }   // Sirius obogrevatel
};

/* -----------------------------------------------------------------
   2. QO'SHIMCHA RASMLAR — hover'da aylanish
   -----------------------------------------------------------------
   Format:  "mahsulot-id": ["rasm-2 manzili", "rasm-3 manzili", ...]

   Birinchi rasm mahsulotning o'z `rasm` maydonidan olinadi, bu yerga
   FAQAT qo'shimchalari yoziladi. Kamida 2 ta rasm bo'lsa, kartochkada
   sichqoncha tekkanda rasm avtomatik almashadi va tagida nuqtachalar
   chiqadi.

   ⚠️ HOZIR BO'SH: joriy API (`taminotweb.online`) har mahsulotga
   FAQAT BITTA rasm beradi (`/photo`; `/photo/2` va `/photos` — 404).
   Ko'p rasm uchun yo API kengaytirilishi, yoki admin panel orqali
   qo'lda yuklanishi kerak. Mexanizm tayyor — ma'lumot kelsa darhol
   ishlaydi.
------------------------------------------------------------------ */
var QOSHIMCHA_RASMLAR = {
  // "ar-13110": ["rasmlar/mahsulotlar/ar-13110-2.jpg", "rasmlar/mahsulotlar/ar-13110-3.jpg"]
};

/* -----------------------------------------------------------------
   3. RANG / MODEL VARIANTLARI
   -----------------------------------------------------------------
   Format:  "mahsulot-id": [ { nom: "Oq", rang: "#FFFFFF", id: "boshqa-mahsulot-id" } ]

   `id` — shu rangdagi BOSHQA mahsulotning id'si (bosilganda o'sha
   mahsulot sahifasi ochiladi). Agar `id` bo'lmasa, variant faqat
   ko'rsatiladi, havola bo'lmaydi.
------------------------------------------------------------------ */
var RANG_VARIANTLARI = {
  // "ar-13110": [
  //   { nom: "Oq",  rang: "#FFFFFF", id: "ar-13110" },
  //   { nom: "Kul", rang: "#8A8B93", id: "ar-13111" }
  // ]
};

/* -----------------------------------------------------------------
   4. NASIYA (muddatli to'lov) SHARTLARI
   -----------------------------------------------------------------
   ⚠️ TAXMINIY HISOB — Jasur aka: "taxminiy hozir hisob-kitob
   ketavergan, buni admin tomonidan o'zgartiriladi".

   `ustama` — necha foiz qo'shiladi (0.25 = 25%).
   Oylik to'lov = narx * (1 + ustama) / oylar soni.
------------------------------------------------------------------ */
var NASIYA_SHARTLARI = {
  oylar: [3, 6, 12, 24],
  ustama: {
    3:  0.04,   // +4%
    6:  0.10,   // +10%
    12: 0.22,   // +22%
    24: 0.42    // +42%
  },
  engKamNarx: 300000,          // shundan arzon mahsulotga nasiya berilmaydi
  boshlangichTolov: 0          // 0 = boshlang'ich to'lovsiz
};

/* -----------------------------------------------------------------
   5. TO'LOV USULLARI
------------------------------------------------------------------ */
var TOLOV_USULLARI = [
  { kod: "naqd",   nom: "Naqd pul",            izoh: "Filialda yoki yetkazib berishda" },
  { kod: "uzcard", nom: "UzCard",              izoh: "Bank kartasi" },
  { kod: "humo",   nom: "Humo",                izoh: "Bank kartasi" },
  { kod: "visa",   nom: "Visa / Mastercard",   izoh: "Xalqaro karta" },
  { kod: "nasiya", nom: "Muddatli to'lov",     izoh: "3, 6, 12 yoki 24 oyga bo'lib" }
];

/* -----------------------------------------------------------------
   6. REKLAMA BANNERLARI — bosh sahifadagi karusel
   -----------------------------------------------------------------
   Jasur aka: "har doim biz reklama berganimizda mana shu joyga
   karusel bo'lib chiqib turishi kerak".

   Format:
     { id, sarlavha, matn, tugmaMatn, havola, rasm, fon, matnRang }
   `rasm` bo'lmasa — `fon` (CSS gradient yoki rang) ishlatiladi.
   Admin panel kelganda shu massiv o'sha yerdan to'ldiriladi.
------------------------------------------------------------------ */
/* HERO bannerlari (qora karusel). CSS to'q fon + qizil dog'ni beradi;
   bu yerda faqat matn, yorliq va o'ngdagi mahsulot rasmi.
   `mahsulotRasm` — o'ngda chiqib turadigan lokal webp (yo'q bo'lsa olib tashlanadi). */
var REKLAMA_BANNERLARI = [
  {
    id: "bn-01",
    yorliq: "CHEGIRMA",
    sarlavha: "Muzlatgichlarga 15% gacha chegirma",
    matn: "Omborda bor ekan — ulgurib qoling. Nasiya bilan ham arzon.",
    tugmaMatn: "Chegirmalarni ko'rish",
    havola: "katalog.html?aksiya=1",
    mahsulotRasm: "rasmlar/mahsulotlar/13397.webp"
  },
  {
    id: "bn-02",
    yorliq: "NASIYA 0%",
    sarlavha: "Muddatli to'lov — 24 oygacha",
    matn: "Boshlang'ich to'lovsiz, ortiqcha hujjatsiz. Filialda rasmiylashtiring.",
    tugmaMatn: "Katalogni ko'rish",
    havola: "katalog.html",
    mahsulotRasm: "rasmlar/mahsulotlar/2131.webp"
  },
  {
    id: "bn-03",
    yorliq: "14 FILIAL",
    sarlavha: "Sizga eng yaqin Arzonchi",
    matn: "Farg'ona, Namangan, Andijon, Toshkent va boshqa shaharlarda. Ko'rib, sinab oling.",
    tugmaMatn: "Filiallarni ko'rish",
    havola: "filiallar.html",
    mahsulotRasm: "rasmlar/mahsulotlar/1001330.webp"
  }
];

/* -----------------------------------------------------------------
   6b. TURKUM SHIORLARI — bosh sahifadagi hero uchun
   -----------------------------------------------------------------
   Jasur aka: "pilesos rasm chiqsa, 'pilesos uyingiz uchun mos qulay'
   yoki shunga o'xshagan gaplar... yozuvga qarab rasm o'zgarsin".

   Hero'dagi rasmlar almashganda, ostidagi qator shu jadvaldan olinadi.
   Ro'yxatda yo'q turkum uchun umumiy matn ishlatiladi (pastda).
   Admin panel kelganda shu jadval o'sha yerdan tahrirlanadi.
------------------------------------------------------------------ */
var KATEGORIYA_SHIORI = {
  "muzlatgich":             "Muzlatgichlar — mahsulotingiz uzoq muddat yangi qolsin",
  "kir-yuvish-mashinasi":   "Kir yuvish mashinalari — vaqtingizni o'zingizga qaytaring",
  "televizor":              "Televizorlar — oilaviy oqshomlar kattaroq ekranda",
  "konditsioner":           "Konditsionerlar — yozda salqin, qishda iliq uy",
  "gaz-plita":              "Gaz plitalar — har kunlik ovqat tez va qulay",
  "ichki-plita":            "O'rnatiladigan plitalar — oshxonangiz yig'ilgan ko'rinsin",
  "changyutgich":           "Changyutgichlar — uy tozaligi ortiqcha mehnatsiz",
  "oshxona-tortkichi":      "Oshxona so'rgichlari — hid va bug' oshxonada qolmasin",
  "elektr-duxovka":         "Elektr duxovkalar — pishiriq har safar bir xil chiqsin",
  "mikrotolqinli-pech":     "Mikroto'lqinli pechlar — bir daqiqada issiq taom",
  "suv-isitgich":           "Suv isitgichlar — issiq suv doim tayyor",
  "idish-yuvish-mashinasi": "Idish yuvish mashinalari — kechki idish endi muammo emas",
  "pol-avtomat":            "Yarim avtomat mashinalar — sodda, ishonchli, arzon",
  "kuler":                  "Kulerlar — toza suv qo'lingiz ostida",
  "idish-tovoq":            "Idish-tovoqlar — dasturxoningiz chiroyli bo'lsin",
  "telefon":                "Telefonlar — aloqa uzilmasin",
  "boshqa-texnika":         "Maishiy texnika — uyingizga kerakli hammasi"
};

// Turkum ro'yxatda bo'lmasa shu matn ishlatiladi
var SHIOR_ZAXIRA = "Uyingiz uchun kerakli texnika — arzon narxda";

/* -----------------------------------------------------------------
   7. SHAHAR KOORDINATALARI — lokatsiya uchun
   -----------------------------------------------------------------
   Filial ma'lumotida koordinata maydoni yo'q, shuning uchun filial
   NOMIDAN shahar aniqlanadi va shahar markazining koordinatasi
   ishlatiladi. Bu — taxminiy (shahar aniqligida), lekin "eng yaqin
   filial qaysi" degan savolga to'g'ri javob berish uchun yetarli.

   Admin panel kelganda har filialga aniq koordinata qo'yiladi.
------------------------------------------------------------------ */
var SHAHAR_KOORDINATA = {
  "toshkent":    { lat: 41.2995, lon: 69.2401, nom: "Toshkent" },
  "chilonzor":   { lat: 41.2756, lon: 69.2035, nom: "Toshkent" },
  "yunusobod":   { lat: 41.3671, lon: 69.2894, nom: "Toshkent" },
  "sergeli":     { lat: 41.2244, lon: 69.2206, nom: "Toshkent" },
  "toytepa":     { lat: 41.0578, lon: 69.3608, nom: "Toshkent viloyati" },
  "olmaliq":     { lat: 40.8446, lon: 69.5984, nom: "Olmaliq" },
  "fargona":     { lat: 40.3864, lon: 71.7864, nom: "Farg'ona" },
  "farg'ona":    { lat: 40.3864, lon: 71.7864, nom: "Farg'ona" },
  "margilon":    { lat: 40.4711, lon: 71.7243, nom: "Marg'ilon" },
  "quva":        { lat: 40.5211, lon: 72.0736, nom: "Quva" },
  "oltiariq":    { lat: 40.3903, lon: 71.4172, nom: "Oltiariq" },
  "rishton":     { lat: 40.3564, lon: 71.2836, nom: "Rishton" },
  "chimyon":     { lat: 40.2833, lon: 71.6167, nom: "Chimyon" },
  "namangan":    { lat: 40.9983, lon: 71.6726, nom: "Namangan" },
  "uychi":       { lat: 41.0736, lon: 71.9256, nom: "Uychi" },
  "chust":       { lat: 41.0000, lon: 71.2394, nom: "Chust" },
  "uchko":       { lat: 40.5033, lon: 71.0797, nom: "Uchko'prik" },
  "andijon":     { lat: 40.7821, lon: 72.3442, nom: "Andijon" },
  "shahrixon":   { lat: 40.7108, lon: 72.0578, nom: "Shahrixon" },
  "shahrisabz":  { lat: 39.0578, lon: 66.8342, nom: "Shahrisabz" },
  "kombinat":    { lat: 40.3864, lon: 71.7864, nom: "Farg'ona" }
};

/* -----------------------------------------------------------------
   8. KATEGORIYA-BELGI RASMLARI — bosh sahifa kategoriya kartochkasi
   -----------------------------------------------------------------
   Format:  "kategoriya-slug": "rasm-manzili"

   Ixtiyoriy. Bo'sh qoldirilgan (yoki umuman yozilmagan) kategoriya
   uchun `js/bosh-sahifa.js`dagi `kategoriyaFotolariniQoy()` avtomatik
   zaxira zanjiriga o'tadi: mahsulotlar ro'yxatidan mos birinchi
   mahsulot fotosi, u ham bo'lmasa placeholder. Sahifa hech qachon
   buzilmaydi.

   DIZAYN.md 15-band, 7 qabul mezoni (rasm tayyorlashda amal qilinsin):
   matnsiz, suv belgisisiz, markazda bitta mahsulot, oq/och fon,
   kamida 600x600 kvadrat, mahsulot kadrning ~80%ini egallaydi, soyasiz.
   Rasmlar `rasmlar/kategoriyalar/` papkasiga qo'yiladi (qarang
   QANDAY_RASM_QOSHISH.md).

   Bu obyekt ATAYLAB shu faylda (`malumotlar-qoshimcha.js`), chunki
   `malumotlar-kategoriya.js` avtomatik skript tomonidan har yangilashda
   TO'LIQ qayta yoziladi (o'sha faylning boshidagi ogohlantirishga
   qarang) — shu faylga qo'yilganda birinchi yangilanishdayoq o'chib
   ketardi.
------------------------------------------------------------------ */
var KATEGORIYA_RASMLARI = {
  // "muzlatgich": "rasmlar/kategoriyalar/muzlatgich.jpg"
};
