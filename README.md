# Айкідо-Канів (Додзьо "Сакура") — Веб-сайт

Сучасний офіційний веб-сайт додзьо айкідо в місті Канів (вул. Кошового, 2/14).

## 🚀 Стек технологій
- **React 19** + **TypeScript**
- **Vite** (швидка збірка та HMR)
- **Tailwind CSS v4**
- **Lucide Icons**
- Багатомовність (UA / EN)

## 📦 Локальний запуск
```bash
# 1. Встановлення залежностей
npm install

# 2. Запуск локального сервера розробки
npm run dev
```
Сайт відкриється за адресою: `http://localhost:3000` (або `http://localhost:5173`).

## 🛠 Збірка для продакшну
```bash
npm run build
```
Готові статичні файли формуються в папці `dist/`.

## 🌐 Деплой на Cloudflare Pages (Free)
1. Створіть акаунт або увійдіть на [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Перейдіть у розділ **Workers & Pages** -> **Create application** -> **Pages**.
3. Оберіть **Connect to Git** та виберіть цей репозиторій з GitHub.
4. Вкажіть налаштування збірки:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Натисніть **Save and Deploy**. 
*(У папці `public/_redirects` вже налаштовано правило маршрутизації для коректної роботи SPA).*
