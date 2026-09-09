# Arzonchi — sayt qo'llanmasi

Bu hujjat sayt egasi uchun yozilgan — dasturchi bo'lish shart emas,
faqat quyidagi qadamlarni bosqichma-bosqich bajaring.

## 1. Sayt nima va nima emas

Bu — **tanishtiruv (vitrina) sayti**. Mijoz saytda mahsulotni ko'radi,
narxini biladi, keyin do'konga keladi yoki telefon qiladi.

Saytda **onlayn sotib olish yo'q** — savat, to'lov, buyurtma tizimi
qasddan qilinmagan.

## 2. Saytni qanday ochish (ko'rish)

### A usul — eng oddiy (internetsiz ham ishlaydi)
1. `arzonchi-sayt` papkasini oching.
2. `index.html` faylini ikki marta bosing (yoki ustiga sichqoncha
   o'ng tugmasini bosib "Ochish" → brauzer nomini tanlang, masalan
   Google Chrome).
3. Sayt to'g'ridan-to'g'ri brauzerda ochiladi. Barcha havolalar,
   rasm o'rinbosarlari va boshqa funksiyalar shu holatda ham ishlaydi.

### B usul — lokal serverda (ixtiyoriy, dasturchilar uchun)
Agar kompyuteringizda Python o'rnatilgan bo'lsa:
```
cd arzonchi-sayt
python -m http.server 8000
```
Keyin brauzerda `http://localhost:8000` manzilini oching.

### C usul — internetga joylash (hosting)
Bu sayt sof HTML/CSS/JS bo'lgani uchun **har qanday statik hosting**da
ishlaydi (server, baza, o'rnatish shart emas). Masalan:
- **GitHub Pages** — `arzonchi-sayt` papkasidagi barcha fayllarni
  GitHub repozitoriyga yuklab, Pages xizmatini yoqing.
- **Netlify / Vercel** — `arzonchi-sayt` papkasini shunchaki drag-and-drop
  qilib yuklash kifoya.
- **Oddiy hosting (cPanel va h.k.)** — `arzonchi-sayt` papkasi ichidagi
  barcha fayl va papkalarni hosting'ning `public_html` (yoki shunga
  o'xshash) papkasiga nusxalang.

Muhim: papka ichidagi tuzilma (`css/`, `js/`, `rasmlar/`, `skriptlar/`)
o'zgarmasdan, xuddi shu holicha ko'chirilishi kerak (`skriptlar/` papkasi
saytning o'zi uchun kerak emas, lekin uni o'chirmang — mahsulotlarni
ommaviy yangilash imkoniyati shu yerda).

## 3. Mahsulotlar qanday yangilanadi/qo'shiladi (ENDI IKKI YO'L BOR)

### 3.1. Ommaviy yangilash — barcha mahsulotlarni bir zumda yangilash (tavsiya etiladi)

Agar narxlar yoki qoldiqlar o'zgargan bo'lsa, yoki katalogni yangi mahsulotlar
bilan to'ldirmoqchi bo'lsangiz — bitta faylni ikki marta bosish kifoya:

1. `arzonchi-sayt` papkasidagi **`Mahsulotlarni-yangilash.bat`** faylini
   ikki marta bosing. (Internet aloqasi kerak.)
2. Qora oyna (konsol) ochiladi, bir necha soniya ichida yangilanish
   yakunlanadi va natija o'zbek tilida chiqadi: nechta mahsulot, nechta
   filial topildi, nima qilish kerakligi (masalan yangi filialning manzilini
   to'ldirish).
3. Oynani yopish uchun istalgan tugmani bosing (`pause` sizga natijani
   o'qib ulgurish imkonini beradi).
4. `index.html` yoki `katalog.html` sahifasini brauzerda yangilang (F5) —
   yangi mahsulotlar/narxlar ko'rinadi.

**Bu nima qiladi:** bizning haqiqiy katalogimizdagi (taminot tizimidagi)
mahsulotlar ro'yxatidan rasmi bor va omborda mavjud bo'lganlarini tanlab,
`js/malumotlar-mahsulot.js` va `js/malumotlar-filial.js` fayllarini
avtomatik yangilaydi. **Siz qo'lda qo'shgan mahsulot/filiallarga hech qachon
tegilmaydi** — ular alohida saqlanadi va har doim saqlanib qoladi.

**Agar xatolik chiqsa** (masalan internet yo'q): tushunarli xabar chiqadi
va sayt fayllariga hech narsa yozilmaydi — sayt avvalgi holatida ishlashda
davom etadi. Birozdan keyin qayta urinib ko'ring.

Batafsil (texnik tafsilotlar): `skriptlar/OQI-MENI.md`.

### 3.2. Yakka mahsulot qo'lda qo'shish yoki tahrirlash (eski usul, hali ishlaydi)

Agar bitta mahsulotni maxsus qo'shmoqchi yoki tavsifini boshqacha
yozmoqchi bo'lsangiz:

1. `js/malumotlar-mahsulot.js` faylini matn muharriri bilan oching
   (masalan, Notepad yoki Notepad++; Word ISHLATMANG — u qo'shtirnoqni
   buzib qo'yishi mumkin).
2. Faylni pastga qarab suring — u yerda **`MAHSULOTLAR_QOLDA`** deb
   nomlangan ro'yxat bor. Faylning boshida batafsil izoh va namuna bor —
   o'sha namunadan nusxa olib, shu ro'yxat oxiriga qo'shing.
3. Har bir mahsulotning `id` maydoni BOSHQA-BOSHQA bo'lishi shart
   (masalan, `mt-013`, `mt-014`, ...).
4. Faylni saqlang (`Saqlash` / `Save`, kodировкаси UTF-8 bo'lsin) va
   `index.html` yoki `katalog.html` sahifasini brauzerda yangilang
   (F5 tugmasi).

**Diqqat:** `MAHSULOTLAR_QOLDA` ro'yxatiga yozgan hamma narsa — istalgancha
"Mahsulotlarni-yangilash.bat" ni ishga tushirsangiz ham — hech qachon
o'chirilmaydi yoki o'zgartirilmaydi. Faqat `MAHSULOTLAR_AVTOMATIK`
(fayl boshida) ommaviy yangilashda to'liq qayta yoziladi, shuning uchun u
yerni qo'lda tahrirlamang — o'zgarishingiz keyingi yangilashda yo'qoladi.

**Eslatma:** agar avtomatik qo'shilgan mahsulotning (masalan `ar-8351`)
faqat bitta maydonini (masalan tavsifini) boshqacha yozmoqchi bo'lsangiz —
uni `MAHSULOTLAR_AVTOMATIK`dan `MAHSULOTLAR_QOLDA`ga ko'chirib, `id`sini
o'zgartiring (masalan `mt-020`); shundan keyin ommaviy yangilash uni
endi tegmaydi (chunki u endi API kodiga emas, sizning `id`ingizga bog'liq).

**Eng ko'p uchraydigan xatolar** (shu bitta xato butun saytni ishlamay
qo'yishi mumkin, shuning uchun diqqat bilan tekshiring):
- Vergul yoki tirnoqni unutib qoldirish.
- Ikki xil qo'shtirnoq (" ") o'rniga qiya qo'shtirnoq (" ") qo'yish —
  Word yoki boshqa dastur bilan matn ko'chirib olsangiz shu xato
  ko'p chiqadi. Faqat oddiy qo'shtirnoq (") ishlating.
- Bir xil "id" qiymatini ikki marta ishlatish.
- Narxni tirnoq ICHIDA yozish ("3200000" emas, balki 3200000 —
  tirnoqsiz, son sifatida yozilishi kerak).

## 4. Yangi filial qanday qo'shiladi

Filiallar ham xuddi mahsulotlar kabi ikki xil bo'ladi:

- **Avtomatik** (`FILIALLAR_AVTOMATIK`, `js/malumotlar-filial.js` boshida) —
  "Mahsulotlarni-yangilash.bat" ishga tushirilganda haqiqiy katalog
  ma'lumotidagi telefon raqamli omborlar asosida avtomatik qo'shiladi.
  Bunday filialning nomi/telefoni avtomatik, lekin **manzil va ish
  vaqtini siz to'ldirishingiz kerak** — fayl ichida "TOLDIRING: manzil"
  va "TOLDIRING: ish vaqti" deb belgilangan joylarni qidiring, haqiqiy
  qiymat bilan almashtiring va saqlang. Keyingi ommaviy yangilashda
  siz yozgan qiymat **saqlanib qoladi** (o'chirilmaydi).
- **Qo'lda** (`FILIALLAR_QOLDA`, fayl oxirida) — butunlay o'zingiz
  qo'shgan filiallar. Xuddi mahsulotdagi kabi, shu blokka skript
  hech qachon tegmaydi.

Yangi qo'lda filial qo'shish uchun `FILIALLAR_QOLDA` ro'yxatiga fayl
boshidagi namunadan nusxa olib qo'shing, `id`ni boshqa filiallarda
ishlatilmagan qiymat qiling (masalan `fl-30`).

Google Maps xaritasini olish uchun:
1. [Google Maps](https://maps.google.com) saytida do'kon manzilini toping.
2. "Ulashish" (Share) tugmasini bosing.
3. "Xaritani joylashtirish" (Embed a map) bo'limini tanlang.
4. Ko'rsatilgan HTML kodidan faqat `src="..."` ichidagi havolani
   nusxalab, `xaritaEmbed` maydoniga qo'ying.

## 5. Rasm qanday qo'shiladi

- Mahsulot rasmlari: `rasmlar/mahsulotlar/` papkasi (batafsil
  qo'llanma shu papka ichidagi `QANDAY_RASM_QOSHISH.md` faylida). Ommaviy
  yangilash bilan qo'shilgan mahsulotlarda rasm internet manzili (URL)
  ko'rinishida avtomatik keladi — bu papkaga rasm qo'yish shart emas.
- Filial rasmlari: `rasmlar/filiallar/` papkasi (batafsil qo'llanma
  shu papka ichidagi `QANDAY_RASM_QOSHISH.md` faylida).

Agar rasm hali tayyor bo'lmasa yoki yuklanmasa (internet yo'q), tashvishlanmang
— sayt "Rasm mavjud emas" degan chiroyli belgi bilan ishlashda davom etadi,
hech narsa buzilmaydi.

## 6. Fayllar nimaga javob beradi (qisqacha)

| Fayl / papka | Vazifasi |
|---|---|
| `index.html` | Bosh sahifa |
| `katalog.html` | Barcha mahsulotlar, qidiruv va filtr |
| `mahsulot.html` | Bitta mahsulotning to'liq sahifasi (barcha mahsulotlar shu bitta shablondan foydalanadi) |
| `filiallar.html` | Filiallar ro'yxati va xaritalari |
| `biz-haqimizda.html` | Kompaniya haqida matn |
| `aloqa.html` | Telefon, email, ijtimoiy tarmoqlar |
| `css/style.css` | Saytning barcha ko'rinishi (ranglar, shriftlar, joylashuv) |
| `js/malumotlar-mahsulot.js` | **Mahsulotlar ro'yxati** — avtomatik + qo'lda blok |
| `js/malumotlar-filial.js` | **Filiallar ro'yxati** — avtomatik + qo'lda blok |
| `js/malumotlar-kategoriya.js` | Kategoriya kodlari va o'zbekcha nomlari (to'liq avtomatik, tegishmang) |
| `js/umumiy.js` | Barcha sahifalar uchun umumiy dasturiy mantiq (tegishmasin) |
| `js/bosh-sahifa.js`, `js/katalog.js`, `js/mahsulot.js` | Har bir sahifaning o'ziga xos mantiqi (tegishmasin) |
| `rasmlar/` | Qo'lda qo'shilgan rasmlar shu yerda saqlanadi |
| `Mahsulotlarni-yangilash.bat` | **Shu faylni ikki marta bosing — katalogni bir zumda yangilaydi** |
| `skriptlar/` | Yangilash skripti va uning sozlamalari (batafsil: `skriptlar/OQI-MENI.md`). Sayt bu papkaga bog'liq emas, shuning uchun o'chirmasangiz kifoya. |

**Sizga tegishli bo'lgan yagona narsalar** — `Mahsulotlarni-yangilash.bat`
(ommaviy yangilash uchun) va `js/malumotlar-mahsulot.js` /
`js/malumotlar-filial.js` ichidagi `_QOLDA` bloklar (qo'lda qo'shish/tahrir
uchun). Qolgan fayllarni o'zgartirish shart emas (agar dizaynni
o'zgartirmoqchi bo'lmasangiz).

## 7. Nimadir ishlamay qolsa

- Sahifa bo'sh yoki xato ko'rsatsa — oxirgi tahrirlagan
  `js/malumotlar-mahsulot.js` yoki `js/malumotlar-filial.js`
  faylidagi vergul/tirnoqlarni tekshiring (faqat `_QOLDA` blokdagi
  o'zgarishlaringizni — `_AVTOMATIK` blok skript tomonidan yoziladi,
  odatda xato bo'lmaydi).
- Ishonchli usul: qo'lda o'zgartirishdan oldin faylning nusxasini boshqa
  joyga saqlab qo'ying — muammo chiqsa, eski nusxaga qaytarish oson
  bo'ladi. (Ommaviy yangilash — `Mahsulotlarni-yangilash.bat` — buni
  o'zi ham avtomatik qiladi: eski fayllar har doim `skriptlar/zaxira/`
  papkasiga saqlanadi.)
- Brauzerda "F12" tugmasini bosib "Console" bo'limini ochsangiz,
  qizil rangdagi xato xabarini ko'rishingiz mumkin — bu xabarni
  dasturchiga ko'rsatsangiz, muammoni tezroq topadi.
- "Mahsulotlarni-yangilash.bat" xato bersa — konsolda chiqqan
  o'zbekcha xabarni o'qing (masalan internet yo'qligi haqida bo'lishi
  mumkin) va birozdan keyin qayta urinib ko'ring; sayt fayllariga
  hech narsa yozilmagani uchun sayt buzilmaydi.

---

## Bog'liq hujjatlar

[[ARXITEKTURA|ARXITEKTURA — sayt arxitekturasi]] · [[DIZAYN|DIZAYN — dizayn tizimi]] · [[agent-tizimi/arzonchi-sayt/skriptlar/OQI-MENI|Skriptlar qo'llanmasi]] · [[agent-tizimi/arzonchi-sayt/rasmlar/mahsulotlar/QANDAY_RASM_QOSHISH|Mahsulot rasmi qo'shish]] · [[agent-tizimi/arzonchi-sayt/rasmlar/filiallar/QANDAY_RASM_QOSHISH|Filial rasmi qo'shish]]
