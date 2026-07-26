BÖLÜM 1

1- return React'in ekrana çizeceği bir arayüz (JSX) döndürüyorsa .tsx, normal veri döndürüyorsa .ts kullanılır. Bir .ts dosyasının içine JSX yazarsak .ts dosyası bunu anlayamadığı için hata verir. .ts dosyasını .tsx yapabiliriz. O zaman hatalar kaybolur ama bu mantıklı bir kullanım değildir çünkü .ts nin görevi veri döndürmektir içine JSX yazmak saçma olur. Dosya adını hata almamak için .tsx yaptık ama return Jsx döndürmediği için ekranda görünmeyecek. .tsx olması sadece hata almadan içine JSX yazmamıza izin verdi.



2-Vite: projeyi çok hızlı açan ve tarayıcıya gösteren build tool(geliştirme aracı). 
-Npm run dev’de vite proje geliştirileceğini anlar. package.json okunur, vite çalışır,vite.config.ts okunur, main.tsx bulunur, bütün importlar takip edilir, TS+JSX dönüştürülür, localhost açılır dosyalar sürekli izlenir.
-Npm run build’de vite artık geliştirme yapılmayacağını, projenin artık internete yükleneceğini anlar. Vite başlar, tüm dosyaları bulur, TS JSye dönüştürülür, JSX JS ye dönüştürülür, kullanılmayan kodları siler, kodları küçültür, disk klasörünü oluşturur.

Şablon(template): hazır başlangıç paketi. Sıfırdan kod yazmak yerine vite gibi iskelet oluşturan araçlar bana hazır dosyaları verir ve ben o şablon üzerine projemi geliştirmeye başlarım.

Kullanılan komut: npm create vite@latest
Şablon:Vite'ın React+TypeScript şablonu
Şablon bana App.tsx, main.tsx, package.json, vite.config.ts, tsconfig.json, index.html ve temel klasör yapısını hazır olarak verdi.



3-TypeScript strict mode:typescriptin katı kurallar koyarak olası hataları kodu çalıştırmadan önce yakalamamızı sağlayan özelliği. Kod çalışmadan beni uyarır.
True ise bu özellik açık, false ise kapalıdır. Açık olduğunda: Yanlış veri tiplerini algılar,null ve undefined hatalarını önceden gösterir, eksik ve hatalı kod yazıldığında uyarı verir, daha güvenli ve hatasız kod yazmanı sağlar.
Kapalı olduğunda: Hatalar varken kod yine derlenir ama runtimeda hata alma ihtimalimiz artar.

-strictNullChecks: bir değişken null ve undefined değer alıp alamayacağını denetler. Açıksa null ve undefined değerlerini normal bir değer gibi kabul etmez, eğer bir değişkenin bunları almasını istiyorsak açıkça belirtmeliyiz. ** let username: string | null = null;

-noImplicitAny: typescript bir değişkenin veya parametrenin tipi belirtilmezse bazen otomatik olarak any tipi verilir. noimplicitany açık olduğunda istemeden oluşan any tiplerine izin vermez.
Bunlar ts'in en önemli güvenlik kurallarından ikisi. Bu özellikler benim projemde varsayılan olarak açık. Tsconfig.app.json dosyamda yazmıyordu ama typescript 6.0.0 sürümlerinden sonra varsayılan açık olarak geliyor. Yine de bir sonraki projemi yükleyen kişi görsün ve açık olduğunu bilsin diye dosyanın içinde belirtebilirim. Herhangi bir dğeşiklik olmaz.



4- Dependincies, projenin çalışması için gerekli olan tüm kütüphanelerin listelendiği bölüm. npm install, package.json dosyasını okur ordaki paketleri internetten indirir ve node_modules klasörüne indirir.
Bir paketi kodumda import edebilmem için o paketin önce projeye kurulmuş olması gerekir. Yani paket package.json dosyasında kayıtlı olmalı ve node_modules klasöründe bulunmalıdır. Aksi halde typescript veya vite paketi bulamaz ve hata verir.
**Diyelim ki birisi package.json dosyasından satırlardan birini sildi ama node_modules ten silmedi. import package.json'a değil node_modules'e baktığı için package.json da olmayan paketi kullandı. Bu geçici olarak çalışabilir. Ama güvenli değildir. Benim bilgisayarımda çalışır ama bu projeyi githuba yüklediğimde başka biri npm install yaptığında package.json da o paket olmadığı için bilgisayara npm onu kuramaz ve proje çalışmaz.

Transitive dependency, senin doğrudan kurmadığın ama kurduğun başka bir paketin ihtiyaç duyduğu pakettir. Yani sen onu npm install ile kurmazsın. Senin kurduğun paket onu senin yerine kurar.



5-  Local storage: Tarayıcının kullanıcıya ait verileri kalıcı olarak saklamasını sağlayan bir depolama alanıdır. Sayfa yenilense ve tarayıcı kapatılsa bile veriler silinmez. Hızlı erişim için tasarlanmıştır. 5-10 mb alanı depolama vardır. String saklayabilir. Güvenli değildir. Hassas olmayan kullanıcı verileerini saklamak için tasarlanmıştır. Kullanıcı konsoldan bilgileri. görebilir, silebilir, değiştirebilir.

Projeyi ilk açtığımızda kayıtlı veri varsa localStorage'dan çekeriz, yoksa yeni girilen bilgileri localStorage'a kaydederiz.



6- Spaghetti kod: Okuması, anlaşılması, değiştirilmesi zor ve her şeyin birbirine girdiği kod.

Format/stil tutarsızlığıyla doğrudan bir ilişkisi yok. Ama okunurluk bozuldukça ve proje büyüdükçe spaghetti koda yol açabilcek bir nedendir.

Eğer tutarsız yazarsak başka birinin kodumuzu okuması zorlaşır, zaman kaybettirir. Hata ayıklamada;isimlendirme farklıysa(book_name, bookName, title) ilgili kodu bulmak daha uzun sürer. Bu da geliştirme süresini ve bakım maliyetini artırır.
