# BÖLÜM 1

# # 1
return React'in ekrana çizeceği bir arayüz (JSX) döndürüyorsa .tsx, normal veri döndürüyorsa .ts kullanılır. Bir .ts dosyasının içine JSX yazarsak .ts dosyası bunu anlayamadığı için hata verir. .ts dosyasını .tsx yapabiliriz. O zaman hatalar kaybolur ama bu mantıklı bir kullanım değildir çünkü .ts nin görevi veri döndürmektir içine JSX yazmak saçma olur. Dosya adını hata almamak için .tsx yaptık ama return Jsx döndürmediği için ekranda görünmeyecek. .tsx olması sadece hata almadan içine JSX yazmamıza izin verdi.



# # 2
Vite: projeyi çok hızlı açan ve tarayıcıya gösteren build tool(geliştirme aracı). 
-Npm run dev’de vite proje geliştirileceğini anlar. package.json okunur, vite çalışır,vite.config.ts okunur, main.tsx bulunur, bütün importlar takip edilir, TS+JSX dönüştürülür, localhost açılır dosyalar sürekli izlenir.
-Npm run build’de vite artık geliştirme yapılmayacağını, projenin artık internete yükleneceğini anlar. Vite başlar, tüm dosyaları bulur, TS JSye dönüştürülür, JSX JS ye dönüştürülür, kullanılmayan kodları siler, kodları küçültür, disk klasörünü oluşturur.

Şablon(template): hazır başlangıç paketi. Sıfırdan kod yazmak yerine vite gibi iskelet oluşturan araçlar bana hazır dosyaları verir ve ben o şablon üzerine projemi geliştirmeye başlarım.

Kullanılan komut: npm create vite@latest
Şablon:Vite'ın React+TypeScript şablonu
Şablon bana App.tsx, main.tsx, package.json, vite.config.ts, tsconfig.json, index.html ve temel klasör yapısını hazır olarak verdi.



# # 3
TypeScript strict mode:typescriptin katı kurallar koyarak olası hataları kodu çalıştırmadan önce yakalamamızı sağlayan özelliği. Kod çalışmadan beni uyarır.
True ise bu özellik açık, false ise kapalıdır. Açık olduğunda: Yanlış veri tiplerini algılar,null ve undefined hatalarını önceden gösterir, eksik ve hatalı kod yazıldığında uyarı verir, daha güvenli ve hatasız kod yazmanı sağlar.
Kapalı olduğunda: Hatalar varken kod yine derlenir ama runtimeda hata alma ihtimalimiz artar.

-strictNullChecks: bir değişken null ve undefined değer alıp alamayacağını denetler. Açıksa null ve undefined değerlerini normal bir değer gibi kabul etmez, eğer bir değişkenin bunları almasını istiyorsak açıkça belirtmeliyiz. ** let username: string | null = null;

-noImplicitAny: typescript bir değişkenin veya parametrenin tipi belirtilmezse bazen otomatik olarak any tipi verilir. noimplicitany açık olduğunda istemeden oluşan any tiplerine izin vermez.
Bunlar ts'in en önemli güvenlik kurallarından ikisi. Bu özellikler benim projemde varsayılan olarak açık. Tsconfig.app.json dosyamda yazmıyordu ama typescript 6.0.0 sürümlerinden sonra varsayılan açık olarak geliyor. Yine de bir sonraki projemi yükleyen kişi görsün ve açık olduğunu bilsin diye dosyanın içinde belirtebilirim. Herhangi bir dğeşiklik olmaz.



# # 4
Dependincies, projenin çalışması için gerekli olan tüm kütüphanelerin listelendiği bölüm. npm install, package.json dosyasını okur ordaki paketleri internetten indirir ve node_modules klasörüne indirir.
Bir paketi kodumda import edebilmem için o paketin önce projeye kurulmuş olması gerekir. Yani paket package.json dosyasında kayıtlı olmalı ve node_modules klasöründe bulunmalıdır. Aksi halde typescript veya vite paketi bulamaz ve hata verir.
**Diyelim ki birisi package.json dosyasından satırlardan birini sildi ama node_modules ten silmedi. import package.json'a değil node_modules'e baktığı için package.json da olmayan paketi kullandı. Bu geçici olarak çalışabilir. Ama güvenli değildir. Benim bilgisayarımda çalışır ama bu projeyi githuba yüklediğimde başka biri npm install yaptığında package.json da o paket olmadığı için bilgisayara npm onu kuramaz ve proje çalışmaz.

Transitive dependency, senin doğrudan kurmadığın ama kurduğun başka bir paketin ihtiyaç duyduğu pakettir. Yani sen onu npm install ile kurmazsın. Senin kurduğun paket onu senin yerine kurar.



# # 5 
Local storage: Tarayıcının kullanıcıya ait verileri kalıcı olarak saklamasını sağlayan bir depolama alanıdır. Sayfa yenilense ve tarayıcı kapatılsa bile veriler silinmez. Hızlı erişim için tasarlanmıştır. 5-10 mb alanı depolama vardır. String saklayabilir. Güvenli değildir. Hassas olmayan kullanıcı verileerini saklamak için tasarlanmıştır. Kullanıcı konsoldan bilgileri. görebilir, silebilir, değiştirebilir.

Projeyi ilk açtığımızda kayıtlı veri varsa localStorage'dan çekeriz, yoksa yeni girilen bilgileri localStorage'a kaydederiz.



# # 6
Spaghetti kod: Okuması, anlaşılması, değiştirilmesi zor ve her şeyin birbirine girdiği kod.

Format/stil tutarsızlığıyla doğrudan bir ilişkisi yok. Ama okunurluk bozuldukça ve proje büyüdükçe spaghetti koda yol açabilcek bir nedendir.

Eğer tutarsız yazarsak başka birinin kodumuzu okuması zorlaşır, zaman kaybettirir. Hata ayıklamada;isimlendirme farklıysa(book_name, bookName, title) ilgili kodu bulmak daha uzun sürer. Bu da geliştirme süresini ve bakım maliyetini artırır.






# BÖLÜM 2

# # 1
Çünkü sadece konsola bilgi yazdırır. Aslında hatanın nerde olduğunu o bilgiyle anlayan biziz. Hatayı engellemez. Kullanıcıyı ilgilendiren bir hata veya uyarı, konsola değil arayüze gösterilmelidir. useState ile hata mesajı ekranda gösterilebilir.



# # 2
formDialog,date.ts , welcome.tsx
Ölü kod neden zararlıdır? 
-kodu okumayı zorlaştırır.
-projeyi gereksiz büyütür.
-bakım maileytini arttırır. 



# # 3
"Kullanıcıya görünen metin" sadece ekranda yazı olarak görünen midir? Hayır ekranda yazı olarak görünenler değil uygulamayı kullanırken görebileceği her türlü metindir. 

Ekran okuyucu (screen reader) kullanan biri uygulamanda ne "duyar"? Başlıklar buton yazıları ,form etiketlerı( label), placeholderlar(kitap adı girin yazar adı girin..) ,hata mesajı uyarılar boş durum mesajları, dialog boşlukları.

aria-label nedir? Ekran okuyuculara bir öğenin ne işe yaradığını söyleyen açıklama metnidir.



# # 4
Türkçe kalan bir yer var mı? Ben 2 eksik anahtar + 1 şüpheli buldum.--- şüpheli olan en.json dystopia: dystopian, dystopia olarak düzelttim. (İnşallah odur).
Çeviri dosyasındaki her kelime ekranda görünmediği için ekrandan bulamadım eksik anahtarları.
-küçük bir node.js scripti: En basit en öğreticisi. Bir script yazarız tr.json ve en.json dosyalarını okur tüm anahtarları çıkarır. Eksik olanları listeler:
Missing in en.json: - books.genres.classic - books.genres.mystery gibi.
Script eksik anahtarı bulur, yanlış çeviriyi bulamaz.



# BÖLÜM 3

| Dosya                                             | Ne işe yarıyor                                                          | Katman   | Kim yazdı                    |
| ------------------------------------------------- | ----------------------------------------------------------------------- | -------- | ---------------------------- |
| `main.tsx`                                        | React uygulamasını başlatır, App bileşenini ekrana render eder.         | hiçbiri  | Vite şablonu ben değiştirdim |
| `app/App.tsx`                                     | Uygulamanın composition root'u, sayfaları ve ortak state'i birleştirir. | app      | Vite şablonu ben değiştirdim |
| `app/styles/App.css`                              | App bileşenine ait stiller.                                             | app      | Vite şablonu ben değiştirdim |
| `app/styles/index.css`                            | Global CSS reseti ve temel sayfa stilleri.                              | app      | Vite şablonu ben değiştirdim |
| `app/styles/library.css`                          | Kütüphane uygulamasının genel stilleri.                                 | app      | ben                          |
| `app/styles/theme.ts`                             | MUI tema ayarlarını oluşturur.                                          | app      | ben                          |
| `mock/books.ts`                                   | Sahte kitap verilerini sağlar.                                          | hiçbiri  | ben                          |
| `mock/loans.ts`                                   | Sahte ödünç verilerini sağlar.                                          | hiçbiri  | ben                          |
| `features/library/books/api/client.ts`            | Kitap verisini alır.                                                    | features | ben                          |
| `features/library/books/api/mappers.ts`           | DTO'yu modele dönüştürür.                                               | features | ben                          |
| `features/library/books/api/types.ts`             | Kitap DTO tiplerini tanımlar.                                           | features | ben                          |
| `features/library/books/model/types.ts`           | Book modelini tanımlar.                                                 | features | ben                          |
| `features/library/books/pages/BooksPage.tsx`      | Kitaplar sayfasını yönetir.                                             | features | ben                          |
| `features/library/books/ui/BookCard.tsx`          | Kitap kartını gösterir.                                                 | features | ben                          |
| `features/library/books/ui/BookDetailsDialog.tsx` | Kitap detay penceresini gösterir.                                       | features | ben                          |
| `features/library/books/ui/BookDialog.tsx`        | Kitap ekleme/düzenleme penceresi.                                       | features | ben                          |
| `features/library/books/ui/BookForm.tsx`          | Kitap formunu oluşturur.                                                | features | ben                          |
| `features/library/books/ui/BookList.tsx`          | Kitap listesini gösterir.                                               | features | ben                          |
| `features/library/loans/api/client.ts`            | Ödünç verisini alır.                                                    | features | ben                          |
| `features/library/loans/api/mappers.ts`           | DTO'yu Loan modeline dönüştürür.                                        | features | ben                          |
| `features/library/loans/api/types.ts`             | Loan DTO tiplerini tanımlar.                                            | features | ben                          |
| `features/library/loans/model/types.ts`           | Loan modelini tanımlar.                                                 | features | ben                          |
| `features/library/loans/pages/LoansPage.tsx`      | Ödünç işlemleri sayfasını yönetir.                                      | features | ben                          |
| `features/library/loans/ui/LoanDialog.tsx`        | Ödünç ekleme/düzenleme penceresi.                                       | features | ben                          |
| `features/library/loans/ui/LoanList.tsx`          | Ödünç listesini gösterir.                                               | features | ben                          |
| `shared/ui/ConfirmDialog.tsx`                     | Onay penceresi.                                                         | shared   | ben                          |
| `shared/ui/DataTable.tsx`                         | Tekrar kullanılabilir generic tablo.                                    | shared   | ben                          |
| `shared/ui/PageHeader.tsx`                        | Sayfa başlığını gösterir.                                               | shared   | ben                          |
| `shared/ui/TableState.tsx`                        | Boş/yükleniyor durumlarını gösterir.                                    | shared   | ben                          |

## main.tsx hangi dosyaları import ediyor ve uygulama açılırken neden ilk çalışan dosya o? index.html'in rolü ne?
main.tsx'in import ettiği dosyalar: 
-react:
-react-dom/client: React uygulamasını tarayıcıdakı HTML'e bağlar(createRoot() burda bulunur)
-./App: Ana uygulama bileşenini yükler.
-./indez.css: Vite'ın oluşturduğu ve benim düzenlediğim global CSS dosyası. Tüm uygulamayı etkileyen genel stilleri içerir.
-./app/styles/library.css: Bu projeye özel yazdığın genel stillerş yükler. Kütüphane uygulamasının görünümünü düzenler.
-./shared/i18n: çeviri sistemini başlatır.useTranslation() hook'unun çalışmasını sağlar.

### main.tsx
 Uygulamayı başlatır ve ihtiaç duyulan temel şeyleri hazırlar. Uygulamanın başlangıç ve kurulum dosyasıdır. Burada Uygulama için ortam hazırlanır, asıl iş mantığı ise daha sonra App.tsx ve diğer componentlerde çalışır.
-CSS dosyalarını yükler(index.css, library.css)
-Çeviri sistemini başlatır.
-APP bileşenini yükler.
-React'ı index.html içindeki <div id="root"> elementine bağlayarak uygulamayı ekrana render eder.

### index.html
-react'ın yerleşeceği alanı oluşturur.
-Uygulamanın hangi dosyadan başlayacağını söyler.

### Araştır: proje yönergesinde app katmanı ne için vardı? Bu dosya nereye taşınmalı? Taşıdığında hangi import'lar kırılır ve nasıl düzeltirsin? 
app katmanı içinde
-ana uygulama bileşeni
-sayfaların birleştirilmesi
-uygulama genelinde state yönetimi
-tema provider ayarları
-uygulama genelinde stiller
-hangi sayfanın gösterileceğine karar verilmesi

App.tsx de bu görevleri yaptığı için herhangi bir kitap veya ödünç özelliğine ait değildir, app katmanına aittir.

VS Code'un TypeScript › Update Imports On File Move özelliği açık olduğu için kendi kendine yollar düzeldi. Düzelmeseydi taşıdığımız dosyaların import pathlerini elimizle tek tek düzeltmemiz gerekirdi.


 # BÖLÜM 4

 ## "Bir feature başka bir feature'ı import edemez." Bu kural neden var? İki feature birbirine bağlanırsa, proje büyüdükçe (10 feature, 3 geliştirici) ne olur?

 Amaç bağımlılığı azaltmak. Bu kuralın temelinde single responsibility principle ve Low coupling(düşük bağımlılık) prensipleri var. Bir feature sadece kendi işini bilmeli, diğer feature'ların iç yapısını bilmemelidir.

-Bir değişiklik birçok yeri bozar. Bir dosyanın yeri değiştiğinde import edilen yolların da değişmesi gerekir. Değiştirilmezse hatalar ortaya çıkar.
-Geliştiriciler birbirini beklemek zorunda kalır. Herkesin işi birbirine dokunur bir kişi değişiklik yaptığında diğerlerinin kodu bozulabilir.
-Test etmek zorlaşır.
-Bir feature’ı başka projeye almak istersek yanında başka featureları da taşımak zorunda kalırız

## Loans'un books'tan gerçekte istediği bilgi ne? 
book id
book title
author

##  Yönerge §6.12 bu problemi nasıl çözüyordu? "Denormalize veri" ne demek?

 Loan, başka featuredan import etmek yerine ihtiyacı olan veriyi loan verisinin içinde tutuyor.
 Denormalize veride, hız için aynı bilgi birden fazla yerde tutulur.

 ##  Senin LoanDto'nda (loans/api/types.ts) bu çözüm için ne eksik?

 Benim LoanDto tipimde bookTitle bilgisi eksik. Sadece bookId olduğu için loans, kitap adını öğrenmek için books feature'ına gitmek zorunda kalıyor. LoanDto içine bookTitle eklenirse loans kendi verisiyle çalışır ve feature sınırı ihlal edilmez.

 ## Mock klasörünün feature tipine bağımlılığı

`src/mock` klasörü herhangi bir feature'ın içinde değildir. Uygulama genelinde kullanılan sahte verileri sağlayan veri kaynağı katmanı gibi davranır.
`src/mock/books.ts` dosyasının doğrudan `features/library/books/api/types.ts` dosyasından tip import etmesi, feature dışındaki bir klasörün feature'ın iç klasör yapısını bilmesine neden olur. Bu durumda `books` feature'ının içindeki dosyalar taşınırsa veya API tipleri yeniden düzenlenirse mock katmanı da etkilenir. Proje büyüdükçe mock klasörü birçok feature'ın iç detayına bağlı hale gelebilir.

## Bu kuralı senin dikkatine bırakmak yerine makineye denetletmek mümkün mü? "ESLint no-restricted-imports" araştır. 

Katman ve feature sınırlarını yalnızca geliştiricinin dikkatine bırakmak yerine ESLint'in no-restricted-imports kuralı ile otomatik olarak denetlemek mümkündür.
no-restricted-imports, belirlediğin dosya veya klasörlerden import yapılmasını yasaklayan ESLint kuralıdır. Yani yeni bir paket kurmuyoruz, sadece mevcut ESLint'e yeni bir kural öğretiyoruz.


# BÖLÜM 5

## theme.ts satır 16 → arka plan #f4f6f8. App.css satır 23 ve index.css satır 14 → #f4f6fa. İki değer farklı. Araştır: Uygulamada gerçekte hangisi görünüyor — DevTools ile nasıl anlarsın? "Tek tasarım kaynağı" hangisi olmalı? Kaybeden değer nereye gitmeli?

#f4f6fa görünür. Devtoolsta body ve Appin rengine ve Appin boyutuna bakarız. App ekranın tamamını kapladığı için görünen renk appin rengi yani #f4f6fa. 
Tek tasarım kaynağı bu projede theme.ts olmalı. Çünkü MUI kullanılıyor ve uygulamanın renk paleti burada tanımlanıyor. Kaybeden değer silinmeli. Yani App.css ve index.css içinde tekrar yazılan arka plan renkleri kaldırılmalı, arka plan yalnızca theme.ts içindeki palette.background.default üzerinden yönetilmelidir.

## theme.ts satır 27 → Arial. index.css satır 2 → Inter. Uygulamada gerçekte hangisi görünüyor — DevTools ile nasıl anlarsın? "Tek tasarım kaynağı" hangisi olmalı? Kaybeden değer nereye gitmeli?

Uygulamada theme.ts deki arial,sans-serif görünüyor. DevToolsda font family de hangisi baskın görünüyor. Tek tasarım kaynağı theme.ts. Kaybeden değer silinmeli.

## rgba(37, 99, 235, 0.08)  Araştır: 37, 99, 235 hangi rengin RGB karşılığı? 

#2563eb rengin karşılığı. Sonundaki 0.08 yüzde 8 opak demek. rgba şeffaf hali istenen renkler için.

## Bu neden "sihirli sayı" sayılır ?

Sayının aslında tema içinde anlamlı bir isimle (theme.palette.primary.main) zaten tanımlı olması ve o değeri tekrar etmesinden dolayı sihirli sayı sayılır.


## tema rengi yarın değişirse bu satıra ne olur?

Bir gün theme’de palette.primary.main değişirse loanlist eski maviyi kullanmaya devam eder. Uygulamada tutarsızlık oluşur. Renk değişikliklerine adapte olabilmesi için ve aynı zamanda şeffaflık da katmak istersek renge MUI’nın alpha fonksiyonunu kullanırız. 

import { alpha } from "@mui/material/styles"; 
backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08)

Böylece theme’deki mavi değişirse loanlist de otomatik değişir.

##  MUI'de sx içinden tema paletine nasıl referans verilir?
 
 sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
 
##  Projede tekrar tekrar yazdığın fontWeight: 750 ve textTransform: "none" gibi stiller tema seviyesinde bir kez nasıl tanımlanır? ("MUI theme styleOverrides" araştır.)

  MUI kütüphanesindeki hazır bileşenlerin (buton, kart, metin kutusu vb.) kendine ait standart stilleri vardır. styleOverrides özelliği sayesinde bu standart stilleri tek tek her sayfada değiştirmek yerine, tema dosyası üzerinden bütün uygulamada tek hamlede değiştirebilirsiniz.

  MUI’de aynı stil birçok bileşende tekrar ediyorsa, bu stiller theme.ts içindeki components → MuiButton (veya ilgili bileşen) → styleOverrides altında bir kez tanımlanabilir.

 ##  shared'a bir bileşen yazmak tek başına neden yetmez? "Bir problemin projede tek çözümü olur" ilkesi neden önemli — aynı işin iki çözümü yaşarsa, bir hata düzeltmesi geldiğinde ne olur?

 Çünkü ortak bileşeni oluşturmakla iş bitmez; projenin diğer yerlerinin gerçekten o ortak bileşeni kullanması gerekir. Ortak problem belirlenmeli. Ortak bileşen yazılmalı. Aynı işi yapan eski kodlar kaldırılmalı. Bütün ilgili yerler ortak bileşene geçirilmelidir.

Bir problemin projede tek çözümü olması önemlidir çünkü aynı işi yapan birden fazla kod bulunduğunda bakım zorlaşır. Bir değişiklik veya hata düzeltmesi gerektiğinde bütün çözümlerin tek tek güncellenmesi gerekir. Bunlardan biri unutulursa uygulamada tutarsızlık oluşur. Ortak bir bileşen kullanıldığında ise değişiklik tek noktadan yapılır ve bu değişiklik ilgili tüm ekranlara otomatik olarak yansır.

Aynı işin projede iki farklı çözümü varsa, bir hata düzeltmesi veya yeni özellik eklendiğinde bütün çözümler ayrı ayrı güncellenmelidir. Bunlardan biri unutulursa uygulamanın bazı bölümleri düzelirken bazıları eski haliyle kalır. Bu da bakım maliyetini artırır ve tutarsız davranışlara neden olur.


# BÖLÜM 7

## Silinen kitap library-books içinden silindi mi? 

evet

## library-loans içinde o kitaba ait kayıt(lar) duruyor mu? 

evet

## Ekranda görünüyorlar mı — görünmüyorlarsa onları hangi kod gizliyor (LoanList içinde ara)? 

Görünmüyorlar.
 const book = books.find(
          (currentBook) =>
            currentBook.id === loan.bookId,
        );

        if (!book) {
          return undefined;
        }

        return {
          book,
          loan,
        };
      })
      .filter(
        (
          row,
        ): row is ReturnedLoanRow =>
          row !== undefined,
      ) kodu gizliyor.

## "Öksüz (orphan) kayıt" ne demek ve gerçek bir sistemde neden ciddi bir sorundur? 

Öksüz kayıt, işaret ettiği veri artık olmadığı halde veritabanında kalmaya devam eden kayıttır. Gerçek sistemlerde öksüz kayıt ciddi bir sorundur çünkü verinin doğruluğunu ve tutarlılığını bozar.

## unknown tipi ne anlama gelir?

unknown, TypeScript'te "Bu değerin tipi var ama şu anda ne olduğunu bilmiyorum." anlamına gelir.

## Bu prop neden buraya konmuş ama işi yarım kalmış olabilir? 

setLoans prop'u ileride kitap işlemleri sırasında ödünç kayıtlarını da güncellemek amacıyla eklemişti . Ancak bu özellik tamamlanmadığı için prop ya kullanılmadan kaldı. 

## Kitap silinince ödünç kayıtlarına ne olmalı — üç seçeneği yaz (birlikte sil / aktif ödünç varsa silmeyi engelle / geçmişi koru) ve her birinin artı/eksisini düşün.

1-Kitapla birlikte ödünç kaydını da silmek: Öksüz kayıt oluşmaz. Sistem temiz kalır ve uygulanması kolaydır.Geçmiş bilgiler kaybolur. Kitabı daha önce kim aldı, ne zaman aldı, geç mi getirdi gibi bilgiler artık görülemez. Bu yaklaşım küçük ve geçmişin önemli olmadığı sistemlerde kullanılabilir.

2-Aktif ödünç varsa kitabın silinmesi engellenir: Ödünçte olan bir kitabın yanlışlıkla silinmesini engeller. Veri tutarlılığı korunur. Gerçek sistemlerde oldukça mantıklı ve güvenli bir kuraldır.

3-Geçmiş ödünç kayıtlarını korumak: Geçmiş tamamen korunur. Raporlar, kullanıcı geçmişi ve gecikme bilgileri bozulmaz. Öksüz kayıt oluşmaz. Sistem biraz daha karmaşık olur. Her yerde silinmiş kitapları filtrelemek gerekir. Ayrıca kullanıcıya geçmiş kayıtta kitabın silinmiş olduğunu göstermek gerekebilir.

Hangisi mantıklı: aktif ödünç kaydı varsa kitabın silinmesi engellensin. Yoksa silinsin. Silinen kayıtlar için de ek bir sayfa açılabilir(arşiv) yanlışlıkla silinen kitaplar geri alınabilir ve geçmiş veriler korunur.



# BÖLÜM 8

## Ödünçler sayfasında "books-page"? Araştır: Bu nasıl olmuş olabilir? Kopyala-yapıştır neden spaghetti kod üretir?

Kopyala-yapıştırla taşınan eski isimler, tekrarlanan mantık zamanla kodun hangi parçasının neden kullanıldığını belirsizleştirerek spaghetti kod oluşmasına neden olabilir.


## Araştır: Prettier nedir? 

Prettier, kodunu otomatik olarak düzenleyen (formatlayan) bir araçtır. Yani kodunun ne yaptığını değiştirmez, sadece görünüşünü düzeltir. Hata bulmaz.
Girintileri, boşlukları, satır sonlarını, virgülleri, tırnakları, parantezlerin yerini, satır uzunluğunu düzenler.

## EditorConfig nedir? 

EditorConfig, projedeki herkesin editöründe aynı temel kod yazım ayarlarının (girinti, tab/boşluk, satır sonu, karakter kodlaması vb.) kullanılmasını sağlayan yapılandırma dosyasıdır.


## Editöründe "format on save" nasıl açılır?

VS Code'a kurulu olması gerekir. Ayarlardan açabiliriz ya da  
“editor.formatOnSave": true, 
"editor.defaultFormatter": “esbenp.prettier-vscode" ile aktifleştiririz.

 ## Bunlar kurulursa yukarıdaki sorunlar bir daha oluşabilir mi? 
  
  Format kaynaklı sorunlar büyük ölçüde azalır ama mantıksal ve mimari sorunlar yine oluşabilir.
 
 ## Kendi projende spaghetti'ye en yakın bulduğun dosyayı seç ve nedenini yaz. 
 
 library.css olabilir. Çünkü sayfanın nerdeyse tüm bileşemnlerinin özellikleri burda.
 
  ## bir dosyanın büyümesi ne zaman "bunu bölmeliyim" sinyalidir 

  Bir dosyanın büyümesi yalnızca satır sayısı arttığı için bölmeliyim sinyali vermez. Asıl sinyal, dosyanın birden fazla işi yapmaya başlamasıdır. 

## yönergedeki hangi klasör (lib/) bunun için vardı?

lib, genellikle bir feature’ın içindeki yardımcı teknik kodlar için kullanılabilir.



# BÖLÜM 6

# Bölüm 6 — Tip Güvenliği ve Bağımlılıklar

## 6.1 — strict'i aç. `tsconfig.app.json` dosyasında `"strict": true` yok. `strict` modunu açıp `npm run build` çalıştır. Çıkan hataları LEARNING.md'ye yaz ve düzelt
Hata yok 



## 6.2 — Zod vakası (Gerçek bir bağımlılık dersi) BookForm.tsx dosyası Zod import ediyor ancak package.json içinde Zod yok. Buna rağmen neden çalışıyordu? Temiz kurulum nedir? Neden doğrudan dependency olarak eklenmelidir?

`BookForm.tsx` dosyası Zod paketini doğrudan import etmesine rağmen `package.json` içinde Zod bulunmuyordu. Buna rağmen proje çalışıyordu çünkü Zod, `eslint-plugin-react-hooks` paketinin transitive dependency'si (dolaylı bağımlılığı) olarak kurulmuştu.

npm bir paket kurulurken yalnızca o paketi değil, onun ihtiyaç duyduğu bağımlılıkları da `node_modules` içine kurar. Bu nedenle TypeScript ve Vite, `node_modules/zod` klasörünü bulabiliyordu.

Ancak bu güvenilir bir kullanım değildir. Projede doğrudan import edilen her paket `package.json` içinde doğrudan dependency olarak tanımlanmalıdır. Aksi halde Zod'u getiren paket ileride bu bağımlılığı kaldırırsa proje kırılabilir.

Bu nedenle Zod'un şu komutla doğrudan projeye eklenmesi gerekir:

```bash
npm install zod
```

Temiz kurulum: `node_modules` klasörünün silinip projenin yalnızca `package.json` dosyasındaki bağımlılıklarla yeniden kurulmasıdır.

Eğer kullandığın paket yalnızca transitive dependency olarak geliyorsa ve onu getiren paket değişirse veya kaldırılırsa temiz kurulumdan sonra proje "Cannot find module" hatasıyla çalışmaz.

## 6.3 — `as` tehlikesi as anahtar kelimesi TypeScript'e ne söyler? Çalışma zamanında ne doğrular? Local Storage'daki `library-books` değerini `"merhaba"` yapınca ne oldu? Güvenilmeyen veriler için nasıl bir çözüm uygulandı?

`as`, veriyi değiştirmez; yalnızca TypeScript'in tipi anlamasını sağlar.

Çalışma zamanında hiçbir doğrulama yapmaz. Sadece derleme zamanında (compile time) etkilidir.

DevTools → Application → Local Storage bölümünde `library-books` değerini `"merhaba"` olarak değiştirdim ve sayfayı yeniledim.

`JSON.parse()` geçerli JSON bulamadığı için `SyntaxError` oluşturdu. Ancak uygulama çökmedi. Çünkü hata `try/catch` bloğu tarafından yakalandı ve bozuk veri kullanılmak yerine `getBooks()` ile varsayılan kitaplar yüklendi.

Sonuç olarak:

- Uygulama açılmaya devam etti.
- Beyaz ekran oluşmadı.
- Bozuk Local Storage verisi kullanılmadı.
- Varsayılan kitaplar yüklendi.
- `console.error` sayesinde hata konsolda görülebildi.


Yönergenin ana fikri şuydu:

> Dışarıdan gelen hiçbir veriye güvenme.

API, Local Storage ve kullanıcı girişleri güvenilmeyen veri kaynaklarıdır. Bu veriler kullanılmadan önce doğrulanmalıdır.

Bunun için:

- Zod projeye eklendi.
- Book ve Loan şemaları oluşturuldu.
- `readStoredBooks()` ve `readStoredLoans()` fonksiyonlarında doğrulama yapıldı.

Yeni kullanılan yapılar:

- `try/catch` → Bozuk JSON'u yakalamak için.
- `unknown` → Verinin tipinden henüz emin olmadığımızı belirtmek için.
- `safeParse()` → Veriyi doğrulamak için.
- `result.data` → Doğrulama başarılıysa güvenli veriyi kullanmak için.
- **Fallback** → Doğrulama başarısız olursa `getBooks()` veya `getLoans()` ile varsayılan veriye dönmek için.

Sonuç olarak artık akış şu şekilde oldu:

```
localStorage
      ↓
JSON.parse()
      ↓
Zod doğrulaması
      ↓
Geçerliyse kullan
Geçersizse varsayılan veriye dön
```

Bu sayede Local Storage'dan gelen hiçbir veriye körü körüne güvenilmemiş oldu.


## 6.4 — Pozisyonel parametre tuzağı İki string parametrenin yerini değiştirince TypeScript uyarıyor mu? Neden? Daha güvenli çözüm nedir? `z.infer` nedir? "Şema tek doğruluk kaynağıdır" ne demektir?

İki string parametrenin yerini değiştirdiğimde TypeScript uyarmadı.

Bunun nedeni TypeScript'in parametre isimlerini değil yalnızca tiplerini kontrol etmesidir. Her iki parametre de `string` olduğu için bunu geçerli kabul etti.

Bu nedenle aynı tipte çok sayıda parametre almak hata yapmaya açıktır.

Daha güvenli yaklaşım, çok sayıda parametre yerine tek bir nesne (`BookFormValues` gibi) almaktır.

Böylece:

- Parametre sırasına değil alan isimlerine güvenilir.
- Yanlış sırada parametre gönderme hataları büyük ölçüde ortadan kalkar.

### z.infer nedir?

`z.infer`, yazdığın Zod şemasına bakarak TypeScript tipini otomatik üretir.

BookForm içinde hem `BookFormData` tipi hem de Zod şeması ayrı ayrı tanımlanmıştı. Bu durum aynı bilginin iki yerde tekrar edilmesine neden oluyordu.

Şema değişip TypeScript tipi güncellenmezse zamanla uyumsuzluk oluşabilir.

`z.infer<typeof bookFormSchema>` kullanıldığında TypeScript tipi doğrudan Zod şemasından üretilir.

Böylece:

- Şema tek doğruluk kaynağı olur.
- Tip ile şema birbirinden kopmaz.
- Tekrar eden tanımlar ortadan kalkar.
- Şema değiştiğinde TypeScript tipi de otomatik güncellenir.
