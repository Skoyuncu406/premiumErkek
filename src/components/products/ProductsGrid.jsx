"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import {
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";

import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import MobileFilters from "./MobileFilters";

/* =========================================================
   INITIAL FILTER STATE
========================================================= */

const initialFilters = {
  category: "Tümü",
  sizes: [],
  colors: [],
  price: null,
};

/* =========================================================
   SORT OPTIONS
========================================================= */

const sortOptions = [
  {
    id: "recommended",
    label: "Önerilen",
  },
  {
    id: "newest",
    label: "Yeni Gelenler",
  },
  {
    id: "price-low",
    label: "Fiyat: Artan",
  },
  {
    id: "price-high",
    label: "Fiyat: Azalan",
  },
];

/* =========================================================
   PRODUCTS GRID
========================================================= */

export default function ProductsGrid({
  products = [],
}) {
  /* =======================================================
     SEARCH PARAMS
  ======================================================== */

  const searchParams =
    useSearchParams();

  /* =======================================================
     STATES
  ======================================================== */

  const [filters, setFilters] =
    useState(initialFilters);

  const [sort, setSort] =
    useState("recommended");

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false);

  const [sortOpen, setSortOpen] =
    useState(false);

  /* =======================================================
     SAFE PRODUCTS
  ======================================================== */

  const safeProducts =
    Array.isArray(products)
      ? products
      : [];

  /* =======================================================
     URL → FILTER SYNC
  ======================================================== */

  useEffect(() => {
    const filterParam =
      searchParams.get("filter");

    const categoryParam =
      searchParams.get("kategori");

    let category = "Tümü";

    /* NEW ARRIVALS */

    if (filterParam === "new") {
      category = "Yeni Gelenler";
    }

    /* CATEGORY */

    if (
      categoryParam === "tailoring"
    ) {
      category = "Tailoring";
    }

    if (
      categoryParam === "outerwear"
    ) {
      category = "Outerwear";
    }

    if (
      categoryParam === "essentials"
    ) {
      category = "Essentials";
    }

    /* APPLY */

    setFilters({
      category,
      sizes: [],
      colors: [],
      price: null,
    });

    setSort("recommended");
  }, [searchParams]);

  /* =======================================================
     FILTER + SORT
  ======================================================== */

  const filteredProducts =
    useMemo(() => {
      let result = [
        ...safeProducts,
      ];

      /* ---------------------------------------------------
         CATEGORY
      --------------------------------------------------- */

      if (
        filters.category ===
        "Yeni Gelenler"
      ) {
        result = result.filter(
          (product) =>
            product?.isNew === true
        );
      } else if (
        filters.category !==
        "Tümü"
      ) {
        result = result.filter(
          (product) =>
            product?.category ===
            filters.category
        );
      }

      /* ---------------------------------------------------
         SIZE
      --------------------------------------------------- */

      if (
        filters.sizes.length > 0
      ) {
        result = result.filter(
          (product) => {
            const productSizes =
              Array.isArray(
                product?.sizes
              )
                ? product.sizes
                : [];

            return filters.sizes.some(
              (size) =>
                productSizes.includes(
                  size
                )
            );
          }
        );
      }

      /* ---------------------------------------------------
         COLOR
      --------------------------------------------------- */

      if (
        filters.colors.length > 0
      ) {
        result = result.filter(
          (product) =>
            filters.colors.includes(
              product?.color
            )
        );
      }

      /* ---------------------------------------------------
         PRICE
      --------------------------------------------------- */

      if (
        filters.price ===
        "0-5000"
      ) {
        result = result.filter(
          (product) => {
            const price =
              Number(
                product?.price
              );

            return (
              price >= 0 &&
              price <= 5000
            );
          }
        );
      }

      if (
        filters.price ===
        "5000-10000"
      ) {
        result = result.filter(
          (product) => {
            const price =
              Number(
                product?.price
              );

            return (
              price > 5000 &&
              price <= 10000
            );
          }
        );
      }

      if (
        filters.price ===
        "10000-plus"
      ) {
        result = result.filter(
          (product) =>
            Number(
              product?.price
            ) > 10000
        );
      }

      /* ---------------------------------------------------
         SORT
      --------------------------------------------------- */

      if (sort === "newest") {
        result.sort(
          (a, b) =>
            Number(b?.isNew) -
            Number(a?.isNew)
        );
      }

      if (
        sort === "price-low"
      ) {
        result.sort(
          (a, b) =>
            Number(a?.price) -
            Number(b?.price)
        );
      }

      if (
        sort === "price-high"
      ) {
        result.sort(
          (a, b) =>
            Number(b?.price) -
            Number(a?.price)
        );
      }

      return result;
    }, [
      safeProducts,
      filters,
      sort,
    ]);

  /* =======================================================
     CATEGORY HANDLER
  ======================================================== */

  function handleCategoryChange(
    category
  ) {
    setFilters((current) => ({
      ...current,

      category:
        category || "Tümü",
    }));
  }

  /* =======================================================
     SIZE HANDLER
  ======================================================== */

  function handleSizeChange(
    size
  ) {
    if (!size) return;

    setFilters((current) => {
      const currentSizes =
        Array.isArray(
          current?.sizes
        )
          ? current.sizes
          : [];

      const selected =
        currentSizes.includes(
          size
        );

      return {
        ...current,

        sizes: selected
          ? currentSizes.filter(
              (item) =>
                item !== size
            )
          : [
              ...currentSizes,
              size,
            ],
      };
    });
  }

  /* =======================================================
     COLOR HANDLER
  ======================================================== */

  function handleColorChange(
    color
  ) {
    if (!color) return;

    setFilters((current) => {
      const currentColors =
        Array.isArray(
          current?.colors
        )
          ? current.colors
          : [];

      const selected =
        currentColors.includes(
          color
        );

      return {
        ...current,

        colors: selected
          ? currentColors.filter(
              (item) =>
                item !== color
            )
          : [
              ...currentColors,
              color,
            ],
      };
    });
  }

  /* =======================================================
     PRICE HANDLER
  ======================================================== */

  function handlePriceChange(
    price
  ) {
    if (!price) return;

    setFilters((current) => ({
      ...current,

      price:
        current.price === price
          ? null
          : price,
    }));
  }

  /* =======================================================
     CLEAR FILTERS
  ======================================================== */

  function clearFilters() {
    setFilters({
      category: "Tümü",
      sizes: [],
      colors: [],
      price: null,
    });
  }

  /* =======================================================
     ACTIVE FILTER COUNT
  ======================================================== */

  const activeFilterCount =
    (filters.category !== "Tümü"
      ? 1
      : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.price ? 1 : 0);

  /* =======================================================
     CURRENT SORT
  ======================================================== */

  const currentSort =
    sortOptions.find(
      (option) =>
        option.id === sort
    ) || sortOptions[0];

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <>
      <section
        className="
          w-full

          bg-[var(--ares-background-soft)]
        "
      >
        <div className="ares-container-wide">
          <div
            className="
              grid
              gap-8

              py-8

              lg:grid-cols-12
              lg:gap-10
              lg:py-12

              xl:gap-12
            "
          >
            {/* =============================================
                DESKTOP FILTERS
            ============================================== */}

            <ProductFilters
              filters={filters}
              onCategoryChange={
                handleCategoryChange
              }
              onSizeChange={
                handleSizeChange
              }
              onColorChange={
                handleColorChange
              }
              onPriceChange={
                handlePriceChange
              }
              onClear={
                clearFilters
              }
            />

            {/* =============================================
                PRODUCTS AREA
            ============================================== */}

            <div
              className="
                min-w-0

                lg:col-span-9
                xl:col-span-10
              "
            >
              {/* ===========================================
                  TOOLBAR

                  z-40 creates a layer above ProductCard.
              ============================================ */}

              <div
                className="
                  relative
                  z-40

                  flex
                  items-center
                  justify-between

                  gap-4

                  border-b
                  border-[var(--ares-border)]

                  pb-5
                "
              >
                {/* PRODUCT COUNT */}

                <p
                  className="
                    text-[8px]
                    font-semibold

                    uppercase
                    tracking-[0.15em]

                    text-[var(--ares-muted)]

                    sm:text-[9px]
                  "
                >
                  {
                    filteredProducts.length
                  }{" "}
                  Ürün
                </p>

                {/* ACTIONS */}

                <div
                  className="
                    flex
                    items-center

                    gap-5
                  "
                >
                  {/* =======================================
                      MOBILE FILTER
                  ======================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      setMobileFiltersOpen(
                        true
                      )
                    }
                    className="
                      flex
                      items-center

                      gap-2

                      text-[8px]
                      font-semibold

                      uppercase
                      tracking-[0.14em]

                      text-[var(--ares-dark-deep)]

                      lg:hidden
                    "
                  >
                    <SlidersHorizontal
                      size={14}
                      strokeWidth={1.3}
                    />

                    <span>
                      Filtrele
                    </span>

                    {activeFilterCount >
                      0 && (
                      <span
                        className="
                          flex

                          h-[16px]
                          min-w-[16px]

                          items-center
                          justify-center

                          rounded-full

                          bg-[var(--ares-dark)]

                          px-1

                          text-[7px]
                          text-white
                        "
                      >
                        {
                          activeFilterCount
                        }
                      </span>
                    )}
                  </button>

                  {/* =======================================
                      SORT
                  ======================================== */}

                  <div
                    className="
                      relative
                      z-50
                    "
                  >
                    <button
                      type="button"
                      aria-expanded={
                        sortOpen
                      }
                      aria-haspopup="listbox"
                      onClick={() =>
                        setSortOpen(
                          (current) =>
                            !current
                        )
                      }
                      className="
                        group

                        flex
                        items-center

                        gap-2

                        text-[8px]
                        font-semibold

                        uppercase
                        tracking-[0.14em]

                        text-[var(--ares-dark-deep)]

                        sm:text-[9px]
                      "
                    >
                      <span
                        className="
                          hidden
                          sm:inline
                        "
                      >
                        Sırala:
                      </span>

                      <span>
                        {
                          currentSort.label
                        }
                      </span>

                      <ChevronDown
                        size={13}
                        strokeWidth={1.3}
                        className={`
                          transition-transform
                          duration-300

                          ${
                            sortOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </button>

                    {/* =====================================
                        SORT DROPDOWN
                    ====================================== */}

                    <div
                      role="listbox"
                      aria-label="Ürünleri sırala"
                      className={`
                        absolute

                        right-0
                        top-[calc(100%+16px)]

                        z-[100]

                        w-[190px]

                        overflow-hidden

                        border
                        border-[var(--ares-border)]

                        bg-[var(--ares-background-soft)]

                        shadow-[0_18px_45px_rgba(33,26,22,0.08)]

                        transition-all
                        duration-300

                        ${
                          sortOpen
                            ? `
                                pointer-events-auto
                                translate-y-0
                                opacity-100
                              `
                            : `
                                pointer-events-none
                                -translate-y-1
                                opacity-0
                              `
                        }
                      `}
                    >
                      {sortOptions.map(
                        (option) => {
                          const active =
                            option.id ===
                            sort;

                          return (
                            <button
                              key={
                                option.id
                              }
                              type="button"
                              role="option"
                              aria-selected={
                                active
                              }
                              onClick={() => {
                                setSort(
                                  option.id
                                );

                                setSortOpen(
                                  false
                                );
                              }}
                              className={`
                                flex

                                min-h-[44px]
                                w-full

                                items-center
                                justify-between

                                border-b
                                border-[var(--ares-border)]/60

                                px-4

                                text-left

                                transition-colors
                                duration-300

                                last:border-b-0

                                hover:bg-[var(--ares-background-warm)]

                                ${
                                  active
                                    ? "bg-[var(--ares-background-warm)]/45"
                                    : ""
                                }
                              `}
                            >
                              <span
                                className={`
                                  text-[9px]

                                  ${
                                    active
                                      ? "font-medium text-[var(--ares-dark-deep)]"
                                      : "text-[var(--ares-muted)]"
                                  }
                                `}
                              >
                                {
                                  option.label
                                }
                              </span>

                              {/* ACTIVE SORT INDICATOR */}

                              {active && (
                                <span
                                  aria-hidden="true"
                                  className="
                                    h-[4px]
                                    w-[4px]

                                    flex-shrink-0

                                    rounded-full

                                    bg-[var(--ares-gold)]
                                  "
                                />
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ===========================================
                  ACTIVE FILTERS
              ============================================ */}

              {activeFilterCount >
                0 && (
                <div
                  className="
                    relative
                    z-10

                    flex
                    flex-wrap

                    items-center

                    gap-2

                    border-b
                    border-[var(--ares-border)]

                    py-4
                  "
                >
                  {/* CATEGORY */}

                  {filters.category !==
                    "Tümü" && (
                    <FilterTag
                      label={
                        filters.category
                      }
                      onRemove={() =>
                        handleCategoryChange(
                          "Tümü"
                        )
                      }
                    />
                  )}

                  {/* SIZES */}

                  {filters.sizes.map(
                    (size) => (
                      <FilterTag
                        key={size}
                        label={`Beden ${size}`}
                        onRemove={() =>
                          handleSizeChange(
                            size
                          )
                        }
                      />
                    )
                  )}

                  {/* COLORS */}

                  {filters.colors.map(
                    (color) => (
                      <FilterTag
                        key={color}
                        label={color}
                        onRemove={() =>
                          handleColorChange(
                            color
                          )
                        }
                      />
                    )
                  )}

                  {/* PRICE */}

                  {filters.price && (
                    <FilterTag
                      label={getPriceLabel(
                        filters.price
                      )}
                      onRemove={() =>
                        handlePriceChange(
                          filters.price
                        )
                      }
                    />
                  )}

                  {/* CLEAR ALL */}

                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="
                      ml-2

                      text-[8px]
                      font-semibold

                      uppercase
                      tracking-[0.12em]

                      text-[var(--ares-muted)]

                      transition-colors
                      duration-300

                      hover:text-[var(--ares-dark-deep)]
                    "
                  >
                    Tümünü Temizle
                  </button>
                </div>
              )}

              {/* ===========================================
                  PRODUCT GRID

                  Explicit lower stacking layer.
              ============================================ */}

              {filteredProducts.length >
              0 ? (
                <div
                  className="
                    relative
                    z-0

                    grid
                    grid-cols-2

                    gap-x-3
                    gap-y-10

                    pt-6

                    sm:gap-x-5
                    sm:gap-y-12

                    md:grid-cols-3
                    md:gap-x-6

                    lg:pt-8

                    xl:grid-cols-4
                    xl:gap-x-5
                    xl:gap-y-14

                    2xl:gap-x-7
                  "
                >
                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={
                          product.id
                        }
                        product={
                          product
                        }
                      />
                    )
                  )}
                </div>
              ) : (
                <EmptyState
                  onClear={
                    clearFilters
                  }
                />
              )}

              {/* ===========================================
                  RESULT FOOTER
              ============================================ */}

              {filteredProducts.length >
                0 && (
                <div
                  className="
                    mt-14

                    flex
                    flex-col

                    items-center

                    border-t
                    border-[var(--ares-border)]

                    pt-10

                    lg:mt-20
                    lg:pt-12
                  "
                >
                  <p
                    className="
                      text-[8px]

                      uppercase
                      tracking-[0.14em]

                      text-[var(--ares-muted)]
                    "
                  >
                    {
                      filteredProducts.length
                    }{" "}
                    ürün görüntüleniyor
                  </p>

                  <span
                    className="
                      mt-4

                      h-px
                      w-10

                      bg-[var(--ares-gold)]
                    "
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================
          MOBILE FILTER DRAWER
      ================================================ */}

      <MobileFilters
        open={mobileFiltersOpen}
        onClose={() =>
          setMobileFiltersOpen(
            false
          )
        }
        filters={filters}
        onCategoryChange={
          handleCategoryChange
        }
        onSizeChange={
          handleSizeChange
        }
        onColorChange={
          handleColorChange
        }
        onPriceChange={
          handlePriceChange
        }
        onClear={
          clearFilters
        }
        resultCount={
          filteredProducts.length
        }
      />
    </>
  );
}

/* =========================================================
   FILTER TAG
========================================================= */

function FilterTag({
  label,
  onRemove,
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="
        group

        inline-flex
        min-h-[30px]

        items-center

        gap-2

        border
        border-[var(--ares-border)]

        px-3

        text-[8px]
        font-medium

        uppercase
        tracking-[0.08em]

        text-[var(--ares-muted)]

        transition-colors
        duration-300

        hover:border-[var(--ares-dark)]
        hover:text-[var(--ares-dark-deep)]
      "
    >
      <span>
        {label}
      </span>

      <X
        size={11}
        strokeWidth={1.3}
      />
    </button>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  onClear,
}) {
  return (
    <div
      className="
        flex
        min-h-[460px]

        flex-col

        items-center
        justify-center

        border-b
        border-[var(--ares-border)]

        px-5

        text-center
      "
    >
      <span
        className="
          text-[8px]
          font-semibold

          uppercase
          tracking-[0.18em]

          text-[var(--ares-muted)]
        "
      >
        ARES / Collection
      </span>

      <h3
        className="
          mt-5

          font-editorial

          text-[38px]
          font-medium

          leading-none

          tracking-[-0.03em]

          text-[var(--ares-dark-deep)]

          sm:text-[48px]
        "
      >
        Seçiminize uygun
        <br />
        ürün bulunamadı.
      </h3>

      <p
        className="
          mt-5

          max-w-[330px]

          text-[10px]

          leading-[1.8]

          text-[var(--ares-muted)]

          sm:text-[11px]
        "
      >
        Filtrelerinizi değiştirerek
        koleksiyondaki diğer parçaları
        keşfedebilirsiniz.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          ares-button
          ares-button-outline

          mt-7
        "
      >
        Filtreleri Temizle
      </button>
    </div>
  );
}

/* =========================================================
   PRICE LABEL
========================================================= */

function getPriceLabel(price) {
  switch (price) {
    case "0-5000":
      return "₺0 — ₺5.000";

    case "5000-10000":
      return "₺5.000 — ₺10.000";

    case "10000-plus":
      return "₺10.000 +";

    default:
      return "";
  }
}