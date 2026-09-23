import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionsPage from "@/components/collections/CollectionsPage";

export const metadata = {
  title: "Koleksiyonlar",
  description:
    "ARES erkek giyim koleksiyonlarını keşfedin. Modern terzilik, premium dış giyim ve zamansız gardırop parçaları.",
};

export default function KoleksiyonlarPage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <CollectionsPage />

      <Footer />
    </main>
  );
}
