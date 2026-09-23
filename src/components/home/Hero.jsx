import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        mt-[102px]
        h-[calc(100dvh-102px)]
        w-full
        overflow-hidden
        bg-[var(--ares-dark)]

        lg:mt-[126px]
        lg:h-[calc(100dvh-126px)]
      "
    >
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <Image
        src="/images/hero/ares-hero.jpg"
        alt="ARES premium erkek giyim koleksiyonu"
        fill
        priority
        sizes="100vw"
        className="ares-hero-image"
      />

      {/* =====================================================
          BASE OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
        "
      />

      {/* =====================================================
          LEFT GRADIENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r
          from-[#211a16]/75
          via-[#211a16]/30
          to-transparent

          sm:from-[#211a16]/70
          sm:via-[#211a16]/25

          lg:from-[#211a16]/72
          lg:via-[#211a16]/20
        "
      />

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-[#211a16]/35
          via-transparent
          to-[#211a16]/10

          lg:hidden
        "
      />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10

          flex
          h-full
          w-full

          items-center

          px-5

          sm:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        <div
          className="
            w-full
            max-w-[620px]

            text-[var(--ares-background-soft)]

            sm:max-w-[650px]
            lg:max-w-[680px]
          "
        >
          {/* =================================================
              COLLECTION LABEL
          ================================================== */}

          <div
            className="
              mb-5

              flex
              items-center
              gap-4

              sm:mb-6
              lg:mb-7
            "
          >
            <span
              className="
                h-px
                w-8
                flex-shrink-0

                bg-[var(--ares-gold)]

                sm:w-10
                lg:w-12
              "
            />

            <p
              className="
                ares-eyebrow

                whitespace-nowrap

                text-[8px]
                text-white/85

                sm:text-[9px]
                lg:text-[10px]
              "
            >
              Autumn / Winter 2026
            </p>
          </div>

          {/* =================================================
              MAIN HEADING
          ================================================== */}

          <h1
            className="
              max-w-[580px]

              font-editorial

              text-[clamp(3.3rem,15vw,5.5rem)]
              font-medium

              leading-[0.8]

              tracking-[-0.045em]

              sm:text-[clamp(4.5rem,11vw,6.5rem)]

              lg:max-w-[650px]
              lg:text-[clamp(5.5rem,8vw,8rem)]
              lg:leading-[0.78]
            "
          >
            Quiet
            <br />
            Confidence.
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mt-6

              max-w-[320px]

              text-[11px]
              font-normal

              leading-[1.8]

              text-white/75

              sm:mt-7
              sm:max-w-[360px]
              sm:text-[12px]

              lg:mt-9
              lg:max-w-[390px]
              lg:text-[14px]
            "
          >
            Zamansız çizgiler, seçkin kumaşlar ve modern erkek stilinin yalın
            yorumu.
          </p>

          {/* =================================================
              CTA
          ================================================== */}

          <div className="mt-7 sm:mt-8 lg:mt-10">
            <Link
              href="/urunler"
              className="
                group

                inline-flex
                items-center
                gap-4

                border-b
                border-white/60

                pb-2

                text-[9px]
                font-semibold

                uppercase
                tracking-[0.16em]

                text-white

                transition-colors
                duration-300

                hover:border-[var(--ares-gold)]

                sm:text-[10px]

                lg:gap-5
                lg:text-[11px]
              "
            >
              Koleksiyonu Keşfet

              <ArrowUpRight
                size={16}
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
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP BOTTOM INFORMATION
      ====================================================== */}

      <div
        className="
          absolute
          bottom-8
          right-12
          z-10

          hidden
          items-center
          gap-5

          text-white/70

          lg:flex

          xl:right-16
          2xl:right-20
        "
      >
        <span
          className="
            text-[9px]

            uppercase
            tracking-[0.16em]
          "
        >
          ARES / 2026
        </span>

        <span className="h-px w-10 bg-white/40" />

        <span
          className="
            text-[9px]

            uppercase
            tracking-[0.16em]
          "
        >
          Menswear
        </span>
      </div>
    </section>
  );
}