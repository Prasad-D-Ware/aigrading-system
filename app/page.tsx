import Hero from "../components/landing/Hero"
import Features from "../components/landing/Features"
import Testimonials from "../components/landing/Testimonials"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto bg-gray-50">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

