import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutPage from "@/components/checkout/CheckoutPage";

export const metadata = {
  title: "Ödeme",
  description:
    "ARES siparişiniz için teslimat ve ödeme bilgilerinizi tamamlayın.",
};

/* =========================================================
   CHECKOUT PAGE
========================================================= */

export default function Checkout() {
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
          CHECKOUT CONTENT
      ==================================================== */}

      <CheckoutPage />

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </main>
  );
}
