// app/beranda/page.tsx
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import WhySection from '@/components/WhySection'
import FishGalleryPreview from '@/components/FishGalleryPreview'
import Footer from '@/components/Footer'

export default function BerandaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <HeroSection />
        <FishGalleryPreview />
        <WhySection />
      </main>

      <Footer />
    </div>
  )
}
