# Kütüphane Yönetim Sistemi

React ve TypeScript ile geliştirilen bu proje; kitap envanterini, kitap detaylarını ve ödünç işlemlerini tek bir arayüz üzerinden yönetmek için hazırlanmış bir web uygulamasıdır.

Projenin temel amacı yalnızca ekleme, silme ve güncelleme işlemleri yapmak değil; gerçek bir kütüphane kullanımında karşılaşılabilecek durumları da ele alan, düzenli ve geliştirilebilir bir frontend yapısı oluşturmaktır. Bu kapsamda aktif ve tamamlanmış ödünç kayıtları ayrılmış, geciken teslimler hesaplanmış ve gecikme geçmişi bulunan kullanıcılar için uyarı mekanizması eklenmiştir.

## Öne Çıkan Özellikler

### Kitap yönetimi

- Kitapları kart yapısında listeleme
- Kitap adı veya yazara göre arama
- Yeni kitap ekleme
- Mevcut kitap bilgilerini düzenleme
- Silme işleminden önce onay alma
- Kitap kapağı seçme ve önizleme
- Kitabın özet, tür, yayınevi, dil, ISBN, sayfa sayısı ve yayın yılı bilgilerini detay ekranında görüntüleme

### Ödünç işlemleri

- Kitap için yeni ödünç kaydı oluşturma
- Aktif ödünç bilgisini güncelleme ve teslim tarihini kaydetme
- Aktif ve teslim edilmiş kayıtları ayrı tablolarda görüntüleme
- Kitap, yazar veya ödünç alan kişi üzerinden arama
- Geciken aktif kayıtların kaç gün geciktiğini hesaplama
- Teslim edilen kitabın zamanında mı, gecikmeli mi döndüğünü gösterme
- Aynı kitap için eş zamanlı ikinci aktif ödünç kaydı oluşmasını engelleme
- Üç veya daha fazla gecikmeli teslimi bulunan kişiler için işlem öncesinde uyarı gösterme

### Kullanıcı deneyimi

- Türkçe ve İngilizce dil desteği
- Responsive arayüz
- Form alanlarında zorunlu alan ve tarih doğrulamaları
- Boş liste ve sonuç bulunamama durumları
- Verilerin tarayıcıdaki `localStorage` alanında korunması

## Kullanılan Teknolojiler

| Teknoloji | Kullanım amacı |
| --- | --- |
| React | Bileşen tabanlı kullanıcı arayüzü geliştirme |
| TypeScript | Tip güvenliği ve daha sürdürülebilir kod yapısı |
| Vite | Geliştirme sunucusu ve üretim derlemesi |
| Material UI | Arayüz bileşenleri ve responsive tasarım |
| i18next / react-i18next | Türkçe ve İngilizce dil desteği |
| Day.js | Tarih işlemleri için yardımcı kütüphane |
| ESLint | Kod kalitesi ve standartlarının kontrolü |

## Proje Yapısı

Proje, özellik bazlı bir klasör yapısıyla organize edilmiştir. Kitap ve ödünç işlemlerinin kendi model, API, sayfa ve arayüz katmanlarına ayrılması; kodun okunmasını ve yeni özelliklerin eklenmesini kolaylaştırır.

```text
src/
├── app/
│   └── styles/                 # Uygulama geneli stil ve tema ayarları
├── assets/                     # Görseller ve kitap kapakları
├── features/
│   └── library/
│       ├── books/
│       │   ├── api/            # Veri erişimi, DTO ve mapper işlemleri
│       │   ├── model/          # Book veri tipi
│       │   ├── pages/          # Kitaplar sayfası
│       │   └── ui/             # Kitap formu, kartı ve dialog bileşenleri
│       └── loans/
│           ├── api/            # Ödünç verisi erişimi ve dönüşümleri
│           ├── model/          # Loan veri tipi
│           ├── pages/          # Ödünç işlemleri sayfası
│           └── ui/             # Ödünç formu ve tablo bileşenleri
├── mock/                       # Başlangıç kitap ve ödünç verileri
├── shared/
│   ├── i18n/                   # i18next yapılandırması
│   ├── locales/                # Türkçe ve İngilizce çeviri dosyaları
│   ├── ui/                     # Tekrar kullanılabilir ortak bileşenler
│   └── utils/                  # Yardımcı fonksiyonlar
├── App.tsx                     # Sayfa geçişleri ve ana uygulama durumu
└── main.tsx                    # Uygulamanın başlangıç noktası
```

## Veri Akışı

Uygulama ilk açıldığında kitap ve ödünç verileri mock dosyalarından alınır. Kullanıcı tarafından yapılan değişiklikler React state'i üzerinden yönetilir ve `localStorage` içine kaydedilir. Böylece sayfa yenilendiğinde eklenen veya güncellenen kayıtlar kaybolmaz.

API klasörlerindeki DTO ve mapper yapısı, arayüz modelini veri kaynağından ayırmak amacıyla kullanılmıştır. Proje ileride gerçek bir backend servisine bağlandığında, arayüz bileşenlerini büyük ölçüde değiştirmeden veri erişim katmanı güncellenebilir.

## Kurulum

Projeyi yerel ortamda çalıştırmak için bilgisayarınızda Node.js ve npm kurulu olmalıdır.

```bash
# Repoyu klonlayın
git clone <repository-url>

# Proje klasörüne geçin
cd react-library-app

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Terminalde gösterilen yerel adresi tarayıcıda açarak uygulamayı görüntüleyebilirsiniz.

## Kullanılabilir Komutlar

```bash
npm run dev
```

Uygulamayı geliştirme modunda çalıştırır.

```bash
npm run build
```

TypeScript kontrollerini gerçekleştirir ve projeyi üretim ortamı için derler.

```bash
npm run lint
```

Kaynak kodu ESLint kurallarına göre kontrol eder.

```bash
npm run preview
```

Üretim derlemesini yerel ortamda önizler.

## Teknik Yaklaşım

Bu projede özellikle aşağıdaki konulara dikkat edilmiştir:

- Sayfa ve bileşen sorumluluklarının birbirinden ayrılması
- Tekrar kullanılan dialog, tablo ve durum bileşenlerinin `shared` altında toplanması
- API verisi ile uygulama modelinin mapper fonksiyonları üzerinden ayrıştırılması
- Form işlemlerinde kullanıcıya anlaşılır hata mesajları verilmesi
- Tarih karşılaştırmalarında hatalı ödünç ve teslim tarihi girişlerinin engellenmesi
- Dil metinlerinin bileşenlerin içine yazılmak yerine çeviri dosyalarında tutulması
- Mobil ve masaüstü ekranlarda kullanılabilir bir arayüz oluşturulması

## Geliştirme Fikirleri

Projenin sonraki aşamalarında aşağıdaki geliştirmeler yapılabilir:

- Kullanıcı girişi ve yetkilendirme
- Kitap ve ödünç kayıtları için silme/geçmiş yönetimi
- Sayfalama, sıralama ve gelişmiş filtreleme
- Dashboard ve istatistik ekranı
- Bildirim sistemi
- Kitap kapağı dosyalarının harici bir depolama servisinde tutulması

## Projede Kazanılan Deneyimler

Bu proje geliştirilirken React state yönetimi, TypeScript ile veri modelleme, form doğrulama, çoklu dil desteği, responsive tasarım ve tekrar kullanılabilir bileşen geliştirme konularında uygulamalı çalışma yapılmıştır. Ayrıca feature-based klasör yapısı ve DTO–mapper yaklaşımı kullanılarak daha düzenli ve genişletilebilir bir frontend mimarisi kurulmuştur.

## Lisans

Bu proje eğitim ve portföy amacıyla geliştirilmiştir.
