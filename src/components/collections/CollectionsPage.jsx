"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";

/* =========================================================
   COLLECTION DATA
========================================================= */

const collections = [
  {
    id: "tailoring",
    number: "01",
    eyebrow: "Modern Tailoring",
    title: "Tailoring",
    subtitle:
      "Keskin çizgiler. Dengeli oranlar. Modern terzilik.",
    description:
      "Geleneksel erkek terziliğini çağdaş bir bakışla yeniden yorumlayan blazer ve pantolonlardan oluşan seçki.",
    image:
      "/images/categories/tailoring.jpg",
    href:
      "/urunler?kategori=Tailoring",
  },

  {
    id: "outerwear",
    number: "02",
    eyebrow: "Seasonal Layers",
    title: "Outerwear",
    subtitle:
      "Katmanlı siluetler. Güçlü dokular. Sessiz karakter.",
    description:
      "Şehir yaşamının değişen ritmine uyum sağlayan coat, overshirt ve dış giyim parçaları.",
    image:
      "/images/categories/outerwear.jpg",
    href:
      "/urunler?kategori=Outerwear",
  },

  {
    id: "essentials",
    number: "03",
    eyebrow: "Everyday Uniform",
    title: "Essentials",
    subtitle:
      "Azaltılmış detaylar. Rafine materyaller. Günlük denge.",
    description:
      "Gardırobun temelini oluşturan knitwear, polo ve zamansız günlük parçaların rafine yorumu.",
    image:
      "/images/categories/essentials.jpg",
    href:
      "/urunler?kategori=Essentials",
  },
];

/* =========================================================
   COLLECTIONS PAGE
========================================================= */

export default function CollectionsPage() {
  return (
    <section
      className="
        bg-[var(--ares-background-soft)]
        text-[var(--ares-dark-deep)]
      "
    >
      {/* ===================================================
          INTRO
      ==================================================== */}

      <div className="ares-container-wide">
        <div
          className="
            border-b
            border-[var(--ares-border)]
            pb-10
            pt-10
            sm:pb-5
            sm:pt-5
            lg:pb-10
            lg:pt-10
          "
        >
          {/* EYEBROW */}

          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[var(--ares-muted)]
            "
          >
            ARES / Collections
          </p>
        </div>
      </div>

      {/* ===================================================
          COLLECTIONS
      ==================================================== */}

      <div
        id="collections"
        className="
          ares-container-wide
          scroll-mt-[130px]
        "
      >
        {collections.map(
          (collection, index) => (
            <CollectionRow
              key={collection.id}
              collection={collection}
              reverse={
                index % 2 === 1
              }
            />
          ),
        )}
      </div>

      {/* ===================================================
          ALL PRODUCTS CTA
      ==================================================== */}

      <div className="ares-container-wide">
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            border-t
            border-[var(--ares-border)]
            py-16
            text-center
            sm:py-20
            lg:py-24
          "
        >
          <p
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[var(--ares-muted-light)]
            "
          >
            ARES / The Complete Edit
          </p>

          <h2
            className="
              mt-5
              max-w-[650px]
              font-editorial
              text-[40px]
              font-medium
              leading-[0.95]
              tracking-[-0.035em]
              text-[var(--ares-dark-deep)]
              sm:text-[50px]
              lg:text-[58px]
            "
          >
            Tüm seçkiyi keşfedin.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[430px]
              text-[9px]
              leading-[1.8]
              text-[var(--ares-muted)]
              sm:text-[10px]
            "
          >
            ARES gardırobunu oluşturan
            tüm parçaları tek bir
            seçkide inceleyin.
          </p>

          <Link
            href="/urunler"
            className="
              ares-button
              group
              mt-8
              min-w-[210px]
              justify-between
            "
          >
            <span>
              Tüm Ürünler
            </span>

            <ArrowRight
              size={14}
              strokeWidth={1.3}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COLLECTION ROW
========================================================= */

function CollectionRow({
  collection,
  reverse,
}) {
  return (
    <article
      className="
        border-b
        border-[var(--ares-border)]
        lg:min-h-[calc(100svh-126px)]
      "
    >
      <div
        className="
          grid
          min-h-full
          items-center
          gap-8
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:min-h-[calc(100svh-126px)]
          lg:grid-cols-2
          lg:gap-12
          lg:px-8
          lg:py-8
          xl:gap-16
          xl:px-10
          xl:py-10
        "
      >
        {/* =================================================
            IMAGE
        ================================================== */}

        <div
          className={`
            flex
            h-full
            items-center
            justify-center
            ${
              reverse
                ? "lg:order-2"
                : "lg:order-1"
            }
          `}
        >
          <Link
            href={collection.href}
            className="
              group
              relative
              block
              w-full
              overflow-hidden
              bg-[var(--ares-background-warm)]
              lg:h-[calc(100svh-206px)]
              lg:max-h-[760px]
              lg:min-h-[500px]
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                w-full
                sm:aspect-[16/11]
                lg:h-full
                lg:aspect-auto
              "
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                priority={
                  collection.number === "01"
                }
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-out
                  group-hover:scale-[1.02]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/[0.035]
                  transition-colors
                  duration-700
                  group-hover:bg-black/[0.01]
                "
              />

              {/* NUMBER */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-white/50
                  bg-black/10
                  backdrop-blur-sm
                  sm:left-6
                  sm:top-6
                "
              >
                <span
                  className="
                    font-editorial
                    text-[14px]
                    text-white
                  "
                >
                  {collection.number}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className={`
            flex
            h-full
            items-center
            ${
              reverse
                ? "lg:order-1"
                : "lg:order-2"
            }
          `}
        >
          <div
            className="
              w-full
              py-4
              lg:px-6
              xl:px-10
            "
          >
            {/* NUMBER / EYEBROW */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  font-editorial
                  text-[15px]
                  text-[var(--ares-gold)]
                "
              >
                {collection.number}
              </span>

              <span
                className="
                  h-px
                  w-8
                  bg-[var(--ares-border-dark)]
                "
              />

              <p
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-[var(--ares-muted-light)]
                  sm:text-[8px]
                "
              >
                {collection.eyebrow}
              </p>
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-6
                font-editorial
                text-[48px]
                font-medium
                leading-[0.9]
                tracking-[-0.04em]
                text-[var(--ares-dark-deep)]
                sm:text-[58px]
                lg:text-[60px]
                xl:text-[68px]
              "
            >
              {collection.title}
            </h2>

            {/* SUBTITLE */}

            <p
              className="
                mt-6
                max-w-[440px]
                font-editorial
                text-[21px]
                font-medium
                leading-[1.15]
                tracking-[-0.015em]
                text-[var(--ares-brown-dark)]
                sm:text-[24px]
              "
            >
              {collection.subtitle}
            </p>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                max-w-[430px]
                text-[9px]
                leading-[1.9]
                text-[var(--ares-muted)]
                sm:text-[10px]
              "
            >
              {collection.description}
            </p>

            {/* LINK */}

            <Link
              href={collection.href}
              className="
                group
                mt-8
                inline-flex
                w-fit
                items-center
                gap-5
                border-b
                border-[var(--ares-border-dark)]
                pb-2
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[var(--ares-dark-deep)]
                transition-colors
                duration-300
                hover:border-[var(--ares-dark-deep)]
              "
            >
              <span>
                Koleksiyonu Keşfet
              </span>

              <ArrowRight
                size={13}
                strokeWidth={1.3}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1.5
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}