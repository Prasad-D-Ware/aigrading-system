import Hero from "../components/landing/Hero"
import Features from "../components/landing/Features"
import Testimonials from "../components/landing/Testimonials"
import Footer from "../components/Footer"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <main className="flex-grow">
          <Header/>
          <Hero />
          <Features />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </div>
  )
}

