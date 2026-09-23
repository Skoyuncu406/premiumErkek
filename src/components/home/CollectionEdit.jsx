import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    id: "01",
    title: "Tailoring",
    subtitle: "Modern Terzilik",
    description:
      "Keskin çizgiler, dengeli oranlar ve çağdaş erkek stiline uyarlanmış zamansız terzilik.",
    image: "/images/categories/tailoring.jpg",
    href: "/urunler?kategori=tailoring",
    alt: "ARES modern tailoring koleksiyonu",
  },
  {
    id: "02",
    title: "Outerwear",
    subtitle: "Dış Giyim",
    description:
      "Doğal dokular ve rafine detaylarla sezonun karakterini belirleyen dış giyim parçaları.",
    image: "/images/categories/outerwear.jpg",
    href: "/urunler?kategori=outerwear",
    alt: "ARES premium dış giyim koleksiyonu",
  },
  {
    id: "03",
    title: "Essentials",
    subtitle: "Günlük Seçkiler",
    description:
      "Gündelik gardırobun temel parçalarını kaliteli kumaş ve sade formlarla yeniden yorumluyoruz.",
    image: "/images/categories/essentials.jpg",
    href: "/urunler?kategori=essentials",
    alt: "ARES premium essentials koleksiyonu",
  },
];

export default function CollectionEdit() {
  return (
    <section className="w-full bg-[var(--ares-background)]">

      {/* =====================================================
          COMPACT INTRO
      ====================================================== */}

      <div className="ares-container-wide">
        <div
          className="
            grid
            gap-6

            border-b
            border-[var(--ares-border)]

            py-10

            md:grid-cols-12
            md:items-end

            lg:gap-10
            lg:py-12

            xl:py-14
          "
        >
          {/* Label */}

          <div className="md:col-span-3">
            <div className="flex items-center gap-4">
              <span
                className="
                  h-px
                  w-8
                  flex-shrink-0
                  bg-[var(--ares-gold)]
                "
              />

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--ares-muted)]

                  sm:text-[9px]
                "
              >
                ARES / Selection 01
              </span>
            </div>
          </div>

          {/* Heading */}

          <div className="md:col-span-5">
            <h2
              className="
                font-editorial

                text-[clamp(2.8rem,5vw,5.2rem)]

                font-medium

                leading-[0.84]

                tracking-[-0.04em]

                text-[var(--ares-dark-deep)]
              "
            >
              The ARES Edit.
            </h2>
          </div>

          {/* Description */}

          <div
            className="
              md:col-span-4
              md:justify-self-end
            "
          >
            <p
              className="
                max-w-[390px]

                text-[11px]

                leading-[1.7]

                text-[var(--ares-muted)]

                sm:text-[12px]

                lg:text-[13px]
              "
            >
              Modern erkeğin gardırobunu oluşturan temel kategoriler.
              Zamansız tasarım, güçlü silüet ve seçkin materyaller.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          COLLECTION 01 — TAILORING
      ====================================================== */}

      <CollectionSection
        collection={collections[0]}
        imagePosition="right"
      />

      {/* =====================================================
          COLLECTION 02 — OUTERWEAR
      ====================================================== */}

      <CollectionSection
        collection={collections[1]}
        imagePosition="left"
      />

      {/* =====================================================
          COLLECTION 03 — ESSENTIALS
      ====================================================== */}

      <CollectionSection
        collection={collections[2]}
        imagePosition="right"
        last
      />
    </section>
  );
}


/* =========================================================
   COLLECTION SECTION
   ========================================================= */

function CollectionSection({
  collection,
  imagePosition = "right",
  last = false,
}) {
  const imageLeft = imagePosition === "left";

  return (
    <article
      className={`
        w-full

        ${!last ? "border-b border-[var(--ares-border)]" : ""}
      `}
    >
      <div className="ares-container-wide">
        <div
          className="
            grid

            min-h-[calc(100dvh-108px)]

            grid-cols-1

            gap-8

            py-8

            md:grid-cols-12
            md:items-center
            md:gap-8

            lg:min-h-[calc(100dvh-126px)]
            lg:gap-12
            lg:py-10

            xl:gap-16
          "
        >
          {/* =================================================
              TEXT
          ================================================== */}

          <div
            className={`
              flex
              flex-col
              justify-center

              md:col-span-4

              lg:col-span-3

              ${
                imageLeft
                  ? `
                    order-1
                    md:order-2
                    md:pl-4
                    lg:pl-8
                    xl:pl-12
                  `
                  : `
                    order-1
                    md:order-1
                  `
              }
            `}
          >
            {/* Number */}

            <span
              className="
                text-[8px]
                font-medium
                tracking-[0.2em]
                text-[var(--ares-muted-light)]

                sm:text-[9px]
              "
            >
              {collection.id}
            </span>

            {/* Subtitle */}

            <p
              className="
                mt-5

                text-[8px]
                font-semibold

                uppercase

                tracking-[0.18em]

                text-[var(--ares-brown)]

                sm:text-[9px]

                lg:mt-7
              "
            >
              {collection.subtitle}
            </p>

            {/* Title */}

            <h3
              className="
                mt-2

                font-editorial

                text-[clamp(2.8rem,5vw,5.3rem)]

                font-medium

                leading-[0.88]

                tracking-[-0.04em]

                text-[var(--ares-dark-deep)]
              "
            >
              {collection.title}
            </h3>

            {/* Description */}

            <p
              className="
                mt-5

                max-w-[310px]

                text-[11px]

                leading-[1.75]

                text-[var(--ares-muted)]

                sm:text-[12px]

                lg:mt-6
                lg:text-[13px]
              "
            >
              {collection.description}
            </p>

            {/* CTA */}

            <div className="mt-6 lg:mt-8">
              <CollectionLink href={collection.href} />
            </div>
          </div>

          {/* =================================================
              IMAGE
          ================================================== */}

          <div
            className={`
              relative

              order-2

              h-[55dvh]
              min-h-[360px]

              overflow-hidden

              bg-[var(--ares-background-warm)]

              sm:h-[60dvh]

              md:h-[calc(100dvh-180px)]
              md:min-h-[500px]
              md:col-span-8

              lg:h-[calc(100dvh-206px)]
              lg:min-h-[540px]
              lg:col-span-9

              ${
                imageLeft
                  ? "md:order-1 lg:col-span-9"
                  : "md:order-2"
              }
            `}
          >
            <Image
              src={collection.image}
              alt={collection.alt}
              fill
              sizes="
                (max-width: 767px) 100vw,
                (max-width: 1023px) 66vw,
                75vw
              "
              className="
                object-cover
                object-center

                transition-transform

                duration-[1200ms]

                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:scale-[1.015]
              "
            />

            {/* Subtle image shade */}

            <div
              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-t

                from-black/[0.08]
                via-transparent
                to-transparent
              "
            />
          </div>
        </div>
      </div>
    </article>
  );
}


/* =========================================================
   COLLECTION LINK
   ========================================================= */

function CollectionLink({ href }) {
  return (
    <Link
      href={href}
      className="
        group

        inline-flex
        w-fit

        items-center
        gap-4

        border-b
        border-[var(--ares-dark)]

        pb-2

        text-[8px]
        font-semibold

        uppercase

        tracking-[0.16em]

        text-[var(--ares-dark-deep)]

        sm:text-[9px]

        lg:text-[10px]
      "
    >
      Koleksiyonu İncele

      <ArrowUpRight
        size={15}
        strokeWidth={1.3}
        className="
          transition-transform

          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:-translate-y-1
          group-hover:translate-x-1
        "
      />
    </Link>
  );
}