# Ikonkalar kutubxonasi — qanday ishlatiladi

Bu papkada saytning barcha ikonkalari (25 ta yangi maketda ishlatilgan
198 ta noyob Material Symbols nomi) alohida `.svg` fayl sifatida
saqlangan. **Google Fonts / Material Symbols shrift hech qayerda
ulanmaydi** — ilova internetsiz ham ishlashi kerak (T0.5 qarori).

> 15.09 yangilanishi: `inbox` va `route` qo'shildi (faqat
> `maketlar-yangi/mobil/13-kuryer-buyurtmalar-royxati.html` da
> ishlatiladi — inventarizatsiyadan keyin chizilgan maket edi).

Har bir fayl:
- `viewBox="0 0 24 24"` — Material Symbols o'lchamiga mos;
- `fill="none" stroke="currentColor"` — rang sahifadagi matn rangidan
  keladi (ba'zi kichik nuqta/belgilarda `fill="currentColor"` bor —
  ular ham xuddi shu qoidaga bo'ysunadi);
- `id`, `<title>`, kommentariyasiz — bitta sahifada bir nechta marta
  ishlatilganda `id` to'qnashuvi bo'lmaydi;
- soddalashtirilgan yo'llar — o'rtacha fayl hajmi ~290 bayt.

## 1. HTML ga qanday qo'yiladi (asosiy usul — saytdagi mavjud naqsh)

Sayt hozir barcha ikonkalarni **inline SVG** qilib to'g'ridan-to'g'ri
HTML/JS ichiga yozadi (masalan `index.html`dagi qidiruv, savat,
hamburger ikonkalari — `grep '<svg' arzonchi-sayt/index.html` bilan
ko'rish mumkin). Yangi kutubxonadagi ikonkalar ham **shu naqshni davom
ettiradi**: kerakli faylni oching, ichidagi `<svg ...>...</svg>` blokini
to'liq nusxalab, HTML ichiga joylashtiring:

```html
<!-- rasmlar/ikonkalar/search.svg dan nusxalandi -->
<button type="button" class="qidiruv-tugma" aria-label="Qidirish">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
  </svg>
</button>
```

Eslatma: fayldagi `xmlns="..."` atributini ko'chirish shart emas (HTML
ichida `<svg>` uni o'zi biladi), lekin qoldirsangiz ham xato bo'lmaydi.

JS orqali qator generatsiya qilinganda (masalan `katalog.js`,
`mahsulot.js`) xuddi shunday — SVG matnini string sifatida qo'shing
(mavjud fayllardagi `ikonka: '<svg ...>...</svg>'` naqshiga qarang).

## 2. Rangi qanday boshqariladi

Ikonka `currentColor` ishlatgani uchun ranggi ota elementning CSS
`color` (yoki bevosita `stroke`) qiymatidan keladi — hech qanday
JS/inline `fill` o'zgartirish shart emas. Saytda ikki xil usul bor,
ikkalasi ham to'g'ri:

```css
/* 1-usul: currentColor orqali (color beriladi) */
.header-telefon svg { color: var(--matn-ikkinchi); }

/* 2-usul: to'g'ridan-to'g'ri stroke beriladi */
.dokon-ikonka svg { stroke: var(--matn-asosiy-rang); }
```

**CSS `style.css`ga hozircha tegilmadi** (T0 ustida boshqa dasturchi
ishlayapti). Sahifalarga ulash bosqichida quyidagi umumiy klassni
qo'shish tavsiya etiladi (faqat TAKLIF, hali qo'shilmagan):

```css
.ikonka { width: 20px; height: 20px; flex: 0 0 auto; stroke-width: 1.8; }
.ikonka--kichik { width: 16px; height: 16px; }
.ikonka--katta  { width: 28px; height: 28px; }
```

## 3. O'lchami qanday beriladi

Ikonka fayllari o'z ichida `width`/`height` atributiga ega emas —
o'lchamni har doim CSS (yoki HTML `width`/`height`) belgilaydi, xuddi
saytdagi mavjud ikonkalar kabi:

```html
<svg width="18" height="18" viewBox="0 0 24 24" ...>
```

yoki CSS orqali `.qandaydir-klass svg { width: 18px; height: 18px; }`.

## 4. Ko'p joyda takrorlanadigan ikonka (masalan JS ichida)

`js/katalog.js`, `js/mahsulot.js` kabi fayllarda bitta ikonka o'nlab
marta chiqishi mumkin (masalan mahsulot kartochkasida `star`). Bunday
holda SVG matnini bitta o'zgaruvchiga bir marta yozib, keyin qayta
ishlatish tavsiya etiladi (mavjud `qidiruv.js`dagi `IK_LUPA`, `IK_SOAT`
naqshiga qarang):

```js
var IK_STAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6z"/></svg>';
```

## 5. Muqobil usul — CSS `mask-image` (agar fayldan to'g'ridan-to'g'ri foydalanmoqchi bo'lsangiz)

Agar markupni nusxalashni istamasangiz (masalan ko'p joyda bitta
ikonka, HTMLni shishirmaslik uchun), CSS `mask-image` bilan faylni
**rangini saqlagan holda** fon sifatida ulash mumkin — bu ham
internetsiz ishlaydi (fayl saytning o'zida, tashqi so'rov yo'q):

```css
.ikonka-savat {
  width: 20px; height: 20px;
  background-color: var(--matn-asosiy-rang); /* rang shu yerdan */
  -webkit-mask: url("rasmlar/ikonkalar/shopping_cart.svg") center / contain no-repeat;
          mask: url("rasmlar/ikonkalar/shopping_cart.svg") center / contain no-repeat;
}
```

```html
<span class="ikonka-savat" aria-hidden="true"></span>
```

Bu usul faqat bitta rangli (fill/stroke bitta) ikonkalar uchun mos —
kutubxonadagi barcha fayllar shunday, shuning uchun ishlaydi.

## 6. Yangi ikonka qanday qo'shiladi

1. `viewBox="0 0 24 24"` saqlang (Material Symbols o'lchamiga mos
   qolish uchun — eski va yangi ikonkalar bir xil ko'rinadi).
2. Rangni `fill="currentColor"` yoki `stroke="currentColor"` bilan
   bering (hech qachon qattiq rang, masalan `#000` yoki `red`, yozmang).
3. `id`, `<title>`, kommentariya qo'shmang.
4. Faylni `material-symbols` nomi bilan (pastki chiziqli, masalan
   `local_shipping.svg`) shu papkaga saqlang — HTML/CSSda qidirish
   osonroq bo'lishi uchun Material Symbols nomlanishiga qat'iy amal
   qiling.
5. Iloji boricha mavjud ikonkalarning chiziq qalinligi (`stroke-width`,
   taxminan 1.7–2) va uslubiga (kontur, to'ldirilmagan) moslang.

## 7. Nima uchun Material Symbols shrift emas

Barcha 25 yangi maket `fonts.googleapis.com`dan Material Symbols
Outlined shriftini yuklardi (`<link href="https://fonts.googleapis.com/...">`
+ `<span class="material-symbols-outlined">nom</span>`). Bu loyihada
**taqiqlangan** — sabab: (1) nol tashqi bog'liqlik tamoyili, (2) ilova
internetsiz ham ishlashi kerak (shrift yuklanmasa ikonka o'rniga
tushunarsiz belgi chiqadi), (3) variable font 200+ KB, saytning hozirgi
umumiy inline-SVG kutubxonasi esa yarim yuzdan kam. Shu sabab har bir
`material-symbols-outlined">nom</span>` shu papkadagi mos `nom.svg`
bilan almashtiriladi (keyingi bo'limlarda — V1–S8).
