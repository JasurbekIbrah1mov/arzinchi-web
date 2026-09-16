/*
  =======================================================================
  MA'LUMOT FAYLI — MAHSULOTLAR RO'YXATI
  =======================================================================
  Bu fayl IKKI QISMDAN iborat:

  1. MAHSULOTLAR_AVTOMATIK — "Mahsulotlarni-yangilash.bat" (yoki
     skriptlar/mahsulotlarni-yangilash.mjs) ishga tushirilganda TO'LIQ
     qayta yoziladigan blok. Bu yerni QO'LDA TAHRIRLAMANG — o'zgarishlaringiz
     keyingi yangilashda yo'qoladi. Oxirgi yangilash: 2026-08-29T12:40:38.380Z.

  2. MAHSULOTLAR_QOLDA — sizning qo'lingiz bilan qo'shgan yoki tahrirlagan
     mahsulotlaringiz. Skript BU BLOKKA HECH QACHON TEGMAYDI — istalgancha
     ommaviy yangilashni ishga tushirsangiz ham shu yerdagi mahsulotlar
     saqlanib qoladi.

  Ikkalasi ham pastda MAHSULOTLAR umumiy ro'yxatiga birlashtiriladi —
  boshqa hech qanday fayl (katalog.js, umumiy.js, mahsulot.js) buni
  bilishi shart emas, ular doim faqat MAHSULOTLAR massivini o'qiydi.

  ------------------------------------------------------------------
  QO'LDA MAHSULOT QO'SHISH (pastdagi MAHSULOTLAR_QOLDA ro'yxatiga):
  ------------------------------------------------------------------
  Eng ko'p uchraydigan xatolar:
    - Vergul yoki tirnoqni unutib qoldirish.
    - Ikki xil qo'shtirnoq (" ") o'rniga qiya qo'shtirnoq (" ") qo'yish —
      faqat oddiy qo'shtirnoq (") ishlating.
    - Bir xil "id" qiymatini ikki marta ishlatish — HAR BIR mahsulotning
      "id" si BOSHQA-BOSHQA bo'lishi SHART.
    - Narxni tirnoq ICHIDA yozish (3200000 — tirnoqsiz, son sifatida).

  Maydonlar tushuntirishi:
    id               — mahsulotning ichki kodi (unikal, masalan "mt-013").
                       Avtomatik mahsulotlar "ar-" bilan boshlanadi, shuning
                       uchun qo'lda qo'shganda "mt-" (yoki boshqa prefiks)
                       ishlatsangiz to'qnashuv bo'lmaydi.
    nomi             — mahsulot nomi (ekranda ko'rinadi).
    kategoriya       — mahsulot turi kodi. Mavjud kodlar uchun
                       js/malumotlar-kategoriya.js fayliga qarang.
    narx             — mahsulot narxi, so'mda, TIRNOQSIZ SON.
    qisqaTavsif      — kartochka va mahsulot sahifasida ko'rinadigan
                       qisqa tavsif (1 gap yetarli).
    rasm             — mahsulot rasmining fayl yo'li yoki internet manzili.
                       Hali bo'lmasa bo'sh qatorni ("") qoldiring.
    brend            — ISHLAB CHIQARUVCHI nomi (ixtiyoriy, bo'lmasa "").
    kod              — mahsulot kodi (ixtiyoriy, bo'lmasa "").
    qoldiq           — omborda nechta borligi, son (ixtiyoriy, bo'lmasa 0).
    xarakteristikalar — mahsulot xususiyatlari, { "Nomi": "Qiymati" }.
    filiallar        — mahsulot mavjud filiallarning "id" ro'yxati,
                       js/malumotlar-filial.js dagi id'larga mos bo'lsin.
    mavjud           — true (mavjud) yoki false (hozircha mavjud emas).

  NAMUNA OBYEKT:
  {
    id: "mt-013",
    nomi: "Namuna Mahsulot Nomi",
    kategoriya: "televizor",
    narx: 1000000,
    qisqaTavsif: "Mahsulot haqida bir og'iz gap",
    rasm: "",
    brend: "",
    kod: "",
    qoldiq: 0,
    xarakteristikalar: {
      "Diagonal": "32 dyum",
      "Ekran turi": "LED",
      "Rangi": "Qora",
      "Kafolat muddati": "12 oy",
      "Ishlab chiqaruvchi": "Noma'lum"
    },
    filiallar: ["fl-25"],
    mavjud: true
  }
  =======================================================================
*/

const MAHSULOTLAR_AVTOMATIK = [
  {
    id: "ar-1212609",
    nomi: "RHWG-12S ROISON Xolodilnik Seriy 91L",
    kategoriya: "muzlatgich",
    narx: 1390000,
    qisqaTavsif: "Roison ishlab chiqargan mahsulot. Kod: 1212609.",
    rasm: "rasmlar/mahsulotlar/1212609.webp",
    brend: "Roison",
    kod: "1212609",
    qoldiq: 143,
    xarakteristikalar: {
      "Brend": "Roison",
      "Mahsulot kodi": "1212609",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000001212609",
      "Omborda mavjud": "143 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-11","fl-12","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-22","fl-23","fl-24","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-13397",
    nomi: "KD 230FB (Ruchkasiz) VOLNA Xolodilnik (De Frost/seriy)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "Volna ishlab chiqargan mahsulot. Kod: 13397.",
    rasm: "rasmlar/mahsulotlar/13397.webp",
    brend: "Volna",
    kod: "13397",
    qoldiq: 94,
    xarakteristikalar: {
      "Brend": "Volna",
      "Mahsulot kodi": "13397",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000013397",
      "Omborda mavjud": "94 dona"
    },
    filiallar: ["fl-08","fl-10","fl-11","fl-14","fl-16","fl-17","fl-20","fl-22","fl-23","fl-24","fl-25","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2131",
    nomi: "IRF 215L-SL (Silk Inox) Ideal Xolodilnik (211L/De Frost/tepa morozilka/Silk Inox)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 2131.",
    rasm: "rasmlar/mahsulotlar/2131.webp",
    brend: "Ideal",
    kod: "2131",
    qoldiq: 70,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "2131",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000002131",
      "Omborda mavjud": "70 dona"
    },
    filiallar: ["fl-07","fl-08","fl-13","fl-17","fl-18","fl-19","fl-27","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-7674",
    nomi: "KD 400F Volna Xolodilnik (Seriy/Ruchkalik)",
    kategoriya: "muzlatgich",
    narx: 4675000,
    qisqaTavsif: "Volna ishlab chiqargan mahsulot. Kod: 7674.",
    rasm: "rasmlar/mahsulotlar/7674.webp",
    brend: "Volna",
    kod: "7674",
    qoldiq: 67,
    xarakteristikalar: {
      "Brend": "Volna",
      "Mahsulot kodi": "7674",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000007674",
      "Omborda mavjud": "67 dona"
    },
    filiallar: ["fl-07","fl-14","fl-15","fl-16","fl-18","fl-19","fl-21","fl-23","fl-24","fl-26","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1219860",
    nomi: "RHWG-33S ROISON Xolodilnik Kulrang/sokliy",
    kategoriya: "muzlatgich",
    narx: 3999000,
    qisqaTavsif: "Roison ishlab chiqargan mahsulot. Kod: 1219860.",
    rasm: "rasmlar/mahsulotlar/1219860.webp",
    brend: "Roison",
    kod: "1219860",
    qoldiq: 52,
    xarakteristikalar: {
      "Brend": "Roison",
      "Mahsulot kodi": "1219860",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000001219860",
      "Omborda mavjud": "52 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-12","fl-14","fl-17","fl-18","fl-19","fl-21","fl-26","fl-27","fl-32"],
    mavjud: true
  },
  {
    id: "ar-67",
    nomi: "IRF 370L (white) Ideal Xolodilnik (356L/No Frost/pastki morozilka/white/Sensor displey)",
    kategoriya: "muzlatgich",
    narx: 4675000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 67.",
    rasm: "rasmlar/mahsulotlar/67.webp",
    brend: "Ideal",
    kod: "67",
    qoldiq: 50,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "67",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000000067",
      "Omborda mavjud": "50 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-19","fl-20","fl-21","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-68",
    nomi: "IRF 260LS (Silver) Ideal Xolodilnik (250L/No Frost/pastki morozilka/Grey)",
    kategoriya: "muzlatgich",
    narx: 3445000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 68.",
    rasm: "rasmlar/mahsulotlar/68.webp",
    brend: "Ideal",
    kod: "68",
    qoldiq: 46,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "68",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000000068",
      "Omborda mavjud": "46 dona"
    },
    filiallar: ["fl-08","fl-09","fl-16","fl-17","fl-19","fl-22","fl-23","fl-25","fl-26","fl-28","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9028",
    nomi: "ENG RF-205 SG E-Energy Xolodilnik (Kulrang/De Frost/205 L/Oyna)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9028.",
    rasm: "rasmlar/mahsulotlar/9028.webp",
    brend: "E-Energy",
    kod: "9028",
    qoldiq: 45,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9028",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000009028",
      "Omborda mavjud": "45 dona"
    },
    filiallar: ["fl-07","fl-11","fl-19","fl-21","fl-25","fl-26","fl-27","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-2130",
    nomi: "IRF 215LS (Silver) Ideal Xolodilnik (211L/De Frost/tepa morozilka/Silver)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 2130.",
    rasm: "rasmlar/mahsulotlar/2130.webp",
    brend: "Ideal",
    kod: "2130",
    qoldiq: 44,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "2130",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000002130",
      "Omborda mavjud": "44 dona"
    },
    filiallar: ["fl-08","fl-09","fl-11","fl-13","fl-15","fl-18","fl-19","fl-23","fl-24","fl-26","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2186",
    nomi: "IRF 215L-INW (DARK+Kuller) Ideal Xolodilnik (Kuller/211L/De Frost/tepa morozilka/DARK inox)",
    kategoriya: "muzlatgich",
    narx: 2335000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 2186.",
    rasm: "rasmlar/mahsulotlar/2186.webp",
    brend: "Ideal",
    kod: "2186",
    qoldiq: 43,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "2186",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000002186",
      "Omborda mavjud": "43 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-13","fl-14","fl-15","fl-20","fl-23","fl-25","fl-27","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-403",
    nomi: "IRF 215L SLW (Silk Inox+Kuller) Ideal Xolodilnik (Kuller/211L/De Frost/tepa morozilka/Silk inox)",
    kategoriya: "muzlatgich",
    narx: 2275000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 403.",
    rasm: "rasmlar/mahsulotlar/403.webp",
    brend: "Ideal",
    kod: "403",
    qoldiq: 41,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "403",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000000403",
      "Omborda mavjud": "41 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-26","fl-27","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9052",
    nomi: "ENG RF 330 SG E-Energy Xolodilnik (Kulrang/DeFrost/330 L/Oyna)",
    kategoriya: "muzlatgich",
    narx: 3630000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9052.",
    rasm: "rasmlar/mahsulotlar/9052.webp",
    brend: "E-Energy",
    kod: "9052",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9052",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000009052",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-15","fl-18","fl-19","fl-22","fl-23","fl-24","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9029",
    nomi: "ENG RF-205 ST E-Energy Xolodilnik (Kulrang/De Frost/205 L/Setkalik)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9029.",
    rasm: "rasmlar/mahsulotlar/9029.webp",
    brend: "E-Energy",
    kod: "9029",
    qoldiq: 36,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9029",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000009029",
      "Omborda mavjud": "36 dona"
    },
    filiallar: ["fl-08","fl-10","fl-11","fl-14","fl-16","fl-17","fl-18","fl-23","fl-26","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1218401",
    nomi: "KD 230F (seriy) VOLNA Xolodilnik (207L/Seriy/Ruchkalik/Tepa morozilka)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "Volna ishlab chiqargan mahsulot. Kod: 1218401.",
    rasm: "rasmlar/mahsulotlar/1218401.webp",
    brend: "Volna",
    kod: "1218401",
    qoldiq: 34,
    xarakteristikalar: {
      "Brend": "Volna",
      "Mahsulot kodi": "1218401",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000001218401",
      "Omborda mavjud": "34 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-11","fl-12","fl-13","fl-14","fl-19","fl-25","fl-27","fl-28","fl-29","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7257",
    nomi: "RHWG-35 S ROISON Xolodilnik (264 L/kulrang/Paski morozilka)",
    kategoriya: "muzlatgich",
    narx: 3445000,
    qisqaTavsif: "Roison ishlab chiqargan mahsulot. Kod: 7257.",
    rasm: "rasmlar/mahsulotlar/7257.webp",
    brend: "Roison",
    kod: "7257",
    qoldiq: 33,
    xarakteristikalar: {
      "Brend": "Roison",
      "Mahsulot kodi": "7257",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000007257",
      "Omborda mavjud": "33 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-13","fl-14","fl-15","fl-18","fl-19","fl-20","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1040",
    nomi: "KD 320RW (Seriy) VOLNA Xolodilnik (310 L/Seriy/R600a/NoFrost)",
    kategoriya: "muzlatgich",
    narx: 4615000,
    qisqaTavsif: "Volna ishlab chiqargan mahsulot. Kod: 1040.",
    rasm: "rasmlar/mahsulotlar/1040.webp",
    brend: "Volna",
    kod: "1040",
    qoldiq: 31,
    xarakteristikalar: {
      "Brend": "Volna",
      "Mahsulot kodi": "1040",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000001040",
      "Omborda mavjud": "31 dona"
    },
    filiallar: ["fl-09","fl-14","fl-17","fl-19","fl-20","fl-22","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-4268",
    nomi: "LRF-210 INOX LORETTO Xolodilnik (INOX/207L/De Frost)",
    kategoriya: "muzlatgich",
    narx: 2337000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 4268.",
    rasm: "rasmlar/mahsulotlar/4268.webp",
    brend: "Loretto",
    kod: "4268",
    qoldiq: 30,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "4268",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000004268",
      "Omborda mavjud": "30 dona"
    },
    filiallar: ["fl-13","fl-15","fl-17","fl-23","fl-25","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13380",
    nomi: "RESHOTKA ELT 205 Xolodilnik Reshotka Polka",
    kategoriya: "muzlatgich",
    narx: 60000,
    qisqaTavsif: "Elite ishlab chiqargan mahsulot. Kod: 13380.",
    rasm: "rasmlar/mahsulotlar/13380.webp",
    brend: "Elite",
    kod: "13380",
    qoldiq: 30,
    xarakteristikalar: {
      "Brend": "Elite",
      "Mahsulot kodi": "13380",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000013380",
      "Omborda mavjud": "30 dona"
    },
    filiallar: [],
    mavjud: true
  },
  {
    id: "ar-224",
    nomi: "IRF 215L-IN (DARK) Ideal Xolodilnik (211L/De Frost/tepa morozilka/DARK inox)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 224.",
    rasm: "rasmlar/mahsulotlar/224.webp",
    brend: "Ideal",
    kod: "224",
    qoldiq: 29,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "224",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000000224",
      "Omborda mavjud": "29 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-14","fl-16","fl-18","fl-19","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-32"],
    mavjud: true
  },
  {
    id: "ar-5802",
    nomi: "ELT RF-205 SG ELITE Xolodilnik (Kulrang/De Frost/205 L/Oyna)",
    kategoriya: "muzlatgich",
    narx: 1990000,
    qisqaTavsif: "Elite ishlab chiqargan mahsulot. Kod: 5802.",
    rasm: "rasmlar/mahsulotlar/5802.webp",
    brend: "Elite",
    kod: "5802",
    qoldiq: 28,
    xarakteristikalar: {
      "Brend": "Elite",
      "Mahsulot kodi": "5802",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000005802",
      "Omborda mavjud": "28 dona"
    },
    filiallar: ["fl-08","fl-09","fl-11","fl-12","fl-15","fl-21","fl-26","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9976",
    nomi: "BCD-325 I KLEO Xolodilnik (Inox)",
    kategoriya: "muzlatgich",
    narx: 3015000,
    qisqaTavsif: "Kleo ishlab chiqargan mahsulot. Kod: 9976.",
    rasm: "rasmlar/mahsulotlar/9976.webp",
    brend: "Kleo",
    kod: "9976",
    qoldiq: 27,
    xarakteristikalar: {
      "Brend": "Kleo",
      "Mahsulot kodi": "9976",
      "Kategoriya": "Muzlatgichlar",
      "Shtrix-kod": "10000000009976",
      "Omborda mavjud": "27 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001921",
    nomi: "95102-10 Eron saxarnitsa+loshka Shisha (1kor/80dona)",
    kategoriya: "idish-tovoq",
    narx: 15000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1001921.",
    rasm: "rasmlar/mahsulotlar/1001921.webp",
    brend: "Eron Idishlari",
    kod: "1001921",
    qoldiq: 2422,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1001921",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001921",
      "Omborda mavjud": "2422 dona"
    },
    filiallar: ["fl-09","fl-10","fl-11","fl-16","fl-19","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1003530",
    nomi: "HK-C04 Effext Bohema Fujer 6talik (rangli/yaltiroq) 1kor/6set",
    kategoriya: "idish-tovoq",
    narx: 39000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1003530.",
    rasm: "rasmlar/mahsulotlar/1003530.webp",
    brend: "Umumiy",
    kod: "1003530",
    qoldiq: 1061,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1003530",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001003530",
      "Omborda mavjud": "1061 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-12","fl-15","fl-16","fl-17","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13035",
    nomi: "SL-5268 A Salvare Fujer (6pcs/340ml) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 35000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 13035.",
    rasm: "rasmlar/mahsulotlar/13035.webp",
    brend: "SALVARE",
    kod: "13035",
    qoldiq: 926,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "13035",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000000013035",
      "Omborda mavjud": "926 dona"
    },
    filiallar: ["fl-07","fl-09","fl-19","fl-20","fl-22","fl-28","fl-31"],
    mavjud: true
  },
  {
    id: "ar-13037",
    nomi: "ZB-202 B Salvare Bokal (6pcs) 6879842652326 1kor/12set",
    kategoriya: "idish-tovoq",
    narx: 25000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 13037.",
    rasm: "rasmlar/mahsulotlar/13037.webp",
    brend: "SALVARE",
    kod: "13037",
    qoldiq: 864,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "13037",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000000013037",
      "Omborda mavjud": "864 dona"
    },
    filiallar: ["fl-07","fl-11","fl-16","fl-17","fl-23","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1003765",
    nomi: "BX-040 Piyola nabor 4 talik 1kor/24set",
    kategoriya: "idish-tovoq",
    narx: 29000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1003765.",
    rasm: "rasmlar/mahsulotlar/1003765.webp",
    brend: "Umumiy",
    kod: "1003765",
    qoldiq: 792,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1003765",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "6975817310298",
      "Omborda mavjud": "792 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-19","fl-20","fl-24","fl-25","fl-26","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1004913",
    nomi: "BX-020 Piyola nabor 2 talik 1kor/48set",
    kategoriya: "idish-tovoq",
    narx: 20000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1004913.",
    rasm: "rasmlar/mahsulotlar/1004913.webp",
    brend: "Umumiy",
    kod: "1004913",
    qoldiq: 783,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1004913",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "6975817310281",
      "Omborda mavjud": "783 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-11","fl-12","fl-19","fl-24","fl-25","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-14560",
    nomi: "L-2 Santino Royal Home Piyola nabor (6 talik)",
    kategoriya: "idish-tovoq",
    narx: 66000,
    qisqaTavsif: "Santino ishlab chiqargan mahsulot. Kod: 14560.",
    rasm: "rasmlar/mahsulotlar/14560.webp",
    brend: "Santino",
    kod: "14560",
    qoldiq: 761,
    xarakteristikalar: {
      "Brend": "Santino",
      "Mahsulot kodi": "14560",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000000014560",
      "Omborda mavjud": "761 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-24","fl-25","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1005316",
    nomi: "SL-904 A2 Salvare Martinka (6talik/340ml/kulrang+zar) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 55000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1005316.",
    rasm: "rasmlar/mahsulotlar/1005316.webp",
    brend: "SALVARE",
    kod: "1005316",
    qoldiq: 732,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1005316",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001005316",
      "Omborda mavjud": "732 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-16","fl-19","fl-23","fl-24","fl-25","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001671",
    nomi: "SL-5268 B Salvare Fujer (6pcs/340ml) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 35000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1001671.",
    rasm: "rasmlar/mahsulotlar/1001671.webp",
    brend: "SALVARE",
    kod: "1001671",
    qoldiq: 688,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1001671",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001671",
      "Omborda mavjud": "688 dona"
    },
    filiallar: ["fl-10","fl-12","fl-16","fl-17","fl-21","fl-23","fl-24","fl-25","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1001670",
    nomi: "SL-5268 D Salvare Fujer (6pcs/340ml) 1kor/8set / 6982556530184",
    kategoriya: "idish-tovoq",
    narx: 35000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1001670.",
    rasm: "rasmlar/mahsulotlar/1001670.webp",
    brend: "SALVARE",
    kod: "1001670",
    qoldiq: 650,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1001670",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001670",
      "Omborda mavjud": "650 dona"
    },
    filiallar: ["fl-10","fl-11","fl-15","fl-16","fl-18","fl-21","fl-25","fl-26","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001920",
    nomi: "95102-11 Eron bokal+loshka Shisha (1kor/60dona)",
    kategoriya: "idish-tovoq",
    narx: 15000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1001920.",
    rasm: "rasmlar/mahsulotlar/1001920.webp",
    brend: "Eron Idishlari",
    kod: "1001920",
    qoldiq: 608,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1001920",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001920",
      "Omborda mavjud": "608 dona"
    },
    filiallar: ["fl-09","fl-11","fl-12","fl-15","fl-16","fl-19","fl-22","fl-23","fl-24","fl-25","fl-27","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1003850",
    nomi: "018157020 Asia Home Dinner set 21pcs",
    kategoriya: "idish-tovoq",
    narx: 189000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1003850.",
    rasm: "rasmlar/mahsulotlar/1003850.webp",
    brend: "Umumiy",
    kod: "1003850",
    qoldiq: 550,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1003850",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001003850",
      "Omborda mavjud": "550 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1002590",
    nomi: "333-3 Tuscan Glass Eron Salatnitsa 3pcs",
    kategoriya: "idish-tovoq",
    narx: 70000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1002590.",
    rasm: "rasmlar/mahsulotlar/1002590.webp",
    brend: "Eron Idishlari",
    kod: "1002590",
    qoldiq: 519,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1002590",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "6974492760114",
      "Omborda mavjud": "519 dona"
    },
    filiallar: ["fl-07","fl-09","fl-11","fl-17","fl-19","fl-20","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001672",
    nomi: "SL-904B Salvare Martinka (6pcs/340ml) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 55000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1001672.",
    rasm: "rasmlar/mahsulotlar/1001672.webp",
    brend: "SALVARE",
    kod: "1001672",
    qoldiq: 464,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1001672",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001672",
      "Omborda mavjud": "464 dona"
    },
    filiallar: ["fl-09","fl-10","fl-12","fl-16","fl-18","fl-19","fl-24","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1003400",
    nomi: "BX-060 Piyola nabor 6 talik 1kor/16set",
    kategoriya: "idish-tovoq",
    narx: 39000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1003400.",
    rasm: "rasmlar/mahsulotlar/1003400.webp",
    brend: "Umumiy",
    kod: "1003400",
    qoldiq: 456,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1003400",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "6975817310304",
      "Omborda mavjud": "456 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-11","fl-15","fl-16","fl-19","fl-22","fl-23","fl-24","fl-25","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1005311",
    nomi: "9024 Salvare Fujer (6talik/340ml/sariq) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 60000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1005311.",
    rasm: "rasmlar/mahsulotlar/1005311.webp",
    brend: "SALVARE",
    kod: "1005311",
    qoldiq: 424,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1005311",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001005311",
      "Omborda mavjud": "424 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-16","fl-17","fl-19","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-1005312",
    nomi: "9024 A2 Salvare Fujer (6talik/340ml/kulrang+zarlik) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 60000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1005312.",
    rasm: "rasmlar/mahsulotlar/1005312.webp",
    brend: "SALVARE",
    kod: "1005312",
    qoldiq: 383,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1005312",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001005312",
      "Omborda mavjud": "383 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-16","fl-19","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-1005314",
    nomi: "9035 Salvare Fujer (6talik/275ml/sariq) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 55000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1005314.",
    rasm: "rasmlar/mahsulotlar/1005314.webp",
    brend: "SALVARE",
    kod: "1005314",
    qoldiq: 305,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1005314",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "100000001005314",
      "Omborda mavjud": "305 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-16","fl-17","fl-19","fl-22","fl-23","fl-24","fl-27","fl-28","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1002701",
    nomi: "101-1 Eron Bokal (loshkali/gulli) 1 kor/72dona",
    kategoriya: "idish-tovoq",
    narx: 30000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1002701.",
    rasm: "rasmlar/mahsulotlar/1002701.webp",
    brend: "Eron Idishlari",
    kod: "1002701",
    qoldiq: 302,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1002701",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001002701",
      "Omborda mavjud": "302 dona"
    },
    filiallar: ["fl-10","fl-20","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29"],
    mavjud: true
  },
  {
    id: "ar-1005310",
    nomi: "9034 Salvare Martinka (6talik/190ml) 1kor/8set",
    kategoriya: "idish-tovoq",
    narx: 80000,
    qisqaTavsif: "SALVARE ishlab chiqargan mahsulot. Kod: 1005310.",
    rasm: "rasmlar/mahsulotlar/1005310.webp",
    brend: "SALVARE",
    kod: "1005310",
    qoldiq: 270,
    xarakteristikalar: {
      "Brend": "SALVARE",
      "Mahsulot kodi": "1005310",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001005310",
      "Omborda mavjud": "270 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-16","fl-19","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-1001907",
    nomi: "TBH-3248-2 Fashion Bokal+loshka Shisha (1kor/72dona)",
    kategoriya: "idish-tovoq",
    narx: 30000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1001907.",
    rasm: "rasmlar/mahsulotlar/1001907.webp",
    brend: "Eron Idishlari",
    kod: "1001907",
    qoldiq: 269,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1001907",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001907",
      "Omborda mavjud": "269 dona"
    },
    filiallar: ["fl-19","fl-22","fl-23","fl-25","fl-28","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1002810",
    nomi: "H109-5/H109-1/109-2 Eron Bokal (padarochniy/qizilgulli) 1kor/60dona",
    kategoriya: "idish-tovoq",
    narx: 30000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1002810.",
    rasm: "rasmlar/mahsulotlar/1002810.webp",
    brend: "Eron Idishlari",
    kod: "1002810",
    qoldiq: 236,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1002810",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001002810",
      "Omborda mavjud": "236 dona"
    },
    filiallar: ["fl-09","fl-18","fl-19","fl-20","fl-24","fl-28","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1001960",
    nomi: "972-2/979-2 Sakura Mug Krishkali Bokal 1kor/60dona",
    kategoriya: "idish-tovoq",
    narx: 35000,
    qisqaTavsif: "Sakura ishlab chiqargan mahsulot. Kod: 1001960.",
    rasm: "rasmlar/mahsulotlar/1001960.webp",
    brend: "Sakura",
    kod: "1001960",
    qoldiq: 209,
    xarakteristikalar: {
      "Brend": "Sakura",
      "Mahsulot kodi": "1001960",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001001960",
      "Omborda mavjud": "209 dona"
    },
    filiallar: ["fl-09","fl-11","fl-12","fl-16","fl-19","fl-21","fl-23","fl-25","fl-27","fl-28","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1002510",
    nomi: "Kod20 Tris/Fresh Sakura Matrushka  (binafsha/qizil gul) 1kor/20pochka",
    kategoriya: "idish-tovoq",
    narx: 70000,
    qisqaTavsif: "Sakura ishlab chiqargan mahsulot. Kod: 1002510.",
    rasm: "rasmlar/mahsulotlar/1002510.webp",
    brend: "Sakura",
    kod: "1002510",
    qoldiq: 203,
    xarakteristikalar: {
      "Brend": "Sakura",
      "Mahsulot kodi": "1002510",
      "Kategoriya": "Idish-tovoqlar",
      "Shtrix-kod": "10000001002510",
      "Omborda mavjud": "203 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-17","fl-18","fl-20","fl-21","fl-22","fl-23","fl-27","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8967",
    nomi: "(LN) BT60G 31STI (F) (22STI) FERRE Gaz Plita (3+1/Kulrang/Chugun/ Zajigalka/duxovka tepa-pas gaz)",
    kategoriya: "gaz-plita",
    narx: 2335000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8967.",
    rasm: "rasmlar/mahsulotlar/8967.webp",
    brend: "Ferre",
    kod: "8967",
    qoldiq: 79,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8967",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008967",
      "Omborda mavjud": "79 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-15","fl-17","fl-18","fl-19","fl-22","fl-24","fl-25","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9078",
    nomi: "LP60G 31GR (F) (22GR) Ferre Gaz Plita (3+1, Tyomniy Seriy, Gaz kontrol/Zajigalka, Temir)",
    kategoriya: "gaz-plita",
    narx: 2055000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 9078.",
    rasm: "rasmlar/mahsulotlar/9078.webp",
    brend: "Ferre",
    kod: "9078",
    qoldiq: 75,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "9078",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009078",
      "Omborda mavjud": "75 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-13","fl-14","fl-15","fl-16","fl-21","fl-23","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9293",
    nomi: "ENG GS-S6312 Kulrang E-Energy Gaz plita (3+1/Duxovka to`liq gaz/temir)",
    kategoriya: "gaz-plita",
    narx: 2215000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9293.",
    rasm: "rasmlar/mahsulotlar/9293.webp",
    brend: "E-Energy",
    kod: "9293",
    qoldiq: 71,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9293",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009293",
      "Omborda mavjud": "71 dona"
    },
    filiallar: ["fl-07","fl-24","fl-26","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9030",
    nomi: "(LN) BT60G 40STB (F) (21STB) FERRE Gaz Plita (4 gaz / Qora / Gaz Kontrol /Chugun/Zajigalka)",
    kategoriya: "gaz-plita",
    narx: 2215000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 9030.",
    rasm: "rasmlar/mahsulotlar/9030.webp",
    brend: "Ferre",
    kod: "9030",
    qoldiq: 47,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "9030",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009030",
      "Omborda mavjud": "47 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-15","fl-17","fl-18","fl-19","fl-20","fl-23","fl-25","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9235",
    nomi: "LP60F 40X (FFD-2) (19X) Ferre Gaz Plita (4, kulrang, Zajigalka, Gaz kontrol, Chugun)",
    kategoriya: "gaz-plita",
    narx: 2830000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 9235.",
    rasm: "rasmlar/mahsulotlar/9235.webp",
    brend: "Ferre",
    kod: "9235",
    qoldiq: 46,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "9235",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009235",
      "Omborda mavjud": "46 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-12","fl-14","fl-16","fl-17","fl-18","fl-19","fl-25","fl-28","fl-31"],
    mavjud: true
  },
  {
    id: "ar-8968",
    nomi: "(LN) BT60G 31STB (F) (22STB) FERRE Gaz Plita (3+1/Qora/Chugun/ Zajigalka/duxovka tepa-pas gaz)",
    kategoriya: "gaz-plita",
    narx: 2335000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8968.",
    rasm: "rasmlar/mahsulotlar/8968.webp",
    brend: "Ferre",
    kod: "8968",
    qoldiq: 45,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8968",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008968",
      "Omborda mavjud": "45 dona"
    },
    filiallar: ["fl-09","fl-10","fl-14","fl-15","fl-18","fl-19","fl-20","fl-22","fl-24","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8630",
    nomi: "LP60F 31X (FFD-2) (20X) Ferre Gaz Plita (3+1, Kulrang, Zajigalka, Gaz kontrol, Chugun)",
    kategoriya: "gaz-plita",
    narx: 2890000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8630.",
    rasm: "rasmlar/mahsulotlar/8630.webp",
    brend: "Ferre",
    kod: "8630",
    qoldiq: 35,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8630",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008630",
      "Omborda mavjud": "35 dona"
    },
    filiallar: ["fl-12","fl-14","fl-18","fl-19","fl-25","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-9017",
    nomi: "ENG GS S6312 (Kulrang+Chugun) E-Energy Gaz plita (3+1/Duxovka to`liq gaz/Chugun/Zajigalka)",
    kategoriya: "gaz-plita",
    narx: 2339000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9017.",
    rasm: "rasmlar/mahsulotlar/9017.webp",
    brend: "E-Energy",
    kod: "9017",
    qoldiq: 32,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9017",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009017",
      "Omborda mavjud": "32 dona"
    },
    filiallar: ["fl-10","fl-13","fl-19","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12792",
    nomi: "KINGWAY Gaz Plita Xitoy 1 ta Komforka (Nikel/390x290)",
    kategoriya: "gaz-plita",
    narx: 105000,
    qisqaTavsif: "Kingway ishlab chiqargan mahsulot. Kod: 12792.",
    rasm: "rasmlar/mahsulotlar/12792.webp",
    brend: "Kingway",
    kod: "12792",
    qoldiq: 32,
    xarakteristikalar: {
      "Brend": "Kingway",
      "Mahsulot kodi": "12792",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000012792",
      "Omborda mavjud": "32 dona"
    },
    filiallar: ["fl-09","fl-11","fl-19","fl-22","fl-24","fl-27","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8629",
    nomi: "LP60G 31 X (F) (22 X) Ferre Gaz Plita (3+1, kulrang, Zajigalka, Gaz kontrol, Temir)",
    kategoriya: "gaz-plita",
    narx: 2165000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8629.",
    rasm: "rasmlar/mahsulotlar/8629.webp",
    brend: "Ferre",
    kod: "8629",
    qoldiq: 31,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8629",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008629",
      "Omborda mavjud": "31 dona"
    },
    filiallar: ["fl-11","fl-14","fl-20","fl-23","fl-26","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-8522",
    nomi: "(LN) BT60F 31 SINOX (FFD-2 (25 SINOX) Ferre Gaz Plita (3+1)",
    kategoriya: "gaz-plita",
    narx: 3199000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8522.",
    rasm: "rasmlar/mahsulotlar/8522.webp",
    brend: "Ferre",
    kod: "8522",
    qoldiq: 27,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8522",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008522",
      "Omborda mavjud": "27 dona"
    },
    filiallar: ["fl-07","fl-08","fl-14","fl-17","fl-23","fl-25","fl-27","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-3474",
    nomi: "L305 (Seriy) Ideal Gaz Plita (3+1, Kulrang, Temir)",
    kategoriya: "gaz-plita",
    narx: 2065000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 3474.",
    rasm: "rasmlar/mahsulotlar/3474.webp",
    brend: "Ideal",
    kod: "3474",
    qoldiq: 27,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "3474",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000003474",
      "Omborda mavjud": "27 dona"
    },
    filiallar: ["fl-15","fl-27","fl-31"],
    mavjud: true
  },
  {
    id: "ar-377",
    nomi: "FS66BM01BBM Magna Gaz Plita (3+1/Qora/zajigalka/Temir/)",
    kategoriya: "gaz-plita",
    narx: 1725000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 377.",
    rasm: "rasmlar/mahsulotlar/377.webp",
    brend: "Magna",
    kod: "377",
    qoldiq: 24,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "377",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000000377",
      "Omborda mavjud": "24 dona"
    },
    filiallar: ["fl-07","fl-16","fl-24","fl-25","fl-26","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9018",
    nomi: "ENG GS E6311 Kulrang E-Energy Gaz plita (3+1/kulrang/Zajigalka/temir/Lampa/Duhovka gaz+elektr)",
    kategoriya: "gaz-plita",
    narx: 2199000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9018.",
    rasm: "rasmlar/mahsulotlar/9018.webp",
    brend: "E-Energy",
    kod: "9018",
    qoldiq: 23,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9018",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009018",
      "Omborda mavjud": "23 dona"
    },
    filiallar: ["fl-18","fl-19","fl-23","fl-29","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8523",
    nomi: "LP60F 40B (FFD2) (19B) Ferre Gaz Plita (4, Qora, Zajigalka, Gaz kontrol, Chugun)",
    kategoriya: "gaz-plita",
    narx: 2770000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8523.",
    rasm: "rasmlar/mahsulotlar/8523.webp",
    brend: "Ferre",
    kod: "8523",
    qoldiq: 22,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8523",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008523",
      "Omborda mavjud": "22 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-18","fl-22","fl-28"],
    mavjud: true
  },
  {
    id: "ar-389",
    nomi: "L305 ECO (Antrasit) Ideal Gaz Plita (3+1, Antrasit, Temir)",
    kategoriya: "gaz-plita",
    narx: 1980000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 389.",
    rasm: "rasmlar/mahsulotlar/389.webp",
    brend: "Ideal",
    kod: "389",
    qoldiq: 21,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "389",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000000389",
      "Omborda mavjud": "21 dona"
    },
    filiallar: ["fl-07","fl-11","fl-16","fl-20","fl-22","fl-26","fl-28","fl-31"],
    mavjud: true
  },
  {
    id: "ar-8976",
    nomi: "L410 (Dark) Ideal Gaz plita (3+1/Gril/Zajigalka/Dark Inox/Temir)",
    kategoriya: "gaz-plita",
    narx: 2485000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8976.",
    rasm: "rasmlar/mahsulotlar/8976.webp",
    brend: "Ideal",
    kod: "8976",
    qoldiq: 21,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8976",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008976",
      "Omborda mavjud": "21 dona"
    },
    filiallar: ["fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8474",
    nomi: "(LN) BT60F 31 SB (FFD-2) (25SB) FERRE Gaz Plita",
    kategoriya: "gaz-plita",
    narx: 3199000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 8474.",
    rasm: "rasmlar/mahsulotlar/8474.webp",
    brend: "Ferre",
    kod: "8474",
    qoldiq: 20,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "8474",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008474",
      "Omborda mavjud": "20 dona"
    },
    filiallar: ["fl-09","fl-14","fl-25","fl-33"],
    mavjud: true
  },
  {
    id: "ar-4642",
    nomi: "L315 IDEAL Gaz plita (3+1 / Antrasit / temir)",
    kategoriya: "gaz-plita",
    narx: 2140000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 4642.",
    rasm: "rasmlar/mahsulotlar/4642.webp",
    brend: "Ideal",
    kod: "4642",
    qoldiq: 20,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "4642",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000004642",
      "Omborda mavjud": "20 dona"
    },
    filiallar: ["fl-08","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9009",
    nomi: "(LN) BT60G 40STI (F) (21STI) FERRE Gaz Plita (4 gaz / Kulrang  / Gaz Kontrol / Chugun/Zajigalka)",
    kategoriya: "gaz-plita",
    narx: 2275000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 9009.",
    rasm: "rasmlar/mahsulotlar/9009.webp",
    brend: "Ferre",
    kod: "9009",
    qoldiq: 19,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "9009",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000009009",
      "Omborda mavjud": "19 dona"
    },
    filiallar: ["fl-08","fl-10","fl-11","fl-14","fl-16","fl-18","fl-19","fl-21","fl-25","fl-31"],
    mavjud: true
  },
  {
    id: "ar-8689",
    nomi: "L265 Qora (A) IDEAL Gaz plita (4 Gaz/ qora /Chugun)",
    kategoriya: "gaz-plita",
    narx: 2215000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8689.",
    rasm: "rasmlar/mahsulotlar/8689.webp",
    brend: "Ideal",
    kod: "8689",
    qoldiq: 19,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8689",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000008689",
      "Omborda mavjud": "19 dona"
    },
    filiallar: ["fl-09","fl-12","fl-19","fl-21","fl-22","fl-24","fl-32"],
    mavjud: true
  },
  {
    id: "ar-6421",
    nomi: "L350 IDEAL Gaz Plita (3+1/Qora-Mat/Temir)",
    kategoriya: "gaz-plita",
    narx: 2240000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 6421.",
    rasm: "rasmlar/mahsulotlar/6421.webp",
    brend: "Ideal",
    kod: "6421",
    qoldiq: 19,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "6421",
      "Kategoriya": "Gaz plitalar",
      "Shtrix-kod": "10000000006421",
      "Omborda mavjud": "19 dona"
    },
    filiallar: ["fl-09","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13110",
    nomi: "F2Y1HYP65P LG Stiralnaya Mashina 7 kg /White",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 4599000,
    qisqaTavsif: "LG ishlab chiqargan mahsulot. Kod: 13110.",
    rasm: "rasmlar/mahsulotlar/13110.webp",
    brend: "LG",
    kod: "13110",
    qoldiq: 110,
    xarakteristikalar: {
      "Brend": "LG",
      "Mahsulot kodi": "13110",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000013110",
      "Omborda mavjud": "110 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-17","fl-19","fl-20","fl-22","fl-23","fl-24","fl-26","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2289",
    nomi: "F2T9GW9P LG stiralnaya mashina Sensor Display 8.5 KG",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 6095000,
    qisqaTavsif: "LG ishlab chiqargan mahsulot. Kod: 2289.",
    rasm: "rasmlar/mahsulotlar/2289.webp",
    brend: "LG",
    kod: "2289",
    qoldiq: 101,
    xarakteristikalar: {
      "Brend": "LG",
      "Mahsulot kodi": "2289",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000002289",
      "Omborda mavjud": "101 dona"
    },
    filiallar: ["fl-05","fl-07","fl-08","fl-09","fl-11","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-27","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9844",
    nomi: "(SL) VL 06SL7 SLIM Volmer Stiralnaya mashina (Kulrang/7 Kg/1200RPM/Steam/BLDC Inverter/DIamond Drum)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3015000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 9844.",
    rasm: "rasmlar/mahsulotlar/9844.webp",
    brend: "Volmer",
    kod: "9844",
    qoldiq: 51,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "9844",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000009844",
      "Omborda mavjud": "51 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-13","fl-17","fl-18","fl-19","fl-20","fl-23","fl-24","fl-25","fl-26","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9280",
    nomi: "WM814SDG2 HOFMANN stiralnaya mashina 8kg/mokriy/DD INVERTER",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 5230000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 9280.",
    rasm: "rasmlar/mahsulotlar/9280.webp",
    brend: "Hofmann",
    kod: "9280",
    qoldiq: 51,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "9280",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000009280",
      "Omborda mavjud": "51 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-15","fl-16","fl-17","fl-18","fl-19","fl-21","fl-22","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7538",
    nomi: "LW 9008 DD-G Loretto Stiralnaya mashina (9 kg/mokriy/DD inverter)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 5230000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 7538.",
    rasm: "rasmlar/mahsulotlar/7538.webp",
    brend: "Loretto",
    kod: "7538",
    qoldiq: 48,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "7538",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000007538",
      "Omborda mavjud": "48 dona"
    },
    filiallar: ["fl-07","fl-10","fl-12","fl-13","fl-14","fl-16","fl-18","fl-19","fl-20","fl-21","fl-23","fl-24","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9845",
    nomi: "(SL) VL 06SL8 SLIM Volmer Stiralnaya mashina (Kulrang/8 Kg/1400RPM/Steam/BLDC Inverter/DIamond Drum)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3499000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 9845.",
    rasm: "rasmlar/mahsulotlar/9845.webp",
    brend: "Volmer",
    kod: "9845",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "9845",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000009845",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-14","fl-15","fl-17","fl-18","fl-23","fl-24","fl-25","fl-27","fl-28"],
    mavjud: true
  },
  {
    id: "ar-110",
    nomi: "DR XQG100 1468DDP-FRT Fortalia Stiralnaya Mashina (10 kg/Dark Grey/DD Inverter)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 4735000,
    qisqaTavsif: "Fortalia ishlab chiqargan mahsulot. Kod: 110.",
    rasm: "rasmlar/mahsulotlar/110.webp",
    brend: "Fortalia",
    kod: "110",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "Fortalia",
      "Mahsulot kodi": "110",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000000110",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-23","fl-24","fl-25","fl-26","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-7664",
    nomi: "LW 6601 BLDC-G Loretto Stiralnaya mashina (6 Kg/mokriy/BLDC inverter)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3015000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 7664.",
    rasm: "rasmlar/mahsulotlar/7664.webp",
    brend: "Loretto",
    kod: "7664",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "7664",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000007664",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-09","fl-12","fl-13","fl-14","fl-21","fl-23","fl-25","fl-26","fl-27","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1223",
    nomi: "LW 7712 BLDC-G Loretto Stiralnaya mashina (7 Kg/Mokriy/BLDC Inverter/Tanirovka)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3198000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 1223.",
    rasm: "rasmlar/mahsulotlar/1223.webp",
    brend: "Loretto",
    kod: "1223",
    qoldiq: 36,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "1223",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000001223",
      "Omborda mavjud": "36 dona"
    },
    filiallar: ["fl-08","fl-12","fl-14","fl-16","fl-19","fl-20","fl-23","fl-24","fl-25","fl-27","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12770",
    nomi: "(G) IDAV 10KG-G Ideal Stiralnaya mashina (10 Kg/DD motor/Sensor/Steam/1400 ay-Min/kulrang)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 5410000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 12770.",
    rasm: "rasmlar/mahsulotlar/12770.webp",
    brend: "Ideal",
    kod: "12770",
    qoldiq: 35,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "12770",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000012770",
      "Omborda mavjud": "35 dona"
    },
    filiallar: ["fl-07","fl-13","fl-14","fl-18","fl-19","fl-20","fl-21","fl-23","fl-24","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-109",
    nomi: "DR XQG100 1488DDP-FRT Fortalia Stiralnaya Mashina (10 kg/Dark Grey/DD Inverter)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 5410000,
    qisqaTavsif: "Fortalia ishlab chiqargan mahsulot. Kod: 109.",
    rasm: "rasmlar/mahsulotlar/109.webp",
    brend: "Fortalia",
    kod: "109",
    qoldiq: 33,
    xarakteristikalar: {
      "Brend": "Fortalia",
      "Mahsulot kodi": "109",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000000109",
      "Omborda mavjud": "33 dona"
    },
    filiallar: ["fl-20","fl-25","fl-26","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9227",
    nomi: "LW 7008 DD-G Loretto Stiralnaya mashina (7 kg/mokriy/DD inverter)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 4430000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 9227.",
    rasm: "rasmlar/mahsulotlar/9227.webp",
    brend: "Loretto",
    kod: "9227",
    qoldiq: 27,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "9227",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000009227",
      "Omborda mavjud": "27 dona"
    },
    filiallar: ["fl-08","fl-11","fl-12","fl-14","fl-15","fl-18","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-131",
    nomi: "M812RIS-DG Magna Stiralnaya Mashina (8 KG/To`q Kumushrang/BLDC Inverter/1200 ay-min)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3020000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 131.",
    rasm: "rasmlar/mahsulotlar/131.webp",
    brend: "Magna",
    kod: "131",
    qoldiq: 26,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "131",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000000131",
      "Omborda mavjud": "26 dona"
    },
    filiallar: ["fl-11","fl-15","fl-16","fl-20","fl-21","fl-23","fl-24","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13193",
    nomi: "WM814SBS-TMS HOFMANN stiralnaya mashina Silver 8kg/BLDC INVERTER",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 5230000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 13193.",
    rasm: "rasmlar/mahsulotlar/13193.webp",
    brend: "Hofmann",
    kod: "13193",
    qoldiq: 26,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "13193",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000013193",
      "Omborda mavjud": "26 dona"
    },
    filiallar: ["fl-09","fl-11","fl-17","fl-19","fl-23","fl-24","fl-26","fl-28","fl-32"],
    mavjud: true
  },
  {
    id: "ar-8491",
    nomi: "VL 06SL7 Volmer Stiralnaya mashina (Kulrang/7 Kg/1200RPM/Steam/BLDC Inverter/DIamond Drum)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3260000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 8491.",
    rasm: "rasmlar/mahsulotlar/8491.webp",
    brend: "Volmer",
    kod: "8491",
    qoldiq: 25,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "8491",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000008491",
      "Omborda mavjud": "25 dona"
    },
    filiallar: ["fl-07","fl-10","fl-14","fl-20","fl-23","fl-24","fl-28","fl-29","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13124",
    nomi: "VL 71SL7 Volmer Stiralnaya mashina (Kulrang/7 Kg/1200RPM)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3325000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 13124.",
    rasm: "rasmlar/mahsulotlar/13124.webp",
    brend: "Volmer",
    kod: "13124",
    qoldiq: 25,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "13124",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000013124",
      "Omborda mavjud": "25 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-17","fl-18","fl-19","fl-20","fl-22","fl-24","fl-28","fl-32"],
    mavjud: true
  },
  {
    id: "ar-62",
    nomi: "LW 1014 BLDC-G Loretto Stiralnaya mashina (10 Kg/BLDC Inverter/Mokriy)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 5899000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 62.",
    rasm: "rasmlar/mahsulotlar/62.webp",
    brend: "Loretto",
    kod: "62",
    qoldiq: 23,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "62",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000000062",
      "Omborda mavjud": "23 dona"
    },
    filiallar: ["fl-14","fl-24","fl-26","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13157",
    nomi: "VL 71SL8 Volmer Stiralnaya mashina (Kulrang/8.5 Kg/1200RPM)",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3815000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 13157.",
    rasm: "rasmlar/mahsulotlar/13157.webp",
    brend: "Volmer",
    kod: "13157",
    qoldiq: 22,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "13157",
      "Kategoriya": "Kir yuvish mashinalari",
      "Shtrix-kod": "10000000013157",
      "Omborda mavjud": "22 dona"
    },
    filiallar: ["fl-07","fl-09","fl-15","fl-18","fl-20","fl-23","fl-28","fl-32"],
    mavjud: true
  },
  {
    id: "ar-2518",
    nomi: "SL 265 Sirius Pilesos (GOLD/2000W)",
    kategoriya: "changyutgich",
    narx: 599000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2518.",
    rasm: "rasmlar/mahsulotlar/2518.webp",
    brend: "Sirius",
    kod: "2518",
    qoldiq: 84,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2518",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002518",
      "Omborda mavjud": "84 dona"
    },
    filiallar: ["fl-07","fl-08","fl-13","fl-15","fl-16","fl-20","fl-22","fl-25","fl-26","fl-27","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2594",
    nomi: "Srv-1653Gr Sirius Pilesos Grey",
    kategoriya: "changyutgich",
    narx: 480000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2594.",
    rasm: "rasmlar/mahsulotlar/2594.webp",
    brend: "Sirius",
    kod: "2594",
    qoldiq: 83,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2594",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002594",
      "Omborda mavjud": "83 dona"
    },
    filiallar: ["fl-08","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-17","fl-19","fl-22","fl-23","fl-26","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6314",
    nomi: "EVC-110 Emerald Pilesos (Qizil/2in1/qopli/stakanli/5m shlang/original)",
    kategoriya: "changyutgich",
    narx: 1169000,
    qisqaTavsif: "Emerald ishlab chiqargan mahsulot. Kod: 6314.",
    rasm: "rasmlar/mahsulotlar/6314.webp",
    brend: "Emerald",
    kod: "6314",
    qoldiq: 81,
    xarakteristikalar: {
      "Brend": "Emerald",
      "Mahsulot kodi": "6314",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000006314",
      "Omborda mavjud": "81 dona"
    },
    filiallar: ["fl-07","fl-11","fl-16","fl-25","fl-26","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12895",
    nomi: "ORM-507 Orvica Pilesos ( DC 12 Wolt/avto)",
    kategoriya: "changyutgich",
    narx: 119000,
    qisqaTavsif: "ORVICA ishlab chiqargan mahsulot. Kod: 12895.",
    rasm: "rasmlar/mahsulotlar/12895.webp",
    brend: "ORVICA",
    kod: "12895",
    qoldiq: 78,
    xarakteristikalar: {
      "Brend": "ORVICA",
      "Mahsulot kodi": "12895",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000012895",
      "Omborda mavjud": "78 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-13","fl-15","fl-16","fl-18","fl-19","fl-21","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2485",
    nomi: "SL 280 SIRIUS Pilesos (2000 W/moviy-pushti rang matoviy)",
    kategoriya: "changyutgich",
    narx: 599000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2485.",
    rasm: "rasmlar/mahsulotlar/2485.webp",
    brend: "Sirius",
    kod: "2485",
    qoldiq: 77,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2485",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002485",
      "Omborda mavjud": "77 dona"
    },
    filiallar: ["fl-07","fl-09","fl-15","fl-16","fl-22","fl-25","fl-26","fl-27","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2350",
    nomi: "Srv-1651Bl Sirius Pilesos Blue",
    kategoriya: "changyutgich",
    narx: 480000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2350.",
    rasm: "rasmlar/mahsulotlar/2350.webp",
    brend: "Sirius",
    kod: "2350",
    qoldiq: 68,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2350",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002350",
      "Omborda mavjud": "68 dona"
    },
    filiallar: ["fl-08","fl-11","fl-12","fl-14","fl-16","fl-20","fl-22","fl-23","fl-24","fl-25","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2502",
    nomi: "Sl 275 Sirius Pilesos (binafsharang matoviy/2000W/qoplik)",
    kategoriya: "changyutgich",
    narx: 599000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2502.",
    rasm: "rasmlar/mahsulotlar/2502.webp",
    brend: "Sirius",
    kod: "2502",
    qoldiq: 64,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2502",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002502",
      "Omborda mavjud": "64 dona"
    },
    filiallar: ["fl-07","fl-14","fl-16","fl-20","fl-25","fl-26","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2351",
    nomi: "Srv-1652Be Sirius Pilesos 1600W Black",
    kategoriya: "changyutgich",
    narx: 480000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2351.",
    rasm: "rasmlar/mahsulotlar/2351.webp",
    brend: "Sirius",
    kod: "2351",
    qoldiq: 56,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2351",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002351",
      "Omborda mavjud": "56 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-11","fl-12","fl-14","fl-15","fl-16","fl-17","fl-18","fl-20","fl-23","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6423",
    nomi: "VC-1108C (Blue) FERRE Pilesos 2000W/Blue",
    kategoriya: "changyutgich",
    narx: 715000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 6423.",
    rasm: "rasmlar/mahsulotlar/6423.webp",
    brend: "Ferre",
    kod: "6423",
    qoldiq: 55,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "6423",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000006423",
      "Omborda mavjud": "55 dona"
    },
    filiallar: ["fl-11","fl-12","fl-14","fl-20","fl-21","fl-22","fl-26","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13415",
    nomi: "Srv-501YL Sirius Pilesos Yellow (1800W/+Kolba Filtr)",
    kategoriya: "changyutgich",
    narx: 650000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 13415.",
    rasm: "rasmlar/mahsulotlar/13415.webp",
    brend: "Sirius",
    kod: "13415",
    qoldiq: 49,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "13415",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000013415",
      "Omborda mavjud": "49 dona"
    },
    filiallar: ["fl-08","fl-15","fl-18","fl-20","fl-24","fl-28","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6125",
    nomi: "Srv-1654CH Sirius Pilesos 1600W choko",
    kategoriya: "changyutgich",
    narx: 480000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 6125.",
    rasm: "rasmlar/mahsulotlar/6125.webp",
    brend: "Sirius",
    kod: "6125",
    qoldiq: 48,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "6125",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000006125",
      "Omborda mavjud": "48 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-12","fl-13","fl-15","fl-16","fl-21","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2347",
    nomi: "Sl 255 Sirius Pilesos (qora-matoviy/2000W)",
    kategoriya: "changyutgich",
    narx: 599000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2347.",
    rasm: "rasmlar/mahsulotlar/2347.webp",
    brend: "Sirius",
    kod: "2347",
    qoldiq: 47,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2347",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002347",
      "Omborda mavjud": "47 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-16","fl-19","fl-22","fl-25","fl-26","fl-31"],
    mavjud: true
  },
  {
    id: "ar-2348",
    nomi: "Sl 260 Sirius Pilesos (Kuk matoviy/2000W)",
    kategoriya: "changyutgich",
    narx: 599000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2348.",
    rasm: "rasmlar/mahsulotlar/2348.webp",
    brend: "Sirius",
    kod: "2348",
    qoldiq: 45,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2348",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002348",
      "Omborda mavjud": "45 dona"
    },
    filiallar: ["fl-12","fl-15","fl-16","fl-19","fl-25","fl-26","fl-27","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2346",
    nomi: "Sl 250 Sirius Pilesos (Seriy matoviy/2000W)",
    kategoriya: "changyutgich",
    narx: 599000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 2346.",
    rasm: "rasmlar/mahsulotlar/2346.webp",
    brend: "Sirius",
    kod: "2346",
    qoldiq: 43,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "2346",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000002346",
      "Omborda mavjud": "43 dona"
    },
    filiallar: ["fl-07","fl-11","fl-13","fl-16","fl-19","fl-24","fl-25","fl-26","fl-33"],
    mavjud: true
  },
  {
    id: "ar-3446",
    nomi: "VC-1108C (black) FERRE Pilesos 2000W/BLACK",
    kategoriya: "changyutgich",
    narx: 715000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 3446.",
    rasm: "rasmlar/mahsulotlar/3446.webp",
    brend: "Ferre",
    kod: "3446",
    qoldiq: 43,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "3446",
      "Kategoriya": "Changyutgichlar",
      "Shtrix-kod": "10000000003446",
      "Omborda mavjud": "43 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-18","fl-19","fl-24","fl-26","fl-27","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-6347",
    nomi: "VL 060 BT Volmer Kuxonniy Vityajka (Qora/Flat/60 sm/Max Turbo motor/masofadan sensorli Boshqaruv)",
    kategoriya: "oshxona-tortkichi",
    narx: 1230000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 6347.",
    rasm: "rasmlar/mahsulotlar/6347.webp",
    brend: "Volmer",
    kod: "6347",
    qoldiq: 133,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "6347",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000006347",
      "Omborda mavjud": "133 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-13","fl-14","fl-15","fl-17","fl-18","fl-19","fl-21","fl-23","fl-24","fl-26","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6150",
    nomi: "LUX 0210 IDEAL Kuxonnaya Vityajka (Tabletka/Qora)",
    kategoriya: "oshxona-tortkichi",
    narx: 555000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 6150.",
    rasm: "rasmlar/mahsulotlar/6150.webp",
    brend: "Ideal",
    kod: "6150",
    qoldiq: 117,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "6150",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000006150",
      "Omborda mavjud": "117 dona"
    },
    filiallar: ["fl-07","fl-14","fl-17","fl-18","fl-20","fl-21","fl-23","fl-24","fl-25","fl-27","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6362",
    nomi: "LUX 0210 IDEAL Kuxonnaya Vityajka (Tabletka/Antrasit)",
    kategoriya: "oshxona-tortkichi",
    narx: 555000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 6362.",
    rasm: "rasmlar/mahsulotlar/6362.webp",
    brend: "Ideal",
    kod: "6362",
    qoldiq: 94,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "6362",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000006362",
      "Omborda mavjud": "94 dona"
    },
    filiallar: ["fl-07","fl-14","fl-20","fl-21","fl-24","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-4451",
    nomi: "LUX 0210 IDEAL Kuxonnaya Vityajka (Tabletka/Kulrang)",
    kategoriya: "oshxona-tortkichi",
    narx: 554000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 4451.",
    rasm: "rasmlar/mahsulotlar/4451.webp",
    brend: "Ideal",
    kod: "4451",
    qoldiq: 69,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "4451",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000004451",
      "Omborda mavjud": "69 dona"
    },
    filiallar: ["fl-07","fl-14","fl-24","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1215478",
    nomi: "VL 236 SM Volmer Kuxonniy Vityajka (Seriy/Tabletka/60 sm/ Komir Filter)",
    kategoriya: "oshxona-tortkichi",
    narx: 740000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1215478.",
    rasm: "rasmlar/mahsulotlar/1215478.webp",
    brend: "Volmer",
    kod: "1215478",
    qoldiq: 46,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1215478",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000001215478",
      "Omborda mavjud": "46 dona"
    },
    filiallar: ["fl-07","fl-12","fl-13","fl-14","fl-15","fl-16","fl-20","fl-21","fl-23","fl-25","fl-26","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7610",
    nomi: "601 BR TABLET Ferre Kuxonnaya Vityajka (60 sm/Brown/tabletka)",
    kategoriya: "oshxona-tortkichi",
    narx: 625000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 7610.",
    rasm: "rasmlar/mahsulotlar/7610.webp",
    brend: "Ferre",
    kod: "7610",
    qoldiq: 41,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "7610",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000007610",
      "Omborda mavjud": "41 dona"
    },
    filiallar: ["fl-22","fl-25","fl-29","fl-33"],
    mavjud: true
  },
  {
    id: "ar-5698",
    nomi: "LARA 60 REBUS Kuxonnaya Vityajka BLACK/Sensor",
    kategoriya: "oshxona-tortkichi",
    narx: 1099000,
    qisqaTavsif: "REBUS ishlab chiqargan mahsulot. Kod: 5698.",
    rasm: "rasmlar/mahsulotlar/5698.webp",
    brend: "REBUS",
    kod: "5698",
    qoldiq: 40,
    xarakteristikalar: {
      "Brend": "REBUS",
      "Mahsulot kodi": "5698",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000005698",
      "Omborda mavjud": "40 dona"
    },
    filiallar: ["fl-08","fl-12","fl-13","fl-17","fl-19","fl-23","fl-24","fl-25","fl-26","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1099252",
    nomi: "VL 060 STS Volmer Kuxonniy Vityajka (iNOX/Flat/60 sm/Max Turbo motor/masofadan sensorli Boshqaruv)",
    kategoriya: "oshxona-tortkichi",
    narx: 1255000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1099252.",
    rasm: "rasmlar/mahsulotlar/1099252.webp",
    brend: "Volmer",
    kod: "1099252",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1099252",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000001099252",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-12","fl-14","fl-16","fl-19","fl-20","fl-23","fl-24","fl-27","fl-29","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6351",
    nomi: "VL 075 BT Volmer Kuxonniy Vityajka (Qora/Flat/75 sm/Max Turbo motor/masofadan sensorli Boshqaruv)",
    kategoriya: "oshxona-tortkichi",
    narx: 1355000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 6351.",
    rasm: "rasmlar/mahsulotlar/6351.webp",
    brend: "Volmer",
    kod: "6351",
    qoldiq: 33,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "6351",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000006351",
      "Omborda mavjud": "33 dona"
    },
    filiallar: ["fl-08","fl-09","fl-14","fl-17","fl-18","fl-19","fl-21","fl-31"],
    mavjud: true
  },
  {
    id: "ar-7612",
    nomi: "601B TABLET Ferre Kuxonnaya Vityajka (60 sm/Qora/tabletka)",
    kategoriya: "oshxona-tortkichi",
    narx: 625000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 7612.",
    rasm: "rasmlar/mahsulotlar/7612.webp",
    brend: "Ferre",
    kod: "7612",
    qoldiq: 32,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "7612",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000007612",
      "Omborda mavjud": "32 dona"
    },
    filiallar: ["fl-12","fl-18","fl-19","fl-21","fl-24","fl-26","fl-28","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-1215477",
    nomi: "VL 236 BM Volmer Kuxonniy Vityajka (Qora/Tabletka/60 sm/ Komir Filter)",
    kategoriya: "oshxona-tortkichi",
    narx: 740000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1215477.",
    rasm: "rasmlar/mahsulotlar/1215477.webp",
    brend: "Volmer",
    kod: "1215477",
    qoldiq: 32,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1215477",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000001215477",
      "Omborda mavjud": "32 dona"
    },
    filiallar: ["fl-07","fl-10","fl-11","fl-12","fl-14","fl-18","fl-19","fl-23","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-7611",
    nomi: "601 GR TABLET Ferre Kuxonnaya Vityajka (60 sm/kulrang/tabletka)",
    kategoriya: "oshxona-tortkichi",
    narx: 625000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 7611.",
    rasm: "rasmlar/mahsulotlar/7611.webp",
    brend: "Ferre",
    kod: "7611",
    qoldiq: 30,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "7611",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000007611",
      "Omborda mavjud": "30 dona"
    },
    filiallar: ["fl-15","fl-20","fl-23","fl-24","fl-25","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1099253",
    nomi: "VL 236 STS Volmer Kuxonniy Vityajka (Inox/Flat/60 sm/Max Turbo motor/masofadan sensorli Boshqaruv)",
    kategoriya: "oshxona-tortkichi",
    narx: 875000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1099253.",
    rasm: "rasmlar/mahsulotlar/1099253.webp",
    brend: "Volmer",
    kod: "1099253",
    qoldiq: 30,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1099253",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000001099253",
      "Omborda mavjud": "30 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-18","fl-20","fl-23","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2031",
    nomi: "VL 065 BT Volmer Kuxonniy Vityajka (750 m3/Qora/Flat/60 sm/Max Turbo motor/masofadan sensorli Boshqaruv/Ko'mir filtr/Gofra)",
    kategoriya: "oshxona-tortkichi",
    narx: 1035000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 2031.",
    rasm: "rasmlar/mahsulotlar/2031.webp",
    brend: "Volmer",
    kod: "2031",
    qoldiq: 29,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "2031",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000002031",
      "Omborda mavjud": "29 dona"
    },
    filiallar: ["fl-07","fl-09","fl-11","fl-16","fl-18","fl-21","fl-24","fl-27","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2032",
    nomi: "VL 065BTS Volmer Kuxonniy Vityajka (750 m3/Qora/Flat/60 sm/Max Turbo motor/masofadan sensorli Boshqaruv/Ko'mir filtr/Gofra)",
    kategoriya: "oshxona-tortkichi",
    narx: 1035000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 2032.",
    rasm: "rasmlar/mahsulotlar/2032.webp",
    brend: "Volmer",
    kod: "2032",
    qoldiq: 29,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "2032",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000002032",
      "Omborda mavjud": "29 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-17","fl-23","fl-24","fl-25","fl-33"],
    mavjud: true
  },
  {
    id: "ar-100206",
    nomi: "MHS60BL Magna Kuxonnaya Vityajka",
    kategoriya: "oshxona-tortkichi",
    narx: 570000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 100206.",
    rasm: "rasmlar/mahsulotlar/100206.webp",
    brend: "Magna",
    kod: "100206",
    qoldiq: 28,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "100206",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000000100206",
      "Omborda mavjud": "28 dona"
    },
    filiallar: ["fl-08","fl-23","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1182997",
    nomi: "VL 236 BT Volmer Kuxonniy Vityajka (Qora/Tabletka/60 sm/ Komir Filter/Sensor+Ishorali boshqaruv)",
    kategoriya: "oshxona-tortkichi",
    narx: 850000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1182997.",
    rasm: "rasmlar/mahsulotlar/1182997.webp",
    brend: "Volmer",
    kod: "1182997",
    qoldiq: 27,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1182997",
      "Kategoriya": "Oshxona tortkichlari (vityajka)",
      "Shtrix-kod": "10000001182997",
      "Omborda mavjud": "27 dona"
    },
    filiallar: ["fl-08","fl-12","fl-14","fl-24","fl-25","fl-28","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2059",
    nomi: "ASW-H12A4/LARDI AUX Konditsioner Inverter Tent (JLR model)",
    kategoriya: "konditsioner",
    narx: 3699000,
    qisqaTavsif: "AUX ishlab chiqargan mahsulot. Kod: 2059.",
    rasm: "rasmlar/mahsulotlar/2059.webp",
    brend: "AUX",
    kod: "2059",
    qoldiq: 482,
    xarakteristikalar: {
      "Brend": "AUX",
      "Mahsulot kodi": "2059",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000002059",
      "Omborda mavjud": "482 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-30","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1358",
    nomi: "GWH12ACBXB-K6DNA1C/I Fairy Gree Konditsioner (12/Inverter/Wifi/Fairy)",
    kategoriya: "konditsioner",
    narx: 4979000,
    qisqaTavsif: "Gree ishlab chiqargan mahsulot. Kod: 1358.",
    rasm: "rasmlar/mahsulotlar/1358.webp",
    brend: "Gree",
    kod: "1358",
    qoldiq: 106,
    xarakteristikalar: {
      "Brend": "Gree",
      "Mahsulot kodi": "1358",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000001358",
      "Omborda mavjud": "106 dona"
    },
    filiallar: ["fl-12","fl-16","fl-18","fl-19","fl-21","fl-23","fl-24","fl-25","fl-30","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-339",
    nomi: "AS35WHEAT1/1U35WHEAT1 Haier Konditsioner (12/Inverter+Ten/R32 Freon)",
    kategoriya: "konditsioner",
    narx: 4999000,
    qisqaTavsif: "Haier ishlab chiqargan mahsulot. Kod: 339.",
    rasm: "rasmlar/mahsulotlar/339.webp",
    brend: "Haier",
    kod: "339",
    qoldiq: 105,
    xarakteristikalar: {
      "Brend": "Haier",
      "Mahsulot kodi": "339",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000339",
      "Omborda mavjud": "105 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-14","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-27","fl-29","fl-30","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13015",
    nomi: "CHSI-12HVMW MAGNA Konditsioner (4D Airflow/DC Inverter+Ten/Golosovoy upravleniya)",
    kategoriya: "konditsioner",
    narx: 3999000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 13015.",
    rasm: "rasmlar/mahsulotlar/13015.webp",
    brend: "Magna",
    kod: "13015",
    qoldiq: 100,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "13015",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000013015",
      "Omborda mavjud": "100 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-11","fl-12","fl-14","fl-15","fl-16","fl-19","fl-21","fl-23","fl-24","fl-26","fl-28","fl-30","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13014",
    nomi: "CHSI-12HVBL MAGNA Konditsioner (4D Airflow/DC Inverter+Ten/Golosovoy upravleniya)",
    kategoriya: "konditsioner",
    narx: 4099000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 13014.",
    rasm: "rasmlar/mahsulotlar/13014.webp",
    brend: "Magna",
    kod: "13014",
    qoldiq: 94,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "13014",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000013014",
      "Omborda mavjud": "94 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-12","fl-15","fl-16","fl-19","fl-20","fl-21","fl-25","fl-26","fl-27","fl-28","fl-29","fl-30","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-282",
    nomi: "12 Comfort Loretto Konditsioner (12/wifi/Inverter/TEN)",
    kategoriya: "konditsioner",
    narx: 4185000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 282.",
    rasm: "rasmlar/mahsulotlar/282.webp",
    brend: "Loretto",
    kod: "282",
    qoldiq: 83,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "282",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000282",
      "Omborda mavjud": "83 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-12","fl-14","fl-17","fl-18","fl-19","fl-20","fl-23","fl-27","fl-29","fl-30","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-337",
    nomi: "12 Classic Loretto Konditsioner (12/Inverter/TEN)",
    kategoriya: "konditsioner",
    narx: 3899000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 337.",
    rasm: "rasmlar/mahsulotlar/337.webp",
    brend: "Loretto",
    kod: "337",
    qoldiq: 75,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "337",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000337",
      "Omborda mavjud": "75 dona"
    },
    filiallar: ["fl-08","fl-09","fl-12","fl-15","fl-30","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9391",
    nomi: "ASW-H18A4/MGBR1DI Sitronic Konditsioner DARK (Inverter+TEN/Freon R32)",
    kategoriya: "konditsioner",
    narx: 6580000,
    qisqaTavsif: "Sitronic ishlab chiqargan mahsulot. Kod: 9391.",
    rasm: "rasmlar/mahsulotlar/9391.webp",
    brend: "Sitronic",
    kod: "9391",
    qoldiq: 58,
    xarakteristikalar: {
      "Brend": "Sitronic",
      "Mahsulot kodi": "9391",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000009391",
      "Omborda mavjud": "58 dona"
    },
    filiallar: ["fl-08","fl-15","fl-17","fl-19","fl-21","fl-22","fl-23","fl-25","fl-26","fl-27","fl-30","fl-32"],
    mavjud: true
  },
  {
    id: "ar-416",
    nomi: "ASW H12A4/QIK1DI Basic Loretto konditsioner (12/Inverter/Ten)",
    kategoriya: "konditsioner",
    narx: 3815000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 416.",
    rasm: "rasmlar/mahsulotlar/416.webp",
    brend: "Loretto",
    kod: "416",
    qoldiq: 54,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "416",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000416",
      "Omborda mavjud": "54 dona"
    },
    filiallar: ["fl-07","fl-12","fl-18","fl-20","fl-21","fl-24","fl-25","fl-30","fl-32"],
    mavjud: true
  },
  {
    id: "ar-462",
    nomi: "ASW H12A4/CHGS1DI ICE Sword konditsioner (12/Inverter/Ten)",
    kategoriya: "konditsioner",
    narx: 3699000,
    qisqaTavsif: "Sword ishlab chiqargan mahsulot. Kod: 462.",
    rasm: "rasmlar/mahsulotlar/462.webp",
    brend: "Sword",
    kod: "462",
    qoldiq: 51,
    xarakteristikalar: {
      "Brend": "Sword",
      "Mahsulot kodi": "462",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000462",
      "Omborda mavjud": "51 dona"
    },
    filiallar: ["fl-07","fl-10","fl-15","fl-19","fl-21","fl-30","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9784",
    nomi: "ASW H24A4/JIRID1 Sitronic Konditsioner (24/Powerfull/Inverter+Ten)",
    kategoriya: "konditsioner",
    narx: 6396000,
    qisqaTavsif: "Sitronic ishlab chiqargan mahsulot. Kod: 9784.",
    rasm: "rasmlar/mahsulotlar/9784.webp",
    brend: "Sitronic",
    kod: "9784",
    qoldiq: 48,
    xarakteristikalar: {
      "Brend": "Sitronic",
      "Mahsulot kodi": "9784",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000009784",
      "Omborda mavjud": "48 dona"
    },
    filiallar: ["fl-08","fl-09","fl-14","fl-19","fl-27","fl-31"],
    mavjud: true
  },
  {
    id: "ar-13398",
    nomi: "ALBA WF-12 LVPTC Midea Konditsioner (Inverter/Ten)",
    kategoriya: "konditsioner",
    narx: 4920000,
    qisqaTavsif: "Midea ishlab chiqargan mahsulot. Kod: 13398.",
    rasm: "rasmlar/mahsulotlar/13398.webp",
    brend: "Midea",
    kod: "13398",
    qoldiq: 46,
    xarakteristikalar: {
      "Brend": "Midea",
      "Mahsulot kodi": "13398",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000013398",
      "Omborda mavjud": "46 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-16","fl-17","fl-19","fl-21","fl-22","fl-26","fl-27","fl-28","fl-29","fl-30","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-386",
    nomi: "ARIN12-K ARIO Konditsioner (12kbtu /DC Inverter+ Ten)",
    kategoriya: "konditsioner",
    narx: 2999000,
    qisqaTavsif: "ARIO ishlab chiqargan mahsulot. Kod: 386.",
    rasm: "rasmlar/mahsulotlar/386.webp",
    brend: "ARIO",
    kod: "386",
    qoldiq: 40,
    xarakteristikalar: {
      "Brend": "ARIO",
      "Mahsulot kodi": "386",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000386",
      "Omborda mavjud": "40 dona"
    },
    filiallar: ["fl-09","fl-16","fl-17","fl-18","fl-22","fl-24","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8810",
    nomi: "ASW-H18A4/MAR1DI Sitronic Konditsioner SHINE (Inverter+TEN/R32/Double ten)",
    kategoriya: "konditsioner",
    narx: 6335000,
    qisqaTavsif: "Sitronic ishlab chiqargan mahsulot. Kod: 8810.",
    rasm: "rasmlar/mahsulotlar/8810.webp",
    brend: "Sitronic",
    kod: "8810",
    qoldiq: 40,
    xarakteristikalar: {
      "Brend": "Sitronic",
      "Mahsulot kodi": "8810",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000008810",
      "Omborda mavjud": "40 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-14","fl-17","fl-18","fl-19","fl-23","fl-27","fl-30"],
    mavjud: true
  },
  {
    id: "ar-111009",
    nomi: "BAC-Z12H1MW Ziffler Konditsioner (12/FULL DC Inverter/R32 Freon)",
    kategoriya: "konditsioner",
    narx: 3199000,
    qisqaTavsif: "Ziffler ishlab chiqargan mahsulot. Kod: 111009.",
    rasm: "rasmlar/mahsulotlar/111009.webp",
    brend: "Ziffler",
    kod: "111009",
    qoldiq: 38,
    xarakteristikalar: {
      "Brend": "Ziffler",
      "Mahsulot kodi": "111009",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000111009",
      "Omborda mavjud": "38 dona"
    },
    filiallar: ["fl-10","fl-11","fl-12","fl-14","fl-17","fl-19","fl-21","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-30","fl-33"],
    mavjud: true
  },
  {
    id: "ar-463",
    nomi: "ASW H12A4/CHGS1DI Snow Sword konditsioner (12/Inverter/Ten)",
    kategoriya: "konditsioner",
    narx: 3599000,
    qisqaTavsif: "Sword ishlab chiqargan mahsulot. Kod: 463.",
    rasm: "rasmlar/mahsulotlar/463.webp",
    brend: "Sword",
    kod: "463",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "Sword",
      "Mahsulot kodi": "463",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000000463",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-15","fl-16","fl-19","fl-30","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7662",
    nomi: "AS24IDHHRA-W1/1U24IDHFRA Heat (2024) HAIER Konditsioner (24/TEN/Inverter/Self Clean)",
    kategoriya: "konditsioner",
    narx: 8435000,
    qisqaTavsif: "Haier ishlab chiqargan mahsulot. Kod: 7662.",
    rasm: "rasmlar/mahsulotlar/7662.webp",
    brend: "Haier",
    kod: "7662",
    qoldiq: 36,
    xarakteristikalar: {
      "Brend": "Haier",
      "Mahsulot kodi": "7662",
      "Kategoriya": "Konditsionerlar",
      "Shtrix-kod": "10000000007662",
      "Omborda mavjud": "36 dona"
    },
    filiallar: ["fl-09","fl-11","fl-14","fl-22","fl-24","fl-25","fl-30","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1995",
    nomi: "64 560 DN Ideal Vstraivaemaya Plita (60 sm/)",
    kategoriya: "ichki-plita",
    narx: 1155000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 1995.",
    rasm: "rasmlar/mahsulotlar/1995.webp",
    brend: "Ideal",
    kod: "1995",
    qoldiq: 163,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "1995",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000001995",
      "Omborda mavjud": "163 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-13","fl-16","fl-18","fl-21","fl-22","fl-23","fl-24","fl-26","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13154",
    nomi: "R25W28 Ideal Vstraivaemaya plita IND (4 elektr/645*575*108/Sensor)",
    kategoriya: "ichki-plita",
    narx: 1585000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 13154.",
    rasm: "rasmlar/mahsulotlar/13154.webp",
    brend: "Ideal",
    kod: "13154",
    qoldiq: 39,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "13154",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000013154",
      "Omborda mavjud": "39 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-15","fl-16","fl-18","fl-19","fl-20","fl-25","fl-26","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-347",
    nomi: "M604GMSS Magna Vstraivaemaya Plita (4, Stalnoy, Zajigalka, Gaz kontrol, Temir)",
    kategoriya: "ichki-plita",
    narx: 1020000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 347.",
    rasm: "rasmlar/mahsulotlar/347.webp",
    brend: "Magna",
    kod: "347",
    qoldiq: 26,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "347",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000000347",
      "Omborda mavjud": "26 dona"
    },
    filiallar: ["fl-10","fl-12","fl-15","fl-16","fl-18","fl-21","fl-22","fl-24","fl-25","fl-26","fl-28","fl-29"],
    mavjud: true
  },
  {
    id: "ar-1999",
    nomi: "20 210 N Ideal Vstraivaemaya Plita (60 Sm)",
    kategoriya: "ichki-plita",
    narx: 1199000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 1999.",
    rasm: "rasmlar/mahsulotlar/1999.webp",
    brend: "Ideal",
    kod: "1999",
    qoldiq: 24,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "1999",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000001999",
      "Omborda mavjud": "24 dona"
    },
    filiallar: ["fl-07","fl-18","fl-21","fl-27","fl-28","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-8249",
    nomi: "M604GFIZ18SS MAGNA Vstraivaemaya Plita (4 gaz/Stalnoy/Elektr/SABAF/Gaz Kontrol)",
    kategoriya: "ichki-plita",
    narx: 1170000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 8249.",
    rasm: "rasmlar/mahsulotlar/8249.webp",
    brend: "Magna",
    kod: "8249",
    qoldiq: 22,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "8249",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000008249",
      "Omborda mavjud": "22 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-12","fl-14","fl-18","fl-19","fl-22","fl-23","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1766",
    nomi: "BH 31IX (F) (B 631IX) Ferre Vstraivaemaya Plita (3+1, Stalnoy, Zajigalka, Chugun)",
    kategoriya: "ichki-plita",
    narx: 1199000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 1766.",
    rasm: "rasmlar/mahsulotlar/1766.webp",
    brend: "Ferre",
    kod: "1766",
    qoldiq: 21,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "1766",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000001766",
      "Omborda mavjud": "21 dona"
    },
    filiallar: ["fl-10","fl-12","fl-17","fl-22","fl-23","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-100135",
    nomi: "VL 560BL Volmer Vstraivaemaya plita (60 Sm/4 gaz/Zajigalka/Gaz kontrol/Qora/Emal qoplama/Cho'yan reshotka)",
    kategoriya: "ichki-plita",
    narx: 1585000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 100135.",
    rasm: "rasmlar/mahsulotlar/100135.webp",
    brend: "Volmer",
    kod: "100135",
    qoldiq: 16,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "100135",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000100135",
      "Omborda mavjud": "16 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-12","fl-17","fl-21","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7750",
    nomi: "CTBS 631 CIXS.1/HF Hofmann Vstraivaemaya plita (3+1/Nerjaveyka/Gaz kontrol/Zajigalka/Chugun)",
    kategoriya: "ichki-plita",
    narx: 1725000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 7750.",
    rasm: "rasmlar/mahsulotlar/7750.webp",
    brend: "Hofmann",
    kod: "7750",
    qoldiq: 15,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "7750",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000007750",
      "Omborda mavjud": "15 dona"
    },
    filiallar: ["fl-14","fl-16","fl-17","fl-18","fl-19","fl-21","fl-22","fl-23","fl-27","fl-31"],
    mavjud: true
  },
  {
    id: "ar-11036",
    nomi: "BHG-QUADRO6100BE Ziffler Vstraivaemaya plita",
    kategoriya: "ichki-plita",
    narx: 915000,
    qisqaTavsif: "Ziffler ishlab chiqargan mahsulot. Kod: 11036.",
    rasm: "rasmlar/mahsulotlar/11036.webp",
    brend: "Ziffler",
    kod: "11036",
    qoldiq: 13,
    xarakteristikalar: {
      "Brend": "Ziffler",
      "Mahsulot kodi": "11036",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000011036",
      "Omborda mavjud": "13 dona"
    },
    filiallar: ["fl-10","fl-12","fl-15","fl-18","fl-19","fl-20","fl-25","fl-27"],
    mavjud: true
  },
  {
    id: "ar-13203",
    nomi: "HTJ-10 TAJ HANTAJI Vstraivaemaya plita (4x4/60sm/FFD/Chugun/INOX)",
    kategoriya: "ichki-plita",
    narx: 885000,
    qisqaTavsif: "HANTAJI ishlab chiqargan mahsulot. Kod: 13203.",
    rasm: "rasmlar/mahsulotlar/13203.webp",
    brend: "HANTAJI",
    kod: "13203",
    qoldiq: 13,
    xarakteristikalar: {
      "Brend": "HANTAJI",
      "Mahsulot kodi": "13203",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000013203",
      "Omborda mavjud": "13 dona"
    },
    filiallar: ["fl-08","fl-12","fl-17","fl-19","fl-21","fl-22"],
    mavjud: true
  },
  {
    id: "ar-6307",
    nomi: "M603EFIZ18SS MAGNA Vstraivaemaya Plita (3+1/Stalnoy/Elektr/SABAF/Gaz Kontrol)",
    kategoriya: "ichki-plita",
    narx: 1145000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 6307.",
    rasm: "rasmlar/mahsulotlar/6307.webp",
    brend: "Magna",
    kod: "6307",
    qoldiq: 13,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "6307",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000006307",
      "Omborda mavjud": "13 dona"
    },
    filiallar: ["fl-08","fl-10","fl-18","fl-19","fl-20","fl-22"],
    mavjud: true
  },
  {
    id: "ar-300",
    nomi: "M603EFIZ01BL Magna Vstraivaemaya Plita (3+1/gaz kontrol/Chugun/zajigalka/qora)",
    kategoriya: "ichki-plita",
    narx: 960000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 300.",
    rasm: "rasmlar/mahsulotlar/300.webp",
    brend: "Magna",
    kod: "300",
    qoldiq: 12,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "300",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000000300",
      "Omborda mavjud": "12 dona"
    },
    filiallar: ["fl-11","fl-14","fl-18","fl-22","fl-28","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-299",
    nomi: "M604GFIZTBR Magna vstraivaemaya plita (4 gaz/gaz kontrol/zajigalka/Chugun/Jigarrang)",
    kategoriya: "ichki-plita",
    narx: 960000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 299.",
    rasm: "rasmlar/mahsulotlar/299.webp",
    brend: "Magna",
    kod: "299",
    qoldiq: 12,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "299",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000000299",
      "Omborda mavjud": "12 dona"
    },
    filiallar: ["fl-09","fl-17","fl-19","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-2002",
    nomi: "BH 40IX (F) (B 640IX) FERRE Vstraivaemaya plita (4 gaz / gaz kontrol / Chugun / Stalnoy)",
    kategoriya: "ichki-plita",
    narx: 1120000,
    qisqaTavsif: "Ferre ishlab chiqargan mahsulot. Kod: 2002.",
    rasm: "rasmlar/mahsulotlar/2002.webp",
    brend: "Ferre",
    kod: "2002",
    qoldiq: 10,
    xarakteristikalar: {
      "Brend": "Ferre",
      "Mahsulot kodi": "2002",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000002002",
      "Omborda mavjud": "10 dona"
    },
    filiallar: ["fl-10","fl-17","fl-28","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7193",
    nomi: "CTBS 641 CBKS Hofmann Vstraivaemaya Plita (4 gaz, Qora, Zajigalka, Gaz kontrol, Chugun)",
    kategoriya: "ichki-plita",
    narx: 2645000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 7193.",
    rasm: "rasmlar/mahsulotlar/7193.webp",
    brend: "Hofmann",
    kod: "7193",
    qoldiq: 10,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "7193",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000007193",
      "Omborda mavjud": "10 dona"
    },
    filiallar: ["fl-08","fl-14","fl-15","fl-19","fl-21","fl-22","fl-24","fl-27","fl-28"],
    mavjud: true
  },
  {
    id: "ar-293",
    nomi: "M604G0MZ01BL Magna Vstraivaemaya plita (4 gaz/temir/zajigalka/qora)",
    kategoriya: "ichki-plita",
    narx: 810000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 293.",
    rasm: "rasmlar/mahsulotlar/293.webp",
    brend: "Magna",
    kod: "293",
    qoldiq: 10,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "293",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000000293",
      "Omborda mavjud": "10 dona"
    },
    filiallar: ["fl-09","fl-14","fl-22","fl-24","fl-25","fl-27","fl-28"],
    mavjud: true
  },
  {
    id: "ar-7851",
    nomi: "CTBS 641 ATIX Hofmann Vstraivaemaya Plita",
    kategoriya: "ichki-plita",
    narx: 2830000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 7851.",
    rasm: "rasmlar/mahsulotlar/7851.webp",
    brend: "Hofmann",
    kod: "7851",
    qoldiq: 9,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "7851",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000007851",
      "Omborda mavjud": "9 dona"
    },
    filiallar: ["fl-08","fl-17","fl-19","fl-20","fl-21","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-4284",
    nomi: "2 IR 202 Xatam Eron Elite Varochnaya Panel",
    kategoriya: "ichki-plita",
    narx: 210000,
    qisqaTavsif: "Elite ishlab chiqargan mahsulot. Kod: 4284.",
    rasm: "rasmlar/mahsulotlar/4284.webp",
    brend: "Elite",
    kod: "4284",
    qoldiq: 8,
    xarakteristikalar: {
      "Brend": "Elite",
      "Mahsulot kodi": "4284",
      "Kategoriya": "O'rnatiladigan plitalar",
      "Shtrix-kod": "10000000004284",
      "Omborda mavjud": "8 dona"
    },
    filiallar: ["fl-07","fl-24"],
    mavjud: true
  },
  {
    id: "ar-2442",
    nomi: "SE 1010 Odul Elektr Duxovka 36L Bez Taymer (2020 V)",
    kategoriya: "elektr-duxovka",
    narx: 399000,
    qisqaTavsif: "Odul ishlab chiqargan mahsulot. Kod: 2442.",
    rasm: "rasmlar/mahsulotlar/2442.webp",
    brend: "Odul",
    kod: "2442",
    qoldiq: 323,
    xarakteristikalar: {
      "Brend": "Odul",
      "Mahsulot kodi": "2442",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000002442",
      "Omborda mavjud": "323 dona"
    },
    filiallar: ["fl-11","fl-17","fl-18","fl-19","fl-20","fl-21","fl-23","fl-24","fl-25","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9912",
    nomi: "M1030 Odul IDEAL Elektr Duxovka (36 L)",
    kategoriya: "elektr-duxovka",
    narx: 399000,
    qisqaTavsif: "Odul ishlab chiqargan mahsulot. Kod: 9912.",
    rasm: "rasmlar/mahsulotlar/9912.webp",
    brend: "Odul",
    kod: "9912",
    qoldiq: 196,
    xarakteristikalar: {
      "Brend": "Odul",
      "Mahsulot kodi": "9912",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000009912",
      "Omborda mavjud": "196 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-18","fl-19","fl-20","fl-21","fl-22","fl-24","fl-25","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8037",
    nomi: "M5004 IDEAL Elektr. Duxovka 50L/Qora-mat/Grill/Rustik1600 W",
    kategoriya: "elektr-duxovka",
    narx: 899000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8037.",
    rasm: "rasmlar/mahsulotlar/8037.webp",
    brend: "Ideal",
    kod: "8037",
    qoldiq: 70,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8037",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000008037",
      "Omborda mavjud": "70 dona"
    },
    filiallar: ["fl-11","fl-13","fl-15","fl-17","fl-18","fl-19","fl-21","fl-22","fl-24","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-656",
    nomi: "M4510 IDEAL Elektr Duxovka (45 litr/Kulrang)",
    kategoriya: "elektr-duxovka",
    narx: 699000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 656.",
    rasm: "rasmlar/mahsulotlar/656.webp",
    brend: "Ideal",
    kod: "656",
    qoldiq: 65,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "656",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000000656",
      "Omborda mavjud": "65 dona"
    },
    filiallar: ["fl-07","fl-09","fl-13","fl-16","fl-17","fl-18","fl-21","fl-23","fl-24","fl-27","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-8017",
    nomi: "M5001 IDEAL Elektr. Duxovka 50L/Qora-mat/Grill/1600 W",
    kategoriya: "elektr-duxovka",
    narx: 825000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8017.",
    rasm: "rasmlar/mahsulotlar/8017.webp",
    brend: "Ideal",
    kod: "8017",
    qoldiq: 65,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8017",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000008017",
      "Omborda mavjud": "65 dona"
    },
    filiallar: ["fl-11","fl-18","fl-22","fl-23","fl-24","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9240",
    nomi: "W-28 DFL (FAN) MOKRIY Wincler Elektr, Duxovka 45L",
    kategoriya: "elektr-duxovka",
    narx: 1199000,
    qisqaTavsif: "Wincler ishlab chiqargan mahsulot. Kod: 9240.",
    rasm: "rasmlar/mahsulotlar/9240.webp",
    brend: "Wincler",
    kod: "9240",
    qoldiq: 62,
    xarakteristikalar: {
      "Brend": "Wincler",
      "Mahsulot kodi": "9240",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000009240",
      "Omborda mavjud": "62 dona"
    },
    filiallar: ["fl-08","fl-10","fl-12","fl-13","fl-14","fl-15","fl-17","fl-18","fl-21","fl-22","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9429",
    nomi: "M4510 Ideal Elektr Duxovka (45 litr/Qora-Mat)",
    kategoriya: "elektr-duxovka",
    narx: 699000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 9429.",
    rasm: "rasmlar/mahsulotlar/9429.webp",
    brend: "Ideal",
    kod: "9429",
    qoldiq: 59,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "9429",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000009429",
      "Omborda mavjud": "59 dona"
    },
    filiallar: ["fl-11","fl-16","fl-21","fl-22","fl-23","fl-24","fl-25","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-256",
    nomi: "ELT EO 6004 Elite Elektr Duxovka (60 L)",
    kategoriya: "elektr-duxovka",
    narx: 1045000,
    qisqaTavsif: "Elite ishlab chiqargan mahsulot. Kod: 256.",
    rasm: "rasmlar/mahsulotlar/256.webp",
    brend: "Elite",
    kod: "256",
    qoldiq: 54,
    xarakteristikalar: {
      "Brend": "Elite",
      "Mahsulot kodi": "256",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000000256",
      "Omborda mavjud": "54 dona"
    },
    filiallar: ["fl-07","fl-09","fl-16","fl-21","fl-22","fl-23","fl-26","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9921",
    nomi: "W-28 DL (LAMPA) MOKRIY Wincler Elektr, Duxovka 45L",
    kategoriya: "elektr-duxovka",
    narx: 1120000,
    qisqaTavsif: "Wincler ishlab chiqargan mahsulot. Kod: 9921.",
    rasm: "rasmlar/mahsulotlar/9921.webp",
    brend: "Wincler",
    kod: "9921",
    qoldiq: 54,
    xarakteristikalar: {
      "Brend": "Wincler",
      "Mahsulot kodi": "9921",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000009921",
      "Omborda mavjud": "54 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-13","fl-14","fl-16","fl-17","fl-18","fl-19","fl-21","fl-22","fl-24","fl-25","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-665",
    nomi: "MF3615-14RD MAGNA Elektr Duxovka (36L/Qizil/Lampa)",
    kategoriya: "elektr-duxovka",
    narx: 615000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 665.",
    rasm: "rasmlar/mahsulotlar/665.webp",
    brend: "Magna",
    kod: "665",
    qoldiq: 46,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "665",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000000665",
      "Omborda mavjud": "46 dona"
    },
    filiallar: ["fl-07","fl-10","fl-11","fl-12","fl-14","fl-15","fl-16","fl-17","fl-18","fl-21","fl-22","fl-23","fl-25","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-13255",
    nomi: "ELT EO 6002 Elite Elektr Duxovka (60 L)",
    kategoriya: "elektr-duxovka",
    narx: 1045000,
    qisqaTavsif: "Elite ishlab chiqargan mahsulot. Kod: 13255.",
    rasm: "rasmlar/mahsulotlar/13255.webp",
    brend: "Elite",
    kod: "13255",
    qoldiq: 42,
    xarakteristikalar: {
      "Brend": "Elite",
      "Mahsulot kodi": "13255",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000013255",
      "Omborda mavjud": "42 dona"
    },
    filiallar: ["fl-08","fl-09","fl-12","fl-21","fl-23","fl-26","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9780",
    nomi: "LUX 7000 IN Loretto Elektr Duxovka (70 L/Inox/3 ta ruchkalik)",
    kategoriya: "elektr-duxovka",
    narx: 1255000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 9780.",
    rasm: "rasmlar/mahsulotlar/9780.webp",
    brend: "Loretto",
    kod: "9780",
    qoldiq: 39,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "9780",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000009780",
      "Omborda mavjud": "39 dona"
    },
    filiallar: ["fl-10","fl-13","fl-16","fl-19","fl-20","fl-21","fl-22","fl-23","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-5627",
    nomi: "M5000 IDEAL Elektr. Duxovka 50L/Qora-mat/1600 W",
    kategoriya: "elektr-duxovka",
    narx: 765000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 5627.",
    rasm: "rasmlar/mahsulotlar/5627.webp",
    brend: "Ideal",
    kod: "5627",
    qoldiq: 38,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "5627",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000005627",
      "Omborda mavjud": "38 dona"
    },
    filiallar: ["fl-11","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-664",
    nomi: "MF3615-13BL Magna Elektr Duxovka (36L, Qora, Lampa)",
    kategoriya: "elektr-duxovka",
    narx: 615000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 664.",
    rasm: "rasmlar/mahsulotlar/664.webp",
    brend: "Magna",
    kod: "664",
    qoldiq: 36,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "664",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000000664",
      "Omborda mavjud": "36 dona"
    },
    filiallar: ["fl-09","fl-10","fl-11","fl-12","fl-14","fl-16","fl-18","fl-19","fl-21","fl-23","fl-25","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8002",
    nomi: "LUX 7003 GBL Loretto Elektr Duxovka (70 L/Qora oynali)",
    kategoriya: "elektr-duxovka",
    narx: 1440000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 8002.",
    rasm: "rasmlar/mahsulotlar/8002.webp",
    brend: "Loretto",
    kod: "8002",
    qoldiq: 35,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "8002",
      "Kategoriya": "Elektr duxovkalar",
      "Shtrix-kod": "10000000008002",
      "Omborda mavjud": "35 dona"
    },
    filiallar: ["fl-07","fl-08","fl-13","fl-20","fl-22","fl-23","fl-25","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2119",
    nomi: "VP4 Volto Polavtomat (4kg/shisha/90 Vt/effektivnost A)",
    kategoriya: "pol-avtomat",
    narx: 499000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 2119.",
    rasm: "rasmlar/mahsulotlar/2119.webp",
    brend: "Volto",
    kod: "2119",
    qoldiq: 248,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "2119",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000002119",
      "Omborda mavjud": "248 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-12","fl-13","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-22","fl-23","fl-24","fl-25","fl-26","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9822",
    nomi: "ENG WM 4088 Energy Pol Avtomat (4Kg/Bir kamera/Ko`k)",
    kategoriya: "pol-avtomat",
    narx: 540000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9822.",
    rasm: "rasmlar/mahsulotlar/9822.webp",
    brend: "E-Energy",
    kod: "9822",
    qoldiq: 232,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9822",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000009822",
      "Omborda mavjud": "232 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-11","fl-14","fl-15","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-76",
    nomi: "ID-75 (nasos-dampersiz) Ideal Pol Avtomat (Dampersiz/Oq Shisha, Nasos, Stirka 7,5 kg/Otjim 5 kg)",
    kategoriya: "pol-avtomat",
    narx: 1159000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 76.",
    rasm: "rasmlar/mahsulotlar/76.webp",
    brend: "Ideal",
    kod: "76",
    qoldiq: 155,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "76",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000000076",
      "Omborda mavjud": "155 dona"
    },
    filiallar: ["fl-13","fl-14","fl-16","fl-21","fl-23","fl-24","fl-26","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8821",
    nomi: "ID-75 (beznasos) Ideal Pol Avtomat (Oq Shisha, bezNasos, Stirka 7,5 kg/Otjim 5 kg)",
    kategoriya: "pol-avtomat",
    narx: 1199000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8821.",
    rasm: "rasmlar/mahsulotlar/8821.webp",
    brend: "Ideal",
    kod: "8821",
    qoldiq: 127,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8821",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000008821",
      "Omborda mavjud": "127 dona"
    },
    filiallar: ["fl-11","fl-13","fl-15","fl-16","fl-21","fl-28"],
    mavjud: true
  },
  {
    id: "ar-9588",
    nomi: "SUSHKA+/Xpb 20-200S Sirius Pol Avtomat (2kg/Havorang/Malyutka/ikki quloqcha)",
    kategoriya: "pol-avtomat",
    narx: 399000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 9588.",
    rasm: "rasmlar/mahsulotlar/9588.webp",
    brend: "Sirius",
    kod: "9588",
    qoldiq: 117,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "9588",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000009588",
      "Omborda mavjud": "117 dona"
    },
    filiallar: ["fl-07","fl-09","fl-11","fl-12","fl-14","fl-18","fl-19","fl-21","fl-25","fl-26","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9292",
    nomi: "ENG 4198 E-Energy Pol Avtomat (Shisha, Nasos, Lampa, Stirka 7,5 kg/Otjim 5 kg)",
    kategoriya: "pol-avtomat",
    narx: 1099000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9292.",
    rasm: "rasmlar/mahsulotlar/9292.webp",
    brend: "E-Energy",
    kod: "9292",
    qoldiq: 89,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9292",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000009292",
      "Omborda mavjud": "89 dona"
    },
    filiallar: ["fl-07","fl-11","fl-14","fl-17","fl-21","fl-25","fl-26","fl-31"],
    mavjud: true
  },
  {
    id: "ar-5178",
    nomi: "4198 Elite Pol Avtomat (Shisha, Nasos, Lampa, Stirka 7,5 kg/Otjim 5 kg)",
    kategoriya: "pol-avtomat",
    narx: 1099000,
    qisqaTavsif: "Elite ishlab chiqargan mahsulot. Kod: 5178.",
    rasm: "rasmlar/mahsulotlar/5178.webp",
    brend: "Elite",
    kod: "5178",
    qoldiq: 69,
    xarakteristikalar: {
      "Brend": "Elite",
      "Mahsulot kodi": "5178",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000005178",
      "Omborda mavjud": "69 dona"
    },
    filiallar: ["fl-07","fl-10","fl-11","fl-13","fl-14","fl-15","fl-19","fl-22","fl-23","fl-25","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-2560",
    nomi: "(GL) SUSHKA+/Xpb 20-210S Globus Pol Avtomat (2kg/Yashil/Malyutka/ikki quloqcha)",
    kategoriya: "pol-avtomat",
    narx: 399000,
    qisqaTavsif: "Globus ishlab chiqargan mahsulot. Kod: 2560.",
    rasm: "rasmlar/mahsulotlar/2560.webp",
    brend: "Globus",
    kod: "2560",
    qoldiq: 59,
    xarakteristikalar: {
      "Brend": "Globus",
      "Mahsulot kodi": "2560",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000002560",
      "Omborda mavjud": "59 dona"
    },
    filiallar: ["fl-14","fl-15","fl-16","fl-19","fl-21","fl-27","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9762",
    nomi: "ENG WM 4088 Energy Pol Avtomat (4Kg/Bir kamera/Zarg`aldoq)",
    kategoriya: "pol-avtomat",
    narx: 540000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 9762.",
    rasm: "rasmlar/mahsulotlar/9762.webp",
    brend: "E-Energy",
    kod: "9762",
    qoldiq: 50,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "9762",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000009762",
      "Omborda mavjud": "50 dona"
    },
    filiallar: ["fl-23"],
    mavjud: true
  },
  {
    id: "ar-2473",
    nomi: "ENG 4202 Energy Pol Avtomat (7,5 KG/Lampa/Nerjaveyka/Temir bak)",
    kategoriya: "pol-avtomat",
    narx: 1255000,
    qisqaTavsif: "E-Energy ishlab chiqargan mahsulot. Kod: 2473.",
    rasm: "rasmlar/mahsulotlar/2473.webp",
    brend: "E-Energy",
    kod: "2473",
    qoldiq: 43,
    xarakteristikalar: {
      "Brend": "E-Energy",
      "Mahsulot kodi": "2473",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000002473",
      "Omborda mavjud": "43 dona"
    },
    filiallar: ["fl-07","fl-09","fl-11","fl-13","fl-16","fl-18","fl-19","fl-25","fl-26","fl-31"],
    mavjud: true
  },
  {
    id: "ar-9589",
    nomi: "SUSHKA+/Xpb 20-210S Sirius Pol Avtomat (2kg/Yashil/Malyutka/ikki quloqcha)",
    kategoriya: "pol-avtomat",
    narx: 399000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 9589.",
    rasm: "rasmlar/mahsulotlar/9589.webp",
    brend: "Sirius",
    kod: "9589",
    qoldiq: 40,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "9589",
      "Kategoriya": "Pol yuvish mashinalari",
      "Shtrix-kod": "10000000009589",
      "Omborda mavjud": "40 dona"
    },
    filiallar: ["fl-07","fl-11","fl-14","fl-15","fl-19","fl-21","fl-24","fl-27","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1701",
    nomi: "32A1 MyTech Televizor Oddiy T2 (32\"/ Qizil-oq karobka)",
    kategoriya: "televizor",
    narx: 899000,
    qisqaTavsif: "MYTECH ishlab chiqargan mahsulot. Kod: 1701.",
    rasm: "rasmlar/mahsulotlar/1701.webp",
    brend: "MYTECH",
    kod: "1701",
    qoldiq: 169,
    xarakteristikalar: {
      "Brend": "MYTECH",
      "Mahsulot kodi": "1701",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000001701",
      "Omborda mavjud": "169 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-11","fl-12","fl-14","fl-15","fl-17","fl-18","fl-19","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7732",
    nomi: "43UD81 Yasin Televizor (SMART/43 LED TV/WebOS/Bez ramka)",
    kategoriya: "televizor",
    narx: 2335000,
    qisqaTavsif: "Yasin ishlab chiqargan mahsulot. Kod: 7732.",
    rasm: "rasmlar/mahsulotlar/7732.webp",
    brend: "Yasin",
    kod: "7732",
    qoldiq: 140,
    xarakteristikalar: {
      "Brend": "Yasin",
      "Mahsulot kodi": "7732",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000007732",
      "Omborda mavjud": "140 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9847",
    nomi: "32 Meiga Televizor (32/Smart TV/2 ta pult/Golosovoy pult)",
    kategoriya: "televizor",
    narx: 1255000,
    qisqaTavsif: "Meiga ishlab chiqargan mahsulot. Kod: 9847.",
    rasm: "rasmlar/mahsulotlar/9847.webp",
    brend: "Meiga",
    kod: "9847",
    qoldiq: 131,
    xarakteristikalar: {
      "Brend": "Meiga",
      "Mahsulot kodi": "9847",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000009847",
      "Omborda mavjud": "131 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-11","fl-13","fl-14","fl-15","fl-16","fl-18","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9939",
    nomi: "Smart TV 40\" MEIGA Televizor (40/Smart TV/Golosovoy)",
    kategoriya: "televizor",
    narx: 1810000,
    qisqaTavsif: "Meiga ishlab chiqargan mahsulot. Kod: 9939.",
    rasm: "rasmlar/mahsulotlar/9939.webp",
    brend: "Meiga",
    kod: "9939",
    qoldiq: 103,
    xarakteristikalar: {
      "Brend": "Meiga",
      "Mahsulot kodi": "9939",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000009939",
      "Omborda mavjud": "103 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-16","fl-17","fl-18","fl-19","fl-20","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9271",
    nomi: "Meiga 43 Meiga Televizor (43/Smart TV/Golosovoy pult)",
    kategoriya: "televizor",
    narx: 1999000,
    qisqaTavsif: "Meiga ishlab chiqargan mahsulot. Kod: 9271.",
    rasm: "rasmlar/mahsulotlar/9271.webp",
    brend: "Meiga",
    kod: "9271",
    qoldiq: 96,
    xarakteristikalar: {
      "Brend": "Meiga",
      "Mahsulot kodi": "9271",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000009271",
      "Omborda mavjud": "96 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-15","fl-17","fl-18","fl-19","fl-21","fl-23","fl-24","fl-26","fl-27","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7426",
    nomi: "32B1 Android Mytech Televizor Oq-qora (32, Smart, Android)",
    kategoriya: "televizor",
    narx: 1205000,
    qisqaTavsif: "MYTECH ishlab chiqargan mahsulot. Kod: 7426.",
    rasm: "rasmlar/mahsulotlar/7426.webp",
    brend: "MYTECH",
    kod: "7426",
    qoldiq: 83,
    xarakteristikalar: {
      "Brend": "MYTECH",
      "Mahsulot kodi": "7426",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000007426",
      "Omborda mavjud": "83 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-15","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7422",
    nomi: "43 Golosovoy Mytech Televizor (43, Smart, Golosovoy, Qora)",
    kategoriya: "televizor",
    narx: 2065000,
    qisqaTavsif: "MYTECH ishlab chiqargan mahsulot. Kod: 7422.",
    rasm: "rasmlar/mahsulotlar/7422.webp",
    brend: "MYTECH",
    kod: "7422",
    qoldiq: 80,
    xarakteristikalar: {
      "Brend": "MYTECH",
      "Mahsulot kodi": "7422",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000007422",
      "Omborda mavjud": "80 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-11","fl-14","fl-16","fl-17","fl-19","fl-20","fl-24","fl-25","fl-26","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-281",
    nomi: "Meiga 50 (2K) Meiga Televizor (50/2k UHD/IPS Panel/Dolby Atmos)",
    kategoriya: "televizor",
    narx: 2599000,
    qisqaTavsif: "Meiga ishlab chiqargan mahsulot. Kod: 281.",
    rasm: "rasmlar/mahsulotlar/281.webp",
    brend: "Meiga",
    kod: "281",
    qoldiq: 79,
    xarakteristikalar: {
      "Brend": "Meiga",
      "Mahsulot kodi": "281",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000000281",
      "Omborda mavjud": "79 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-13","fl-15","fl-19","fl-22","fl-23","fl-25","fl-26","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1700",
    nomi: "32B1 Android-Golos MyTech Televizor Siniy karobka (32\"/Smart/Android/Golosovoy)",
    kategoriya: "televizor",
    narx: 1230000,
    qisqaTavsif: "MYTECH ishlab chiqargan mahsulot. Kod: 1700.",
    rasm: "rasmlar/mahsulotlar/1700.webp",
    brend: "MYTECH",
    kod: "1700",
    qoldiq: 55,
    xarakteristikalar: {
      "Brend": "MYTECH",
      "Mahsulot kodi": "1700",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000001700",
      "Omborda mavjud": "55 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-11","fl-17","fl-18","fl-19","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31"],
    mavjud: true
  },
  {
    id: "ar-480",
    nomi: "32VT9000 Coolita Volto Televizor (32/wifi/Ips)",
    kategoriya: "televizor",
    narx: 1199000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 480.",
    rasm: "rasmlar/mahsulotlar/480.webp",
    brend: "Volto",
    kod: "480",
    qoldiq: 50,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "480",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000000480",
      "Omborda mavjud": "50 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-11","fl-13","fl-15","fl-16","fl-17","fl-20","fl-21","fl-23","fl-27","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7907",
    nomi: "Golosovoy BR32SCH Brando Televizor (32, Qora bez ramka, Smart TV, IPS Panel)",
    kategoriya: "televizor",
    narx: 1199000,
    qisqaTavsif: "Brando ishlab chiqargan mahsulot. Kod: 7907.",
    rasm: "rasmlar/mahsulotlar/7907.webp",
    brend: "Brando",
    kod: "7907",
    qoldiq: 46,
    xarakteristikalar: {
      "Brend": "Brando",
      "Mahsulot kodi": "7907",
      "Kategoriya": "Televizorlar",
      "Shtrix-kod": "10000000007907",
      "Omborda mavjud": "46 dona"
    },
    filiallar: ["fl-07","fl-11","fl-14","fl-15","fl-16","fl-19","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-479",
    nomi: "(FAN) AFK 2088-2 Volto Kuller (Hot&warn/Qora/Tepadan ulash/3 kran/frionsiz ventilyatorlik)",
    kategoriya: "kuler",
    narx: 599000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 479.",
    rasm: "rasmlar/mahsulotlar/479.webp",
    brend: "Volto",
    kod: "479",
    qoldiq: 373,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "479",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000000479",
      "Omborda mavjud": "373 dona"
    },
    filiallar: ["fl-07","fl-12","fl-18","fl-19","fl-20","fl-21","fl-23","fl-25","fl-26","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1026",
    nomi: "TN-2908TC Techon Kuller Qora+seriy (Qora+seriy/R134A freon/Tepadan ulanish/3 kran/15 oy kafolat)",
    kategoriya: "kuler",
    narx: 799000,
    qisqaTavsif: "TechOn ishlab chiqargan mahsulot. Kod: 1026.",
    rasm: "rasmlar/mahsulotlar/1026.webp",
    brend: "TechOn",
    kod: "1026",
    qoldiq: 88,
    xarakteristikalar: {
      "Brend": "TechOn",
      "Mahsulot kodi": "1026",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000001026",
      "Omborda mavjud": "88 dona"
    },
    filiallar: ["fl-06","fl-07","fl-08","fl-09","fl-10","fl-12","fl-14","fl-15","fl-17","fl-19","fl-21","fl-22","fl-23","fl-24","fl-26","fl-27","fl-28","fl-29","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9564",
    nomi: "AFK 2088-2 Volto Kuller (Qora/Tepadan ulash/3 kran)",
    kategoriya: "kuler",
    narx: 885000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 9564.",
    rasm: "rasmlar/mahsulotlar/9564.webp",
    brend: "Volto",
    kod: "9564",
    qoldiq: 36,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "9564",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000009564",
      "Omborda mavjud": "36 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-14","fl-15","fl-16","fl-20","fl-21","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1480",
    nomi: "AZ 6001 CT AZUR Kuller Qora (Qora/R134A freon/Tepadan ulanish/3 kran/15 oy kafolat)",
    kategoriya: "kuler",
    narx: 910000,
    qisqaTavsif: "AZUR ishlab chiqargan mahsulot. Kod: 1480.",
    rasm: "rasmlar/mahsulotlar/1480.webp",
    brend: "AZUR",
    kod: "1480",
    qoldiq: 36,
    xarakteristikalar: {
      "Brend": "AZUR",
      "Mahsulot kodi": "1480",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000001480",
      "Omborda mavjud": "36 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-17","fl-18","fl-19","fl-23","fl-24","fl-25","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1916",
    nomi: "VL-1680 (Grey Marble) Volmer Kuller (R134A Freon/Low Voltage/tepadan ulanish)",
    kategoriya: "kuler",
    narx: 1110000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1916.",
    rasm: "rasmlar/mahsulotlar/1916.webp",
    brend: "Volmer",
    kod: "1916",
    qoldiq: 29,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1916",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000001916",
      "Omborda mavjud": "29 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-13","fl-14","fl-15","fl-16","fl-18","fl-19","fl-23","fl-27"],
    mavjud: true
  },
  {
    id: "ar-9565",
    nomi: "AFK 2088-2 Kulrang Volto Kuller (kulrang/Tepadan ulash/3 kran)",
    kategoriya: "kuler",
    narx: 885000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 9565.",
    rasm: "rasmlar/mahsulotlar/9565.webp",
    brend: "Volto",
    kod: "9565",
    qoldiq: 28,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "9565",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000009565",
      "Omborda mavjud": "28 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-14","fl-15","fl-21"],
    mavjud: true
  },
  {
    id: "ar-1099254",
    nomi: "VL-1675 (Marble Black) Volmer Kuller (R134A Freon/Low Voltage/tepadan ulanish)",
    kategoriya: "kuler",
    narx: 1035000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 1099254.",
    rasm: "rasmlar/mahsulotlar/1099254.webp",
    brend: "Volmer",
    kod: "1099254",
    qoldiq: 25,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "1099254",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000001099254",
      "Omborda mavjud": "25 dona"
    },
    filiallar: ["fl-07","fl-12","fl-14","fl-17","fl-19","fl-22","fl-23"],
    mavjud: true
  },
  {
    id: "ar-290",
    nomi: "AFK-8828 (Kulrang) Volto Kuller (Choynakli/sensor/kulrang)",
    kategoriya: "kuler",
    narx: 1415000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 290.",
    rasm: "rasmlar/mahsulotlar/290.webp",
    brend: "Volto",
    kod: "290",
    qoldiq: 24,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "290",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000000290",
      "Omborda mavjud": "24 dona"
    },
    filiallar: ["fl-07","fl-08","fl-13","fl-14","fl-19","fl-20","fl-23","fl-24","fl-26","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-7746",
    nomi: "LD-105BL LORETTO Kuller (Kulrang-Qora/Elektron muzlatish tizimi/Napolniy/3-Knopka/isitish/Muzlatish)",
    kategoriya: "kuler",
    narx: 1230000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 7746.",
    rasm: "rasmlar/mahsulotlar/7746.webp",
    brend: "Loretto",
    kod: "7746",
    qoldiq: 23,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "7746",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000007746",
      "Omborda mavjud": "23 dona"
    },
    filiallar: ["fl-14","fl-15","fl-17","fl-18","fl-24","fl-25","fl-26","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9913",
    nomi: "AFK 2088-1 Kulrang Volto Kuller (R134A/kulrang/Pasdan ulash/3 kran)",
    kategoriya: "kuler",
    narx: 1181000,
    qisqaTavsif: "Volto ishlab chiqargan mahsulot. Kod: 9913.",
    rasm: "rasmlar/mahsulotlar/9913.webp",
    brend: "Volto",
    kod: "9913",
    qoldiq: 16,
    xarakteristikalar: {
      "Brend": "Volto",
      "Mahsulot kodi": "9913",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000009913",
      "Omborda mavjud": "16 dona"
    },
    filiallar: ["fl-07","fl-08","fl-19","fl-23","fl-24","fl-26","fl-29","fl-31"],
    mavjud: true
  },
  {
    id: "ar-7748",
    nomi: "LD-106BL LORETTO Kuller (Kuller-Qora/Elektron muzlatish tizimi/Napolniy/3-Knopka/isitish/Muzlatish)",
    kategoriya: "kuler",
    narx: 1230000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 7748.",
    rasm: "rasmlar/mahsulotlar/7748.webp",
    brend: "Loretto",
    kod: "7748",
    qoldiq: 14,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "7748",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000007748",
      "Omborda mavjud": "14 dona"
    },
    filiallar: ["fl-13","fl-23","fl-24","fl-25","fl-26","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1025",
    nomi: "AZ-2909TC AZUR Kuller Qora+seriy (Qora+seriy/R134A freon/Tepadan ulanish/3 kran/15 oy kafolat)",
    kategoriya: "kuler",
    narx: 799000,
    qisqaTavsif: "AZUR ishlab chiqargan mahsulot. Kod: 1025.",
    rasm: "rasmlar/mahsulotlar/1025.webp",
    brend: "AZUR",
    kod: "1025",
    qoldiq: 13,
    xarakteristikalar: {
      "Brend": "AZUR",
      "Mahsulot kodi": "1025",
      "Kategoriya": "Suv kulerlari",
      "Shtrix-kod": "10000000001025",
      "Omborda mavjud": "13 dona"
    },
    filiallar: ["fl-08","fl-19","fl-28","fl-31"],
    mavjud: true
  },
  {
    id: "ar-8823",
    nomi: "MCW-23L (qora) Ideal Mikrovolnovka (23L/qora/800W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 945000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8823.",
    rasm: "rasmlar/mahsulotlar/8823.webp",
    brend: "Ideal",
    kod: "8823",
    qoldiq: 147,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8823",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000008823",
      "Omborda mavjud": "147 dona"
    },
    filiallar: ["fl-07","fl-10","fl-12","fl-13","fl-14","fl-15","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9016",
    nomi: "MCW 23L (Silver) Ideal Mikrovolnovka (23L/Silver/800W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 945000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 9016.",
    rasm: "rasmlar/mahsulotlar/9016.webp",
    brend: "Ideal",
    kod: "9016",
    qoldiq: 112,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "9016",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000009016",
      "Omborda mavjud": "112 dona"
    },
    filiallar: ["fl-07","fl-08","fl-15","fl-16","fl-17","fl-18","fl-21","fl-22","fl-23","fl-26","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6856",
    nomi: "M20W7007-G Magna Mikrovolnovka (20 Litr/To`q Kulrang/700W/LG Magnetron)",
    kategoriya: "mikrotolqinli-pech",
    narx: 785000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 6856.",
    rasm: "rasmlar/mahsulotlar/6856.webp",
    brend: "Magna",
    kod: "6856",
    qoldiq: 95,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "6856",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000006856",
      "Omborda mavjud": "95 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-17","fl-18","fl-20","fl-21","fl-23","fl-24","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8034",
    nomi: "MCW-20L (Oq) Ideal Mikrovolnovka (20L/Oq/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 599000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 8034.",
    rasm: "rasmlar/mahsulotlar/8034.webp",
    brend: "Ideal",
    kod: "8034",
    qoldiq: 85,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "8034",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000008034",
      "Omborda mavjud": "85 dona"
    },
    filiallar: ["fl-07","fl-12","fl-13","fl-15","fl-16","fl-17","fl-18","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6862",
    nomi: "M23W7013-B Magna Mikrovolnovka (23 Litr/qora/800W/LG Magnetron)",
    kategoriya: "mikrotolqinli-pech",
    narx: 875000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 6862.",
    rasm: "rasmlar/mahsulotlar/6862.webp",
    brend: "Magna",
    kod: "6862",
    qoldiq: 83,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "6862",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000006862",
      "Omborda mavjud": "83 dona"
    },
    filiallar: ["fl-07","fl-08","fl-18","fl-22","fl-23","fl-24","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1643",
    nomi: "M23W7013-G Magna Mikrovolnovka (23 Litr/Seriy/800W/LG Magnetron)",
    kategoriya: "mikrotolqinli-pech",
    narx: 925000,
    qisqaTavsif: "Magna ishlab chiqargan mahsulot. Kod: 1643.",
    rasm: "rasmlar/mahsulotlar/1643.webp",
    brend: "Magna",
    kod: "1643",
    qoldiq: 83,
    xarakteristikalar: {
      "Brend": "Magna",
      "Mahsulot kodi": "1643",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000001643",
      "Omborda mavjud": "83 dona"
    },
    filiallar: ["fl-20","fl-22","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6720",
    nomi: "LM 2102 S Loretto Mikrovolnovka (20L/kulrang/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 850000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 6720.",
    rasm: "rasmlar/mahsulotlar/6720.webp",
    brend: "Loretto",
    kod: "6720",
    qoldiq: 53,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "6720",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000006720",
      "Omborda mavjud": "53 dona"
    },
    filiallar: ["fl-11","fl-18","fl-23","fl-24","fl-25","fl-27","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6724",
    nomi: "LM 2103 IN Loretto Mikrovolnovka (20L/INOX/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 860000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 6724.",
    rasm: "rasmlar/mahsulotlar/6724.webp",
    brend: "Loretto",
    kod: "6724",
    qoldiq: 50,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "6724",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000006724",
      "Omborda mavjud": "50 dona"
    },
    filiallar: ["fl-14","fl-23","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6725",
    nomi: "LM 2101 BL Loretto Mikrovolnovka (20L/Qora/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 825000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 6725.",
    rasm: "rasmlar/mahsulotlar/6725.webp",
    brend: "Loretto",
    kod: "6725",
    qoldiq: 48,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "6725",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000006725",
      "Omborda mavjud": "48 dona"
    },
    filiallar: ["fl-23","fl-25","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7820",
    nomi: "MCW-20L Ideal Mikrovolnovka (20L/Qora/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 649000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 7820.",
    rasm: "rasmlar/mahsulotlar/7820.webp",
    brend: "Ideal",
    kod: "7820",
    qoldiq: 47,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "7820",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000007820",
      "Omborda mavjud": "47 dona"
    },
    filiallar: ["fl-10","fl-14","fl-15","fl-18","fl-22","fl-23","fl-24","fl-25","fl-27","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-6719",
    nomi: "LM 2102 BL Loretto Mikrovolnovka (20L/Qora/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 825000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 6719.",
    rasm: "rasmlar/mahsulotlar/6719.webp",
    brend: "Loretto",
    kod: "6719",
    qoldiq: 39,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "6719",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000006719",
      "Omborda mavjud": "39 dona"
    },
    filiallar: ["fl-07","fl-10","fl-11","fl-18","fl-25","fl-27","fl-28","fl-29","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9015",
    nomi: "MCW 20L (kumushrang) Ideal Mikrovolnovka (20L/Kumushrang/700W)",
    kategoriya: "mikrotolqinli-pech",
    narx: 599000,
    qisqaTavsif: "Ideal ishlab chiqargan mahsulot. Kod: 9015.",
    rasm: "rasmlar/mahsulotlar/9015.webp",
    brend: "Ideal",
    kod: "9015",
    qoldiq: 38,
    xarakteristikalar: {
      "Brend": "Ideal",
      "Mahsulot kodi": "9015",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000009015",
      "Omborda mavjud": "38 dona"
    },
    filiallar: ["fl-08","fl-10","fl-12","fl-14","fl-17","fl-22","fl-23","fl-27","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7226",
    nomi: "LM 2306 BL Loretto Mikrovolnovka (23 L/Qora)",
    kategoriya: "mikrotolqinli-pech",
    narx: 995000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 7226.",
    rasm: "rasmlar/mahsulotlar/7226.webp",
    brend: "Loretto",
    kod: "7226",
    qoldiq: 35,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "7226",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000007226",
      "Omborda mavjud": "35 dona"
    },
    filiallar: ["fl-16","fl-20","fl-23","fl-24","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7225",
    nomi: "LM 2505 BL Loretto Mikrovolnovka (25 L/Qora)",
    kategoriya: "mikrotolqinli-pech",
    narx: 1060000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 7225.",
    rasm: "rasmlar/mahsulotlar/7225.webp",
    brend: "Loretto",
    kod: "7225",
    qoldiq: 33,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "7225",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000007225",
      "Omborda mavjud": "33 dona"
    },
    filiallar: ["fl-10","fl-11","fl-16","fl-21","fl-22","fl-23","fl-24","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8635",
    nomi: "VD 2315 MB Volmer Mikrovolnovka (23 Litr)",
    kategoriya: "mikrotolqinli-pech",
    narx: 1010000,
    qisqaTavsif: "Volmer ishlab chiqargan mahsulot. Kod: 8635.",
    rasm: "rasmlar/mahsulotlar/8635.webp",
    brend: "Volmer",
    kod: "8635",
    qoldiq: 30,
    xarakteristikalar: {
      "Brend": "Volmer",
      "Mahsulot kodi": "8635",
      "Kategoriya": "Mikroto'lqinli pechlar",
      "Shtrix-kod": "10000000008635",
      "Omborda mavjud": "30 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-18","fl-19","fl-23","fl-24","fl-25","fl-26","fl-28","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1001333",
    nomi: "(80 L) Vertikal AKMUR Vodonagrevatel (80 L/Vertikal)",
    kategoriya: "suv-isitgich",
    narx: 1380000,
    qisqaTavsif: "AKMUR ishlab chiqargan mahsulot. Kod: 1001333.",
    rasm: "rasmlar/mahsulotlar/1001333.webp",
    brend: "AKMUR",
    kod: "1001333",
    qoldiq: 47,
    xarakteristikalar: {
      "Brend": "AKMUR",
      "Mahsulot kodi": "1001333",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000001001333",
      "Omborda mavjud": "47 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-15","fl-19","fl-21","fl-23","fl-24","fl-25","fl-26","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9102",
    nomi: "(80) WHBHC-MW80V Beston Vodonagrevatel (80 L/oq matoviy)",
    kategoriya: "suv-isitgich",
    narx: 1265000,
    qisqaTavsif: "Beston ishlab chiqargan mahsulot. Kod: 9102.",
    rasm: "rasmlar/mahsulotlar/9102.webp",
    brend: "Beston",
    kod: "9102",
    qoldiq: 38,
    xarakteristikalar: {
      "Brend": "Beston",
      "Mahsulot kodi": "9102",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000009102",
      "Omborda mavjud": "38 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-14","fl-17","fl-19","fl-22","fl-24","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7783",
    nomi: "EWH V50L Aquahot Vodonagrevatel (50 L)",
    kategoriya: "suv-isitgich",
    narx: 1330000,
    qisqaTavsif: "Aquahot ishlab chiqargan mahsulot. Kod: 7783.",
    rasm: "rasmlar/mahsulotlar/7783.webp",
    brend: "Aquahot",
    kod: "7783",
    qoldiq: 37,
    xarakteristikalar: {
      "Brend": "Aquahot",
      "Mahsulot kodi": "7783",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000007783",
      "Omborda mavjud": "37 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-11","fl-14","fl-18","fl-24","fl-28","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7544",
    nomi: "(30 L) DSZF15-LJ 30Y6A2 30 L EcoPower Vodonagrevatel (30 L/)",
    kategoriya: "suv-isitgich",
    narx: 1355000,
    qisqaTavsif: "EcoPower ishlab chiqargan mahsulot. Kod: 7544.",
    rasm: "rasmlar/mahsulotlar/7544.webp",
    brend: "EcoPower",
    kod: "7544",
    qoldiq: 35,
    xarakteristikalar: {
      "Brend": "EcoPower",
      "Mahsulot kodi": "7544",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000007544",
      "Omborda mavjud": "35 dona"
    },
    filiallar: ["fl-09","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-18","fl-19","fl-21","fl-22","fl-23","fl-24","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7033",
    nomi: "ES80V-A3 Haier Vodonagrevatel (80L/vertikal)",
    kategoriya: "suv-isitgich",
    narx: 1845000,
    qisqaTavsif: "Haier ishlab chiqargan mahsulot. Kod: 7033.",
    rasm: "rasmlar/mahsulotlar/7033.webp",
    brend: "Haier",
    kod: "7033",
    qoldiq: 33,
    xarakteristikalar: {
      "Brend": "Haier",
      "Mahsulot kodi": "7033",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000007033",
      "Omborda mavjud": "33 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-13","fl-14","fl-15","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-8353",
    nomi: "(15 L) DSZF15-LJ/15CO (NAD rakovinoy) EcoPower Vodonagrevatel (15 L/Moyka ustiga o'rnatiladi)",
    kategoriya: "suv-isitgich",
    narx: 1170000,
    qisqaTavsif: "EcoPower ishlab chiqargan mahsulot. Kod: 8353.",
    rasm: "rasmlar/mahsulotlar/8353.webp",
    brend: "EcoPower",
    kod: "8353",
    qoldiq: 24,
    xarakteristikalar: {
      "Brend": "EcoPower",
      "Mahsulot kodi": "8353",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000008353",
      "Omborda mavjud": "24 dona"
    },
    filiallar: ["fl-08","fl-10","fl-12","fl-18","fl-21","fl-24","fl-27","fl-32"],
    mavjud: true
  },
  {
    id: "ar-8350",
    nomi: "(10 L) DSZF15-LJ/10CO (Pod rakovinoy) EcoPower Vodonagrevatel (10 L/Moyka pasiga o'rnatiladi)",
    kategoriya: "suv-isitgich",
    narx: 1045000,
    qisqaTavsif: "EcoPower ishlab chiqargan mahsulot. Kod: 8350.",
    rasm: "rasmlar/mahsulotlar/8350.webp",
    brend: "EcoPower",
    kod: "8350",
    qoldiq: 21,
    xarakteristikalar: {
      "Brend": "EcoPower",
      "Mahsulot kodi": "8350",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000008350",
      "Omborda mavjud": "21 dona"
    },
    filiallar: ["fl-08","fl-10","fl-18","fl-19","fl-21","fl-27","fl-31"],
    mavjud: true
  },
  {
    id: "ar-7543",
    nomi: "(50 L) DSZF15-LJ 50Y6A2 50 L EcoPower Vodonagrevatel (50 L/)",
    kategoriya: "suv-isitgich",
    narx: 1475000,
    qisqaTavsif: "EcoPower ishlab chiqargan mahsulot. Kod: 7543.",
    rasm: "rasmlar/mahsulotlar/7543.webp",
    brend: "EcoPower",
    kod: "7543",
    qoldiq: 21,
    xarakteristikalar: {
      "Brend": "EcoPower",
      "Mahsulot kodi": "7543",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000007543",
      "Omborda mavjud": "21 dona"
    },
    filiallar: ["fl-11","fl-12","fl-13","fl-14","fl-15","fl-17","fl-18","fl-19","fl-20","fl-21","fl-24","fl-28","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001330",
    nomi: "(50 L) Gorizontal (Oddiy) AKMUR Vodonagrevatel (50 L/Gorizontal)",
    kategoriya: "suv-isitgich",
    narx: 1355000,
    qisqaTavsif: "AKMUR ishlab chiqargan mahsulot. Kod: 1001330.",
    rasm: "rasmlar/mahsulotlar/1001330.webp",
    brend: "AKMUR",
    kod: "1001330",
    qoldiq: 21,
    xarakteristikalar: {
      "Brend": "AKMUR",
      "Mahsulot kodi": "1001330",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000001001330",
      "Omborda mavjud": "21 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-19","fl-21","fl-23","fl-24","fl-27"],
    mavjud: true
  },
  {
    id: "ar-8351",
    nomi: "(10 L) DSZF15-LJ/10CO (NAD rakovinoy) EcoPower Vodonagrevatel (10 L/Moyka ustiga o'rnatiladi)",
    kategoriya: "suv-isitgich",
    narx: 1045000,
    qisqaTavsif: "EcoPower ishlab chiqargan mahsulot. Kod: 8351.",
    rasm: "rasmlar/mahsulotlar/8351.webp",
    brend: "EcoPower",
    kod: "8351",
    qoldiq: 19,
    xarakteristikalar: {
      "Brend": "EcoPower",
      "Mahsulot kodi": "8351",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000008351",
      "Omborda mavjud": "19 dona"
    },
    filiallar: ["fl-07","fl-08","fl-11","fl-15","fl-21","fl-24"],
    mavjud: true
  },
  {
    id: "ar-1001334",
    nomi: "(50 L) Vertikal AKMUR Vodonagrevatel (50 L/Vertikal)",
    kategoriya: "suv-isitgich",
    narx: 1230000,
    qisqaTavsif: "AKMUR ishlab chiqargan mahsulot. Kod: 1001334.",
    rasm: "rasmlar/mahsulotlar/1001334.webp",
    brend: "AKMUR",
    kod: "1001334",
    qoldiq: 19,
    xarakteristikalar: {
      "Brend": "AKMUR",
      "Mahsulot kodi": "1001334",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000001001334",
      "Omborda mavjud": "19 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-15","fl-18","fl-19","fl-21","fl-22","fl-23","fl-24","fl-25","fl-28","fl-29"],
    mavjud: true
  },
  {
    id: "ar-7034",
    nomi: "ES100V-A3 Haier Vodonagrevatel (100L/vertikal)",
    kategoriya: "suv-isitgich",
    narx: 2090000,
    qisqaTavsif: "Haier ishlab chiqargan mahsulot. Kod: 7034.",
    rasm: "rasmlar/mahsulotlar/7034.webp",
    brend: "Haier",
    kod: "7034",
    qoldiq: 19,
    xarakteristikalar: {
      "Brend": "Haier",
      "Mahsulot kodi": "7034",
      "Kategoriya": "Suv isitgichlar (vodonagrevatellar)",
      "Shtrix-kod": "10000000007034",
      "Omborda mavjud": "19 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-12","fl-14","fl-19","fl-21","fl-23","fl-26","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9495",
    nomi: "DW-167BK/HF Hofmann Posuda Moyka (16 person/Sensor/qora inox/BLCD/7 Programm)",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 6580000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 9495.",
    rasm: "rasmlar/mahsulotlar/9495.webp",
    brend: "Hofmann",
    kod: "9495",
    qoldiq: 2,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "9495",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000009495",
      "Omborda mavjud": "2 dona"
    },
    filiallar: ["fl-08","fl-31"],
    mavjud: true
  },
  {
    id: "ar-7756",
    nomi: "DW-B148BG Hofmann Posuda Moyka (qora/sensor/BLDC/14 komplekt)",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 6399000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 7756.",
    rasm: "rasmlar/mahsulotlar/7756.webp",
    brend: "Hofmann",
    kod: "7756",
    qoldiq: 2,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "7756",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000007756",
      "Omborda mavjud": "2 dona"
    },
    filiallar: ["fl-14","fl-26"],
    mavjud: true
  },
  {
    id: "ar-8514",
    nomi: "GDW 1264 BG Goodwell Posuda Moyka",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 5599000,
    qisqaTavsif: "Goodwell ishlab chiqargan mahsulot. Kod: 8514.",
    rasm: "rasmlar/mahsulotlar/8514.webp",
    brend: "Goodwell",
    kod: "8514",
    qoldiq: 2,
    xarakteristikalar: {
      "Brend": "Goodwell",
      "Mahsulot kodi": "8514",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000008514",
      "Omborda mavjud": "2 dona"
    },
    filiallar: ["fl-09","fl-21"],
    mavjud: true
  },
  {
    id: "ar-419",
    nomi: "LBWD-146TDI/A Loretto Vstraivaemaya Posuda Moyka (60 sm/Sensor/14 person/8 programm)",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 5535000,
    qisqaTavsif: "Loretto ishlab chiqargan mahsulot. Kod: 419.",
    rasm: "rasmlar/mahsulotlar/419.webp",
    brend: "Loretto",
    kod: "419",
    qoldiq: 2,
    xarakteristikalar: {
      "Brend": "Loretto",
      "Mahsulot kodi": "419",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000000419",
      "Omborda mavjud": "2 dona"
    },
    filiallar: ["fl-23","fl-25"],
    mavjud: true
  },
  {
    id: "ar-8062",
    nomi: "DBS108FMT Hofmann Vstraivaemaya Posuda moyka",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 5845000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 8062.",
    rasm: "rasmlar/mahsulotlar/8062.webp",
    brend: "Hofmann",
    kod: "8062",
    qoldiq: 1,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "8062",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000008062",
      "Omborda mavjud": "1 dona"
    },
    filiallar: ["fl-07"],
    mavjud: true
  },
  {
    id: "ar-12131",
    nomi: "DFS25W11W BEKO Vstraivaemaya Posuda moyka (Oq/85*45*60sm)",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 4799000,
    qisqaTavsif: "Beko ishlab chiqargan mahsulot. Kod: 12131.",
    rasm: "rasmlar/mahsulotlar/12131.webp",
    brend: "Beko",
    kod: "12131",
    qoldiq: 1,
    xarakteristikalar: {
      "Brend": "Beko",
      "Mahsulot kodi": "12131",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000012131",
      "Omborda mavjud": "1 dona"
    },
    filiallar: ["fl-22"],
    mavjud: true
  },
  {
    id: "ar-5632",
    nomi: "DW-M107S HOFMANN Posuda Moyka",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 6090000,
    qisqaTavsif: "Hofmann ishlab chiqargan mahsulot. Kod: 5632.",
    rasm: "rasmlar/mahsulotlar/5632.webp",
    brend: "Hofmann",
    kod: "5632",
    qoldiq: 1,
    xarakteristikalar: {
      "Brend": "Hofmann",
      "Mahsulot kodi": "5632",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000005632",
      "Omborda mavjud": "1 dona"
    },
    filiallar: ["fl-20"],
    mavjud: true
  },
  {
    id: "ar-53",
    nomi: "HDWE15-58CS2RU Haier Posuda Moyka (15 person/inverter/6 programma/3 savat)",
    kategoriya: "idish-yuvish-mashinasi",
    narx: 5045000,
    qisqaTavsif: "Haier ishlab chiqargan mahsulot. Kod: 53.",
    rasm: "rasmlar/mahsulotlar/53.webp",
    brend: "Haier",
    kod: "53",
    qoldiq: 1,
    xarakteristikalar: {
      "Brend": "Haier",
      "Mahsulot kodi": "53",
      "Kategoriya": "Idish yuvish mashinalari",
      "Shtrix-kod": "10000000000053",
      "Omborda mavjud": "1 dona"
    },
    filiallar: ["fl-24"],
    mavjud: true
  },
  {
    id: "ar-815",
    nomi: "SRH-03A Sirius Obogrevatel 2500W",
    kategoriya: "boshqa-texnika",
    narx: 295000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 815.",
    rasm: "rasmlar/mahsulotlar/815.webp",
    brend: "Sirius",
    kod: "815",
    qoldiq: 5218,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "815",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000000815",
      "Omborda mavjud": "5218 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-12","fl-13","fl-14","fl-17","fl-19","fl-21","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1116",
    nomi: "SRH 2000F Sirius Obogrevatel (5 kvarsli, 2200W)",
    kategoriya: "boshqa-texnika",
    narx: 199000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 1116.",
    rasm: "rasmlar/mahsulotlar/1116.webp",
    brend: "Sirius",
    kod: "1116",
    qoldiq: 2894,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "1116",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000001116",
      "Omborda mavjud": "2894 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-11","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-25","fl-26","fl-27","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-810",
    nomi: "SR-2850 Sirius Obogrevatel 1800W",
    kategoriya: "boshqa-texnika",
    narx: 125000,
    qisqaTavsif: "Sirius ishlab chiqargan mahsulot. Kod: 810.",
    rasm: "rasmlar/mahsulotlar/810.webp",
    brend: "Sirius",
    kod: "810",
    qoldiq: 1481,
    xarakteristikalar: {
      "Brend": "Sirius",
      "Mahsulot kodi": "810",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000000810",
      "Omborda mavjud": "1481 dona"
    },
    filiallar: ["fl-07","fl-08","fl-14","fl-16","fl-18","fl-25","fl-26","fl-27","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1192",
    nomi: "FK-9900 (Xitoy) Fakang Fen",
    kategoriya: "boshqa-texnika",
    narx: 49000,
    qisqaTavsif: "Fakang ishlab chiqargan mahsulot. Kod: 1192.",
    rasm: "rasmlar/mahsulotlar/1192.webp",
    brend: "Fakang",
    kod: "1192",
    qoldiq: 1361,
    xarakteristikalar: {
      "Brend": "Fakang",
      "Mahsulot kodi": "1192",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000001192",
      "Omborda mavjud": "1361 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-9299",
    nomi: "28101 Intex Basseyn (Kaobkada 2 dona/ Easy pool Set/ 183*51sm/886 L)",
    kategoriya: "boshqa-texnika",
    narx: 179000,
    qisqaTavsif: "INTEX ishlab chiqargan mahsulot. Kod: 9299.",
    rasm: "rasmlar/mahsulotlar/9299.webp",
    brend: "INTEX",
    kod: "9299",
    qoldiq: 686,
    xarakteristikalar: {
      "Brend": "INTEX",
      "Mahsulot kodi": "9299",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000009299",
      "Omborda mavjud": "686 dona"
    },
    filiallar: ["fl-07","fl-10","fl-15","fl-20","fl-22","fl-23","fl-24","fl-25","fl-26","fl-28","fl-29"],
    mavjud: true
  },
  {
    id: "ar-1945",
    nomi: "FS 3001 Ventilyator (5 Plastmas Parrak/Past shovqin/45 sm/(2 dona/karobka))",
    kategoriya: "boshqa-texnika",
    narx: 99000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1945.",
    rasm: "rasmlar/mahsulotlar/1945.webp",
    brend: "Umumiy",
    kod: "1945",
    qoldiq: 644,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1945",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000001945",
      "Omborda mavjud": "644 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-12","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-21","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1003125",
    nomi: "XS000888 Grafin nabor (fioletiviy) 1kor/10set",
    kategoriya: "boshqa-texnika",
    narx: 49000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 1003125.",
    rasm: "rasmlar/mahsulotlar/1003125.webp",
    brend: "Umumiy",
    kod: "1003125",
    qoldiq: 592,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "1003125",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "6975380008820",
      "Omborda mavjud": "592 dona"
    },
    filiallar: ["fl-07","fl-15","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-7564",
    nomi: "12 TexnoGrand Kronshteyn Konditsioner uchun (09-12)",
    kategoriya: "boshqa-texnika",
    narx: 30000,
    qisqaTavsif: "Umumiy ishlab chiqargan mahsulot. Kod: 7564.",
    rasm: "rasmlar/mahsulotlar/7564.webp",
    brend: "Umumiy",
    kod: "7564",
    qoldiq: 462,
    xarakteristikalar: {
      "Brend": "Umumiy",
      "Mahsulot kodi": "7564",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000007564",
      "Omborda mavjud": "462 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-11","fl-12","fl-14","fl-15","fl-16","fl-19","fl-20","fl-24","fl-26","fl-28","fl-30","fl-32"],
    mavjud: true
  },
  {
    id: "ar-12763",
    nomi: "653-17 Sakura Termos Coffee Cup 1kor/50dona",
    kategoriya: "boshqa-texnika",
    narx: 35000,
    qisqaTavsif: "Sakura ishlab chiqargan mahsulot. Kod: 12763.",
    rasm: "rasmlar/mahsulotlar/12763.webp",
    brend: "Sakura",
    kod: "12763",
    qoldiq: 434,
    xarakteristikalar: {
      "Brend": "Sakura",
      "Mahsulot kodi": "12763",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000012763",
      "Omborda mavjud": "434 dona"
    },
    filiallar: ["fl-08","fl-09","fl-13","fl-15","fl-16","fl-18","fl-19","fl-21","fl-22","fl-24","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12585",
    nomi: "L-128 LG Mikser Xitoy 1200W 1kor/20dona 6925625647109",
    kategoriya: "boshqa-texnika",
    narx: 99000,
    qisqaTavsif: "LG-Xitoy ishlab chiqargan mahsulot. Kod: 12585.",
    rasm: "rasmlar/mahsulotlar/12585.webp",
    brend: "LG-Xitoy",
    kod: "12585",
    qoldiq: 427,
    xarakteristikalar: {
      "Brend": "LG-Xitoy",
      "Mahsulot kodi": "12585",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "1000000012585",
      "Omborda mavjud": "427 dona"
    },
    filiallar: ["fl-08","fl-09","fl-10","fl-11","fl-12","fl-14","fl-15","fl-17","fl-18","fl-23","fl-24","fl-25","fl-26","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001922",
    nomi: "95102-13 Eron Termos Detskiy 500ML (shoxli/1kor/80dona)",
    kategoriya: "boshqa-texnika",
    narx: 25000,
    qisqaTavsif: "Eron Idishlari ishlab chiqargan mahsulot. Kod: 1001922.",
    rasm: "rasmlar/mahsulotlar/1001922.webp",
    brend: "Eron Idishlari",
    kod: "1001922",
    qoldiq: 379,
    xarakteristikalar: {
      "Brend": "Eron Idishlari",
      "Mahsulot kodi": "1001922",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000001001922",
      "Omborda mavjud": "379 dona"
    },
    filiallar: ["fl-12","fl-17","fl-19","fl-21","fl-22","fl-24","fl-25","fl-26","fl-27","fl-28","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1126522",
    nomi: "MT-623 MEGA Termopot",
    kategoriya: "boshqa-texnika",
    narx: 195000,
    qisqaTavsif: "Mega ishlab chiqargan mahsulot. Kod: 1126522.",
    rasm: "rasmlar/mahsulotlar/1126522.webp",
    brend: "Mega",
    kod: "1126522",
    qoldiq: 373,
    xarakteristikalar: {
      "Brend": "Mega",
      "Mahsulot kodi": "1126522",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000001126522",
      "Omborda mavjud": "373 dona"
    },
    filiallar: ["fl-07","fl-09","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-17","fl-18","fl-19","fl-21","fl-22","fl-23","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1158",
    nomi: "SF-667 Sofaner Blender Ruchnoy Xitoy",
    kategoriya: "boshqa-texnika",
    narx: 120000,
    qisqaTavsif: "Sofaner ishlab chiqargan mahsulot. Kod: 1158.",
    rasm: "rasmlar/mahsulotlar/1158.webp",
    brend: "Sofaner",
    kod: "1158",
    qoldiq: 333,
    xarakteristikalar: {
      "Brend": "Sofaner",
      "Mahsulot kodi": "1158",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "6171701409608",
      "Omborda mavjud": "333 dona"
    },
    filiallar: ["fl-07","fl-08","fl-09","fl-10","fl-11","fl-13","fl-15","fl-16","fl-17","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-100989",
    nomi: "1203C Elegant Bagema (oq/tillarang/chaq-chuq solgich)",
    kategoriya: "boshqa-texnika",
    narx: 80000,
    qisqaTavsif: "ELEGANT ishlab chiqargan mahsulot. Kod: 100989.",
    rasm: "rasmlar/mahsulotlar/100989.webp",
    brend: "ELEGANT",
    kod: "100989",
    qoldiq: 312,
    xarakteristikalar: {
      "Brend": "ELEGANT",
      "Mahsulot kodi": "100989",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000100989",
      "Omborda mavjud": "312 dona"
    },
    filiallar: ["fl-07","fl-10","fl-12","fl-16","fl-17","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12117",
    nomi: "Hight speed Fen Dumaloq (1nasadka/pushti)",
    kategoriya: "boshqa-texnika",
    narx: 165000,
    qisqaTavsif: "Dyson ishlab chiqargan mahsulot. Kod: 12117.",
    rasm: "rasmlar/mahsulotlar/12117.webp",
    brend: "Dyson",
    kod: "12117",
    qoldiq: 308,
    xarakteristikalar: {
      "Brend": "Dyson",
      "Mahsulot kodi": "12117",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000012117",
      "Omborda mavjud": "308 dona"
    },
    filiallar: ["fl-07","fl-10","fl-11","fl-12","fl-14","fl-15","fl-16","fl-17","fl-20","fl-23","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-9686",
    nomi: "EK 166 Emerald Mikser (Xitoy) 600W 1kor/20dona",
    kategoriya: "boshqa-texnika",
    narx: 99000,
    qisqaTavsif: "Emerald (XITOY) ishlab chiqargan mahsulot. Kod: 9686.",
    rasm: "rasmlar/mahsulotlar/9686.webp",
    brend: "Emerald (XITOY)",
    kod: "9686",
    qoldiq: 273,
    xarakteristikalar: {
      "Brend": "Emerald (XITOY)",
      "Mahsulot kodi": "9686",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000009686",
      "Omborda mavjud": "273 dona"
    },
    filiallar: ["fl-08","fl-11","fl-12","fl-14","fl-15","fl-19","fl-21","fl-23","fl-24","fl-26","fl-27","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12601",
    nomi: "1010-4 Sakura  Plastic Lunch Box New Design 1L",
    kategoriya: "boshqa-texnika",
    narx: 30000,
    qisqaTavsif: "Sakura ishlab chiqargan mahsulot. Kod: 12601.",
    rasm: "rasmlar/mahsulotlar/12601.webp",
    brend: "Sakura",
    kod: "12601",
    qoldiq: 246,
    xarakteristikalar: {
      "Brend": "Sakura",
      "Mahsulot kodi": "12601",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000012601",
      "Omborda mavjud": "246 dona"
    },
    filiallar: ["fl-07","fl-20","fl-23","fl-25","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-156743",
    nomi: "SF-988 SOFANER Blender Xitoy (chiroqli)",
    kategoriya: "boshqa-texnika",
    narx: 165000,
    qisqaTavsif: "Mahsulot kodi: 156743. Batafsil ma'lumot uchun filialga murojaat qiling.",
    rasm: "rasmlar/mahsulotlar/156743.webp",
    brend: "",
    kod: "156743",
    qoldiq: 237,
    xarakteristikalar: {
      "Brend": "Noma'lum",
      "Mahsulot kodi": "156743",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000015643",
      "Omborda mavjud": "237 dona"
    },
    filiallar: ["fl-12","fl-16","fl-17","fl-19","fl-20","fl-22","fl-23","fl-24","fl-25","fl-28","fl-31","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001464",
    nomi: "WJ7501 Termos 2L (yaltiroq) 1kor/15dona",
    kategoriya: "boshqa-texnika",
    narx: 70000,
    qisqaTavsif: "Sakura ishlab chiqargan mahsulot. Kod: 1001464.",
    rasm: "rasmlar/mahsulotlar/1001464.webp",
    brend: "Sakura",
    kod: "1001464",
    qoldiq: 228,
    xarakteristikalar: {
      "Brend": "Sakura",
      "Mahsulot kodi": "1001464",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000001001464",
      "Omborda mavjud": "228 dona"
    },
    filiallar: ["fl-07","fl-11","fl-18","fl-19","fl-21","fl-23","fl-25","fl-26","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-12120",
    nomi: "B-100 BUENO Pichoq Nabor 7pcs",
    kategoriya: "boshqa-texnika",
    narx: 145000,
    qisqaTavsif: "Bueno ishlab chiqargan mahsulot. Kod: 12120.",
    rasm: "rasmlar/mahsulotlar/12120.webp",
    brend: "Bueno",
    kod: "12120",
    qoldiq: 224,
    xarakteristikalar: {
      "Brend": "Bueno",
      "Mahsulot kodi": "12120",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "4401238701008",
      "Omborda mavjud": "224 dona"
    },
    filiallar: ["fl-07","fl-09","fl-10","fl-11","fl-12","fl-15","fl-17","fl-18","fl-19","fl-21","fl-22","fl-23","fl-24","fl-25","fl-26","fl-27","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1150",
    nomi: "BS-988 Bosch Blender Xitoy (original/Lampa)",
    kategoriya: "boshqa-texnika",
    narx: 165000,
    qisqaTavsif: "BOSCH (XITOY) ishlab chiqargan mahsulot. Kod: 1150.",
    rasm: "rasmlar/mahsulotlar/1150.webp",
    brend: "BOSCH (XITOY)",
    kod: "1150",
    qoldiq: 220,
    xarakteristikalar: {
      "Brend": "BOSCH (XITOY)",
      "Mahsulot kodi": "1150",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000001150",
      "Omborda mavjud": "220 dona"
    },
    filiallar: ["fl-07","fl-08","fl-10","fl-11","fl-12","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-28","fl-29","fl-31","fl-32","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1082",
    nomi: "BS-889 Bosch Chopper Temir bak (3-skorost/3.8L /4800W) 6965666920212",
    kategoriya: "boshqa-texnika",
    narx: 69000,
    qisqaTavsif: "BOSCH (XITOY) ishlab chiqargan mahsulot. Kod: 1082.",
    rasm: "rasmlar/mahsulotlar/1082.webp",
    brend: "BOSCH (XITOY)",
    kod: "1082",
    qoldiq: 216,
    xarakteristikalar: {
      "Brend": "BOSCH (XITOY)",
      "Mahsulot kodi": "1082",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000000001082",
      "Omborda mavjud": "216 dona"
    },
    filiallar: ["fl-08","fl-10","fl-11","fl-12","fl-13","fl-14","fl-15","fl-16","fl-17","fl-18","fl-20","fl-21","fl-22","fl-23","fl-24","fl-26","fl-27","fl-29","fl-33"],
    mavjud: true
  },
  {
    id: "ar-1001958",
    nomi: "635-633 Sakura Termos+krushka nabor 5pcs 1kor/32pochka",
    kategoriya: "boshqa-texnika",
    narx: 80000,
    qisqaTavsif: "Mahsulot kodi: 1001958. Batafsil ma'lumot uchun filialga murojaat qiling.",
    rasm: "rasmlar/mahsulotlar/1001958.webp",
    brend: "",
    kod: "1001958",
    qoldiq: 208,
    xarakteristikalar: {
      "Brend": "Noma'lum",
      "Mahsulot kodi": "1001958",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000001001958",
      "Omborda mavjud": "208 dona"
    },
    filiallar: ["fl-09","fl-10","fl-11","fl-15","fl-18","fl-19","fl-20","fl-21","fl-22","fl-23","fl-24","fl-25","fl-29","fl-31","fl-32"],
    mavjud: true
  },
  {
    id: "ar-1001664",
    nomi: "Foot Massage Albus Oyoq Massajori (Qizil)",
    kategoriya: "boshqa-texnika",
    narx: 899000,
    qisqaTavsif: "Albus ishlab chiqargan mahsulot. Kod: 1001664.",
    rasm: "rasmlar/mahsulotlar/1001664.webp",
    brend: "Albus",
    kod: "1001664",
    qoldiq: 208,
    xarakteristikalar: {
      "Brend": "Albus",
      "Mahsulot kodi": "1001664",
      "Kategoriya": "Boshqa maishiy texnika",
      "Shtrix-kod": "10000001001664",
      "Omborda mavjud": "208 dona"
    },
    filiallar: ["fl-22","fl-23","fl-24","fl-28","fl-32","fl-33"],
    mavjud: true
  }
];

const MAHSULOTLAR_QOLDA = [
  {
    id: "mt-001",
    nomi: "Samsung 43\" Smart TV",
    kategoriya: "televizor",
    narx: 3200000,
    qisqaTavsif: "43 dyumli, Smart TV, Wi-Fi bilan",
    rasm: "rasmlar/mahsulotlar/1701.webp",
    xarakteristikalar: {
      "Diagonal": "43 dyum",
      "Ekran turi": "LED",
      "Ruxsat etilganlik": "Full HD (1920x1080)",
      "Quvvati": "60 W",
      "Rangi": "Qora",
      "Kafolat muddati": "12 oy",
      "Ishlab chiqaruvchi": "Samsung"
    },
    filiallar: ["fl-25", "fl-07"],
    mavjud: true
  },
  {
    id: "mt-002",
    nomi: "LG 55\" 4K Smart TV",
    kategoriya: "televizor",
    narx: 5800000,
    qisqaTavsif: "55 dyumli, 4K aniqlik, ovozli boshqaruv",
    rasm: "rasmlar/mahsulotlar/7732.webp",
    xarakteristikalar: {
      "Diagonal": "55 dyum",
      "Ekran turi": "LED",
      "Ruxsat etilganlik": "4K Ultra HD (3840x2160)",
      "Quvvati": "90 W",
      "Rangi": "Qora",
      "Kafolat muddati": "24 oy",
      "Ishlab chiqaruvchi": "LG"
    },
    filiallar: ["fl-25", "fl-07", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-003",
    nomi: "Artel Muzlatgich 2 kamerali",
    kategoriya: "muzlatgich",
    narx: 4100000,
    qisqaTavsif: "2 kamerali, No Frost tizimisiz, sig'imi 260 litr",
    rasm: "rasmlar/mahsulotlar/1212609.webp",
    xarakteristikalar: {
      "Sig'imi": "260 litr",
      "Kameralar soni": "2 ta",
      "Muzlatish tizimi": "Oddiy (Direct Cool)",
      "Balandligi": "170 sm",
      "Rangi": "Oq",
      "Kafolat muddati": "12 oy",
      "Ishlab chiqaruvchi": "Artel"
    },
    filiallar: ["fl-25", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-004",
    nomi: "Samsung Muzlatgich No Frost",
    kategoriya: "muzlatgich",
    narx: 6700000,
    qisqaTavsif: "No Frost tizimi, sig'imi 350 litr, energiya tejamkor",
    rasm: "rasmlar/mahsulotlar/13397.webp",
    xarakteristikalar: {
      "Sig'imi": "350 litr",
      "Kameralar soni": "2 ta",
      "Muzlatish tizimi": "No Frost",
      "Energiya sinfi": "A++",
      "Rangi": "Kumush",
      "Kafolat muddati": "24 oy",
      "Ishlab chiqaruvchi": "Samsung"
    },
    filiallar: ["fl-25", "fl-07"],
    mavjud: true
  },
  {
    id: "mt-005",
    nomi: "LG Kir yuvish mashinasi 7 kg",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 3950000,
    qisqaTavsif: "Oldindan yuklanadigan, 7 kg sig'im, 1200 aylanish",
    rasm: "rasmlar/mahsulotlar/13110.webp",
    xarakteristikalar: {
      "Yuklash turi": "Oldindan yuklash",
      "Sig'imi": "7 kg",
      "Aylanish tezligi": "1200 aylanma/daqiqa",
      "Dasturlar soni": "14 ta",
      "Rangi": "Oq",
      "Kafolat muddati": "24 oy",
      "Ishlab chiqaruvchi": "LG"
    },
    filiallar: ["fl-07", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-006",
    nomi: "Artel Kir yuvish mashinasi 6 kg",
    kategoriya: "kir-yuvish-mashinasi",
    narx: 2850000,
    qisqaTavsif: "Yuqoridan yuklanadigan, 6 kg sig'im, ixcham o'lcham",
    rasm: "rasmlar/mahsulotlar/2289.webp",
    xarakteristikalar: {
      "Yuklash turi": "Yuqoridan yuklash",
      "Sig'imi": "6 kg",
      "Aylanish tezligi": "800 aylanma/daqiqa",
      "Dasturlar soni": "8 ta",
      "Rangi": "Oq",
      "Kafolat muddati": "12 oy",
      "Ishlab chiqaruvchi": "Artel"
    },
    filiallar: ["fl-25", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-007",
    nomi: "Samsung Galaxy A15",
    kategoriya: "telefon",
    narx: 2300000,
    qisqaTavsif: "6.5 dyumli ekran, 128 GB xotira, uch kamerali",
    rasm: "rasmlar/mahsulotlar/mt-007.jpg",
    xarakteristikalar: {
      "Ekran diagonali": "6.5 dyum",
      "Ichki xotira": "128 GB",
      "Operativ xotira (RAM)": "4 GB",
      "Kamera": "50 MP + 5 MP + 2 MP",
      "Batareya": "5000 mAh",
      "Rangi": "Ko'k",
      "Kafolat muddati": "12 oy"
    },
    filiallar: ["fl-25", "fl-07", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-008",
    nomi: "iPhone 13",
    kategoriya: "telefon",
    narx: 9500000,
    qisqaTavsif: "6.1 dyumli Super Retina XDR ekran, 128 GB xotira",
    rasm: "rasmlar/mahsulotlar/mt-008.jpg",
    xarakteristikalar: {
      "Ekran diagonali": "6.1 dyum",
      "Ichki xotira": "128 GB",
      "Operativ xotira (RAM)": "4 GB",
      "Kamera": "12 MP + 12 MP",
      "Batareya": "3240 mAh",
      "Rangi": "Yarim tungi (Midnight)",
      "Kafolat muddati": "12 oy"
    },
    filiallar: ["fl-07"],
    mavjud: false
  },
  {
    id: "mt-009",
    nomi: "Artel Konditsioner 1.5 tonna",
    kategoriya: "konditsioner",
    narx: 3400000,
    qisqaTavsif: "Split tizim, 1.5 tonna quvvat, sovutish va isitish",
    rasm: "rasmlar/mahsulotlar/2059.webp",
    xarakteristikalar: {
      "Quvvati": "1.5 tonna (18000 BTU)",
      "Turi": "Split tizim",
      "Rejimlar": "Sovutish / Isitish",
      "Shovqin darajasi": "38 dB",
      "Rangi": "Oq",
      "Kafolat muddati": "24 oy",
      "Ishlab chiqaruvchi": "Artel"
    },
    filiallar: ["fl-25", "fl-07"],
    mavjud: true
  },
  {
    id: "mt-010",
    nomi: "Cooper&Hunter Konditsioner Inverter",
    kategoriya: "konditsioner",
    narx: 5200000,
    qisqaTavsif: "Inverter texnologiyasi, energiya tejamkor, past shovqin",
    rasm: "rasmlar/mahsulotlar/1358.webp",
    xarakteristikalar: {
      "Quvvati": "1.5 tonna (18000 BTU)",
      "Turi": "Split tizim, Inverter",
      "Rejimlar": "Sovutish / Isitish / Quritish",
      "Shovqin darajasi": "26 dB",
      "Energiya sinfi": "A++",
      "Kafolat muddati": "36 oy",
      "Ishlab chiqaruvchi": "Cooper&Hunter"
    },
    filiallar: ["fl-07", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-011",
    nomi: "LG Mikroto'lqinli pech 23 litr",
    kategoriya: "mikrotolqinli-pech",
    narx: 1450000,
    qisqaTavsif: "23 litr sig'im, grilsiz, 8 ta tayyor dastur",
    rasm: "rasmlar/mahsulotlar/8823.webp",
    xarakteristikalar: {
      "Sig'imi": "23 litr",
      "Quvvati": "800 W",
      "Boshqaruv": "Elektron",
      "Gril funksiyasi": "Yo'q",
      "Rangi": "Kumush",
      "Kafolat muddati": "12 oy",
      "Ishlab chiqaruvchi": "LG"
    },
    filiallar: ["fl-25", "fl-07", "fl-22"],
    mavjud: true
  },
  {
    id: "mt-012",
    nomi: "Samsung Mikroto'lqinli pech Grill",
    kategoriya: "mikrotolqinli-pech",
    narx: 2100000,
    qisqaTavsif: "28 litr sig'im, gril funksiyasi bilan, keramik ichki qism",
    rasm: "rasmlar/mahsulotlar/9016.webp",
    xarakteristikalar: {
      "Sig'imi": "28 litr",
      "Quvvati": "1000 W",
      "Boshqaruv": "Elektron",
      "Gril funksiyasi": "Bor",
      "Rangi": "Qora",
      "Kafolat muddati": "18 oy",
      "Ishlab chiqaruvchi": "Samsung"
    },
    filiallar: ["fl-25", "fl-22"],
    mavjud: true
  }
];

const MAHSULOTLAR = MAHSULOTLAR_AVTOMATIK.concat(MAHSULOTLAR_QOLDA);
