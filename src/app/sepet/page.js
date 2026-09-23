import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartPage from "@/components/cart/CartPage";

export const metadata = {
  title: "Sepet",
  description:
    "ARES alışveriş sepetinizi görüntüleyin ve ürünlerinizi yönetin.",
};

export default function SepetPage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <CartPage />

      <Footer />
    </main>
  );
}
