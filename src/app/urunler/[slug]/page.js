import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import ProductDetail from "@/components/products/ProductDetail";

import { products } from "@/data/products";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: product.name,
    description: `${product.name} — ARES premium erkek giyim koleksiyonu.`,
  };
}

/* =========================================================
   PRODUCT PAGE
========================================================= */

export default async function ProductPage({ params, searchParams }) {
  const { slug } = await params;

  const resolvedSearchParams = await searchParams;

  /* =======================================================
     PRODUCT
  ======================================================== */

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  /* =======================================================
     REVIEWS
  ======================================================== */

  const openReviews = resolvedSearchParams?.reviews === "1";

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <main
      className="
        min-h-screen

        lg:h-screen
        lg:overflow-hidden
      "
    >
      <Navbar />

      <ProductDetail product={product} openReviews={openReviews} />
    </main>
  );
}
