# BÖLÜM 1

# # 1- 
return React'in ekrana çizeceği bir arayüz (JSX) döndürüyorsa .tsx, normal veri döndürüyorsa .ts kullanılır. Bir .ts dosyasının içine JSX yazarsak .ts dosyası bunu anlayamadığı için hata verir. .ts dosyasını .tsx yapabiliriz. O zaman hatalar kaybolur ama bu mantıklı bir kullanım değildir çünkü .ts nin görevi veri döndürmektir içine JSX yazmak saçma olur. Dosya adını hata almamak için .tsx yaptık ama return Jsx döndürmediği için ekranda görünmeyecek. .tsx olması sadece hata almadan içine JSX yazmamıza izin verdi.



# # #2-
Vite: projeyi çok hızlı açan ve tarayıcıya gösteren build tool(geliştirme aracı). 
-Npm run dev’de vite proje geliştirileceğini anlar. package.json okunur, vite çalışır,vite.config.ts okunur, main.tsx bulunur, bütün importlar takip edilir, TS+JSX dönüştürülür, localhost açılır dosyalar sürekli izlenir.
-Npm run build’de vite artık geliştirme yapılmayacağını, projenin artık internete yükleneceğini anlar. Vite başlar, tüm dosyaları bulur, TS JSye dönüştürülür, JSX JS ye dönüştürülür, kullanılmayan kodları siler, kodları küçültür, disk klasörünü oluşturur.

Şablon(template): hazır başlangıç paketi. Sıfırdan kod yazmak yerine vite gibi iskelet oluşturan araçlar bana hazır dosyaları verir ve ben o şablon üzerine projemi geliştirmeye başlarım.

Kullanılan komut: npm create vite@latest
Şablon:Vite'ın React+TypeScript şablonu
Şablon bana App.tsx, main.tsx, package.json, vite.config.ts, tsconfig.json, index.html ve temel klasör yapısını hazır olarak verdi.



# # 3-
TypeScript strict mode:typescriptin katı kurallar koyarak olası hataları kodu çalıştırmadan önce yakalamamızı sağlayan özelliği. Kod çalışmadan beni uyarır.
True ise bu özellik açık, false ise kapalıdır. Açık olduğunda: Yanlış veri tiplerini algılar,null ve undefined hatalarını önceden gösterir, eksik ve hatalı kod yazıldığında uyarı verir, daha güvenli ve hatasız kod yazmanı sağlar.
Kapalı olduğunda: Hatalar varken kod yine derlenir ama runtimeda hata alma ihtimalimiz artar.

-strictNullChecks: bir değişken null ve undefined değer alıp alamayacağını denetler. Açıksa null ve undefined değerlerini normal bir değer gibi kabul etmez, eğer bir değişkenin bunları almasını istiyorsak açıkça belirtmeliyiz. ** let username: string | null = null;

-noImplicitAny: typescript bir değişkenin veya parametrenin tipi belirtilmezse bazen otomatik olarak any tipi verilir. noimplicitany açık olduğunda istemeden oluşan any tiplerine izin vermez.
Bunlar ts'in en önemli güvenlik kurallarından ikisi. Bu özellikler benim projemde varsayılan olarak açık. Tsconfig.app.json dosyamda yazmıyordu ama typescript 6.0.0 sürümlerinden sonra varsayılan açık olarak geliyor. Yine de bir sonraki projemi yükleyen kişi görsün ve açık olduğunu bilsin diye dosyanın içinde belirtebilirim. Herhangi bir dğeşiklik olmaz.



# # 4- 
Dependincies, projenin çalışması için gerekli olan tüm kütüphanelerin listelendiği bölüm. npm install, package.json dosyasını okur ordaki paketleri internetten indirir ve node_modules klasörüne indirir.
Bir paketi kodumda import edebilmem için o paketin önce projeye kurulmuş olması gerekir. Yani paket package.json dosyasında kayıtlı olmalı ve node_modules klasöründe bulunmalıdır. Aksi halde typescript veya vite paketi bulamaz ve hata verir.
**Diyelim ki birisi package.json dosyasından satırlardan birini sildi ama node_modules ten silmedi. import package.json'a değil node_modules'e baktığı için package.json da olmayan paketi kullandı. Bu geçici olarak çalışabilir. Ama güvenli değildir. Benim bilgisayarımda çalışır ama bu projeyi githuba yüklediğimde başka biri npm install yaptığında package.json da o paket olmadığı için bilgisayara npm onu kuramaz ve proje çalışmaz.

Transitive dependency, senin doğrudan kurmadığın ama kurduğun başka bir paketin ihtiyaç duyduğu pakettir. Yani sen onu npm install ile kurmazsın. Senin kurduğun paket onu senin yerine kurar.



# # 5-  
Local storage: Tarayıcının kullanıcıya ait verileri kalıcı olarak saklamasını sağlayan bir depolama alanıdır. Sayfa yenilense ve tarayıcı kapatılsa bile veriler silinmez. Hızlı erişim için tasarlanmıştır. 5-10 mb alanı depolama vardır. String saklayabilir. Güvenli değildir. Hassas olmayan kullanıcı verileerini saklamak için tasarlanmıştır. Kullanıcı konsoldan bilgileri. görebilir, silebilir, değiştirebilir.

Projeyi ilk açtığımızda kayıtlı veri varsa localStorage'dan çekeriz, yoksa yeni girilen bilgileri localStorage'a kaydederiz.



# # 6- 
Spaghetti kod: Okuması, anlaşılması, değiştirilmesi zor ve her şeyin birbirine girdiği kod.

Format/stil tutarsızlığıyla doğrudan bir ilişkisi yok. Ama okunurluk bozuldukça ve proje büyüdükçe spaghetti koda yol açabilcek bir nedendir.

Eğer tutarsız yazarsak başka birinin kodumuzu okuması zorlaşır, zaman kaybettirir. Hata ayıklamada;isimlendirme farklıysa(book_name, bookName, title) ilgili kodu bulmak daha uzun sürer. Bu da geliştirme süresini ve bakım maliyetini artırır.






# BÖLÜM 2

# # 1- 
Çünkü sadece konsola bilgi yazdırır. Aslında hatanın nerde olduğunu o bilgiyle anlayan biziz. Hatayı engellemez. Kullanıcıyı ilgilendiren bir hata veya uyarı, konsola değil arayüze gösterilmelidir. useState ile hata mesajı ekranda gösterilebilir.



# # 2- 
formDialog,date.ts , welcome.tsx
Ölü kod neden zararlıdır? 
-kodu okumayı zorlaştırır.
-projeyi gereksiz büyütür.
-bakım maileytini arttırır. 



# # 3- 
"Kullanıcıya görünen metin" sadece ekranda yazı olarak görünen midir? Hayır ekranda yazı olarak görünenler değil uygulamayı kullanırken görebileceği her türlü metindir. 

Ekran okuyucu (screen reader) kullanan biri uygulamanda ne "duyar"? Başlıklar buton yazıları ,form etiketlerı( label), placeholderlar(kitap adı girin yazar adı girin..) ,hata mesajı uyarılar boş durum mesajları, dialog boşlukları.

aria-label nedir? Ekran okuyuculara bir öğenin ne işe yaradığını söyleyen açıklama metnidir.



# # 4-
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

