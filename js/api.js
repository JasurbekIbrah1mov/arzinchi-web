// arzonchi-sayt/js/api.js
// CHOK: sahifa serverga FAQAT shu orqali gaplashadi.
// Bitta joyda manzil -> Cloudflare'ga o'tganda faqat API_ASOS o'zgaradi,
// sahifalar o'zgarmaydi (do-kon.js falsafasi).
//
//   DEV (lokal):  ""  -> bir xil manba (dev-server.mjs statik beradi)
//   PROD:         "https://<loyiha>.workers.dev"  (Cloudflare)
const API_ASOS = "";

async function apiSoro(yol, usul, tana) {
  const j = { method: usul || "GET", headers: { "Content-Type": "application/json" }, credentials: "include" };
  if (tana) j.body = JSON.stringify(tana);
  let r, d;
  try { r = await fetch(API_ASOS + yol, j); d = await r.json().catch(() => ({})); }
  catch (e) { return { ok: false, status: 0, xato: "Serverga ulanib bo'lmadi" }; }
  return { ok: r.ok, status: r.status, ...d };
}

window.ArzonchiAPI = {
  smsYubor: (telefon) => apiSoro("/api/kirish/sms-yubor", "POST", { telefon }),
  tasdiqla: (telefon, kod) => apiSoro("/api/kirish/tasdiqla", "POST", { telefon, kod }),
  hisob: () => apiSoro("/api/hisob", "GET"),
  chiqish: () => apiSoro("/api/chiqish", "POST"),
};
