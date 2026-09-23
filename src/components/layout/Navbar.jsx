"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Menu,
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  X,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import useShopStore from "@/store/useShopStore";
import { products } from "@/data/products";

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    name: "Yeni Gelenler",
    href: "/urunler?filter=new",
  },
  {
    name: "Giyim",
    href: "/urunler",
  },
  {
    name: "Koleksiyonlar",
    href: "/koleksiyonlar",
  },
];

/* =========================================================
   ANNOUNCEMENT
========================================================= */

const announcementItems = [
  "Kaliteli Kumaşlar",
  "Zamansız Tasarım",
  "Modern Erkek Stili",
  "Doğal Dokular",
  "Özenli İşçilik",
  "ARES — Sessiz Bir Zarafet",
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);

  /* =======================================================
     GLOBAL SHOP STATE
  ======================================================== */

  const cart = useShopStore((state) => state.cart);
  const favorites = useShopStore((state) => state.favorites);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteCount = favorites.length;

  /* =======================================================
     SEARCH RESULTS
  ======================================================== */

  const searchResults = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLocaleLowerCase("tr-TR");

    if (!query) {
      return [];
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.color,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  /* =======================================================
     SEARCH CONTROLS
  ======================================================== */

  function openSearch() {
    setMenuOpen(false);
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  /* =======================================================
     SEARCH AUTO FOCUS
  ======================================================== */

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const timeout = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 150);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [searchOpen]);

  /* =======================================================
     ESCAPE KEY
  ======================================================== */

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") {
        return;
      }

      if (searchOpen) {
        closeSearch();
      }

      if (menuOpen) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen, menuOpen]);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (!searchOpen && !menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen, menuOpen]);

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* ===================================================
          FIXED TOP AREA
      ==================================================== */}

      <div
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
        "
      >
        {/* ===============================================
            ANNOUNCEMENT BAR
        ================================================ */}

        <div className="ares-announcement">
          <div className="ares-announcement-track">
            <div className="ares-announcement-group">
              {announcementItems.map((item) => (
                <div
                  key={`first-${item}`}
                  className="ares-announcement-item"
                >
                  <span>{item}</span>
                  <span className="ares-announcement-dot" />
                </div>
              ))}
            </div>

            <div
              className="ares-announcement-group"
              aria-hidden="true"
            >
              {announcementItems.map((item) => (
                <div
                  key={`second-${item}`}
                  className="ares-announcement-item"
                >
                  <span>{item}</span>
                  <span className="ares-announcement-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===============================================
            NAVBAR
        ================================================ */}

        <header
          className="
            border-b
            border-[var(--ares-border)]
            bg-[var(--ares-background)]
          "
        >
          <div className="ares-container-wide">
            <div
              className="
                grid
                h-[76px]
                grid-cols-[1fr_auto_1fr]
                items-center

                lg:h-[92px]
              "
            >
              {/* =========================================
                  LEFT
              ========================================== */}

              <div className="flex items-center">
                {/* MOBILE MENU */}

                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  aria-label="Menüyü aç"
                  className="
                    group

                    flex
                    h-10
                    w-8

                    items-center
                    justify-start

                    text-[var(--ares-dark-deep)]

                    transition-colors
                    duration-500

                    hover:text-[var(--ares-brown)]

                    sm:w-10
                    lg:hidden
                  "
                >
                  <Menu
                    size={21}
                    strokeWidth={1.35}
                    className="
                      transition-transform
                      duration-500

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:translate-x-[2px]
                    "
                  />
                </button>

                {/* DESKTOP NAVIGATION */}

                <nav
                  className="
                    hidden
                    items-center
                    gap-7

                    lg:flex
                    xl:gap-10
                  "
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="
                        group
                        relative

                        whitespace-nowrap
                        py-2

                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.12em]

                        text-[var(--ares-dark-deep)]

                        transition-colors
                        duration-500

                        hover:text-[var(--ares-brown)]

                        xl:text-[11px]
                      "
                    >
                      <span className="relative z-10">
                        {item.name}
                      </span>

                      <span
                        className="
                          absolute
                          bottom-0
                          left-0

                          h-px
                          w-full

                          origin-right
                          scale-x-0

                          bg-[var(--ares-gold)]

                          transition-transform
                          duration-500

                          ease-[cubic-bezier(0.22,1,0.36,1)]

                          group-hover:origin-left
                          group-hover:scale-x-100
                        "
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* =========================================
                  CENTER LOGO
              ========================================== */}

              <div className="flex justify-center">
                <Link
                  href="/"
                  aria-label="ARES ana sayfa"
                  className="
                    group
                    relative

                    inline-flex
                    items-center
                    justify-center

                    pb-2

                    font-editorial

                    text-[28px]
                    font-semibold

                    leading-none
                    tracking-[0.15em]

                    text-[var(--ares-dark-deep)]

                    transition-all
                    duration-700

                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    hover:tracking-[0.21em]
                    hover:text-[var(--ares-brown)]

                    sm:text-[34px]
                    sm:tracking-[0.18em]
                    sm:hover:tracking-[0.24em]

                    lg:text-[40px]
                  "
                >
                  <span
                    className="
                      relative
                      z-10

                      transition-transform
                      duration-700

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:-translate-y-[1px]
                    "
                  >
                    ARES
                  </span>

                  <span
                    className="
                      absolute
                      bottom-0
                      left-1/2

                      h-px
                      w-0

                      -translate-x-1/2

                      bg-[var(--ares-gold)]

                      transition-all
                      duration-700

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:w-full
                    "
                  />
                </Link>
              </div>

              {/* =========================================
                  RIGHT ACTIONS
              ========================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-end

                  gap-0

                  sm:gap-1
                  lg:gap-3
                "
              >
                {/* SEARCH */}

                <ActionButton
                  label="Ara"
                  onClick={openSearch}
                >
                  <Search
                    size={18}
                    strokeWidth={1.3}
                  />
                </ActionButton>

                {/* ACCOUNT */}

                <ActionLink
                  href="/hesabim"
                  label="Hesabım"
                >
                  <UserRound
                    size={18}
                    strokeWidth={1.3}
                  />
                </ActionLink>

                {/* FAVORITES */}

                <ActionLink
                  href="/favoriler"
                  label={
                    favoriteCount > 0
                      ? `Favoriler, ${favoriteCount} ürün`
                      : "Favoriler"
                  }
                  counter={
                    favoriteCount > 0
                      ? favoriteCount
                      : null
                  }
                >
                  <Heart
                    size={18}
                    strokeWidth={1.3}
                  />
                </ActionLink>

                {/* CART */}

                <ActionLink
                  href="/sepet"
                  label={
                    cartCount > 0
                      ? `Sepet, ${cartCount} ürün`
                      : "Sepet"
                  }
                  counter={
                    cartCount > 0
                      ? cartCount
                      : null
                  }
                >
                  <ShoppingBag
                    size={18}
                    strokeWidth={1.3}
                  />
                </ActionLink>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ===================================================
          SEARCH BACKDROP
      ==================================================== */}

      <div
        onClick={closeSearch}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[80]

          bg-[#211A16]/30
          backdrop-blur-[3px]

          transition-opacity
          duration-500

          ${
            searchOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* ===================================================
          SEARCH PANEL
      ==================================================== */}

      <section
        role="dialog"
        aria-modal="true"
        aria-label="Ürün arama"
        className={`
          fixed
          left-0
          right-0
          top-0

          z-[90]

          max-h-[88dvh]
          overflow-y-auto

          bg-[var(--ares-background-soft)]

          shadow-[0_30px_80px_rgba(33,26,22,0.12)]

          transition-transform
          duration-700

          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            searchOpen
              ? "translate-y-0"
              : "-translate-y-full"
          }
        `}
      >
        <div className="ares-container-wide">
          {/* ===============================================
              SEARCH HEADER
          ================================================ */}

          <div
            className="
              flex
              min-h-[76px]

              items-center
              justify-between

              border-b
              border-[var(--ares-border)]

              lg:min-h-[92px]
            "
          >
            <Link
              href="/"
              onClick={closeSearch}
              className="
                font-editorial

                text-[26px]
                font-semibold

                leading-none
                tracking-[0.18em]

                text-[var(--ares-dark-deep)]

                sm:text-[32px]
              "
            >
              ARES
            </Link>

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Aramayı kapat"
              className="
                group

                flex
                h-11
                w-11

                items-center
                justify-end

                text-[var(--ares-dark-deep)]

                transition-colors
                duration-500

                hover:text-[var(--ares-brown)]
              "
            >
              <X
                size={22}
                strokeWidth={1.2}
                className="
                  transition-transform
                  duration-500

                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  group-hover:rotate-90
                "
              />
            </button>
          </div>

          {/* ===============================================
              SEARCH BODY
          ================================================ */}

          <div
            className="
              py-8

              sm:py-10
              lg:py-12
            "
          >
            {/* EYEBROW */}

            <div className="flex items-center gap-4">
              <span
                className="
                  h-px
                  w-8

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
                ARES / Search
              </span>
            </div>

            {/* ===============================================
                SEARCH INPUT
            ================================================ */}

            <div
              className="
                mt-6

                flex
                items-center

                border-b
                border-[var(--ares-border-dark)]

                sm:mt-8
              "
            >
              <Search
                size={20}
                strokeWidth={1.15}
                className="
                  mr-4
                  flex-shrink-0

                  text-[var(--ares-muted)]

                  sm:mr-6
                  sm:h-[23px]
                  sm:w-[23px]
                "
              />

              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Ne arıyorsunuz?"
                autoComplete="off"
                spellCheck="false"
                aria-label="Ürün ara"
                className="
                  ares-search-input

                  min-w-0
                  flex-1

                  appearance-none

                  border-0
                  bg-transparent

                  py-4

                  font-editorial

                  text-[28px]
                  font-medium

                  tracking-[-0.02em]

                  text-[var(--ares-dark-deep)]

                  outline-none
                  ring-0
                  shadow-none

                  placeholder:text-[var(--ares-muted-light)]

                  hover:border-0
                  hover:bg-transparent
                  hover:outline-none
                  hover:ring-0
                  hover:shadow-none

                  focus:border-0
                  focus:bg-transparent
                  focus:outline-none
                  focus:ring-0
                  focus:shadow-none

                  focus-visible:border-0
                  focus-visible:bg-transparent
                  focus-visible:outline-none
                  focus-visible:ring-0
                  focus-visible:shadow-none

                  active:border-0
                  active:bg-transparent
                  active:outline-none
                  active:ring-0
                  active:shadow-none

                  sm:py-5
                  sm:text-[38px]

                  lg:text-[48px]

                  [&::-webkit-search-cancel-button]:hidden
                  [&::-webkit-search-decoration]:hidden
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
                    flex-shrink-0

                    px-2
                    py-3

                    text-[8px]
                    font-semibold

                    uppercase
                    tracking-[0.14em]

                    text-[var(--ares-muted)]

                    transition-colors
                    duration-300

                    hover:text-[var(--ares-dark-deep)]

                    sm:text-[9px]
                  "
                >
                  Temizle
                </button>
              )}
            </div>

            {/* ===============================================
                SEARCH CONTENT
            ================================================ */}

            <div className="mt-8 sm:mt-10">
              {!searchQuery.trim() ? (
                <SearchSuggestions
                  closeSearch={closeSearch}
                />
              ) : searchResults.length > 0 ? (
                <SearchResults
                  results={searchResults}
                  query={searchQuery}
                  closeSearch={closeSearch}
                />
              ) : (
                <NoSearchResults
                  query={searchQuery}
                  closeSearch={closeSearch}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          MOBILE MENU BACKDROP
      ==================================================== */}

      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`
          fixed
          inset-0

          z-[60]

          bg-black/30
          backdrop-blur-[2px]

          transition-opacity
          duration-500

          lg:hidden

          ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* ===================================================
          MOBILE DRAWER
      ==================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0

          z-[70]

          flex
          h-dvh

          w-[88%]
          max-w-[420px]

          flex-col

          bg-[var(--ares-background-soft)]

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          lg:hidden

          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ===============================================
            DRAWER HEADER
        ================================================ */}

        <div
          className="
            flex
            h-[76px]

            items-center
            justify-between

            border-b
            border-[var(--ares-border)]

            px-5

            sm:px-8
          "
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="
              group
              relative

              inline-flex

              pb-2

              font-editorial

              text-[30px]
              font-semibold

              leading-none
              tracking-[0.18em]

              text-[var(--ares-dark-deep)]

              transition-all
              duration-700

              hover:tracking-[0.23em]
              hover:text-[var(--ares-brown)]
            "
          >
            <span>
              ARES
            </span>

            <span
              className="
                absolute
                bottom-0
                left-1/2

                h-px
                w-0

                -translate-x-1/2

                bg-[var(--ares-gold)]

                transition-all
                duration-700

                ease-[cubic-bezier(0.22,1,0.36,1)]

                group-hover:w-full
              "
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Menüyü kapat"
            className="
              group

              flex
              h-10
              w-10

              items-center
              justify-end

              text-[var(--ares-dark-deep)]

              transition-colors
              duration-500

              hover:text-[var(--ares-brown)]
            "
          >
            <X
              size={21}
              strokeWidth={1.3}
              className="
                transition-transform
                duration-500

                ease-[cubic-bezier(0.22,1,0.36,1)]

                group-hover:rotate-90
              "
            />
          </button>
        </div>

        {/* ===============================================
            DRAWER NAVIGATION
        ================================================ */}

        <nav
          className="
            flex-1
            overflow-y-auto

            px-5
            py-10

            sm:px-8
          "
        >
          <p
            className="
              ares-eyebrow

              mb-7

              text-[var(--ares-muted)]
            "
          >
            Menü
          </p>

          <div
            className="
              border-t
              border-[var(--ares-border)]
            "
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  group

                  flex
                  min-h-[64px]

                  items-center
                  justify-between

                  border-b
                  border-[var(--ares-border)]

                  transition-colors
                  duration-500

                  hover:border-[var(--ares-border-dark)]
                "
              >
                <span
                  className="
                    font-editorial

                    text-[24px]
                    font-medium

                    text-[var(--ares-dark-deep)]

                    transition-all
                    duration-500

                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:translate-x-1
                    group-hover:text-[var(--ares-brown)]
                  "
                >
                  {item.name}
                </span>

                <ChevronRight
                  size={17}
                  strokeWidth={1.2}
                  className="
                    text-[var(--ares-muted)]

                    transition-all
                    duration-500

                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:translate-x-1.5
                    group-hover:text-[var(--ares-gold)]
                  "
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* ===============================================
            DRAWER FOOTER
        ================================================ */}

        <div
          className="
            border-t
            border-[var(--ares-border)]

            px-5
            py-6

            sm:px-8
          "
        >
          <p
            className="
              text-[9px]

              uppercase

              leading-5
              tracking-[0.14em]

              text-[var(--ares-muted)]
            "
          >
            ARES
            <br />
            Modern Menswear. Timeless Character.
          </p>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function SearchSuggestions({
  closeSearch,
}) {
  return (
    <div
      className="
        grid
        gap-8

        md:grid-cols-12
        md:gap-10
      "
    >
      <div className="md:col-span-4">
        <p
          className="
            text-[8px]
            font-semibold

            uppercase
            tracking-[0.16em]

            text-[var(--ares-muted-light)]
          "
        >
          Hızlı Erişim
        </p>
      </div>

      <div
        className="
          grid
          gap-0

          border-t
          border-[var(--ares-border)]

          md:col-span-8
        "
      >
        <SearchSuggestionLink
          href="/urunler?filter=new"
          label="Yeni Gelenler"
          closeSearch={closeSearch}
        />

        <SearchSuggestionLink
          href="/urunler"
          label="Tüm Giyim"
          closeSearch={closeSearch}
        />

        <SearchSuggestionLink
          href="/koleksiyonlar"
          label="Koleksiyonlar"
          closeSearch={closeSearch}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH SUGGESTION LINK
========================================================= */

function SearchSuggestionLink({
  href,
  label,
  closeSearch,
}) {
  return (
    <Link
      href={href}
      onClick={closeSearch}
      className="
        group

        flex
        min-h-[54px]

        items-center
        justify-between

        border-b
        border-[var(--ares-border)]

        font-editorial

        text-[20px]
        font-medium

        text-[var(--ares-dark-deep)]

        transition-colors
        duration-500

        hover:text-[var(--ares-brown)]

        sm:min-h-[62px]
        sm:text-[23px]
      "
    >
      <span
        className="
          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:translate-x-1
        "
      >
        {label}
      </span>

      <ArrowUpRight
        size={16}
        strokeWidth={1.2}
        className="
          text-[var(--ares-muted)]

          transition-all
          duration-500

          group-hover:-translate-y-1
          group-hover:translate-x-1
          group-hover:text-[var(--ares-gold)]
        "
      />
    </Link>
  );
}

/* =========================================================
   SEARCH RESULTS
========================================================= */

function SearchResults({
  results,
  query,
  closeSearch,
}) {
  return (
    <div>
      <div
        className="
          flex
          items-end
          justify-between

          border-b
          border-[var(--ares-border)]

          pb-4
        "
      >
        <div>
          <p
            className="
              text-[8px]
              font-semibold

              uppercase
              tracking-[0.16em]

              text-[var(--ares-muted-light)]
            "
          >
            Arama Sonuçları
          </p>

          <p
            className="
              mt-2

              text-[10px]

              text-[var(--ares-muted)]
            "
          >
            “{query.trim()}” için {results.length} ürün
          </p>
        </div>

        <span
          className="
            font-editorial

            text-[22px]

            text-[var(--ares-dark-deep)]
          "
        >
          {String(results.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-2

          gap-x-4
          gap-y-7

          pt-6

          sm:gap-x-6

          md:grid-cols-4

          lg:gap-x-8
        "
      >
        {results.map((product) => (
          <SearchProduct
            key={product.id}
            product={product}
            closeSearch={closeSearch}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH PRODUCT
========================================================= */

function SearchProduct({
  product,
  closeSearch,
}) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      onClick={closeSearch}
      className="
        group
        block
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
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 50vw, 25vw"
          className="
            object-cover
            object-center

            transition-transform
            duration-[900ms]

            ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:scale-[1.025]
          "
        />
      </div>

      <div className="pt-3">
        <p
          className="
            text-[7px]
            font-semibold

            uppercase
            tracking-[0.14em]

            text-[var(--ares-muted-light)]

            sm:text-[8px]
          "
        >
          {product.category}
        </p>

        <div
          className="
            mt-1.5

            flex
            items-start
            justify-between

            gap-3
          "
        >
          <h3
            className="
              text-[10px]
              font-medium

              leading-[1.4]

              text-[var(--ares-dark-deep)]

              transition-colors
              duration-300

              group-hover:text-[var(--ares-brown)]

              sm:text-[11px]
            "
          >
            {product.name}
          </h3>

          <span
            className="
              flex-shrink-0

              text-[9px]
              font-medium

              text-[var(--ares-dark-deep)]

              sm:text-[10px]
            "
          >
            {product.formattedPrice}
          </span>
        </div>

        <p
          className="
            mt-1

            text-[8px]

            text-[var(--ares-muted)]

            sm:text-[9px]
          "
        >
          {product.color}
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
  closeSearch,
}) {
  return (
    <div
      className="
        border-t
        border-[var(--ares-border)]

        py-10

        sm:py-14
      "
    >
      <div className="max-w-[620px]">
        <span
          className="
            text-[8px]
            font-semibold

            uppercase
            tracking-[0.16em]

            text-[var(--ares-muted-light)]
          "
        >
          Sonuç Bulunamadı
        </span>

        <h3
          className="
            mt-4

            font-editorial

            text-[30px]
            font-medium

            leading-[1]
            tracking-[-0.025em]

            text-[var(--ares-dark-deep)]

            sm:text-[38px]
          "
        >
          “{query.trim()}” için eşleşen bir ürün
          bulunamadı.
        </h3>

        <p
          className="
            mt-4

            max-w-[470px]

            text-[10px]
            leading-6

            text-[var(--ares-muted)]

            sm:text-[11px]
          "
        >
          Farklı bir ürün adı, kategori veya renk
          ile tekrar arayabilirsiniz.
        </p>

        <Link
          href="/urunler"
          onClick={closeSearch}
          className="
            group

            mt-7

            inline-flex
            items-center

            gap-4

            border-b
            border-[var(--ares-dark)]

            pb-2

            text-[8px]
            font-semibold

            uppercase
            tracking-[0.15em]

            text-[var(--ares-dark-deep)]

            sm:text-[9px]
          "
        >
          Tüm Ürünleri Gör

          <ArrowUpRight
            size={15}
            strokeWidth={1.2}
            className="
              transition-transform
              duration-500

              group-hover:-translate-y-1
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({
  children,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        group
        relative

        flex
        h-10
        w-8

        items-center
        justify-center

        text-[var(--ares-dark-deep)]

        transition-colors
        duration-500

        hover:text-[var(--ares-brown)]

        sm:w-9
        lg:w-10
      "
    >
      <span
        className="
          flex
          items-center
          justify-center

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:-translate-y-[1px]
        "
      >
        {children}
      </span>

      <span
        className="
          absolute
          bottom-[2px]
          left-1/2

          h-[2px]
          w-[2px]

          -translate-x-1/2

          scale-0
          rounded-full

          bg-[var(--ares-gold)]

          opacity-0

          transition-all
          duration-500

          group-hover:scale-100
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
  children,
  label,
  counter,
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        group
        relative

        flex
        h-10
        w-8

        items-center
        justify-center

        text-[var(--ares-dark-deep)]

        transition-colors
        duration-500

        hover:text-[var(--ares-brown)]

        sm:w-9
        lg:w-10
      "
    >
      <span
        className="
          flex
          items-center
          justify-center

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:-translate-y-[1px]
        "
      >
        {children}
      </span>

      <span
        className="
          absolute
          bottom-[2px]
          left-1/2

          h-[2px]
          w-[2px]

          -translate-x-1/2

          scale-0
          rounded-full

          bg-[var(--ares-gold)]

          opacity-0

          transition-all
          duration-500

          group-hover:scale-100
          group-hover:opacity-100
        "
      />

      {counter !== null &&
        counter !== undefined && (
          <CounterBadge>
            {counter}
          </CounterBadge>
        )}
    </Link>
  );
}

/* =========================================================
   COUNTER BADGE
========================================================= */

function CounterBadge({ children }) {
  return (
    <span
      className="
        absolute

        right-[-2px]
        top-[1px]

        flex

        h-[15px]
        min-w-[15px]

        items-center
        justify-center

        rounded-full

        bg-[var(--ares-dark)]

        px-[3px]

        text-[7px]
        font-semibold

        leading-none

        text-[var(--ares-background-soft)]

        sm:right-0

        lg:h-[17px]
        lg:min-w-[17px]
        lg:text-[8px]
      "
    >
      {children}
    </span>
  );
}