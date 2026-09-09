# Filial rasmlarini qanday qo'shish kerak

Bu papkaga filiallarning (do'kon binosi, peshtaxta va h.k.) rasmlarini
joylashtirasiz.

## Qadamlar

1. Filial rasmini shu papkaga nusxalang (`rasmlar/filiallar/`).
2. Fayl nomini filialning `id` qiymati bilan bir xil qiling. Masalan,
   `fl-01` degan filial uchun fayl nomi `fl-01.jpg` bo'lsin.
3. `js/malumotlar-filial.js` faylini oching va shu filialning `rasm`
   qatorini rasm faylining nomiga mos qilib yozing, masalan:

   ```javascript
   rasm: "rasmlar/filiallar/fl-01.jpg",
   ```

4. Faylni saqlang va `filiallar.html` sahifasini brauzerda yangilang.

## Muhim eslatmalar

- Rasm nisbati 16:9 ga yaqin bo'lsa, chiroyli ko'rinadi (masalan,
  1200x675 piksel).
- Agar rasm fayli topilmasa yoki `rasm` qatori bo'sh qoldirilsa,
  "Rasm mavjud emas" belgisi avtomatik chiqadi — hech narsa
  buzilmaydi.
- Rasm hajmi 300 KB dan oshmasligi tavsiya etiladi.
