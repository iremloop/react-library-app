# Kütüphane Staj Projesi

Bu proje, React ve TypeScript kullanılarak geliştirilmiş basit bir kütüphane uygulamasıdır.

Projede kitaplar listelenebilir, yeni kitap eklenebilir, mevcut kitaplar düzenlenebilir ve onay penceresi ile silinebilir. Ayrıca ödünç verilen kitapların bilgilerini gösteren ayrı bir ödünç kayıtları ekranı bulunmaktadır.

## Özellikler

- Kitapları tablo halinde listeleme
- Yeni kitap ekleme
- Kitap düzenleme
- Onay penceresi ile kitap silme
- Ödünç kayıtlarını listeleme
- Türkçe ve İngilizce dil desteği
- Responsive tasarım
- Form doğrulama
- Boş liste durumu
- Ortak ve tekrar kullanılabilir arayüz bileşenleri

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- Material UI
- i18next
- React Hook Form
- Zod
- Day.js
- ESLint

## Proje Mimarisi

Proje feature bazlı bir klasör yapısı kullanmaktadır.

```text
src/
├── app/
│   └── styles/
├── features/
│   └── library/
│       ├── books/
│       │   ├── api/
│       │   ├── model/
│       │   ├── pages/
│       │   └── ui/
│       └── loans/
│           ├── api/
│           ├── model/
│           ├── pages/
│           └── ui/
├── shared/
│   ├── i18n/
│   ├── locales/
│   ├── ui/
│   └── utils/
└── mock/