"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import SizeGuide from "./SizeGuide";
import useShopStore from "@/store/useShopStore";

export default function ProductDetail({ product }) {
  /* =========================================================
     GALLERY
  ========================================================== */

  const gallery =
    Array.isArray(product?.images) &&
    product.images.length > 0
      ? product.images
      : [product.image];

  const [activeImage, setActiveImage] =
    useState(gallery[0]);


  /* =========================================================
     LOCAL PRODUCT STATE
  ========================================================== */

  const [selectedSize, setSelectedSize] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  const [sizeGuideOpen, setSizeGuideOpen] =
    useState(false);

  const [sizeError, setSizeError] =
    useState(false);

  const [addedToCart, setAddedToCart] =
    useState(false);


  /* =========================================================
     GLOBAL SHOP STATE
  ========================================================== */

  const addToCart =
    useShopStore((state) => state.addToCart);

  const toggleFavorite =
    useShopStore((state) => state.toggleFavorite);

  const favorites =
    useShopStore((state) => state.favorites);

  const favorite = favorites.some(
    (item) => item.id === product.id
  );


  /* =========================================================
     QUANTITY
  ========================================================== */

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  }


  /* =========================================================
     SIZE
  ========================================================== */

  function handleSizeSelect(size) {
    setSelectedSize(size);
    setSizeError(false);
    setAddedToCart(false);
  }


  /* =========================================================
     ADD TO CART
  ========================================================== */

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    addToCart({
      product,
      size: selectedSize,
      quantity,
    });

    setSizeError(false);
    setAddedToCart(true);

    window.setTimeout(() => {
      setAddedToCart(false);
    }, 1800);
  }


  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <>
      <section
        className="
          min-h-screen
          bg-[var(--ares-background-soft)]
          pt-[108px]

          lg:h-screen
          lg:min-h-0
          lg:overflow-hidden
          lg:pt-[126px]
        "
      >
        {/* ===================================================
            BREADCRUMB
        ==================================================== */}

        <div
          className="
            h-[44px]

            border-b
            border-[var(--ares-border)]

            lg:h-[42px]
          "
        >
          <div className="ares-container-wide h-full">
            <div className="flex h-full items-center gap-3">
              <Link
                href="/urunler"
                className="
                  group

                  flex
                  items-center
                  gap-2

                  text-[8px]
                  font-semibold

                  uppercase
                  tracking-[0.14em]

                  text-[var(--ares-muted)]

                  transition-colors
                  duration-300

                  hover:text-[var(--ares-dark-deep)]
                "
              >
                <ChevronLeft
                  size={12}
                  strokeWidth={1.3}
                  className="
                    transition-transform
                    duration-300

                    group-hover:-translate-x-1
                  "
                />

                Giyim
              </Link>

              <span className="text-[var(--ares-border-dark)]">
                /
              </span>

              <span
                className="
                  truncate

                  text-[8px]
                  font-medium

                  uppercase
                  tracking-[0.12em]

                  text-[var(--ares-dark-deep)]
                "
              >
                {product.name}
              </span>
            </div>
          </div>
        </div>


        {/* ===================================================
            PRODUCT AREA
        ==================================================== */}

        <div
          className="
            ares-container-wide

            lg:h-[calc(100vh-168px)]
          "
        >
          <div
            className="
              grid
              gap-8
              py-6

              lg:h-full
              lg:grid-cols-12
              lg:gap-10
              lg:py-0

              xl:gap-14
            "
          >
            {/* =================================================
                LEFT / PRODUCT GALLERY
            ================================================== */}

            <div
              className="
                flex
                min-w-0

                flex-col

                items-center
                justify-center

                lg:col-span-7
                lg:h-full
                lg:min-h-0

                xl:col-span-7
              "
            >
              <div
                className="
                  flex
                  w-full

                  items-center
                  justify-center

                  gap-3

                  sm:gap-4
                  lg:gap-5
                "
              >
                {/* =============================================
                    MAIN IMAGE
                ============================================== */}

                <div
                  className="
                    group/main-image

                    relative

                    aspect-[3/4]

                    w-full
                    max-w-[520px]

                    overflow-hidden

                    bg-[var(--ares-background-warm)]

                    sm:max-w-[540px]

                    lg:h-[min(68vh,660px)]
                    lg:w-auto
                    lg:max-w-[500px]
                    lg:aspect-[3/4]

                    xl:h-[min(70vh,690px)]
                    xl:max-w-[520px]

                    2xl:h-[min(72vh,720px)]
                    2xl:max-w-[540px]
                  "
                >
                  <Image
                    key={activeImage}
                    src={activeImage}
                    alt={product.name}
                    fill
                    priority
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1023px) 540px,
                      520px
                    "
                    className="
                      object-cover
                      object-center

                      transition-transform

                      duration-[1200ms]

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover/main-image:scale-[1.07]
                    "
                  />

                  {product.isNew && (
                    <span
                      className="
                        absolute
                        left-4
                        top-4
                        z-10

                        bg-[var(--ares-background-soft)]

                        px-3
                        py-[7px]

                        text-[7px]
                        font-semibold

                        uppercase
                        tracking-[0.15em]

                        text-[var(--ares-dark-deep)]

                        lg:left-5
                        lg:top-5
                        lg:text-[8px]
                      "
                    >
                      Yeni
                    </span>
                  )}
                </div>


                {/* =============================================
                    SIDE THUMBNAILS
                ============================================== */}

                {gallery.length > 1 && (
                  <div
                    className="
                      hidden

                      flex-col
                      items-center

                      gap-3

                      sm:flex
                    "
                  >
                    {gallery.map((image, index) => {
                      const active =
                        activeImage === image;

                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setActiveImage(image)
                          }
                          aria-label={`${product.name} görsel ${
                            index + 1
                          }`}
                          className={`
                            group/thumb

                            relative

                            h-[78px]
                            w-[58px]

                            overflow-hidden

                            bg-[var(--ares-background-warm)]

                            transition-all
                            duration-300

                            lg:h-[86px]
                            lg:w-[64px]

                            ${
                              active
                                ? "opacity-100"
                                : `
                                  opacity-45
                                  hover:opacity-100
                                `
                            }
                          `}
                        >
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="64px"
                            className="
                              object-cover
                              object-center

                              transition-transform
                              duration-500

                              group-hover/thumb:scale-[1.05]
                            "
                          />

                          <span
                            className={`
                              absolute
                              bottom-0
                              left-0

                              h-[2px]

                              bg-[var(--ares-dark-deep)]

                              transition-all
                              duration-500

                              ${
                                active
                                  ? "w-full"
                                  : "w-0"
                              }
                            `}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>


              {/* ===============================================
                  MOBILE THUMBNAILS
              ================================================ */}

              {gallery.length > 1 && (
                <div
                  className="
                    mt-3

                    flex
                    w-full

                    gap-2

                    overflow-x-auto

                    [scrollbar-width:none]

                    [&::-webkit-scrollbar]:hidden

                    sm:hidden
                  "
                >
                  {gallery.map((image, index) => {
                    const active =
                      activeImage === image;

                    return (
                      <button
                        key={`mobile-${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setActiveImage(image)
                        }
                        aria-label={`${product.name} görsel ${
                          index + 1
                        }`}
                        className={`
                          relative

                          h-[76px]
                          w-[57px]

                          flex-shrink-0

                          overflow-hidden

                          bg-[var(--ares-background-warm)]

                          transition-opacity
                          duration-300

                          ${
                            active
                              ? "opacity-100"
                              : "opacity-45"
                          }
                        `}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="57px"
                          className="
                            object-cover
                            object-center
                          "
                        />

                        {active && (
                          <span
                            className="
                              absolute
                              bottom-0
                              left-0

                              h-[2px]
                              w-full

                              bg-[var(--ares-dark-deep)]
                            "
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>


            {/* =================================================
                RIGHT / PRODUCT INFORMATION
            ================================================== */}

            <div
              className="
                flex
                min-w-0

                items-center
                justify-center

                lg:col-span-5
                lg:h-full
                lg:min-h-0

                xl:col-span-5
              "
            >
              <div
                className="
                  mx-auto

                  w-full
                  max-w-[520px]

                  pb-10

                  lg:max-w-[440px]
                  lg:pb-0

                  xl:max-w-[460px]
                "
              >
                {/* CATEGORY */}

                <div className="flex items-center gap-3">
                  <span
                    className="
                      h-px
                      w-7

                      bg-[var(--ares-gold)]
                    "
                  />

                  <p
                    className="
                      text-[7px]
                      font-semibold

                      uppercase
                      tracking-[0.18em]

                      text-[var(--ares-muted)]

                      xl:text-[8px]
                    "
                  >
                    {product.category}
                  </p>
                </div>


                {/* =============================================
                    NAME + PRICE
                ============================================== */}

                <div
                  className="
                    mt-3

                    flex
                    items-end
                    justify-between

                    gap-6

                    border-b
                    border-[var(--ares-border)]

                    pb-4
                  "
                >
                  <h1
                    className="
                      max-w-[310px]

                      font-editorial

                      text-[34px]
                      font-medium

                      leading-[0.94]

                      tracking-[-0.035em]

                      text-[var(--ares-dark-deep)]

                      sm:text-[40px]

                      lg:text-[clamp(2rem,2.6vw,2.8rem)]
                    "
                  >
                    {product.name}
                  </h1>

                  <p
                    className="
                      flex-shrink-0
                      pb-[2px]

                      text-[11px]
                      font-medium

                      text-[var(--ares-dark-deep)]

                      xl:text-[12px]
                    "
                  >
                    {product.formattedPrice}
                  </p>
                </div>


                {/* =============================================
                    COLOR
                ============================================== */}

                <div
                  className="
                    border-b
                    border-[var(--ares-border)]

                    py-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <p
                      className="
                        text-[7px]
                        font-semibold

                        uppercase
                        tracking-[0.16em]

                        text-[var(--ares-muted-light)]

                        xl:text-[8px]
                      "
                    >
                      Renk
                    </p>

                    <p
                      className="
                        text-[9px]

                        text-[var(--ares-dark-deep)]

                        xl:text-[10px]
                      "
                    >
                      {product.color}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center">
                    <span
                      className="
                        flex

                        h-[24px]
                        w-[24px]

                        items-center
                        justify-center

                        border
                        border-[var(--ares-dark)]
                      "
                    >
                      <span
                        className="
                          h-[16px]
                          w-[16px]

                          bg-[var(--ares-brown)]
                        "
                      />
                    </span>
                  </div>
                </div>


                {/* =============================================
                    SIZE
                ============================================== */}

                <div
                  className="
                    border-b
                    border-[var(--ares-border)]

                    py-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <p
                      className="
                        text-[7px]
                        font-semibold

                        uppercase
                        tracking-[0.16em]

                        text-[var(--ares-muted-light)]

                        xl:text-[8px]
                      "
                    >
                      Beden
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSizeGuideOpen(true)
                      }
                      className="
                        text-[7px]
                        font-semibold

                        uppercase
                        tracking-[0.1em]

                        text-[var(--ares-muted)]

                        underline
                        underline-offset-4

                        transition-colors
                        duration-300

                        hover:text-[var(--ares-dark-deep)]

                        xl:text-[8px]
                      "
                    >
                      Beden Rehberi
                    </button>
                  </div>


                  {/* SIZE OPTIONS */}

                  <div
                    className="
                      mt-3

                      grid
                      grid-cols-4

                      gap-2
                    "
                  >
                    {product.sizes.map((size) => {
                      const active =
                        selectedSize === size;

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() =>
                            handleSizeSelect(size)
                          }
                          className={`
                            flex
                            h-9

                            items-center
                            justify-center

                            border

                            text-[9px]
                            font-medium

                            transition-all
                            duration-300

                            ${
                              active
                                ? `
                                  border-[var(--ares-dark)]
                                  bg-[var(--ares-dark)]
                                  text-[var(--ares-background-soft)]
                                `
                                : `
                                  border-[var(--ares-border)]
                                  text-[var(--ares-muted)]

                                  hover:border-[var(--ares-dark)]
                                  hover:text-[var(--ares-dark-deep)]
                                `
                            }
                          `}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>


                  {/* SIZE ERROR */}

                  {sizeError && (
                    <p
                      className="
                        mt-3

                        text-[8px]
                        font-medium

                        uppercase
                        tracking-[0.1em]

                        text-[#9f3a38]
                      "
                    >
                      Lütfen bir beden seçin.
                    </p>
                  )}
                </div>


                {/* =============================================
                    QUANTITY
                ============================================== */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    border-b
                    border-[var(--ares-border)]

                    py-4
                  "
                >
                  <p
                    className="
                      text-[7px]
                      font-semibold

                      uppercase
                      tracking-[0.16em]

                      text-[var(--ares-muted-light)]

                      xl:text-[8px]
                    "
                  >
                    Adet
                  </p>

                  <div
                    className="
                      inline-flex

                      h-9

                      items-center

                      border
                      border-[var(--ares-border)]
                    "
                  >
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      aria-label="Adedi azalt"
                      className="
                        flex
                        h-full
                        w-9

                        items-center
                        justify-center

                        text-[var(--ares-dark-deep)]

                        transition-colors
                        duration-300

                        hover:bg-[var(--ares-background-warm)]
                      "
                    >
                      <Minus
                        size={11}
                        strokeWidth={1.3}
                      />
                    </button>

                    <span
                      className="
                        flex

                        h-full
                        min-w-[38px]

                        items-center
                        justify-center

                        border-x
                        border-[var(--ares-border)]

                        text-[9px]
                        font-medium

                        text-[var(--ares-dark-deep)]
                      "
                    >
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      aria-label="Adedi artır"
                      className="
                        flex
                        h-full
                        w-9

                        items-center
                        justify-center

                        text-[var(--ares-dark-deep)]

                        transition-colors
                        duration-300

                        hover:bg-[var(--ares-background-warm)]
                      "
                    >
                      <Plus
                        size={11}
                        strokeWidth={1.3}
                      />
                    </button>
                  </div>
                </div>


                {/* =============================================
                    CART + FAVORITE
                ============================================== */}

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="
                      ares-button

                      min-h-[46px]

                      flex-1
                    "
                  >
                    {addedToCart ? (
                      <>
                        <Check
                          size={14}
                          strokeWidth={1.5}
                        />

                        Sepete Eklendi
                      </>
                    ) : (
                      "Sepete Ekle"
                    )}
                  </button>


                  {/* FAVORITE */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleFavorite(product)
                    }
                    aria-label={
                      favorite
                        ? "Favorilerden çıkar"
                        : "Favorilere ekle"
                    }
                    aria-pressed={favorite}
                    className={`
                      flex

                      h-[46px]
                      w-[46px]

                      flex-shrink-0

                      items-center
                      justify-center

                      border
                      border-[var(--ares-dark)]

                      transition-all
                      duration-300

                      ${
                        favorite
                          ? `
                            bg-[var(--ares-dark)]
                            text-[var(--ares-background-soft)]
                          `
                          : `
                            text-[var(--ares-dark-deep)]

                            hover:bg-[var(--ares-dark)]
                            hover:text-[var(--ares-background-soft)]
                          `
                      }
                    `}
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.3}
                      fill={
                        favorite
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>


                {/* =============================================
                    SERVICE INFORMATION
                ============================================== */}

                <div
                  className="
                    mt-4

                    flex
                    flex-wrap

                    gap-x-5
                    gap-y-1
                  "
                >
                  <span
                    className="
                      text-[8px]
                      leading-[1.6]

                      text-[var(--ares-muted)]
                    "
                  >
                    Ücretsiz kargo
                  </span>

                  <span
                    className="
                      text-[8px]
                      leading-[1.6]

                      text-[var(--ares-muted)]
                    "
                  >
                    14 gün kolay iade
                  </span>

                  <span
                    className="
                      text-[8px]
                      leading-[1.6]

                      text-[var(--ares-muted)]
                    "
                  >
                    Güvenli ödeme
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          SIZE GUIDE
      ====================================================== */}

      <SizeGuide
        open={sizeGuideOpen}
        onClose={() =>
          setSizeGuideOpen(false)
        }
        product={product}
      />
    </>
  );
}