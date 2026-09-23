import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionsPage from "@/components/collections/CollectionsPage";

export const metadata = {
  title: "Koleksiyonlar",
  description:
    "ARES koleksiyonlarını keşfedin. Modern terzilik, seçkin dış giyim ve zamansız günlük erkek giyim parçaları.",
};

/* =========================================================
   COLLECTIONS PAGE
========================================================= */

export default function Collections() {
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
          COLLECTIONS
      ==================================================== */}

      <CollectionsPage />

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </main>
  );
}
