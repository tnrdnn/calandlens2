# CalAndLens — Görsel Güncelleme Paketi (v2→v5)
# ================================================
# Bu ZIP'teki 5 dosyayı projenizin üzerine kopyalamanız yeterli.

KURULUM (3 adım):
─────────────────

1. Bu ZIP'i açın
2. İçindeki dosyaları mevcut projenizin aynı yollarına kopyalayın:

   calandlens-visual-patch/
   └── src/
       ├── App.jsx                              → src/App.jsx
       ├── index.css                            → src/index.css
       └── components/Dashboard/
           ├── DailySummary.jsx                 → src/components/Dashboard/DailySummary.jsx
           ├── WeeklyReport.jsx                 → src/components/Dashboard/WeeklyReport.jsx
           └── EatingSpeedCoach.jsx             → src/components/Dashboard/EatingSpeedCoach.jsx

3. npm run dev  (ya da npm run build)

DOKUNULMAYAN DOSYALAR (değiştirmeye gerek yok):
───────────────────────────────────────────────
✓ src/hooks/useLanguage.js          (dil desteği — sağlam)
✓ src/locales/tr|en|es|fr|de.json  (çeviriler — sağlam)
✓ src/hooks/useLocalStorage.js
✓ src/hooks/useMealPhotos.js
✓ src/services/aiService.js
✓ src/services/openFoodFacts.js
✓ src/services/nutritionDB.js
✓ src/components/Analysis/*
✓ src/components/Barcode/*
✓ src/components/Camera/*
✓ src/components/History/*
✓ src/components/Meal/*
✓ src/components/Settings/*
✓ package.json, vite.config.js, tailwind.config.js vb.

NELER DEĞİŞTİ:
──────────────
DailySummary.jsx
  • SVG Dairesel Kalori Çemberi (gradient + inner glow + merkez metin)
  • Makro Kartları (mavi/turuncu/yeşil gradient, glassmorphism shine, progress bar, %)
  • Haftalık Grafik (renkli barlar, trend oku ↑/↓, Türkçe günler)
  • AI Öneri Kartı (derin mor gradient, shadow-lg, shine overlay)
  • Öğün Listesi (daha büyük padding, rounded-xl delete btn)

WeeklyReport.jsx
  • İkon kutucukları (rounded-2xl bg-emerald-50)
  • Stat kartlarında dekoratif emoji
  • shadow-md, font iyileştirmeleri

EatingSpeedCoach.jsx
  • İkon kutusu (rounded-2xl bg-orange-50)
  • shadow-md kart stili

App.jsx
  • Premium Alt Navigasyon: glassmorphism kart (backdrop-blur-xl + rounded-3xl)
  • Kamera butonu: 62×62px lens halkası + emerald glow
  • Aktif sekmeler: bg-emerald-50 zemin + text-emerald-600
  • ⚙️ Ayarlar butonu: SVG dişli ikon + hover:scale-110
  • Geri tuşu davranışı (popstate handler)
  • Dashboard'da Geçmiş + Ayarlar hızlı erişim butonları
  • SettingsPage (dil seçimi, kalori hedefi, veri temizle)
  • Çıkış onay popup'ı

index.css
  • .glass (glassmorphism — backdrop-blur + rgba)
  • .shadow-neuro (soft neumorphism)
  • .glow-emerald (kamera butonu yeşil glow)
  • .ring-pulse (kalori çemberi nefes animasyonu)
  • .animate-fade-in
