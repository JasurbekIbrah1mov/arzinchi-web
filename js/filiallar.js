/*
  =======================================================================
  FILIALLAR.JS — mijozga rasman e'lon qilingan 14 ta filial
  =======================================================================
  Ega qarori (16.09, manba: FILIALLAR-KOORDINATA.md): Arzonchining
  rasmiy filiallari — 14 ta. js/malumotlar-filial.js dagi
  FILIALLAR_AVTOMATIK blokida esa yetkazib beruvchi API'sidan kelgan
  30 ta yozuv bor — ko'plari ichki/ulgurji nuqta (masalan
  "Kombinat Optom", "Abu-Saxiy"...), mijozga ko'rsatilmasligi kerak.

  NEGA BU MA'LUMOT js/malumotlar-filial.js ICHIDA EMAS, SHU ALOHIDA
  FAYLDA:
  js/malumotlar-filial.js ning o'z sarlavha-izohida yozilganidek,
  skriptlar/mahsulotlarni-yangilash.mjs ishga tushganda
  FILIALLAR_AVTOMATIK bloki TO'LIQ qayta yoziladi va faqat "manzil",
  "ishVaqti", "xaritaEmbed", "rasm" maydonlari saqlanib qoladi — boshqa
  har qanday qo'shimcha maydon (masalan shu yerdagi "mijozga ochiqmi",
  koordinata, qisqa nom) o'sha skript ishga tushganda YO'QOLIB KETARDI.
  Skript bu faylga umuman tegmaydi, shuning uchun ma'lumot doim
  saqlanib qoladi.

  MUHIM: bu fayl js/malumotlar-filial.js dagi FILIALLAR massivini
  o'ZGARTIRMAYDI — id lar, obyektlar soni (30 ta) aynan saqlanadi.
  Demak mahsulotlardagi filiallar: ["fl-07", ...] bo'yicha qidiruv
  (js/umumiy.js dagi filialTop/filialniTop, "Mavjud filiallar"
  chiplari mahsulot sahifasida, yaqin filialni topish) hech qanday
  o'zgarishsiz FILIALLAR massivining hammasi (30 ta) bo'yicha
  ishlashda davom etadi. Shu fayl faqat filiallar.html sahifasidagi
  KO'RINADIGAN ro'yxatni 14 taga qisqartiradi.
  =======================================================================
*/

/* -----------------------------------------------------------------
   MIJOZGA OCHIQ 14 TA FILIAL — id -> qo'shimcha ma'lumot
   -----------------------------------------------------------------
   Manba: FILIALLAR-KOORDINATA.md (ega Telegram kanalidan, 2026-09-15).
   Har biriga bazadagi "fl-XX" id moslashtirilgan. Nom moslashtirish
   ishonchi "yuqori" bo'lganlarda ega yozgan manzil bilan bazadagi
   telefon/nom deyarli bir xil edi. "o'rta"/"past" deb belgilanganlar —
   ⚠️ TAXMIN (nom o'xshashligi bo'yicha, koordinataning o'ziga emas —
   koordinatalar ega tomonidan aniq berilgan edi). Tasdiqlansa, shu
   izohni olib tashlab qo'ying.
------------------------------------------------------------------ */
const FILIAL_QOSHIMCHA = {
  "fl-26": { mijozgaOchiq: true, kenglik: 41.263031, uzunlik: 69.198678, korinadiganNom: "Toshkent — Chilonzor" },
  "fl-25": { mijozgaOchiq: true, kenglik: 41.076485, uzunlik: 69.331394, korinadiganNom: "Toshkent — Toytepa" },
  "fl-07": { mijozgaOchiq: true, kenglik: 40.376091, uzunlik: 71.809555, korinadiganNom: "Farg'ona — Korzinka" }, // ⚠️ TAXMIN (past ishonch)
  "fl-21": { mijozgaOchiq: true, kenglik: 40.543711, uzunlik: 71.059752, korinadiganNom: "Qo'qon — Uchko'prik" },
  "fl-22": { mijozgaOchiq: true, kenglik: 40.988316, uzunlik: 71.688865, korinadiganNom: "Namangan — Lola" }, // ⚠️ TAXMIN (o'rta ishonch)
  "fl-23": { mijozgaOchiq: true, kenglik: 40.760085, uzunlik: 72.348635, korinadiganNom: "Andijon — Vokzal" }, // ⚠️ TAXMIN (o'rta ishonch)
  "fl-19": { mijozgaOchiq: true, kenglik: 40.476247, uzunlik: 71.753232, korinadiganNom: "Marg'ilon — Kombinat" }, // ⚠️ TAXMIN (o'rta ishonch)
  "fl-24": { mijozgaOchiq: true, kenglik: 39.065538, uzunlik: 66.835180, korinadiganNom: "Shahrisabz" },
  "fl-27": { mijozgaOchiq: true, kenglik: 40.525225, uzunlik: 72.068860, korinadiganNom: "Farg'ona — Quva" },
  "fl-10": { mijozgaOchiq: true, kenglik: 40.475901, uzunlik: 71.737197, korinadiganNom: "Marg'ilon — Gastronom" }, // ⚠️ TAXMIN (past ishonch)
  "fl-28": { mijozgaOchiq: true, kenglik: 40.994594, uzunlik: 71.243115, korinadiganNom: "Namangan — Chust" },
  "fl-31": { mijozgaOchiq: true, kenglik: 40.877865, uzunlik: 69.591745, korinadiganNom: "Olmaliq" },
  "fl-32": { mijozgaOchiq: true, kenglik: 40.726738, uzunlik: 72.053906, korinadiganNom: "Andijon — Shahrixon" },
  "fl-33": { mijozgaOchiq: true, kenglik: 41.021161, uzunlik: 71.852352, korinadiganNom: "Namangan — Uychi" }
};

// Sahifada ko'rsatish tartibi — ega Telegram kanalidagi rasmiy ro'yxat
// tartibi (FILIALLAR-KOORDINATA.md, 1-14).
const FILIAL_QOSHIMCHA_TARTIBI = [
  "fl-26", "fl-25", "fl-07", "fl-21", "fl-22", "fl-23", "fl-19",
  "fl-24", "fl-27", "fl-10", "fl-28", "fl-31", "fl-32", "fl-33"
];

/* -----------------------------------------------------------------
   Mijozga ochiq filiallarning TO'LIQ ob'ektlar ro'yxati.
   Har biri FILIALLAR (malumotlar-filial.js) dagi asl obyekt + shu
   fayldagi qo'shimcha maydonlar (kenglik, uzunlik) bilan birlashtirilgan
   nusxa. Ko'rgazmali nom uchun "nomi" maydoni korinadiganNom bilan
   almashtiriladi (masalan "Arzonchi — Kombinat filiali" o'rniga
   "Marg'ilon — Kombinat").
   Agar FILIALLAR hali yuklanmagan bo'lsa yoki biror id topilmasa,
   o'sha yozuv shunchaki tashlab ketiladi (xato tashlamaydi).
------------------------------------------------------------------ */
function mijozgaOchiqFiliallarRoyxati() {
  if (typeof FILIALLAR === "undefined" || !Array.isArray(FILIALLAR)) return [];

  var aslIdBoyicha = {};
  for (var i = 0; i < FILIALLAR.length; i++) {
    aslIdBoyicha[FILIALLAR[i].id] = FILIALLAR[i];
  }

  var natija = [];
  for (var j = 0; j < FILIAL_QOSHIMCHA_TARTIBI.length; j++) {
    var id = FILIAL_QOSHIMCHA_TARTIBI[j];
    var asl = aslIdBoyicha[id];
    var qoshimcha = FILIAL_QOSHIMCHA[id];
    if (!asl || !qoshimcha || !qoshimcha.mijozgaOchiq) continue;

    var nusxa = {};
    for (var kalit in asl) {
      if (Object.prototype.hasOwnProperty.call(asl, kalit)) nusxa[kalit] = asl[kalit];
    }
    nusxa.nomi = qoshimcha.korinadiganNom || asl.nomi;
    nusxa.kenglik = qoshimcha.kenglik;
    nusxa.uzunlik = qoshimcha.uzunlik;
    nusxa.mijozgaOchiq = true;
    natija.push(nusxa);
  }
  return natija;
}

/* -----------------------------------------------------------------
   filiallar.html sahifasidagi #filiallar-sahifa-grid ni FAQAT 14 ta
   mijozga ochiq filial bilan qayta chizadi. js/umumiy.js o'z
   DOMContentLoaded ichida shu konteynerni avval FILIALLAR (30 ta) bilan
   to'ldiradi — bu skript umumiy.js dan KEYIN ulanadi (filiallar.html),
   shuning uchun uning DOMContentLoaded tinglovchisi keyinroq ishga
   tushib, konteynerni 14 taga almashtiradi. umumiy.js faylining o'ziga
   tegilmagan — filialToliqKartaHTML funksiyasi o'sha yerdan qayta
   ishlatiladi (bir xil ko'rinish/uslub saqlanadi).
------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  var konteyner = document.getElementById("filiallar-sahifa-grid");
  if (!konteyner) return;
  if (typeof filialToliqKartaHTML !== "function") return;

  var royxat = mijozgaOchiqFiliallarRoyxati();
  if (!royxat.length) return; // ma'lumot muammosi bo'lsa umumiy.js ko'rsatgan xato xabari qoladi

  konteyner.innerHTML = royxat.map(filialToliqKartaHTML).join("");
});
