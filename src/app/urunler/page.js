import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ProductsGrid from "@/components/products/ProductsGrid";

import { products } from "@/data/products";

export const metadata = {
  title: "Giyim",
  description:
    "ARES erkek giyim koleksiyonu. Modern terzilik, premium dış giyim ve zamansız günlük parçaları keşfedin.",
};

export default function ProductsPage() {
  return (
    <main>
      <Navbar />

      {/* FIXED NAVBAR OFFSET */}
      <div className="h-[108px] lg:h-[126px]" />

      <ProductsGrid products={products} />

      <Footer />
    </main>
  );
}
