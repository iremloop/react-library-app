# Kütüphane Yönetim Sistemi

React ve TypeScript kullanılarak geliştirilen bu proje; kitap envanterini, kitap detaylarını ve ödünç işlemlerini tek bir arayüz üzerinden yönetmek amacıyla hazırlanmış bir web uygulamasıdır.

Projenin amacı yalnızca kitap ekleme, silme ve güncelleme işlemleri yapmak değil; aynı zamanda gerçek bir kütüphane sisteminde karşılaşılabilecek ödünç verme, teslim alma, gecikme kontrolü ve veri doğrulama gibi durumları düzenli ve geliştirilebilir bir frontend mimarisiyle ele almaktır.

## Öne Çıkan Özellikler

### Kitap yönetimi

* Kitapları kart yapısında listeleme
* Kitap adına veya yazara göre arama
* Yeni kitap ekleme
* Mevcut kitap bilgilerini düzenleme
* Silme işleminden önce kullanıcıdan onay alma
* Kitap kapağı seçme ve önizleme
* Kitap detaylarını görüntüleme
* Kitap türü, yayınevi, dil, ISBN, sayfa sayısı ve yayın yılı bilgilerini yönetme

### Ödünç işlemleri

* Kitap için yeni ödünç kaydı oluşturma
* Aktif ödünç kaydını güncelleme
* Kitabın gerçek teslim tarihini kaydetme
* Aktif ve tamamlanmış ödünç kayıtlarını ayrı tablolarda görüntüleme
* Kitap, yazar veya ödünç alan kişi üzerinden arama
* Geciken aktif kayıtların kaç gün geciktiğini hesaplama
* Teslim edilen kitabın zamanında veya gecikmeli döndüğünü gösterme
* Aynı kitap için birden fazla aktif ödünç kaydı oluşmasını engelleme
* Üç veya daha fazla gecikmeli teslimi bulunan kişiler için uyarı gösterme
* Kitap silindiğinde ilişkili ödünç kayıtlarını da temizleyerek öksüz veri oluşmasını engelleme

### Veri güvenliği ve doğrulama

* Form alanlarında zorunlu alan kontrolleri
* Ödünç ve teslim tarihlerinin doğrulanması
* `localStorage` içinden okunan verilerin kontrol edilmesi
* Bozuk veya beklenmeyen veri durumunda başlangıç verilerine geri dönülmesi
* API verilerinin DTO ve mapper yapısı kullanılarak uygulama modeline dönüştürülmesi
* `snake_case` alanların `camelCase` modele çevrilmesi
* `null` değerlerin uygulamanın kullanabileceği biçime dönüştürülmesi

### Kullanıcı deneyimi

* Türkçe ve İngilizce dil desteği
* Responsive kullanıcı arayüzü
* Mobil ve masaüstü ekranlara uyum
* Boş liste durumlarının gösterilmesi
* Arama sonucunun bulunamadığı durumların gösterilmesi
* Silme ve riskli ödünç işlemlerinde onay dialogları
* Verilerin tarayıcıdaki `localStorage` alanında korunması

## Kullanılan Teknolojiler

| Teknoloji               | Kullanım amacı                                     |
| ----------------------- | -------------------------------------------------- |
| React                   | Bileşen tabanlı kullanıcı arayüzü geliştirme       |
| TypeScript              | Tip güvenliği ve sürdürülebilir kod yapısı         |
| Vite                    | Geliştirme sunucusu ve üretim derlemesi            |
| Material UI             | Arayüz bileşenleri, tema ve responsive tasarım     |
| React Hook Form         | Form durumunun ve form alanlarının yönetilmesi     |
| i18next / react-i18next | Türkçe ve İngilizce dil desteği                    |
| Day.js                  | Tarih işlemleri ve tarih karşılaştırmaları         |
| ESLint                  | Kod kalitesi ve mimari kuralların kontrol edilmesi |

## Proje Mimarisi

Proje, özellik bazlı bir klasör yapısıyla organize edilmiştir.

Uygulamanın genel kurulumu `app` katmanında, kitap ve ödünç işlemleri `features` katmanında, birden fazla özellik tarafından kullanılabilecek bileşen ve yardımcı fonksiyonlar ise `shared` katmanında tutulur.

```text
src/
├── app/
│   ├── styles/
│   │   ├── library.css             # Uygulama genelinde kullanılan stiller
│   │   └── theme.ts                # MUI tema ve tasarım ayarları
│   └── App.tsx                     # Composition root ve ana uygulama durumu
│
├── assets/                         # Kitap kapakları ve görsel dosyalar
│
├── features/
│   └── library/
│       ├── books/
│       │   ├── api/
│       │   │   ├── client.ts       # Kitap verisini getirir
│       │   │   ├── mappers.ts      # BookDto verisini Book modeline dönüştürür
│       │   │   └── types.ts        # Ham kitap verisinin DTO tipi
│       │   ├── model/
│       │   │   └── types.ts        # Uygulamanın kullandığı Book modeli
│       │   ├── pages/
│       │   │   └── BooksPage.tsx   # Kitap işlemlerinin yönetildiği sayfa
│       │   └── ui/
│       │       ├── BookCard.tsx
│       │       ├── BookDetailsDialog.tsx
│       │       ├── BookDialog.tsx
│       │       ├── BookForm.tsx
│       │       └── BookList.tsx
│       │
│       └── loans/
│           ├── api/
│           │   ├── client.ts       # Ödünç verisini getirir
│           │   ├── mappers.ts      # LoanDto verisini Loan modeline dönüştürür
│           │   └── types.ts        # Ham ödünç verisinin DTO tipi
│           ├── model/
│           │   └── types.ts        # Uygulamanın kullandığı Loan modeli
│           ├── pages/
│           │   └── LoansPage.tsx   # Ödünç işlemlerinin yönetildiği sayfa
│           └── ui/
│               ├── LoanDialog.tsx
│               └── LoanList.tsx
│
├── mock/
│   ├── books.ts                    # Başlangıç kitap verileri
│   └── loans.ts                    # Başlangıç ödünç verileri
│
├── shared/
│   ├── i18n/                       # i18next kurulumu
│   ├── locales/                    # Türkçe ve İngilizce çeviri dosyaları
│   ├── ui/                         # Ortak ve tekrar kullanılabilir bileşenler
│   │   ├── ConfirmDialog.tsx
│   │   ├── DataTable.tsx
│   │   ├── PageHeader.tsx
│   │   └── TableState.tsx
│   └── utils/                      # Ortak yardımcı fonksiyonlar
│
├── index.css                       # Global CSS sıfırlamaları ve temel stiller
└── main.tsx                        # React uygulamasının başlangıç noktası
```

## Katmanların Sorumlulukları

### `app`

Uygulamanın genel kurulumundan sorumludur.

* Uygulamanın ana state yönetimi
* Kitap ve ödünç verilerinin bir araya getirilmesi
* Sayfalar arasındaki geçişlerin yönetilmesi
* Tema ve uygulama geneli stil ayarları
* Feature’ların uygulamaya bağlanması

`App.tsx`, uygulamanın parçalarının bir araya getirildiği **composition root** dosyasıdır.

### `features`

Uygulamanın iş özelliklerini içerir.

Bu projede iki temel feature bulunur:

* `books`: Kitap yönetimi
* `loans`: Ödünç yönetimi

Her feature kendi API, model, sayfa ve kullanıcı arayüzü dosyalarını içerir.

### `shared`

Belirli bir feature’a ait olmayan ve birden fazla yerde kullanılabilen yapıları içerir.

Örneğin:

* Ortak dialog bileşenleri
* Generic tablo bileşeni
* Sayfa başlığı
* Yükleniyor, boş liste ve hata durumları
* Tarih yardımcı fonksiyonları
* Dil yapılandırması

### `mock`

Gerçek bir backend olmadığı için kullanılan başlangıç verilerini içerir.

Mock veriler önce ilgili feature’ın API katmanı tarafından alınır, ardından mapper fonksiyonlarıyla uygulama modeline dönüştürülür.

## Veri Akışı

Uygulamadaki genel veri akışı şu şekildedir:

```text
Mock veri
   ↓
API client
   ↓
DTO
   ↓
Mapper
   ↓
Uygulama modeli
   ↓
React state
   ↓
Sayfa ve UI bileşenleri
```

Uygulama ilk açıldığında kitap ve ödünç verileri kontrol edilir.

```text
localStorage verisi var mı?
   ├── Evet → Veri doğrulanır ve uygulama state'ine aktarılır
   └── Hayır veya veri bozuk → Mock başlangıç verileri kullanılır
```

Kullanıcının yaptığı ekleme, düzenleme ve silme işlemleri React state üzerinden yönetilir. Güncel veriler `localStorage` içine kaydedildiği için sayfa yenilendiğinde yapılan değişiklikler korunur.

## DTO ve Mapper Yaklaşımı

API veya mock kaynaktan gelen ham veri doğrudan ekran bileşenlerinde kullanılmaz.

Örneğin:

```text
BookDto → toBook() → Book
LoanDto → toLoan() → Loan
```

Bu yaklaşım sayesinde:

* Ham veri ile uygulama modeli birbirinden ayrılır.
* Backend veri formatı değiştiğinde UI bileşenleri daha az etkilenir.
* `snake_case` alanlar tek bir yerde dönüştürülür.
* `null` veya eksik değerler tek bir sınır noktasında normalize edilir.
* Ekran bileşenleri yalnızca uygulamanın temiz modelini kullanır.

## LocalStorage Kullanımı

Uygulamada iki temel anahtar kullanılır:

```text
library-books
library-loans
```

Kitap veya ödünç verileri değiştiğinde güncel state bu alanlara kaydedilir.

`localStorage` güvenilir bir veri kaynağı kabul edilmediği için okunan veriler doğrudan kullanılmaz. Veri beklenen yapıda değilse uygulama hata vermek yerine başlangıç verilerine geri döner.

## Kurulum

Projeyi yerel ortamda çalıştırmak için bilgisayarınızda Node.js ve npm kurulu olmalıdır.

```bash
# Repoyu klonlayın
git clone https://github.com/iremloop/react-library-app.git

# Proje klasörüne geçin
cd react-library-app

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda açarak uygulamayı görüntüleyebilirsiniz.

## Kullanılabilir Komutlar

### Geliştirme sunucusu

```bash
npm run dev
```

Uygulamayı geliştirme modunda çalıştırır.

### Üretim derlemesi

```bash
npm run build
```

TypeScript kontrollerini gerçekleştirir ve projeyi üretim ortamı için derler.

### Kod kalitesi kontrolü

```bash
npm run lint
```

Kaynak kodunu ESLint kurallarına göre kontrol eder.

### Üretim önizlemesi

```bash
npm run preview
```

Oluşturulan üretim derlemesini yerel ortamda önizler.

## Teknik Yaklaşım

Projede özellikle aşağıdaki konulara dikkat edilmiştir:

* Feature-based klasör yapısı
* Katmanların sorumluluklarına göre ayrılması
* Uygulamanın composition root dosyasının `app` katmanında tutulması
* API verisi ile uygulama modelinin ayrılması
* DTO ve mapper kullanımı
* Feature’lar arasında gereksiz bağımlılık oluşmasının engellenmesi
* Tekrar kullanılabilir bileşenlerin `shared` altında tutulması
* Generic `DataTable` bileşeni kullanılması
* Mobil görünümde `data-label` tekniğinin uygulanması
* Form doğrulamalarının merkezi biçimde yönetilmesi
* Çeviri metinlerinin bileşenlerden ayrılması
* Tek tasarım kaynağı olarak MUI temasının kullanılması
* Bozuk `localStorage` verilerine karşı güvenli davranılması
* Kitap ve ödünç kayıtları arasındaki ilişkinin korunması
* ESLint ile mimari import kurallarının denetlenmesi
* Mobil ve masaüstü cihazlarda kullanılabilir bir arayüz oluşturulması

## Geliştirme Fikirleri

Projenin sonraki aşamalarında şu özellikler eklenebilir:

* Kullanıcı girişi ve yetkilendirme
* Gerçek backend API bağlantısı
* Kitap ve ödünç geçmişi yönetimi
* Sayfalama ve sıralama
* Gelişmiş filtreleme
* Dashboard ve istatistik ekranı
* Bildirim sistemi
* Unit ve component testleri
* Kitap kapaklarının harici depolama servisinde tutulması

## Projede Kazanılan Deneyimler

Bu proje geliştirilirken aşağıdaki konularda uygulamalı çalışma yapılmıştır:

* React state yönetimi
* TypeScript ile veri modelleme
* DTO ve mapper yaklaşımı
* Form yönetimi ve doğrulama
* LocalStorage veri güvenliği
* Çoklu dil desteği
* Responsive tasarım
* Tekrar kullanılabilir bileşen geliştirme
* Feature-based frontend mimarisi
* Katmanlar arası bağımlılık yönetimi
* ESLint ve TypeScript ile statik kod kontrolü

## Lisans

Bu proje eğitim ve portföy amacıyla geliştirilmiştir.
