# E-Ticaret (Next.js)

Bu repo, Next.js 15, React 19, TypeScript ve Tailwind CSS ile geliştirilen bir e‑ticaret uygulamasının kaynak kodlarını içerir. Durum yönetimi için Redux Toolkit ve `react-redux` kullanılmaktadır.

## Özellikler
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Redux Toolkit ile global state yönetimi
- i18n altyapısı (klasör yapısı hazır)

## Proje Yapısı
```
root
├─ livben/               # Uygulamanın Next.js projesi ve ana yapılandırmalar
│  ├─ next.config.ts
│  ├─ tailwind.config.js
│  ├─ tsconfig.json
│  ├─ eslint.config.mjs
│  └─ package.json       # Next.js çalışma komutları ve bağımlılıklar
├─ src/                  # Uygulama kaynak kodu
│  ├─ admin/
│  ├─ api/
│  ├─ app/
│  ├─ components/
│  ├─ i18n/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ payments/
│  ├─ scripts/
│  ├─ sitemap/
│  ├─ store/
│  ├─ styles/
│  ├─ types/
│  ├─ user/
│  └─ utils/
├─ public/
│  └─ images/
├─ package.json          # Kök düzeyinde minimal bağımlılıklar
├─ package-lock.json
└─ .gitignore
```

Komutlar `livben` dizininde tanımlıdır. Kök klasörden çalıştıracaksanız önce `cd livben` yapın.

## Kurulum
1. Node.js 18+ kurulu olduğundan emin olun.
2. Bağımlılıkları yükleyin:
   ```bash
   cd livben
   npm install
   ```

## Geliştirme
- Geliştirme sunucusunu başlatın:
  ```bash
  cd livben
  npm run dev
  ```
  Varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Build ve Prod
- Üretim için derleme:
  ```bash
  cd livben
  npm run build
  ```
- Üretim sunucusu:
  ```bash
  cd livben
  npm run start
  ```

## Scriptler (livben/package.json)
- `dev`: Next.js geliştirme sunucusu (Turbopack)
- `build`: Next.js üretim derlemesi
- `start`: Üretim sunucusu
- `lint`: ESLint kontrolü

## Ortam Değişkenleri
Aşağıda örnek amaçlı bir şablon verilmiştir. Gerekli anahtarlar proje ihtiyaçlarına göre değişebilir.
```
# .env örneği (livben/ dizininde konumlandırın)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PK=
STRIPE_SECRET_KEY=
DATABASE_URL=
```
`.env` dosyaları Git’e dahil edilmez. Örnekleri `!.env.example` ile paylaşabilirsiniz.

## Stil ve UI
- Tailwind CSS 4 yapılandırması `livben/tailwind.config.js` içindedir. İçerik taraması `./src/**/*.{js,ts,jsx,tsx,mdx}` şeklindedir.

## TypeScript
- `baseUrl` ve alias: `@/* -> ./src/*` (bkz. `livben/tsconfig.json`).

## ESLint
- Next.js TypeScript kuralları etkin (`eslint.config.mjs`).

## Dağıtım
- Vercel önerilir: Next.js projeleri için hızlı dağıtım.
- Alternatif: Docker veya Node.js barındırma sağlayıcıları. Build adımı: `npm run build`, ardından `npm run start`.


