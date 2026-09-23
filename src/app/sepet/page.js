import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartPage from "@/components/cart/CartPage";

export const metadata = {
  title: "Sepetim",
  description:
    "ARES sepetinizdeki ürünleri görüntüleyin, adetleri düzenleyin ve ödeme adımına devam edin.",
};

/* =========================================================
   CART PAGE
========================================================= */

export default function Cart() {
  return (
    <main>
      {/* ===================================================
          NAVBAR
      ==================================================== */}

      <Navbar />

      {/* ===================================================
          FIXED NAVBAR OFFSET

          Mobile:
          Announcement 34px + Navbar 68px = 102px

          Desktop:
          Announcement 34px + Navbar 92px = 126px
      ==================================================== */}

      <div className="h-[102px] lg:h-[126px]" />

      {/* ===================================================
          CART CONTENT
      ==================================================== */}

      <CartPage />

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </main>
  );
}
