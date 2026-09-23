import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutPage from "@/components/checkout/CheckoutPage";

export const metadata = {
  title: "Ödeme",
  description: "ARES siparişinizi güvenli şekilde tamamlayın.",
};

export default function OdemePage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <CheckoutPage />

      <Footer />
    </main>
  );
}
