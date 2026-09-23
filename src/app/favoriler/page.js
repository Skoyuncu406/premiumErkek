import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FavoritesPage from "@/components/favorites/FavoritesPage";

export const metadata = {
  title: "Favoriler",
  description: "ARES favorilerinize eklediğiniz ürünleri görüntüleyin.",
};

export default function FavorilerPage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <FavoritesPage />

      <Footer />
    </main>
  );
}
