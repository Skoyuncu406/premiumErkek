import { Suspense } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductsGrid from "@/components/products/ProductsGrid";

import { products } from "@/data/products";

export const metadata = {
  title: "Giyim",
  description:
    "ARES erkek giyim koleksiyonu. Modern terzilik, premium dış giyim ve zamansız günlük parçaları keşfedin.",
};

/* =========================================================
   PRODUCTS PAGE
========================================================= */

export default function ProductsPage() {
  return (
    <main>
      <Navbar />

      <div className="h-[108px] lg:h-[126px]" />

      <Suspense fallback={<ProductsLoading />}>
        <ProductsGrid products={products} />
      </Suspense>

      <Footer />
    </main>
  );
}

/* =========================================================
   PRODUCTS LOADING
========================================================= */

function ProductsLoading() {
  return (
    <section
      className="
        min-h-[70vh]

        bg-[var(--ares-background-soft)]
      "
    >
      <div className="ares-container-wide">
        <div
          className="
            flex
            min-h-[60vh]

            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              flex-col

              items-center

              gap-4
            "
          >
            <span
              className="
                h-px
                w-10

                bg-[var(--ares-gold)]
              "
            />

            <p
              className="
                text-[8px]
                font-semibold

                uppercase
                tracking-[0.18em]

                text-[var(--ares-muted)]
              "
            >
              ARES / Collection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
