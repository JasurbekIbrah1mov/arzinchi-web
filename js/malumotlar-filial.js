/*
  =======================================================================
  MA'LUMOT FAYLI — FILIALLAR RO'YXATI
  =======================================================================
  Bu fayl IKKI QISMDAN iborat:

  1. FILIALLAR_AVTOMATIK — API'dagi telefon raqamli omborlar asosida
     avtomatik hosil bo'ladigan blok. Har yangilashda nomi/telefon API'dan
     yangilanadi, lekin "manzil", "ishVaqti", "xaritaEmbed", "rasm"
     maydonlari SIZ TO'LDIRGANINGIZDAN KEYIN SAQLANIB QOLADI — skript
     ularni qayta "TOLDIRING: ..." bilan almashtirmaydi. Oxirgi yangilash:
     2026-08-29T12:40:38.380Z.

     Agar bu blokda "TOLDIRING: manzil" yoki "TOLDIRING: ish vaqti" matnini
     ko'rsangiz — o'sha qatorni haqiqiy manzil/ish vaqti bilan almashtiring,
     keyingi yangilashda siz yozgan qiymat saqlanib qoladi.

  2. FILIALLAR_QOLDA — siz butunlay qo'lda qo'shgan filiallar (API bilan
     bog'liq bo'lmagan). Skript BU BLOKKA HECH QACHON TEGMAYDI.

  ------------------------------------------------------------------
  QO'LDA FILIAL QO'SHISH (pastdagi FILIALLAR_QOLDA ro'yxatiga):
  ------------------------------------------------------------------
  Maydonlar tushuntirishi:
    id          — filialning ichki kodi (unikal, masalan "fl-30").
    nomi        — filial nomi (ekranda ko'rinadi).
    manzil      — to'liq manzil (ekranda ko'rinadi).
    telefon     — filial telefon raqami, "+998..." formatida.
    ishVaqti    — ish vaqti matni (ekranda ko'rinadi).
    xaritaEmbed — Google Maps'dan olingan "embed" (o'rnatish) havolasi.
    rasm        — filial rasmining fayl yo'li (ixtiyoriy, bo'sh "" bo'lishi mumkin).

  NAMUNA OBYEKT:
  {
    id: "fl-30",
    nomi: "Arzonchi — Yangi filial nomi",
    manzil: "Toshkent sh., ... tumani, ... ko'chasi ...",
    telefon: "+998901112233",
    ishVaqti: "Har kuni 09:00 – 20:00",
    xaritaEmbed: "https://www.google.com/maps?q=Toshkent&output=embed",
    rasm: ""
  }
  =======================================================================
*/

const FILIALLAR_AVTOMATIK = [
  {
    id: "fl-31",
    nomi: "Arzonchi — Olmaliq filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998998780994",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-19",
    nomi: "Arzonchi — Kombinat filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998884020060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-33",
    nomi: "Arzonchi — Namangan-Uychi filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998200090086",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-24",
    nomi: "Arzonchi — Shahrisabz filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998880460001",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-23",
    nomi: "Arzonchi — Andijon filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998916760660",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-25",
    nomi: "Arzonchi — Toshkent (Toytepa) filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998912062679",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-32",
    nomi: "Arzonchi — Shahrixon filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998972147788",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-28",
    nomi: "Arzonchi — Chust filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998990332555",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-21",
    nomi: "Arzonchi — Uchko`prik filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998882145500",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-09",
    nomi: "Arzonchi — Kombinat Chinnichi Baza filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998972096060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-22",
    nomi: "Arzonchi — Namangan filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998945869399",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-27",
    nomi: "Arzonchi — Quva filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998882601110",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-07",
    nomi: "Arzonchi — Fargona filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998975017766",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-26",
    nomi: "Arzonchi — Toshkent (Chilonzor) filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998944089800",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-18",
    nomi: "Arzonchi — Oltiariq Abu-Saxiy filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998903020021",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-29",
    nomi: "Arzonchi — Chimyon Chinnichi Baza filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998941368848",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-10",
    nomi: "Arzonchi — Mini Gastranom filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998882080060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-20",
    nomi: "Arzonchi — HAIER Magazin (Fargona) filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998975907788",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-17",
    nomi: "Arzonchi — Quva Abu-Saxiy filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998933733998",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-11",
    nomi: "Arzonchi — Oltiariq Eng Arzoni filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998944441066",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-08",
    nomi: "Arzonchi — Kombinat Abu-Saxiy filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998886256060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-15",
    nomi: "Arzonchi — Margilon Eng arzon filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998997236060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-16",
    nomi: "Arzonchi — Rishton Abu-Saxiy filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998902747238",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-14",
    nomi: "Arzonchi — Andijon Magazin filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998883346060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-12",
    nomi: "Arzonchi — Kombinat Multibrend_2 filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998911275868",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-13",
    nomi: "Arzonchi — Farg'ona Eng Arzon filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998883358844",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-30",
    nomi: "Arzonchi — MIDEA konditsioner filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998974154040",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-06",
    nomi: "Arzonchi — Kombinat Optom filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998911149092",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-05",
    nomi: "Arzonchi — TG_Magazin (Kombinat) filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998888196060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  },
  {
    id: "fl-04",
    nomi: "Arzonchi — Margilon Hofmann filiali",
    manzil: "TOLDIRING: manzil",
    telefon: "+998884160060",
    ishVaqti: "TOLDIRING: ish vaqti",
    xaritaEmbed: "",
    rasm: ""
  }
];

/*
  ─────────────────────────────────────────────────────────────────────
  2026-09-09 — TOZALANDI (ega qarori)
  ─────────────────────────────────────────────────────────────────────
  Bu blokda uchta QO'LDA yozilgan namuna yozuv bor edi. Ular fayl
  boshidagi shablondan ko'chirilgani telefon raqamlaridan bilinib
  turardi: +99890123456**7**, ...**8**, ...**9** — ketma-ket soxta.

    • fl-02 «Yunusobod filiali» — ega: «Yunusobod filiali o'chiriladi».
      → BUTUNLAY O'CHIRILDI.

    • fl-01 «Chilonzor filiali» — API'da HAQIQIY yozuv bor
      («Toshkent (Chilonzor) filiali»). Ikkitasi bir vaqtda ko'rinib,
      ikki xil telefon ko'rsatardi. Ega: «bor filiallar qolsin» —
      shuning uchun API'dagi haqiqiysi qoldi, qo'lda yozilgan
      TAKRORI o'chirildi. Manzilini ega admin ekrani orqali kiritadi.

    • fl-03 «Sergeli» — hozircha yo'q. Ega: «yo'q filiallarimiz nomi
      qolsin, lekin hali ochilmagan bo'lib chiqsin».
      → Nomi qoldi, `holat: "ochilmagan"` qo'yildi. Soxta telefon,
      manzil va xarita OLIB TASHLANDI — mijoz mavjud bo'lmagan
      raqamga qo'ng'iroq qilmasin.

  YANGI MAYDON — `holat`:
      "ochiq"      (yoki maydon umuman yo'q) — oddiy ishlayotgan filial
      "ochilmagan" — hali ochilmagan; kartochkada «Tez orada ochiladi»
                     yorlig'i chiqadi, telefon/xarita ko'rsatilmaydi.
  ─────────────────────────────────────────────────────────────────────
*/
const FILIALLAR_QOLDA = [
  {
    id: "fl-03",
    nomi: "Arzonchi — Sergeli filiali",
    manzil: "",
    telefon: "",
    ishVaqti: "",
    xaritaEmbed: "",
    rasm: "",
    holat: "ochilmagan"
  }
];

const FILIALLAR = FILIALLAR_AVTOMATIK.concat(FILIALLAR_QOLDA);
