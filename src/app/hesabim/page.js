import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountPage from "@/components/account/AccountPage";

export const metadata = {
  title: "Hesabım",
  description: "ARES hesabınıza giriş yapın veya yeni bir hesap oluşturun.",
};

/* =========================================================
   ACCOUNT PAGE
========================================================= */

export default function Account() {
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
          ACCOUNT CONTENT
      ==================================================== */}

      <AccountPage />

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </main>
  );
}
