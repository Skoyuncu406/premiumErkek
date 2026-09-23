import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";

import NewArrivals from "@/components/home/NewArrivals";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <NewArrivals />

      <Footer />
    </main>
  );
}
