import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FavoritesPage from "@/components/favorites/FavoritesPage";

export const metadata = {
  title: "Favoriler",
  description:
    "ARES favorilerinize eklediğiniz premium erkek giyim parçalarını görüntüleyin.",
};

/* =========================================================
   FAVORITES PAGE
========================================================= */

export default function Favorites() {
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
          FAVORITES CONTENT
      ==================================================== */}

      <FavoritesPage />

      {/* ===================================================
          FOOTER
      ==================================================== */}

      <Footer />
    </main>
  );
}
