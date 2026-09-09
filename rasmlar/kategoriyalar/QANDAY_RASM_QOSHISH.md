# Kategoriya belgi-rasmlarini qanday qo'shish kerak

Bu papkaga bosh sahifadagi kategoriya kartochkalari (Muzlatgichlar,
Kir yuvish mashinalari va h.k.) uchun **toza belgi-rasmlar** joylashtirasiz.
Bu — mahsulot fotosi emas, kategoriyani bir qarashda tanitadigan
belgi (ikonaga o'xshash, lekin haqiqiy mahsulot surati).

## Qadamlar

1. Kategoriya uchun rasmni shu papkaga nusxalang (`rasmlar/kategoriyalar/`).
2. Fayl nomini kategoriyaning `slug` qiymati bilan bir xil qiling (bu —
   `js/malumotlar-kategoriya.js` faylidagi `KATEGORIYALAR` obyektining
   kaliti). Masalan, `muzlatgich` kategoriyasi uchun fayl nomi
   `muzlatgich.jpg` bo'lsin.
3. `js/malumotlar-qoshimcha.js` faylini oching, oxiridagi
   `KATEGORIYA_RASMLARI` obyektiga shu qatorni qo'shing:

   ```javascript
   var KATEGORIYA_RASMLARI = {
     "muzlatgich": "rasmlar/kategoriyalar/muzlatgich.jpg"
   };
   ```

   ⚠️ Bu qatorni `js/malumotlar-kategoriya.js` fayliga YOZMANG — o'sha
   fayl avtomatik skript tomonidan har yangilashda to'liq qayta yoziladi,
   qo'lda qo'shgan qatoringiz birinchi yangilanishdayoq yo'qoladi.
4. Faylni saqlang va `index.html` sahifasini brauzerda yangilang (F5).

## Rasm shu 7 shartga javob bersin

| # | Shart | Nega |
|---|---|---|
| 1 | Rasmda **matn yo'q** — narx, texnik raqam (masalan "7kg/1200rpm"), brend yozuvi bo'lmasin | Rasm belgi, e'lon emas |
| 2 | **Suv belgisi / sotuvchi logotipi yo'q** | Boshqa do'konning reklamasi bo'lib chiqmasin |
| 3 | **Bitta mahsulot**, markazda, to'liq ko'rinadi | Kategoriyani bir qarashda tanitadi |
| 4 | Foni **oq yoki juda och neytral** | Kartochka foni bilan qo'shilib ketsin |
| 5 | Kamida **600×600px**, kvadrat (1:1) | Retina ekranda xira bo'lmasin |
| 6 | Mahsulot kadrning **~80%** ini egallasin (atrofida biroz havo qolsin) | 8 ta rasm bir xil "og'irlikda" ko'rinadi |
| 7 | Soya/aks etish yo'q yoki juda yengil | Kartochka soyasiz — rasm ham tekis bo'lsin |

## Muhim eslatmalar

- Rasm hajmi juda katta bo'lmasin — sayt sekin ochiladi. Tavsiya:
  kengligi 600–800 piksel, hajmi 300 KB dan kichik.
- Agar rasm fayli topilmasa yoki bironta kategoriya uchun umuman
  yozilmagan bo'lsa, sahifa buzilmaydi: avval mavjud mahsulotlar
  ro'yxatidan o'sha kategoriyaga mos birinchi rasmli mahsulot fotosi
  ishlatiladi, u ham bo'lmasa "Rasm mavjud emas" rasmiy belgisi
  (placeholder) chiqadi.
- Rasm ko'rinishi saytda `object-fit: contain` bilan ko'rsatiladi —
  ya'ni mahsulot **hech qachon kesilmaydi**, atrofida bo'shliq bilan
  to'liq sig'diriladi.
