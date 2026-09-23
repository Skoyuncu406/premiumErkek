const categories = [
  "Tümü",
  "Yeni Gelenler",
  "Tailoring",
  "Outerwear",
  "Essentials",
];

const sizes = [
  "S",
  "M",
  "L",
  "XL",
  "46",
  "48",
  "50",
  "52",
];

const colors = [
  {
    name: "Kahverengi",
    value: "#725443",
  },
  {
    name: "Kum",
    value: "#c5ad8b",
  },
  {
    name: "Ekru",
    value: "#e9e0d0",
  },
  {
    name: "Antrasit",
    value: "#55514e",
  },
];

const prices = [
  {
    id: "0-5000",
    label: "₺0 — ₺5.000",
  },
  {
    id: "5000-10000",
    label: "₺5.000 — ₺10.000",
  },
  {
    id: "10000-plus",
    label: "₺10.000 +",
  },
];

const defaultFilters = {
  category: "Tümü",
  sizes: [],
  colors: [],
  price: null,
};

export default function ProductFilters({
  filters = defaultFilters,
  onCategoryChange = () => {},
  onSizeChange = () => {},
  onColorChange = () => {},
  onPriceChange = () => {},
  onClear = () => {},
}) {
  const safeFilters = {
    category: filters?.category ?? "Tümü",

    sizes: Array.isArray(filters?.sizes)
      ? filters.sizes
      : [],

    colors: Array.isArray(filters?.colors)
      ? filters.colors
      : [],

    price: filters?.price ?? null,
  };

  return (
    <aside
      className="
        hidden
        lg:block
        lg:col-span-3
        xl:col-span-2
      "
    >
      <div
        className="
          sticky
          top-[158px]
          pr-8
          xl:pr-10
        "
      >
        {/* ===============================================
            HEADER
        ================================================ */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-[var(--ares-border)]

            pb-5
          "
        >
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[var(--ares-dark-deep)]
            "
          >
            Filtreler
          </p>

          <button
            type="button"
            onClick={onClear}
            className="
              text-[8px]
              uppercase
              tracking-[0.12em]
              text-[var(--ares-muted)]

              transition-colors
              duration-300

              hover:text-[var(--ares-dark-deep)]
            "
          >
            Temizle
          </button>
        </div>

        {/* ===============================================
            CATEGORY
        ================================================ */}

        <FilterSection title="Kategori">
          <div className="flex flex-col items-start gap-3">
            {categories.map((category) => {
              const active =
                safeFilters.category === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    onCategoryChange(category)
                  }
                  className={`
                    flex
                    items-center
                    gap-2

                    text-[11px]

                    transition-colors
                    duration-300

                    ${
                      active
                        ? "text-[var(--ares-dark-deep)]"
                        : "text-[var(--ares-muted)] hover:text-[var(--ares-dark-deep)]"
                    }
                  `}
                >
                  {category}

                  {active && (
                    <span
                      className="
                        h-[3px]
                        w-[3px]

                        rounded-full

                        bg-[var(--ares-gold)]
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* ===============================================
            SIZE
        ================================================ */}

        <FilterSection title="Beden">
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => {
              const active =
                safeFilters.sizes.includes(size);

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    onSizeChange(size)
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
        </FilterSection>

        {/* ===============================================
            COLOR
        ================================================ */}

        <FilterSection title="Renk">
          <div className="flex flex-col gap-3">
            {colors.map((color) => {
              const active =
                safeFilters.colors.includes(
                  color.name
                );

              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() =>
                    onColorChange(color.name)
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className={`
                      flex
                      h-[16px]
                      w-[16px]

                      items-center
                      justify-center

                      border

                      ${
                        active
                          ? "border-[var(--ares-dark)]"
                          : "border-black/10"
                      }
                    `}
                  >
                    <span
                      className="
                        h-[10px]
                        w-[10px]
                      "
                      style={{
                        backgroundColor:
                          color.value,
                      }}
                    />
                  </span>

                  <span
                    className={`
                      text-[10px]

                      transition-colors
                      duration-300

                      ${
                        active
                          ? "text-[var(--ares-dark-deep)]"
                          : "text-[var(--ares-muted)] group-hover:text-[var(--ares-dark-deep)]"
                      }
                    `}
                  >
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* ===============================================
            PRICE
        ================================================ */}

        <FilterSection title="Fiyat">
          <div className="flex flex-col items-start gap-3">
            {prices.map((price) => {
              const active =
                safeFilters.price === price.id;

              return (
                <button
                  key={price.id}
                  type="button"
                  onClick={() =>
                    onPriceChange(price.id)
                  }
                  className={`
                    flex
                    items-center
                    gap-2

                    text-[10px]

                    transition-colors
                    duration-300

                    ${
                      active
                        ? "text-[var(--ares-dark-deep)]"
                        : "text-[var(--ares-muted)] hover:text-[var(--ares-dark-deep)]"
                    }
                  `}
                >
                  {price.label}

                  {active && (
                    <span
                      className="
                        h-[3px]
                        w-[3px]

                        rounded-full

                        bg-[var(--ares-gold)]
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}


/* =========================================================
   FILTER SECTION
========================================================= */

function FilterSection({
  title,
  children,
}) {
  return (
    <div
      className="
        border-b
        border-[var(--ares-border)]

        py-6
      "
    >
      <p
        className="
          mb-5

          text-[8px]
          font-semibold

          uppercase
          tracking-[0.16em]

          text-[var(--ares-muted-light)]
        "
      >
        {title}
      </p>

      {children}
    </div>
  );
}