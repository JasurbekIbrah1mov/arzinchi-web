# Mahsulot rasmlarini qanday qo'shish kerak

Bu papkaga mahsulotlarning rasmlarini joylashtirasiz.

## Qadamlar

1. Mahsulot rasmini shu papkaga nusxalang (`rasmlar/mahsulotlar/`).
2. Fayl nomini mahsulotning `id` qiymati bilan bir xil qiling. Masalan,
   `mt-001` degan mahsulot uchun fayl nomi `mt-001.jpg` bo'lsin.
   (`.jpg`, `.jpeg`, `.png`, `.webp` — barchasi ishlaydi.)
3. `js/malumotlar-mahsulot.js` faylini oching va shu mahsulotning
   `rasm` qatorini rasm faylining nomiga mos qilib yozing, masalan:

   ```javascript
   rasm: "rasmlar/mahsulotlar/mt-001.jpg",
   ```

4. Faylni saqlang va `index.html` yoki `katalog.html` sahifasini
   brauzerda yangilang (F5).

## Muhim eslatmalar

- Rasm hajmi juda katta bo'lmasin — sayt sekin ochiladi. Tavsiya:
  kengligi 800–1000 piksel, hajmi 300 KB dan kichik.
- Agar rasm fayli topilmasa yoki `rasm` qatori bo'sh qoldirilsa,
  sahifada avtomatik ravishda "Rasm mavjud emas" degan rasmiy
  belgi (placeholder) ko'rsatiladi — sayt buzilmaydi, xato
  chiqmaydi. Shuning uchun rasm hali tayyor bo'lmasa ham, saytni
  ishlatishda hech qanday muammo bo'lmaydi.
- Rasm nisbati (proporsiyasi) 4:3 ga yaqin bo'lsa, eng chiroyli
  ko'rinadi (masalan, 800x600 piksel).
