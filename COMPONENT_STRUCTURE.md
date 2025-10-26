# Wedding Invitation Digital

Aplikasi undangan pernikahan digital yang dibuat dengan Next.js 16 dan menggunakan komponen-komponen dari Aceternity UI.

## Struktur Komponen

Aplikasi ini telah diorganisir dengan struktur komponen yang modular untuk memudahkan maintenance:

### 📁 Struktur Folder

```
components/
├── ui/                    # Komponen UI dari Aceternity
│   ├── 3d-card.tsx
│   ├── animated-testimonials.tsx
│   ├── aurora-background.tsx
│   ├── background-beams.tsx
│   ├── card-hover-effect.tsx
│   ├── client-only.tsx
│   ├── countdown-timer.tsx
│   ├── evervault-card.tsx
│   ├── floating-dock.tsx
│   ├── floating-navbar.tsx
│   ├── gift-registry.tsx
│   ├── infinite-moving-cards.tsx
│   ├── music-player.tsx
│   ├── moving-border.tsx
│   ├── parallax-scroll.tsx
│   ├── sparkles.tsx
│   ├── spotlight.tsx
│   ├── sticky-scroll-reveal.tsx
│   ├── text-generate-effect.tsx
│   └── wobble-card.tsx
└── sections/              # Komponen Section Utama
    ├── HeroSection.tsx
    ├── CoupleSection.tsx
    ├── EventDetails.tsx
    ├── PhotoGallery.tsx
    ├── TestimonialsSection.tsx
    └── RSVPSection.tsx
```

### 🎯 Keuntungan Struktur Modular

1. **Mudah Maintenance**: Setiap section memiliki file terpisah
2. **Reusable**: Komponen dapat digunakan kembali di tempat lain
3. **Clean Code**: File utama (`app/page.tsx`) menjadi lebih bersih dan mudah dibaca
4. **Team Collaboration**: Developer dapat bekerja pada komponen yang berbeda tanpa konflik
5. **Testing**: Setiap komponen dapat ditest secara terpisah

### 🔧 Cara Mengubah Komponen Spesifik

#### Mengubah Hero Section

```bash
# Edit file
components/sections/HeroSection.tsx
```

#### Mengubah Detail Acara

```bash
# Edit file
components/sections/EventDetails.tsx
```

#### Mengubah Galeri Foto

```bash
# Edit file
components/sections/PhotoGallery.tsx
```

#### Mengubah Pasangan Pengantin

```bash
# Edit file
components/sections/CoupleSection.tsx
```

### 📝 Contoh Penggunaan

```tsx
// app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { CoupleSection } from "@/components/sections/CoupleSection";

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <CoupleSection />
      {/* ... komponen lainnya */}
    </div>
  );
}
```

### 🎨 Komponen Aceternity UI yang Digunakan

- **3D Card**: Untuk kartu pasangan pengantin dengan efek 3D
- **Infinite Moving Cards**: Untuk galeri foto yang bergerak
- **Animated Testimonials**: Untuk section ucapan dan doa
- **Floating Dock**: Untuk navigasi yang mengambang
- **Aurora Background**: Untuk background dengan efek aurora
- **Background Beams**: Untuk efek beam di background
- **Sparkles**: Untuk efek partikel berkilau
- **Moving Border**: Untuk border yang bergerak
- **Text Generate Effect**: Untuk efek teks yang muncul bertahap
- **Wobble Card**: Untuk kartu dengan efek wobble
- **Countdown Timer**: Untuk countdown pernikahan

### 🚀 Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build
```

### 📱 Fitur

- ✅ Responsive Design
- ✅ Smooth Animations
- ✅ Interactive Elements
- ✅ Modern UI/UX
- ✅ Modular Components
- ✅ Easy Customization
