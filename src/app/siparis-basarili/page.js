import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OrderSuccessPage from "@/components/checkout/OrderSuccessPage";

export const metadata = {
  title: "Sipariş Alındı",
  description: "ARES siparişiniz başarıyla alınmıştır.",
};

/* =========================================================
   ORDER SUCCESS PAGE
========================================================= */

export default function SiparisBasariliPage() {
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
          ORDER SUCCESS CONTENT
      ==================================================== */}

      <OrderSuccessPage />

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </main>
  );
}
