"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  Heart,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import useShopStore from "@/store/useShopStore";
import { products } from "@/data/products";

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    label: "Yeni Gelenler",
    href: "/urunler?filter=new",
  },
  {
    label: "Giyim",
    href: "/urunler",
  },
  {
    label: "Koleksiyonlar",
    href: "/koleksiyonlar",
  },
];

/* =========================================================
   ANNOUNCEMENT ITEMS
========================================================= */

const announcementItems = [
  "₺5.000 üzeri ücretsiz teslimat",
  "14 gün içinde ücretsiz iade",
  "ARES / Modern Menswear",
  "Yeni sezon koleksiyonu şimdi yayında",
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const searchInputRef =
    useRef(null);

  /* =======================================================
     STORE
  ======================================================== */

  const favorites = useShopStore(
    (state) => state.favorites
  );

  const cart = useShopStore(
    (state) => state.cart
  );

  /* =======================================================
     COUNTS
  ======================================================== */

  const favoriteCount =
    Array.isArray(favorites)
      ? favorites.length
      : 0;

  const cartCount =
    Array.isArray(cart)
      ? cart.reduce(
          (total, item) =>
            total +
            Number(item?.quantity || 0),
          0
        )
      : 0;

  /* =======================================================
     SEARCH RESULTS
  ======================================================== */

  const searchResults =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLocaleLowerCase("tr-TR");

      if (!query) {
        return [];
      }

      return products
        .filter((product) => {
          const searchableText = [
            product.name,
            product.category,
            product.color,
          ]
            .filter(Boolean)
            .join(" ")
            .toLocaleLowerCase(
              "tr-TR"
            );

          return searchableText.includes(
            query
          );
        })
        .slice(0, 6);
    }, [searchQuery]);

  /* =======================================================
     SEARCH OPEN
  ======================================================== */

  function openSearch() {
    setSearchOpen(true);
  }

  /* =======================================================
     SEARCH CLOSE
  ======================================================== */

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  /* =======================================================
     SEARCH AUTOFOCUS
  ======================================================== */

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [searchOpen]);

  /* =======================================================
     ESCAPE KEY
  ======================================================== */

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeSearch();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [searchOpen]);

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <header
        className="
          fixed
          inset-x-0
          top-0

          z-[70]

          border-b
          border-[var(--ares-border)]

          bg-[var(--ares-background-soft)]/96

          backdrop-blur-xl
        "
      >
        {/* ===============================================
            ANNOUNCEMENT SLIDER
        ================================================ */}

        <div
          className="
            relative

            h-[34px]

            overflow-hidden

            border-b
            border-white/10

            bg-[var(--ares-dark-deep)]

            text-[var(--ares-background-soft)]
          "
        >
          <div
            className="
              ares-announcement-track

              flex
              h-full
              w-max

              items-center

              whitespace-nowrap
            "
          >
            {[0, 1].map((group) => (
              <div
                key={group}
                aria-hidden={
                  group === 1
                }
                className="
                  flex
                  h-full

                  flex-shrink-0

                  items-center
                "
              >
                {announcementItems.map(
                  (item) => (
                    <div
                      key={`${group}-${item}`}
                      className="
                        flex
                        h-full

                        items-center

                        px-7

                        sm:px-10
                        lg:px-14
                      "
                    >
                      <span
                        className="
                          mr-7

                          h-[3px]
                          w-[3px]

                          flex-shrink-0

                          rounded-full

                          bg-[var(--ares-gold)]

                          sm:mr-10
                          lg:mr-14
                        "
                      />

                      <span
                        className="
                          text-[7px]
                          font-semibold

                          uppercase
                          tracking-[0.17em]

                          text-white/70

                          sm:text-[8px]
                        "
                      >
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===============================================
            MOBILE NAVBAR
        ================================================ */}

        <div
          className="
            flex
            h-[68px]

            items-center

            lg:hidden
          "
        >
          <div
            className="
              ares-container-wide

              flex
              w-full

              items-center
              justify-between

              gap-3
            "
          >
            {/* MOBILE LOGO */}

            <Link
              href="/"
              aria-label="ARES ana sayfa"
              className="
                group

                relative

                inline-flex
                flex-shrink-0

                items-center
              "
            >
              <span
                className="
                  font-editorial

                  text-[23px]
                  font-medium

                  leading-none

                  tracking-[0.2em]

                  text-[var(--ares-dark-deep)]

                  transition-colors
                  duration-300

                  group-hover:text-[var(--ares-brown)]
                "
              >
                ARES
              </span>

              <span
                className="
                  absolute

                  -bottom-[7px]
                  left-0

                  h-px
                  w-0

                  bg-[var(--ares-gold)]

                  transition-all
                  duration-500

                  group-hover:w-[calc(100%-0.2em)]
                "
              />
            </Link>

            {/* MOBILE ACTIONS */}

            <div
              className="
                flex
                flex-shrink-0

                items-center

                gap-0
              "
            >
              <ActionButton
                label="Ara"
                onClick={openSearch}
              >
                <Search
                  size={18}
                  strokeWidth={1.2}
                />
              </ActionButton>

              <ActionLink
                href="/hesabim"
                label="Hesabım"
              >
                <UserRound
                  size={18}
                  strokeWidth={1.15}
                />
              </ActionLink>

              <ActionLink
                href="/favoriler"
                label="Favoriler"
                count={
                  favoriteCount
                }
              >
                <Heart
                  size={18}
                  strokeWidth={1.15}
                />
              </ActionLink>

              <ActionLink
                href="/sepet"
                label="Sepet"
                count={cartCount}
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.15}
                />
              </ActionLink>
            </div>
          </div>
        </div>

        {/* ===============================================
            DESKTOP NAVBAR
        ================================================ */}

        <div
          className="
            hidden
            h-[92px]

            lg:block
          "
        >
          <div
            className="
              ares-container-wide

              grid
              h-full

              grid-cols-[1fr_auto_1fr]

              items-center
            "
          >
            {/* LEFT NAVIGATION */}

            <nav
              aria-label="Ana navigasyon"
              className="
                flex
                items-center

                gap-7

                xl:gap-9
              "
            >
              {navigation.map(
                (item) => (
                  <DesktopNavLink
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </DesktopNavLink>
                )
              )}
            </nav>

            {/* CENTER LOGO */}

            <Link
              href="/"
              aria-label="ARES ana sayfa"
              className="
                group

                relative

                justify-self-center
              "
            >
              <span
                className="
                  font-editorial

                  text-[31px]
                  font-medium

                  leading-none

                  tracking-[0.28em]

                  text-[var(--ares-dark-deep)]

                  transition-colors
                  duration-300

                  group-hover:text-[var(--ares-brown)]
                "
              >
                ARES
              </span>

              <span
                className="
                  absolute

                  -bottom-[10px]
                  left-1/2

                  h-px
                  w-0

                  -translate-x-1/2

                  bg-[var(--ares-gold)]

                  transition-all
                  duration-500

                  group-hover:w-8
                "
              />
            </Link>

            {/* RIGHT ACTIONS */}

            <div
              className="
                flex

                items-center
                justify-end

                gap-1
              "
            >
              <ActionButton
                label="Ara"
                onClick={openSearch}
                desktop
              >
                <Search
                  size={18}
                  strokeWidth={1.2}
                />
              </ActionButton>

              <ActionLink
                href="/hesabim"
                label="Hesabım"
                desktop
              >
                <UserRound
                  size={18}
                  strokeWidth={1.2}
                />
              </ActionLink>

              <ActionLink
                href="/favoriler"
                label="Favoriler"
                count={
                  favoriteCount
                }
                desktop
              >
                <Heart
                  size={18}
                  strokeWidth={1.2}
                />
              </ActionLink>

              <ActionLink
                href="/sepet"
                label="Sepet"
                count={cartCount}
                desktop
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.2}
                />
              </ActionLink>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          SEARCH BACKDROP
      ================================================== */}

      <div
        aria-hidden={!searchOpen}
        onClick={closeSearch}
        className={`
          fixed
          inset-0

          z-[80]

          bg-[var(--ares-dark-deep)]/28

          backdrop-blur-[2px]

          transition-opacity
          duration-500

          ${
            searchOpen
              ? `
                  pointer-events-auto
                  opacity-100
                `
              : `
                  pointer-events-none
                  opacity-0
                `
          }
        `}
      />

      {/* =================================================
          SEARCH PANEL
      ================================================== */}

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Ürün arama"
        className={`
          fixed
          inset-x-0
          top-0

          z-[90]

          max-h-[88dvh]

          overflow-y-auto

          border-b
          border-[var(--ares-border)]

          bg-[var(--ares-background-soft)]

          shadow-[0_30px_80px_rgba(33,26,22,0.12)]

          transition-all
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            searchOpen
              ? `
                  pointer-events-auto
                  translate-y-0
                  opacity-100
                `
              : `
                  pointer-events-none
                  -translate-y-6
                  opacity-0
                `
          }
        `}
      >
        <div className="ares-container-wide">
          {/* =============================================
              SEARCH HEADER
          ============================================== */}

          <div
            className="
              flex
              min-h-[68px]

              items-center
              justify-between

              border-b
              border-[var(--ares-border)]

              lg:min-h-[82px]
            "
          >
            <Link
              href="/"
              onClick={closeSearch}
              className="
                font-editorial

                text-[22px]
                font-medium

                tracking-[0.22em]

                text-[var(--ares-dark-deep)]

                lg:text-[27px]
              "
            >
              ARES
            </Link>

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Aramayı kapat"
              className="
                flex
                h-10
                w-10

                items-center
                justify-center

                text-[var(--ares-dark-deep)]

                transition-all
                duration-300

                hover:rotate-90
                hover:text-[var(--ares-brown)]
              "
            >
              <X
                size={20}
                strokeWidth={1.1}
              />
            </button>
          </div>

          {/* =============================================
              SEARCH INPUT
          ============================================== */}

          <div
            className="
              flex
              items-center

              border-b
              border-[var(--ares-border-dark)]

              py-5

              sm:py-6
              lg:py-8
            "
          >
            <Search
              size={20}
              strokeWidth={1.1}
              className="
                mr-4

                flex-shrink-0

                text-[var(--ares-muted)]
              "
            />

            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="Ürün, kategori veya renk ara"
              autoComplete="off"
              spellCheck="false"
              className="
                ares-search-input

                min-w-0
                flex-1

                border-0

                bg-transparent

                p-0

                font-editorial

                text-[23px]
                font-medium

                tracking-[-0.02em]

                text-[var(--ares-dark-deep)]

                outline-none
                ring-0
                shadow-none

                placeholder:text-[var(--ares-muted-light)]

                focus:border-0
                focus:outline-none
                focus:ring-0
                focus:shadow-none

                focus-visible:border-0
                focus-visible:outline-none
                focus-visible:ring-0
                focus-visible:shadow-none

                sm:text-[29px]
                lg:text-[36px]
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");

                  searchInputRef.current?.focus();
                }}
                className="
                  ml-3

                  text-[7px]
                  font-semibold

                  uppercase
                  tracking-[0.14em]

                  text-[var(--ares-muted)]

                  transition-colors
                  duration-300

                  hover:text-[var(--ares-dark-deep)]

                  sm:text-[8px]
                "
              >
                Temizle
              </button>
            )}
          </div>

          {/* =============================================
              SEARCH CONTENT
          ============================================== */}

          <div
            className="
              py-7

              sm:py-9
              lg:py-10
            "
          >
            {searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <SearchResults
                  products={
                    searchResults
                  }
                  onNavigate={
                    closeSearch
                  }
                />
              ) : (
                <NoSearchResults
                  query={
                    searchQuery
                  }
                />
              )
            ) : (
              <SearchSuggestions
                onNavigate={
                  closeSearch
                }
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   DESKTOP NAV LINK
========================================================= */

function DesktopNavLink({
  href,
  children,
}) {
  return (
    <Link
      href={href}
      className="
        group

        relative

        py-2

        text-[8px]
        font-semibold

        uppercase
        tracking-[0.15em]

        text-[var(--ares-muted)]

        transition-colors
        duration-300

        hover:text-[var(--ares-dark-deep)]

        xl:text-[9px]
      "
    >
      {children}

      <span
        className="
          absolute

          bottom-0
          left-0

          h-px
          w-0

          bg-[var(--ares-gold)]

          transition-all
          duration-500

          group-hover:w-full
        "
      />
    </Link>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  label,
  onClick,
  children,
  desktop = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`
        group

        relative

        flex

        items-center
        justify-center

        text-[var(--ares-dark-deep)]

        transition-all
        duration-300

        hover:-translate-y-[1px]
        hover:text-[var(--ares-brown)]

        ${
          desktop
            ? `
                h-11
                w-11
              `
            : `
                h-10
                w-9
              `
        }
      `}
    >
      {children}

      <span
        className="
          pointer-events-none

          absolute

          bottom-[4px]
          left-1/2

          h-[2px]
          w-[2px]

          -translate-x-1/2

          rounded-full

          bg-[var(--ares-gold)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />
    </button>
  );
}

/* =========================================================
   ACTION LINK
========================================================= */

function ActionLink({
  href,
  label,
  count = 0,
  children,
  desktop = false,
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`
        group

        relative

        flex

        items-center
        justify-center

        text-[var(--ares-dark-deep)]

        transition-all
        duration-300

        hover:-translate-y-[1px]
        hover:text-[var(--ares-brown)]

        ${
          desktop
            ? `
                h-11
                w-11
              `
            : `
                h-10
                w-9
              `
        }
      `}
    >
      {children}

      {count > 0 && (
        <CounterBadge
          count={count}
        />
      )}

      <span
        className="
          pointer-events-none

          absolute

          bottom-[4px]
          left-1/2

          h-[2px]
          w-[2px]

          -translate-x-1/2

          rounded-full

          bg-[var(--ares-gold)]

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />
    </Link>
  );
}

/* =========================================================
   COUNTER BADGE
========================================================= */

function CounterBadge({
  count,
}) {
  const visibleCount =
    count > 99 ? "99+" : count;

  return (
    <span
      className="
        absolute

        right-0
        top-[2px]

        flex

        h-[14px]
        min-w-[14px]

        items-center
        justify-center

        rounded-full

        bg-[var(--ares-dark-deep)]

        px-[3px]

        text-[6px]
        font-semibold

        leading-none

        text-[var(--ares-background-soft)]
      "
    >
      {visibleCount}
    </span>
  );
}

/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function SearchSuggestions({
  onNavigate,
}) {
  return (
    <div
      className="
        grid

        gap-8

        lg:grid-cols-12
        lg:gap-10
      "
    >
      <div
        className="
          lg:col-span-4
        "
      >
        <p
          className="
            text-[7px]
            font-semibold

            uppercase
            tracking-[0.18em]

            text-[var(--ares-muted-light)]

            sm:text-[8px]
          "
        >
          Hızlı Erişim
        </p>

        <div
          className="
            mt-5

            flex
            flex-col
          "
        >
          <SearchSuggestionLink
            href="/urunler?filter=new"
            onClick={onNavigate}
          >
            Yeni Gelenler
          </SearchSuggestionLink>

          <SearchSuggestionLink
            href="/urunler"
            onClick={onNavigate}
          >
            Tüm Ürünler
          </SearchSuggestionLink>

          <SearchSuggestionLink
            href="/koleksiyonlar"
            onClick={onNavigate}
          >
            Koleksiyonlar
          </SearchSuggestionLink>
        </div>
      </div>

      <div
        className="
          border-t
          border-[var(--ares-border)]

          pt-7

          lg:col-span-8
          lg:border-l
          lg:border-t-0
          lg:pl-10
          lg:pt-0
        "
      >
        <p
          className="
            text-[7px]
            font-semibold

            uppercase
            tracking-[0.18em]

            text-[var(--ares-muted-light)]

            sm:text-[8px]
          "
        >
          ARES / Search
        </p>

        <p
          className="
            mt-4

            max-w-[520px]

            font-editorial

            text-[27px]
            font-medium

            leading-[1.05]

            tracking-[-0.025em]

            text-[var(--ares-dark-deep)]

            sm:text-[34px]
            lg:text-[40px]
          "
        >
          Aradığınız parçayı
          birkaç kelimeyle bulun.
        </p>

        <p
          className="
            mt-4

            max-w-[430px]

            text-[9px]

            leading-[1.8]

            text-[var(--ares-muted)]

            sm:text-[10px]
          "
        >
          Ürün adı, kategori veya
          renk üzerinden ARES
          koleksiyonunda arama
          yapabilirsiniz.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH SUGGESTION LINK
========================================================= */

function SearchSuggestionLink({
  href,
  onClick,
  children,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group

        flex

        min-h-[44px]

        items-center
        justify-between

        border-b
        border-[var(--ares-border)]

        text-[9px]
        font-semibold

        uppercase
        tracking-[0.13em]

        text-[var(--ares-dark-deep)]

        transition-colors
        duration-300

        hover:text-[var(--ares-brown)]

        sm:text-[10px]
      "
    >
      <span>
        {children}
      </span>

      <ArrowUpRight
        size={13}
        strokeWidth={1.1}
        className="
          transition-transform
          duration-300

          group-hover:translate-x-[2px]
          group-hover:-translate-y-[2px]
        "
      />
    </Link>
  );
}

/* =========================================================
   SEARCH RESULTS
========================================================= */

function SearchResults({
  products,
  onNavigate,
}) {
  return (
    <div>
      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-[var(--ares-border)]

          pb-4
        "
      >
        <p
          className="
            text-[7px]
            font-semibold

            uppercase
            tracking-[0.18em]

            text-[var(--ares-muted-light)]

            sm:text-[8px]
          "
        >
          Arama Sonuçları
        </p>

        <span
          className="
            text-[7px]

            uppercase
            tracking-[0.12em]

            text-[var(--ares-muted-light)]

            sm:text-[8px]
          "
        >
          {products.length} ürün
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-2

          gap-x-3
          gap-y-7

          pt-5

          sm:gap-x-5

          md:grid-cols-3

          lg:grid-cols-6
        "
      >
        {products.map(
          (product) => (
            <SearchProduct
              key={product.id}
              product={product}
              onNavigate={
                onNavigate
              }
            />
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH PRODUCT
========================================================= */

function SearchProduct({
  product,
  onNavigate,
}) {
  const productImage =
    product.image ||
    product.images?.[0] ||
    "/images/products/product-01.jpg";

  return (
    <Link
      href={`/urunler/${product.slug}`}
      onClick={onNavigate}
      className="
        group

        min-w-0
      "
    >
      <div
        className="
          relative

          aspect-[3/4]

          overflow-hidden

          bg-[var(--ares-background-warm)]
        "
      >
        <Image
          src={productImage}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 17vw"
          className="
            object-cover
            object-center

            transition-transform
            duration-[800ms]

            ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:scale-[1.025]
          "
        />
      </div>

      <div className="pt-3">
        <p
          className="
            truncate

            text-[7px]
            font-semibold

            uppercase
            tracking-[0.12em]

            text-[var(--ares-muted-light)]
          "
        >
          {product.category}
        </p>

        <p
          className="
            mt-1

            truncate

            text-[9px]
            font-medium

            text-[var(--ares-dark-deep)]

            transition-colors
            duration-300

            group-hover:text-[var(--ares-brown)]

            sm:text-[10px]
          "
        >
          {product.name}
        </p>

        <p
          className="
            mt-1

            text-[8px]

            text-[var(--ares-muted)]
          "
        >
          {product.formattedPrice}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   NO SEARCH RESULTS
========================================================= */

function NoSearchResults({
  query,
}) {
  return (
    <div
      className="
        flex
        min-h-[220px]

        flex-col

        items-center
        justify-center

        text-center
      "
    >
      <p
        className="
          text-[7px]
          font-semibold

          uppercase
          tracking-[0.18em]

          text-[var(--ares-muted-light)]

          sm:text-[8px]
        "
      >
        ARES / Search
      </p>

      <p
        className="
          mt-4

          font-editorial

          text-[27px]
          font-medium

          tracking-[-0.025em]

          text-[var(--ares-dark-deep)]

          sm:text-[34px]
        "
      >
        Sonuç bulunamadı.
      </p>

      <p
        className="
          mt-3

          max-w-[360px]

          text-[9px]

          leading-[1.8]

          text-[var(--ares-muted)]

          sm:text-[10px]
        "
      >
        “{query}” için eşleşen bir
        ürün bulunamadı. Farklı bir
        ürün adı, kategori veya renk
        deneyebilirsiniz.
      </p>
    </div>
  );
}