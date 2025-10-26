# Music Setup Instructions

## Cara Menambahkan Lagu Pernikahan

1. **Upload file lagu ke folder `public/song/`**

   - Format yang didukung: `.mp3`, `.wav`, `.ogg`
   - Nama file: `wedding-song.mp3` (atau sesuaikan dengan path di JSON)

2. **Update konfigurasi di `public/data.json`**

   ```json
   {
     "music": {
       "enabled": true,
       "songPath": "/song/wedding-song.mp3",
       "songTitle": "Wedding Song",
       "autoplay": false,
       "loop": true,
       "volume": 0.5
     }
   }
   ```

3. **Konfigurasi Musik:**
   - `enabled`: true/false untuk mengaktifkan/menonaktifkan musik
   - `songPath`: path ke file lagu (relatif dari public folder)
   - `songTitle`: nama lagu yang ditampilkan
   - `autoplay`: true untuk auto play saat halaman dimuat
   - `loop`: true untuk mengulang lagu
   - `volume`: volume musik (0.0 - 1.0)

## Contoh File Structure:

```
public/
├── song/
│   └── wedding-song.mp3
└── data.json
```

## Tips:

- Gunakan file MP3 untuk kompatibilitas terbaik
- Pastikan file tidak terlalu besar (< 10MB untuk performa optimal)
- Test musik di browser sebelum deploy
