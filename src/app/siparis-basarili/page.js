import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrderSuccessPage from "@/components/checkout/OrderSuccessPage";

export const metadata = {
  title: "Sipariş Alındı",
  description: "ARES siparişiniz başarıyla alınmıştır.",
};

export default function SiparisBasariliPage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <OrderSuccessPage />

      <Footer />
    </main>
  );
}
