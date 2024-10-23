# Mouse Controller App

Bu proje, **React Native** ve **Go** ile geliştirilmiş bir mobil uygulamadır. Uygulama, WebSocket kullanarak bir sunucuya bağlanır ve mobil cihazdaki sensör verilerini kullanarak fareyi uzaktan kontrol etmeye yarar. Sunucu tarafı **Go** ile yazılmış olup, **Makefile** ile kolayca çalıştırılabilir.

## İçindekiler

- [Özellikler](#özellikler)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Proje Yapısı](#proje-yapısı)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## Özellikler

- Mobil cihaz sensörleri aracılığıyla fare hareketi kontrolü
- WebSocket kullanarak gerçek zamanlı veri iletimi
- Go backend ile stabil ve hızlı server-side işlem
- **Makefile** kullanarak kolay sunucu başlatma ve yönetim

## Gereksinimler

### Sunucu Gereksinimleri (Go):

- Go 1.18 veya daha yeni bir sürüm
- WebSocket destekleyen herhangi bir tarayıcı veya client

### Mobil Uygulama Gereksinimleri (React Native):

- Node.js (v16.0.0 veya daha üstü)
- React Native CLI
- Android Studio veya Xcode (emülatörler için)
- Mobil cihaz sensör erişim izni (gyroscope)

## Kurulum

### Sunucu Tarafı (Go):

1. Go'nun yüklü olduğundan emin olun.
2. Proje dizinine gidin ve Makefile yardımıyla sunucuyu çalıştırın:

   ```bash
   make run
   ```

3. Sunucu, belirtilen port üzerinden WebSocket bağlantılarını dinleyecektir. Varsayılan port: 8080.

### Mobil Uygulama (React Native):

1. Proje dizinine gidin ve gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Uygulamayı başlatmak için:

   ```bash
   npx react-native start
   ```

3. Uygulama, sunucuya WebSocket üzerinden bağlanacaktır.

## Kullanım

1. Sunucuyu çalıştırın (yukarıdaki adımları izleyin).
2. Mobil uygulamayı başlatın.
3. Mobil cihazın sensör verilerini kullanarak fareyi kontrol edebilirsiniz. Sunucuya bağlanıldığında mobil cihazın ekranında bağlantı durumu görünecektir.

## Proje Yapısı

```bash
root/
├── go/                 # Go backend dosyaları
│   ├── main.go         # WebSocket sunucusu
│   ├── Makefile        # Sunucu yönetimi için Makefile
│   └── ...
├── reactnative/        # React Native uygulaması
│   ├── src/            # Uygulama kaynak dosyaları
│   ├── App.tsx         # Giriş noktası
│   └── ...
├── README.md           # Bu dokümantasyon dosyası
└── ...
```

## API Dokümantasyonu

### WebSocket Mesajları

| Mesaj Türü                | Açıklama                                                                   |
| ------------------------- | -------------------------------------------------------------------------- |
| `MouseMotionMove`         | Mobil cihazın sensör verilerini kullanarak fareyi hareket ettiren mesaj.   |
| `MouseMotionStart`        | Gyroscope hareketi başlatılırken gönderilen mesaj.                         |
| `MouseMotionStop`         | Gyroscope hareketi durdurulurken gönderilen mesaj.                         |
| `leftClickEvent`          | Sol fare tıklama olayını tetikleyen mesaj.                                 |
| `rightClickEvent`         | Sağ fare tıklama olayını tetikleyen mesaj.                                 |
| `client received message` | Sunucudan gelen mesajları onaylayan istemci mesajı.                        |
| `connect`                 | WebSocket bağlantısı başarıyla kurulduğunda istemci tarafından gönderilir. |
| `disconnect`              | WebSocket bağlantısı kapatıldığında istemci tarafından gönderilir.         |

### Örnek WebSocket Mesajları

#### `MouseMotionMove`

Bu mesaj, cihazın gyroscope verilerine dayanarak fare hareketini gerçekleştirmek için sunucuya gönderilir:

```json
{
  "event": "MouseMotionMove",
  "axis": {
    "x": "-0.02345",
    "y": "0.03456"
  }
}
```

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen aşağıdaki adımları takip edin:

1. Bu projeyi fork'layın.
2. Yeni bir dal oluşturun (git checkout -b new-feature).
3. Değişikliklerinizi commit edin (git commit -m 'Add new feature').
4. Dalınıza push yapın (git push origin new-feature).
5. Bir Pull Request oluşturun.

## Lisans

Bu proje [Apache 2.0 Lisansı](https://www.apache.org/licenses/LICENSE-2.0) ile lisanslanmıştır.
