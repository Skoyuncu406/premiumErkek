import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const shopLinks = [
  { name: "Yeni Gelenler", href: "/urunler?filter=new" },
  { name: "Giyim", href: "/urunler" },
  { name: "Koleksiyonlar", href: "/koleksiyonlar" },
  { name: "ARES", href: "/hakkimizda" },
];

const customerLinks = [
  { name: "Hesabım", href: "/hesabim" },
  { name: "Siparişlerim", href: "/hesabim/siparisler" },
  { name: "Kargo & Teslimat", href: "/kargo-teslimat" },
  { name: "İade & Değişim", href: "/iade-degisim" },
  { name: "Sıkça Sorulan Sorular", href: "/sss" },
];

const legalLinks = [
  {
    name: "Gizlilik Politikası",
    href: "/gizlilik-politikasi",
  },
  {
    name: "KVKK",
    href: "/kvkk",
  },
  {
    name: "Çerez Politikası",
    href: "/cerez-politikasi",
  },
  {
    name: "Mesafeli Satış Sözleşmesi",
    href: "/mesafeli-satis-sozlesmesi",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "#",
    icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: LinkedinIcon,
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden

        bg-[var(--ares-dark-deep)]

        text-[var(--ares-background-soft)]
      "
    >
      <div className="ares-container-wide">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div
          className="
            grid

            gap-12

            border-b
            border-white/10

            py-14

            md:grid-cols-2

            lg:grid-cols-12
            lg:gap-10
            lg:py-20
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}

          <div
            className="
              md:col-span-2

              lg:col-span-4
              lg:pr-12
            "
          >
            <Link
              href="/"
              className="
                inline-block

                font-editorial

                text-[46px]
                font-semibold

                leading-none

                tracking-[0.18em]

                sm:text-[54px]

                lg:text-[64px]
              "
            >
              ARES
            </Link>

            <p
              className="
                mt-7

                max-w-[340px]

                text-[11px]

                leading-[1.9]

                text-white/55

                sm:text-[12px]
              "
            >
              Zamansız tasarım, seçkin materyaller ve modern erkek stilinin
              yalın yorumu.
            </p>

            {/* =================================================
                WHATSAPP CONTACT
            ================================================== */}

            <a
              href="#"
              aria-label="ARES WhatsApp iletişim"
              className="
                group

                mt-8

                inline-flex

                items-center

                gap-4

                border-b
                border-white/30

                pb-2

                transition-colors
                duration-300

                hover:border-[var(--ares-gold)]
              "
            >
              <WhatsAppIcon
                className="
                  h-[18px]
                  w-[18px]

                  text-[var(--ares-gold-soft)]
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold

                  uppercase

                  tracking-[0.16em]

                  sm:text-[10px]
                "
              >
                WhatsApp ile İletişim
              </span>

              <ArrowUpRight
                size={14}
                strokeWidth={1.2}
                className="
                  transition-transform
                  duration-500

                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>

          {/* =================================================
              SHOP
          ================================================== */}

          <FooterColumn
            title="Alışveriş"
            links={shopLinks}
            className="lg:col-span-2"
          />

          {/* =================================================
              CUSTOMER SERVICE
          ================================================== */}

          <FooterColumn
            title="Müşteri Hizmetleri"
            links={customerLinks}
            className="lg:col-span-2"
          />

          {/* =================================================
              NEWSLETTER
          ================================================== */}

          <div
            className="
              md:col-span-2

              lg:col-span-4
              lg:pl-8
            "
          >
            <p
              className="
                text-[8px]
                font-semibold

                uppercase

                tracking-[0.18em]

                text-white/40

                sm:text-[9px]
              "
            >
              ARES Journal
            </p>

            <h3
              className="
                mt-5

                max-w-[390px]

                font-editorial

                text-[32px]
                font-medium

                leading-[1]

                tracking-[-0.025em]

                sm:text-[38px]

                lg:text-[42px]
              "
            >
              Yeni koleksiyonlardan haberdar olun.
            </h3>

            <p
              className="
                mt-5

                max-w-[370px]

                text-[10px]

                leading-[1.8]

                text-white/50

                sm:text-[11px]
              "
            >
              Yeni sezon, özel seçkiler ve ARES dünyasından gelişmeler için
              e-posta listemize katılın.
            </p>

            {/* =================================================
                NEWSLETTER FORM
            ================================================== */}

            <form
              className="
                mt-7

                flex

                border-b
                border-white/30

                transition-colors
                duration-300

                focus-within:border-[var(--ares-gold)]
              "
            >
              <input
                type="email"
                placeholder="E-posta adresiniz"
                aria-label="E-posta adresiniz"
                className="
                  ares-footer-email

                  h-12
                  min-w-0
                  flex-1

                  bg-transparent

                  text-[11px]
                  text-white

                  outline-none

                  placeholder:text-white/35
                "
              />

              <button
                type="submit"
                aria-label="Bültene kaydol"
                className="
                  group

                  flex
                  h-12
                  w-12

                  flex-shrink-0

                  items-center
                  justify-end

                  text-white
                "
              >
                <ArrowRight
                  size={17}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-500

                    group-hover:translate-x-1
                  "
                />
              </button>
            </form>

            <p
              className="
                mt-3

                text-[8px]

                leading-[1.6]

                text-white/30
              "
            >
              Kaydolarak gizlilik politikamızı kabul etmiş olursunuz.
            </p>
          </div>
        </div>

        {/* =====================================================
            SOCIAL + LEGAL
        ====================================================== */}

        <div
          className="
            flex
            flex-col

            gap-8

            border-b
            border-white/10

            py-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* =================================================
              SOCIAL MEDIA
          ================================================== */}

          <div
            className="
              flex
              flex-wrap

              items-center

              gap-3
            "
          >
            <span
              className="
                mr-3

                text-[8px]
                font-semibold

                uppercase

                tracking-[0.16em]

                text-white/40
              "
            >
              Bizi Takip Edin
            </span>

            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="
                    group

                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    border
                    border-white/15

                    text-white/70

                    transition-all
                    duration-300

                    hover:border-[var(--ares-gold)]
                    hover:text-[var(--ares-gold-soft)]
                  "
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              );
            })}

            {/* WhatsApp */}

            <a
              href="#"
              aria-label="WhatsApp"
              className="
                group

                flex
                h-10
                w-10

                items-center
                justify-center

                border
                border-[var(--ares-gold)]/50

                text-[var(--ares-gold-soft)]

                transition-all
                duration-300

                hover:border-[var(--ares-gold)]
                hover:bg-[var(--ares-gold)]
                hover:text-[var(--ares-dark-deep)]
              "
            >
              <WhatsAppIcon className="h-[17px] w-[17px]" />
            </a>
          </div>

          {/* =================================================
              LEGAL
          ================================================== */}

          <div
            className="
              flex
              flex-wrap

              gap-x-6
              gap-y-3
            "
          >
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="
                  text-[8px]

                  uppercase

                  tracking-[0.1em]

                  text-white/40

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}

        <div
          className="
            flex
            flex-col

            gap-5

            py-7

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[8px]

              uppercase

              tracking-[0.13em]

              text-white/30
            "
          >
            © 2026 ARES. Tüm hakları saklıdır.
          </p>

          <p
            className="
              text-[8px]

              uppercase

              tracking-[0.13em]

              text-white/30
            "
          >
            Modern Menswear / Timeless Character
          </p>
        </div>
      </div>

      {/* =====================================================
          LARGE ARES SIGNATURE
      ====================================================== */}

      <div
        className="
          pointer-events-none

          overflow-hidden

          border-t
          border-white/[0.04]
        "
      >
     
      </div>
    </footer>
  );
}


/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({ title, links, className = "" }) {
  return (
    <div className={className}>
      <p
        className="
          text-[8px]
          font-semibold

          uppercase

          tracking-[0.18em]

          text-white/40

          sm:text-[9px]
        "
      >
        {title}
      </p>

      <nav
        className="
          mt-5

          flex
          flex-col

          items-start

          gap-3
        "
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="
              text-[11px]

              text-white/65

              transition-colors
              duration-300

              hover:text-white

              sm:text-[12px]
            "
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}


/* =========================================================
   INSTAGRAM ICON
========================================================= */

function InstagramIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="0.75"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}


/* =========================================================
   FACEBOOK ICON
========================================================= */

function FacebookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.8l.42-3.1H13.5V7.92c0-.9.25-1.51 1.58-1.51h1.69V3.64c-.29-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23V9.9H7.43V13h2.76v8h3.31Z" />
    </svg>
  );
}


/* =========================================================
   LINKEDIN ICON
========================================================= */

function LinkedinIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 8.3H3.4V21h3.1V8.3ZM4.95 3A1.95 1.95 0 1 0 4.95 6.9 1.95 1.95 0 0 0 4.95 3ZM21 13.72C21 9.9 18.96 8.12 16.24 8.12c-2.2 0-3.18 1.21-3.73 2.06V8.3H9.4V21h3.11v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.05 1.9 2.05 3.38V21H20l1-.01v-7.27Z" />
    </svg>
  );
}


/* =========================================================
   WHATSAPP ICON
========================================================= */

function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.4-4.9a8.4 8.4 0 1 1 16.1-3.9Z" />

      <path d="M8.3 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.8c-.2.2-.2.4 0 .7.5.9 1.2 1.6 2 2.2.8.6 1.5.9 1.8 1 .3.1.5 0 .7-.2l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.1.5.3.5.5 0 .3-.1 1.4-.8 2-.7.7-1.7 1-2.8.8-1.2-.2-2.7-.8-4.5-2.3-2.1-1.8-3.4-4-3.7-5.5-.3-1.1.2-1.7.5-2.1Z" />
    </svg>
  );
}